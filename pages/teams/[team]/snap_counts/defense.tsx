import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../../components/SelectorTray";
import StatTable from "../../../../components/StatTable";
import TeamLinkFooter from "../../../../components/TeamFooter";
import { playerDefenseSnapCols } from "../../../../data/tableColumns";
import prisma from "../../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const team = String(query.team) || "NYJ";
    let season = Number(query.season) || 2022;

    let teamQueryResponse = await prisma.defense_player_snaps_by_down.findMany({
        where: {
            season: season,
            defteam: team,
        },
    });

    const playerData: IPlayerSnapData[] = JSON.parse(
        JSON.stringify(teamQueryResponse, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    return {
        props: {
            players: JSON.parse(
                JSON.stringify(playerData, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
    };
};

interface IPlayerSnapData {
    defteam: string;
    game_id: string;
    down: number;
    player_id: string;
    snap_ct: number;
    rush_snap: number;
    pass_snap: number;
    team_snaps: number;
    team_rushing_plays: number;
    team_passing_plays: number;
    week: number;
    season: number;
    reception: number;
    receiving_touchdown: number;
    carries: number;
    rushing_touchdown: number;
    db_id: string;
    gsis_id: string;
}

interface SnapProps {
    players: IPlayerSnapData[];
}

const PlayerSnaps: React.FunctionComponent<SnapProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const [playerSnaps, setPlayerSnaps] = useState(props.players);
    const [aggPlayerSnaps, setAggPlayerSnaps] = useState(props.players);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

    const aggregateStatsByPlayer = (dataframe: IPlayerSnapData[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].player_id)) {
                let currentObj = teamsMap.get(dataframe[obj].player_id);
                let newObj = {
                    player_id: dataframe[obj].player_id,
                    defteam: dataframe[obj].defteam,
                    down: dataframe[obj].down,
                    snap_ct:
                        Number.parseInt(currentObj.snap_ct.toString()) +
                        Number.parseInt(dataframe[obj].snap_ct.toString()),
                    pass_snap:
                        Number.parseInt(currentObj.pass_snap.toString()) +
                        Number.parseInt(dataframe[obj].pass_snap.toString()),
                    rush_snap:
                        Number.parseInt(currentObj.rush_snap.toString()) +
                        Number.parseInt(dataframe[obj].rush_snap.toString()),
                    team_snaps:
                        Number.parseInt(currentObj.team_snaps.toString()) +
                        Number.parseInt(dataframe[obj].team_snaps.toString()),
                    team_rushing_plays:
                        Number.parseInt(
                            currentObj.team_rushing_plays.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_rushing_plays.toString()
                        ),
                    team_passing_plays:
                        Number.parseInt(
                            currentObj.team_passing_plays.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_passing_plays.toString()
                        ),
                    db_id: currentObj.db_id,
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
        const aggPlayers = aggregateStatsByPlayer(playerSnaps);
        setAggPlayerSnaps(aggPlayers);
    }, []);

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

        if (query.downs !== undefined && query.downs !== "") {
            const selecteddowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            console.log(query.downs);
            setDownFilter(selecteddowns);
        } else if (query.downs === "") {
            console.log(query.downs);
            setDownFilter([]);
        }

        const currWeekData = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            );

        const aggPlayers = aggregateStatsByPlayer(currWeekData);

        setAggPlayerSnaps(aggPlayers);
    }, []);

    useEffect(() => {
        const filteredPlayers = props.players
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            )
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            );
        5;
        const reducedPlayers = aggregateStatsByPlayer(filteredPlayers);

        setAggPlayerSnaps(reducedPlayers);
    }, [downFilter]);

    useEffect(() => {
        const filteredPlayers = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            );

        const reducedPlayers = aggregateStatsByPlayer(filteredPlayers);

        setAggPlayerSnaps(reducedPlayers);
    }, [weekFilter]);

    return (
        <div>
            <Head>
                <title>Player Snaps Offense</title>
                <meta
                    name="description"
                    content="Player Offensive Snaps by Week and Down"
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
                            phaseUrl={"/teams/[team]/snap_counts/offense"}
                        />
                    </div>
                    <div
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
                            data={aggPlayerSnaps}
                            columns={playerDefenseSnapCols}
                            rowIdCol={"db_id"}
                            pageSize={32}
                            disableFooter={false}
                            showToolbar={true}
                        />
                    </div>
                    <TeamLinkFooter />
                </div>
            </div>
        </div>
    );
};

export default PlayerSnaps;
