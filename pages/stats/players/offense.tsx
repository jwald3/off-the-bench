import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useState } from "react";
import { useRouter } from "next/router";
import { playerOffenseColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { IBasicOffensePlayerStats } from "../../../ts/interfaces/playerInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: IBasicOffensePlayerStats[];
        let season = Number(query.season) || 2022;
        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const playerSubRes = await prisma.player_offense_stats_basic.groupBy({
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
                pass_attempt: true,
                completion: true,
                incompletion: true,
                passing_yards: true,
                passing_TD: true,
                interception: true,
                sack: true,
                rush_attempt: true,
                rushing_yards: true,
                rushing_TD: true,
                tackled_for_loss: true,
                fumble: true,
                reception: true,
                target: true,
                receiving_yards: true,
                receiving_TD: true,
            },
            orderBy: {
                _sum: {
                    pass_attempt: "desc",
                },
            },
        });

        team = parseBigInt(playerSubRes);

        const flat = (obj: any, out: any) => {
            Object.keys(obj).forEach((key) => {
                if (typeof obj[key] == "object") {
                    out = flat(obj[key], out); //recursively call for nesteds
                } else {
                    out[key] = obj[key]; //direct assign for values
                }
            });
            return out;
        };

        let playerData = playerSubRes.map((player) => flat(player, {}));

        return {
            props: {
                playerData: playerData,
            },
        };
    },
});

interface PlayerProps {
    playerData: IBasicOffensePlayerStats[];
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
                                phaseUrl={"/stats/players/defense"}
                                showStatSel={true}
                                statOption={"Receiving"}
                                categories={"players"}
                            />
                        </div>
                        <div className={styles.statTableContainer}>
                            <StatTable
                                data={props.playerData}
                                columns={playerOffenseColumns}
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
