import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerAdvRushCols } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { IPlayerRushingStats } from "../../../ts/interfaces/playerInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: IPlayerRushingStats[];
        let season = Number(query.season) || 2022;
        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const playerSubRes = await prisma.advanced_rushing_stats.groupBy({
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
                key: true,
                rush_attempt: true,
                rushing_yards: true,
                rush_touchdown: true,
                first_down_rush: true,
                red_zone_rush: true,
                red_zone_td: true,
                red_zone_yards: true,
                goal_to_go_rush: true,
                goal_to_go_td: true,
                goal_to_go_yards: true,
                goalline_rush: true,
                goalline_td: true,
                goalline_yards: true,
                team_rush_attempt: true,
                team_rushing_yards: true,
                team_rush_touchdown: true,
                team_first_down_rush: true,
                team_red_zone_rush: true,
                team_red_zone_td: true,
                team_red_zone_yards: true,
                team_goal_to_go_rush: true,
                team_goal_to_go_td: true,
                team_goal_to_go_yards: true,
                team_goalline_rush: true,
                team_goalline_td: true,
                team_goalline_yards: true,
            },
            _count: {
                game_id: true,
            },
            orderBy: {
                _sum: {
                    rush_attempt: "desc",
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

        let playerData = team.map((player) => flat(player, {}));

        return {
            props: {
                playerData: playerData,
            },
        };
    },
});

interface PlayerProps {
    playerData: IPlayerRushingStats[];
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
                                columns={playerAdvRushCols}
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
