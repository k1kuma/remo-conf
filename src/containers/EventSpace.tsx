import React, { useState, useEffect, useCallback, useRef } from 'react';
import ConferenceMap from '../components/ConferenceMap';
import PanZoom from 'react-easy-panzoom';
import MapLayer from '../components/MapLayer';
import SeatLayer from '../components/SeatLayer';
import Seat from '../components/Seat';
import { getSeatInfo, getTables } from '../helper';
import EventSpaceService from '../services/EventSpaceService';
import TableLayer from '../components/TableLayer';
import './EventSpace.css';
import md5 from 'md5';

const EventSpace = () => {
  const [mapInfo, setMapInfo] = useState<IMapInfo>();
  const [user, setUser] = useState<{ id: string; name: string }>();
  const [userPositions, setUserPositions] = useState<any[]>([]);
  const intervalRef = useRef<any>();
  const tables = getTables();

  const handleTableClick = useCallback(
    async (tableId: string) => {
      if (user) {
        const resp = await EventSpaceService.joinTable(
          user.id,
          user.name,
          tableId,
        );
        const result = await resp.json();

        if (!result.isSuccess) {
          alert(result.message);
        }
      }
    },
    [user],
  );

  useEffect(() => {
    const userId = md5(window.navigator.userAgent);
    const name = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];

    setUser({
      id: userId,
      name,
    });

    intervalRef.current = setInterval(async () => {
      const resp = await EventSpaceService.getPositions(userId);
      const result = await resp.json();

      if (result.isSuccess) {
        setUserPositions(result.positions);
      }
    }, 800);

    window.addEventListener("beforeunload", function (e) {
      const resp = EventSpaceService.leaveTable(userId);
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className='event-space'>
      <PanZoom autoCenter={true} disableDoubleClickZoom={true}>
        <ConferenceMap>
          <MapLayer setMapInfo={setMapInfo} />
          <TableLayer data={tables} onTableClick={handleTableClick} />
          <SeatLayer mapInfo={mapInfo}>
            {userPositions.map((o: any) => (
              <Seat key={o.userId} seatInfo={getSeatInfo(o.table, o.seat)}>
                {o.userName}
              </Seat>
            ))}
          </SeatLayer>
        </ConferenceMap>
      </PanZoom>
    </div>
  );
};

export default EventSpace;
