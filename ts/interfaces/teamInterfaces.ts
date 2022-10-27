export interface ITeamBasicStats {
    posteam: string;
    week: number;
    pass_attempts: number;
    completions: number;
    pass_touchdown: number;
    interceptions: number;
    sacks: number;
    passing_yards: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    points_for: number;
    points_allowed: number;
    down: number;
    db_id: string;
}

export interface ITeamFormationStats {
    posteam: string;
    game_id?: string;
    down: number;
    snap_ct_personnel_00: number;
    personnel_epa_personnel_00: number;
    snap_ct_personnel_01: number;
    personnel_epa_personnel_01: number;
    snap_ct_personnel_01personnel_wildcat: number;
    personnel_epa_personnel_01personnel_wildcat: number;
    snap_ct_personnel_02: number;
    personnel_epa_personnel_02: number;
    snap_ct_personnel_02personnel_wildcat: number;
    personnel_epa_personnel_02personnel_wildcat: number;
    snap_ct_personnel_10: number;
    personnel_epa_personnel_10: number;
    snap_ct_personnel_11: number;
    personnel_epa_personnel_11: number;
    snap_ct_personnel_11personnel_wildcat: number;
    personnel_epa_personnel_11personnel_wildcat: number;
    snap_ct_personnel_12: number;
    personnel_epa_personnel_12: number;
    snap_ct_personnel_12personnel_wildcat: number;
    personnel_epa_personnel_12personnel_wildcat: number;
    snap_ct_personnel_13: number;
    personnel_epa_personnel_13: number;
    snap_ct_personnel_20: number;
    personnel_epa_personnel_20: number;
    snap_ct_personnel_20personnel_wildcat: number;
    personnel_epa_personnel_20personnel_wildcat: number;
    snap_ct_personnel_21: number;
    personnel_epa_personnel_21: number;
    snap_ct_personnel_21personnel_wildcat: number;
    personnel_epa_personnel_21personnel_wildcat: number;
    snap_ct_personnel_22: number;
    personnel_epa_personnel_22: number;
    snap_ct_personnel_22personnel_wildcat: number;
    personnel_epa_personnel_22personnel_wildcat: number;
    snap_ct_personnel_23: number;
    personnel_epa_personnel_23: number;
    snap_ct_personnel_23personnel_wildcat: number;
    personnel_epa_personnel_23personnel_wildcat: number;
    snap_ct_personnel_jumbo: number;
    personnel_epa_personnel_jumbo: number;
    snap_ct_personnel_wildcat: number;
    personnel_epa_personnel_wildcat: number;
    team_total_snaps: number;
    team_epa: number;
    db_id: string;
    season: number;
    week: number;
    week_count: number;
}

export interface ITeamGameLogs {
    game_id: string;
    posteam: string;
    defteam: string;
    posteam_score: number;
    defteam_score: number;
    yards_gained: number;
    turnovers: number;
    fumbles: number;
    fumbles_lost: number;
    completed_passes: number;
    incomplete_passes: number;
    pass_attempts: number;
    receiving_yards: number;
    passing_touchdowns: number;
    interceptions: number;
    sacks: number;
    rush_attempts: number;
    rushing_yards: number;
    rushing_touchdown: number;
    extra_points_made: number;
    extra_point_attempts: number;
    field_goals_made: number;
    field_goals_attempted: number;
    time_of_possession: string;
    penalties: number;
    penalty_yards: number;
    db_id: string;
    season: number;
    week: number;
}

export interface ITeamInformation {
    team_abbr: string;
    team_name: string;
    team_id: number;
    team_nick: string;
    team_conf: string;
    team_division: string;
    wins: number;
    losses: number;
    ties: number;
    standing: string;
    team_color: string;
    team_color2: string;
    team_color3: string;
    team_color4: string;
    team_logo_wikipedia: string;
    team_logo_espn: string;
    team_wordmark: string;
    team_conference_logo: string;
    team_league_logo: string;
    team_logo_squared: string;
}

export interface ITeamStatsByDown {
    game_id: string;
    posteam: string;
    down: number;
    special: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    complete_pass: number;
    pass_attempt: number;
    passing_yards: number;
    pass_touchdown: number;
    interception: number;
    sack: number;
    season: number;
    week: number;
    db_id: string;
}

export interface ITeamConversionRates {
    posteam: string;
    game_id: string;
    play_type: string;
    third_down_converted: number;
    third_down_failed: number;
    fourth_down_converted: number;
    fourth_down_failed: number;
    third_down_attempt: number;
    fourth_down_attempt: number;
    week: number;
    season: number;
    db_id: string;
}

export interface ITeamPersonnelStats {
    game_id?: string;
    posteam: string;
    offense_grouping: string;
    snap_ct: number;
    passing_snap: number;
    rushing_snap: number;
    passing_yards: number;
    pass_touchdown: number;
    rushing_yards: number;
    rush_touchdown: number;
    season: number;
    week: number;
    week_count: number;
    db_id: string;
    total_game_snaps: number;
    down: number;
}
