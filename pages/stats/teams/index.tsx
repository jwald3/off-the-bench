import {
    GridCellParams,
    GridColDef,
    GridValueFormatterParams,
} from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StatTable from "../../../components/StatTable";
import StatTableHeader from "../../../components/StatTableHeader";
import Checkbox from "../../../components/WeekCheckboxFilter";
import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: ITeam[];
    let phase = query.phase;
    let teamQueryResponse;

    if (phase === "offense") {
        teamQueryResponse = await prisma.weekly_team_offense_2021.findMany({
            where: {
                week: {
                    in: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18,
                    ],
                },
            },
        });
    } else if (phase === "defense") {
        teamQueryResponse = await prisma.weekly_team_defense_2021.findMany({
            where: {
                week: {
                    in: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18,
                    ],
                },
            },
        });
    }

    team = JSON.parse(
        JSON.stringify(teamQueryResponse, (_, v) =>
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

interface ITeam {
    posteam: string;
    week: number;
    passing_attempts: number;
    complete_pass: number;
    pass_touchdown: number;
    interception: number;
    sack: number;
    passing_yds: number;
    first_down_pass: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    first_down_rush: number;
    game_id_db: string;
}

interface TeamProps {
    teams: ITeam[];
}

const TeamWeeks: React.FunctionComponent<TeamProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const columns: GridColDef[] = [
        { headerName: "Team", field: "posteam", flex: 1 },
        // { headerName: "Week", field: "week", flex: 1 },
        {
            headerName: "Completions",
            field: "complete_pass",
            flex: 1,
            type: "number",
        },
        {
            headerName: "Pass Attempts",
            field: "passing_attempts",
            flex: 1,
            type: "number",
        },
        {
            headerName: "Completion %",
            field: "compPercent",
            flex: 1,
            valueGetter: getCompletionPct,
            type: "number",
            valueFormatter: (params: GridValueFormatterParams<number>) => {
                if (params.value == null) {
                    return "";
                }

                const valueFormatted = Number(params.value).toLocaleString();
                return `${valueFormatted} %`;
            },
        },
        {
            headerName: "Passing TDs",
            field: "pass_touchdown",
            flex: 1,
            type: "number",
        },
        {
            headerName: "INTs",
            field: "interception",
            flex: 0.5,
            type: "number",
        },
        { headerName: "Sacks", field: "sack", flex: 0.5, type: "number" },
        {
            headerName: "Passing Yards",
            field: "passing_yds",
            flex: 1,
            type: "number",
        },
        {
            headerName: "Passing 1Ds",
            field: "first_down_pass",
            flex: 1,
            type: "number",
        },
        {
            headerName: "Rush Attempts",
            field: "rush_attempt",
            flex: 1,
            type: "number",
        },
        {
            headerName: "Rushing Yards",
            field: "rushing_yards",
            flex: 1,
            type: "number",
        },
        {
            headerName: "Yards Per Carry",
            field: "yardsPerCarry",
            flex: 1,
            valueGetter: getYPC,
            type: "number",
        },
        {
            headerName: "Rushing TDs",
            field: "rush_touchdown",
            flex: 1,
            type: "number",
        },
        {
            headerName: "Rushing 1Ds",
            field: "first_down_rush",
            flex: 1,
            type: "number",
        },
    ];

    function getCompletionPct(params: GridCellParams) {
        return (
            ((params.row.complete_pass || 0) / params.row.passing_attempts) *
            100
        ).toFixed(2);
    }

    function getYPC(params: GridCellParams) {
        return `${(
            (params.row.rushing_yards || 0) / params.row.rush_attempt
        ).toFixed(2)}`;
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

            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "") {
            setWeekFilter([]);
        }
    }, []);

    useEffect(() => {
        let teamsMap = new Map();

        for (let obj in props.teams) {
            if (teamsMap.get(props.teams[obj].posteam)) {
                let currentObj = teamsMap.get(props.teams[obj].posteam);
                let newObj = {
                    posteam: currentObj.posteam,
                    passing_attempts:
                        Number.parseInt(
                            currentObj.passing_attempts.toString()
                        ) +
                        Number.parseInt(
                            props.teams[obj].passing_attempts.toString()
                        ),
                    complete_pass:
                        Number.parseInt(currentObj.complete_pass.toString()) +
                        Number.parseInt(
                            props.teams[obj].complete_pass.toString()
                        ),
                    pass_touchdown:
                        Number.parseInt(currentObj.pass_touchdown.toString()) +
                        Number.parseInt(
                            props.teams[obj].pass_touchdown.toString()
                        ),
                    rush_touchdown:
                        Number.parseInt(currentObj.rush_touchdown.toString()) +
                        Number.parseInt(
                            props.teams[obj].rush_touchdown.toString()
                        ),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(
                            props.teams[obj].interception.toString()
                        ),
                    sack:
                        Number.parseInt(currentObj.sack.toString()) +
                        Number.parseInt(props.teams[obj].sack.toString()),
                    passing_yds:
                        Number.parseInt(currentObj.passing_yds.toString()) +
                        Number.parseInt(
                            props.teams[obj].passing_yds.toString()
                        ),
                    rushing_yards:
                        Number.parseInt(currentObj.rushing_yards.toString()) +
                        Number.parseInt(
                            props.teams[obj].rushing_yards.toString()
                        ),
                    first_down_rush:
                        Number.parseInt(currentObj.first_down_rush.toString()) +
                        Number.parseInt(
                            props.teams[obj].first_down_rush.toString()
                        ),
                    first_down_pass:
                        Number.parseInt(currentObj.first_down_pass.toString()) +
                        Number.parseInt(
                            props.teams[obj].first_down_pass.toString()
                        ),
                    rush_attempt:
                        Number.parseInt(currentObj.rush_attempt.toString()) +
                        Number.parseInt(
                            props.teams[obj].rush_attempt.toString()
                        ),
                    game_id_db: currentObj.game_id_db,
                };
                teamsMap.set(currentObj.posteam, newObj);
            } else {
                teamsMap.set(props.teams[obj].posteam, { ...props.teams[obj] });
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
            if (teamsMap.get(filteredTeams[obj].posteam)) {
                let currentObj = teamsMap.get(filteredTeams[obj].posteam);
                let newObj = {
                    posteam: currentObj.posteam,
                    passing_attempts:
                        Number.parseInt(
                            currentObj.passing_attempts.toString()
                        ) +
                        Number.parseInt(
                            filteredTeams[obj].passing_attempts.toString()
                        ),
                    complete_pass:
                        Number.parseInt(currentObj.complete_pass.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].complete_pass.toString()
                        ),
                    pass_touchdown:
                        Number.parseInt(currentObj.pass_touchdown.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].pass_touchdown.toString()
                        ),
                    rush_touchdown:
                        Number.parseInt(currentObj.rush_touchdown.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].rush_touchdown.toString()
                        ),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].interception.toString()
                        ),
                    sack:
                        Number.parseInt(currentObj.sack.toString()) +
                        Number.parseInt(filteredTeams[obj].sack.toString()),
                    passing_yds:
                        Number.parseInt(currentObj.passing_yds.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].passing_yds.toString()
                        ),
                    rushing_yards:
                        Number.parseInt(currentObj.rushing_yards.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].rushing_yards.toString()
                        ),
                    first_down_rush:
                        Number.parseInt(currentObj.first_down_rush.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].first_down_rush.toString()
                        ),
                    first_down_pass:
                        Number.parseInt(currentObj.first_down_pass.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].first_down_pass.toString()
                        ),
                    rush_attempt:
                        Number.parseInt(currentObj.rush_attempt.toString()) +
                        Number.parseInt(
                            filteredTeams[obj].rush_attempt.toString()
                        ),
                    game_id_db: currentObj.game_id_db,
                };
                teamsMap.set(currentObj.posteam, newObj);
            } else {
                teamsMap.set(filteredTeams[obj].posteam, {
                    ...filteredTeams[obj],
                });
            }
        }
        const reducedTeams = Array.from(teamsMap.values());

        setAggTeams(reducedTeams);
    }, [weekFilter]);

    return (
        <div className="weekly-team-page">
            <StatTableHeader />
            <Checkbox handleFilters={setWeekFilter} weekFilter={weekFilter} />
            <div className="weekly-team-stats">
                <StatTable
                    data={aggTeams}
                    columns={columns}
                    rowIdCol={"game_id_db"}
                    pageSize={32}
                />
            </div>
        </div>
    );
};

export default TeamWeeks;
