import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { playerAdvRushCols, teamStatColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/TeamStats.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { ITeamBasicStats } from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: ITeamBasicStats[];
        let season = Number(query.season) || 2022;
        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const teamSubRes = await prisma.team_offense_stats_basic.groupBy({
            by: ["posteam"],
            where: {
                season: season,
                week: {
                    in: weeks || [0],
                },
                down: {
                    in: downs,
                },
            },
            _sum: {
                pass_attempts: true,
                completions: true,
                pass_touchdown: true,
                interceptions: true,
                sacks: true,
                passing_yards: true,
                rush_attempt: true,
                rushing_yards: true,
                rush_touchdown: true,
                points_for: true,
                points_allowed: true,
            },
            _count: {
                game_id: true,
            },
            orderBy: {
                _sum: {
                    points_for: "desc",
                },
            },
        });

        team = parseBigInt(teamSubRes);

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

        let teamData = team.map((team) => flat(team, {}));

        return {
            props: {
                teamData: teamData,
            },
        };
    },
});

interface PlayerProps {
    teamData: ITeamBasicStats[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

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
                                data={props.teamData}
                                columns={teamStatColumns}
                                rowIdCol={"posteam"}
                                pageSize={25}
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
