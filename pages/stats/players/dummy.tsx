import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    playerAdvRushCols,
    playerRushUsageColumns,
    playerUsageColumns,
    teamPersonnelGoupingColumns,
    teamPersonnelGroupingColumns,
    teamStatColumns,
} from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/UsagePage.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { ITeamFormationStats } from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { IPlayerUsageStats } from "../../../ts/interfaces/playerInterfaces";
import UsageInfo from "../../../components/UsageInfo";
import TeamLinkFooter from "../../../components/TeamFooter";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;
        let teamParsed: IPlayerUsageStats[];

        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const teamSubRes = await prisma.player_usage_by_team.groupBy({
            by: ["posteam", "player_id", "position", "gsis_id"],
            where: {
                season: season,
                week: {
                    in: weeks || [0],
                },
                down: {
                    in: downs,
                },
                posteam: team,
            },
            _sum: {
                target: true,
                reception: true,
                receiving_touchdown: true,
                passing_yards: true,
                yards_after_catch: true,
                air_yards: true,
                redzone_target: true,
                redzone_reception: true,
                endzone_target: true,
                endzone_reception: true,
                receiving_first_down: true,
                receiving_epa: true,
                rush: true,
                rushing_yards: true,
                rush_touchdown: true,
                stacked_box_rush: true,
                redzone_carry: true,
                redzone_rush_td: true,
                goal_to_go_carry: true,
                goalline_carry: true,
                goalline_rush_td: true,
                fumble: true,
                tackled_for_loss: true,
                rushing_first_down: true,
                rush_epa: true,
                week_count: true,
                total_team_target: true,
                total_team_rushes: true,
            },
            _count: {
                game_id: true,
            },
            orderBy: {
                posteam: "asc",
            },
        });

        teamParsed = parseBigInt(teamSubRes);

        const flat = (obj: any, out: any) => {
            Object.keys(obj).forEach((key) => {
                if (typeof obj[key] == "object") {
                    out = flat(obj[key], out); //recursively call for nesteds
                } else {
                    out[key] = obj[key]; //direct assign for values
                }
            });
            return out;
        };

        let teamData = teamParsed.map((team) => flat(team, {}));

        return {
            props: {
                teamData: teamData,
            },
        };
    },
});

interface PlayerProps {
    teamData: IPlayerUsageStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

    const [playerTargets, setPlayerTargets] = useState(props.teamData);
    const [playerRushes, setPlayerRushes] = useState(props.teamData);
    const [recChartView, setRecChartView] = useState("all");
    const [recChartDataOne, setRecChartDataOne] = useState("target");
    const [recChartDataTwo, setRecChartDataTwo] = useState("reception");
    const [rushChartView, setRushChartView] = useState("all");
    const [rushChartDataOne, setRushChartDataOne] = useState("rush");
    const [rushChartDataTwo, setRushChartDataTwo] = useState("");

    useEffect(() => {
        // targets
        let sumOfTargets: number;
        let finalTargets: IPlayerUsageStats[];

        if (recChartView === "rz") {
            sumOfTargets = props.teamData.reduce((i, obj) => {
                return i + obj.redzone_target;
            }, 0);

            finalTargets = props.teamData
                .filter((group) => {
                    return group.redzone_target !== 0;
                })
                .map((group) => {
                    return {
                        ...group,
                        target_metric: group.redzone_target,
                        total_team_target: sumOfTargets,
                    };
                });

            finalTargets.sort((a, b) => {
                return b.redzone_target - a.redzone_target;
            });

            setPlayerTargets(finalTargets);
        } else if (recChartView === "ez") {
            sumOfTargets = props.teamData.reduce((i, obj) => {
                return i + obj.endzone_target;
            }, 0);

            finalTargets = props.teamData
                .filter((group) => {
                    return group.endzone_target !== 0;
                })
                .map((group) => {
                    return {
                        ...group,
                        target_metric: group.endzone_target,
                        total_team_target: sumOfTargets,
                    };
                });

            finalTargets.sort((a, b) => {
                return b.endzone_target - a.endzone_target;
            });

            setPlayerTargets(finalTargets);
        } else {
            sumOfTargets = props.teamData.reduce((i, obj) => {
                return i + obj.target;
            }, 0);

            finalTargets = props.teamData
                .filter((group) => {
                    return group.target !== 0;
                })
                .map((group) => {
                    return {
                        ...group,
                        target_metric: group.target,
                        total_team_target: sumOfTargets,
                    };
                });

            finalTargets.sort((a, b) => {
                return b.target - a.target;
            });
        }
        setPlayerTargets(finalTargets);

        // rushes
        let sumOfRushes: number;
        let finalRushes: IPlayerUsageStats[];

        if (rushChartView === "rz") {
            sumOfRushes = props.teamData.reduce((i, obj) => {
                return i + obj.redzone_carry;
            }, 0);

            finalRushes = props.teamData
                .filter((group) => {
                    return group.redzone_carry !== 0;
                })
                .map((group) => {
                    return {
                        ...group,
                        rush_metric: group.redzone_carry,
                        total_team_rushes: sumOfRushes,
                    };
                });

            finalRushes.sort((a, b) => {
                return b.redzone_carry - a.redzone_carry;
            });
        } else if (rushChartView === "ez") {
            sumOfRushes = props.teamData.reduce((i, obj) => {
                return i + obj.goalline_carry;
            }, 0);

            finalRushes = props.teamData
                .filter((group) => {
                    return group.goalline_carry !== 0;
                })
                .map((group) => {
                    return {
                        ...group,
                        rush_metric: group.goalline_carry,
                        total_team_rushes: sumOfRushes,
                    };
                });

            finalRushes.sort((a, b) => {
                return b.goalline_carry - a.goalline_carry;
            });
        } else {
            sumOfRushes = props.teamData.reduce((i, obj) => {
                return i + obj.rush;
            }, 0);

            finalRushes = props.teamData
                .filter((group) => {
                    return group.rush !== 0;
                })
                .map((group) => {
                    return {
                        ...group,
                        rush_metric: group.rush,
                        total_team_rushes: sumOfRushes,
                    };
                });

            finalRushes.sort((a, b) => {
                return b.rush - a.rush;
            });
        }
        setPlayerRushes(finalRushes);
    }, [props.teamData, weekFilter, downFilter, recChartView, rushChartView]);

    useEffect(() => {
        if (recChartView === "all") {
            setRecChartDataOne("target");
            setRecChartDataTwo("reception");
        } else if (recChartView === "rz") {
            setRecChartDataOne("redzone_target");
            setRecChartDataTwo("redzone_reception");
        } else if (recChartView === "ez") {
            setRecChartDataOne("endzone_target");
            setRecChartDataTwo("endzone_reception");
        }
    }, [recChartView]);

    useEffect(() => {
        if (rushChartView === "all") {
            setRushChartDataOne("rush");
            setRushChartDataTwo("");
        } else if (rushChartView === "rz") {
            setRushChartDataOne("redzone_carry");
            setRushChartDataTwo("redzone_rush_td");
        } else if (rushChartView === "ez") {
            setRushChartDataOne("goalline_carry");
            setRushChartDataTwo("goalline_rush_td");
        }
    }, [rushChartView]);

    return (
        <div className={styles.usagePageContainer}>
            <Head>
                <title>Team Usage Stats</title>
                <meta name="description" content="Team Usage Stats" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width, height=device-height"
                />
            </Head>
            <div className={styles.usagePage}>
                <div className={styles.selectorTrayContainer}>
                    <SelectorTray
                        handleWeekFilters={setWeekFilter}
                        weekFilter={weekFilter}
                        seasonFilter={Number(selectedSeason)}
                        handleSeason={setSelectedSeason}
                        handleDownFilters={setDownFilter}
                        downFilter={downFilter}
                        phaseUrl={""}
                        showStatSel={false}
                        statOption={""}
                        categories={""}
                    />
                </div>
                <UsageInfo
                    playerData={playerTargets}
                    columns={playerUsageColumns}
                    barDataOne={recChartDataOne}
                    barDataTwo={recChartDataTwo}
                    headerTitle="team targets"
                    altOptionOne="All"
                    altOptionTwo="Red Zone"
                    altOptionThree="End Zone"
                    changeView={setRecChartView}
                    dataKey="player_id"
                />
                <UsageInfo
                    playerData={playerRushes}
                    columns={playerRushUsageColumns}
                    barDataOne={rushChartDataOne}
                    barDataTwo={rushChartDataTwo}
                    headerTitle="team rushes"
                    altOptionOne="All"
                    altOptionTwo="Red Zone"
                    altOptionThree="Goal Line"
                    changeView={setRushChartView}
                    dataKey="player_id"
                />
                <TeamLinkFooter />
            </div>
        </div>
    );
};

export default PlayerWeeks;
