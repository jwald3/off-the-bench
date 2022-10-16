import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import GameLog from "../../../components/GameLog";
import TeamHomepageBar from "../../../components/TeamHomepageBar";
import TeamLinkBar from "../../../components/TeamLinkBar";
import UsageInfo from "../../../components/UsageInfo";
import {
    conversionRateStatCols,
    downDataColumns,
    teamGameLogColumns,
    teamStatLog,
} from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const team = String(query.team) || "NYJ";
    let season = Number(query.season) || 2022;

    let teamInformation: ITeamInformation[];

    const teamDbInfo = await prisma.team_information.findMany({
        where: {
            team_abbr: team,
        },
    });
    teamInformation = JSON.parse(
        JSON.stringify(teamDbInfo, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    let teamQueryResponse = await prisma.game_logs_basic.findMany({
        where: {
            season: season,
            posteam: team,
        },
    });

    let opponentQueryResponse = await prisma.game_logs_basic.findMany({
        where: {
            season: season,
            defteam: team,
        },
    });

    let statsByDown = await prisma.down_by_down_offense.findMany({
        where: {
            season: season,
            posteam: team,
        },
    });

    let conversionRts = await prisma.conversion_success.findMany({
        where: {
            season: season,
            posteam: team,
        },
    });

    const playerData: ITeamGameLogs[] = JSON.parse(
        JSON.stringify(teamQueryResponse, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    const downData: IStatsByDown[] = JSON.parse(
        JSON.stringify(statsByDown, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    const opponentGameLogs: ITeamGameLogs[] = JSON.parse(
        JSON.stringify(opponentQueryResponse, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    const successRates: IConversionRates[] = JSON.parse(
        JSON.stringify(conversionRts, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    return {
        props: {
            game_logs: JSON.parse(
                JSON.stringify(playerData, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
            opponent_game_logs: JSON.parse(
                JSON.stringify(opponentGameLogs, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
            down_data: JSON.parse(
                JSON.stringify(downData, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
            conversion_success: JSON.parse(
                JSON.stringify(successRates, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
            team_details: JSON.parse(
                JSON.stringify(teamInformation, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
    };
};

interface ITeamGameLogs {
    game_id: string;
    posteam: string;
    defteam: string;
    posteam_score: number;
    defteam_score: number;
    yards_gained: number;
    turnovers: number;
    fumbles: number;
    fumbles_lost: number;
    completed_passes: number;
    incomplete_passes: number;
    pass_attempts: number;
    receiving_yards: number;
    passing_touchdowns: number;
    interceptions: number;
    sacks: number;
    rush_attempts: number;
    rushing_yards: number;
    rushing_touchdown: number;
    extra_points_made: number;
    extra_point_attempts: number;
    field_goals_made: number;
    field_goals_attempted: number;
    time_of_possession: string;
    penalties: number;
    penalty_yards: number;
    db_id: string;
    season: number;
    week: number;
}

interface ITeamInformation {
    team_abbr: string;
    team_name: string;
    team_id: number;
    team_nick: string;
    team_conf: string;
    team_division: string;
    wins: number;
    losses: number;
    ties: number;
    standing: string;
    team_color: string;
    team_color2: string;
    team_color3: string;
    team_color4: string;
    team_logo_wikipedia: string;
    team_logo_espn: string;
    team_wordmark: string;
    team_conference_logo: string;
    team_league_logo: string;
    team_logo_squared: string;
}

interface IStatsByDown {
    game_id: string;
    posteam: string;
    down: number;
    special: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    complete_pass: number;
    pass_attempt: number;
    passing_yards: number;
    pass_touchdown: number;
    interception: number;
    sack: number;
    season: number;
    week: number;
    db_id: string;
}

interface IConversionRates {
    posteam: string;
    game_id: string;
    play_type: string;
    third_down_converted: number;
    third_down_failed: number;
    fourth_down_converted: number;
    fourth_down_failed: number;
    third_down_attempt: number;
    fourth_down_attempt: number;
    week: number;
    season: number;
    db_id: string;
}

interface GameLogProps {
    game_logs: ITeamGameLogs[];
    down_data: IStatsByDown[];
    opponent_game_logs: ITeamGameLogs[];
    conversion_success: IConversionRates[];
    team_details: ITeamInformation[];
}

const TeamPage: React.FunctionComponent<GameLogProps> = ({ ...props }) => {
    const [teamName, setTeamName] = useState(props.team_details);
    const [gameLogs, setGameLogs] = useState(props.game_logs);
    const [opponentGameLogs, setOpponentGameLogs] = useState(
        props.opponent_game_logs
    );
    const [offenseDownData, setOffenseDownData] = useState(props.down_data);
    const [convSuccessRates, setConvSuccessRates] = useState(
        props.conversion_success
    );
    const [aggConvSuccessRts, setAggConvSuccessRts] = useState(
        props.conversion_success
    );
    const [aggedTeamGameLogs, setAggedTeamGameLogs] = useState(props.game_logs);
    const [aggDownData, setAggDownData] = useState(props.down_data);
    const [downChartView, setDownChartView] = useState("all");
    const [downChartDataOne, setDownChartDataOne] = useState("rushPercent");
    const [downChartDataTwo, setDownChartDataTwo] = useState("passPercent");
    const [convChartView, setConvChartView] = useState("all");
    const [convChartDataOne, setConvChartDataOne] = useState(
        "third_down_converted"
    );
    const [convChartDataTwo, setConvChartDataTwo] =
        useState("third_down_attempt");

    const aggregateStats = (dataframe: IStatsByDown[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].down)) {
                let currentObj = teamsMap.get(dataframe[obj].down);
                let newObj = {
                    posteam: currentObj.posteam,
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
                    complete_pass:
                        Number.parseInt(currentObj.complete_pass.toString()) +
                        Number.parseInt(
                            dataframe[obj].complete_pass.toString()
                        ),
                    pass_attempt:
                        Number.parseInt(currentObj.pass_attempt.toString()) +
                        Number.parseInt(dataframe[obj].pass_attempt.toString()),
                    passing_yards:
                        Number.parseInt(currentObj.passing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].passing_yards.toString()
                        ),
                    pass_touchdown:
                        Number.parseInt(currentObj.pass_touchdown.toString()) +
                        Number.parseInt(
                            dataframe[obj].pass_touchdown.toString()
                        ),
                    interception:
                        Number.parseInt(currentObj.interception.toString()) +
                        Number.parseInt(dataframe[obj].interception.toString()),
                    sack:
                        Number.parseInt(currentObj.sack.toString()) +
                        Number.parseInt(dataframe[obj].sack.toString()),

                    game_id: currentObj.game_id,
                    db_id: currentObj.db_id,
                    down: currentObj.down,
                };
                teamsMap.set(currentObj.down, newObj);
            } else {
                teamsMap.set(dataframe[obj].down, { ...dataframe[obj] });
            }
        }
        return Array.from(teamsMap.values());
    };

    const aggGameLogs = (dataframe: ITeamGameLogs[], aggCol: string) => {
        let teamsMap = new Map();

        if (aggCol === "posteam") {
            for (let obj in dataframe) {
                if (teamsMap.get(dataframe[obj].posteam)) {
                    let currentObj = teamsMap.get(dataframe[obj].posteam);
                    let newObj = {
                        posteam: currentObj.posteam,
                        rush_attempts:
                            Number.parseInt(
                                currentObj.rush_attempts.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].rush_attempts.toString()
                            ),
                        rushing_yards:
                            Number.parseInt(
                                currentObj.rushing_yards.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].rushing_yards.toString()
                            ),
                        rushing_touchdown:
                            Number.parseInt(
                                currentObj.rushing_touchdown.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].rushing_touchdown.toString()
                            ),
                        turnovers:
                            Number.parseInt(currentObj.turnovers.toString()) +
                            Number.parseInt(
                                dataframe[obj].turnovers.toString()
                            ),
                        completed_passes:
                            Number.parseInt(
                                currentObj.completed_passes.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].completed_passes.toString()
                            ),
                        pass_attempts:
                            Number.parseInt(
                                currentObj.pass_attempts.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].pass_attempts.toString()
                            ),
                        receiving_yards:
                            Number.parseInt(
                                currentObj.receiving_yards.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].receiving_yards.toString()
                            ),
                        passing_touchdowns:
                            Number.parseInt(
                                currentObj.passing_touchdowns.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].passing_touchdowns.toString()
                            ),
                        interceptions:
                            Number.parseInt(
                                currentObj.interceptions.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].interceptions.toString()
                            ),
                        sacks:
                            Number.parseInt(currentObj.sacks.toString()) +
                            Number.parseInt(dataframe[obj].sacks.toString()),
                        fumbles:
                            Number.parseInt(currentObj.fumbles.toString()) +
                            Number.parseInt(dataframe[obj].fumbles.toString()),
                        fumbles_lost:
                            Number.parseInt(
                                currentObj.fumbles_lost.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].fumbles_lost.toString()
                            ),
                        extra_points_made:
                            Number.parseInt(
                                currentObj.extra_points_made.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].extra_points_made.toString()
                            ),
                        extra_point_attempts:
                            Number.parseInt(
                                currentObj.extra_point_attempts.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].extra_point_attempts.toString()
                            ),
                        field_goals_made:
                            Number.parseInt(
                                currentObj.field_goals_made.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].field_goals_made.toString()
                            ),
                        field_goals_attempted:
                            Number.parseInt(
                                currentObj.field_goals_attempted.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].field_goals_attempted.toString()
                            ),
                        penalties:
                            Number.parseInt(currentObj.penalties.toString()) +
                            Number.parseInt(
                                dataframe[obj].penalties.toString()
                            ),
                        penalty_yards:
                            Number.parseInt(
                                currentObj.penalty_yards.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].penalty_yards.toString()
                            ),
                        game_id: currentObj.game_id,
                        db_id: currentObj.db_id,
                        team: "Team",
                    };
                    teamsMap.set(currentObj.posteam, newObj);
                } else {
                    teamsMap.set(dataframe[obj].posteam, { ...dataframe[obj] });
                }
            }
        } else if (aggCol === "defteam") {
            for (let obj in dataframe) {
                if (teamsMap.get(dataframe[obj].defteam)) {
                    let currentObj = teamsMap.get(dataframe[obj].defteam);
                    let newObj = {
                        defteam: currentObj.defteam,
                        rush_attempts:
                            Number.parseInt(
                                currentObj.rush_attempts.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].rush_attempts.toString()
                            ),
                        rushing_yards:
                            Number.parseInt(
                                currentObj.rushing_yards.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].rushing_yards.toString()
                            ),
                        rushing_touchdown:
                            Number.parseInt(
                                currentObj.rushing_touchdown?.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].rushing_touchdown.toString()
                            ),
                        turnovers:
                            Number.parseInt(currentObj.turnovers.toString()) +
                            Number.parseInt(
                                dataframe[obj].turnovers.toString()
                            ),
                        completed_passes:
                            Number.parseInt(
                                currentObj.completed_passes.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].completed_passes.toString()
                            ),
                        pass_attempts:
                            Number.parseInt(
                                currentObj.pass_attempts.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].pass_attempts.toString()
                            ),
                        receiving_yards:
                            Number.parseInt(
                                currentObj.receiving_yards.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].receiving_yards.toString()
                            ),
                        passing_touchdowns:
                            Number.parseInt(
                                currentObj.passing_touchdowns.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].passing_touchdowns.toString()
                            ),
                        interceptions:
                            Number.parseInt(
                                currentObj.interceptions.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].interceptions.toString()
                            ),
                        sacks:
                            Number.parseInt(currentObj.sacks.toString()) +
                            Number.parseInt(dataframe[obj].sacks.toString()),
                        fumbles:
                            Number.parseInt(currentObj.fumbles.toString()) +
                            Number.parseInt(dataframe[obj].fumbles.toString()),
                        fumbles_lost:
                            Number.parseInt(
                                currentObj.fumbles_lost.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].fumbles_lost.toString()
                            ),
                        extra_points_made:
                            Number.parseInt(
                                currentObj.extra_points_made.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].extra_points_made.toString()
                            ),
                        extra_point_attempts:
                            Number.parseInt(
                                currentObj.extra_point_attempts.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].extra_point_attempts.toString()
                            ),
                        field_goals_made:
                            Number.parseInt(
                                currentObj.field_goals_made.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].field_goals_made.toString()
                            ),
                        field_goals_attempted:
                            Number.parseInt(
                                currentObj.field_goals_attempted.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].field_goals_attempted.toString()
                            ),
                        penalties:
                            Number.parseInt(currentObj.penalties.toString()) +
                            Number.parseInt(
                                dataframe[obj].penalties.toString()
                            ),
                        penalty_yards:
                            Number.parseInt(
                                currentObj.penalty_yards.toString()
                            ) +
                            Number.parseInt(
                                dataframe[obj].penalty_yards.toString()
                            ),
                        game_id: currentObj.game_id,
                        db_id: currentObj.db_id,
                        team: "Opponent",
                    };
                    teamsMap.set(currentObj.defteam, newObj);
                } else {
                    teamsMap.set(dataframe[obj].defteam, { ...dataframe[obj] });
                }
            }
        }

        return Array.from(teamsMap.values());
    };

    const aggregateConvRates = (dataframe: IConversionRates[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].play_type)) {
                let currentObj = teamsMap.get(dataframe[obj].play_type);
                let newObj = {
                    play_type: currentObj.play_type,
                    posteam: currentObj.posteam,
                    third_down_converted:
                        Number.parseInt(
                            currentObj.third_down_converted.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].third_down_converted.toString()
                        ),
                    third_down_attempt:
                        Number.parseInt(
                            currentObj.third_down_attempt.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].third_down_attempt.toString()
                        ),
                    fourth_down_converted:
                        Number.parseInt(
                            currentObj.fourth_down_converted.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].fourth_down_converted.toString()
                        ),
                    fourth_down_attempt:
                        Number.parseInt(
                            currentObj.fourth_down_attempt.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].fourth_down_attempt.toString()
                        ),
                    db_id: currentObj.db_id,
                };
                teamsMap.set(currentObj.play_type, newObj);
            } else {
                teamsMap.set(dataframe[obj].play_type, { ...dataframe[obj] });
            }
        }
        return Array.from(teamsMap.values());
    };

    useEffect(() => {
        if (downChartView === "all") {
            setDownChartDataOne("rush_percent");
            setDownChartDataTwo("pass_percent");
        } else if (downChartView === "rz") {
            setDownChartDataOne("yardsPerCarry");
            setDownChartDataTwo("yardsPerTarget");
        }
    }, [downChartView]);

    useEffect(() => {
        if (convChartView === "all") {
            setConvChartDataOne("third_down_converted");
            setConvChartDataTwo("third_down_attempt");
        } else if (convChartView === "rz") {
            setConvChartDataOne("fourth_down_converted");
            setConvChartDataTwo("fourth_down_attempt");
        }
    }, [convChartView]);

    useEffect(() => {
        const reducedDownData = aggregateStats(props.down_data);

        reducedDownData.forEach(
            (data) =>
                (data["rush_percent"] = (
                    (data.rush_attempt /
                        (data.rush_attempt + data.pass_attempt)) *
                    100
                ).toFixed(1))
        );

        reducedDownData.forEach(
            (data) =>
                (data["pass_percent"] = (
                    (data.pass_attempt /
                        (data.rush_attempt + data.pass_attempt)) *
                    100
                ).toFixed(1))
        );

        reducedDownData.forEach(
            (data) =>
                (data["yardsPerCarry"] = (
                    data.rushing_yards / data.rush_attempt
                ).toFixed(1))
        );

        reducedDownData.forEach(
            (data) =>
                (data["yardsPerTarget"] = (
                    data.passing_yards / data.pass_attempt
                ).toFixed(1))
        );

        setAggDownData(reducedDownData);
    }, []);

    useEffect(() => {
        const oppStats = aggGameLogs(opponentGameLogs, "defteam");
        const teamStats = aggGameLogs(gameLogs, "posteam");

        const aggStatLog = [...teamStats, ...oppStats];

        setAggedTeamGameLogs(aggStatLog);
    }, []);

    useEffect(() => {
        const aggrConvSuccessRates = aggregateConvRates(
            props.conversion_success
        );

        setAggConvSuccessRts(aggrConvSuccessRates);
    }, []);

    const getTeamRecord = () => {
        if (teamName[0].ties > 0) {
            return (
                teamName[0].wins +
                "-" +
                teamName[0].losses +
                "-" +
                teamName[0].ties
            );
        } else {
            return teamName[0].wins + "-" + teamName[0].losses;
        }
    };

    return (
        <div>
            <Head>
                <title>{teamName[0].team_name}</title>
                <meta
                    name="description"
                    content={`Team Homepage for the ${teamName[0].team_name}`}
                />
            </Head>
            <div
                className="weekly-team-page"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "2%",
                    flexDirection: "column",
                }}
            >
                <TeamHomepageBar
                    teamName={teamName[0].team_name}
                    divisionStanding={teamName[0].standing}
                    divisionName={teamName[0].team_division}
                    record={getTeamRecord()}
                />
                <TeamLinkBar />
                <GameLog
                    data={aggedTeamGameLogs}
                    columns={teamStatLog}
                    rowIdCol={"db_id"}
                    pageSize={18}
                    tableTitle="Offense, Team Vs. Opponent"
                />
                <GameLog
                    data={gameLogs}
                    columns={teamGameLogColumns}
                    rowIdCol={"db_id"}
                    pageSize={21}
                    tableTitle="Game Log"
                />
                <UsageInfo
                    playerData={aggDownData}
                    columns={downDataColumns}
                    barDataOne={downChartDataOne}
                    barDataTwo={downChartDataTwo}
                    headerTitle="Rushing vs. Receiving"
                    altOptionOne="Attempts"
                    altOptionTwo="Yards Per Attempt"
                    altOptionThree=""
                    changeView={setDownChartView}
                    dataKey="down"
                />
                <UsageInfo
                    playerData={aggConvSuccessRts}
                    columns={conversionRateStatCols}
                    barDataOne={convChartDataOne}
                    barDataTwo={convChartDataTwo}
                    headerTitle="Conversion Rates"
                    altOptionOne="3rd Down"
                    altOptionTwo="4th Down"
                    altOptionThree=""
                    changeView={setConvChartView}
                    dataKey="play_type"
                />
            </div>
        </div>
    );
};

export default TeamPage;
