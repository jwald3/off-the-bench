import DownSelector from "./DownSelector";
import WeekSelector from "./WeekSelector";

interface CheckboxProps {
    handleWeekFilters: Function;
    weekFilter: number[];
    seasonFilter: number;
    handleSeason: Function;
    handleDownFilters: Function;
    downFilter: number[];
}

const SelectorTray = (props: CheckboxProps) => {
    return (
        <div
            style={{
                width: "90%",
                maxWidth: "1800px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                gap: "2%",
            }}
        >
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
            <WeekSelector
                handleFilters={props.handleWeekFilters}
                weekFilter={props.weekFilter}
                seasonFilter={props.seasonFilter}
                handleSeason={props.handleSeason}
            />
        </div>
    );
};

export default SelectorTray;
