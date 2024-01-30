import * as schemas from "./backend-api/schemas/index.js";
import deepmerge from "deepmerge";
import Ajv from "ajv";
const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
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
            deviceId: schemas.device.properties.deviceId,
            deviceType: schemas.device.properties.deviceType,
            roomName: schemas.device.properties.roomType,
          },
        }),
      ),
      res: ajv.compile(
        deepmerge(schemas.response, {
          additionalProperties: false,
          required: ["timestamp", "result", "deviceType", "roomName"],
          properties: {
            deviceType: schemas.device.properties.deviceType,
            roomName: schemas.device.properties.roomType,
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
        /*
          timestamp: 1706445720753,
          result: 'OK',
          wristbandNumber: 169,
          wristbandColor: 2
         */
        type: "object",
        additionalProperties: true,
        required: ["unsubed"],
        properties: {
          unsubed: { type: "boolean" },
          wristband: {
            type: "object",
            nullable: true,
            required: [
              "timestamp",
              "result",
              "wristbandNumber",
              "wristbandColor",
            ],
            properties: {
              ...schemas.response.properties,
              ...schemas.wristband.properties,
            },
          },
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
        /*
          timestamp: 1706449278756,
          username: 'Fingolfin_1iq9nl30j8fg',
          wristbandNumber: 169
         */
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
        /*
          timestamp: 1706449278833,
          result: 'OK',
          message: '...'
         */
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
        /*
          timestamp: 1706455867765,
          username: 'Merry_2mpmnxcgv1s',
          wristbandNumber: 202
         */
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
        /*
          timestamp: 1706455867824,
          result: 'OK',
          message: 'successfully unregisterWristbandToPlayer'
         */
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
  mergeTeam: {
    alias: "team/merge",
    pub: prefix("team/merge"),
    sub: prefix("team/merge/response"),
  },
  mergeGroupTeam: {
    alias: "gteam/merge",
    pub: prefix("/groupteam/merge"),
    sub: prefix("/groupteam/merge/response"),
  },
  isValidWristband: {
    alias: "wristband/validate",
    pub: prefix("player/isValid"),
    sub: prefix("player/isValid/response"),
  },
  getWristbandInfo: {
    schema: {
      req: ajv.compile({
        /*
          timestamp: 1706452787659,
          wristbandNumber: 169
         */
        type: "object",
        required: ["timestamp", "wristbandNumber"],
        additionalProperties: false,
        properties: {
          timestamp: schemas.commons.timestamp,
          wristbandNumber: schemas.wristband.properties.wristbandNumber,
        },
      }),
      res: ajv.compile({
        /*
          timestamp: 1706454527907,
          result: 'OK',
          wristband: { wristbandNumber: 169, wristbandColor: 2, active: false }
         */
        /*
          timestamp: 1706452787745,
          result: 'NOK',
          message: 'wristband with number: 169 is already registered'
         */
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
  addTeamPkg: {
    alias: "team/pkg/add",
    pub: prefix("team/package/add"),
    sub: prefix("team/package/add/response"),
  },
  removeTeamPkg: {
    alias: "team/pkg/delete",
    pub: prefix("team/package/delete"),
    sub: prefix("team/package/delete/response"),
  },
  activateTeamPkg: {
    schema: {
      res: {},
    },
    alias: "team/pkg/activate",
    pub: prefix("team/activate"),
    subd: prefix("team/activate/response"),
  },
  registerCashier: {
    alias: "cashier/register",
    pub: basename("signup"),
    sub: basename("signup/response"),
  },
  loginCashier: {
    alias: "cashier/login",
    pub: basename("signin"),
    sub: basename("signin/response"),
  },
  removeCashier: {
    alias: "cashier/delete",
    pub: prefix("users/cashiers/delete"),
    sub: prefix("users/cashiers/delete/response"),
  },
  startSession: {
    alias: "session/start",
    pub: basename("startSession"),
    sub: basename("startSession/response"),
  },
  stopSession: {
    alias: "session/stop",
    pub: basename("endSession"),
    sub: basename("endSession/response"),
  },
  updateDevice: {
    alias: "device/update",
    pub: prefix("devices/action"),
    sub: prefix("devices/action/response"),
  },
  updateDeviceScoreboardView: {
    alias: "/scoreboard/devices/views/update",
    pub: basename("devices/scoreboard/updateStatus"),
    sub: basename("devices/scoreboard/updateStatus/response"),
  },
  //////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////
  listPlayers: {
    alias: "list/players",
    pub: prefix("player/all/search"),
    sub: prefix("player/all/search/response"),
  },
  listPlayersWristbanded: {
    alias: "search/players/wristbanded",
    pub: prefix("player/available/search"),
    sub: prefix("player/available/search/response"),
  },
  listPkgs: {
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
    alias: "list/pkgs",
    pub: prefix("packages/all"),
    sub: prefix("packages/all/response"),
  },
  listTeams: {
    scheam: {
      res: {
        /*
{
  "name": "boring_Merry_6lc",
  "totalPoints": 0,
  "teamState": "FINISHED",
  "created": 1706473314534,
  "lastRegisterAttempt": null,
  "currentRoster": {
    "version": 1,
    "players": [
      {
        "username": "avaapw7h8jc",
        "wristbandNumber": null,
        "wristbandColor": null
      },
      {
        "username": "wn6wrmsaj4",
        "wristbandNumber": null,
        "wristbandColor": null
      }
    ]
  },
  "roomType": null,
  "packages": [
    {
      "id": 3,
      "name": "Per Time 30",
      "cost": null,
      "started": 1706473426225,
      "ended": 1706478843795,
      "duration": 1800,
      "paused": false,
      "active": false
    }
  ]
}
         */
      },
    },
    alias: "list/teams",
    pub: prefix("teams/all"),
    sub: prefix("teams/all/response"),
  },
  listCashiers: {
    alias: "list/cashiers",
    pub: prefix("users/cashiers"),
    sub: prefix("users/cashiers/response"),
  },
  listDevices: {
    alias: "list/devices",
    pub: basename("devices"),
    sub: basename("devices/response"),
  },
  listDevicesScoreboard: {
    alias: "list/devices/scoreboard",
    pub: basename("devices/scoreboard"),
    sub: basename("devices/scoreboard/response"),
  },
  listDevicesScoreboardViews: {
    alias: "/scoreboard/devices/views",
    pub: basename("devices/scoreboard/updateStatus/options"),
    sub: basename("devices/scoreboard/updateStatus/options/response"),
  },
  listScoreboard: {
    alias: "/scoreboard",
    pub: basename("scoreboard"),
    sub: basename("scoreboard/response"),
  },
  //////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////
  searchPlayers: {
    alias: "search/player",
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
          sub: !!sub ? `IN_AFADMIN_SERVER_URL_ORIGIN${sub}` : null,
          pub: !!pub ? `IN_AFADMIN_SERVER_URL_ORIGIN${pub}` : null,
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
    registration: _registrationTopics,
    rpiReader: _rpiReaderTopics,
  };
  console.log(_toJson ? toJson(_topics) : _topics);
}

export { registrationTopics, rpiReaderTopics, toServer, toJson, addOrigin };
