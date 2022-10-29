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
    const [recChartDataOne, setRecChartDataOne] = useState("targets");
    const [recChartDataTwo, setRecChartDataTwo] = useState("receptions");
    const [rushChartView, setRushChartView] = useState("all");
    const [rushChartDataOne, setRushChartDataOne] = useState("rush_attempt");
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
            (tgt) => (tgt.targets = parseInt(tgt.targets.toString()))
        );

        currWeekData.forEach(
            (rec) => (rec.receptions = parseInt(rec.receptions.toString()))
        );

        const reducedTeams: Array<IPlayerUsageStats> = aggregateUsageStats(
            currWeekData,
            "down",
            "targets",
            "receptions",
            "receiving_yards",
            "air_yards",
            "yards_after_catch",
            "receiving_touchdown",
            "redzone_target",
            "redzone_catch",
            "endzone_target",
            "endzone_catch",
            "first_down_target",
            "second_down_target",
            "third_down_target",
            "fourth_down_target",
            "first_down_catch",
            "second_down_catch",
            "third_down_catch",
            "fourth_down_catch",
            "rush_attempt",
            "rushing_yards",
            "rush_touchdown",
            "stacked_box_rush",
            "tackled_for_loss",
            "fumble",
            "first_down_rush",
            "second_down_rush",
            "third_down_rush",
            "fourth_down_rush",
            "redzone_rush",
            "goalline_rush",
            "redzone_rush_touchdown",
            "goalline_rush_touchdown",
            "season",
            "week"
        );

        const targets = reducedTeams.filter((player) => player.targets !== 0);

        const rushes = reducedTeams.filter(
            (player) => player.rush_attempt !== 0
        );

        targets.sort((a, b) => b.targets - a.targets);
        rushes.sort((a, b) => b.rush_attempt - a.rush_attempt);

        setPlayerTargets(targets);
        setPlayerRushes(rushes);
    }, []);

    useEffect(() => {
        if (recChartView === "all") {
            setRecChartDataOne("targets");
            setRecChartDataTwo("receptions");
        } else if (recChartView === "rz") {
            setRecChartDataOne("redzone_target");
            setRecChartDataTwo("redzone_catch");
        } else if (recChartView === "ez") {
            setRecChartDataOne("endzone_target");
            setRecChartDataTwo("endzone_catch");
        }
    }, [recChartView]);

    useEffect(() => {
        if (rushChartView === "all") {
            setRushChartDataOne("rush_attempt");
            setRushChartDataTwo("");
        } else if (rushChartView === "rz") {
            setRushChartDataOne("redzone_rush");
            setRushChartDataTwo("redzone_rush_touchdown");
        } else if (rushChartView === "ez") {
            setRushChartDataOne("goalline_rush");
            setRushChartDataTwo("goalline_rush_touchdown");
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
            "targets",
            "receptions",
            "receiving_yards",
            "air_yards",
            "yards_after_catch",
            "receiving_touchdown",
            "redzone_target",
            "redzone_catch",
            "endzone_target",
            "endzone_catch",
            "first_down_target",
            "second_down_target",
            "third_down_target",
            "fourth_down_target",
            "first_down_catch",
            "second_down_catch",
            "third_down_catch",
            "fourth_down_catch",
            "rush_attempt",
            "rushing_yards",
            "rush_touchdown",
            "stacked_box_rush",
            "tackled_for_loss",
            "fumble",
            "first_down_rush",
            "second_down_rush",
            "third_down_rush",
            "fourth_down_rush",
            "redzone_rush",
            "goalline_rush",
            "redzone_rush_touchdown",
            "goalline_rush_touchdown",
            "season",
            "week"
        );

        setAggPlayers(reducedPlayers);

        const targets = reducedPlayers.filter((player) => player.targets !== 0);

        const rushes = reducedPlayers.filter(
            (player) => player.rush_attempt !== 0
        );

        targets.sort((a, b) => b.targets - a.targets);
        rushes.sort((a, b) => b.rush_attempt - a.rush_attempt);

        setPlayerTargets(targets);
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
