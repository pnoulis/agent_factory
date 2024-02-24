import { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import { getafm } from "/src/getafm.js";
import { parsecmd } from "#afm/parsecmd.js";
import { Pending } from "#components/await-command/Pending2.jsx";

function loadPackages() {
  return defer({
    packages: getafm().then((afm) =>
      parsecmd(afm.listPackages({ queue: false })).then((res) => ({
        packages: [
          {
            type: "time",
            description: "amount of time",
            catalogue: res.packages
              .filter((pkg) => pkg.type === "time")
              .map((timePkg) => {
                timePkg.label = `${timePkg.name.split(" ").at(-1)} minutes`;
                return timePkg;
              }),
          },
          {
            type: "mission",
            description: "number of missions",
            catalogue: res.packages
              .filter((pkg) => pkg.type === "mission")
              .map((missionsPkg) => {
                missionsPkg.label = `${missionsPkg.name
                  .split(" ")
                  .at(-1)} missions`;
                return missionsPkg;
              }),
          },
        ],
      })),
    ),
  });
}

function AwaitPackages({ children }) {
  const pending = useLoaderData();
  debug(pending.packages, "pending");
  return (
    <Suspense fallback={<Pending />}>
      <Await resolve={pending.packages}>{children}</Await>
    </Suspense>
  );
}

export { loadPackages, AwaitPackages };
