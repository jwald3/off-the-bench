import { GridCellParams } from "@mui/x-data-grid";

// teamStatColumns Functions

export function getCompletionPct(params: GridCellParams) {
    return (
        ((params.row.completions || 0) / params.row.pass_attempts) *
        100
    ).toFixed(2);
}

export function getYPC(params: GridCellParams) {
    return `${(
        (params.row.rushing_yards || 0) / params.row.rush_attempt
    ).toFixed(2)}`;
}

// teamPersonnelGroupingColumns Functions

export function getPersonnelPct(params: GridCellParams) {
    return (
        ((params.row.snap_ct || 0) / params.row.total_game_snaps) *
        100
    ).toFixed(2);
}

// teamGameLogColumns Functions

export function getGameResult(params: GridCellParams) {
    return params.row.posteam_score > params.row.defteam_score
        ? "W"
        : params.row.posteam_score < params.row.defteam_score
        ? "L"
        : "T";
}

// teamStatLog Functions

export function getTotalYards(params: GridCellParams) {
    return params.row.rushing_yards + params.row.receiving_yards;
}

export function getTotalPlays(params: GridCellParams) {
    return (
        params.row.rush_attempts + params.row.pass_attempts + params.row.sacks
    );
}

export function getTotalYardsPerPlay(params: GridCellParams) {
    return (
        (params.row.rushing_yards + params.row.receiving_yards) /
        (params.row.rush_attempts + params.row.pass_attempts + params.row.sacks)
    ).toFixed(1);
}

export function getPassYdsPerAtt(params: GridCellParams) {
    return (params.row.receiving_yards / params.row.pass_attempts).toFixed(1);
}

export function getRushYdsPerAtt(params: GridCellParams) {
    return (params.row.rushing_yards / params.row.rush_attempts).toFixed(1);
}

// conversionRateStatCols Functions

export function getThirdDownConv(params: GridCellParams) {
    return (
        (params.row.third_down_converted / params.row.third_down_attempt) *
        100
    ).toFixed(1);
}

export function getFourthDownConv(params: GridCellParams) {
    if (params.row.fourth_down_attempt === 0) {
        return 0;
    }

    return (
        (params.row.fourth_down_converted / params.row.fourth_down_attempt) *
        100
    ).toFixed(1);
}

// teamPersonnelGoupingColumns Functions

export function getZeroPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_00 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_00 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getOnePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_01 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_01 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getTenPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_10 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_10 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getElevenPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_11 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_11 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getTwelvePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_12 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_12 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getThirteenPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_13 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_13 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getTwentyPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_20 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_20 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getTwentyOnePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_21 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_21 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getTwentyTwoPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_22 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_22 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getTwentyThreePersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_23 === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_23 / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getJumboPersonnelSnaps(params: GridCellParams) {
    if (params.row.snap_ct_personnel_jumbo === undefined) {
        return undefined;
    }

    return (
        (params.row.snap_ct_personnel_jumbo / params.row.team_total_snaps) *
        100
    ).toFixed(2);
}

export function getTwoRBPersonnelSnaps(params: GridCellParams) {
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

export function getTwoTEPersonnelSnaps(params: GridCellParams) {
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

export function getOtherPersonnelSnaps(params: GridCellParams) {
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
