import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: ITeamInformation[];

    const playerSubRes = await prisma.team_information.findMany({});
    team = JSON.parse(
        JSON.stringify(playerSubRes, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );

    return {
        props: {
            teams: JSON.parse(
                JSON.stringify(team, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
    };
};

interface ITeamInformation {
    team_abbr: string;
    team_name: string;
    team_id: number;
    team_nick: string;
    team_conf: string;
    team_division: string;
    team_color: string;
    team_color2: string;
    team_color3: string;
    team_color4: string;
    team_logo_wikipedia: string;
    team_logo_espn: string;
    team_wordmark: string;
    team_conference_logo: string;
    team_league_logo: string;
    team_logo_squared: string;
}

interface TeamProps {
    teams: ITeamInformation[];
}

const TeamLandingPage: React.FunctionComponent<TeamProps> = ({ ...props }) => {
    const [teamInfo, setTeamInfo] = useState(props.teams);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f5f5f5",
                paddingLeft: "2%",
                paddingTop: "2%",
                gap: "1em",
            }}
        >
            {teamInfo.map((team) => (
                <Link href={`/teams/${team.team_abbr}`} key={team.team_id}>
                    {team.team_name}
                </Link>
            ))}
        </div>
    );
};

export default TeamLandingPage;
