import { apiURL } from '../config/app';

interface IPosition {
  table: string;
  seat: number;
}

const joinTable = (userId: string, userName: string, table: string) => {
  return fetch(`${apiURL}/join-table`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, userName, table }),
  });
};

const leaveTable = (userId: string) => {
  return fetch(`${apiURL}/leave`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
};

const getPositions = (userId: string) => {
  return fetch(`${apiURL}/positions?userId=${userId}`);
};

export default {
  joinTable,
  leaveTable,
  getPositions,
};
