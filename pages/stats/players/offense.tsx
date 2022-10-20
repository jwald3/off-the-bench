import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerOffenseColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IPlayerSeason[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.player_offense_stats_basic.findMany({
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

interface IPlayerSeason {
    player_id: string;
    position: string;
    week: number;
    team_abbr: string;
    pass_attempt: number;
    completion: number;
    incompletion: number;
    passing_yards: number;
    passing_TD: number;
    interception: number;
    sack: number;
    rush_attempt: number;
    rushing_yards: number;
    rushing_TD: number;
    tackled_for_loss: number;
    fumble: number;
    reception: number;
    target: number;
    receiving_yards: number;
    receiving_TD: number;
    game_id_db: string;
    week_count: number;
    season: number;
    down: number;
}

interface PlayerProps {
    teams: IPlayerSeason[];
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

    const aggregateStats = (dataframe: IPlayerSeason[]) => {
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
    }, [weekFilter]);

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
    }, [downFilter]);

    return (
        <div>
            <Head>
                <title>Player Stats</title>
                <meta
                    name="description"
                    content="Player Stats filterable by week"
                />
            </Head>
            <div className="weekly-team-page">
                <div
                    className="weekly-team-stats"
                    style={{
                        paddingTop: "2%",
                        width: "90%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            paddingBottom: "2%",
                            width: "100%",
                            maxWidth: "2000px",
                            margin: "auto",
                            display: "flex",
                        }}
                    >
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
                        />
                    </div>
                    <div
                        className="weekly-team-stats"
                        style={{
                            width: "100%",
                            maxWidth: "2000px",
                            height: "auto",
                            boxShadow:
                                "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                            backgroundColor: "#f3f4f8",
                            marginBottom: "3%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
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
