import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import TeamDivisionGroup from "../../components/TeamDivisionGroup";
import prisma from "../../lib/prisma";
import styles from "../../styles/allTeamsHome.module.scss";

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
    wins: number;
    losses: number;
    ties: number;
    standing: string;
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
        <div>
            <Head>
                <title>Teams</title>
                <meta
                    name="description"
                    content="Search stats and data by team"
                />
            </Head>
            <div className={styles.allTeamsHomeContainer}>
                <div className={styles.teamsHeaderBar}>Teams</div>
                <div className={styles.divisionContainer}>
                    <TeamDivisionGroup
                        divisionTitle="AFC East"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "AFC East"
                        )}
                    />
                    <TeamDivisionGroup
                        divisionTitle="AFC North"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "AFC North"
                        )}
                    />
                    <TeamDivisionGroup
                        divisionTitle="AFC South"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "AFC South"
                        )}
                    />
                    <TeamDivisionGroup
                        divisionTitle="AFC West"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "AFC West"
                        )}
                    />
                </div>
                <div className={styles.divisionContainer}>
                    <TeamDivisionGroup
                        divisionTitle="NFC East"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "NFC East"
                        )}
                    />
                    <TeamDivisionGroup
                        divisionTitle="NFC North"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "NFC North"
                        )}
                    />
                    <TeamDivisionGroup
                        divisionTitle="NFC South"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "NFC South"
                        )}
                    />
                    <TeamDivisionGroup
                        divisionTitle="NFC West"
                        teamData={teamInfo.filter(
                            (team) => team.team_division === "NFC West"
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamLandingPage;
