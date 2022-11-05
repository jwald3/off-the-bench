import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";
import {
    getAdot,
    getAirYdsPct,
    getCarryEpa,
    getCarryLoad,
    getCarryPercent,
    getCarryShare,
    getCatchPct,
    getComboTackles,
    getGoalLineShare,
    getPassSnapPct,
    getPlayerCompletionPct,
    getRacr,
    getRedZoneShare,
    getRushSnapPct,
    getRushYardsPercent,
    getRushYdsPerCarry,
    getRushYPC,
    getStackedBoxPct,
    getTargetEpa,
    getTargetPct,
    getTargetShare,
    getTgtPct,
    getTotalSacks,
    getTotalSnapPct,
    getWopr,
    getYardsReception,
    getYardsTarget,
} from "./tableAssets/columnFunctions/playerStatColFunctions";
import {
    getAverageEpa,
    getAveragePassEpa,
    getAverageRushEpa,
    getCompletionPct,
    getElevenPersonnelSnaps,
    getFourthDownConv,
    getGameResult,
    getJumboPersonnelSnaps,
    getOnePersonnelSnaps,
    getOtherPersonnelSnaps,
    getPassYdsPerAtt,
    getPersonnelPct,
    getRushYdsPerAtt,
    getTenPersonnelSnaps,
    getThirdDownConv,
    getThirteenPersonnelSnaps,
    getTotalPlays,
    getTotalYards,
    getTotalYardsPerPlay,
    getTwelvePersonnelSnaps,
    getTwentyOnePersonnelSnaps,
    getTwentyPersonnelSnaps,
    getTwentyThreePersonnelSnaps,
    getTwentyTwoPersonnelSnaps,
    getTwoRBPersonnelSnaps,
    getTwoTEPersonnelSnaps,
    getYPC,
    getZeroPersonnelSnaps,
} from "./tableAssets/teamStatColFunctions";

export const playerDefenseColumns: GridColDef[] = [
    {
        headerName: "Player",
        headerClassName: "grid-header",
        field: "player_id",
        flex: 1,
        minWidth: 150,
        type: "string",
    },
    {
        headerName: "Position",
        headerClassName: "grid-header",
        field: "position",
        flex: 1,
        minWidth: 100,
        type: "string",
    },
    {
        headerName: "Team",
        headerClassName: "grid-header",
        field: "team_abbr",
        flex: 1,
        minWidth: 75,
        type: "string",
    },
    {
        headerName: "INTs",
        headerClassName: "grid-header",
        field: "interception",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "INT Yards",
        headerClassName: "grid-header",
        field: "int_return_yards",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "INT TDs",
        field: "int_return_touchdown",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "PD",
        field: "passes_defended",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "FF",
        field: "fumbles_forced",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Sacks",
        field: "sack",
        type: "number",
        flex: 1,
        minWidth: 75,
        valueGetter: getTotalSacks,
    },
    {
        headerName: "Comb Tackles",
        field: "comb_tackles",
        flex: 1,
        minWidth: 100,
        valueGetter: getComboTackles,
        type: "number",
    },
    {
        headerName: "Solo Tackles",
        field: "solo_tackles",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "Ast Tackles",
        field: "assist_tackls",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "TFL",
        field: "tackles_for_loss",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "QB Hits",
        field: "qb_hits",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
];

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
    { headerName: "Team", field: "posteam", flex: 0.75, minWidth: 50 },
    {
        headerName: "PF",
        field: "points_for",
        flex: 0.75,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "PA",
        field: "points_allowed",
        flex: 0.75,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "COMP",
        field: "completions",
        flex: 1,
        minWidth: 75,
        type: "number",
    },

    {
        headerName: "ATTs",
        field: "pass_attempts",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "COMP %",
        field: "compPercent",
        flex: 1,
        minWidth: 100,
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
        flex: 0.75,
        minWidth: 75,
        type: "number",
    },
    { headerName: "Sacks", field: "sacks", width: 75, type: "number" },
    {
        headerName: "Pass Yards",
        field: "passing_yards",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "Carries",
        field: "rush_attempt",
        flex: 0.75,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Rush Yards",
        field: "rushing_yards",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "Yards/Carry",
        field: "yardsPerCarry",
        flex: 1,
        minWidth: 100,
        valueGetter: getYPC,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rush_touchdown",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
];

export const playerUsageColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.5,
        minWidth: 150,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 1,
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "Target Share",
        field: "compPercent",
        flex: 1,
        minWidth: 100,
        valueGetter: getTargetPct,
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
        headerName: "TGT",
        field: "target",
        flex: 1,
        minWidth: 60,
        type: "number",
    },
    {
        headerName: "REC",
        field: "reception",
        flex: 1,
        minWidth: 60,
        type: "number",
    },
    {
        headerName: "Rec. Yds",
        field: "passing_yards",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Air Yds",
        field: "air_yards",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "YAC",
        field: "yards_after_catch",
        flex: 1,
        minWidth: 60,
        type: "number",
    },
    {
        headerName: "Rec. TDs",
        field: "receiving_touchdown",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "RZ TGT",
        field: "redzone_target",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "RZ REC",
        field: "redzone_reception",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "EZ TGT",
        field: "endzone_target",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "EZ REC",
        field: "endzone_reception",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Avg. EPA",
        field: "receiving_epa",
        flex: 1,
        minWidth: 100,
        valueGetter: getTargetEpa,
        type: "number",
    },
];

export const playerRushUsageColumns: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.5,
        minWidth: 150,
        type: "string",
    },
    {
        headerName: "Position",
        field: "position",
        flex: 1,
        minWidth: 75,
        type: "string",
    },
    {
        headerName: "Rush Share",
        field: "rushPct",
        flex: 1,
        minWidth: 100,
        valueGetter: getCarryLoad,
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
        headerName: "Rushes",
        field: "rush",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Rush Yards",
        field: "rushing_yards",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "YPC",
        field: "yardsPerCarry",
        flex: 1,
        minWidth: 75,
        valueGetter: getRushYPC,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rush_touchdown",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Stacked Box Rush",
        field: "stacked_box_rush",
        flex: 1,
        minWidth: 125,
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
        headerName: "TFL",
        field: "tackled_for_loss",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Fumble",
        field: "fumble",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "RZ Rush",
        field: "redzone_carry",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "RZ TD",
        field: "redzone_rush_td",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "EZ Rush",
        field: "goalline_carry",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "EZ TD",
        field: "goalline_rush_td",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Avg. EPA",
        field: "rushing_epa",
        flex: 1,
        minWidth: 100,
        valueGetter: getCarryEpa,
        type: "number",
    },
];

export const teamPersonnelGroupingColumns: GridColDef[] = [
    {
        headerName: "Personnel",
        field: "offense_grouping",
        flex: 1.5,
        minWidth: 75,
        type: "string",
    },
    {
        headerName: "Total Snaps",
        field: "snap_ct",
        flex: 1,
        minWidth: 110,
        type: "number",
    },
    {
        headerName: "Personnel %",
        field: "personnel_pct",
        flex: 1,
        minWidth: 110,
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
        headerName: "Avg EPA",
        field: "epa",
        flex: 1,
        minWidth: 75,
        type: "number",
        valueGetter: getAverageEpa,
    },
    {
        headerName: "Pass Snaps",
        field: "passing_snap",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Pass Yards",
        field: "passing_yards",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Pass TDs",
        field: "pass_touchdown",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Avg Pass EPA",
        field: "pass_epa",
        flex: 1,
        minWidth: 100,
        type: "number",
        valueGetter: getAveragePassEpa,
    },
    {
        headerName: "Rush Snaps",
        field: "rushing_snap",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Rush Yards",
        field: "rushing_yards",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rush_touchdown",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Avg Rush EPA",
        field: "rush_epa",
        flex: 1,
        minWidth: 100,
        type: "number",
        valueGetter: getAverageRushEpa,
    },
];

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
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "OPP Score",
        field: "defteam_score",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Result",
        field: "result",
        type: "string",
        flex: 1,
        minWidth: 75,
        valueGetter: getGameResult,
    },
    {
        headerName: "Tot. Yds",
        field: "yards_gained",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "TOV",
        field: "turnovers",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "FUM",
        field: "fumbles",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "FUM Lost",
        field: "fumbles_lost",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completed_passes",
        flex: 1,
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rushing_touchdown",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "XPM",
        field: "extra_points_made",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "XPA",
        field: "extra_point_attempts",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "FGM",
        field: "field_goals_made",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "FGA",
        field: "field_goals_attempted",
        flex: 1,
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "TOP",
        field: "time_of_possession",
        flex: 1,
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "PEN",
        field: "penalties",
        flex: 1,
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "PEN Yds",
        field: "penalty_yards",
        flex: 1,
        minWidth: 80,
        type: "string",
    },
];

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
        minWidth: 100,
        valueGetter: getTotalPlays,
        type: "number",
    },
    {
        headerName: "Total Y/P",
        field: "totalYPP",
        flex: 1,
        minWidth: 100,
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
        headerName: "FUM",
        field: "fumbles",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "FUM Lost",
        field: "fumbles_lost",
        flex: 1,
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Completions",
        field: "completed_passes",
        flex: 1,
        minWidth: 100,
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
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "Passing Y/A",
        field: "passYPP",
        flex: 1,
        minWidth: 100,
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

export const conversionRateStatCols: GridColDef[] = [
    {
        headerName: "Play Type",
        field: "play_type",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "3D Converted",
        field: "third_down_converted",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "3D Attemped",
        field: "third_down_attempt",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "3D Conversion %",
        field: "thirdDownConvPct",
        flex: 1,
        minWidth: 100,
        valueGetter: getThirdDownConv,
        type: "number",
    },

    {
        headerName: "4D Converted",
        field: "fourth_down_converted",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "4D Attemped",
        field: "fourth_down_attempt",
        flex: 1,
        minWidth: 100,
        type: "number",
    },
    {
        headerName: "4D Conversion %",
        field: "fourthDownConvPct",
        flex: 1,
        minWidth: 100,
        valueGetter: getFourthDownConv,
        type: "number",
    },
];

export const playerSnapCols: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1.75,
        minWidth: 175,
        type: "string",
    },
    {
        headerName: "Total Snaps",
        field: "snap_ct",
        flex: 1,
        minWidth: 100,
        type: "string",
    },
    {
        headerName: "Snap %",
        field: "tot_snap_pct",
        flex: 1,
        minWidth: 80,
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
        minWidth: 100,
        type: "string",
    },
    {
        headerName: "Rush Snap %",
        field: "rush_snap_pct",
        flex: 1,
        minWidth: 100,
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
        minWidth: 75,
        type: "number",
    },
    {
        headerName: "Carry Share",
        field: "carry_share",
        flex: 1,
        minWidth: 100,
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
        minWidth: 80,
        field: "rushing_touchdown",
        type: "number",
    },
    {
        headerName: "Pass Snaps",
        flex: 1,
        minWidth: 80,
        field: "pass_snap",
        type: "number",
    },
    {
        headerName: "Pass %",
        field: "pass_snap_pct",
        valueGetter: getPassSnapPct,
        flex: 1,
        minWidth: 80,
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
        headerName: "REC",
        field: "reception",
        flex: 1,
        minWidth: 65,
        type: "number",
    },
    {
        headerName: "TGT",
        field: "target",
        flex: 1,
        minWidth: 65,
        type: "number",
    },
    {
        headerName: "Target Share",
        field: "target_share",
        valueGetter: getTargetShare,
        flex: 1,
        minWidth: 100,
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
        headerName: "REC TD",
        flex: 1,
        minWidth: 80,
        field: "receiving_touchdown",
        type: "number",
    },
];

export const playerDefenseSnapCols: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        flex: 1,
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "Total Snaps",
        field: "snap_ct",
        flex: 1,
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "Snap %",
        field: "tot_snap_pct",
        flex: 1,
        minWidth: 80,
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
        minWidth: 80,
        type: "string",
    },
    {
        headerName: "Rush Snap %",
        field: "rush_snap_pct",
        flex: 1,
        minWidth: 80,
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
        minWidth: 80,
        type: "number",
    },
    {
        headerName: "Pass %",
        field: "pass_snap_pct",
        flex: 1,
        minWidth: 80,
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
        flex: 1,
        minWidth: 175,
    },
    {
        headerName: "Team",
        field: "posteam",
        type: "string",
        flex: 1,
        minWidth: 75,
    },
    {
        headerName: "REC",
        field: "complete_pass",
        type: "number",
        flex: 1,
        minWidth: 75,
    },
    {
        headerName: "TGT",
        field: "pass_attempt",
        type: "number",
        flex: 1,
        minWidth: 75,
    },
    {
        headerName: "CATCH %",
        field: "catch_pct",
        flex: 1,
        minWidth: 100,
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
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "YDS/REC",
        field: "yards_per_rec",
        flex: 1,
        minWidth: 100,
        valueGetter: getYardsReception,
        type: "number",
    },
    {
        headerName: "YDS/TGT",
        field: "yards_per_tgt",
        flex: 1,
        minWidth: 100,
        valueGetter: getYardsTarget,
        type: "number",
    },
    {
        headerName: "REC TDS",
        field: "pass_touchdown",
        type: "number",
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "TGT SHARE",
        field: "tgr_pct",
        flex: 1,
        minWidth: 100,
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
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "aDOT",
        field: "adot",
        flex: 1,
        minWidth: 100,
        valueGetter: getAdot,
        type: "number",
    },
    {
        headerName: "AIR YDS %",
        field: "adot_pct",
        flex: 1,
        minWidth: 100,
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
        minWidth: 100,
        valueGetter: getRacr,
        type: "number",
    },
    {
        headerName: "WOPR",
        field: "wopr",
        flex: 1,
        minWidth: 100,
        valueGetter: getWopr,
        type: "number",
    },
];

export const teamPersonnelGoupingColumns: GridColDef[] = [
    { headerName: "Team", field: "posteam", flex: 1, minWidth: 80 },
    {
        headerName: "Total Snaps",
        field: "team_total_snaps",
        width: 100,
        type: "number",
    },
    {
        headerName: "1-1 (3 WR)",
        field: "personnel_11",
        flex: 1,
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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
        minWidth: 100,
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

export const playerAdvRushCols: GridColDef[] = [
    {
        headerName: "Player",
        field: "player_id",
        type: "string",
        flex: 1,
        minWidth: 175,
    },
    {
        headerName: "Team",
        field: "posteam",
        type: "string",
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "Carries",
        field: "rush_attempt",
        type: "number",
        flex: 1,
        minWidth: 75,
    },
    {
        headerName: "% Carries",
        field: "carry_share",
        flex: 1,
        minWidth: 100,
        valueGetter: getCarryPercent,
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
        headerName: "Rush Yds",
        field: "rushing_yards",
        type: "number",
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "% Rush Yds",
        field: "yard_share",
        flex: 1,
        minWidth: 100,
        valueGetter: getRushYardsPercent,
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
        headerName: "YPC",
        field: "yards_per_carry",
        flex: 1,
        minWidth: 100,
        valueGetter: getRushYdsPerCarry,
        type: "number",
    },
    {
        headerName: "Rush TDs",
        field: "rush_touchdown",
        type: "number",
        flex: 1,
        minWidth: 75,
    },
    {
        headerName: "Rush 1D",
        field: "first_down_rush",
        type: "number",
        flex: 1,
        minWidth: 75,
    },
    {
        headerName: "RZ Carries",
        field: "red_zone_rush",
        type: "number",
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "RZ TD",
        field: "red_zone_td",
        type: "number",
        flex: 1,
        minWidth: 75,
    },
    {
        headerName: "RZ Share",
        field: "rz_share",
        flex: 1,
        minWidth: 100,
        valueGetter: getRedZoneShare,
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
        headerName: "GL Carries",
        field: "goalline_rush",
        type: "number",
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "GL TD",
        field: "goalline_td",
        type: "number",
        flex: 1,
        minWidth: 100,
    },
    {
        headerName: "GL Share",
        field: "gl_share",
        flex: 1,
        minWidth: 100,
        valueGetter: getGoalLineShare,
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
