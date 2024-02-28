import { useSearchParams } from "react-router-dom";

function useFilter({ defaultFilter = {}, join = false } = {}) {
  const [filters, setSearchParams] = useSearchParams();

  function setFilter({ type, value } = {}) {
    if (!type) {
      filters.delete("type");
      filters.delete("value");
    } else if (filters.has("type", type) && filters.has("value", value)) {
      filters.delete("value", value);
      filters.delete("type", type);
    } else if (!join) {
      filters.set("type", type);
      filters.set("value", value);
    } else {
      filters.append("type", type);
      filters.append("value", value);
    }
    setSearchParams(filters);
  }

  if (defaultFilter && !filters.has("type")) {
    filters.set("type", defaultFilter?.type);
    filters.set("value", defaultFilter?.value);
  }

  return { filters, setFilter };
}

export { useFilter };
