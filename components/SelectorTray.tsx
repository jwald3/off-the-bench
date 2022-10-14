import DownSelector from "./DownSelector";
import PhaseToggle from "./PhaseToggle";
import SeasonSelector from "./SeasonSelector";
import WeekSelector from "./WeekSelector";

interface CheckboxProps {
    handleWeekFilters: Function;
    weekFilter: number[];
    seasonFilter: number;
    handleSeason: Function;
    handleDownFilters: Function;
    downFilter: number[];
    phaseUrl: string;
}

const SelectorTray = (props: CheckboxProps) => {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "2000px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                gap: "2%",
            }}
        >
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
            <SeasonSelector
                seasonFilter={props.seasonFilter}
                handleSeason={props.handleSeason}
            />
        </div>
    );
};

export default SelectorTray;
