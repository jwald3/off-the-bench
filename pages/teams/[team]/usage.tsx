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
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { IPlayerUsageStats } from "../../../ts/interfaces/playerInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
};

interface PlayerProps {
    players: IPlayerUsageStats[];
}

const TeamWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
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
    const [weekFilter, setWeekFilter] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

    const aggregateStats = (dataframe: IPlayerUsageStats[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].player_id)) {
                let currentObj = teamsMap.get(dataframe[obj].player_id);
                let newObj = {
                    player_id: dataframe[obj].player_id,
                    targets:
                        Number.parseInt(currentObj.targets.toString()) +
                        Number.parseInt(dataframe[obj].targets.toString()),
                    receptions:
                        Number.parseInt(currentObj.receptions.toString()) +
                        Number.parseInt(dataframe[obj].receptions.toString()),
                    receiving_yards:
                        Number.parseInt(currentObj.receiving_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].receiving_yards.toString()
                        ),
                    air_yards:
                        Number.parseInt(currentObj.air_yards.toString()) +
                        Number.parseInt(dataframe[obj].air_yards.toString()),
                    yards_after_catch:
                        Number.parseInt(
                            currentObj.yards_after_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].yards_after_catch.toString()
                        ),
                    receiving_touchdown:
                        Number.parseInt(
                            currentObj.receiving_touchdown.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].receiving_touchdown.toString()
                        ),
                    redzone_target:
                        Number.parseInt(currentObj.redzone_target.toString()) +
                        Number.parseInt(
                            dataframe[obj].redzone_target.toString()
                        ),
                    redzone_catch:
                        Number.parseInt(currentObj.redzone_catch.toString()) +
                        Number.parseInt(
                            dataframe[obj].redzone_catch.toString()
                        ),
                    endzone_catch:
                        Number.parseInt(currentObj.endzone_catch.toString()) +
                        Number.parseInt(
                            dataframe[obj].endzone_catch.toString()
                        ),
                    endzone_target:
                        Number.parseInt(currentObj.endzone_target.toString()) +
                        Number.parseInt(
                            dataframe[obj].endzone_target.toString()
                        ),
                    third_down_target:
                        Number.parseInt(
                            currentObj.third_down_target.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].third_down_target.toString()
                        ),
                    third_down_catch:
                        Number.parseInt(
                            currentObj.third_down_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].third_down_catch.toString()
                        ),
                    fourth_down_target:
                        Number.parseInt(
                            currentObj.fourth_down_target.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].fourth_down_target.toString()
                        ),
                    fourth_down_catch:
                        Number.parseInt(
                            currentObj.fourth_down_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].fourth_down_catch.toString()
                        ),
                    rush_attempt:
                        Number.parseInt(currentObj.rush_attempt.toString()) +
                        Number.parseInt(dataframe[obj].rush_attempt.toString()),
                    rushing_yards:
                        Number.parseInt(currentObj.rushing_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].rushing_yards.toString()
                        ),
                    rush_touchdown:
                        Number.parseInt(currentObj.rush_touchdown.toString()) +
                        Number.parseInt(
                            dataframe[obj].rush_touchdown.toString()
                        ),
                    stacked_box_rush:
                        Number.parseInt(
                            currentObj.stacked_box_rush.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].stacked_box_rush.toString()
                        ),
                    tackled_for_loss:
                        Number.parseInt(
                            currentObj.tackled_for_loss.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].tackled_for_loss.toString()
                        ),
                    fumble:
                        Number.parseInt(currentObj.fumble.toString()) +
                        Number.parseInt(dataframe[obj].fumble.toString()),
                    redzone_rush:
                        Number.parseInt(currentObj.redzone_rush.toString()) +
                        Number.parseInt(dataframe[obj].redzone_rush.toString()),
                    redzone_rush_touchdown:
                        Number.parseInt(
                            currentObj.redzone_rush_touchdown.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].redzone_rush_touchdown.toString()
                        ),
                    goalline_rush:
                        Number.parseInt(currentObj.goalline_rush.toString()) +
                        Number.parseInt(
                            dataframe[obj].goalline_rush.toString()
                        ),
                    goalline_rush_touchdown:
                        Number.parseInt(
                            currentObj.goalline_rush_touchdown.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].goalline_rush_touchdown.toString()
                        ),
                    db_id: currentObj.db_id,
                    posteam: currentObj.posteam,
                    position: currentObj.position,
                };
                teamsMap.set(currentObj.player_id, newObj);
            } else {
                teamsMap.set(dataframe[obj].player_id, {
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

        const reducedTeams = aggregateStats(currWeekData);

        const targets = reducedTeams.filter(
            (player) => player.targets !== "0" && player.targets !== 0
        );

        const rushes = reducedTeams.filter(
            (player) => player.rush_attempt !== "0" && player.rush_attempt !== 0
        );

        targets.forEach((tgt) => (tgt.targets = parseInt(tgt.targets)));
        rushes.forEach(
            (tgt) => (tgt.rush_attempt = parseInt(tgt.rush_attempt))
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

        const reducedPlayers = aggregateStats(filteredPlayers);

        setAggPlayers(reducedPlayers);

        const targets = reducedPlayers.filter(
            (player) => player.targets !== "0" && player.targets !== 0
        );

        const rushes = reducedPlayers.filter(
            (player) => player.rush_attempt !== "0" && player.rush_attempt !== 0
        );

        targets.sort((a, b) => b.targets - a.targets);
        rushes.sort((a, b) => b.rush_attempt - a.rush_attempt);

        targets.forEach((tgt) => (tgt.targets = parseInt(tgt.targets)));
        rushes.forEach(
            (tgt) => (tgt.rush_attempt = parseInt(tgt.rush_attempt))
        );

        setPlayerTargets(targets);
        setPlayerRushes(rushes);
    }, [weekFilter]);

    useEffect(() => {
        const filteredPlayers = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            );

        const reducedPlayers = aggregateStats(filteredPlayers);

        setAggPlayers(reducedPlayers);

        const targets = reducedPlayers.filter(
            (player) => player.targets !== "0" && player.targets !== 0
        );

        const rushes = reducedPlayers.filter(
            (player) => player.rush_attempt !== "0" && player.rush_attempt !== 0
        );

        targets.sort((a, b) => b.targets - a.targets);
        rushes.sort((a, b) => b.rush_attempt - a.rush_attempt);

        targets.forEach((tgt) => (tgt.targets = parseInt(tgt.targets)));
        rushes.forEach(
            (tgt) => (tgt.rush_attempt = parseInt(tgt.rush_attempt))
        );

        setPlayerTargets(targets);
        setPlayerRushes(rushes);
    }, [downFilter]);

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

export default TeamWeeks;
