import { GetServerSideProps } from "next";
import { useState } from "react";
import StatTable from "../../../components/StatTable";
import TeamLinkBar from "../../../components/TeamLinkBar";
import { teamGameLogColumns } from "../../../data/tableColumns";
import prisma from "../../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const team = String(query.team) || "NYJ";
    let season = Number(query.season) || 2022;

    let teamQueryResponse = await prisma.game_logs_basic.findMany({
        where: {
            season: season,
            posteam: team,
        },
    });

    const playerData: ITeamGameLogs[] = JSON.parse(
        JSON.stringify(teamQueryResponse, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    return {
        props: {
            game_logs: JSON.parse(
                JSON.stringify(playerData, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
    };
};

interface ITeamGameLogs {
    game_id: string;
    posteam: string;
    defteam: string;
    posteam_score: number;
    defteam_score: number;
    yards_gained: number;
    turnovers: number;
    fumbles: number;
    fumbles_lost: number;
    completed_passes: number;
    incomplete_passes: number;
    pass_attempts: number;
    receiving_yards: number;
    passing_touchdowns: number;
    interceptions: number;
    sacks: number;
    rush_attempts: number;
    rushing_yards: number;
    rushing_touchdown: number;
    extra_points_made: number;
    extra_point_attempts: number;
    field_goals_made: number;
    field_goals_attempted: number;
    time_of_possession: string;
    penalties: number;
    penalty_yards: number;
    db_id: string;
    season: number;
    week: number;
}

interface GameLogProps {
    game_logs: ITeamGameLogs[];
}

const TeamPage: React.FunctionComponent<GameLogProps> = ({ ...props }) => {
    const [gameLogs, setGameLogs] = useState(props.game_logs);

    return (
        <div
            className="weekly-team-page"
            style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "2%",
                flexDirection: "column",
            }}
        >
            <TeamLinkBar />
            <StatTable
                data={gameLogs}
                columns={teamGameLogColumns}
                rowIdCol={"db_id"}
                pageSize={21}
            />
        </div>
    );
};

export default TeamPage;
