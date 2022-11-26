import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectorTray from "../../../components/SelectorTray";
import TeamLinkFooter from "../../../components/TeamFooter";
import UsageInfo from "../../../components/UsageInfo";
import {
    aggregatePersonnelStats,
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

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;
        let teamParsed: IPlayerPBPStats[];

        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

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

        const flat = (obj: any, out: any) => {
            Object.keys(obj).forEach((key) => {
                if (typeof obj[key] == "object") {
                    out = flat(obj[key], out); //recursively call for nesteds
                } else {
                    out[key] = obj[key]; //direct assign for values
                }
            });
            return out;
        };

        let teamData = teamParsed.map((team) => flat(team, {}));

        return {
            props: {
                teamData: teamData,
            },
        };
    },
});

interface PlayerProps {
    teamData: ITeamPersonnelStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
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
                    <div className={styles.statsMainContainer}>
                        <div className={styles.selectorTrayContainer}></div>
                        <div className={styles.statTableContainer}>
                            <StatTable
                                data={props.teamData}
                                columns={playerBySnapData}
                                rowIdCol={"offense_player"}
                                pageSize={10}
                                showToolbar={true}
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
                                showToolbar={true}
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
