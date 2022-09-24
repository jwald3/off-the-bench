import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StatTable from "../../../components/StatTable";
import StatTableHeader from "../../../components/StatTableHeader";
import Checkbox from "../../../components/WeekCheckboxFilter";
import { teamStatColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: ITeam[];
    let phase = query.phase;
    let season = Number(query.season) || 2022;
    let teamQueryResponse;

    if (phase === "offense") {
        teamQueryResponse = await prisma.team_offense_stats_basic.findMany({
            where: {
                week: {
                    in: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18,
                    ],
                },
                season: season,
            },
        });
    } else if (phase === "defense") {
        teamQueryResponse = await prisma.team_defense_stats_basic.findMany({
            where: {
                week: {
                    in: [
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18,
                    ],
                },
                season: season,
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
    pass_attempts: number;
    completions: number;
    pass_touchdown: number;
    interceptions: number;
    sacks: number;
    passing_yards: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    db_id: string;
}

interface TeamProps {
    teams: ITeam[];
}

const TeamWeeks: React.FunctionComponent<TeamProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const columns = teamStatColumns;

    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);

    useEffect(() => {
        if (query.weeks !== undefined && query.weeks !== "none") {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "none") {
            setWeekFilter([]);
        }
    }, []);

    const aggregateStats = (dataframe: ITeam[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].posteam)) {
                let currentObj = teamsMap.get(dataframe[obj].posteam);
                let newObj = {
                    posteam: currentObj.posteam,
                    pass_attempts:
                        Number.parseInt(currentObj.pass_attempts.toString()) +
                        Number.parseInt(
                            dataframe[obj].pass_attempts.toString()
                        ),
                    completions:
                        Number.parseInt(currentObj.completions.toString()) +
                        Number.parseInt(dataframe[obj].completions.toString()),
                    pass_touchdown:
                        Number.parseInt(currentObj.pass_touchdown.toString()) +
                        Number.parseInt(
                            dataframe[obj].pass_touchdown.toString()
                        ),
                    rush_touchdown:
                        Number.parseInt(currentObj.rush_touchdown.toString()) +
                        Number.parseInt(
                            dataframe[obj].rush_touchdown.toString()
                        ),
                    interceptions:
                        Number.parseInt(currentObj.interceptions.toString()) +
                        Number.parseInt(
                            dataframe[obj].interceptions.toString()
                        ),
                    sacks:
                        Number.parseInt(currentObj.sacks.toString()) +
                        Number.parseInt(dataframe[obj].sacks.toString()),
                    passing_yards:
                        Number.parseInt(currentObj.passing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].passing_yards.toString()
                        ),
                    rushing_yards:
                        Number.parseInt(currentObj.rushing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].rushing_yards.toString()
                        ),
                    rush_attempt:
                        Number.parseInt(currentObj.rush_attempt.toString()) +
                        Number.parseInt(dataframe[obj].rush_attempt.toString()),
                    db_id: currentObj.db_id,
                };
                teamsMap.set(currentObj.posteam, newObj);
            } else {
                teamsMap.set(dataframe[obj].posteam, { ...dataframe[obj] });
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

    return (
        <div className="weekly-team-page">
            <StatTableHeader />
            <Checkbox handleFilters={setWeekFilter} weekFilter={weekFilter} />
            <div className="weekly-team-stats">
                <StatTable
                    data={aggTeams}
                    columns={columns}
                    rowIdCol={"db_id"}
                    pageSize={32}
                />
            </div>
        </div>
    );
};

export default TeamWeeks;
