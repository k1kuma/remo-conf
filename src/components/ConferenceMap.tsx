import React from 'react';

interface IConferenceMapProps {
  children: JSX.Element | JSX.Element[];
}
const ConferenceMap = ({ children }: IConferenceMapProps) => {
  return <div style={{ width: '100vw', height: '100vh' }}>{children}</div>;
};

export default ConferenceMap;
