import WeekSelector from "./WeekSelector";

interface CheckboxProps {
    handleFilters: Function;
    weekFilter: number[];
    seasonFilter: number;
    handleSeason: Function;
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
                handleFilters={props.handleFilters}
                weekFilter={props.weekFilter}
                seasonFilter={props.seasonFilter}
                handleSeason={props.handleSeason}
            />
            <WeekSelector
                handleFilters={props.handleFilters}
                weekFilter={props.weekFilter}
                seasonFilter={props.seasonFilter}
                handleSeason={props.handleSeason}
            />
            <WeekSelector
                handleFilters={props.handleFilters}
                weekFilter={props.weekFilter}
                seasonFilter={props.seasonFilter}
                handleSeason={props.handleSeason}
            />
        </div>
    );
};

export default SelectorTray;
