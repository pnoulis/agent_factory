import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { Wristband } from "../../src/afmachine/wristband/Wristband.js";
import { Player } from "../../src/afmachine/player/Player.js";
import { Package } from "../../src/afmachine/package/Package.js";
import { Team } from "../../src/afmachine/team/Team.js";
import { flatRosters } from "../../src/afmachine/team/flatRosters.js";
import { flatPackages } from "../../src/afmachine/team/flatPackages.js";

const createWristband = (wristband) => new Wristband(wristband);
const createPlayer = (player, wristband) => new Player(player, wristband);
const createPackage = (pkg) => new Package(pkg);
const createTeam = (team) =>
  new Team(team, createPlayer, createWristband, createPackage);

const Entity = Team;
const random = Entity.random;
const normalize = Entity.normalize;
const validate = Entity.validate;
const tobject = Entity.tobject;

describe("team", () => {
  it("Should implement the standard interface", () => {
    expect(random).toBeTypeOf("function");
    expect(normalize).toBeTypeOf("function");
    expect(validate).toBeTypeOf("function");
    expect(tobject).toBeTypeOf("function");
    const entity = new Entity();
    expect(entity).toHaveProperty("fill");
    expect(entity.fill).toBeTypeOf("function");
    expect(entity).toHaveProperty("normalize");
    expect(entity.normalize).toBeTypeOf("function");
    expect(entity).toHaveProperty("tobject");
    expect(entity.tobject).toBeTypeOf("function");
  });
  it.only("Should be a valid afm team", () => {
    const entity = createTeam();
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();
  });

  // it("Should flatten 0 rosters", () => {
  //   expect(flatRosters()).toEqual([]);
  // });
  // it.todo("Should flatten 1 roster with no duplicates", () => {
  //   const flatted = flatRosters([
  //     {
  //       username: "Sauron_0h96h9q4xixv",
  //       name: "",
  //       surname: "",
  //       email: "",
  //       state: "playing",
  //       wristband: {
  //         id: 241,
  //         color: "purple",
  //         colorCode: 2,
  //         state: "paired",
  //       },
  //     },
  //     {
  //       username: "ppone",
  //       name: "",
  //       surname: "",
  //       email: "",
  //       state: "playing",
  //       wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //     },
  //   ]);
  //   expect(flatted).toEqual([
  //     [
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //     ],
  //     [
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],
  //   ]);
  // });
  // it.todo("Should flatten 1 roster with logical duplicates", () => {
  //   const flatted = flatRosters([
  //     {
  //       username: "Sauron_0h96h9q4xixv",
  //       name: "",
  //       surname: "",
  //       email: "",
  //       state: "playing",
  //       wristband: { id: 241, color: "purple", colorCode: 2, state: "paired" },
  //     },
  //     {
  //       username: "ppone",
  //       name: "",
  //       surname: "",
  //       email: "",
  //       state: "playing",
  //       wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //     },
  //     {
  //       username: "Sauron_0h96h9q4xixv",
  //       name: "",
  //       surname: "",
  //       email: "",
  //       state: "playing",
  //       wristband: { id: 241, color: "purple", colorCode: 2, state: "paired" },
  //     },
  //     {
  //       username: "ppone",
  //       name: "",
  //       surname: "",
  //       email: "",
  //       state: "playing",
  //       wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //     },
  //   ]);
  //   expect(flatted).toEqual([
  //     [
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //     ],
  //     [
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],
  //   ]);
  // });
  // it.todo("Should flatten 1 roster with reference duplicates", () => {
  //   const roster = [randomPlayer(null), randomPlayer(null)];
  //   roster.push(roster[0], roster[1]);
  //   expect(roster[0]).toBe(roster[2]);
  //   expect(roster[1]).toBe(roster[3]);
  //   const flatted = flatRosters(roster);
  //   expect(flatted).toHaveLength(2);
  //   expect(flatted.flat()).toHaveLength(2);
  // });
  // it.todo("Should flatten N rosters with no duplicates", () => {
  //   const flatted = flatRosters(
  //     [
  //       {
  //         username: "one",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //       {
  //         username: "two",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],
  //     [
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],
  //   );

  //   expect(flatted).toEqual([
  //     [
  //       {
  //         username: "one",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //     ],
  //     [
  //       {
  //         username: "two",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],

  //     [
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //     ],

  //     [
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],
  //   ]);
  // });
  // it.todo("Should flatten N rosters with logical duplicates", () => {
  //   const flatted = flatRosters(
  //     [
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],
  //     [
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },

  //       {
  //         username: "0a5sh6llqf3v",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "inTeam",
  //         wristband: {
  //           id: null,
  //           color: "",
  //           colorCode: null,
  //           state: "unpaired",
  //         },
  //       },
  //       {
  //         username: "3q0vtxg1o7s",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "inTeam",
  //         wristband: {
  //           id: null,
  //           color: "",
  //           colorCode: null,
  //           state: "unpaired",
  //         },
  //       },
  //     ],
  //     [
  //       {
  //         username: "3q0vtxg1o7s",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "inTeam",
  //         wristband: {
  //           id: null,
  //           color: "",
  //           colorCode: null,
  //           state: "unpaired",
  //         },
  //       },
  //     ],
  //   );
  //   expect(flatted).toEqual([
  //     [
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //       {
  //         username: "Sauron_0h96h9q4xixv",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: {
  //           id: 241,
  //           color: "purple",
  //           colorCode: 2,
  //           state: "paired",
  //         },
  //       },
  //     ],
  //     [
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //       {
  //         username: "ppone",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "playing",
  //         wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
  //       },
  //     ],
  //     [
  //       {
  //         username: "0a5sh6llqf3v",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "inTeam",
  //         wristband: {
  //           id: null,
  //           color: "",
  //           colorCode: null,
  //           state: "unpaired",
  //         },
  //       },
  //     ],
  //     [
  //       {
  //         username: "3q0vtxg1o7s",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "inTeam",
  //         wristband: {
  //           id: null,
  //           color: "",
  //           colorCode: null,
  //           state: "unpaired",
  //         },
  //       },

  //       {
  //         username: "3q0vtxg1o7s",
  //         name: "",
  //         surname: "",
  //         email: "",
  //         state: "inTeam",
  //         wristband: {
  //           id: null,
  //           color: "",
  //           colorCode: null,
  //           state: "unpaired",
  //         },
  //       },
  //     ],
  //   ]);
  // });
  // it.todo("Should flatten N rosters with reference duplicates", () => {
  //   const rosters = [[randomPlayer(), randomPlayer()], [randomPlayer()], []];
  //   rosters[1].push(rosters[0][1]);
  //   expect(rosters[1][1]).toBe(rosters[0][1]);
  //   rosters[2].push(rosters[1][0]);
  //   expect(rosters[1][0]).toBe(rosters[2][0]);

  //   const flatted = flatRosters(rosters);
  //   expect(flatted).toHaveLength(3);
  //   expect(flatted.flat()).toHaveLength(3);
  // });
  // it.todo("Should flatten N FUBAR rosters", () => {
  //   const player1 = randomPlayer({ username: "aa" });
  //   const player2 = randomPlayer({ username: "cc" });

  //   const rosters = [
  //     [
  //       player1,
  //       { ...player1, username: "zz" },
  //       { ...player1, username: "bb" },
  //       {},
  //       player2,
  //       0,
  //       1,
  //     ],
  //     [player1, { ...player1, username: "bb" }, { ...player1, username: "zz" }],
  //     [{ ...player1, username: "nn" }, player2],
  //     [{ ...player1, username: "nn" }, null, undefined, {}],
  //   ];

  //   const flatted = flatRosters(rosters);
  //   expect(flatted).toHaveLength(7);
  //   expect(flatted.flat()).toHaveLength(10);
  //   expect(flatted).toEqual([
  //     {},
  //     {},
  //     [player1],
  //     [
  //       { ...player1, username: "zz" },
  //       { ...player1, username: "zz" },
  //     ],
  //     [
  //       { ...player1, username: "bb" },
  //       { ...player1, username: "bb" },
  //     ],
  //     [player2],
  //     [
  //       { ...player1, username: "nn" },
  //       { ...player1, username: "nn" },
  //     ],
  //   ]);
  // });
  // it.todo("Should flatten 0 packages", () => {
  //   expect(flatPackages()).toEqual([]);
  // });
  // it.todo("Should flatten 1 source of packages with no duplicates", () => {
  //   const pkg = randomPackage({ id: 3 });
  //   const flatted = flatPackages([pkg, { ...pkg, id: 4 }, { ...pkg, id: 5 }]);
  //   expect(flatted).toEqual([[pkg], [{ ...pkg, id: 4 }], [{ ...pkg, id: 5 }]]);
  // });
  // it.todo("Should flatten 1 source of packages with logical duplicates", () => {
  //   const pkg = randomPackage({ id: 3 });
  //   const flatted = flatPackages([
  //     pkg,
  //     { ...pkg, id: 4 },
  //     { ...pkg, id: 4 },
  //     { ...pkg, id: 5 },
  //   ]);
  //   expect(flatted).toEqual([
  //     [pkg],
  //     [
  //       { ...pkg, id: 4 },
  //       { ...pkg, id: 4 },
  //     ],
  //     [{ ...pkg, id: 5 }],
  //   ]);
  // });
  // it.todo(
  //   "Should flatten 1 source of packages with reference duplicates",
  //   () => {
  //     const pkg = randomPackage({ id: 3 });
  //     const flatted = flatPackages([
  //       pkg,
  //       { ...pkg, id: 4 },
  //       pkg,
  //       { ...pkg, id: 5 },
  //     ]);
  //     expect(flatted).toEqual([
  //       [pkg],
  //       [{ ...pkg, id: 4 }],
  //       [{ ...pkg, id: 5 }],
  //     ]);
  //   },
  // );
  // it.todo("Should flatten N source of packages with no duplicates", () => {
  //   const pkg = randomPackage({ id: 3 });
  //   const packages = [
  //     [pkg, { ...pkg, id: 4 }],
  //     [{ ...pkg, id: 5 }],
  //     [
  //       { ...pkg, id: 6 },
  //       { ...pkg, id: 7 },
  //     ],
  //   ];
  //   const flatted = flatPackages(packages);
  //   expect(flatted).toEqual([
  //     [pkg],
  //     [{ ...pkg, id: 4 }],
  //     [{ ...pkg, id: 5 }],
  //     [{ ...pkg, id: 6 }],
  //     [{ ...pkg, id: 7 }],
  //   ]);
  // });
  // it.todo("Should flatten N source of packages with logical duplicates", () => {
  //   const pkg = randomPackage({ id: 3 });
  //   const packages = [
  //     [pkg, { ...pkg, id: 4 }],
  //     [{ ...pkg, id: 5 }],
  //     [
  //       { ...pkg, id: 6 },
  //       { ...pkg, id: 4 },
  //     ],
  //     [{ ...pkg, id: 5 }],
  //   ];

  //   const flatted = flatPackages(packages);
  //   expect(flatted).toEqual([
  //     [pkg],
  //     [
  //       { ...pkg, id: 4 },
  //       { ...pkg, id: 4 },
  //     ],
  //     [
  //       { ...pkg, id: 5 },
  //       { ...pkg, id: 5 },
  //     ],
  //     [{ ...pkg, id: 6 }],
  //   ]);
  // });
  // it.todo(
  //   "Should flatten N source of packages with reference duplicates",
  //   () => {
  //     const pkg1 = randomPackage();
  //     const pkg2 = randomPackage();
  //     const flatted = flatPackages([pkg1], [pkg2, pkg1], [pkg2]);
  //     expect(flatted).toEqual([[pkg1], [pkg2]]);
  //   },
  // );
  // it.todo("Should flatten N FUBAR packages", () => {
  //   const pkg1 = randomPackage({ id: 2 });
  //   const pkg2 = randomPackage({ id: 3 });

  //   const packages = [
  //     [pkg1, { ...pkg1, id: 4 }, { ...pkg1, id: 5 }, {}, pkg2, 0, 1],
  //     [pkg1, { ...pkg1, id: 5 }, { ...pkg1, id: 4 }],
  //     [{ ...pkg1, id: 6 }, pkg2],
  //     [{ ...pkg1, id: 6 }, null, undefined, {}],
  //   ];

  //   const flatted = flatPackages(packages);
  //   expect(flatted).toHaveLength(7);
  //   expect(flatted.flat()).toHaveLength(10);
  //   expect(flatted).toEqual([
  //     {},
  //     {},
  //     [pkg1],
  //     [
  //       { ...pkg1, id: 4 },
  //       { ...pkg1, id: 4 },
  //     ],
  //     [
  //       { ...pkg1, id: 5 },
  //       { ...pkg1, id: 5 },
  //     ],
  //     [pkg2],
  //     [
  //       { ...pkg1, id: 6 },
  //       { ...pkg1, id: 6 },
  //     ],
  //   ]);
  // });
});
