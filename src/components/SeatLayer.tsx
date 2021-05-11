import React from 'react';

interface ISeatLayerProps {
  mapInfo: IMapInfo | undefined;
  children: JSX.Element | JSX.Element[] | undefined;
}
const SeatLayer = ({ mapInfo, children }: ISeatLayerProps) => {
  return <div style={{ ...mapInfo, position: 'absolute', pointerEvents:'none' }}>{children}</div>;
};

export default SeatLayer;
