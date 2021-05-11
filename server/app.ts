import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { getTableCapacity } from "./helper";

interface IUserPosition {
  userId: string;
  userName: string;
  table: string;
  seat: number;
  lastSeen: number;
}

const app = express();

app.use(cors());
app.use(bodyParser());

let positions: IUserPosition[] = [];

const getAvailableSeats = (table: string) => {
  const tableData = positions.filter((x) => table === table);
  const occupiedSeats = tableData.map((x) => x.seat);
  const cap = getTableCapacity(table);
  const slots = Array.from(Array(cap).keys());
  const available = slots.filter((x) => !occupiedSeats.includes(x));

  return available;
};

// set react app path
const webBuildPath = path.join(__dirname, "../web/build");

// serve react
app.use(express.static(webBuildPath));
app.get("/", (req, res) => {
  res.sendFile(`${webBuildPath}/index.html`);
});

app.post("/join-table", (req, res) => {
  const data = req.body;
  const { userId, userName, table } = data;
  const lastSeen = Date.now();
  const availableSeats = getAvailableSeats(table);
  if (availableSeats.length > 0) {
    const seat = availableSeats[0];
    positions = positions.filter((o) => o.userId !== userId);
    positions.push({
      userId,
      userName,
      table,
      seat,
      lastSeen
    });
    return res.json({ isSuccess: true });
  }

  return res.json({ isSuccess: false, message: "Table is full." });
});

app.post("/leave", (req, res) => {
  const { userId } = req.body;
  positions = positions.filter((o) => o.userId !== userId);

  res.json({ isSuccess: true });
});

app.get("/positions", (req, res) => {
  const { userId } = req.query;

  // check lastSeen property
  positions.forEach(function findUser(element) {
    if (element.userId == userId) {
      element.lastSeen = Date.now();
      return false;
    }
  })

  positions = positions.filter((o) => Date.now() - o.lastSeen <= 2400);

  return res.json({ isSuccess: true, positions });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
