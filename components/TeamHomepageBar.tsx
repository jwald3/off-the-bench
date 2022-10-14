import styles from "../styles/TeamHomepageBar.module.scss";

interface BarProps {
    teamName: string;
    divisionName: string;
    divisionStanding: string;
    record: string;
}

const TeamHomepageBar: React.FunctionComponent<BarProps> = ({ ...props }) => {
    return (
        <div className={styles.teamLinkBar}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={styles.teamLinkHeader}>{props.teamName}</div>
                <div>
                    {props.record}, {props.divisionStanding} in{" "}
                    {props.divisionName}
                </div>
            </div>
        </div>
    );
};

export default TeamHomepageBar;
