import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    playerAdvRushCols,
    playerDefenseSnapCols,
    playerRushUsageColumns,
    playerUsageColumns,
    teamPersonnelGoupingColumns,
    teamPersonnelGroupingColumns,
    teamStatColumns,
} from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/TeamSnaps.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import UsageInfo from "../../../components/UsageInfo";
import TeamLinkFooter from "../../../components/TeamFooter";
import { IPlayerDefensiveSnapData } from "../../../ts/interfaces/playerInterfaces";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;
        let teamParsed: IPlayerDefensiveSnapData[];

        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const teamSubRes = await prisma.defense_player_snaps_by_down.groupBy({
            by: ["defteam", "player_id", "gsis_id", "position"],
            where: {
                season: season,
                week: {
                    in: weeks || [0],
                },
                down: {
                    in: downs,
                },
                defteam: team,
            },
            _sum: {
                snap_ct: true,
                rush_snap: true,
                pass_snap: true,
                team_total_snaps: true,
                team_rush_snaps: true,
                team_pass_snaps: true,
                week: true,
                season: true,
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
    teamData: IPlayerDefensiveSnapData[];
}

const PlayerWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();
    const { query } = router;
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);

    const [personnelChartView, setPersonnelChartView] = useState("frequency");
    const [personnelChartDataOne, setPersonnelChartDataOne] =
        useState("snap_ct");
    const [personnelChartDataTwo, setPersonnelChartDataTwo] = useState("");
    const [aggPersonnel, setAggPersonnel] = useState(props.teamData);

    useEffect(() => {
        let sumOfSnaps: number;
        let finalPersonnel: IPlayerDefensiveSnapData[];

        sumOfSnaps = props.teamData.reduce((i, obj) => {
            return i + obj.snap_ct;
        }, 0);

        finalPersonnel = props.teamData.filter((group) => {
            return group.snap_ct !== 0;
        });

        finalPersonnel.forEach((group) => {
            return { ...group, total_game_snaps: sumOfSnaps };
        });

        finalPersonnel.sort((a, b) => {
            return b.snap_ct - a.snap_ct;
        });

        setAggPersonnel(finalPersonnel);
    }, []);

    useEffect(() => {
        let sumOfSnaps: number;
        let finalPersonnel: IPlayerDefensiveSnapData[];

        sumOfSnaps = props.teamData.reduce((i, obj) => {
            return i + obj.snap_ct;
        }, 0);

        finalPersonnel = props.teamData
            .filter((group) => {
                return group.snap_ct !== 0;
            })
            .map((group) => ({ ...group, total_game_snaps: sumOfSnaps }));

        finalPersonnel.sort((a, b) => {
            return b.snap_ct - a.snap_ct;
        });

        setAggPersonnel(finalPersonnel);
    }, [props.teamData, weekFilter, downFilter, personnelChartView]);

    useEffect(() => {
        if (personnelChartView === "all") {
            setPersonnelChartDataOne("snap_ct");
            setPersonnelChartDataTwo("");
        } else if (personnelChartView === "rz") {
            setPersonnelChartDataOne("passing_yards");
            setPersonnelChartDataTwo("rushing_yards");
        }
    }, [personnelChartView]);

    return (
        <div className={styles.snapSharePageContainer}>
            <Head>
                <title>Player Snaps Defense</title>
                <meta
                    name="description"
                    content="Player Defensive Snaps by Week and Down"
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
                            phaseUrl={"/teams/[team]/snap_counts/offense"}
                            showStatSel={false}
                            statOption={""}
                            categories={""}
                        />
                    </div>
                    <div className={styles.snapTableContainer}>
                        <StatTable
                            data={props.teamData}
                            columns={playerDefenseSnapCols}
                            rowIdCol={"gsis_id"}
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

export default PlayerWeeks;
