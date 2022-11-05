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
import { teamPersonnelGoupingColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";
import styles from "../../../styles/TeamStats.module.scss";
import { ITeamFormationStats } from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: ITeamFormationStats[];
        let season = Number(query.season) || 2022;
        let teamQueryResponse;

        teamQueryResponse =
            await prisma.personnel_usage_and_success_by_team.findMany({
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
    teams: ITeamFormationStats[];
}

const TeamPersonnelData: React.FunctionComponent<TeamProps> = ({
    ...props
}) => {
    const router = useRouter();
    const { query } = router;

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
        const reducedTeams: Array<ITeamFormationStats> = aggregateTeamStats(
            props.teams,
            "down",
            "snap_ct_personnel_00",
            "personnel_epa_personnel_00",
            "snap_ct_personnel_01",
            "personnel_epa_personnel_01",
            "snap_ct_personnel_01personnel_wildcat",
            "personnel_epa_personnel_01personnel_wildcat",
            "snap_ct_personnel_02",
            "personnel_epa_personnel_02",
            "snap_ct_personnel_02personnel_wildcat",
            "personnel_epa_personnel_02personnel_wildcat",
            "snap_ct_personnel_10",
            "personnel_epa_personnel_10",
            "snap_ct_personnel_11",
            "personnel_epa_personnel_11",
            "snap_ct_personnel_11personnel_wildcat",
            "personnel_epa_personnel_11personnel_wildcat",
            "snap_ct_personnel_12",
            "personnel_epa_personnel_12",
            "snap_ct_personnel_12personnel_wildcat",
            "personnel_epa_personnel_12personnel_wildcat",
            "snap_ct_personnel_13",
            "personnel_epa_personnel_13",
            "snap_ct_personnel_20",
            "personnel_epa_personnel_20",
            "snap_ct_personnel_20personnel_wildcat",
            "personnel_epa_personnel_20personnel_wildcat",
            "snap_ct_personnel_21",
            "personnel_epa_personnel_21",
            "snap_ct_personnel_21personnel_wildcat",
            "personnel_epa_personnel_21personnel_wildcat",
            "snap_ct_personnel_22",
            "personnel_epa_personnel_22",
            "snap_ct_personnel_22personnel_wildcat",
            "personnel_epa_personnel_22personnel_wildcat",
            "snap_ct_personnel_23",
            "personnel_epa_personnel_23",
            "snap_ct_personnel_23personnel_wildcat",
            "personnel_epa_personnel_23personnel_wildcat",
            "snap_ct_personnel_jumbo",
            "personnel_epa_personnel_jumbo",
            "snap_ct_personnel_wildcat",
            "personnel_epa_personnel_wildcat",
            "team_total_snaps",
            "team_epa",
            "season",
            "week",
            "week_count"
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

        const reducedTeams: Array<ITeamFormationStats> = aggregateTeamStats(
            filteredTeams,
            "down",
            "snap_ct_personnel_00",
            "personnel_epa_personnel_00",
            "snap_ct_personnel_01",
            "personnel_epa_personnel_01",
            "snap_ct_personnel_01personnel_wildcat",
            "personnel_epa_personnel_01personnel_wildcat",
            "snap_ct_personnel_02",
            "personnel_epa_personnel_02",
            "snap_ct_personnel_02personnel_wildcat",
            "personnel_epa_personnel_02personnel_wildcat",
            "snap_ct_personnel_10",
            "personnel_epa_personnel_10",
            "snap_ct_personnel_11",
            "personnel_epa_personnel_11",
            "snap_ct_personnel_11personnel_wildcat",
            "personnel_epa_personnel_11personnel_wildcat",
            "snap_ct_personnel_12",
            "personnel_epa_personnel_12",
            "snap_ct_personnel_12personnel_wildcat",
            "personnel_epa_personnel_12personnel_wildcat",
            "snap_ct_personnel_13",
            "personnel_epa_personnel_13",
            "snap_ct_personnel_20",
            "personnel_epa_personnel_20",
            "snap_ct_personnel_20personnel_wildcat",
            "personnel_epa_personnel_20personnel_wildcat",
            "snap_ct_personnel_21",
            "personnel_epa_personnel_21",
            "snap_ct_personnel_21personnel_wildcat",
            "personnel_epa_personnel_21personnel_wildcat",
            "snap_ct_personnel_22",
            "personnel_epa_personnel_22",
            "snap_ct_personnel_22personnel_wildcat",
            "personnel_epa_personnel_22personnel_wildcat",
            "snap_ct_personnel_23",
            "personnel_epa_personnel_23",
            "snap_ct_personnel_23personnel_wildcat",
            "personnel_epa_personnel_23personnel_wildcat",
            "snap_ct_personnel_jumbo",
            "personnel_epa_personnel_jumbo",
            "snap_ct_personnel_wildcat",
            "personnel_epa_personnel_wildcat",
            "team_total_snaps",
            "team_epa",
            "season",
            "week",
            "week_count"
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
                            statOption={"Personnel"}
                            showStatSel={true}
                            categories={"teams"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={teamPersonnelGoupingColumns}
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

export default TeamPersonnelData;
