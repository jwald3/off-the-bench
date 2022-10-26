import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    playerAdvRecCols,
    playerOffenseColumns,
} from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IPlayerReceiving[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.advanced_receiving_stats.findMany({
        where: {
            week: {
                in: [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18,
                ],
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

interface IPlayerReceiving {
    game_id: string;
    posteam: string;
    down: number;
    player_id: string;
    passing_yards: number;
    air_yards: number;
    yards_after_catch: number;
    complete_pass: number;
    pass_attempt: number;
    interception: number;
    pass_touchdown: number;
    team_passing_yards: number;
    team_air_yards: number;
    team_yards_after_catch: number;
    team_complete_pass: number;
    team_pass_attempt: number;
    team_interception: number;
    team_pass_touchdown: number;
    gsis_id: string;
    week: number;
    season: number;
    db_id: string;
}

interface PlayerProps {
    teams: IPlayerReceiving[];
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

    const aggregateStats = (dataframe: IPlayerReceiving[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].player_id)) {
                let currentObj = teamsMap.get(dataframe[obj].player_id);
                let newObj = {
                    player_id: dataframe[obj].player_id,
                    passing_yards:
                        Number.parseInt(currentObj.passing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].passing_yards.toString()
                        ),
                    air_yards:
                        Number.parseInt(currentObj.air_yards.toString()) +
                        Number.parseInt(dataframe[obj].air_yards.toString()),
                    yards_after_catch:
                        Number.parseInt(
                            currentObj.yards_after_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].yards_after_catch.toString()
                        ),
                    complete_pass:
                        Number.parseInt(currentObj.complete_pass.toString()) +
                        Number.parseInt(
                            dataframe[obj].complete_pass.toString()
                        ),
                    pass_attempt:
                        Number.parseInt(currentObj.pass_attempt.toString()) +
                        Number.parseInt(dataframe[obj].pass_attempt.toString()),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(dataframe[obj].interception.toString()),
                    pass_touchdown:
                        Number.parseInt(currentObj.pass_touchdown.toString()) +
                        Number.parseInt(
                            dataframe[obj].pass_touchdown.toString()
                        ),
                    team_passing_yards:
                        Number.parseInt(
                            currentObj.team_passing_yards.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_passing_yards.toString()
                        ),
                    team_air_yards:
                        Number.parseInt(currentObj.team_air_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].team_air_yards.toString()
                        ),
                    team_yards_after_catch:
                        Number.parseInt(
                            currentObj.team_yards_after_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_yards_after_catch.toString()
                        ),
                    team_complete_pass:
                        Number.parseInt(
                            currentObj.team_complete_pass.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_complete_pass.toString()
                        ),
                    team_pass_attempt:
                        Number.parseInt(
                            currentObj.team_pass_attempt.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_pass_attempt.toString()
                        ),
                    team_interception:
                        Number.parseInt(
                            currentObj.team_interception.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_interception.toString()
                        ),
                    team_pass_touchdown:
                        Number.parseInt(
                            currentObj.team_pass_touchdown.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_pass_touchdown.toString()
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
                            statOption={"Receiving"}
                            categories={"players"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={playerAdvRecCols}
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
