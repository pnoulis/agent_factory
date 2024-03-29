// sort by comparator
function sort(ar, compareFn) {
  return [...ar].sort(compareFn);
}

// example: turns lessThan comparator to moreThan
const switchOrder = (order, key, comparator) =>
  order === "desc"
    ? (a, b) => comparator(a, b, key)
    : (a, b) => -comparator(a, b, key);

// Bind 1st argument to supply comparators
const getComparator = (comparators, order, key) =>
  switchOrder(order, key, comparators[key] || comparatorLessThan);

// comparator
// a < b
const comparatorLessThan = (a, b, k) =>
  a[k] < b[k] ? 1 : a[k] > b[k] ? -1 : 0;

function createComparatorPackageState(states) {
  states ||= {
    unregistered: 0,
    registered: 1,
    playing: 2,
    completed: 3,
  };
  return (a, b) =>
    states[a.state.name || a.state] < states[b.state.name || a.state]
      ? 1
      : states[a.state.name || a.state] > states[b.state.name || b.state]
        ? -1
        : 0;
}

export {
  sort,
  switchOrder,
  getComparator,
  comparatorLessThan,
  createComparatorPackageState,
};
