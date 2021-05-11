import tableConfig from "./config/tableConfig.json";

// Take table id and seat index and return position in ILocationInfo
export const getSeatInfo = (table: string, seatIdx: number): ISeatInfo => {
  const tables = tableConfig.tables;
  const targetTable = tables.filter((x) => x.id === table)[0];

  return {
    x: targetTable.x + targetTable.seats[seatIdx].x,
    y: targetTable.y + targetTable.seats[seatIdx].y,
  };
};

// get all tables
export const getTables = (): ITableInfo[] => {
  return tableConfig.tables;
};
