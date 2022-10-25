import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../components/SelectorTray";
import StatTable from "../../../components/StatTable";
import {
    teamPersonnelGoupingColumns,
    teamStatColumns,
} from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";
import styles from "../../../styles/TeamStats.module.scss";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: ITeam[];
    let season = Number(query.season) || 2022;
    let teamQueryResponse;

    teamQueryResponse =
        await prisma.personnel_usage_and_success_by_team.findMany({
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
    game_id: string;
    down: number;
    snap_ct_personnel_00: number;
    personnel_epa_personnel_00: number;
    snap_ct_personnel_01: number;
    personnel_epa_personnel_01: number;
    snap_ct_personnel_01personnel_wildcat: number;
    personnel_epa_personnel_01personnel_wildcat: number;
    snap_ct_personnel_02: number;
    personnel_epa_personnel_02: number;
    snap_ct_personnel_02personnel_wildcat: number;
    personnel_epa_personnel_02personnel_wildcat: number;
    snap_ct_personnel_10: number;
    personnel_epa_personnel_10: number;
    snap_ct_personnel_11: number;
    personnel_epa_personnel_11: number;
    snap_ct_personnel_11personnel_wildcat: number;
    personnel_epa_personnel_11personnel_wildcat: number;
    snap_ct_personnel_12: number;
    personnel_epa_personnel_12: number;
    snap_ct_personnel_12personnel_wildcat: number;
    personnel_epa_personnel_12personnel_wildcat: number;
    snap_ct_personnel_13: number;
    personnel_epa_personnel_13: number;
    snap_ct_personnel_20: number;
    personnel_epa_personnel_20: number;
    snap_ct_personnel_20personnel_wildcat: number;
    personnel_epa_personnel_20personnel_wildcat: number;
    snap_ct_personnel_21: number;
    personnel_epa_personnel_21: number;
    snap_ct_personnel_21personnel_wildcat: number;
    personnel_epa_personnel_21personnel_wildcat: number;
    snap_ct_personnel_22: number;
    personnel_epa_personnel_22: number;
    snap_ct_personnel_22personnel_wildcat: number;
    personnel_epa_personnel_22personnel_wildcat: number;
    snap_ct_personnel_23: number;
    personnel_epa_personnel_23: number;
    snap_ct_personnel_23personnel_wildcat: number;
    personnel_epa_personnel_23personnel_wildcat: number;
    snap_ct_personnel_jumbo: number;
    personnel_epa_personnel_jumbo: number;
    snap_ct_personnel_wildcat: number;
    personnel_epa_personnel_wildcat: number;
    team_total_snaps: number;
    team_epa: number;
    db_id: string;
    season: number;
    week: number;
    week_count: number;
}

interface TeamProps {
    teams: ITeam[];
}

const TeamWeeks: React.FunctionComponent<TeamProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;
    const columns = teamStatColumns;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

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
                    snap_ct_personnel_00:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_00.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_00.toString()
                        ),
                    snap_ct_personnel_01:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_01.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_01.toString()
                        ),
                    snap_ct_personnel_01personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_01personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[
                                obj
                            ].snap_ct_personnel_01personnel_wildcat.toString()
                        ),
                    snap_ct_personnel_10:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_10.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_10.toString()
                        ),
                    snap_ct_personnel_11:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_11.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_11.toString()
                        ),
                    snap_ct_personnel_11personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_11personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[
                                obj
                            ].snap_ct_personnel_11personnel_wildcat.toString()
                        ),
                    snap_ct_personnel_12:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_12.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_12.toString()
                        ),
                    snap_ct_personnel_12personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_12personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[
                                obj
                            ].snap_ct_personnel_12personnel_wildcat.toString()
                        ),
                    snap_ct_personnel_13:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_13.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_13.toString()
                        ),
                    snap_ct_personnel_20:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_20.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_20.toString()
                        ),
                    snap_ct_personnel_20personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_20personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[
                                obj
                            ].snap_ct_personnel_20personnel_wildcat.toString()
                        ),
                    snap_ct_personnel_21:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_21.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_21.toString()
                        ),
                    snap_ct_personnel_21personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_21personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[
                                obj
                            ].snap_ct_personnel_21personnel_wildcat.toString()
                        ),
                    snap_ct_personnel_22:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_22.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_22.toString()
                        ),
                    snap_ct_personnel_22personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_22personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[
                                obj
                            ].snap_ct_personnel_22personnel_wildcat.toString()
                        ),
                    snap_ct_personnel_23:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_23.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_23.toString()
                        ),
                    snap_ct_personnel_23personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_23personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[
                                obj
                            ].snap_ct_personnel_23personnel_wildcat.toString()
                        ),
                    snap_ct_personnel_jumbo:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_jumbo.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_jumbo.toString()
                        ),
                    snap_ct_personnel_wildcat:
                        Number.parseInt(
                            currentObj.snap_ct_personnel_wildcat.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].snap_ct_personnel_wildcat.toString()
                        ),
                    team_total_snaps:
                        Number.parseInt(
                            currentObj.team_total_snaps.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].team_total_snaps.toString()
                        ),
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
        const filteredTeams = props.teams
            .filter((team) =>
                weekFilter.includes(Number.parseInt(team.week.toString()))
            )
            .filter((team) =>
                downFilter.includes(Number.parseInt(team.down.toString()))
            );

        const reducedTeams = aggregateStats(filteredTeams);

        setAggTeams(reducedTeams);
    }, [weekFilter]);

    useEffect(() => {
        const filteredTeams = props.teams
            .filter((team) =>
                weekFilter.includes(Number.parseInt(team.week.toString()))
            )
            .filter((team) =>
                downFilter.includes(Number.parseInt(team.down.toString()))
            );

        const reducedTeams = aggregateStats(filteredTeams);

        setAggTeams(reducedTeams);
    }, [downFilter]);

    return (
        <div className={styles.teamStatsPageContainer}>
            <Head>
                <title>Team Stats</title>
                <meta
                    name="description"
                    content="Team Stats filterable by week"
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

export default TeamWeeks;
