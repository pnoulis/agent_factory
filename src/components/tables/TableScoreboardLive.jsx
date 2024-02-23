import { Table } from "./Table.jsx";

function TableScoreboardLive({ scoreboard }) {
  return (
    <Table
      showIndex
      data={scoreboard}
      fields={{
        name: null,
        state: {
          name: "state",
          label: "status",
        },
        roster: {
          name: "roster",
          label: "players",
          gval: function (src) {
            return src.roster?.length;
          },
        },
        played: null,
        wins: null,
        losses: null,
        points: null,
      }}
    ></Table>
  );
}

export { TableScoreboardLive };
