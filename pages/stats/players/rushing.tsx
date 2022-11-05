import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerAdvRushCols } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import {
    aggregateAdvancedStats,
    parseBigInt,
    regSeasonWeeks,
} from "../../../data/globalVars";
import { IPlayerRushingStats } from "../../../ts/interfaces/playerInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: IPlayerRushingStats[];
        let season = Number(query.season) || 2022;

        const playerSubRes = await prisma.advanced_rushing_stats.findMany({
            where: {
                week: {
                    in: regSeasonWeeks,
                },
                season: season,
            },
        });

        team = parseBigInt(playerSubRes);

        return {
            props: {
                teams: parseBigInt(team),
            },
        };
    },
});

interface PlayerProps {
    teams: IPlayerRushingStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

    useEffect(() => {
        const reducedTeams: Array<IPlayerRushingStats> = aggregateAdvancedStats(
            props.teams,
            "key",
            "down",
            "rush_attempt",
            "rushing_yards",
            "rush_touchdown",
            "first_down_rush",
            "red_zone_rush",
            "red_zone_td",
            "red_zone_yards",
            "goal_to_go_rush",
            "goal_to_go_td",
            "goal_to_go_yards",
            "goalline_rush",
            "goalline_td",
            "goalline_yards",
            "team_rush_attempt",
            "team_rushing_yards",
            "team_rush_touchdown",
            "team_first_down_rush",
            "team_red_zone_rush",
            "team_red_zone_td",
            "team_red_zone_yards",
            "team_goal_to_go_rush",
            "team_goal_to_go_td",
            "team_goal_to_go_yards",
            "team_goalline_rush",
            "team_goalline_td",
            "team_goalline_yards",
            "week",
            "season"
        );

        setAggTeams(reducedTeams);
    }, []);

    useEffect(() => {
        // if "weeks" query present in URL, update week state
        if (query.weeks !== undefined && query.weeks !== "none") {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "none") {
            setWeekFilter([]);
        }

        // if "downs" query present in URL, update down state
        if (query.downs !== undefined && query.downs !== "none") {
            const selectedDowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            setDownFilter(selectedDowns);
        } else if (query.downs === "none") {
            setDownFilter([]);
        }

        // aggregate stats when page loads
        const reducedTeams: Array<IPlayerRushingStats> = aggregateAdvancedStats(
            props.teams,
            "key",
            "down",
            "rush_attempt",
            "rushing_yards",
            "rush_touchdown",
            "first_down_rush",
            "red_zone_rush",
            "red_zone_td",
            "red_zone_yards",
            "goal_to_go_rush",
            "goal_to_go_td",
            "goal_to_go_yards",
            "goalline_rush",
            "goalline_td",
            "goalline_yards",
            "team_rush_attempt",
            "team_rushing_yards",
            "team_rush_touchdown",
            "team_first_down_rush",
            "team_red_zone_rush",
            "team_red_zone_td",
            "team_red_zone_yards",
            "team_goal_to_go_rush",
            "team_goal_to_go_td",
            "team_goal_to_go_yards",
            "team_goalline_rush",
            "team_goalline_td",
            "team_goalline_yards",
            "week",
            "season"
        );

        setAggTeams(reducedTeams);
    }, []);

    useEffect(() => {
        const filteredPlayers = props.teams
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            )
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            );

        const reducedPlayers: Array<IPlayerRushingStats> =
            aggregateAdvancedStats(
                filteredPlayers,
                "key",
                "down",
                "rush_attempt",
                "rushing_yards",
                "rush_touchdown",
                "first_down_rush",
                "red_zone_rush",
                "red_zone_td",
                "red_zone_yards",
                "goal_to_go_rush",
                "goal_to_go_td",
                "goal_to_go_yards",
                "goalline_rush",
                "goalline_td",
                "goalline_yards",
                "team_rush_attempt",
                "team_rushing_yards",
                "team_rush_touchdown",
                "team_first_down_rush",
                "team_red_zone_rush",
                "team_red_zone_td",
                "team_red_zone_yards",
                "team_goal_to_go_rush",
                "team_goal_to_go_td",
                "team_goal_to_go_yards",
                "team_goalline_rush",
                "team_goalline_td",
                "team_goalline_yards",
                "week",
                "season"
            );

        setAggTeams(reducedPlayers);
    }, [weekFilter, downFilter]);

    return (
        <div className={styles.playerStatsPageContainer}>
            <Head>
                <title>Player Stats</title>
                <meta
                    name="description"
                    content="Player Stats filterable by week"
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width, height=device-height"
                />
            </Head>
            <div className={styles.statPageArea}>
                <div className={styles.statsMainContainer}>
                    <div className={styles.selectorTrayContainer}>
                        <SelectorTray
                            handleWeekFilters={setWeekFilter}
                            weekFilter={weekFilter}
                            seasonFilter={Number(selectedSeason)}
                            handleSeason={setSelectedSeason}
                            handleDownFilters={setDownFilter}
                            downFilter={downFilter}
                            phaseUrl={"/stats/players/defense"}
                            showStatSel={true}
                            statOption={"Rushing"}
                            categories={"players"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={playerAdvRushCols}
                            rowIdCol={"db_id"}
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
