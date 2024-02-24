import { DataTuple } from "../tuple/DataTuple.jsx";
import { mergec } from "../../misc/misc.js";

function PackageInfoCard({ ctx, className, style, onClick }) {
  return (
    <article
      className={mergec("package-info-card", className)}
      style={style}
      onClick={onClick}
    >
      <DataTuple className="state" src={ctx} name="state" label="status" />
      <DataTuple src={ctx} name="t_start" />
      <DataTuple src={ctx} name="type" />
      <DataTuple src={ctx} name="t_end" />
      <DataTuple src={ctx} name="cost" />
      <DataTuple src={ctx} name="remainder" />
      <DataTuple src={ctx} name="amount" />
    </article>
  );
}

export { PackageInfoCard };
