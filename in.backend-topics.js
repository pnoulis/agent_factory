import * as schemas from "./backend-api/schemas/index.js";
import deepmerge from "deepmerge";
import Ajv from "ajv";
const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  allowUnionTypes: true,
});

const rpiReaderTopics = {
  boot: {
    alias: "boot",
    pub: basename("booted"),
    sub: basename("booted/${deviceId}"),
  },
  readWristband: {
    alias: "read",
    pub: basename("${deviceId}/rpi/wristbandScan"),
    sub: basename("${deviceId}/rpi/wristbandScan"),
  },
};

const registrationTopics = {
  boot: {
    schema: {
      req: ajv.compile(
        deepmerge(schemas.request, {
          additionalProperties: false,
          required: ["timestamp", "deviceId", "deviceType", "roomName"],
          properties: {
            timestamp: schemas.commons.timestamp,
            deviceId: schemas.device.deviceId,
            deviceType: schemas.device.deviceType,
            roomName: schemas.device.roomType,
          },
        }),
      ),
      res: ajv.compile(
        deepmerge(schemas.response, {
          additionalProperties: false,
          required: ["timestamp", "result", "deviceType", "roomName"],
          properties: {
            deviceType: schemas.device.deviceType,
            roomName: schemas.device.roomType,
          },
        }),
      ),
    },
    alias: "boot",
    pub: basename("booted"),
    sub: basename("booted/${deviceId}"),
  },
  registerPlayer: {
    schema: {
      req: ajv.compile(
        /*
          timestamp: 1342432443234,
          username: 'Earendil_3b6jw77b5ed',
          name: 'Earendil',
          surname: 'flamboyant',
          email: 'Earendil@gmail.com',
          password: "onetwothree",
         */
        deepmerge(schemas.request, {
          additionalProperties: true,
          required: [
            "timestamp",
            "name",
            "surname",
            "username",
            "email",
            "password",
          ],
          properties: schemas.player.properties,
        }),
      ),
      res: ajv.compile(
        /*
          timestamp: 1706386638703,
          result: 'OK',
          player: {
            name: 'Tom',
            surname: 'focused',
            username: 'Tom_qsa7wtkahu4',
            email: 'Tom@gmail.com',
            wristbandColor: 0
          }
         */
        /*
          timestamp: 1706387350371,
          result: 'NOK',
          message: '...'
         */
        deepmerge(schemas.response, {
          type: "object",
          additionalProperties: false,
          required: ["timestamp", "result", "player"],
          properties: {
            player: {
              type: "object",
              required: [
                "name",
                "surname",
                "username",
                "email",
                "wristbandColor",
              ],
              properties: {
                ...schemas.player.properties,
                ...schemas.wristband.properties,
              },
            },
          },
        }),
      ),
    },
    alias: "player/register",
    pub: prefix("player/registration"),
    sub: prefix("player/registration/response"),
  },
  loginPlayer: {
    alias: "player/login",
    pub: prefix("player/login"),
    sub: prefix("player/login/response"),
  },
  scanWristband: {
    schema: {
      req: null,
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "wristbandNumber", "wristbandColor"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          wristbandNumber: schemas.wristband.properties.wristbandNumber,
          wristbandColor: schemas.wristband.properties.wristbandColor,
        },
      }),
    },
    alias: "wristband/scan",
    pub: null,
    sub: prefix("player/wristbandScan"),
  },
  registerWristband: {
    schema: {
      req: ajv.compile({
        type: "object",
        required: ["timestamp", "username", "wristbandNumber"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
          username: schemas.player.properties.username,
          wristbandNumber: schemas.wristband.properties.wristbandNumber,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "message"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          message: schemas.commons.message,
        },
      }),
    },
    alias: "wristband/register",
    pub: prefix("player/registerWristband"),
    sub: prefix("player/registerWristband/response"),
  },
  deregisterWristband: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "username", "wristbandNumber"],
        properties: {
          timestamp: schemas.commons.timestamp,
          username: schemas.player.properties.username,
          wristbandNumber: schemas.wristband.properties.wristbandNumber,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "message"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          message: schemas.commons.message,
        },
      }),
    },
    alias: "wristband/deregister",
    pub: prefix("player/unregisterWristband"),
    sub: prefix("player/unregisterWristband/response"),
  },
  registerTeam: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "teamName", "usernames"],
        properties: {
          timestamp: schemas.commons.timestamp,
          teamName: schemas.team.name,
          usernames: {
            type: "array",
            items: schemas.player.properties.username,
          },
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "message"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          message: schemas.commons.message,
        },
      }),
    },
    alias: "team/register",
    pub: prefix("team/merge"),
    sub: prefix("team/merge/response"),
  },
  registerGroupTeam: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "teamName", "groupPlayers"],
        properties: {
          timestamp: schemas.commons.timestamp,
          teamName: schemas.team.name,
          groupPlayers: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["username", "wristbandNumber"],
              properties: {
                username: schemas.player.properties.username,
                wristbandNumber: schemas.wristband.properties.wristbandNumber,
              },
            },
          },
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "message"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          message: schemas.commons.message,
        },
      }),
    },
    alias: "group/register",
    pub: prefix("/groupteam/merge"),
    sub: prefix("/groupteam/merge/response"),
  },
  getWristbandInfo: {
    schema: {
      req: ajv.compile({
        type: "object",
        required: ["timestamp", "wristbandNumber"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
          wristbandNumber: schemas.wristband.properties.wristbandNumber,
        },
      }),
      res: ajv.compile({
        type: "object",
        required: ["timestamp", "result", "wristband"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          wristband: {
            type: "object",
            required: ["wristbandNumber", "wristbandColor", "active"],
            additionalProperties: false,
            properties: {
              wristbandNumber: schemas.wristband.properties.wristbandNumber,
              wristbandColor: schemas.wristband.properties.wristbandColor,
              active: schemas.wristband.properties.active,
            },
          },
        },
      }),
    },
    alias: "wristband/info",
    pub: prefix("wristband/info"),
    sub: prefix("wristband/info/response"),
  },
  addTeamPackage: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "teamName", "name"],
        properties: {
          timestamp: schemas.commons.timestamp,
          teamName: schemas.team.name,
          name: schemas.pkg.properties.name,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "team"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          team: {
            type: "object",
            additionalProperties: false,
            required: [
              "name",
              "totalPoints",
              "teamState",
              "created",
              "lastRegisterAttempt",
              "currentRoster",
              "roomType",
              "packages",
            ],
            properties: {
              name: schemas.team.name,
              totalPoints: schemas.team.totalPoints,
              teamState: schemas.team.teamState,
              created: schemas.team.created,
              lastRegisterAttempt: schemas.team.lastRegisterAttempt,
              roomType: schemas.team.roomType,
              currentRoster: {
                type: "object",
                additionalProperties: false,
                required: ["version", "players"],
                properties: {
                  version: schemas.team.version,
                  players: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "username",
                        "wristbandNumber",
                        "wristbandColor",
                      ],
                      properties: {
                        username: schemas.player.properties.username,
                        wristbandNumber:
                          schemas.wristband.properties.wristbandNumber,
                        wristbandColor:
                          schemas.wristband.properties.wristbandColor,
                      },
                    },
                  },
                },
              },
              packages: {
                type: "array",
                items: {
                  anyOf: [
                    {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "id",
                        "name",
                        "cost",
                        "started",
                        "ended",
                        "missions",
                        "missionsPlayed",
                        "active",
                      ],
                      properties: {
                        id: schemas.commons.id,
                        name: schemas.pkg.properties.name,
                        cost: schemas.pkg.properties.cost,
                        started: schemas.commons.started,
                        ended: schemas.commons.ended,
                        missions: schemas.missionPkg.missions,
                        missionsPlayed: schemas.missionPkg.missionsPlayed,
                        active: schemas.commons.active,
                      },
                    },
                    {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "id",
                        "name",
                        "cost",
                        "started",
                        "ended",
                        "duration",
                        "paused",
                        "active",
                      ],
                      properties: {
                        id: schemas.commons.id,
                        name: schemas.pkg.properties.name,
                        cost: schemas.pkg.properties.cost,
                        started: schemas.commons.started,
                        ended: schemas.commons.ended,
                        duration: schemas.timePkg.duration,
                        paused: schemas.timePkg.paused,
                        active: schemas.commons.active,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      }),
    },
    alias: "team/package/add",
    pub: prefix("team/package/add"),
    sub: prefix("team/package/add/response"),
  },
  removeTeamPackage: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "teamName", "packageId"],
        properties: {
          timestamp: schemas.commons.timestamp,
          teamName: schemas.team.name,
          packageId: schemas.commons.id,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "team"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          team: {
            type: "object",
            additionalProperties: false,
            required: [
              "name",
              "totalPoints",
              "teamState",
              "created",
              "lastRegisterAttempt",
              "currentRoster",
              "roomType",
              "packages",
            ],
            properties: {
              name: schemas.team.name,
              totalPoints: schemas.team.totalPoints,
              teamState: schemas.team.teamState,
              created: schemas.team.created,
              lastRegisterAttempt: schemas.team.lastRegisterAttempt,
              roomType: schemas.team.roomType,
              currentRoster: {
                type: "object",
                additionalProperties: false,
                required: ["version", "players"],
                properties: {
                  version: schemas.team.version,
                  players: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "username",
                        "wristbandNumber",
                        "wristbandColor",
                      ],
                      properties: {
                        username: schemas.player.properties.username,
                        wristbandNumber:
                          schemas.wristband.properties.wristbandNumber,
                        wristbandColor:
                          schemas.wristband.properties.wristbandColor,
                      },
                    },
                  },
                },
              },
              packages: {
                type: "array",
                items: {
                  anyOf: [
                    {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "id",
                        "name",
                        "cost",
                        "started",
                        "ended",
                        "missions",
                        "missionsPlayed",
                        "active",
                      ],
                      properties: {
                        id: schemas.commons.id,
                        name: schemas.pkg.properties.name,
                        cost: schemas.pkg.properties.cost,
                        started: schemas.commons.started,
                        ended: schemas.commons.ended,
                        missions: schemas.missionPkg.missions,
                        missionsPlayed: schemas.missionPkg.missionsPlayed,
                        active: schemas.commons.active,
                      },
                    },
                    {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "id",
                        "name",
                        "cost",
                        "started",
                        "ended",
                        "duration",
                        "paused",
                        "active",
                      ],
                      properties: {
                        id: schemas.commons.id,
                        name: schemas.pkg.properties.name,
                        cost: schemas.pkg.properties.cost,
                        started: schemas.commons.started,
                        ended: schemas.commons.ended,
                        duration: schemas.timePkg.duration,
                        paused: schemas.timePkg.paused,
                        active: schemas.commons.active,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      }),
    },
    alias: "team/package/remove",
    pub: prefix("team/package/delete"),
    sub: prefix("team/package/delete/response"),
  },
  startTeam: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "teamName"],
        properties: {
          timestamp: schemas.commons.timestamp,
          teamName: schemas.team.name,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "team"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          team: {
            type: "object",
            additionalProperties: false,
            required: [
              "name",
              "totalPoints",
              "teamState",
              "created",
              "lastRegisterAttempt",
              "currentRoster",
              "roomType",
              "packages",
            ],
            properties: {
              name: schemas.team.name,
              totalPoints: schemas.team.totalPoints,
              teamState: schemas.team.teamState,
              created: schemas.team.created,
              lastRegisterAttempt: schemas.team.lastRegisterAttempt,
              roomType: schemas.team.roomType,
              currentRoster: {
                type: "object",
                additionalProperties: false,
                required: ["version", "players"],
                properties: {
                  version: schemas.team.version,
                  players: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "username",
                        "wristbandNumber",
                        "wristbandColor",
                      ],
                      properties: {
                        username: schemas.player.properties.username,
                        wristbandNumber:
                          schemas.wristband.properties.wristbandNumber,
                        wristbandColor:
                          schemas.wristband.properties.wristbandColor,
                      },
                    },
                  },
                },
              },
              packages: {
                type: "array",
                items: {
                  anyOf: [
                    {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "id",
                        "name",
                        "cost",
                        "started",
                        "ended",
                        "missions",
                        "missionsPlayed",
                        "active",
                      ],
                      properties: {
                        id: schemas.commons.id,
                        name: schemas.pkg.properties.name,
                        cost: schemas.pkg.properties.cost,
                        started: schemas.commons.started,
                        ended: schemas.commons.ended,
                        missions: schemas.missionPkg.missions,
                        missionsPlayed: schemas.missionPkg.missionsPlayed,
                        active: schemas.commons.active,
                      },
                    },
                    {
                      type: "object",
                      additionalProperties: false,
                      required: [
                        "id",
                        "name",
                        "cost",
                        "started",
                        "ended",
                        "duration",
                        "paused",
                        "active",
                      ],
                      properties: {
                        id: schemas.commons.id,
                        name: schemas.pkg.properties.name,
                        cost: schemas.pkg.properties.cost,
                        started: schemas.commons.started,
                        ended: schemas.commons.ended,
                        duration: schemas.timePkg.duration,
                        paused: schemas.timePkg.paused,
                        active: schemas.commons.active,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      }),
    },
    alias: "team/start",
    pub: prefix("team/activate"),
    sub: prefix("team/activate/response"),
  },
  registerCashier: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["username", "email", "password", "role"],
        properties: {
          username: schemas.player.properties.username,
          email: schemas.player.properties.email,
          password: schemas.player.properties.password,
          role: schemas.cashier.role,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
        },
      }),
    },
    alias: "cashier/register",
    pub: basename("signup"),
    sub: basename("signup/response"),
  },
  loginCashier: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["username", "password"],
        properties: {
          username: schemas.player.properties.username,
          password: schemas.player.properties.password,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "jwtResponse"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          jwtResponse: {
            type: "object",
            additionalProperties: false,
            required: ["jwt", "id", "username", "email", "roles"],
            properties: {
              jwt: schemas.cashier.jwt,
              id: schemas.commons.id,
              username: schemas.player.properties.username,
              email: schemas.player.properties.email,
              roles: schemas.cashier.role,
            },
          },
        },
      }),
    },
    alias: "cashier/login",
    pub: basename("signin"),
    sub: basename("signin/response"),
  },
  deregisterCashier: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "username", "userId"],
        properties: {
          timestamp: schemas.commons.timestamp,
          username: schemas.player.properties.username,
          userId: schemas.commons.id,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "cashiers"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          cashiers: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "username", "email"],
              properties: {
                id: schemas.commons.id,
                username: schemas.player.properties.username,
                email: schemas.player.properties.email,
              },
            },
          },
        },
      }),
    },
    alias: "cashier/deregister",
    pub: prefix("users/cashiers/delete"),
    sub: prefix("users/cashiers/delete/response"),
  },
  startSession: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["jwt"],
        properties: {
          jwt: schemas.cashier.jwt,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
        },
      }),
    },
    alias: "session/start",
    pub: basename("startSession"),
    sub: basename("startSession/response"),
  },
  stopSession: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["jwt", "comment"],
        properties: {
          jwt: schemas.cashier.jwt,
          comment: schemas.cashier.comment,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
        },
      }),
    },
    alias: "session/stop",
    pub: basename("endSession"),
    sub: basename("endSession/response"),
  },
  updateDevice: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "devicesAction", "deviceId"],
        properties: {
          timestamp: schemas.commons.timestamp,
          devicesAction: schemas.device.devicesActions,
          deviceId: schemas.device.deviceId,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "message"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          message: schemas.commons.message,
        },
      }),
    },
    alias: "devices/update",
    pub: prefix("devices/action"),
    sub: prefix("devices/action/response"),
  },
  updateScoreboardDeviceView: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "deviceId", "status"],
        properties: {
          timestamp: schemas.commons.timestamp,
          deviceId: schemas.device.deviceId,
          status: schemas.device.status,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
        },
      }),
    },
    alias: "device/scoreboard/view/update",
    pub: basename("devices/scoreboard/updateStatus"),
    sub: basename("devices/scoreboard/updateStatus/response"),
  },

  //////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////
  listPlayers: {
    schema: {
      req: ajv.compile({
        type: "object",
        required: ["timestamp"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
        },
      }),
      res: ajv.compile({
        type: "object",
        required: ["timestamp", "result", "players"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          players: {
            type: "array",
            items: {
              type: "object",
              required: [
                "username",
                "name",
                "surname",
                "email",
                "wristbandMerged",
                "wristband",
              ],
              additionalProperties: false,
              properties: {
                username: schemas.player.properties.username,
                name: schemas.player.properties.name,
                surname: schemas.player.properties.surname,
                email: schemas.player.properties.email,
                wristbandMerged: schemas.player.properties.wristbandMerged,
                wristband: {
                  type: "object",
                  nullable: true,
                  required: ["wristbandNumber", "wristbandColor", "active"],
                  additionalProperties: false,
                  properties: {
                    wristbandNumber:
                      schemas.wristband.properties.wristbandNumber,
                    wristbandColor: schemas.wristband.properties.wristbandColor,
                    active: schemas.wristband.properties.active,
                  },
                },
              },
            },
          },
        },
      }),
    },
    alias: "list/players",
    pub: prefix("/player/all/search"),
    sub: prefix("player/all/search/response"),
  },
  listPlayersWithWristband: {
    schema: {
      req: ajv.compile({
        type: "object",
        required: ["timestamp"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
        },
      }),
      res: ajv.compile({
        type: "object",
        required: ["timestamp", "result", "players"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          players: {
            type: "array",
            items: {
              type: "object",
              required: [
                "username",
                "name",
                "surname",
                "email",
                "wristbandMerged",
                "wristband",
              ],
              additionalProperties: false,
              properties: {
                username: schemas.player.properties.username,
                name: schemas.player.properties.name,
                surname: schemas.player.properties.surname,
                email: schemas.player.properties.email,
                wristbandMerged: schemas.player.properties.wristbandMerged,
                wristband: {
                  type: "object",
                  required: ["wristbandNumber", "wristbandColor", "active"],
                  additionalProperties: false,
                  properties: {
                    wristbandNumber:
                      schemas.wristband.properties.wristbandNumber,
                    wristbandColor: schemas.wristband.properties.wristbandColor,
                    active: schemas.wristband.properties.active,
                  },
                },
              },
            },
          },
        },
      }),
    },
    alias: "list/playersWithWristband",
    pub: prefix("player/available/search"),
    sub: prefix("player/available/search/response"),
  },
  listPackages: {
    schema: {
      req: null,
      res: ajv.compile(
        deepmerge(schemas.response, {
          required: ["timestamp", "result", "packages"],
          additionalProperties: false,
          properties: {
            packages: {
              type: "array",
              items: schemas.pkg,
            },
          },
        }),
      ),
    },
    alias: "list/packages",
    pub: prefix("packages/all"),
    sub: prefix("packages/all/response"),
  },
  listTeams: {
    schema: {
      req: null,
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "teams"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          teams: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "name",
                "totalPoints",
                "teamState",
                "created",
                "lastRegisterAttempt",
                "currentRoster",
                "roomType",
                "packages",
              ],
              properties: {
                name: schemas.team.name,
                totalPoints: schemas.team.totalPoints,
                teamState: schemas.team.teamState,
                created: schemas.team.created,
                lastRegisterAttempt: schemas.team.lastRegisterAttempt,
                roomType: schemas.team.roomType,
                currentRoster: {
                  type: "object",
                  additionalProperties: false,
                  required: ["version", "players"],
                  properties: {
                    version: schemas.team.version,
                    players: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        required: [
                          "username",
                          "wristbandNumber",
                          "wristbandColor",
                        ],
                        properties: {
                          username: schemas.player.properties.username,
                          wristbandNumber:
                            schemas.wristband.properties.wristbandNumber,
                          wristbandColor:
                            schemas.wristband.properties.wristbandColor,
                        },
                      },
                    },
                  },
                },
                packages: {
                  type: "array",
                  items: {
                    anyOf: [
                      {
                        type: "object",
                        additionalProperties: false,
                        required: [
                          "id",
                          "name",
                          "cost",
                          "started",
                          "ended",
                          "missions",
                          "missionsPlayed",
                          "active",
                        ],
                        properties: {
                          id: schemas.commons.id,
                          name: schemas.pkg.properties.name,
                          cost: schemas.pkg.properties.cost,
                          started: schemas.commons.started,
                          ended: schemas.commons.ended,
                          missions: schemas.missionPkg.missions,
                          missionsPlayed: schemas.missionPkg.missionsPlayed,
                          active: schemas.commons.active,
                        },
                      },
                      {
                        type: "object",
                        additionalProperties: false,
                        required: [
                          "id",
                          "name",
                          "cost",
                          "started",
                          "ended",
                          "duration",
                          "paused",
                          "active",
                        ],
                        properties: {
                          id: schemas.commons.id,
                          name: schemas.pkg.properties.name,
                          cost: schemas.pkg.properties.cost,
                          started: schemas.commons.started,
                          ended: schemas.commons.ended,
                          duration: schemas.timePkg.duration,
                          paused: schemas.timePkg.paused,
                          active: schemas.commons.active,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      }),
    },
    alias: "list/teams",
    pub: prefix("teams/all"),
    sub: prefix("teams/all/response"),
  },
  listCashiers: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp"],
        properties: {
          timestamp: schemas.commons.timestamp,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "cashiers"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          cashiers: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "username", "email"],
              properties: {
                id: schemas.commons.id,
                username: schemas.player.properties.username,
                email: schemas.player.properties.email,
              },
            },
          },
        },
      }),
    },
    alias: "list/cashiers",
    pub: prefix("users/cashiers"),
    sub: prefix("users/cashiers/response"),
  },
  listDevices: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp"],
        properties: {
          timestamp: schemas.commons.timestamp,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "devices"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          devices: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "deviceType",
                "roomType",
                "deviceId",
                "macAddress",
                "ipAddress",
                "bootedTimestamp",
              ],
              properties: {
                deviceType: schemas.device.deviceType,
                roomType: schemas.device.roomType,
                deviceId: schemas.device.deviceId,
                macAddress: schemas.device.macAddress,
                ipAddress: schemas.device.ipAddress,
                bootedTimestamp: schemas.commons.timestamp,
              },
            },
          },
        },
      }),
    },
    alias: "list/devices",
    pub: basename("devices"),
    sub: basename("devices/response"),
  },
  listScoreboardDevices: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp"],
        properties: {
          timestamp: schemas.commons.timestamp,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "scoreboardDevices"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          scoreboardDevices: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["deviceType", "roomType", "deviceId", "status"],
              properties: {
                deviceType: schemas.device.deviceType,
                roomType: schemas.device.roomType,
                deviceId: schemas.device.deviceId,
                status: schemas.device.status,
              },
            },
          },
        },
      }),
    },
    alias: "list/devices/scoreboard",
    pub: basename("devices/scoreboard"),
    sub: basename("devices/scoreboard/response"),
  },
  listScoreboardViews: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp"],
        properties: {
          timestamp: schemas.commons.timestamp,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "scoreboardStatuses"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          scoreboardStatuses: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      }),
    },
    alias: "/list/devices/scoreboard/views",
    pub: basename("devices/scoreboard/updateStatus/options"),
    sub: basename("devices/scoreboard/updateStatus/options/response"),
  },
  listScoreboard: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp"],
        properties: {
          timestamp: schemas.commons.timestamp,
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: [
          "timestamp",
          "result",
          "roomElementAssociations",
          "live",
          "teamAllTime",
          "teamMonthly",
          "teamWeekly",
          "teamDaily",
          "perRoom",
          "perElement",
        ],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          roomElementAssociations: {
            type: "object",
          },
          live: { type: "array" },
          teamAllTime: { type: "array" },
          teamMonthly: { type: "array" },
          teamWeekly: { type: "array" },
          teamDaily: { type: "array" },
          perRoom: { type: "object" },
          perElement: { type: "object" },
        },
      }),
    },
    alias: "/list/scoreboard",
    pub: basename("scoreboard"),
    sub: basename("scoreboard/response"),
  },
  //////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////
  searchPlayer: {
    schema: {
      req: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "searchTerm"],
        properties: {
          timestamp: schemas.commons.timestamp,
          searchTerm: {
            type: ["string", "null"],
          },
        },
      }),
      res: ajv.compile({
        type: "object",
        additionalProperties: false,
        required: ["timestamp", "result", "players"],
        properties: {
          timestamp: schemas.commons.timestamp,
          result: schemas.response.properties.result,
          players: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "username",
                "name",
                "surname",
                "email",
                "wristbandMerged",
                "wristband",
              ],
              properties: {
                username: schemas.player.properties.username,
                name: schemas.player.properties.name,
                surname: schemas.player.properties.surname,
                email: schemas.player.properties.email,
                wristbandMerged: schemas.player.properties.wristbandMerged,
                wristband: {
                  anyOf: [
                    {
                      type: "object",
                      additionalProperties: false,
                      required: ["wristbandNumber", "wristbandColor", "active"],
                      properties: {
                        wristbandNumber:
                          schemas.wristband.properties.wristbandNumber,
                        wristbandColor:
                          schemas.wristband.properties.wristbandColor,
                        active: schemas.wristband.properties.active,
                      },
                    },
                    { type: "null" },
                  ],
                },
              },
            },
          },
        },
      }),
    },
    alias: "player/search",
    pub: prefix("player/search"),
    sub: prefix("player/search/response"),
  },
};

function basename(path) {
  return `IN_AFADMIN_SERVER_URL_BASENAME/${path}`;
}
function prefix(path) {
  return basename("${deviceId}/gui/" + path);
}
function addOrigin(topics) {
  return Object.entries(topics).reduce(
    (car, [k, { pub, sub, ...props } = {}]) =>
      Object.assign(car, {
        [k]: {
          ...props,
          sub: !!sub ? `IN_AFADMIN_SERVER_URL_ORIGIN/${sub}` : null,
          pub: !!pub ? `IN_AFADMIN_SERVER_URL_ORIGIN/${pub}` : null,
        },
      }),
    {},
  );
}
function toServer(topics) {
  return Object.entries(topics).reduce(
    (car, [k, { pub, sub, ...props } = {}]) => {
      return Object.assign(car, {
        [k]: {
          ...props,
          pub: sub || null,
          sub: pub || null,
        },
      });
    },
    {},
  );
}

function removeSchema(topics) {
  return Object.entries(topics).reduce(
    (car, [k, { alias, pub, sub } = {}]) =>
      Object.assign(car, {
        [k]: { alias, pub, sub },
      }),
    {},
  );
}

function toJson(topics) {
  return JSON.stringify(topics);
}

const scriptPath = globalThis.process?.argv[1] ?? "";
if (/backend-topics\.js/.test(scriptPath)) {
  const _toJson = process.argv.includes("--to-json");
  const _toServer = process.argv.includes("--to-server");
  const _addOrigin = process.argv.includes("--add-origin");
  let _registrationTopics = registrationTopics;
  let _rpiReaderTopics = rpiReaderTopics;

  if (_addOrigin) {
    _registrationTopics = addOrigin(_registrationTopics);
    _rpiReaderTopics = addOrigin(_rpiReaderTopics);
  }
  if (_toServer) {
    _registrationTopics = toServer(_registrationTopics);
    _rpiReaderTopics = toServer(_rpiReaderTopics);
  }
  const _topics = {
    registration: removeSchema(_registrationTopics),
    rpiReader: removeSchema(_rpiReaderTopics),
  };
  console.log(_toJson ? toJson(_topics) : _topics);
}

export { registrationTopics, rpiReaderTopics, toServer, toJson, addOrigin };
