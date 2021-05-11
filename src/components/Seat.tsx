import React, { CSSProperties } from 'react';

interface ISeatProps {
  seatInfo?: ISeatInfo;
  children?: JSX.Element | JSX.Element[] | string | undefined;
}
const Seat = ({ seatInfo, children }: ISeatProps) => {
  const style: CSSProperties = {
    position: 'absolute',
    border: '3px solid #000',
    height: '45px',
    width: '45px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#fff',
  };
  const loc = {
    left: seatInfo ? seatInfo.x : 0,
    top: seatInfo ? seatInfo.y : 0,
  };
  return <div style={{ ...loc, ...style }}>{children}</div>;
};

export default Seat;
