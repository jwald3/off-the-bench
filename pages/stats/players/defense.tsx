import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import Checkbox from "../../../components/WeekCheckboxFilter";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IPlayerSeason[];
    const playerSubRes =
        await prisma.player_defense_stats_weekly_2021_basic.findMany({
            where: {
                week: {
                    in: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18,
                    ],
                },
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
}

interface PlayerProps {
    teams: IPlayerSeason[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const columns: GridColDef[] = [
        {
            headerName: "Player",
            field: "player_id",
            width: 150,
            type: "string",
        },
        {
            headerName: "Position",
            field: "position",
            // flex: 0.75,
            type: "string",
        },
        {
            headerName: "Team",
            field: "team_abbr",
            type: "string",
        },
        {
            headerName: "Games",
            field: "week_count",
            type: "number",
        },
        {
            headerName: "INTs",
            field: "interception",
            // flex: 1,
            type: "number",
        },
        {
            headerName: "INT Yards",
            field: "int_return_yards",
            // flex: 0.75,
            type: "number",
        },
        {
            headerName: "INT TDs",
            field: "int_return_touchdown",
            // flex: 0.75,
            type: "number",
        },
        {
            headerName: "Passes Defended",
            field: "passes_defended",
            // flex: 0.75,
            type: "number",
        },
        {
            headerName: "Forced Fumbles",
            field: "fumbles_forced",
            // flex: 0.75,
            type: "number",
        },
        {
            headerName: "Sacks",
            field: "sack",
            type: "number",
            valueGetter: getTotalSacks,
        },
        {
            headerName: "Combined Tackles",
            field: "comb_tackles",
            // flex: 0.75,
            valueGetter: getComboTackles,
            type: "number",
        },
        {
            headerName: "Solo Tackles",
            field: "solo_tackles",
            type: "number",
        },
        {
            headerName: "Assists on Tackles",
            field: "assist_tackls",
            type: "number",
        },
        {
            headerName: "Tackles For Loss",
            field: "tackles_for_loss",
            // flex: 0.75,
            type: "number",
        },
        {
            headerName: "QB Hits",
            field: "qb_hits",
            // flex: 0.75,
            type: "number",
        },
    ];

    function getTotalSacks(params: GridCellParams) {
        return params.row.sack + params.row.half_sack * 0.5;
    }

    function getComboTackles(params: GridCellParams) {
        return (
            params.row.solo_tackles +
            params.row.assist_tackls +
            params.row.tackle_with_assist
        );
    }

    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);

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

    useEffect(() => {
        let teamsMap = new Map();

        for (let obj in props.teams) {
            if (teamsMap.get(props.teams[obj].gsis_id)) {
                let currentObj = teamsMap.get(props.teams[obj].gsis_id);
                let newObj = {
                    player_id: props.teams[obj].player_id,
                    week_count:
                        Number.parseInt(currentObj.week_count.toString()) +
                        Number.parseInt(props.teams[obj].week_count.toString()),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(
                            props.teams[obj].interception.toString()
                        ),
                    int_return_yards:
                        Number.parseInt(
                            currentObj.int_return_yards.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].int_return_yards.toString()
                        ),
                    int_return_touchdown:
                        Number.parseInt(
                            currentObj.int_return_touchdown.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].int_return_touchdown.toString()
                        ),
                    passes_defended:
                        Number.parseInt(currentObj.passes_defended.toString()) +
                        Number.parseInt(
                            props.teams[obj].passes_defended.toString()
                        ),
                    fumbles_forced:
                        Number.parseInt(currentObj.fumbles_forced.toString()) +
                        Number.parseInt(
                            props.teams[obj].fumbles_forced.toString()
                        ),
                    sack:
                        Number.parseInt(currentObj.sack.toString()) +
                        Number.parseInt(props.teams[obj].sack.toString()),
                    half_sack:
                        Number.parseInt(currentObj.half_sack.toString()) +
                        Number.parseInt(props.teams[obj].half_sack.toString()),
                    solo_tackles:
                        Number.parseInt(currentObj.solo_tackles.toString()) +
                        Number.parseInt(
                            props.teams[obj].solo_tackles.toString()
                        ),
                    assist_tackls:
                        Number.parseInt(currentObj.assist_tackls.toString()) +
                        Number.parseInt(
                            props.teams[obj].assist_tackls.toString()
                        ),
                    tackle_with_assist:
                        Number.parseInt(
                            currentObj.tackle_with_assist.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].tackle_with_assist.toString()
                        ),
                    tackles_for_loss:
                        Number.parseInt(
                            currentObj.tackles_for_loss.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].tackles_for_loss.toString()
                        ),
                    qb_hits:
                        Number.parseInt(currentObj.qb_hits.toString()) +
                        Number.parseInt(props.teams[obj].qb_hits.toString()),
                    game_id_db: currentObj.game_id_db,
                    team_abbr: currentObj.team_abbr,
                    position: currentObj.position,
                    gsis_id: currentObj.gsis_id,
                };
                teamsMap.set(currentObj.gsis_id, newObj);
            } else {
                teamsMap.set(props.teams[obj].gsis_id, {
                    ...props.teams[obj],
                });
            }
        }
        const reducedTeams = Array.from(teamsMap.values());

        setAggTeams(reducedTeams);
    }, []);

    useEffect(() => {
        let teamsMap = new Map();

        const filteredTeams = props.teams.filter((team) =>
            weekFilter.includes(Number.parseInt(team.week.toString()))
        );

        for (let obj in filteredTeams) {
            if (teamsMap.get(filteredTeams[obj].gsis_id)) {
                let currentObj = teamsMap.get(filteredTeams[obj].gsis_id);
                let newObj = {
                    player_id: props.teams[obj].player_id,
                    week_count:
                        Number.parseInt(currentObj.week_count.toString()) +
                        Number.parseInt(props.teams[obj].week_count.toString()),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(
                            props.teams[obj].interception.toString()
                        ),
                    int_return_yards:
                        Number.parseInt(
                            currentObj.int_return_yards.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].int_return_yards.toString()
                        ),
                    int_return_touchdown:
                        Number.parseInt(
                            currentObj.int_return_touchdown.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].int_return_touchdown.toString()
                        ),
                    passes_defended:
                        Number.parseInt(currentObj.passes_defended.toString()) +
                        Number.parseInt(
                            props.teams[obj].passes_defended.toString()
                        ),
                    fumbles_forced:
                        Number.parseInt(currentObj.fumbles_forced.toString()) +
                        Number.parseInt(
                            props.teams[obj].fumbles_forced.toString()
                        ),
                    sack:
                        Number.parseInt(currentObj.sack.toString()) +
                        Number.parseInt(props.teams[obj].sack.toString()),
                    half_sack:
                        Number.parseInt(currentObj.half_sack.toString()) +
                        Number.parseInt(props.teams[obj].half_sack.toString()),
                    solo_tackles:
                        Number.parseInt(currentObj.solo_tackles.toString()) +
                        Number.parseInt(
                            props.teams[obj].solo_tackles.toString()
                        ),
                    assist_tackls:
                        Number.parseInt(currentObj.assist_tackls.toString()) +
                        Number.parseInt(
                            props.teams[obj].assist_tackls.toString()
                        ),
                    tackle_with_assist:
                        Number.parseInt(
                            currentObj.tackle_with_assist.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].tackle_with_assist.toString()
                        ),
                    tackles_for_loss:
                        Number.parseInt(
                            currentObj.tackles_for_loss.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].tackles_for_loss.toString()
                        ),
                    qb_hits:
                        Number.parseInt(currentObj.qb_hits.toString()) +
                        Number.parseInt(props.teams[obj].qb_hits.toString()),
                    game_id_db: currentObj.game_id_db,
                    team_abbr: currentObj.team_abbr,
                    position: currentObj.position,
                    gsis_id: currentObj.gsis_id,
                };
                teamsMap.set(currentObj.gsis_id, newObj);
            } else {
                teamsMap.set(filteredTeams[obj].gsis_id, {
                    ...filteredTeams[obj],
                });
            }
        }
        const reducedTeams = Array.from(teamsMap.values());

        setAggTeams(reducedTeams);
    }, [weekFilter]);

    return (
        <div className="weekly-team-page">
            <Checkbox handleFilters={setWeekFilter} weekFilter={weekFilter} />
            <div className="weekly-team-stats">
                <StatTable
                    data={aggTeams}
                    columns={columns}
                    rowIdCol={"game_id_db"}
                    pageSize={25}
                />
            </div>
        </div>
    );
};

export default PlayerWeeks;
