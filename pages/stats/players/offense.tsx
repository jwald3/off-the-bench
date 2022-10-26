import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerOffenseColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { IBasicOffensePlayerStats } from "../../../ts/interfaces/playerInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IBasicOffensePlayerStats[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.player_offense_stats_basic.findMany({
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
    teams: IBasicOffensePlayerStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const columns = playerOffenseColumns;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

    const aggregateStats = (dataframe: IBasicOffensePlayerStats[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].player_id)) {
                let currentObj = teamsMap.get(dataframe[obj].player_id);
                let newObj = {
                    player_id: dataframe[obj].player_id,
                    week_count:
                        Number.parseInt(currentObj.week_count.toString()) +
                        Number.parseInt(dataframe[obj].week_count.toString()),
                    pass_attempt:
                        Number.parseInt(currentObj.pass_attempt.toString()) +
                        Number.parseInt(dataframe[obj].pass_attempt.toString()),
                    completion:
                        Number.parseInt(currentObj.completion.toString()) +
                        Number.parseInt(dataframe[obj].completion.toString()),
                    incompletion:
                        Number.parseInt(currentObj.incompletion.toString()) +
                        Number.parseInt(dataframe[obj].incompletion.toString()),
                    passing_yards:
                        Number.parseInt(currentObj.passing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].passing_yards.toString()
                        ),
                    passing_TD:
                        Number.parseInt(currentObj.passing_TD.toString()) +
                        Number.parseInt(dataframe[obj].passing_TD.toString()),
                    sack:
                        Number.parseInt(currentObj.sack.toString()) +
                        Number.parseInt(dataframe[obj].sack.toString()),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(dataframe[obj].interception.toString()),
                    rushing_yards:
                        Number.parseInt(currentObj.rushing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].rushing_yards.toString()
                        ),
                    rush_attempt:
                        Number.parseInt(currentObj.rush_attempt.toString()) +
                        Number.parseInt(dataframe[obj].rush_attempt.toString()),
                    rushing_TD:
                        Number.parseInt(currentObj.rushing_TD.toString()) +
                        Number.parseInt(dataframe[obj].rushing_TD.toString()),
                    tackled_for_loss:
                        Number.parseInt(
                            currentObj.tackled_for_loss.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].tackled_for_loss.toString()
                        ),
                    receiving_TD:
                        Number.parseInt(currentObj.receiving_TD.toString()) +
                        Number.parseInt(dataframe[obj].receiving_TD.toString()),
                    fumble:
                        Number.parseInt(currentObj.fumble.toString()) +
                        Number.parseInt(dataframe[obj].fumble.toString()),
                    reception:
                        Number.parseInt(currentObj.reception.toString()) +
                        Number.parseInt(dataframe[obj].reception.toString()),
                    target:
                        Number.parseInt(currentObj.target.toString()) +
                        Number.parseInt(dataframe[obj].target.toString()),
                    receiving_yards:
                        Number.parseInt(currentObj.receiving_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].receiving_yards.toString()
                        ),
                    game_id_db: currentObj.game_id_db,
                    team_abbr: currentObj.team_abbr,
                    position: currentObj.position,
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

        const reducedTeams = aggregateStats(props.teams);

        setAggTeams(reducedTeams);
    }, []);

    useEffect(() => {
        const filteredTeams = props.teams
            .filter((team) =>
                weekFilter.includes(Number.parseInt(team.week.toString()))
            )
            .filter((team) =>
                downFilter.includes(Number.parseInt(team.down.toString()))
            );

        const reducedTeams = aggregateStats(filteredTeams);

        setAggTeams(reducedTeams);
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
                            statOption={"Basic"}
                            categories={"players"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={columns}
                            rowIdCol={"game_id_db"}
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
