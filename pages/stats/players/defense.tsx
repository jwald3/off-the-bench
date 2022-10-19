import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerDefenseColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IPlayerSeason[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.player_defense_stats_basic.findMany({
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
    game_id: string;
    passes_defended: number;
    interception: number;
    int_return_yards: number;
    int_return_touchdown: number;
    tackles_for_loss: number;
    qb_hits: number;
    fumbles_forced: number;
    solo_tackles: number;
    assist_tackls: number;
    sack: number;
    half_sack: number;
    tackle_with_assist: number;
    game_id_db: string;
    gsis_id: string;
    team_abbr: string;
    position: string;
    week: number;
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

    const columns = playerDefenseColumns;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

    const aggregateStats = (dataframe: IPlayerSeason[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].gsis_id)) {
                let currentObj = teamsMap.get(dataframe[obj].gsis_id);
                let newObj = {
                    player_id: dataframe[obj].player_id,
                    week_count:
                        Number.parseInt(currentObj.week_count.toString()) +
                        Number.parseInt(dataframe[obj].week_count.toString()),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(dataframe[obj].interception.toString()),
                    int_return_yards:
                        Number.parseInt(
                            currentObj.int_return_yards.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].int_return_yards.toString()
                        ),
                    int_return_touchdown:
                        Number.parseInt(
                            currentObj.int_return_touchdown.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].int_return_touchdown.toString()
                        ),
                    passes_defended:
                        Number.parseInt(currentObj.passes_defended.toString()) +
                        Number.parseInt(
                            dataframe[obj].passes_defended.toString()
                        ),
                    fumbles_forced:
                        Number.parseInt(currentObj.fumbles_forced.toString()) +
                        Number.parseInt(
                            dataframe[obj].fumbles_forced.toString()
                        ),
                    sack:
                        Number.parseInt(currentObj.sack.toString()) +
                        Number.parseInt(dataframe[obj].sack.toString()),
                    half_sack:
                        Number.parseInt(currentObj.half_sack.toString()) +
                        Number.parseInt(dataframe[obj].half_sack.toString()),
                    solo_tackles:
                        Number.parseInt(currentObj.solo_tackles.toString()) +
                        Number.parseInt(dataframe[obj].solo_tackles.toString()),
                    assist_tackls:
                        Number.parseInt(currentObj.assist_tackls.toString()) +
                        Number.parseInt(
                            dataframe[obj].assist_tackls.toString()
                        ),
                    tackle_with_assist:
                        Number.parseInt(
                            currentObj.tackle_with_assist.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].tackle_with_assist.toString()
                        ),
                    tackles_for_loss:
                        Number.parseInt(
                            currentObj.tackles_for_loss.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].tackles_for_loss.toString()
                        ),
                    qb_hits:
                        Number.parseInt(currentObj.qb_hits.toString()) +
                        Number.parseInt(dataframe[obj].qb_hits.toString()),
                    game_id_db: currentObj.game_id_db,
                    team_abbr: currentObj.team_abbr,
                    position: currentObj.position,
                    gsis_id: currentObj.gsis_id,
                };
                teamsMap.set(currentObj.gsis_id, newObj);
            } else {
                teamsMap.set(dataframe[obj].gsis_id, {
                    ...dataframe[obj],
                });
            }
        }
        return Array.from(teamsMap.values());
    };

    useEffect(() => {
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
    }, []);

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
                            phaseUrl={"/stats/players/offense"}
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
