import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../../components/SelectorTray";
import StatTable from "../../../../components/StatTable";
import TeamLinkFooter from "../../../../components/TeamFooter";
import {
    aggregateOffenseSnaps,
    parseBigInt,
    regSeasonWeeks,
} from "../../../../data/globalVars";
import { playerSnapCols } from "../../../../data/tableColumns";
import prisma from "../../../../lib/prisma";
import styles from "../../../../styles/TeamSnaps.module.scss";
import { IPlayerOffensiveSnapData } from "../../../../ts/interfaces/playerInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;

        let teamQueryResponse =
            await prisma.offense_player_snaps_by_down.findMany({
                where: {
                    season: season,
                    posteam: team,
                    week: {
                        in: regSeasonWeeks,
                    },
                },
            });

        const playerData = parseBigInt(teamQueryResponse);

        return {
            props: {
                players: parseBigInt(playerData),
            },
        };
    },
});

interface SnapProps {
    players: IPlayerOffensiveSnapData[];
}

const PlayerOffenseSnaps: React.FunctionComponent<SnapProps> = ({
    ...props
}) => {
    const router = useRouter();
    const { query } = router;

    const [aggPlayerSnaps, setAggPlayerSnaps] = useState(props.players);
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

    useEffect(() => {
        if (query.weeks !== undefined && query.weeks !== "") {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "") {
            setWeekFilter([]);
        }

        if (query.downs !== undefined && query.downs !== "") {
            const selecteddowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            setDownFilter(selecteddowns);
        } else if (query.downs === "") {
            setDownFilter([]);
        }

        const currWeekData = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            );

        const aggPlayers: Array<IPlayerOffensiveSnapData> =
            aggregateOffenseSnaps(
                currWeekData,
                "down",
                "snap_ct",
                "rush_snap",
                "pass_snap",
                "team_snaps",
                "team_rushing_plays",
                "team_passing_plays",
                "week",
                "season",
                "reception",
                "receiving_touchdown",
                "carries",
                "rushing_touchdown",
                "target"
            );

        setAggPlayerSnaps(aggPlayers);
    }, []);

    useEffect(() => {
        const filteredPlayers = props.players
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            )
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            );

        const reducedPlayers = aggregateOffenseSnaps(
            filteredPlayers,
            "down",
            "snap_ct",
            "rush_snap",
            "pass_snap",
            "team_snaps",
            "team_rushing_plays",
            "team_passing_plays",
            "week",
            "season",
            "reception",
            "receiving_touchdown",
            "carries",
            "rushing_touchdown",
            "target"
        );

        setAggPlayerSnaps(reducedPlayers);
    }, [weekFilter, downFilter]);

    return (
        <div className={styles.snapSharePageContainer}>
            <Head>
                <title>Player Snaps Offense</title>
                <meta
                    name="description"
                    content="Player Offensive Snaps by Week and Down"
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width, height=device-height"
                />
            </Head>
            <div className={styles.pageArea}>
                <div className={styles.snapsMainContainer}>
                    <div className={styles.selectorTrayContainer}>
                        <SelectorTray
                            handleWeekFilters={setWeekFilter}
                            weekFilter={weekFilter}
                            seasonFilter={Number(selectedSeason)}
                            handleSeason={setSelectedSeason}
                            handleDownFilters={setDownFilter}
                            downFilter={downFilter}
                            phaseUrl={"/teams/[team]/snap_counts/defense"}
                            showStatSel={false}
                            statOption={""}
                            categories={""}
                        />
                    </div>
                    <div className={styles.snapTableContainer}>
                        <StatTable
                            data={aggPlayerSnaps}
                            columns={playerSnapCols}
                            rowIdCol={"db_id"}
                            pageSize={32}
                            disableFooter={false}
                            showToolbar={true}
                        />
                    </div>
                    <TeamLinkFooter />
                </div>
            </div>
        </div>
    );
};

export default PlayerOffenseSnaps;
