import tableConfig from './tableConfig.json';

export const getTableCapacity = (tableId: string): number => {
  const targetTable = tableConfig.tables.filter((x) => x.id === tableId)[0];

  return targetTable.seats.length;
};
