import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    playerAdvRushCols,
    playerOffenseColumns,
} from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import { regSeasonWeeks } from "../../../data/globalVars";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IPlayerRushing[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.advanced_rushing_stats.findMany({
        where: {
            week: {
                in: regSeasonWeeks,
            },
            season: season,
        },
    });
    team = JSON.parse(
        JSON.stringify(playerSubRes, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    return {
        props: {
            teams: JSON.parse(
                JSON.stringify(team, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
    };
};

interface IPlayerRushing {
    player_id: string;
    game_id: string;
    posteam: string;
    key: number;
    down: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    first_down_rush: number;
    red_zone_rush: number;
    red_zone_td: number;
    red_zone_yards: number;
    goal_to_go_rush: number;
    goal_to_go_td: number;
    goal_to_go_yards: number;
    goalline_rush: number;
    goalline_td: number;
    goalline_yards: number;
    team_rush_attempt: number;
    team_rushing_yards: number;
    team_rush_touchdown: number;
    team_first_down_rush: number;
    team_red_zone_rush: number;
    team_red_zone_td: number;
    team_red_zone_yards: number;
    team_goal_to_go_rush: number;
    team_goal_to_go_td: number;
    team_goal_to_go_yards: number;
    team_goalline_rush: number;
    team_goalline_td: number;
    team_goalline_yards: number;
    gsis_id: string;
    week: number;
    season: number;
    db_id: string;
}

interface PlayerProps {
    teams: IPlayerRushing[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const columns = playerOffenseColumns;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

    useEffect(() => {
        if (query.weeks !== undefined && query.weeks !== "") {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            console.log(query.weeks);
            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "") {
            console.log(query.weeks);
            setWeekFilter([]);
        }
    }, []);

    const aggregateStats = (dataframe: IPlayerRushing[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].player_id)) {
                let currentObj = teamsMap.get(dataframe[obj].player_id);
                let newObj = {
                    player_id: dataframe[obj].player_id,
                    rush_attempt:
                        Number.parseInt(currentObj.rush_attempt.toString()) +
                        Number.parseInt(dataframe[obj].rush_attempt.toString()),
                    rushing_yards:
                        Number.parseInt(currentObj.rushing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].rushing_yards.toString()
                        ),
                    rush_touchdown:
                        Number.parseInt(currentObj.rush_touchdown.toString()) +
                        Number.parseInt(
                            dataframe[obj].rush_touchdown.toString()
                        ),
                    first_down_rush:
                        Number.parseInt(currentObj.first_down_rush.toString()) +
                        Number.parseInt(
                            dataframe[obj].first_down_rush.toString()
                        ),
                    red_zone_rush:
                        Number.parseInt(currentObj.red_zone_rush.toString()) +
                        Number.parseInt(
                            dataframe[obj].red_zone_rush.toString()
                        ),
                    red_zone_td:
                        Number.parseInt(currentObj.red_zone_td.toString()) +
                        Number.parseInt(dataframe[obj].red_zone_td.toString()),
                    red_zone_yards:
                        Number.parseInt(currentObj.red_zone_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].red_zone_yards.toString()
                        ),
                    goal_to_go_rush:
                        Number.parseInt(currentObj.goal_to_go_rush.toString()) +
                        Number.parseInt(
                            dataframe[obj].goal_to_go_rush.toString()
                        ),
                    goal_to_go_td:
                        Number.parseInt(currentObj.goal_to_go_td.toString()) +
                        Number.parseInt(
                            dataframe[obj].goal_to_go_td.toString()
                        ),
                    goal_to_go_yards:
                        Number.parseInt(
                            currentObj.goal_to_go_yards.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].goal_to_go_yards.toString()
                        ),
                    goalline_rush:
                        Number.parseInt(currentObj.goalline_rush.toString()) +
                        Number.parseInt(
                            dataframe[obj].goalline_rush.toString()
                        ),
                    goalline_td:
                        Number.parseInt(currentObj.goalline_td.toString()) +
                        Number.parseInt(dataframe[obj].goalline_td.toString()),
                    goalline_yards:
                        Number.parseInt(currentObj.goalline_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].goalline_yards.toString()
                        ),
                    team_rush_attempt:
                        Number.parseInt(
                            currentObj.team_rush_attempt.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_rush_attempt.toString()
                        ),
                    team_rushing_yards:
                        Number.parseInt(
                            currentObj.team_rushing_yards.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_rushing_yards.toString()
                        ),
                    team_rush_touchdown:
                        Number.parseInt(
                            currentObj.team_rush_touchdown.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_rush_touchdown.toString()
                        ),
                    team_first_down_rush:
                        Number.parseInt(
                            currentObj.team_first_down_rush.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_first_down_rush.toString()
                        ),
                    team_red_zone_rush:
                        Number.parseInt(
                            currentObj.team_red_zone_rush.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_red_zone_rush.toString()
                        ),
                    team_red_zone_td:
                        Number.parseInt(
                            currentObj.team_red_zone_td.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_red_zone_td.toString()
                        ),
                    team_red_zone_yards:
                        Number.parseInt(
                            currentObj.team_red_zone_yards.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_red_zone_yards.toString()
                        ),
                    team_goal_to_go_rush:
                        Number.parseInt(
                            currentObj.team_goal_to_go_rush.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_goal_to_go_rush.toString()
                        ),
                    team_goal_to_go_td:
                        Number.parseInt(
                            currentObj.team_goal_to_go_td.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_goal_to_go_td.toString()
                        ),
                    team_goal_to_go_yards:
                        Number.parseInt(
                            currentObj.team_goal_to_go_yards.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_goal_to_go_yards.toString()
                        ),
                    team_goalline_rush:
                        Number.parseInt(
                            currentObj.team_goalline_rush.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_goalline_rush.toString()
                        ),
                    team_goalline_td:
                        Number.parseInt(
                            currentObj.team_goalline_td.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_goalline_td.toString()
                        ),
                    team_goalline_yards:
                        Number.parseInt(
                            currentObj.team_goalline_yards.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_goalline_yards.toString()
                        ),
                    game_id: currentObj.game_id,
                    db_id: currentObj.db_id,
                    posteam: currentObj.posteam,
                };
                teamsMap.set(currentObj.player_id, newObj);
            } else {
                teamsMap.set(dataframe[obj].player_id, {
                    ...dataframe[obj],
                });
            }
        }
        return Array.from(teamsMap.values());
    };

    useEffect(() => {
        const reducedTeams = aggregateStats(props.teams);

        setAggTeams(reducedTeams);
    }, []);

    useEffect(() => {
        const filteredTeams = props.teams.filter((team) =>
            weekFilter.includes(Number.parseInt(team.week.toString()))
        );

        const reducedTeams = aggregateStats(filteredTeams);

        setAggTeams(reducedTeams);
    }, [weekFilter]);

    useEffect(() => {
        const filteredPlayers = props.teams
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            )
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            );

        const reducedPlayers = aggregateStats(filteredPlayers);

        setAggTeams(reducedPlayers);
    }, [downFilter]);

    return (
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
                            statOption={"Rushing"}
                            categories={"players"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={playerAdvRushCols}
                            rowIdCol={"db_id"}
                            pageSize={25}
                            showToolbar={true}
                            disableFooter={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerWeeks;
