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
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { IPlayerRushingStats } from "../../../ts/interfaces/playerInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IPlayerRushingStats[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.advanced_rushing_stats.findMany({
        where: {
            week: {
                in: regSeasonWeeks,
            },
            season: season,
        },
    });

    team = parseBigInt(playerSubRes);

    return {
        props: {
            teams: parseBigInt(team),
        },
    };
};

interface PlayerProps {
    teams: IPlayerRushingStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

    const aggregateStats = (dataframe: IPlayerRushingStats[]) => {
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
        // if "weeks" query present in URL, update week state
        if (query.weeks !== undefined && query.weeks !== "none") {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            console.log(query.weeks);
            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "none") {
            console.log(query.weeks);
            setWeekFilter([]);
        }

        // if "downs" query present in URL, update down state
        if (query.downs !== undefined && query.downs !== "none") {
            const selectedDowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            console.log(query.downs);
            setDownFilter(selectedDowns);
        } else if (query.downs === "none") {
            console.log(query.downs);
            setDownFilter([]);
        }

        // aggregate stats when page loads
        const reducedTeams = aggregateStats(props.teams);

        setAggTeams(reducedTeams);
    }, []);

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
    }, [weekFilter, downFilter]);

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
