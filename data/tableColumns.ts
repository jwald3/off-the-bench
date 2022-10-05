import {
    GridCellParams,
    GridColDef,
    GridValueFormatterParams,
} from "@mui/x-data-grid";

export const playerDefenseColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.75,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 0.5,
        type: "string",
    },
    {
        headerName: "Team",
        field: "team_abbr",
        flex: 0.5,
        type: "string",
    },
    {
        headerName: "Games",
        field: "week_count",
        flex: 0.5,
        type: "number",
    },
    {
        headerName: "INTs",
        field: "interception",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT Yards",
        field: "int_return_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT TDs",
        field: "int_return_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passes Defended",
        field: "passes_defended",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Forced Fumbles",
        field: "fumbles_forced",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        type: "number",
        flex: 1,
        valueGetter: getTotalSacks,
    },
    {
        headerName: "Combined Tackles",
        field: "comb_tackles",
        flex: 1,
        valueGetter: getComboTackles,
        type: "number",
    },
    {
        headerName: "Solo Tackles",
        field: "solo_tackles",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Assists on Tackles",
        field: "assist_tackls",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Tackles For Loss",
        field: "tackles_for_loss",
        flex: 1,
        type: "number",
    },
    {
        headerName: "QB Hits",
        field: "qb_hits",
        flex: 1,
        type: "number",
    },
];

function getTotalSacks(params: GridCellParams) {
    return params.row.sack + params.row.half_sack * 0.5;
}

function getComboTackles(params: GridCellParams) {
    return (
        params.row.solo_tackles +
        params.row.assist_tackls +
        params.row.tackle_with_assist
    );
}

export const playerOffenseColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.5,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Team",
        field: "team_abbr",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Games",
        field: "week_count",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass Attempts",
        field: "pass_attempt",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completion",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completion %",
        field: "compPercent",
        flex: 1,
        valueGetter: getPlayerCompletionPct,
        type: "number",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        },
    },
    {
        headerName: "Passing Yards",
        field: "passing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing TDs",
        field: "passing_TD",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT",
        field: "interception",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempt",
        width: 75,
        type: "number",
    },
    {
        headerName: "Rushing Yards",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rushing TDs",
        field: "rushing_TD",
        flex: 1,
        type: "number",
    },
    {
        headerName: "TFL",
        field: "tackled_for_loss",
        width: 75,
        type: "number",
    },
    {
        headerName: "FUM",
        field: "fumble",
        width: 75,
        type: "number",
    },
    {
        headerName: "REC",
        field: "reception",
        flex: 0.75,
        type: "number",
    },
    {
        headerName: "TGT",
        field: "target",
        flex: 0.75,
        type: "number",
    },
    {
        headerName: "Rec. Yards",
        field: "receiving_yards",
        flex: 0.75,
        type: "number",
    },
    {
        headerName: "Rec. TDs",
        field: "receiving_TD",
        flex: 0.75,
        type: "number",
    },
];

export const teamStatColumns: GridColDef[] = [
    { headerName: "Team", field: "posteam", flex: 0.5 },
    {
        headerName: "Completions",
        field: "completions",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass Attempts",
        field: "pass_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completion %",
        field: "compPercent",
        flex: 1,
        valueGetter: getCompletionPct,
        type: "number",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        },
    },
    {
        headerName: "Passing TDs",
        field: "pass_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INTs",
        field: "interceptions",
        flex: 1,
        type: "number",
    },
    { headerName: "Sacks", field: "sacks", flex: 0.5, type: "number" },
    {
        headerName: "Passing Yards",
        field: "passing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush Attempts",
        field: "rush_attempt",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rushing Yards",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Yards Per Carry",
        field: "yardsPerCarry",
        flex: 1,
        valueGetter: getYPC,
        type: "number",
    },
    {
        headerName: "Rushing TDs",
        field: "rush_touchdown",
        flex: 1,
        type: "number",
    },
];

function getCompletionPct(params: GridCellParams) {
    return (
        ((params.row.completions || 0) / params.row.pass_attempts) *
        100
    ).toFixed(2);
}

function getPlayerCompletionPct(params: GridCellParams) {
    if (params.row.pass_attempt == 0) {
        return 0;
    }

    return (
        ((params.row.completion || 0) / params.row.pass_attempt) *
        100
    ).toFixed(2);
}

function getYPC(params: GridCellParams) {
    return `${(
        (params.row.rushing_yards || 0) / params.row.rush_attempt
    ).toFixed(2)}`;
}

export const playerUsageColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.5,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 1,
        type: "string",
    },
    {
        headerName: "TGTs",
        field: "targets",
        flex: 1,
        type: "number",
    },
    {
        headerName: "RECs",
        field: "receptions",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rec. Yards",
        field: "receiving_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Air Yards",
        field: "air_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "YAC",
        field: "yards_after_catch",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rec. TDs",
        field: "receiving_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "RZ TGT",
        field: "redzone_target",
        flex: 1,
        type: "number",
    },
    {
        headerName: "RZ REC",
        field: "redzone_catch",
        flex: 1,
        type: "number",
    },
    {
        headerName: "EZ TGT",
        field: "endzone_target",
        flex: 1,
        type: "number",
    },
    {
        headerName: "EZ REC",
        field: "endzone_catch",
        flex: 1,
        type: "number",
    },
    {
        headerName: "3D TGT",
        field: "third_down_target",
        flex: 1,
        type: "number",
    },
    {
        headerName: "3D REC",
        field: "third_down_catch",
        flex: 1,
        type: "number",
    },
    {
        headerName: "4D TGT",
        field: "fourth_down_target",
        flex: 1,
        type: "number",
    },
    {
        headerName: "4D REC",
        field: "fourth_down_catch",
        flex: 1,
        type: "number",
    },
];

export const playerRushUsageColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.5,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Rushes",
        field: "rush_attempt",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush Yards",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "YPC",
        field: "yardsPerCarry",
        flex: 1,
        valueGetter: getYPC,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rush_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Stacked Box Rush",
        field: "stacked_box_rush",
        flex: 1,
        type: "number",
        valueGetter: getStackedBoxPct,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        },
    },
    {
        headerName: "Tackled For Loss",
        field: "tackled_for_loss",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Fumble",
        field: "fumble",
        flex: 1,
        type: "number",
    },
    {
        headerName: "RZ Rush",
        field: "redzone_rush",
        flex: 1,
        type: "number",
    },
    {
        headerName: "RZ TD",
        field: "redzone_rush_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "EZ Rush",
        field: "goalline_rush",
        flex: 1,
        type: "number",
    },
    {
        headerName: "EZ TD",
        field: "goalline_rush_touchdown",
        flex: 1,
        type: "number",
    },
];

function getStackedBoxPct(params: GridCellParams) {
    return (
        ((params.row.stacked_box_rush || 0) / params.row.rush_attempt) *
        100
    ).toFixed(2);
}

export const teamPersonnelGroupingColumns: GridColDef[] = [
    {
        headerName: "Personnel",
        field: "offense_grouping",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Total Snaps",
        field: "snap_ct",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Personnel Percentage",
        field: "personnel_pct",
        flex: 1,
        type: "number",
        valueGetter: getPersonnelPct,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        },
    },
    {
        headerName: "Pass Snaps",
        field: "passing_snap",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass Yards",
        field: "passing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass TDs",
        field: "pass_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush Snaps",
        field: "rushing_snap",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush Yards",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rush_touchdown",
        flex: 1,
        type: "number",
    },
];

function getPersonnelPct(params: GridCellParams) {
    return (
        ((params.row.snap_ct || 0) / params.row.total_game_snaps) *
        100
    ).toFixed(2);
}

export const teamGameLogColumns: GridColDef[] = [
    {
        headerName: "Week",
        field: "week",
        flex: 1,
        type: "number",
    },
    {
        headerName: "TM",
        field: "posteam",
        flex: 0.75,
        type: "string",
    },
    {
        headerName: "OPP",
        field: "defteam",
        flex: 0.75,
        type: "string",
    },
    {
        headerName: "TM Score",
        field: "posteam_score",
        flex: 1,
        type: "number",
    },
    {
        headerName: "OPP Score",
        field: "defteam_score",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Result",
        field: "result",
        type: "string",
        flex: 0.5,
        valueGetter: getGameResult,
    },
    {
        headerName: "Total Yards",
        field: "yards_gained",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Turnovers",
        field: "turnovers",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Fumbles",
        field: "fumbles",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Fumbles Lost",
        field: "fumbles_lost",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completed_passes",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passes",
        field: "pass_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing Yds",
        field: "receiving_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT",
        field: "interceptions",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sacks",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush Yds",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rushing_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "XPM",
        field: "extra_points_made",
        flex: 1,
        type: "number",
    },
    {
        headerName: "XPA",
        field: "extra_point_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "FGM",
        field: "field_goals_made",
        flex: 1,
        type: "number",
    },
    {
        headerName: "FGA",
        field: "field_goals_attempted",
        flex: 1,
        type: "number",
    },
    {
        headerName: "TOP",
        field: "time_of_possession",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Penalties",
        field: "penalties",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Penalty Yds",
        field: "penalty_yards",
        flex: 1,
        type: "string",
    },
];

function getGameResult(params: GridCellParams) {
    return params.row.posteam_score > params.row.defteam_score
        ? "W"
        : params.row.posteam_score < params.row.defteam_score
        ? "L"
        : "T";
}

export const downDataColumns: GridColDef[] = [
    {
        headerName: "Down",
        field: "down",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempt",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rushing Yds.",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rushing TDs.",
        field: "rush_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "complete_pass",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass Attempts",
        field: "pass_attempt",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing Yds.",
        field: "passing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing TDs.",
        field: "pass_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INTs",
        field: "interception",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        flex: 1,
        type: "number",
    },
];

export const teamStatLog: GridColDef[] = [
    {
        headerName: "Team",
        field: "team",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Total Yards",
        field: "totalYards",
        flex: 1,
        valueGetter: getTotalYards,
        type: "number",
    },
    {
        headerName: "Total Plays",
        field: "totalPlays",
        flex: 1,
        valueGetter: getTotalPlays,
        type: "number",
    },
    {
        headerName: "Total Y/P",
        field: "totalYPP",
        flex: 1,
        valueGetter: getTotalYardsPerPlay,
        type: "number",
    },
    {
        headerName: "Turnovers",
        field: "turnovers",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Fumbles",
        field: "fumbles",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Fumbles Lost",
        field: "fumbles_lost",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completed_passes",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passes",
        field: "pass_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing Yds",
        field: "receiving_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Passing Y/A",
        field: "passYPP",
        flex: 1,
        valueGetter: getPassYdsPerAtt,
        type: "number",
    },
    {
        headerName: "INT",
        field: "interceptions",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sacks",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rush Yds",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Rushing Y/A",
        field: "rushYPP",
        flex: 1,
        valueGetter: getRushYdsPerAtt,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rushing_touchdown",
        flex: 1,
        type: "number",
    },
    {
        headerName: "XPM",
        field: "extra_points_made",
        flex: 1,
        type: "number",
    },
    {
        headerName: "XPA",
        field: "extra_point_attempts",
        flex: 1,
        type: "number",
    },
    {
        headerName: "FGM",
        field: "field_goals_made",
        flex: 1,
        type: "number",
    },
    {
        headerName: "FGA",
        field: "field_goals_attempted",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Penalties",
        field: "penalties",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Penalty Yds",
        field: "penalty_yards",
        flex: 1,
        type: "string",
    },
];

function getTotalYards(params: GridCellParams) {
    return params.row.rushing_yards + params.row.receiving_yards;
}

function getTotalPlays(params: GridCellParams) {
    return (
        params.row.rush_attempts + params.row.pass_attempts + params.row.sacks
    );
}

function getTotalYardsPerPlay(params: GridCellParams) {
    return (
        (params.row.rushing_yards + params.row.receiving_yards) /
        (params.row.rush_attempts + params.row.pass_attempts + params.row.sacks)
    ).toFixed(1);
}

function getPassYdsPerAtt(params: GridCellParams) {
    return (params.row.receiving_yards / params.row.pass_attempts).toFixed(1);
}

function getRushYdsPerAtt(params: GridCellParams) {
    return (params.row.rushing_yards / params.row.rush_attempts).toFixed(1);
}
