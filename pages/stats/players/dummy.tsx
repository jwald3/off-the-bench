import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import StatTable from "../../../components/StatTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    playerAdvRushCols,
    playerRushUsageColumns,
    playerUsageColumns,
    teamPersonnelGoupingColumns,
    teamPersonnelGroupingColumns,
    teamStatColumns,
} from "../../../data/tableColumns";
import Head from "next/head";
import SelectorTray from "../../../components/SelectorTray";
import styles from "../../../styles/PersonnelPage.module.scss";
import { parseBigInt, regSeasonWeeks } from "../../../data/globalVars";
import {
    ITeamFormationStats,
    ITeamPersonnelStats,
} from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import UsageInfo from "../../../components/UsageInfo";
import TeamLinkFooter from "../../../components/TeamFooter";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;
        let teamParsed: ITeamPersonnelStats[];

        let weeks =
            (query.weeks === "none"
                ? []
                : (query.weeks as string)?.split(",").map(Number)) ||
            regSeasonWeeks;
        let downs = (query.downs === ""
            ? []
            : (query.downs as string)?.split(",").map(Number)) || [1, 2, 3, 4];

        const teamSubRes = await prisma.team_personnel_data.groupBy({
            by: ["posteam", "offense_grouping"],
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
                epa: true,
                passing_snap: true,
                rushing_snap: true,
                passing_yards: true,
                pass_touchdown: true,
                pass_epa: true,
                rushing_yards: true,
                rush_touchdown: true,
                rush_epa: true,
                week_count: true,
                total_game_snaps: true,
            },
            _count: {
                game_id: true,
            },
            orderBy: {
                posteam: "asc",
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
        let finalPersonnel: ITeamPersonnelStats[];

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
        let finalPersonnel: ITeamPersonnelStats[];

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
        <div className={styles.personnelPageContainer}>
            <Head>
                <title>Team Personnel Stats</title>
                <meta name="description" content="Team Personnel Stats" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width, height=device-height"
                />
            </Head>
            <div className={styles.personnelPage}>
                <div className={styles.selectorTrayContainer}>
                    <SelectorTray
                        handleWeekFilters={setWeekFilter}
                        weekFilter={weekFilter}
                        seasonFilter={Number(selectedSeason)}
                        handleSeason={setSelectedSeason}
                        handleDownFilters={setDownFilter}
                        downFilter={downFilter}
                        phaseUrl=""
                        showStatSel={false}
                        statOption={""}
                        categories={""}
                    />
                </div>

                <UsageInfo
                    playerData={aggPersonnel}
                    columns={teamPersonnelGroupingColumns}
                    barDataOne={personnelChartDataOne}
                    barDataTwo={personnelChartDataTwo}
                    headerTitle="personnel usage"
                    altOptionOne="Frequency"
                    altOptionTwo="Success"
                    altOptionThree=""
                    changeView={setPersonnelChartView}
                    dataKey="offense_grouping"
                />
                <TeamLinkFooter />
            </div>
        </div>
    );
};

export default PlayerWeeks;
