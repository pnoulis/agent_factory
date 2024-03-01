import { DataTuple } from "../tuple/DataTuple.jsx";
import { mergec } from "../../misc/misc.js";
import { t_stomls, t_stomin, formatTime } from "/src/misc/misc.js";

const parseTime = (src, v, name) => {
  try {
    if (!src[name]) return null;
    const { hour, minute, second, literal } = formatTime(src[name]);
    return `${hour}${literal}${minute}${literal}${second}`;
  } catch (err) {
    debug("PARSET TIEM", time);
    debug(err);
    return time;
  }
};

const parseRemainder = (src, v, name) => {
  if (src.type === "mission") {
    return src.remainder + " missions";
  } else if (src.type === "time") {
    return Math.ceil(t_stomin(t_stomls(src.remainder, true))) + " min";
  } else {
    throw new Error(`Unrecognized package type: ${apkg.type}`);
  }
};

function PackageInfoCard({ ctx, className, style, onClick }) {
  return (
    <article
      className={mergec("package-info-card", className)}
      style={style}
      onClick={onClick}
    >
      <DataTuple className="state" src={ctx} name="state" label="status" />
      <DataTuple src={ctx} name="t_start" pval={parseTime} />
      <DataTuple src={ctx} name="type" />
      <DataTuple src={ctx} name="t_end" pval={parseTime} />
      <DataTuple src={ctx} name="cost" />
      <DataTuple src={ctx} name="remainder" pval={parseRemainder} />
      <DataTuple src={ctx} name="amount" />
    </article>
  );
}

export { PackageInfoCard };
