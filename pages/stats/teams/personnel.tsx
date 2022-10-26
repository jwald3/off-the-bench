import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../components/SelectorTray";
import StatTable from "../../../components/StatTable";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { teamPersonnelGoupingColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";
import styles from "../../../styles/TeamStats.module.scss";
import { ITeamFormationStats } from "../../../ts/interfaces/teamInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
};

interface TeamProps {
    teams: ITeamFormationStats[];
}

const TeamWeeks: React.FunctionComponent<TeamProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [aggTeams, setAggTeams] = useState(props.teams);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);

    const aggregateStats = (dataframe: ITeamFormationStats[]) => {
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
        // if "weeks" query present in URL, update week state
        if (query.weeks !== undefined && query.weeks !== "none") {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            console.log(query.weeks);
            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "none") {
            console.log(query.weeks);
            setWeekFilter([]);
        }

        // if "downs" query present in URL, update down state
        if (query.downs !== undefined && query.downs !== "none") {
            const selectedDowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            console.log(query.downs);
            setDownFilter(selectedDowns);
        } else if (query.downs === "none") {
            console.log(query.downs);
            setDownFilter([]);
        }

        // aggregate stats when page loads
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

export default TeamWeeks;
