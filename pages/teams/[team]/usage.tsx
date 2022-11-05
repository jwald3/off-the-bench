import prisma from "../../../lib/prisma";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import {
    playerRushUsageColumns,
    playerUsageColumns,
} from "../../../data/tableColumns";
import dynamic from "next/dynamic";
import UsageInfo from "../../../components/UsageInfo";
import TeamLinkFooter from "../../../components/TeamFooter";
import SelectorTray from "../../../components/SelectorTray";
const StatChart = dynamic(import("../../../components/StatChart"), {
    ssr: false,
});
import styles from "../../../styles/UsagePage.module.scss";
import {
    aggregateUsageStats,
    parseBigInt,
    regSeasonWeeks,
} from "../../../data/globalVars";
import { IPlayerUsageStats } from "../../../ts/interfaces/playerInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;

        let teamQueryResponse = await prisma.player_usage_by_team.findMany({
            where: {
                season: season,
                posteam: team,
                week: {
                    in: regSeasonWeeks,
                },
            },
        });

        const playerData: IPlayerUsageStats[] = parseBigInt(teamQueryResponse);

        return {
            props: {
                players: parseBigInt(playerData),
            },
        };
    },
});

interface PlayerProps {
    players: IPlayerUsageStats[];
}

const PlayerUsage: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const [playerStats, setPlayerStats] = useState(props.players);
    const [aggPlayers, setAggPlayers] = useState(props.players);
    const [playerTargets, setPlayerTargets] = useState(props.players);
    const [playerRushes, setPlayerRushes] = useState(props.players);
    const [recChartView, setRecChartView] = useState("all");
    const [recChartDataOne, setRecChartDataOne] = useState("target");
    const [recChartDataTwo, setRecChartDataTwo] = useState("reception");
    const [rushChartView, setRushChartView] = useState("all");
    const [rushChartDataOne, setRushChartDataOne] = useState("rush");
    const [rushChartDataTwo, setRushChartDataTwo] = useState("");
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

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
            const selectedDowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            console.log(query.downs);
            setDownFilter(selectedDowns);
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

        currWeekData.forEach(
            (tgt) => (tgt.target = parseInt(tgt.target.toString()))
        );

        currWeekData.forEach(
            (rec) => (rec.reception = parseInt(rec.reception.toString()))
        );

        const reducedTeams: Array<IPlayerUsageStats> = aggregateUsageStats(
            currWeekData,
            "down",
            "target",
            "reception",
            "receiving_touchdown",
            "passing_yards",
            "yards_after_catch",
            "air_yards",
            "redzone_target",
            "redzone_reception",
            "endzone_target",
            "endzone_reception",
            "receiving_first_down",
            "receiving_epa",
            "rush",
            "rushing_yards",
            "rush_touchdown",
            "stacked_box_rush",
            "redzone_carry",
            "redzone_rush_td",
            "goal_to_go_carry",
            "goalline_carry",
            "goalline_rush_td",
            "fumble",
            "tackled_for_loss",
            "rushing_first_down",
            "rush_epa",
            "season",
            "week",
            "week_count",
            "total_team_target"
        );

        // const targets = reducedTeams.filter((player) => player.target !== 0);

        // const sumOfTargets = targets.reduce((i, obj) => {
        //     return i + obj.target;
        // }, 0);

        // targets.forEach((group) => {
        //     return { ...group, total_team_target: sumOfTargets };
        // });

        const sumOfSnaps = reducedTeams.reduce((i, obj) => {
            return i + obj.target;
        }, 0);

        const finalTargets: IPlayerUsageStats[] = reducedTeams
            .filter((group) => {
                return group.target !== 0;
            })
            .map((group) => {
                return {
                    ...group,
                    total_team_target: sumOfSnaps,
                };
            });

        console.log(sumOfSnaps);

        finalTargets.sort((a, b) => {
            return b.target - a.target;
        });

        setPlayerTargets(finalTargets);

        const rushes = reducedTeams.filter((player) => player.rush !== 0);

        const sumOfRushes = rushes.reduce((i, obj) => {
            return i + obj.rush;
        }, 0);

        rushes.forEach((group) => {
            return { ...group, total_team_rushes: sumOfRushes };
        });

        // targets.sort((a, b) => b.target - a.target);
        rushes.sort((a, b) => b.rush - a.rush);

        // setPlayerTargets(targets);
        setPlayerRushes(rushes);
    }, []);

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

    useEffect(() => {
        const filteredPlayers = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            );

        const reducedPlayers: Array<IPlayerUsageStats> = aggregateUsageStats(
            filteredPlayers,
            "down",
            "target",
            "reception",
            "receiving_touchdown",
            "passing_yards",
            "yards_after_catch",
            "air_yards",
            "redzone_target",
            "redzone_reception",
            "endzone_target",
            "endzone_reception",
            "receiving_first_down",
            "receiving_epa",
            "rush",
            "rushing_yards",
            "rush_touchdown",
            "stacked_box_rush",
            "redzone_carry",
            "redzone_rush_td",
            "goal_to_go_carry",
            "goalline_carry",
            "goalline_rush_td",
            "fumble",
            "tackled_for_loss",
            "rushing_first_down",
            "rush_epa",
            "season",
            "week",
            "week_count",
            "total_team_target"
        );

        setAggPlayers(reducedPlayers);

        // const targets = reducedPlayers.filter((player) => player.target !== 0);

        // const sumOfTargets = targets.reduce((i, obj) => {
        //     return i + obj.target;
        // }, 0);

        // targets.forEach((group) => {
        //     return { ...group, total_team_target: sumOfTargets };
        // });

        const targets = reducedPlayers.filter((group) => {
            return group.target !== 0;
        });

        const sumOfTargets = targets.reduce((i, obj) => {
            return i + obj.target;
        }, 0);

        const finalTargets: IPlayerUsageStats[] = targets.map((player) => {
            return {
                ...player,
                total_team_target: sumOfTargets,
            };
        });

        console.log(sumOfTargets);

        finalTargets.sort((a, b) => {
            return b.target - a.target;
        });

        setPlayerTargets(finalTargets);

        const rushes = reducedPlayers.filter((player) => player.rush !== 0);

        const sumOfRushes = rushes.reduce((i, obj) => {
            return i + obj.rush;
        }, 0);

        rushes.forEach((group) => {
            return { ...group, total_team_rushes: sumOfRushes };
        });

        // targets.sort((a, b) => b.target - a.target);
        rushes.sort((a, b) => b.rush - a.rush);

        // setPlayerTargets(targets);
        setPlayerRushes(rushes);
    }, [weekFilter, downFilter]);

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

export default PlayerUsage;
