import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { playerAdvRecCols } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { IPlayerReceivingStats } from "../../../ts/interfaces/playerInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: IPlayerReceivingStats[];
        let season = Number(query.season) || 2022;
        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const playerSubRes = await prisma.advanced_receiving_stats.groupBy({
            by: ["player_id", "gsis_id", "posteam"],
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
                passing_yards: true,
                air_yards: true,
                yards_after_catch: true,
                complete_pass: true,
                pass_attempt: true,
                interception: true,
                pass_touchdown: true,
                first_down_pass: true,
                red_zone_target: true,
                red_zone_rec: true,
                red_zone_yards: true,
                end_zone_target: true,
                end_zone_rec: true,
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
                teams: parseBigInt(team),
                playerData: playerData,
            },
        };
    },
});

interface PlayerProps {
    playerData: IPlayerReceivingStats[];
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
                                columns={playerAdvRecCols}
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
