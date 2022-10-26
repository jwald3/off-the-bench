import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import TeamDivisionGroup from "../../components/TeamDivisionGroup";
import { parseBigInt } from "../../data/globalVars";
import prisma from "../../lib/prisma";
import styles from "../../styles/AllTeamsHome.module.scss";
import { ITeamInformation } from "../../ts/interfaces/teamInterfaces";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    let team: ITeamInformation[];

    const playerSubRes = await prisma.team_information.findMany({});
    team = parseBigInt(playerSubRes);

    return {
        props: {
            teams: parseBigInt(team),
        },
    };
};

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
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width, height=device-height"
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
