import { GridCellParams } from "@mui/x-data-grid";

// playerDefenseColumns Functions

export function getTotalSacks(params: GridCellParams) {
    return params.row.sack + params.row.half_sack * 0.5;
}

export function getComboTackles(params: GridCellParams) {
    return (
        params.row.solo_tackles +
        params.row.assist_tackls +
        params.row.tackle_with_assist
    );
}

// playerOffenseColumns Functions

export function getPlayerCompletionPct(params: GridCellParams) {
    if (params.row.pass_attempt == 0) {
        return 0;
    }

    return (
        ((params.row.completion || 0) / params.row.pass_attempt) *
        100
    ).toFixed(2);
}

// playerUsageColumns

export function getTargetEpa(params: GridCellParams) {
    return (params.row.receiving_epa / params.row.target_metric).toFixed(3);
}

export function getTargetPct(params: GridCellParams) {
    return (
        (params.row.target_metric / params.row.total_team_target) *
        100
    ).toFixed(1);
}

// playerRushUsageColumns Functions

export function getRushYPC(params: GridCellParams) {
    return (params.row.rushing_yards / params.row.rush).toFixed(2);
}

export function getCarryLoad(params: GridCellParams) {
    return (
        (params.row.rush_metric / params.row.total_team_rushes) *
        100
    ).toFixed(2);
}

export function getStackedBoxPct(params: GridCellParams) {
    return (
        ((params.row.stacked_box_rush || 0) / params.row.rush) *
        100
    ).toFixed(2);
}

export function getCarryEpa(params: GridCellParams) {
    return (params.row.rush_epa / params.row.rush).toFixed(3);
}

// playerSnapCols Functions

export function getTotalSnapPct(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return ((params.row.snap_ct / params.row.team_total_snaps) * 100).toFixed(
        1
    );
}

export function getRushSnapPct(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return ((params.row.rush_snap / params.row.team_rush_snaps) * 100).toFixed(
        1
    );
}

export function getPassSnapPct(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return ((params.row.pass_snap / params.row.team_pass_snaps) * 100).toFixed(
        1
    );
}

export function getTargetShare(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return (
        (params.row.player_targeted / params.row.team_total_targets) *
        100
    ).toFixed(1);
}

export function getCarryShare(params: GridCellParams) {
    if (params.row.snap_ct === 0) {
        return 0;
    }

    return (
        (params.row.player_rushing / params.row.team_total_carries) *
        100
    ).toFixed(1);
}

// playerAdvRecCols Functions

export function getCatchPct(params: GridCellParams) {
    if (params.row.pass_attempt === 0) {
        return 0;
    }

    return ((params.row.complete_pass / params.row.pass_attempt) * 100).toFixed(
        1
    );
}

export function getTgtPct(params: GridCellParams) {
    if (params.row.team_pass_attempt === 0) {
        return 0;
    }

    return (
        (params.row.pass_attempt / params.row.team_pass_attempt) *
        100
    ).toFixed(1);
}

export function getAdot(params: GridCellParams) {
    if (params.row.pass_attempt === 0) {
        return 0;
    }

    return (params.row.air_yards / params.row.pass_attempt).toFixed(1);
}

export function getRacr(params: GridCellParams) {
    if (params.row.air_yards === 0) {
        return 0;
    }

    return (params.row.passing_yards / params.row.air_yards).toFixed(2);
}

export function getAirYdsPct(params: GridCellParams) {
    if (params.row.team_air_yards === 0) {
        return 0;
    }

    return ((params.row.air_yards / params.row.team_air_yards) * 100).toFixed(
        2
    );
}

export function getWopr(params: GridCellParams) {
    if (params.row.adot_pct === 0) {
        return 0;
    }

    return (
        (params.row.pass_attempt / params.row.team_pass_attempt) * 1.5 +
        (params.row.air_yards / params.row.team_air_yards) * 0.7
    ).toFixed(2);
}

export function getYardsTarget(params: GridCellParams) {
    if (params.row.pass_attempt === 0) {
        return 0;
    }

    return (params.row.passing_yards / params.row.pass_attempt).toFixed(2);
}

export function getYardsReception(params: GridCellParams) {
    if (params.row.complete_pass === 0) {
        return 0;
    }

    return (params.row.passing_yards / params.row.complete_pass).toFixed(2);
}

// playerAdvRushCols Functions

export function getCarryPercent(params: GridCellParams) {
    if (params.row.rush_attempt === undefined) {
        return 0;
    }

    return (
        (params.row.rush_attempt / params.row.team_rush_attempt) *
        100
    ).toFixed(2);
}

export function getRushYardsPercent(params: GridCellParams) {
    if (params.row.rushing_yards === undefined) {
        return 0;
    }

    return (
        (params.row.rushing_yards / params.row.team_rushing_yards) *
        100
    ).toFixed(2);
}

export function getRushYdsPerCarry(params: GridCellParams) {
    if (
        params.row.rush_attempt === undefined ||
        params.row.rush_attempt === 0
    ) {
        return 0;
    }

    return (params.row.rushing_yards / params.row.rush_attempt).toFixed(2);
}

export function getRedZoneShare(params: GridCellParams) {
    if (
        params.row.red_zone_rush === undefined ||
        params.row.red_zone_rush === 0
    ) {
        return 0;
    }

    return (
        (params.row.red_zone_rush / params.row.team_red_zone_rush) *
        100
    ).toFixed(2);
}

export function getGoalLineShare(params: GridCellParams) {
    if (
        params.row.goalline_rush === undefined ||
        params.row.goalline_rush === 0
    ) {
        return 0;
    }

    return (
        (params.row.goalline_rush / params.row.team_goalline_rush) *
        100
    ).toFixed(2);
}
