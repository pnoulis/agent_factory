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
        packages: {
          name: "packages",
          label: "packages",
          gval: function (src) {
            return src.packages.length;
          },
        },
        /* totalPkgsCost: { */
        /*   name: "totalPkgsCost", */
        /*   label: "total cost", */
        /*   gval: function (src) { */
        /*     let cost = 0; */
        /*     for (let i = 0; i < src.packages.length; i++) { */
        /*       cost += src.packages[i].cost; */
        /*     } */
        /*     return Math.floor(cost) + " euro"; */
        /*   }, */
        /* }, */
        /* activePkgCost: { */
        /*   name: "activePkgCost", */
        /*   label: "cost", */
        /*   gval: function (src) { */
        /*     if (!src.activePkg) return ""; */
        /*     return Math.floor(src.activePkg?.cost) + " euro"; */
        /*   }, */
        /* }, */
        activePkgType: {
          name: "activePkgType",
          label: "active package type",
          gval: function (src) {
            return src.activePkg?.type;
          },
        },
        activePkgAmount: {
          name: "activePkgAmount",
          label: "active package amount",
          gval: function (src) {
            const apkg = src.activePkg;
            if (!apkg) {
              return "";
            } else if (apkg.type === "mission") {
              return apkg.amount + " missions";
            } else if (apkg.type === "time") {
              return apkg.amount + " min";
            } else {
              throw new Error(`Unrecognized package type: ${apkg.type}`);
            }
          },
        },
        activePkgRemainder: {
          name: "activePkgRemainder",
          label: "active package remainder",
          gval: function (src) {
            const apkg = src.activePkg;
            if (!apkg) {
              return "";
            } else if (apkg.type === "mission") {
              return apkg.amount + " missions";
            } else if (apkg.type === "time") {
              return (
                Math.ceil(t_stomin(t_stomls(apkg.remainder, true))) + " min"
              );
            } else {
              throw new Error(`Unrecognized package type: ${apkg.type}`);
            }
          },
        },
        activePkgTimeStart: {
          name: "activePkgTimeStart",
          label: "active package start time",
          gval: function (src) {
            const apkg = src.activePkg;
            if (!apkg) {
              return "";
            }
            const { hour, minute, second, literal } = formatTime(apkg.t_start);
            return `${hour}${literal}${minute}${literal}${second}`;
          },
        },
        points: {
          name: "points",
          label: "points",
          gval: function (src) {
            return src.points;
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
