import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../components/SelectorTray";
import TeamLinkFooter from "../../../components/TeamFooter";
import UsageInfo from "../../../components/UsageInfo";
import {
    aggregatePersonnelStats,
    flat,
    parseBigInt,
    regSeasonWeeks,
} from "../../../data/globalVars";
import {
    playerBySnapData,
    teamPersonnelGroupingColumns,
} from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";
import styles from "../../../styles/PlayerStats.module.scss";
import { ITeamPersonnelStats } from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { IPlayerPBPStats } from "../../../ts/interfaces/playerInterfaces";
import StatTable from "../../../components/StatTable";
import Select from "react-select";
import OnOffSelector from "../../../components/OnOffSelector";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;
        let teamParsed: IPlayerPBPStats[];
        let filteredTeamParsed: IPlayerPBPStats[];

        let pickedPlayers = query.included === "" ? [] : query.included;

        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const playerOptions = await prisma.player_stats_by_play.findMany({
            where: {
                season: season,
                week: {
                    in: weeks || [0],
                },
                down: {
                    in: downs,
                },
                posteam: team,
            },
            distinct: ["offense_player"],
            select: {
                offense_player: true,
            },
        });

        const teamSubRes = await prisma.player_stats_by_play.groupBy({
            by: ["posteam", "offense_player"],
            where: {
                season: season,
                week: {
                    in: weeks || [0],
                },
                down: {
                    in: downs,
                },
                posteam: team,
            },
            _sum: {
                snap_ct: true,
                pass: true,
                player_passing: true,
                player_completion: true,
                player_passing_yards: true,
                player_passing_touchdown: true,
                player_targeted: true,
                player_reception: true,
                player_receiving_yards: true,
                rush: true,
                player_rushing: true,
                player_rushing_yards: true,
                player_rushing_touchdown: true,
                player_receiving_touchdown: true,
            },
            _avg: {
                pass_snap_epa: true,
                rush_snap_epa: true,
            },
            orderBy: {
                offense_player: "asc",
            },
        });

        teamParsed = parseBigInt(teamSubRes);

        const filteredTeamSubRes = await prisma.player_stats_by_play.groupBy({
            by: ["posteam", "offense_player"],
            where: {
                season: season,
                week: {
                    in: weeks || [0],
                },
                down: {
                    in: downs,
                },
                posteam: team,
                AND: [
                    {
                        offense_players: {
                            contains: "Joe Flacco",
                        },
                    },
                ],
            },
            _sum: {
                snap_ct: true,
                pass: true,
                player_passing: true,
                player_completion: true,
                player_passing_yards: true,
                player_passing_touchdown: true,
                player_targeted: true,
                player_reception: true,
                player_receiving_yards: true,
                player_receiving_touchdown: true,
                rush: true,
                player_rushing: true,
                player_rushing_yards: true,
                player_rushing_touchdown: true,
            },
            _avg: {
                pass_snap_epa: true,
                rush_snap_epa: true,
            },
            orderBy: {
                offense_player: "asc",
            },
        });

        filteredTeamParsed = parseBigInt(filteredTeamSubRes);

        let filteredTeamData = filteredTeamParsed.map((team) => flat(team, {}));
        let teamData = teamParsed.map((team) => flat(team, {}));
        const playerOptionsDict = Object.assign(
            [{}],
            playerOptions.map((x) => ({
                value: x.offense_player,
                label: x.offense_player,
            }))
        );

        // .map(
        //     (option) => {{value: option.offense_player, label: option.offense_player}}
        // );

        return {
            props: {
                filteredTeamData: filteredTeamData,
                teamData: teamData,
                playerOptions: playerOptionsDict,
            },
        };
    },
});

interface PlayerProps {
    teamData: ITeamPersonnelStats[];
    filteredTeamData: ITeamPersonnelStats[];
    playerOptions: string[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { pathname, query } = router;

    const [players, setPlayers] = useState<Array<string>>(props.playerOptions);
    const [onPlayers, setOnPlayers] = useState<Array<string>>(
        query.included as Array<string>
    );

    return (
        <div className={styles.playerStatsPageContainer}>
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
                    <div
                        style={{
                            padding: "5%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "5%",
                        }}
                    >
                        <div
                            style={{
                                padding: "2%",
                            }}
                        >
                            <OnOffSelector
                                players={players}
                                playersPicked={onPlayers}
                                pickPlayers={setOnPlayers}
                            />
                        </div>
                        <div
                            style={{
                                padding: "2%",
                            }}
                        >
                            <Select
                                options={players}
                                isMulti
                                onChange={(value) => console.log(value)}
                            />
                        </div>
                    </div>
                    <div className={styles.statsMainContainer}>
                        <div className={styles.selectorTrayContainer}></div>
                        <div className={styles.statTableContainer}>
                            <StatTable
                                data={props.filteredTeamData}
                                columns={playerBySnapData}
                                rowIdCol={"offense_player"}
                                pageSize={10}
                                showToolbar={false}
                                disableFooter={false}
                            />
                        </div>
                    </div>
                    <div className={styles.statsMainContainer}>
                        <div className={styles.selectorTrayContainer}></div>
                        <div className={styles.statTableContainer}>
                            <StatTable
                                data={props.teamData}
                                columns={playerBySnapData}
                                rowIdCol={"offense_player"}
                                pageSize={10}
                                showToolbar={false}
                                disableFooter={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerWeeks;
