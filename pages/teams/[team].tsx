import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlayerTableHeader from "../../components/PlayerTableHeader";
import Checkbox from "../../components/WeekCheckboxFilter";
import StatTable from "../../components/StatTable";
import Head from "next/head";
import { playerUsageColumns } from "../../data/tableColumns";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const team = String(query.team) || "NYJ";

    let teamQueryResponse = await prisma.player_usage_by_team.findMany({
        where: {
            season: 2022,
            posteam: team,
        },
    });

    const playerData = JSON.parse(
        JSON.stringify(teamQueryResponse, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    return {
        props: {
            players: JSON.parse(
                JSON.stringify(playerData, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
    };
};

interface IPlayerUsage {
    posteam: string;
    game_id: string;
    player_id: string;
    position: string;
    targets: number;
    receptions: number;
    receiving_yards: number;
    air_yards: number;
    yards_after_catch: number;
    receiving_touchdown: number;
    redzone_target: number;
    redzone_catch: number;
    endzone_target: number;
    endzone_catch: number;
    first_down_target: number;
    second_down_target: number;
    third_down_target: number;
    fourth_down_target: number;
    first_down_catch: number;
    second_down_catch: number;
    third_down_catch: number;
    fourth_down_catch: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    stacked_box_rush: number;
    tackled_for_loss: number;
    fumble: number;
    first_down_rush: number;
    second_down_rush: number;
    third_down_rush: number;
    fourth_down_rush: number;
    redzone_rush: number;
    goalline_rush: number;
    redzone_rush_touchdown: number;
    goalline_rush_touchdown: number;
    gsis_id: string;
    db_id: string;
    season: number;
}

interface PlayerProps {
    players: IPlayerUsage[];
}

const TeamWeeks: React.FunctionComponent<PlayerProps> = ({ ...props }) => {
    const router = useRouter();

    const columns = playerUsageColumns;
    const [playerStats, setPlayerStats] = useState(props.players);
    const [aggPlayers, setAggPlayers] = useState(props.players);

    const aggregateStats = (dataframe: IPlayerUsage[]) => {
        let teamsMap = new Map();

        for (let obj in dataframe) {
            if (teamsMap.get(dataframe[obj].player_id)) {
                let currentObj = teamsMap.get(dataframe[obj].player_id);
                let newObj = {
                    player_id: dataframe[obj].player_id,
                    targets:
                        Number.parseInt(currentObj.targets.toString()) +
                        Number.parseInt(dataframe[obj].targets.toString()),
                    receptions:
                        Number.parseInt(currentObj.receptions.toString()) +
                        Number.parseInt(dataframe[obj].receptions.toString()),
                    receiving_yards:
                        Number.parseInt(currentObj.receiving_yards.toString()) +
                        Number.parseInt(
                            dataframe[obj].receiving_yards.toString()
                        ),
                    air_yards:
                        Number.parseInt(currentObj.air_yards.toString()) +
                        Number.parseInt(dataframe[obj].air_yards.toString()),
                    yards_after_catch:
                        Number.parseInt(
                            currentObj.yards_after_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].yards_after_catch.toString()
                        ),
                    receiving_touchdown:
                        Number.parseInt(
                            currentObj.receiving_touchdown.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].receiving_touchdown.toString()
                        ),
                    redzone_target:
                        Number.parseInt(currentObj.redzone_target.toString()) +
                        Number.parseInt(
                            dataframe[obj].redzone_target.toString()
                        ),
                    redzone_catch:
                        Number.parseInt(currentObj.redzone_catch.toString()) +
                        Number.parseInt(
                            dataframe[obj].redzone_catch.toString()
                        ),
                    endzone_catch:
                        Number.parseInt(currentObj.endzone_catch.toString()) +
                        Number.parseInt(
                            dataframe[obj].endzone_catch.toString()
                        ),
                    endzone_target:
                        Number.parseInt(currentObj.endzone_target.toString()) +
                        Number.parseInt(
                            dataframe[obj].endzone_target.toString()
                        ),
                    third_down_target:
                        Number.parseInt(
                            currentObj.third_down_target.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].third_down_target.toString()
                        ),
                    third_down_catch:
                        Number.parseInt(
                            currentObj.third_down_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].third_down_catch.toString()
                        ),
                    fourth_down_target:
                        Number.parseInt(
                            currentObj.fourth_down_target.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].fourth_down_target.toString()
                        ),
                    fourth_down_catch:
                        Number.parseInt(
                            currentObj.fourth_down_catch.toString()
                        ) +
                        Number.parseInt(
                            dataframe[obj].fourth_down_catch.toString()
                        ),
                    db_id: currentObj.db_id,
                    posteam: currentObj.posteam,
                    position: currentObj.position,
                };
                teamsMap.set(currentObj.player_id, newObj);
            } else {
                teamsMap.set(dataframe[obj].player_id, {
                    ...dataframe[obj],
                });
            }
        }
        return Array.from(teamsMap.values());
    };

    useEffect(() => {
        const reducedTeams = aggregateStats(props.players);

        setAggPlayers(reducedTeams);
    }, []);

    return (
        <div>
            <Head>
                <title>Player Stats</title>
                <meta
                    name="description"
                    content="Player Stats filterable by week"
                />
            </Head>
            <div className="weekly-team-page">
                <PlayerTableHeader />
                <div className="weekly-team-stats">
                    <StatTable
                        data={aggPlayers}
                        columns={columns}
                        rowIdCol={"db_id"}
                        pageSize={25}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamWeeks;
