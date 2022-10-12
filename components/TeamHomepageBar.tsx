import { useRouter } from "next/router";

interface BarProps {
    teamName: string;
    divisionName: string;
    divisionStanding: string;
    record: string;
}

const TeamHomepageBar: React.FunctionComponent<BarProps> = ({ ...props }) => {
    const router = useRouter();

    return (
        <div
            className="teamLinkBar"
            style={{
                width: "90%",
                maxWidth: "2000px",
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "auto",
                marginRight: "auto",
                height: "10vh",
                padding: "2%",
                backgroundColor: "#f3f4f8",
                marginBottom: "2%",
                alignItems: "center",
                boxShadow: "0px 0.3em 0.3em 0.3em rgba(0, 0, 0, 0.25)",
                textTransform: "uppercase",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                    className="teamLinkHeader"
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        color: "#282a3a",
                    }}
                >
                    {props.teamName}
                </div>
                <div>
                    {props.record}, {props.divisionStanding} in{" "}
                    {props.divisionName}
                </div>
            </div>
        </div>
    );
};

export default TeamHomepageBar;
