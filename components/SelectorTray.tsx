import DownSelector from "./DownSelector";
import PhaseToggle from "./PhaseToggle";
import SeasonSelector from "./SeasonSelector";
import WeekSelector from "./WeekSelector";
import styles from "../styles/SelectorTray.module.scss";
import StatOptionSelector from "./StatOptionsSelector";

interface CheckboxProps {
    handleWeekFilters: Function;
    weekFilter: number[];
    seasonFilter: number;
    handleSeason: Function;
    handleDownFilters: Function;
    downFilter: number[];
    phaseUrl: string;
    statOption: string;
    showStatSel: boolean;
}

const SelectorTray = (props: CheckboxProps) => {
    return (
        <div
            className={styles.trayContainer}
            style={{ justifyContent: "space-between", width: "100%", gap: "0" }}
        >
            <div style={{ display: "flex", gap: "4%", width: "auto" }}>
                <PhaseToggle phaseUrl={props.phaseUrl} />
                <WeekSelector
                    handleFilters={props.handleWeekFilters}
                    weekFilter={props.weekFilter}
                    seasonFilter={props.seasonFilter}
                    handleSeason={props.handleSeason}
                />
                <DownSelector
                    handleFilters={props.handleDownFilters}
                    downFilter={props.downFilter}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "4%",
                    width: "auto",
                }}
            >
                {props.showStatSel && (
                    <StatOptionSelector statOption={props.statOption} />
                )}

                <SeasonSelector
                    seasonFilter={props.seasonFilter}
                    handleSeason={props.handleSeason}
                />
            </div>
        </div>
    );
};

export default SelectorTray;
