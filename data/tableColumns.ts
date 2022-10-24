import {
    GridCellParams,
    GridColDef,
    GridValueFormatterParams,
} from "@mui/x-data-grid";

export const playerDefenseColumns: GridColDef[] = [
    {
        headerName: "Player",
        headerClassName: "grid-header",
        field: "player_id",
        flex: 1.75,
        type: "string",
    },
    {
        headerName: "Position",
        headerClassName: "grid-header",
        field: "position",
        flex: 0.5,
        type: "string",
    },
    {
        headerName: "Team",
        headerClassName: "grid-header",
        field: "team_abbr",
        flex: 0.5,
        type: "string",
    },
    {
        headerName: "Games",
        headerClassName: "grid-header",
        field: "week_count",
        flex: 0.5,
        type: "number",
    },
    {
        headerName: "INTs",
        headerClassName: "grid-header",
        field: "interception",
        flex: 1,
        type: "number",
    },
    {
        headerName: "INT Yards",
        headerClassName: "grid-header",
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
        headerClassName: "grid-header",
        width: 150,
        field: "player_id",
        type: "string",
    },
    {
        headerName: "Position",
        headerClassName: "grid-header",
        field: "position",
        type: "string",
    },
    {
        headerName: "Team",
        headerClassName: "grid-header",
        field: "team_abbr",
        type: "string",
    },
    {
        headerName: "Pass Attempts",
        headerClassName: "grid-header",
        field: "pass_attempt",
        type: "number",
    },
    {
        headerName: "Completions",
        headerClassName: "grid-header",
        field: "completion",
        type: "number",
    },
    {
        headerName: "Completion %",
        headerClassName: "grid-header",
        field: "compPercent",
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
        headerClassName: "grid-header",
        field: "passing_yards",
        type: "number",
    },
    {
        headerName: "Passing TDs",
        headerClassName: "grid-header",
        field: "passing_TD",
        type: "number",
    },
    {
        headerName: "INT",
        headerClassName: "grid-header",
        field: "interception",
        type: "number",
    },
    {
        headerName: "Sacks",
        headerClassName: "grid-header",
        field: "sack",
        type: "number",
    },
    {
        headerName: "Carries",
        headerClassName: "grid-header",
        field: "rush_attempt",
        type: "number",
    },
    {
        headerName: "Rushing Yards",
        headerClassName: "grid-header",
        field: "rushing_yards",
        type: "number",
    },
    {
        headerName: "Rushing TDs",
        headerClassName: "grid-header",
        field: "rushing_TD",
        type: "number",
    },
    {
        headerName: "TFL",
        headerClassName: "grid-header",
        field: "tackled_for_loss",
        type: "number",
    },
    {
        headerName: "FUM",
        headerClassName: "grid-header",
        field: "fumble",
        type: "number",
    },
    {
        headerName: "REC",
        headerClassName: "grid-header",
        field: "reception",
        type: "number",
    },
    {
        headerName: "TGT",
        headerClassName: "grid-header",
        field: "target",
        type: "number",
    },
    {
        headerName: "Rec. Yards",
        headerClassName: "grid-header",
        field: "receiving_yards",
        type: "number",
    },
    {
        headerName: "Rec. TDs",
        headerClassName: "grid-header",
        field: "receiving_TD",
        type: "number",
    },
];

export const teamStatColumns: GridColDef[] = [
    { headerName: "Team", field: "posteam", flex: 1 },
    {
        headerName: "PF",
        field: "points_for",
        width: 75,
        type: "number",
    },
    {
        headerName: "PA",
        field: "points_allowed",
        width: 75,
        type: "number",
    },
    {
        headerName: "COMP",
        field: "completions",
        width: 100,
        type: "number",
    },

    {
        headerName: "ATTs",
        field: "pass_attempts",
        width: 100,
        type: "number",
    },
    {
        headerName: "COMP %",
        field: "compPercent",
        flex: 1.5,
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
        headerName: "Pass TDs",
        field: "pass_touchdown",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "INTs",
        field: "interceptions",
        width: 50,
        type: "number",
    },
    { headerName: "Sacks", field: "sacks", width: 75, type: "number" },
    {
        headerName: "Pass Yards",
        field: "passing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempt",
        width: 100,
        type: "number",
    },
    {
        headerName: "Rush Yards",
        field: "rushing_yards",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Yards/Carry",
        field: "yardsPerCarry",
        flex: 1,
        valueGetter: getYPC,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rush_touchdown",
        width: 100,
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
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "Tot. YDs",
        field: "totalYards",
        flex: 1,
        minWidth: 80,
        valueGetter: getTotalYards,
        type: "number",
    },
    {
        headerName: "Tot. Plays",
        field: "totalPlays",
        flex: 1,
        minWidth: 80,
        valueGetter: getTotalPlays,
        type: "number",
    },
    {
        headerName: "Total Y/P",
        field: "totalYPP",
        flex: 1,
        minWidth: 80,
        valueGetter: getTotalYardsPerPlay,
        type: "number",
    },
    {
        headerName: "TOVs",
        field: "turnovers",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Fumbles",
        field: "fumbles",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Fumbles Lost",
        field: "fumbles_lost",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completed_passes",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Passes",
        field: "pass_attempts",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Passing Yds",
        field: "receiving_yards",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Passing Y/A",
        field: "passYPP",
        flex: 1,
        minWidth: 80,
        valueGetter: getPassYdsPerAtt,
        type: "number",
    },
    {
        headerName: "INT",
        field: "interceptions",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sacks",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempts",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Rush Yds",
        field: "rushing_yards",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Rushing Y/A",
        field: "rushYPP",
        flex: 1,
        minWidth: 80,
        valueGetter: getRushYdsPerAtt,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rushing_touchdown",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "XPM",
        field: "extra_points_made",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "XPA",
        field: "extra_point_attempts",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "FGM",
        field: "field_goals_made",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "FGA",
        field: "field_goals_attempted",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Penalties",
        field: "penalties",
        flex: 1,
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "Penalty Yds",
        field: "penalty_yards",
        flex: 1,
        minWidth: 80,
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

export const conversionRateStatCols: GridColDef[] = [
    {
        headerName: "Play Type",
        field: "play_type",
        flex: 1,
        type: "string",
    },
    {
        headerName: "3rd Downs Converted",
        field: "third_down_converted",
        flex: 1,
        type: "string",
    },
    {
        headerName: "3rd Downs Attemped",
        field: "third_down_attempt",
        flex: 1,
        type: "string",
    },
    {
        headerName: "3rd Down Conversion %",
        field: "thirdDownConvPct",
        flex: 1,
        valueGetter: getThirdDownConv,
        type: "number",
    },

    {
        headerName: "4th Downs Converted",
        field: "fourth_down_converted",
        flex: 1,
        type: "string",
    },
    {
        headerName: "4th Downs Attemped",
        field: "fourth_down_attempt",
        flex: 1,
        type: "string",
    },
    {
        headerName: "4th Down Conversion %",
        field: "fourthDownConvPct",
        flex: 1,
        valueGetter: getFourthDownConv,
        type: "number",
    },
];

function getThirdDownConv(params: GridCellParams) {
    return (
        (params.row.third_down_converted / params.row.third_down_attempt) *
        100
    ).toFixed(1);
}

function getFourthDownConv(params: GridCellParams) {
    if (params.row.fourth_down_attempt === 0) {
        return 0;
    }

    return (
        (params.row.fourth_down_converted / params.row.fourth_down_attempt) *
        100
    ).toFixed(1);
}

export const playerSnapCols: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        width: 175,
        type: "string",
    },
    {
        headerName: "Total Snaps",
        field: "snap_ct",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Snap %",
        field: "tot_snap_pct",
        flex: 1,
        valueGetter: getTotalSnapPct,
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
        headerName: "Rush Snaps",
        field: "rush_snap",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Rush Snap %",
        field: "rush_snap_pct",
        flex: 1,
        valueGetter: getRushSnapPct,
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
        headerName: "Carries",
        field: "carries",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Carry Share",
        field: "carry_share",
        flex: 1,
        valueGetter: getCarryShare,
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
        headerName: "Rush TDs",
        flex: 1,
        field: "rushing_touchdown",
        type: "number",
    },
    {
        headerName: "Pass Snaps",
        flex: 1,
        field: "pass_snap",
        type: "number",
    },
    {
        headerName: "Pass %",
        field: "pass_snap_pct",
        valueGetter: getPassSnapPct,
        flex: 1,
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
        headerName: "Receptions",
        field: "reception",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Targets",
        field: "target",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Target Share",
        field: "target_share",
        valueGetter: getTargetShare,
        flex: 1,
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
        headerName: "Receiving TDs",
        flex: 1,
        field: "receiving_touchdown",
        type: "number",
    },
];

function getTotalSnapPct(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return ((params.row.snap_ct / params.row.team_snaps) * 100).toFixed(1);
}

function getRushSnapPct(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return (
        (params.row.rush_snap / params.row.team_rushing_plays) *
        100
    ).toFixed(1);
}

function getPassSnapPct(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return (
        (params.row.pass_snap / params.row.team_passing_plays) *
        100
    ).toFixed(1);
}

function getTargetShare(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return ((params.row.target / params.row.team_passing_plays) * 100).toFixed(
        1
    );
}

function getCarryShare(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return ((params.row.carries / params.row.team_rushing_plays) * 100).toFixed(
        1
    );
}

export const playerDefenseSnapCols: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Total Snaps",
        field: "snap_ct",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Snap %",
        field: "tot_snap_pct",
        flex: 1,
        valueGetter: getTotalSnapPct,
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
        headerName: "Rushing Snaps",
        field: "rush_snap",
        flex: 1,
        type: "string",
    },
    {
        headerName: "Rush Snap %",
        field: "rush_snap_pct",
        flex: 1,
        valueGetter: getRushSnapPct,
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
        headerName: "Passing Snaps",
        field: "pass_snap",
        flex: 1,
        type: "number",
    },
    {
        headerName: "Pass %",
        field: "pass_snap_pct",
        flex: 1,
        valueGetter: getPassSnapPct,
        type: "number",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        },
    },
];

export const playerAdvRecCols: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        type: "string",
        width: 175,
    },
    {
        headerName: "Team",
        field: "posteam",
        type: "string",
    },
    {
        headerName: "REC",
        field: "complete_pass",
        type: "number",
    },
    {
        headerName: "TGT",
        field: "pass_attempt",
        type: "number",
    },
    {
        headerName: "CATCH %",
        field: "catch_pct",
        flex: 1,
        valueGetter: getCatchPct,
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
        headerName: "REC YDS",
        field: "passing_yards",
        type: "number",
    },
    {
        headerName: "YDS/REC",
        field: "yards_per_rec",
        flex: 1,
        valueGetter: getYardsReception,
        type: "number",
    },
    {
        headerName: "YDS/TGT",
        field: "yards_per_tgt",
        flex: 1,
        valueGetter: getYardsTarget,
        type: "number",
    },
    {
        headerName: "REC TDS",
        field: "pass_touchdown",
        type: "number",
    },
    {
        headerName: "TGT SHARE",
        field: "tgr_pct",
        flex: 1,
        valueGetter: getTgtPct,
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
        headerName: "AIR YDS",
        field: "air_yards",
        type: "number",
    },
    {
        headerName: "aDOT",
        field: "adot",
        flex: 1,
        valueGetter: getAdot,
        type: "number",
    },
    {
        headerName: "AIR YDS %",
        field: "adot_pct",
        flex: 1,
        valueGetter: getAirYdsPct,
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
        headerName: "RACR",
        field: "racr",
        flex: 1,
        valueGetter: getRacr,
        type: "number",
    },
    {
        headerName: "WOPR",
        field: "wopr",
        flex: 1,
        valueGetter: getWopr,
        type: "number",
    },
];

function getCatchPct(params: GridCellParams) {
    if (params.row.pass_attempt === 0) {
        return 0;
    }

    return ((params.row.complete_pass / params.row.pass_attempt) * 100).toFixed(
        1
    );
}

function getTgtPct(params: GridCellParams) {
    if (params.row.team_pass_attempt === 0) {
        return 0;
    }

    return (
        (params.row.pass_attempt / params.row.team_pass_attempt) *
        100
    ).toFixed(1);
}

function getAdot(params: GridCellParams) {
    if (params.row.pass_attempt === 0) {
        return 0;
    }

    return (params.row.air_yards / params.row.pass_attempt).toFixed(1);
}

function getRacr(params: GridCellParams) {
    if (params.row.air_yards === 0) {
        return 0;
    }

    return (params.row.passing_yards / params.row.air_yards).toFixed(2);
}

function getAirYdsPct(params: GridCellParams) {
    if (params.row.team_air_yards === 0) {
        return 0;
    }

    return ((params.row.air_yards / params.row.team_air_yards) * 100).toFixed(
        2
    );
}

function getWopr(params: GridCellParams) {
    if (params.row.adot_pct === 0) {
        return 0;
    }

    return (
        (params.row.pass_attempt / params.row.team_pass_attempt) * 1.5 +
        (params.row.air_yards / params.row.team_air_yards) * 0.7
    ).toFixed(2);
}

function getYardsTarget(params: GridCellParams) {
    if (params.row.pass_attempt === 0) {
        return 0;
    }

    return (params.row.passing_yards / params.row.pass_attempt).toFixed(2);
}

function getYardsReception(params: GridCellParams) {
    if (params.row.complete_pass === 0) {
        return 0;
    }

    return (params.row.passing_yards / params.row.complete_pass).toFixed(2);
}

export const teamPersonnelGoupingColumns: GridColDef[] = [
    { headerName: "Team", field: "posteam", flex: 1 },
    {
        headerName: "Total Snaps",
        field: "team_total_snaps",
        width: 75,
        type: "number",
    },
    {
        headerName: "1-1 (3 WR)",
        field: "personnel_11",
        flex: 1,
        valueGetter: getElevenPersonnelSnaps,
        type: "number",
        valueFormatter: (params: GridValueFormatterParams<Number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted}%`;
        },
    },
    {
        headerName: "1-2 (2 WR)",
        field: "personnel_12",
        flex: 1,
        valueGetter: getTwelvePersonnelSnaps,
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
        headerName: "2-1 (2 WR)",
        field: "personnel_21",
        flex: 1,
        valueGetter: getTwentyOnePersonnelSnaps,
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
        headerName: "1-3 (1 WR)",
        field: "personnel_13",
        flex: 1,
        valueGetter: getThirteenPersonnelSnaps,
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
        headerName: "2-2 (1 WR)",
        field: "personnel_22",
        flex: 1,
        valueGetter: getTwentyTwoPersonnelSnaps,
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
        headerName: "1-0 (4 WR)",
        field: "personnel_10",
        flex: 1,
        valueGetter: getTenPersonnelSnaps,
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
        headerName: "2-0 (3 WR)",
        field: "personnel_20",
        flex: 1,
        valueGetter: getTwentyPersonnelSnaps,
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
        headerName: "0-1 (4 WR)",
        field: "personnel_01",
        flex: 1,
        valueGetter: getOnePersonnelSnaps,
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
        headerName: "2-3 (0 WR)",
        field: "personnel_23",
        flex: 1,
        valueGetter: getTwentyThreePersonnelSnaps,
        type: "number",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} % `;
        },
    },
    {
        headerName: "0-0 (5 WR)",
        field: "personnel_00",
        flex: 1,
        valueGetter: getZeroPersonnelSnaps,
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
        headerName: "Jumbo (6+ OL)",
        field: "personnel_jumbo",
        flex: 1,
        valueGetter: getJumboPersonnelSnaps,
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
        headerName: "Other",
        field: "personnel_other",
        flex: 1,
        valueGetter: getOtherPersonnelSnaps,
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
        headerName: "2 RB",
        field: "personnel_2RB",
        flex: 1,
        valueGetter: getTwoRBPersonnelSnaps,
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
        headerName: "2 TE",
        field: "personnel_2TE",
        flex: 1,
        valueGetter: getTwoTEPersonnelSnaps,
        type: "number",
        valueFormatter: (params: GridValueFormatterParams<number>) => {
            if (params.value == null) {
                return "";
            }

            const valueFormatted = Number(params.value).toLocaleString();
            return `${valueFormatted} %`;
        },
    },
];

function getZeroPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_00 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_00 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getOnePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_01 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_01 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTenPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_10 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_10 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getElevenPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_11 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_11 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTwelvePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_12 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_12 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getThirteenPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_13 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_13 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTwentyPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_20 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_20 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTwentyOnePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_21 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_21 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTwentyTwoPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_22 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_22 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTwentyThreePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_23 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_23 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getJumboPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_jumbo === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_jumbo / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTwoRBPersonnelSnaps(params: GridCellParams) {
    if (
        params.row.snap_ct_personnel_20 === undefined &&
        params.row.snap_ct_personnel_21 === undefined &&
        params.row.snap_ct_personnel_22 === undefined &&
        params.row.snap_ct_personnel_23 === undefined &&
        params.row.snap_ct_personnel_32 === undefined
    ) {
        return undefined;
    }

    return (
        (((params.row.snap_ct_personnel_20 || 0) +
            (params.row.snap_ct_personnel_21 || 0) +
            (params.row.snap_ct_personnel_22 || 0) +
            (params.row.snap_ct_personnel_23 || 0) +
            (params.row.snap_ct_personnel_32 || 0)) /
            params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getTwoTEPersonnelSnaps(params: GridCellParams) {
    if (
        params.row.snap_ct_personnel_02 === undefined &&
        params.row.snap_ct_personnel_12 === undefined &&
        params.row.snap_ct_personnel_22 === undefined &&
        params.row.snap_ct_personnel_23 === undefined &&
        params.row.snap_ct_personnel_32 === undefined
    ) {
        return undefined;
    }

    return (
        (((params.row.snap_ct_personnel_02 || 0) +
            (params.row.snap_ct_personnel_12 || 0) +
            (params.row.snap_ct_personnel_22 || 0) +
            (params.row.snap_ct_personnel_23 || 0) +
            (params.row.snap_ct_personnel_32 || 0)) /
            params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

function getOtherPersonnelSnaps(params: GridCellParams) {
    if (
        params.row.snap_ct_personnel_02 === undefined ||
        params.row.snap_ct_personnel_31 === undefined ||
        params.row.snap_ct_personnel_32 === undefined ||
        params.row.snap_ct_personnel_03 === undefined ||
        params.row.snap_ct_personnel_14 === undefined ||
        params.row.snap_ct_personnel_30 === undefined ||
        params.row.snap_ct_personnel_04 === undefined
    ) {
        return 0;
    }

    return (
        ((params.row.snap_ct_personnel_02 +
            params.row.snap_ct_personnel_31 +
            params.row.snap_ct_personnel_32 +
            params.row.snap_ct_personnel_03 +
            params.row.snap_ct_personnel_14 +
            params.row.snap_ct_personnel_30 +
            params.row.snap_ct_personnel_04) /
            params.row.team_total_snaps) *
        100
    ).toFixed(2);
}
