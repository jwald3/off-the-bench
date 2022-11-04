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
import { teamPersonnelGroupingColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";
import styles from "../../../styles/PersonnelPage.module.scss";
import { ITeamPersonnelStats } from "../../../ts/interfaces/teamInterfaces";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({ query }) => {
        const team = String(query.team) || "NYJ";
        let season = Number(query.season) || 2022;

        let teamQueryResponse = await prisma.team_personnel_data.findMany({
            where: {
                season: season,
                posteam: team,
                week: {
                    in: regSeasonWeeks,
                },
            },
        });

        const playerData: ITeamPersonnelStats[] =
            parseBigInt(teamQueryResponse);

        return {
            props: {
                players: parseBigInt(playerData),
            },
        };
    },
});

interface PersonnelProps {
    players: ITeamPersonnelStats[];
}

const TeamPersonnel: React.FunctionComponent<PersonnelProps> = ({
    ...props
}) => {
    const router = useRouter();
    const { query } = router;
    const [aggPersonnel, setAggPersonnel] = useState(props.players);
    const columns = teamPersonnelGroupingColumns;
    const [selectedSeason, setSelectedSeason] = useState(query.season || 2022);
    const [weekFilter, setWeekFilter] = useState(regSeasonWeeks);
    const [downFilter, setDownFilter] = useState([1, 2, 3, 4]);
    const [personnelChartView, setPersonnelChartView] = useState("frequency");
    const [personnelChartDataOne, setPersonnelChartDataOne] =
        useState("snap_ct");
    const [personnelChartDataTwo, setPersonnelChartDataTwo] = useState("");

    useEffect(() => {
        if (query.weeks !== undefined && query.weeks !== "") {
            const selectedWeeks = (query.weeks as string)
                ?.split(",")
                .map(Number);

            console.log(query.weeks);
            setWeekFilter(selectedWeeks);
        } else if (query.weeks === "") {
            console.log(query.weeks);
            setWeekFilter([]);
        }

        if (query.downs !== undefined && query.downs !== "") {
            const selecteddowns = (query.downs as string)
                ?.split(",")
                .map(Number);

            console.log(query.downs);
            setDownFilter(selecteddowns);
        } else if (query.downs === "") {
            console.log(query.downs);
            setDownFilter([]);
        }

        const currWeekData = props.players.filter((player) =>
            weekFilter.includes(Number.parseInt(player.week.toString()))
        );

        const reducedPersonnel: Array<ITeamPersonnelStats> =
            aggregatePersonnelStats(
                currWeekData,
                "snap_ct",
                "passing_snap",
                "rushing_snap",
                "passing_yards",
                "pass_touchdown",
                "rushing_yards",
                "rush_touchdown",
                "total_game_snaps",
                "week",
                "down",
                "week_count",
                "season",
                "epa",
                "pass_epa",
                "rush_epa"
            );

        const sumOfSnaps = reducedPersonnel.reduce((i, obj) => {
            return i + obj.snap_ct;
        }, 0);

        const finalPersonnel: ITeamPersonnelStats[] = reducedPersonnel.filter(
            (group) => {
                return group.snap_ct !== 0;
            }
        );

        finalPersonnel.forEach((group) => {
            return { ...group, total_game_snaps: sumOfSnaps };
        });

        finalPersonnel.sort((a, b) => {
            return b.snap_ct - a.snap_ct;
        });

        setAggPersonnel(finalPersonnel);
    }, []);

    useEffect(() => {
        if (personnelChartView === "all") {
            setPersonnelChartDataOne("snap_ct");
            setPersonnelChartDataTwo("");
        } else if (personnelChartView === "rz") {
            setPersonnelChartDataOne("passing_yards");
            setPersonnelChartDataTwo("rushing_yards");
        }
    }, [personnelChartView]);

    useEffect(() => {
        const filteredPlayers = props.players
            .filter((player) =>
                weekFilter.includes(Number.parseInt(player.week.toString()))
            )
            .filter((player) =>
                downFilter.includes(Number.parseInt(player.down.toString()))
            );

        const reducedPersonnel = aggregatePersonnelStats(
            filteredPlayers,
            "snap_ct",
            "passing_snap",
            "rushing_snap",
            "passing_yards",
            "pass_touchdown",
            "rushing_yards",
            "rush_touchdown",
            "total_game_snaps",
            "week",
            "down",
            "week_count",
            "season",
            "epa",
            "pass_epa",
            "rush_epa"
        );

        const sumOfSnaps = reducedPersonnel.reduce((i, obj) => {
            return i + obj.snap_ct;
        }, 0);

        const finalPersonnel: ITeamPersonnelStats[] = reducedPersonnel
            .filter((group) => {
                return group.snap_ct !== 0;
            })
            .map((group) => ({ ...group, total_game_snaps: sumOfSnaps }));

        finalPersonnel.sort((a, b) => {
            return b.snap_ct - a.snap_ct;
        });

        setAggPersonnel(finalPersonnel);
    }, [weekFilter, downFilter]);

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
                    columns={columns}
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

export default TeamPersonnel;
