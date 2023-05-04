/*
  exports:
  - toClient
     The TOPICS array from the perspective of the client,
     stripped to include only:
     { alias: "topic", pub: "topic", sub: "topic" }

  - toServer
     The TOPICS array from the perspective of the server,
     stripped to include only:
     { alias: "topic", pub: "topic", sub: "topic" }

  - makeTopics
  - TOPICS

  The TOPICS array serves both as documentation for the API and as
  input to the makeTopics function.

  Each topic is composed of:

  an alias, a publish section and a subscription section.

  Both pub,sub include a payloads array.

  The payloads array across sections correspond to each other.
  Meaning that, the 1st payload of the *pub* section resulted in the 1st
  payload of the *sub* section.

  If a topic pub,sub section is null, that means that this topic cannot
  be subscribed or published to.
 */

function MakeTopics() {
  this._current = [];
  this.toServer = () => {
    let tmp;
    this._current = TOPICS.map((t) => {
      tmp = t.pub;
      t.pub = t.sub;
      t.sub = tmp;
      return t;
    });
    return this;
  };
  this.toClient = () => this;
  this.strip = () => {
    this._current = TOPICS.map((t) => ({
      alias: t.alias,
      pub: t.pub?.topic || t.pub,
      sub: t.sub?.topic || t.sub,
    }));
    return this;
  };
  this.get = () => this._current;
}

const PREFIX = "/themaze/${clientId}/gui";
const TOPICS = [
  /* ------------------------------ Boot ------------------------------ */
  {
    alias: "/boot",
    pub: {
      topic: "/themaze/booted",
      payloads: [],
    },
    sub: {
      topic: "/themaze/booted/${clientId}",
      payloads: [],
    },
  },
  /* -------------------------- Player register ------------------------------ */
  {
    alias: "/player/register",
    pub: {
      topic: `${PREFIX}/player/registration`,
      payloads: [
        {
          username: "something",
          name: "yolo",
          surname: "yolo3",
          email: "email@gmail.com",
          password: "yolololo",
        },
        {
          timestamp: 1679577924736,
          result: "OK",
          player: {
            name: null,
            surname: null,
            username: "yolo4",
            email: "yolo4@yolo4.com",
          },
        },
      ],
    },
    sub: {
      topic: `${PREFIX}/player/registration/response`,
      payloads: [
        {
          timestamp: 1679566508599,
          result: "NOK",
          message: "This username already exists",
        },
        {
          timestamp: 1679566496366,
          result: "NOK",
          validationErrors: {
            email: "invalid",
          },
        },
        {
          timestamp: 1679566800441,
          result: "NOK",
          validationErrors: {
            surname: "empty",
            name: "empty",
            email: "empty",
          },
        },
        {
          timestamp: 1679566847776,
          result: "NOK",
          message:
            'Unrecognized field "confirmPassword" (class gr.agentfactory.services.player.messages.PlayerRegistrationMessage), not marked as ignorable (6 known properties: "timestamp", "name", "email", "username", "surname", "password"])\n at [Source: (byte[])"{"username":"yolo3","surname":"","name":"","email":"","password":"","confirmPassword":"...."}"; line: 1, column: 88] (through reference chain: gr.agentfactory.services.player.messages.PlayerRegistrationMessage["confirmPassword"])',
        },
      ],
    },
  },

  // ------------------------------ Player login ------------------------------ //
  {
    alias: "/player/login",
    pub: {
      topic: `${PREFIX}/player/login`,
      payloads: [
        {
          username: "yolo4",
          password: "yolo4",
        },
        {
          username: Math.random().toString(36).substring(2, 12),
          password: Math.random().toString(36).substring(2, 12),
        },
        {
          username: "yolo4",
          password: null,
        },
      ],
    },
    sub: {
      topic: `${PREFIX}/player/login/response`,
      payloads: [
        {
          timestamp: 1679578726601,
          result: "OK",
          player: {
            name: null,
            surname: null,
            username: "yolo4",
            email: "yolo4@yolo4.com",
          },
        },
        {
          timestamp: 1679578668527,
          result: "NOK",
          message: "Wrong username and/or password",
        },
        {
          timestamp: 1679578603820,
          result: "NOK",
          validationErrors: {
            password: "empty",
          },
        },
        {
          timestamp: 1679578443864,
          result: "NOK",
          message:
            'Unrecognized field "surname" (class gr.agentfactory.services.player.messages.PlayerLoginMessage), not marked as ignorable (3 known properties: "password", "timestamp", "username"])\n at [Source: (byte[])"{"username":"yolo4","surname":"yolo4","name":"yolo4","email":"yolo4@yolo4.com","password":"yolo4"}"; line: 1, column: 32] (through reference chain: gr.agentfactory.services.player.messages.PlayerLoginMessage["surname"])',
        },
      ],
    },
  },

  // ------------------------------ Player Search ------------------------------ //
  {
    alias: "/player/search",
    pub: {
      topic: `${PREFIX}/player/search`,
      payloads: [
        {
          timestamp: 1234234324,
          searchTerm: "TG1",
        },
        {
          timestamp: 1232456789,
          searchTerm: "@maze.com",
        },
        {
          timestamp: 123456789,
          searchTerm: "",
        },
        {
          timestamp: 12345689,
          searchTerm: "$$$$$$$$$$$$$$",
        },
      ],
    },
    sub: {
      topic: `${PREFIX}/player/search/response`,
      payloads: [
        {
          timestamp: 1681298866176,
          result: "OK",
          players: [
            {
              username: "TG1",
              name: null,
              surname: null,
              email: "TG1@maze.com",
              wristbandMerged: false,
              wristband: null,
            },
            {
              username: "TG10",
              name: null,
              surname: null,
              email: "TG10@maze.com",
              wristbandMerged: false,
              wristband: null,
            },
          ],
        },
        {
          timestamp: 1681298981576,
          result: "OK",
          players: [
            {
              username: "TG1",
              name: null,
              surname: null,
              email: "TG1@maze.com",
              wristbandMerged: false,
              wristband: null,
            },
            {
              username: "TG2",
              name: null,
              surname: null,
              email: "TG2@maze.com",
              wristbandMerged: false,
              wristband: null,
            },
          ],
        },
        {
          timestamp: 1681299099212,
          result: "NOK",
          message: "empty search term",
        },
        {
          timestamp: 1681299125922,
          result: "OK",
          players: [],
        },
      ],
    },
  },

  // ------------------------------ WRISTBAND SCAN ------------------------------ //
  {
    alias: "/wristband/scan",
    pub: null,
    sub: {
      topic: `${PREFIX}/player/wristbandScan`,
      payloads: [
        {
          timestamp: 1679582297148,
          result: "OK",
          wristbandNumber: 32,
          wristbandColor: 3,
        },
      ],
    },
  },

  // ------------------------------ WRISTBAND REGISTER  ------------------------ //
  {
    alias: "/wristband/register",
    pub: {
      topic: "/themaze/${clientId}/gui/player/registerWristband",
      payloads: [
        {
          timestamp: 1234678999,
          username: "yolo1",
          wristbandNumber: 19,
        },
      ],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/player/registerWristband/response",
      payloads: [
        {
          timestamp: 123456789,
          result: "OK",
          message: "successfully registerWristbandToPlayer",
        },
      ],
    },
  },

  // ------------------------------ UNREGISTER WRISTBAND ----------------------- //

  {
    alias: "/wristband/unregister",
    pub: {
      topic: "/themaze/${clientId}/gui/player/unregisterWristband",
      payloads: [],
    },
    sub: {
      topic: "/themaze/${clientId}/gui/player/unregisterWristband/response",
      payloads: [],
    },
  },

  // All Registered players
  {
    alias: "/players/list",
    pub: "/themaze/${clientId}/gui/player/all/search",
    sub: "/themaze/${clientId}/gui/player/all/search/response",
  },

  // Wristband validate
  {
    alias: "/wristband/isValid",
    pub: "/themaze/${clientId}/gui/player/isValid",
    sub: "/themaze/${clientId}/gui/player/isValid/response",
  },
  // Wristband info
  {
    alias: "/wristband/info",
    pub: "/themaze/${clientId}/wristband/info",
    sub: "/themaze/${clientId}/wristband/info/response",
  },
  // Teams list
  {
    alias: "/teams/list",
    pub: "/themaze/${clientId}/gui/teams/all",
    sub: "/themaze/${clientId}/gui/teams/all/response",
  },
  // Create group team
  {
    alias: "/groupteam/merge",
    pub: "/themaze/${clientId}/gui/groupteam/merge",
    sub: "/themaze/${clientId}/gui/groupteam/merge/response",
  },
  // Create normal team
  {
    alias: "/team/merge",
    pub: "/themaze/${clientId}/gui/team/merge",
    sub: "/themaze/${clientId}/gui/team/merge/response",
  },
  // Packages list
  {
    alias: "/packages/list",
    pub: "/themaze/${clientId}/gui/packages/all",
    sub: "/themaze/${clientId}/gui/packages/all/response",
  },
  // Add package to team
  {
    alias: "/team/package/add",
    pub: "/themaze/${clientId}/gui/team/package/add",
    sub: "/themaze/${clientId}/gui/team/package/add/response",
  },
  // Remove package from team
  {
    alias: "/team/package/delete",
    pub: "/themaze/${clientId}/gui/team/package/delete",
    sub: "/themaze/${clientId}/gui/team/package/delete/response",
  },
  // Active package
  {
    alias: "/team/activate",
    pub: "/themaze/${clientId}/gui/team/activate",
    sub: "/themaze/${clientId}/gui/team/activate/response",
  },
];

const makeTopics = new MakeTopics();
const toClient = makeTopics.toClient().strip().get();
const toServer = makeTopics.toServer().strip().get();

export { TOPICS, makeTopics, toClient, toServer };
