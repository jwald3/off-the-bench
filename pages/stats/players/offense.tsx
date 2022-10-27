import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerOffenseColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PlayerStats.module.scss";
import {
    aggregateStats,
    parseBigInt,
    regSeasonWeeks,
} from "../../../data/globalVars";
import { IBasicOffensePlayerStats } from "../../../ts/interfaces/playerInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: IBasicOffensePlayerStats[];
    let season = Number(query.season) || 2022;

    const playerSubRes = await prisma.player_offense_stats_basic.findMany({
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
    teams: IBasicOffensePlayerStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;

    const columns = playerOffenseColumns;

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

        const reducedTeams: Array<IBasicOffensePlayerStats> = aggregateStats(
            props.teams,
            "pass_attempt",
            "completion",
            "incompletion",
            "passing_yards",
            "passing_TD",
            "interception",
            "sack",
            "rush_attempt",
            "rushing_yards",
            "rushing_TD",
            "tackled_for_loss",
            "fumble",
            "reception",
            "target",
            "receiving_yards",
            "receiving_TD",
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

        const reducedTeams = aggregateStats(
            filteredTeams,
            "pass_attempt",
            "completion",
            "incompletion",
            "passing_yards",
            "passing_TD",
            "interception",
            "sack",
            "rush_attempt",
            "rushing_yards",
            "rushing_TD",
            "tackled_for_loss",
            "fumble",
            "reception",
            "target",
            "receiving_yards",
            "receiving_TD",
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
                            phaseUrl={"/stats/players/defense"}
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
