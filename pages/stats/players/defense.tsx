import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerDefenseColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import {
    aggregateStats,
    parseBigInt,
    regSeasonWeeks,
} from "../../../data/globalVars";
import { IBasicDefensePlayerStats } from "../../../ts/interfaces/playerInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IBasicDefensePlayerStats[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.player_defense_stats_basic.findMany({
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
    teams: IBasicDefensePlayerStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const columns = playerDefenseColumns;

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

        // aggregate stats when page loads
        const reducedTeams: Array<IBasicDefensePlayerStats> = aggregateStats(
            props.teams,
            "passes_defended",
            "interception",
            "int_return_yards",
            "int_return_touchdown",
            "tackles_for_loss",
            "qb_hits",
            "fumbles_forced",
            "solo_tackles",
            "assist_tackls",
            "sack",
            "half_sack",
            "tackle_with_assist",
            "week_count",
            "season",
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

        const reducedTeams: Array<IBasicDefensePlayerStats> = aggregateStats(
            filteredTeams,
            "passes_defended",
            "interception",
            "int_return_yards",
            "int_return_touchdown",
            "tackles_for_loss",
            "qb_hits",
            "fumbles_forced",
            "solo_tackles",
            "assist_tackls",
            "sack",
            "half_sack",
            "tackle_with_assist",
            "week_count",
            "season",
            "down",
            "week"
        );

        setAggTeams(reducedTeams);
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
                            phaseUrl={"/stats/players/offense"}
                            showStatSel={true}
                            statOption={"Basic"}
                            categories={"players"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={aggTeams}
                            columns={columns}
                            rowIdCol={"game_id_db"}
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
