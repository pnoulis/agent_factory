import { Table } from "./Table.jsx";

function TableScoreboardLive({ scoreboard }) {
  return (
    <Table
      showIndex
      data={scoreboard}
      fields={{
        teamName: {
          label: "name",
        },
        numberOfPlayers: {
          label: "players",
        },
        played: null,
        won: null,
        lost: null,
        totalPoints: {
          label: "points",
        },
      }}
    />
  );
}

export { TableScoreboardLive };
