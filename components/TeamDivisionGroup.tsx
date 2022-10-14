import Link from "next/link";
import { useState } from "react";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import styles from "../styles/TeamDivisionGroup.module.scss";

interface DivisionProps {
    divisionTitle: string;
    teamData: Array<any>;
}

const TeamDivisionGroup: React.FunctionComponent<DivisionProps> = ({
    ...props
}) => {
    const [showTeams, setShowTeams] = useState(true);

    return (
        <div className={styles.divisionContainer}>
            <div className={styles.divisionHeader}>
                <span>{props.divisionTitle}</span>
                <span
                    className={styles.sizeButton}
                    onClick={() => setShowTeams(!showTeams)}
                >
                    {showTeams ? <FiMinimize2 /> : <FiMaximize2 />}
                </span>
            </div>
            <div className={styles.divisionTeams}>
                {showTeams &&
                    props.teamData.map((team) => (
                        <Link
                            href={`/teams/${team.team_abbr}`}
                            key={team.team_id}
                        >
                            {team.team_name}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default TeamDivisionGroup;
