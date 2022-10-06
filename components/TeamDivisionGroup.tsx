import Link from "next/link";
import { useState } from "react";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";

interface DivisionProps {
    divisionTitle: string;
    teamData: Array<any>;
}

const TeamDivisionGroup: React.FunctionComponent<DivisionProps> = ({
    ...props
}) => {
    const [showTeams, setShowTeams] = useState(true);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f3f4f8",
                padding: "2%",
                gap: "1em",
                textTransform: "uppercase",
                width: "20vw",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "2%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#494252",
                    fontWeight: "bold",
                }}
            >
                <span>{props.divisionTitle}</span>
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowTeams(!showTeams)}
                >
                    {showTeams ? <FiMinimize2 /> : <FiMaximize2 />}
                </span>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f3f4f8",
                    paddingLeft: "2%",
                    gap: "1em",
                    width: "fit-content",
                    color: "#777986",
                }}
            >
                {showTeams &&
                    props.teamData.map((team) => (
                        <Link
                            href={`/teams/${team.team_abbr}`}
                            key={team.team_id}
                            style={{ color: "#777986" }}
                        >
                            {team.team_name}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default TeamDivisionGroup;
