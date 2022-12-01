import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useState } from "react";
import { useRouter } from "next/router";
import { playerDefenseColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import { flat, parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { IBasicDefensePlayerStats } from "../../../ts/interfaces/playerInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: IBasicDefensePlayerStats[];
        let season = Number(query.season) || 2022;
        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const playerSubRes = await prisma.player_defense_stats_basic.groupBy({
            by: ["player_id", "gsis_id", "team_abbr", "position"],
            where: {
                season: season,
                week: {
                    in: weeks || [0],
                },
                down: {
                    in: downs,
                },
            },
            _sum: {
                passes_defended: true,
                interception: true,
                int_return_yards: true,
                int_return_touchdown: true,
                tackles_for_loss: true,
                qb_hits: true,
                fumbles_forced: true,
                solo_tackles: true,
                assist_tackls: true,
                sack: true,
                half_sack: true,
                tackle_with_assist: true,
            },
            orderBy: {
                _sum: {
                    solo_tackles: "desc",
                },
            },
        });

        team = parseBigInt(playerSubRes);

        let playerData = team.map((player) => flat(player, {}));

        return {
            props: {
                playerData: playerData,
            },
        };
    },
});

interface PlayerProps {
    playerData: IBasicDefensePlayerStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

    return (
        <div className={styles.playerStatsPageContainer}>
            <div className={styles.playerStatsPageContainer}>
                <Head>
                    <title>Player Stats</title>
                    <meta
                        name="description"
                        content="Player Stats filterable by week"
                    />
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width, height=device-height"
                    />
                </Head>
                <div className={styles.statPageArea}>
                    <div className={styles.statsMainContainer}>
                        <div className={styles.selectorTrayContainer}>
                            <SelectorTray
                                handleWeekFilters={setWeekFilter}
                                weekFilter={weekFilter}
                                seasonFilter={Number(selectedSeason)}
                                handleSeason={setSelectedSeason}
                                handleDownFilters={setDownFilter}
                                downFilter={downFilter}
                                phaseUrl={"/stats/players/offense"}
                                showStatSel={true}
                                statOption={"Basic"}
                                categories={"players"}
                            />
                        </div>
                        <div className={styles.statTableContainer}>
                            <StatTable
                                data={props.playerData}
                                columns={playerDefenseColumns}
                                rowIdCol={"gsis_id"}
                                pageSize={25}
                                showToolbar={true}
                                disableFooter={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerWeeks;
