import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    playerAdvRushCols,
    teamPersonnelGoupingColumns,
    teamPersonnelGroupingColumns,
    teamStatColumns,
} from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/TeamStats.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { ITeamFormationStats } from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        let team: ITeamFormationStats[];
        let season = Number(query.season) || 2022;
        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const teamSubRes =
            await prisma.personnel_usage_and_success_by_team.groupBy({
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
                    snap_ct_personnel_00: true,
                    personnel_epa_personnel_00: true,
                    snap_ct_personnel_01: true,
                    personnel_epa_personnel_01: true,
                    snap_ct_personnel_02: true,
                    personnel_epa_personnel_02: true,
                    snap_ct_personnel_10: true,
                    personnel_epa_personnel_10: true,
                    snap_ct_personnel_11: true,
                    personnel_epa_personnel_11: true,
                    snap_ct_personnel_12: true,
                    personnel_epa_personnel_12: true,
                    snap_ct_personnel_13: true,
                    personnel_epa_personnel_13: true,
                    snap_ct_personnel_20: true,
                    personnel_epa_personnel_20: true,
                    snap_ct_personnel_21: true,
                    personnel_epa_personnel_21: true,
                    snap_ct_personnel_22: true,
                    personnel_epa_personnel_22: true,
                    snap_ct_personnel_23: true,
                    personnel_epa_personnel_23: true,
                    snap_ct_personnel_jumbo: true,
                    personnel_epa_personnel_jumbo: true,
                    snap_ct_personnel_wildcat: true,
                    personnel_epa_personnel_wildcat: true,
                    team_total_snaps: true,
                    team_epa: true,
                },
                _count: {
                    game_id: true,
                },
                orderBy: {
                    posteam: "asc",
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
    teamData: ITeamFormationStats[];
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
                            phaseUrl={"/stats/teams/defense"}
                            statOption={"Personnel"}
                            showStatSel={true}
                            categories={"teams"}
                        />
                    </div>
                    <div className={styles.statTableContainer}>
                        <StatTable
                            data={props.teamData}
                            columns={teamPersonnelGoupingColumns}
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
