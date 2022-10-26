// shorthand expression to represent weeks of the regular season
export const regSeasonWeeks = Array.from(Array(19).keys());

// handle bigInt data coming from Prisma ORM
export const parseBigInt = (dataArray: Array<any>) => {
    return JSON.parse(
        JSON.stringify(dataArray, (_, v) =>
            typeof v === "bigint" ? v.toString() : v
        )
    );
};
