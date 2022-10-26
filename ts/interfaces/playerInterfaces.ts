export interface IBasicDefensePlayerStats {
    player_id: string;
    game_id: string;
    passes_defended: number;
    interception: number;
    int_return_yards: number;
    int_return_touchdown: number;
    tackles_for_loss: number;
    qb_hits: number;
    fumbles_forced: number;
    solo_tackles: number;
    assist_tackls: number;
    sack: number;
    half_sack: number;
    tackle_with_assist: number;
    game_id_db: string;
    gsis_id: string;
    team_abbr: string;
    position: string;
    week: number;
    week_count: number;
    season: number;
    down: number;
}

export interface IBasicOffensePlayerStats {
    player_id: string;
    position: string;
    week: number;
    team_abbr: string;
    pass_attempt: number;
    completion: number;
    incompletion: number;
    passing_yards: number;
    passing_TD: number;
    interception: number;
    sack: number;
    rush_attempt: number;
    rushing_yards: number;
    rushing_TD: number;
    tackled_for_loss: number;
    fumble: number;
    reception: number;
    target: number;
    receiving_yards: number;
    receiving_TD: number;
    game_id_db: string;
    week_count: number;
    season: number;
    down: number;
}

export interface IPlayerReceivingStats {
    game_id: string;
    posteam: string;
    down: number;
    player_id: string;
    passing_yards: number;
    air_yards: number;
    yards_after_catch: number;
    complete_pass: number;
    pass_attempt: number;
    interception: number;
    pass_touchdown: number;
    team_passing_yards: number;
    team_air_yards: number;
    team_yards_after_catch: number;
    team_complete_pass: number;
    team_pass_attempt: number;
    team_interception: number;
    team_pass_touchdown: number;
    gsis_id: string;
    week: number;
    season: number;
    db_id: string;
}

export interface IPlayerRushingStats {
    player_id: string;
    game_id: string;
    posteam: string;
    key: number;
    down: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    first_down_rush: number;
    red_zone_rush: number;
    red_zone_td: number;
    red_zone_yards: number;
    goal_to_go_rush: number;
    goal_to_go_td: number;
    goal_to_go_yards: number;
    goalline_rush: number;
    goalline_td: number;
    goalline_yards: number;
    team_rush_attempt: number;
    team_rushing_yards: number;
    team_rush_touchdown: number;
    team_first_down_rush: number;
    team_red_zone_rush: number;
    team_red_zone_td: number;
    team_red_zone_yards: number;
    team_goal_to_go_rush: number;
    team_goal_to_go_td: number;
    team_goal_to_go_yards: number;
    team_goalline_rush: number;
    team_goalline_td: number;
    team_goalline_yards: number;
    gsis_id: string;
    week: number;
    season: number;
    db_id: string;
}

export interface IPlayerDefensiveSnapData {
    defteam: string;
    game_id: string;
    down: number;
    player_id: string;
    snap_ct: number;
    rush_snap: number;
    pass_snap: number;
    team_snaps: number;
    team_rushing_plays: number;
    team_passing_plays: number;
    week: number;
    season: number;
    reception: number;
    receiving_touchdown: number;
    carries: number;
    rushing_touchdown: number;
    db_id: string;
    gsis_id: string;
}

export interface IPlayerOffensiveSnapData {
    posteam: string;
    game_id: string;
    down: number;
    player_id: string;
    snap_ct: number;
    rush_snap: number;
    pass_snap: number;
    team_snaps: number;
    team_rushing_plays: number;
    team_passing_plays: number;
    week: number;
    season: number;
    target: number;
    reception: number;
    receiving_touchdown: number;
    carries: number;
    rushing_touchdown: number;
    db_id: string;
    gsis_id: string;
}

export interface IPlayerUsageStats {
    posteam: string;
    game_id: string;
    player_id: string;
    down: number;
    position: string;
    targets: number;
    receptions: number;
    receiving_yards: number;
    air_yards: number;
    yards_after_catch: number;
    receiving_touchdown: number;
    redzone_target: number;
    redzone_catch: number;
    endzone_target: number;
    endzone_catch: number;
    first_down_target: number;
    second_down_target: number;
    third_down_target: number;
    fourth_down_target: number;
    first_down_catch: number;
    second_down_catch: number;
    third_down_catch: number;
    fourth_down_catch: number;
    rush_attempt: number;
    rushing_yards: number;
    rush_touchdown: number;
    stacked_box_rush: number;
    tackled_for_loss: number;
    fumble: number;
    first_down_rush: number;
    second_down_rush: number;
    third_down_rush: number;
    fourth_down_rush: number;
    redzone_rush: number;
    goalline_rush: number;
    redzone_rush_touchdown: number;
    goalline_rush_touchdown: number;
    gsis_id: string;
    db_id: string;
    season: number;
    week: number;
}