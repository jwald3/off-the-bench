import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerAdvRecCols } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import {
    aggregateAdvancedStats,
    parseBigInt,
    regSeasonWeeks,
} from "../../../data/globalVars";
import { IPlayerReceivingStats } from "../../../ts/interfaces/playerInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IPlayerReceivingStats[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.advanced_receiving_stats.findMany({
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
};

interface PlayerProps {
    teams: IPlayerReceivingStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
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

        const reducedTeams: Array<IPlayerReceivingStats> =
            aggregateAdvancedStats(
                props.teams,
                "down",
                "passing_yards",
                "air_yards",
                "yards_after_catch",
                "complete_pass",
                "pass_attempt",
                "interception",
                "pass_touchdown",
                "team_passing_yards",
                "team_air_yards",
                "team_yards_after_catch",
                "team_complete_pass",
                "team_pass_attempt",
                "team_interception",
                "team_pass_touchdown",
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

        const reducedPlayers = aggregateAdvancedStats(
            filteredPlayers,
            "down",
            "passing_yards",
            "air_yards",
            "yards_after_catch",
            "complete_pass",
            "pass_attempt",
            "interception",
            "pass_touchdown",
            "team_passing_yards",
            "team_air_yards",
            "team_yards_after_catch",
            "team_complete_pass",
            "team_pass_attempt",
            "team_interception",
            "team_pass_touchdown",
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
                            statOption={"Receiving"}
                            categories={"players"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={playerAdvRecCols}
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
