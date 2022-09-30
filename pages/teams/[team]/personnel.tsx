import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UsageInfo from "../../../components/UsageInfo";
import Checkbox from "../../../components/WeekCheckboxFilterUsage";
import { teamPersonnelGroupingColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const team = String(query.team) || "NYJ";
    let season = Number(query.season) || 2022;

    let teamQueryResponse = await prisma.team_personnel_data.findMany({
        where: {
            season: season,
            posteam: team,
        },
    });

    const playerData: IPersonnelData[] = JSON.parse(
        JSON.stringify(teamQueryResponse, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    return {
        props: {
            players: JSON.parse(
                JSON.stringify(playerData, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
    };
};

interface IPersonnelData {
    game_id: string;
    posteam: string;
    offense_grouping: string;
    snap_ct: number;
    passing_snap: number;
    rushing_snap: number;
    passing_yards: number;
    pass_touchdown: number;
    rushing_yards: number;
    rush_touchdown: number;
    season: number;
    week: number;
    week_count: number;
    db_id: string;
    total_game_snaps: number;
}

interface PersonnelProps {
    players: IPersonnelData[];
}

const TeamPersonnel: React.FunctionComponent<PersonnelProps> = ({
    ...props
}) => {
    const router = useRouter();
    const { query } = router;
    const [personnelStats, setPersonnelStats] = useState(props.players);
    const [aggPersonnel, setAggPersonnel] = useState(props.players);
    const columns = teamPersonnelGroupingColumns;
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [personnelChartView, setPersonnelChartView] = useState("frequency");
    const [personnelChartDataOne, setPersonnelChartDataOne] =
        useState("snap_ct");
    const [personnelChartDataTwo, setPersonnelChartDataTwo] = useState("");

    useEffect(() => {
        if (personnelChartView === "all") {
            setPersonnelChartDataOne("snap_ct");
            setPersonnelChartDataTwo("");
        } else if (personnelChartView === "rz") {
            setPersonnelChartDataOne("passing_yards");
            setPersonnelChartDataTwo("rushing_yards");
        }
    }, [personnelChartView]);

    const aggregateStats = (dataframe: IPersonnelData[]) => {
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
        const filteredPlayers = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
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
    }, [weekFilter]);

    return (
        <div>
            <Head>
                <title>Team Personnel Stats</title>
                <meta name="description" content="Team Personnel Stats" />
            </Head>
            <div className="weekly-team-page" style={{ paddingTop: "2%" }}>
                <Checkbox
                    handleFilters={setWeekFilter}
                    weekFilter={weekFilter}
                    seasonFilter={Number(selectedSeason)}
                    handleSeason={setSelectedSeason}
                />
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
            </div>
        </div>
    );
};

export default TeamPersonnel;
