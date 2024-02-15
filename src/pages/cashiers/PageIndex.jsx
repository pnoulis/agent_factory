import { TableCashiers } from "#components/tables/TableCashiers.jsx";
import { AwaitCashiers } from "/src/loaders/loadCashiers.jsx";

function Component() {
  return <AwaitCashiers>{TableCashiers}</AwaitCashiers>;
}

export { Component };
