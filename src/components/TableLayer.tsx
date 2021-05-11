import React from 'react';

interface ITableLayerProps {
  data: ITableInfo[] | undefined;
  onTableClick?: (tableId: string) => void;
}
const TableLayer = ({ data, onTableClick }: ITableLayerProps) => {
  return (
    <>
      {data &&
        data.map((table: ITableInfo) => {
          return (
            <div
              key={table.id}
              className="table"
              style={{
                position: 'absolute',
                left: table.x,
                top: table.y,
                width: table.width,
                height: table.height,
              }}
              onClick={() => (onTableClick ? onTableClick(table.id) : null)}
            />
          );
        })}
    </>
  );
};

export default TableLayer;
