import { Table } from "./Table.jsx";
import { t_stomls, t_stomin, formatTime } from "/src/misc/misc.js";
import styled from "styled-components";

function TableTeams({ teams, onSelectionChange, onRowClick }) {
  return (
    <ThisTable
      showIndex
      onRowClick={onRowClick}
      onSelectionChange={onSelectionChange}
      data={teams}
      fields={{
        name: {
          name: "name",
          label: "name",
        },
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
        points: {
          name: "points",
          label: "points",
          gval: function (src) {
            return src.points;
          },
        },
        packages: {
          name: "packages",
          label: "total packages",
          gval: function (src) {
            return src.packages.length;
          },
        },
        totalPkgsCost: {
          name: "totalPkgsCost",
          label: "total packages cost",
          gval: function (src) {
            let cost = 0;
            for (let i = 0; i < src.packages.length; i++) {
              cost += src.packages[i].cost;
            }
            return Math.floor(cost) + " euro";
          },
        },
        activePkgType: {
          name: "activePkgType",
          label: "active package type",
          gval: function (src) {
            return src.activePackage?.type;
          },
        },
        activePkgCost: {
          name: "activePkgCost",
          label: "active package cost",
          gval: function (src) {
            if (!src.activePackage) return "";
            return Math.floor(src.activePackage?.cost) + " euro";
          },
        },
        activePkgAmount: {
          name: "activePkgAmount",
          label: "active package amount",
          gval: function (src) {
            const apkg = src.activePackage;
            if (!apkg) {
              return "";
            } else if (apkg.type === "mission") {
              return apkg.amount + " missions";
            } else if (apkg.type === "time") {
              return Math.ceil(t_stomin(t_stomls(apkg.amount, true))) + " min";
            } else {
              throw new Error(`Unrecognized package type: ${apkg.type}`);
            }
          },
        },
        activePkgRemainder: {
          name: "activePkgRemainder",
          label: "active package remainder",
          gval: function (src) {
            const apkg = src.activePackage;
            if (!apkg) {
              return "";
            } else if (apkg.type === "mission") {
              return apkg.amount + " missions";
            } else if (apkg.type === "time") {
              return Math.ceil(t_stomin(t_stomls(apkg.amount, true))) + " min";
            } else {
              throw new Error(`Unrecognized package type: ${apkg.type}`);
            }
          },
        },
        activePkgTimeStart: {
          name: "activePkgTimeStart",
          label: "active package start time",
          gval: function (src) {
            const apkg = src.activePackage;
            if (!apkg) {
              return "";
            }
            const { hour, minute, second, literal } = formatTime(apkg.t_start);
            return `${hour}${literal}${minute}${literal}${second}`;
          },
        },
      }}
    />
  );
}

const ThisTable = styled(Table)`
  .MuiTableRow-root {
    cursor: pointer;
  }
`;

export { TableTeams };
