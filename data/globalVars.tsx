// shorthand expression to represent weeks of the regular season (minus 0)
export const regSeasonWeeks = Array.from(Array(19).keys()).slice(1);

// handle bigInt data coming from Prisma ORM
export const parseBigInt = (dataArray: Array<any>) => {
    return JSON.parse(
        JSON.stringify(dataArray, (_, v) =>
            typeof v === "bigint" ? Number.parseInt(v.toString()) : v
        )
    );
};

interface IBasicPlayerStatsShell {
    player_id: string;
    position: string;
    game_id_db: string;
    team_abbr: string;
    week?: number;
    gsis_id?: string;
}

interface IUsagePlayerStatsShell {
    player_id: string;
    position: string;
    db_id: string;
    gsis_id?: string;
    posteam: string;
}

interface IPersonnelStatsShell {
    offense_grouping: string;
    db_id: string;
    posteam: string;
}

export const aggregateStats = <K extends string>(
    dataframe: (Record<K, number> & IBasicPlayerStatsShell)[],
    ...keys: K[]
) => {
    let teamsMap = new Map<
        string,
        Record<K, number> & IBasicPlayerStatsShell
    >();
    for (let dataframeObj of dataframe) {
        const currentObj = teamsMap.get(dataframeObj.player_id);
        if (currentObj) {
            let newObjStatic = {
                player_id: dataframeObj.player_id,
                game_id_db: currentObj.game_id_db,
                position: currentObj.position,
                team_abbr: currentObj.team_abbr,
            };
            const newObjDynamic = {} as Record<K, number>;
            keys.forEach(
                (k) => (newObjDynamic[k] = currentObj[k] + dataframeObj[k])
            );
            teamsMap.set(currentObj.player_id, {
                ...newObjStatic,
                ...newObjDynamic,
            });
        } else {
            teamsMap.set(dataframeObj.player_id, {
                ...dataframeObj,
            });
        }
    }
    return Array.from(teamsMap.values());
};

export const aggregateUsageStats = <K extends string>(
    dataframe: (Record<K, number> & IUsagePlayerStatsShell)[],
    ...keys: K[]
) => {
    let teamsMap = new Map<
        string,
        Record<K, number> & IUsagePlayerStatsShell
    >();
    for (let dataframeObj of dataframe) {
        const currentObj = teamsMap.get(dataframeObj.player_id);
        if (currentObj) {
            let newObjStatic = {
                player_id: dataframeObj.player_id,
                db_id: currentObj.db_id,
                position: currentObj.position,
                posteam: currentObj.posteam,
            };
            const newObjDynamic = {} as Record<K, number>;
            keys.forEach(
                (k) => (newObjDynamic[k] = currentObj[k] + dataframeObj[k])
            );
            teamsMap.set(currentObj.player_id, {
                ...newObjStatic,
                ...newObjDynamic,
            });
        } else {
            teamsMap.set(dataframeObj.player_id, {
                ...dataframeObj,
            });
        }
    }
    return Array.from(teamsMap.values());
};

export const aggregatePersonnelStats = <K extends string>(
    dataframe: (Record<K, number> & IPersonnelStatsShell)[],
    ...keys: K[]
) => {
    let teamsMap = new Map<string, Record<K, number> & IPersonnelStatsShell>();
    for (let dataframeObj of dataframe) {
        const currentObj = teamsMap.get(dataframeObj.offense_grouping);
        if (currentObj) {
            let newObjStatic = {
                offense_grouping: dataframeObj.offense_grouping,
                db_id: currentObj.db_id,
                posteam: currentObj.posteam,
            };
            const newObjDynamic = {} as Record<K, number>;
            keys.forEach(
                (k) => (newObjDynamic[k] = currentObj[k] + dataframeObj[k])
            );
            teamsMap.set(currentObj.offense_grouping, {
                ...newObjStatic,
                ...newObjDynamic,
            });
        } else {
            teamsMap.set(dataframeObj.offense_grouping, {
                ...dataframeObj,
            });
        }
    }
    return Array.from(teamsMap.values());
};
