import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../components/SelectorTray";
import TeamLinkFooter from "../../../components/TeamFooter";
import UsageInfo from "../../../components/UsageInfo";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { teamPersonnelGroupingColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";
import styles from "../../../styles/PersonnelPage.module.scss";
import { ITeamPersonnelStats } from "../../../ts/interfaces/teamInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const team = String(query.team) || "NYJ";
    let season = Number(query.season) || 2022;

    let teamQueryResponse = await prisma.team_personnel_data.findMany({
        where: {
            season: season,
            posteam: team,
            week: {
                in: regSeasonWeeks,
            },
        },
    });

    const playerData: ITeamPersonnelStats[] = parseBigInt(teamQueryResponse);

    return {
        props: {
            players: parseBigInt(playerData),
        },
    };
};

interface PersonnelProps {
    players: ITeamPersonnelStats[];
}

const TeamPersonnel: React.FunctionComponent<PersonnelProps> = ({
    ...props
}) => {
    const router = useRouter();
    const { query } = router;
    const [aggPersonnel, setAggPersonnel] = useState(props.players);
    const columns = teamPersonnelGroupingColumns;
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [personnelChartView, setPersonnelChartView] = useState("frequency");
    const [personnelChartDataOne, setPersonnelChartDataOne] =
        useState("snap_ct");
    const [personnelChartDataTwo, setPersonnelChartDataTwo] = useState("");

    const aggregateStats = (dataframe: ITeamPersonnelStats[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].offense_grouping)) {
                let currentObj = teamsMap.get(dataframe[obj].offense_grouping);
                let newObj = {
                    offense_grouping: dataframe[obj].offense_grouping,
                    snap_ct:
                        Number.parseInt(currentObj.snap_ct.toString()) +
                        Number.parseInt(dataframe[obj].snap_ct.toString()),
                    passing_snap:
                        Number.parseInt(currentObj.passing_snap.toString()) +
                        Number.parseInt(dataframe[obj].passing_snap.toString()),
                    rushing_snap:
                        Number.parseInt(currentObj.rushing_snap.toString()) +
                        Number.parseInt(dataframe[obj].rushing_snap.toString()),
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
                    total_game_snaps:
                        Number.parseInt(
                            currentObj.total_game_snaps.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].total_game_snaps.toString()
                        ),
                    db_id: currentObj.db_id,
                };
                teamsMap.set(currentObj.offense_grouping, newObj);
            } else {
                teamsMap.set(dataframe[obj].offense_grouping, {
                    ...dataframe[obj],
                });
            }
        }
        return Array.from(teamsMap.values());
    };

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
            const selecteddowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            console.log(query.downs);
            setDownFilter(selecteddowns);
        } else if (query.downs === "") {
            console.log(query.downs);
            setDownFilter([]);
        }

        const currWeekData = props.players.filter((player) =>
            weekFilter.includes(Number.parseInt(player.week.toString()))
        );

        const reducedPersonnel = aggregateStats(currWeekData);

        reducedPersonnel.forEach(
            (tgt) => (tgt.snap_ct = parseInt(tgt.snap_ct))
        );
        reducedPersonnel.forEach(
            (tgt) => (tgt.passing_yards = parseInt(tgt.passing_yards))
        );
        reducedPersonnel.forEach(
            (tgt) => (tgt.rushing_yards = parseInt(tgt.rushing_yards))
        );
        reducedPersonnel.sort((a, b) => b.snap_ct - a.snap_ct);

        setAggPersonnel(reducedPersonnel);
    }, []);

    useEffect(() => {
        if (personnelChartView === "all") {
            setPersonnelChartDataOne("snap_ct");
            setPersonnelChartDataTwo("");
        } else if (personnelChartView === "rz") {
            setPersonnelChartDataOne("passing_yards");
            setPersonnelChartDataTwo("rushing_yards");
        }
    }, [personnelChartView]);

    useEffect(() => {
        const filteredPlayers = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            );

        const reducedPlayers = aggregateStats(filteredPlayers);
        reducedPlayers.sort((a, b) => b.snap_ct - a.snap_ct);

        reducedPlayers.forEach(
            (tgt) => (tgt.passing_yards = parseInt(tgt.passing_yards))
        );
        reducedPlayers.forEach(
            (tgt) => (tgt.rushing_yards = parseInt(tgt.rushing_yards))
        );
        reducedPlayers.forEach((tgt) => (tgt.snap_ct = parseInt(tgt.snap_ct)));

        setAggPersonnel(reducedPlayers);
    }, [weekFilter, downFilter]);

    return (
        <div className={styles.personnelPageContainer}>
            <Head>
                <title>Team Personnel Stats</title>
                <meta name="description" content="Team Personnel Stats" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width, height=device-height"
                />
            </Head>
            <div className={styles.personnelPage}>
                <div className={styles.selectorTrayContainer}>
                    <SelectorTray
                        handleWeekFilters={setWeekFilter}
                        weekFilter={weekFilter}
                        seasonFilter={Number(selectedSeason)}
                        handleSeason={setSelectedSeason}
                        handleDownFilters={setDownFilter}
                        downFilter={downFilter}
                        phaseUrl=""
                        showStatSel={false}
                        statOption={""}
                        categories={""}
                    />
                </div>

                <UsageInfo
                    playerData={aggPersonnel}
                    columns={columns}
                    barDataOne={personnelChartDataOne}
                    barDataTwo={personnelChartDataTwo}
                    headerTitle="personnel usage"
                    altOptionOne="Frequency"
                    altOptionTwo="Success"
                    altOptionThree=""
                    changeView={setPersonnelChartView}
                    dataKey="offense_grouping"
                />
                <TeamLinkFooter />
            </div>
        </div>
    );
};

export default TeamPersonnel;
