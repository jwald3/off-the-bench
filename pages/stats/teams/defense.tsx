import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useState } from "react";
import { useRouter } from "next/router";
import { teamStatColumns } from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/TeamStats.module.scss";
import { flat, parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
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

        const teamSubRes = await prisma.team_defense_stats_basic.groupBy({
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
                    points_allowed: "asc",
                },
            },
        });

        team = parseBigInt(teamSubRes);

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
        <div className={styles.teamStatsPageContainer}>
            <Head>
                <title>Team Stats</title>
                <meta
                    name="description"
                    content="Team Stats filterable by week"
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
                            phaseUrl={"/stats/teams/offense"}
                            showStatSel={true}
                            statOption={"Offense"}
                            categories={"teams"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={props.teamData}
                            columns={teamStatColumns}
                            rowIdCol={"posteam"}
                            pageSize={32}
                            disableFooter={false}
                            showToolbar={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerWeeks;
