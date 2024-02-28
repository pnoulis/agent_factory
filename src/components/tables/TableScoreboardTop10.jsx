import { Table } from "./Table.jsx";

function TableScoreboardTop10({ scoreboard }) {
  return (
    <Table
      showIndex
      data={scoreboard}
      fields={{
        teamName: {
          label: "name",
        },
        totalPoints: {
          label: "points",
        },
        numberOfPlayers: {
          label: "players",
        },
        created: null,
      }}
    />
  );
}

export { TableScoreboardTop10 };
