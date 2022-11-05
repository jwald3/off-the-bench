import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../components/SelectorTray";
import StatTable from "../../../components/StatTable";
import {
    aggregateTeamStats,
    parseBigInt,
    regSeasonWeeks,
} from "../../../data/globalVars";
import { teamStatColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";
import styles from "../../../styles/TeamStats.module.scss";
import { ITeamBasicStats } from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: ITeamBasicStats[];
        let season = Number(query.season) || 2022;
        let teamQueryResponse;

        teamQueryResponse = await prisma.team_offense_stats_basic.findMany({
            where: {
                week: {
                    in: regSeasonWeeks,
                },
                season: season,
            },
        });

        team = parseBigInt(teamQueryResponse);

        return {
            props: {
                teams: parseBigInt(team),
            },
        };
    },
});

interface TeamProps {
    teams: ITeamBasicStats[];
}

const TeamOffenseData: React.FunctionComponent<TeamProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;
    const columns = teamStatColumns;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

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
        const reducedTeams: Array<ITeamBasicStats> = aggregateTeamStats(
            props.teams,
            "pass_attempts",
            "completions",
            "pass_touchdown",
            "interceptions",
            "sacks",
            "passing_yards",
            "rush_attempt",
            "rushing_yards",
            "rush_touchdown",
            "points_for",
            "points_allowed",
            "down",
            "week"
        );

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

        const reducedTeams: Array<ITeamBasicStats> = aggregateTeamStats(
            filteredTeams,
            "pass_attempts",
            "completions",
            "pass_touchdown",
            "interceptions",
            "sacks",
            "passing_yards",
            "rush_attempt",
            "rushing_yards",
            "rush_touchdown",
            "points_for",
            "points_allowed",
            "down",
            "week"
        );

        setAggTeams(reducedTeams);
    }, [weekFilter, downFilter]);

    return (
        <div className={styles.teamStatsPageContainer}>
            <Head>
                <title>Team Stats</title>
                <meta
                    name="description"
                    content="Team Stats filterable by week"
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
                            phaseUrl={"/stats/teams/defense"}
                            showStatSel={true}
                            statOption={"Offense"}
                            categories={"teams"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={columns}
                            rowIdCol={"db_id"}
                            pageSize={32}
                            disableFooter={false}
                            showToolbar={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamOffenseData;
