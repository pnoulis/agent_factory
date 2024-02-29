
# Table of Contents

1.  [About](#org86a67f3)
2.  [Device Tasks](#orgc15b6b2)
    1.  [List Devices](#orgb776718)
        1.  [Client request](#org6d4c5f7)
        2.  [Backend request](#orga8f29a6)
        3.  [Backend response](#org9eecdcb)
        4.  [Client response](#org98d78be)
    2.  [List Scoreboard Devices](#orgae8a017)
        1.  [Client request](#org3c8ec48)
        2.  [Backend request](#org309a696)
        3.  [Backend response](#org26335a7)
        4.  [Client response](#orgac55f28)
    3.  [List Scoreboard Device Views](#org561e2e8)
        1.  [Client request](#orga5a54c7)
        2.  [Backend request](#org0575693)
        3.  [Backend response](#org75e2baa)
        4.  [Client response](#org1283876)
    4.  [Update Scoreboard Device View](#orgce2d5b5)
        1.  [Client request](#org4dca0f0)
        2.  [Backend request](#org7d1240a)
        3.  [Backend response](#org4eeb162)
        4.  [Client response](#org1945097)
    5.  [Boot Device](#org0df4fba)
        1.  [Client request](#org1fb4b52)
        2.  [Backend request](#org873481f)
        3.  [Backend response](#orgead370e)
        4.  [Client response](#org7e25882)
    6.  [Shutdown Device](#org8bcc155)
        1.  [Client request](#org937bb5c)
        2.  [Backend request](#orge5c39c1)
        3.  [Backend response](#org8c0d951)
        4.  [Client response](#org4884c36)
    7.  [Restart Device](#orga338a8b)
        1.  [Client request](#org9b9d9f2)
        2.  [Backend request](#org198af43)
        3.  [Backend response](#orgeec90da)
        4.  [Client response](#orgcf06bd7)
3.  [Scoreboard Tasks](#orgf23112c)
    1.  [List Scoreboard](#org251ba83)
        1.  [Client request](#org2885f56)
        2.  [Backend request](#orgaf116cf)
        3.  [Backend response](#org69b9d4b)
        4.  [Client response](#org8455e11)
4.  [Player Tasks](#org1174430)
    1.  [List Registered Players](#org5e5431d)
        1.  [Client request](#orgfa137df)
        2.  [Backend request](#org0c9106d)
        3.  [Backend response](#org6038d24)
        4.  [Client response](#org500245b)
    2.  [List Players with a Wristband](#org159ffa5)
        1.  [Client request](#org9f45691)
        2.  [Backend request](#org9a04ef7)
        3.  [Backend response](#orgccd04ac)
        4.  [Client response](#orgbb55afa)
    3.  [Search Player](#orgff3ecbe)
        1.  [Client request](#org5aac102)
        2.  [Backend request](#org9e32a80)
        3.  [Backend response](#org7296975)
        4.  [Client response](#orge1fbf89)
    4.  [Register Player](#org35ba583)
        1.  [Client request](#org29e20c2)
        2.  [Backend request](#org0637e7f)
        3.  [Backend response](#org69f5787)
        4.  [Client response](#orge03f6b4)
5.  [Wristband Tasks](#org2727b3d)
    1.  [Register Wristband](#org8d7f454)
        1.  [Client request](#org545bfb2)
        2.  [Backend request](#orgef5bec0)
        3.  [Backend response](#orgdf2a67c)
        4.  [Client response](#org271c101)
    2.  [Deregister Wristband](#org1103dd1)
        1.  [Client request](#orgdfcb8c1)
        2.  [Backend request](#orge028f44)
        3.  [Backend response](#org15e1757)
        4.  [Client response](#org37070b1)
    3.  [Get Wristband Information](#orged72643)
        1.  [Client request](#org17578e3)
        2.  [Backend request](#orgc0a33c8)
        3.  [Backend response](#org28f403e)
        4.  [Client response](#orgec285bb)
    4.  [Scan Wristband](#org979492f)
        1.  [Client request](#orgb557de8)
        2.  [Backend request](#orgb19849e)
        3.  [Backend response](#orgadb358f)
        4.  [Client request](#org9416bb2)
6.  [Cashier Tasks](#org6f75e92)
    1.  [List Cashiers](#org352c158)
        1.  [Client request](#orgbb84adb)
        2.  [Backend request](#org8ac8996)
        3.  [Backend response](#orgf45e79a)
        4.  [Client response](#org915520a)
    2.  [Login Cashier](#org0432357)
        1.  [Client request](#org662d432)
        2.  [Backend request](#orgbf38b78)
        3.  [Backend response](#orga0d26de)
        4.  [Client response](#orgd8d2ab7)
    3.  [Register Cashier](#orgac6f5c2)
        1.  [Client request](#org6ae7cf1)
        2.  [Backend request](#orga473317)
        3.  [Backend response](#orgde5fb3c)
        4.  [Client response](#org49baa9f)
    4.  [Deregister Cashier](#org5b46335)
        1.  [Client request](#org24f3e82)
        2.  [Backend request](#org1585cec)
        3.  [Backend response](#org134b451)
        4.  [Client response](#org47b2756)
7.  [Package Tasks](#orgada0183)
    1.  [List Packages](#org6ac0fd2)
        1.  [Client request](#org2bd75cc)
        2.  [Backend request](#org9018d1d)
        3.  [Backend response](#orgc4463d5)
        4.  [Client response](#org5ff8731)
8.  [Team Tasks](#org8fe1892)
    1.  [Register Team](#orgcd7cb35)
        1.  [Client request](#org85ec9be)
        2.  [Backend request](#org96947c1)
        3.  [Backend response](#org4b3e1b7)
        4.  [Client response](#org439f839)
    2.  [Register Team Package](#orga9d7595)
        1.  [Client request](#orga15b76d)
        2.  [Backend request](#org6a161f3)
        3.  [Backend response](#org272b428)
        4.  [Client response](#orgf18aa36)
    3.  [Deregister Team Package](#org8251f2f)
        1.  [Client request](#orgc66085e)
        2.  [Backend request](#org9ddf09c)
        3.  [Backend response](#orgc117d2b)
        4.  [Client response](#org9e30387)
    4.  [Start team](#orgf181da2)
        1.  [Client request](#org42edf29)
        2.  [Backend request](#org37576c6)
        3.  [Backend response](#org52d03d8)
        4.  [Client response](#org0537be4)
    5.  [Find Team](#org54b4aaf)
        1.  [Client request](#orgde78033)
        2.  [Client response](#orgcf3f7a9)
9.  [Session Tasks](#org6b765d8)
    1.  [List Session](#org888bd75)
        1.  [Backend response](#orgcedeb19)
        2.  [Client response](#org355fef5)
    2.  [Start Session](#org65b658d)
        1.  [Client request](#org4321859)
        2.  [Backend request](#org60591e9)
        3.  [Backend response](#orgfa27392)
        4.  [Client request](#orgde055bf)
    3.  [Stop Session](#org2e96869)
        1.  [Client request](#orgd69c6b0)
        2.  [Backend request](#org01c2f02)
        3.  [Backend response](#org5296ab4)
        4.  [Client response](#orgee59a5c)
    4.  [Stop Sesson force](#org45699bd)
10. [The Command pattern](#orgb9c79a6)
11. [Conventions](#orgff12d70)
    1.  [Command inputs and outputs](#org354ed9d)
    2.  [Commands wrap their return value within an object](#orgaae9550)
12. [Normalization functions](#org267309d)
    1.  [Inputs](#org635bcf8)
    2.  [Deducing state](#org3a6f6f9)
13. [Schemas](#org5904f58)
    1.  [Package](#org607c806)
        1.  [AFM Time](#org3b739dc)
        2.  [AFM Missions](#orgb9bb0d4)
        3.  [Backend Time](#org31f422e)
        4.  [Backend Missions](#org3c8bcab)
        5.  [Available Backend packages](#orgc2fb5f7)
    2.  [Device](#org14086e1)
        1.  [AFM rpi reader](#orgcca182b)
        2.  [AFM admin screen](#org8ccb281)
        3.  [Backend](#orgfc0aac7)
    3.  [Cashier](#org111176c)
        1.  [AFM](#org568f849)
    4.  [Player](#org107294c)
        1.  [AFM](#orgcf2ef15)
        2.  [Backend](#org902f164)
    5.  [Team](#org89a7f7e)
    6.  [Wristband](#orgbc4aa12)
        1.  [AFM](#org13f97da)
        2.  [Backend](#org116e3de)


<a id="org86a67f3"></a>

# About

Documentation for the Backend API and architecture of the Client.


<a id="orgc15b6b2"></a>

# Device Tasks


<a id="orgb776718"></a>

## List Devices


<a id="org6d4c5f7"></a>

### Client request

    // 1st argument, optional, options
    {
      queue: true || false
    }


<a id="orga8f29a6"></a>

### Backend request

    {
      timestamp: 1706709130813,
    }


<a id="org9eecdcb"></a>

### Backend response

      {
      timestamp: 1706709130813,
      result: 'OK',
      devices: [
        {
          deviceType: 'SCOREBOARD_SCREEN',
          roomType: 'SCOREBOARD1',
          deviceId: 'scor1',
          macAddress: null,
          ipAddress: null,
          bootedTimestamp: 1702243701606
        },
        {
          deviceType: 'SCOREBOARD_SCREEN',
          roomType: 'SCOREBOARD2',
          deviceId: 'scor2',
          macAddress: null,
          ipAddress: null,
          bootedTimestamp: 1702243701625
        },
        {
          deviceType: 'REGISTRATION_SCREEN',
          roomType: 'ADMINISTRATION1',
          deviceId: '001',
          macAddress: null,
          ipAddress: null,
          bootedTimestamp: 1706707719741
        },
        {
          deviceType: 'RPI_READER',
          roomType: 'ADMINISTRATION1',
          deviceId: 'ADMINISTRATION1Reader',
          macAddress: null,
          ipAddress: null,
          bootedTimestamp: 1705889333198
        }
      ]
    }


<a id="org98d78be"></a>

### Client response

    {
      ok: true,
      devices: [
        {
          id: 'scor1',
          type: 'SCOREBOARD_SCREEN',
          room: 'SCOREBOARD1',
          view: null
        },
        {
          id: 'scor2',
          type: 'SCOREBOARD_SCREEN',
          room: 'SCOREBOARD2',
          view: null
        },
        {
          id: '001',
          type: 'REGISTRATION_SCREEN',
          room: 'ADMINISTRATION1',
          view: null
        },
        {
          id: 'ADMINISTRATION1Reader',
          type: 'RPI_READER',
          room: 'ADMINISTRATION1',
          view: null
        }
      ]
    }


<a id="orgae8a017"></a>

## List Scoreboard Devices


<a id="org3c8ec48"></a>

### Client request

    // 1st argument, optional, options
    {
      queue: true | false
    }


<a id="org309a696"></a>

### Backend request

    {
      timestamp: 1706711522546,
    }


<a id="org26335a7"></a>

### Backend response

    {
      timestamp: 1706711522546,
      result: 'OK',
      scoreboardDevices: [
        {
          deviceId: 'scor1',
          deviceType: 'SCOREBOARD_SCREEN',
          roomType: 'SCOREBOARD1',
          status: 'ROTATING'
        },
        {
          deviceId: 'scor2',
          deviceType: 'SCOREBOARD_SCREEN',
          roomType: 'SCOREBOARD2',
          status: 'MONTHLY'
        }
      ]
    }


<a id="orgac55f28"></a>

### Client response

    {
      ok: true,
      scoreboardDevices: [
        {
          id: 'scor1',
          type: 'SCOREBOARD_SCREEN',
          room: 'SCOREBOARD1',
          view: 'ROTATING'
        },
        {
          id: 'scor2',
          type: 'SCOREBOARD_SCREEN',
          room: 'SCOREBOARD2',
          view: 'MONTHLY'
        }
      ]
    }


<a id="org561e2e8"></a>

## List Scoreboard Device Views


<a id="orga5a54c7"></a>

### Client request

    // 1st argument, optional, options
    {
      queue: true | false
    }


<a id="org0575693"></a>

### Backend request

    {
      timestamp: 1706712075044,
    }


<a id="org75e2baa"></a>

### Backend response

    {
      timestamp: 1706712075044,
      result: 'OK',
      scoreboardStatuses: [
        'ROTATING',
        'ALL_TIME',
        'MONTHLY',
        'WEEKLY',
        'DAILY',
        'ELEMENTS',
        'ROOMS'
      ]
    }


<a id="org1283876"></a>

### Client response

    {
      ok: true,
      scoreboardViews: [
        'ROTATING',
        'ALL_TIME',
        'MONTHLY',
        'WEEKLY',
        'DAILY',
        'ELEMENTS',
        'ROOMS'
      ]
    }


<a id="orgce2d5b5"></a>

## Update Scoreboard Device View


<a id="org4dca0f0"></a>

### Client request

    // 1st argument, device
    {
      id: 'scor1',
      type: 'SCOREBOARD_SCREEN',
      room: 'SCOREBOARD1',
      view: 'ROTATING'
    }
    
    // 2nd argument, new View
    view: "string",
    
    // 3rd argument, options, optional
    {
      queue: true || false
    }


<a id="org7d1240a"></a>

### Backend request

    {
      timestamp : 1707072209571,
      deviceId : "scor1",
      status : "WEEKLY"
    }


<a id="org4eeb162"></a>

### Backend response

    {
      timestamp : 1707072209641,
      result : "OK"
    }


<a id="org1945097"></a>

### Client response

    {
      ok: true,
      device: {
        id: 'scor1',
        type: 'SCOREBOARD_SCREEN',
        room: 'SCOREBOARD1',
        view: 'new view'
      }
    }


<a id="org0df4fba"></a>

## Boot Device


<a id="org1fb4b52"></a>

### Client request

    // 1st argument, optional, device
    {
      id: "",
    }
    // 2nd argument, optional, options
    {
      queue: true | false
    }


<a id="org873481f"></a>

### Backend request

    // Boot the device identified by deviceId
    {
      timestamp: 1706724066778,
      devicesAction: "WAKE_UP",
      deviceId: "someDevice"
    }
    
    // Boot all devices
    {
      timestamp: 1706724066778,
      devicesAction: "WAKEUP_ALL",
      deviceId: "",
    }


<a id="orgead370e"></a>

### Backend response

    {
      timestamp: 1706724066778,
      result: 'OK',
      message: 'action executed'
    }


<a id="org7e25882"></a>

### Client response

    {
      device: null || {
        id: "",
      }
    }


<a id="org8bcc155"></a>

## Shutdown Device


<a id="org937bb5c"></a>

### Client request

    // 1st argument, optional, device
    {
      id: "",
    }
    // 2nd argument, optional, options
    {
      queue: true | false
    }


<a id="orge5c39c1"></a>

### Backend request

    // Shutdown the device identified by deviceId
    {
      timestamp: 1706724066778,
      devicesAction: "SHUTDOWN",
      deviceId: "someDevice"
    }
    
    // Shutdown all devices
    {
      timestamp: 1706724066778,
      devicesAction: "SHUTDOWN_ALL",
      deviceId: "",
    }


<a id="org8c0d951"></a>

### Backend response

    {
      timestamp: 1706726298103,
      result: 'OK',
      message: 'action executed'
    }


<a id="org4884c36"></a>

### Client response

    {
      ok: true,
      device: null || {
        id: ""
      }
    }


<a id="orga338a8b"></a>

## Restart Device


<a id="org9b9d9f2"></a>

### Client request

    // 1st argument, optional, device
    {
      id: "",
    }
    // 2nd argument, optional, options
    {
      queue: true | false
    }


<a id="org198af43"></a>

### Backend request

    // Shutdown the device identified by deviceId
    {
      timestamp: 1706724066778,
      devicesAction: "RESTART",
      deviceId: "someDevice"
    }
    
    // Shutdown all devices
    {
      timestamp: 1706724066778,
      devicesAction: "RESTART_ALL",
      deviceId: "",
    }


<a id="orgeec90da"></a>

### Backend response

    { timestamp: 1706726929389,
      result: 'OK',
      message: 'action executed'
    }


<a id="orgcf06bd7"></a>

### Client response

    {
      ok: true,
      device: null || {
        id: ""
      }
    }


<a id="orgf23112c"></a>

# Scoreboard Tasks


<a id="org251ba83"></a>

## List Scoreboard


<a id="org2885f56"></a>

### Client request

    // 1st argument, optional, options
    {
      queue: true | false
    }


<a id="orgaf116cf"></a>

### Backend request

    {
      timestamp: 1706716622912,
    }


<a id="org69b9d4b"></a>

### Backend response

    {
      timestamp: 1706716622912,
      result: 'OK',
      roomElementAssociations: {
        JOKER: 'AIR',
        BUBBLEBOBBLE: 'WATER',
        SUCKERPUNCH: 'FIRE',
        GRANDPIANO: 'AIR',
        JUSTDOIT: 'FIRE',
        REFLECTIONS: 'AIR',
        SPECTRUMDICE: 'AIR',
        HIGHLIGHTBARS: 'AIR',
        LASERDANCE: 'WATER',
        FUNINTHEBARN: 'FIRE',
        SPACEJAM: 'WATER',
        ALLEYOOPS: 'WATER',
        GOAL: 'WATER',
        LETTERFLOOR: 'AIR'
      }
      live: [
        {
          teamName: "",
          numberOfPlayers: "",
          timeUsed: "",
          played: "",
          won: "",
          lost: "",
          totalPoints: ""
        }],
      teamAllTime: [],
      teamMonthly: [],
      teamWeekly: [],
      teamDaily: [],
    
      perRoom: {
        JUSTDOIT: [
          {
            teamName: 'team6',
            totalPoints: 298,
            numberOfPlayers: 2,
            created: 1702243702887
          },
        ],
        SUCKERPUNCH: [
          {
            teamName: 'team13',
            totalPoints: 297,
            numberOfPlayers: 2,
            created: 1702243704124
          },
        ],
        LASERDANCE: [
          {
            teamName: 'team5',
            totalPoints: 293,
            numberOfPlayers: 2,
            created: 1702243702676
          },
        ],
        SPECTRUMDICE: [
          {
            teamName: 'team18',
            totalPoints: 288,
            numberOfPlayers: 2,
            created: 1702243704904
          },
        ],
        FUNINTHEBARN: [
          {
            teamName: 'team2',
            totalPoints: 284,
            numberOfPlayers: 2,
            created: 1702243702245
          },
        ],
        SPACEJAM: [
          {
            teamName: 'team7',
            totalPoints: 290,
            numberOfPlayers: 2,
            created: 1702243703043
          },
        ],
        LETTERFLOOR: [
          {
            teamName: 'team10',
            totalPoints: 265,
            numberOfPlayers: 2,
            created: 1702243703549
          },
        ],
        ALLEYOOPS: [
          {
            teamName: 'team16',
            totalPoints: 297,
            numberOfPlayers: 2,
            created: 1702243704522
          },
        ],
        GRANDPIANO: [
          {
            teamName: 'team4',
            totalPoints: 291,
            numberOfPlayers: 2,
            created: 1702243702512
          },
        ],
        BUBBLEBOBBLE: [
          {
            teamName: 'team2',
            totalPoints: 285,
            numberOfPlayers: 2,
            created: 1702243702213
          },
        ],
        JOKER: [
          {
            teamName: 'team6',
            totalPoints: 283,
            numberOfPlayers: 2,
            created: 1702243702860
          },
        ],
        HIGHLIGHTBARS: [
          {
            teamName: 'team10',
            totalPoints: 298,
            numberOfPlayers: 2,
            created: 1702243703579
          },
        ]
      },
      perElement: {
        FIRE: [
          {
            teamName: 'team6',
            totalPoints: 298,
            numberOfPlayers: 2,
            created: 1702243702887
          },
        ],
        AIR: [
          {
            teamName: 'team10',
            totalPoints: 298,
            numberOfPlayers: 2,
            created: 1702243703579
          },
        ],
        WATER: [
          {
            teamName: 'team16',
            totalPoints: 297,
            numberOfPlayers: 2,
            created: 1702243704522
          },
        ]
      },
    }


<a id="org8455e11"></a>

### Client response

    {
      ok: true,
      scoreboard: {
        roomElementAssociations: ctx.raw.roomElementAssociations,
        live: ctx.raw.live,
        teamAllTime: ctx.raw.teamAllTime,
        teamMonthly: ctx.raw.teamMonthly,
        teamWeekly: ctx.raw.teamWeekly,
        teamDaily: ctx.raw.teamDaily,
        perRoom: ctx.raw.perRoom,
        perElement: ctx.raw.perElement,
      }
    }


<a id="org1174430"></a>

# Player Tasks


<a id="org5e5431d"></a>

## List Registered Players


<a id="orgfa137df"></a>

### Client request

    // arg #1, optional, options
    {
      queue: true | false,
    }


<a id="org0c9106d"></a>

### Backend request

    {
      timestamp: 1706642934817,
    }


<a id="org6038d24"></a>

### Backend response

    {
      timestamp: 1706642934817,
      result: 'OK',
      players: [
        {
          username: 'Merry_2mpmnxcgv1s',
          name: 'Merry',
          surname: 'compassionate',
          email: 'Merry@gmail.com',
          wristbandMerged: false,
          wristband: null
        },
        {
          username: 'Wormtongue_klagnkjxqla',
          name: 'Wormtongue',
          surname: 'jovial',
          email: 'Wormtongue@gmail.com',
          wristbandMerged: false,
          wristband: { wristbandNumber: 230, wristbandColor: 3, active: true }
        },
        {
          username: '6t3o5ds227u',
          name: null,
          surname: null,
          email: null,
          wristbandMerged: false,
          wristband: null
        },
        {
          username: 'Elrond_6ofeexn83ma',
          name: 'Elrond',
          surname: 'vigilant',
          email: 'Elrond@gmail.com',
          wristbandMerged: true,
          wristband: { wristbandNumber: 231, wristbandColor: 4, active: true }
        },
        {
          username: 'ppthree',
          name: 'yolothree',
          surname: 'ggthree',
          email: 'ggthree@gmail.com',
          wristbandMerged: false,
          wristband: null
        },
      ]
    }


<a id="org500245b"></a>

### Client response

    {
      ok: true,
      players: [
        {
          username: 'Merry_2mpmnxcgv1s',
          name: 'Merry',
          surname: 'compassionate',
          email: 'Merry@gmail.com',
          state: 'registered',
          wristband: { id: null, color: '', colorCode: null, state: 'unpaired' }
        },
        {
          username: 'Wormtongue_klagnkjxqla',
          name: 'Wormtongue',
          surname: 'jovial',
          email: 'Wormtongue@gmail.com',
          state: 'registered',
          wristband: { id: 230, color: 'green', colorCode: 3, state: 'paired' }
        },
        {
          username: '6t3o5ds227u',
          name: '',
          surname: '',
          email: '',
          state: 'registered',
          wristband: { id: null, color: '', colorCode: null, state: 'unpaired' }
        },
        {
          username: 'Elrond_6ofeexn83ma',
          name: 'Elrond',
          surname: 'vigilant',
          email: 'Elrond@gmail.com',
          state: 'inTeam',
          wristband: { id: 231, color: 'yellow', colorCode: 4, state: 'paired' }
        },
        {
          username: 'ppthree',
          name: 'yolothree',
          surname: 'ggthree',
          email: 'ggthree@gmail.com',
          state: 'registered',
          wristband: { id: null, color: '', colorCode: null, state: 'unpaired' }
        }
      ]
    }


<a id="org159ffa5"></a>

## List Players with a Wristband


<a id="org9f45691"></a>

### Client request

    // 1st argument, optional, options
    {
      queue: true || false
    }


<a id="org9a04ef7"></a>

### Backend request

    {
      timestamp: 1706649848057,
    }


<a id="orgccd04ac"></a>

### Backend response

    const response = {
      timestamp: 1706649848057,
      result: 'OK',
      players: [
        {
          username: 'Gilgalad_wsai1ooow3',
          name: 'Gilgalad',
          surname: 'sweet',
          email: 'Gilgalad@gmail.com',
          wristbandMerged: false,
          wristband: { wristbandNumber: 232, wristbandColor: 4, active: true }
        },
        {
          username: 'Gandalf_deil7sv8j4c',
          name: 'Gandalf',
          surname: 'busy',
          email: 'Gandalf@gmail.com',
          wristbandMerged: false,
          wristband: { wristbandNumber: 233, wristbandColor: 4, active: true }
        },
        {
          username: 'Galadriel_12k3dw52kkhi',
          name: 'Galadriel',
          surname: 'jovial',
          email: 'Galadriel@gmail.com',
          wristbandMerged: false,
          wristband: { wristbandNumber: 235, wristbandColor: 5, active: true }
        }
      ]
    }


<a id="orgbb55afa"></a>

### Client response

    {
      ok: true,
      players: [
        {
          username: 'Gilgalad_wsai1ooow3',
          name: 'Gilgalad',
          surname: 'sweet',
          email: 'Gilgalad@gmail.com',
          state: 'registered',
          wristband: { id: 232, color: 'yellow', colorCode: 4, state: 'paired' }
        },
        {
          username: 'Gandalf_deil7sv8j4c',
          name: 'Gandalf',
          surname: 'busy',
          email: 'Gandalf@gmail.com',
          state: 'registered',
          wristband: { id: 233, color: 'yellow', colorCode: 4, state: 'paired' }
        },
        {
          username: 'Galadriel_12k3dw52kkhi',
          name: 'Galadriel',
          surname: 'jovial',
          email: 'Galadriel@gmail.com',
          state: 'registered',
          wristband: { id: 235, color: 'blue', colorCode: 5, state: 'paired' }
        }
      ]
    }


<a id="orgff3ecbe"></a>

## Search Player


<a id="org5aac102"></a>

### Client request

    // 1st argument
    searchTerm = "string"
    
    // 2nd argument, options, optional
    {
      queue: false || true,
    }


<a id="org9e32a80"></a>

### Backend request

    {
      timestamp : 1707068032950,
      searchTerm : "l"
    }


<a id="org7296975"></a>

### Backend response

    {
      timestamp: 1707067665549,
      result: 'OK',
      players: [
        {
          username: 'jgtcqvlxs6',
          name: 'Tuor',
          surname: 'vigorous',
          email: 'jgtcqvlxs6@gmail.com',
          wristbandMerged: false,
          wristband: null
        },
        {
          username: 'TG96',
          name: null,
          surname: null,
          email: 'TG96@maze.com',
          wristbandMerged: false,
          wristband: null
        },
        {
          username: 'li',
          name: 'Melian',
          surname: 'epic',
          email: 'ki3fc4jx7jp@gmail.com',
          wristbandMerged: false,
          wristband: { wristbandNumber: 329, wristbandColor: null, active: true }
        },
        {
          username: 'lo',
          name: 'Idril',
          surname: 'brave',
          email: 'nsevvxw4ca6@gmail.com',
          wristbandMerged: false,
          wristband: { wristbandNumber: 111, wristbandColor: 2, active: true }
        }
    
      ]
    }


<a id="orge1fbf89"></a>

### Client response

    {
      ok: true,
      players: [
        {
          username: 'pp',
          name: 'pp',
          surname: 'pp',
          email: 'pp@gmail.com',
          state: 'registered',
          wristband: { id: null, color: null, colorCode: null, state: 'unpaired' }
        }
      ]
    }


<a id="org35ba583"></a>

## Register Player


<a id="org29e20c2"></a>

### Client request

    // 1st argument, required, PlayerCommander
    {
      username: 'test',
      name: 'test',
      surname: 'test',
      email: 'testt@gmail.com',
    },
    // 2nd argument, required password
    password: "testpass"
    // 3rd argument, optional, options
    {
      queue: true || false
    }


<a id="org0637e7f"></a>

### Backend request

    {
      timestamp: 1706724066778,
      username: "test",
      surname: "test",
      name: "test",
      email: "test@gmail.com",
      password: "testpass",
    }


<a id="org69f5787"></a>

### Backend response

    {
      timestamp : 1706874481773,
      result : "OK",
      player : {
        name : "test",
        surname : "test",
        username : "test",
        email : "test@gmail.com",
        wristbandColor : 0,
      }
    }


<a id="orge03f6b4"></a>

### Client response

    {
      ok: true,
      player: {
        username: 'n7rgqxbr0vn',
        name: 'Saruman',
        surname: 'serene',
        email: 'n7rgqxbr0vn@gmail.com',
        state: 'registered',
        wristband: { id: null, color: null, colorCode: null, state: 'unpaired' }
      }
    }


<a id="org2727b3d"></a>

# Wristband Tasks


<a id="org8d7f454"></a>

## Register Wristband


<a id="org545bfb2"></a>

### Client request

    // 1st argument, required, Player
    {
      username: "test",
      name: 'test',
      surname: 'test',
      email: 'testt@gmail.com',
    }
    // 2nd argument, required, Wristband
    {
      id: 3,
      color: 'green',
      colorCode: 3
    }
    // 3rd argument, optional, options
    {
      queue: true || false
    }


<a id="orgef5bec0"></a>

### Backend request

    {
      timestamp : 1706957679789,
      username : "diwgp3nrrtf",
      wristbandNumber : 234
    }


<a id="orgdf2a67c"></a>

### Backend response

    {
      timestamp : 1706957679848,
      result : "OK",
      message : "successfully registerWristbandToPlayer"
    }


<a id="org271c101"></a>

### Client response

    {
      ok: true,
      player: {
        username: "test",
        name: 'test',
        surname: 'test',
        email: 'testt@gmail.com',
        wristband: {
          id: 3,
          color: "green",
          colorCode: 3,
          state: "paired"
        }
      }
    }


<a id="org1103dd1"></a>

## Deregister Wristband


<a id="orgdfcb8c1"></a>

### Client request

    // 1st argument, required, Player
    {
      username: "test",
      name: 'test',
      surname: 'test',
      email: 'testt@gmail.com',
    }
    // 2nd argument, required, Wristband
    {
      id: 3,
      color: 'green',
      colorCode: 3
    }
    // 3rd argument, optional, options
    {
      queue: true || false
    }


<a id="orge028f44"></a>

### Backend request

    {
      timestamp : 1706960913052,
      username : "a39hldmki3",
      wristbandNumber : 432
    }


<a id="org15e1757"></a>

### Backend response

    {
      timestamp : 1706960913123,
      result : "OK",
      message : "successfully unregisterWristbandToPlayer"
    }


<a id="org37070b1"></a>

### Client response

    {
      ok: true,
      player: {
        username: "test",
        name: 'test',
        surname: 'test',
        email: 'testt@gmail.com',
        wristband: {
          id: 3,
          color: "green",
          colorCode: 3,
          state: "unpaired"
        }
      }
    }


<a id="orged72643"></a>

## Get Wristband Information


<a id="org17578e3"></a>

### Client request

    {
      id: 3,
      colorCode: 3,
      color: "green",
      state: "state",
    }


<a id="orgc0a33c8"></a>

### Backend request

    {
      timestamp: 1706879364557,
      wristbandNumber: 3
    }


<a id="org28f403e"></a>

### Backend response

    {
      timestamp: 1706879364557,
      result: 'OK',
      wristband: { wristbandNumber: 3, wristbandColor: 2, active: false }
    }


<a id="orgec285bb"></a>

### Client response

    {
      ok: true
      wristband: {
        id: 3,
        color: 'green',
        colorCode: 3,
        state: 'state',
      },
    }


<a id="org979492f"></a>

## Scan Wristband


<a id="orgb557de8"></a>

### Client request

    // 1st argument, required, unsubcb
    (unsub) => {...}
    // 2nd argument, optional, options
    {
      queue: false || true
    }


<a id="orgb19849e"></a>

### Backend request

    // null


<a id="orgadb358f"></a>

### Backend response

    {
      timestamp: 1706880614077,
      result: 'OK',
      wristbandNumber: 3,
      wristbandColor: 3
    }


<a id="org9416bb2"></a>

### Client request

    {
      ok: true
      wristband: { id: 3, color: 'green', colorCode: 3, state: 'unpaired' },
      unsubed: false,
    }


<a id="org6f75e92"></a>

# Cashier Tasks


<a id="org352c158"></a>

## List Cashiers


<a id="orgbb84adb"></a>

### Client request

    // 1st argument, optional, options
    {
      queue: true | false
    }


<a id="org8ac8996"></a>

### Backend request

    {
      timestamp: 1706707779283,
    }


<a id="orgf45e79a"></a>

### Backend response

    {
      timestamp: 1706707779283,
      result: 'OK',
      cashiers: [
        { id: 1, username: 'pavlos', email: 'pavlosTester123@gmail.com' },
        { id: 3, username: 'tt', email: 'tt@gmail.com' }
      ]
    }


<a id="org915520a"></a>

### Client response

    {
      ok: true,
      cashiers: [
        {
          id: 1,
          username: 'pavlos',
          email: 'pavlosTester123@gmail.com',
          role: 'cashier'
        },
        {
          id: 8,
          username: 'TEST',
          email: 'test@gmail.com',
          role: 'cashier'
        }
      ]
    }


<a id="org0432357"></a>

## Login Cashier


<a id="org662d432"></a>

### Client request

    // 1st argument, required, cashier
    {
      id: 3,
      username: "test",
      email: "test@gmail.com",
      role: "cashier",
    }
    // 2nd argument, required, password
    password: "testpass"
    // 3nd argument, optional, options
    {
      queue: true | false
    }


<a id="orgbf38b78"></a>

### Backend request

    {
      username: "33rksrlppga",
      password: "7c38dir1206",
    }


<a id="orga0d26de"></a>

### Backend response

    {
      timestamp: 1706777994830,
      result: 'OK',
      jwtResponse: {
        jwt: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA',
        id: 74,
        username: '33rksrlppga',
        email: '33rksrlppga@gmail.com',
        roles: [ 'ROLE_CASHIER' ]
      }
    }


<a id="orgd8d2ab7"></a>

### Client response

    {
      ok: true,
      cashier: {
        id: 3,
        username: "test",
        email: "test@gmail.com",
        role: "cashier",
      },
      jwt: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3OTAxMywiZXhwIjoxNzA2ODE1MDEzfQ.KztDiUAgVIjSnY56gU7lrlKU4IRNRY_4N8GKloG5-X92veQwaDCGj4284yHX_XIn_ZjJFEWbPdvhh7C4xsnFCQ'
    }


<a id="orgac6f5c2"></a>

## Register Cashier


<a id="org6ae7cf1"></a>

### Client request

    // 1st argument, required, cashier
    {
      username: "test",
      email: "test@gmail.com",
      role: 'test',
    }
    // 2nd argument, required, password
    password: "oteuheno",
    // 3nd argument, optional, options
    {
      queue: true | false
    }


<a id="orga473317"></a>

### Backend request

    {
      username: "testCashier",
      email: "testCashier@gmail.com",
      password: "testCashierPassword",
      role: ["ROLE_CASHIER"],
    }


<a id="orgde5fb3c"></a>

### Backend response

    {
      timestamp: 1706729341301,
      result: 'OK'
    }


<a id="org49baa9f"></a>

### Client response

    {
      ok: true,
      cashier: {
        id: 3
        username: "test",
        email: "test@gmail.com",
        role: "cashier",
      },
      password: "testpass",
    }


<a id="org5b46335"></a>

## Deregister Cashier


<a id="org24f3e82"></a>

### Client request

    // 1st argument, required, cashier
    {
      id: 3,
      username: "test",
      email: "test@gmail.com",
      role: "cashier",
    }
    // 2nd argument, optional, options
    {
      queue: true | false
    }


<a id="org1585cec"></a>

### Backend request

    {
      timestamp: 1706732989145,
      username: "tt",
      userId: 3,
    }


<a id="org134b451"></a>

### Backend response

    {
      timestamp: 1706732989145,
      result: 'OK',
      cashiers: [
        { id: 1, username: 'pavlos', email: 'pavlosTester123@gmail.com' },
        { id: 5, username: 'testCashier', email: 'testCashier@gmail.com' },
        { id: 6, username: 'testCash', email: 'testCash@gmail.com' },
        { id: 7, username: 'r9rcnpncmrf', email: 'Tom@gmail.com' },
        { id: 8, username: 'ci10l5jm4ip', email: 'Finwe@gmail.com' },
        { id: 9, username: '9r0d6jqctfp', email: 'Elrond@gmail.com' },
        { id: 10, username: 'xi87q2qgu6', email: 'Gimli@gmail.com' },
        { id: 11, username: '2b6rdbkpl6j', email: 'Gilgalad@gmail.com' },
        { id: 13, username: 'mpw14t0s9jg', email: 'Isildur@gmail.com' },
        { id: 14, username: 'qbavrn3kw7', email: 'Aragorn@gmail.com' },
        { id: 15, username: 'jq6ttl0bueg', email: 'Maedhros@gmail.com' },
        { id: 16, username: 'ko1b9haqpqh', email: 'Thorin@gmail.com' },
        { id: 17, username: 'x21gpwr0bnm', email: 'Beren@gmail.com' },
        { id: 18, username: 'face6c6oojv', email: 'Celebrimbor@gmail.com' },
        { id: 19, username: '4i4asuxctvr', email: 'Theoden@gmail.com' },
        { id: 20, username: 'jj7mvpbsco4', email: 'Earendil@gmail.com' }
      ]
    }


<a id="org47b2756"></a>

### Client response

    {
      ok: true,
      cashier: {
        id: 3,
        username: "test",
        email: "test@gmail.com"
        role: "cashier"
      }
    }


<a id="orgada0183"></a>

# Package Tasks


<a id="org6ac0fd2"></a>

## List Packages


<a id="org2bd75cc"></a>

### Client request

    // 1st argument, optional, options
    {
      queue: true | false
    }


<a id="org9018d1d"></a>

### Backend request

    // null


<a id="orgc4463d5"></a>

### Backend response

    {
      timestamp: 1706640606387,
      result: 'OK',
      packages: [
        { name: 'Per Mission 5', amount: 5, type: 'mission', cost: 50 },
        {
          name: 'Per Mission 10',
          amount: 10,
          type: 'mission',
          cost: 100
        },
        {
          name: 'Per Mission 15',
          amount: 15,
          type: 'mission',
          cost: 150
        },
        {
          name: 'Per Mission 20',
          amount: 20,
          type: 'mission',
          cost: 200
        },
        { name: 'Per Time 30', amount: 30, type: 'time', cost: 50 },
        { name: 'Per Time 60', amount: 60, type: 'time', cost: 100 },
        { name: 'Per Time 90', amount: 90, type: 'time', cost: 150 },
        { name: 'Per Time 120', amount: 120, type: 'time', cost: 200 }
      ]
    }


<a id="org5ff8731"></a>

### Client response

    {
      ok: true,
      packages: [
        {
          id: null,
          name: 'Per Mission 5',
          type: 'mission',
          amount: 5,
          cost: 50,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        },
        {
          id: null,
          name: 'Per Mission 10',
          type: 'mission',
          amount: 10,
          cost: 100,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        },
        {
          id: null,
          name: 'Per Mission 15',
          type: 'mission',
          amount: 15,
          cost: 150,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        },
        {
          id: null,
          name: 'Per Mission 20',
          type: 'mission',
          amount: 20,
          cost: 200,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        },
        {
          id: null,
          name: 'Per Time 30',
          type: 'time',
          amount: 30,
          cost: 50,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        },
        {
          id: null,
          name: 'Per Time 60',
          type: 'time',
          amount: 60,
          cost: 100,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        },
        {
          id: null,
          name: 'Per Time 90',
          type: 'time',
          amount: 90,
          cost: 150,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        },
        {
          id: null,
          name: 'Per Time 120',
          type: 'time',
          amount: 120,
          cost: 200,
          t_start: null,
          t_end: null,
          remainder: null,
          state: 'registered'
        }
      ]
    }


<a id="org8fe1892"></a>

# Team Tasks


<a id="orgcd7cb35"></a>

## Register Team


<a id="org85ec9be"></a>

### Client request

    // 1st argument, required, Team
    {
      name: 'elated_Galadriel_cl4piph2kic',
      t_created: null,
      points: 0,
      state: 'unregistered'
      roster: [
        {
          username: 'lqplk9p1w68',
          name: 'Finwe',
          surname: 'laughing',
          email: 'lqplk9p1w68@gmail.com',
          state: 'registered',
          wristband: { id: 351, color: 'red', colorCode: 1, state: 'paired' }
        },
        {
          username: 'pgs5ssie3',
          name: 'Eowyn',
          surname: 'strange',
          email: 'pgs5ssie3@gmail.com',
          state: 'registered',
          wristband: { id: 253, color: 'orange', colorCode: 6, state: 'paired' }
        }
      ]
    }
    // 2nd argument, optional, Options
    {
      queue: true || false
    }


<a id="org96947c1"></a>

### Backend request

    {
      timestamp : 1706979526513,
      teamName : "testTeam",
      usernames : [ "9qqu592xhrg", "g0dh1umskej" ]
    }


<a id="org4b3e1b7"></a>

### Backend response

    {
      timestamp : 1706979526580,
      result : "OK",
      message : "successfully created team: tziros1"
    }


<a id="org439f839"></a>

### Client response

    {
      ok: true,
      team: {
        name: 'elated_Galadriel_cl4piph2kic',
        t_created: 1707028052944,
        points: 387,
        packages: [],
        roster: [
          {
            username: 'lqplk9p1w68',
            name: 'Finwe',
            surname: 'laughing',
            email: 'lqplk9p1w68@gmail.com',
            state: 'inTeam',
            wristband: { id: 351, color: 'red', colorCode: 1, state: 'paired' }
          },
          {
            username: 'pgs5ssie3',
            name: 'Eowyn',
            surname: 'strange',
            email: 'pgs5ssie3@gmail.com',
            state: 'inTeam',
            wristband: { id: 253, color: 'orange', colorCode: 6, state: 'paired' }
          }
        ],
        state: 'registered',
      }
    }


<a id="orga9d7595"></a>

## Register Team Package


<a id="orga15b76d"></a>

### Client request

    // 1st argument, Team
    {
      {
        name: 'elated_Galadriel_cl4piph2kic',
        t_created: null,
        points: 0,
        state: 'unregistered'
        roster: [
          {
            username: 'lqplk9p1w68',
            name: 'Finwe',
            surname: 'laughing',
            email: 'lqplk9p1w68@gmail.com',
            state: 'registered',
            wristband: { id: 351, color: 'red', colorCode: 1, state: 'paired' }
          },
          {
            username: 'pgs5ssie3',
            name: 'Eowyn',
            surname: 'strange',
            email: 'pgs5ssie3@gmail.com',
            state: 'registered',
            wristband: { id: 253, color: 'orange', colorCode: 6, state: 'paired' }
          }
        ]
      }
    }
    
    // 2nd argument, package
    {
      id: null,
      name: 'Per Mission 5',
      type: 'mission',
      cost: 50,
      t_start: null,
      t_end: null,
      amount: 5,
      remainder: null,
      state: 'unregistered'
    }
    
    // 3rd argument, options
    { queue: false || true }


<a id="org6a161f3"></a>

### Backend request

    {
      timestamp : 1707053008561,
      teamName : "hopeful_Feanor_ng2coekx3lc",
      name : "Per Time 30"
    }


<a id="org272b428"></a>

### Backend response

    {
      timestamp : 1707053008626,
      result : "OK",
      team : {
        name : "hopeful_Feanor_ng2coekx3lc",
        totalPoints : 0,
        teamState : null,
        created : null,
        lastRegisterAttempt : null,
        currentRoster : {
          version : 1,
          players : [ {
            username : "c77r5w5mod2",
            wristbandNumber : 455,
            wristbandColor : null
          }, {
            username : "hndfw7wu1a",
            wristbandNumber : 347,
            wristbandColor : null
          } ]
        },
        roomType : null,
        packages : [ {
          id : 10,
          name : "Per Time 30",
          cost : null,
          started : null,
          ended : null,
          duration : 1800.000000000,
          paused : false,
          active : false
        } ]
      }
    }


<a id="orgf18aa36"></a>

### Client response

    {
      ok: true,
      team: {
        ...
        packages: [
          ...,
          {
            id: 3,
            name: 'Per Mission 5',
            type: "mission",
            cost: null,
            amount: 5,
            remainder: 5,
            t_start: null,
            t_end: null,
            state: "registered",
          }
        ]
      }
    }


<a id="org8251f2f"></a>

## Deregister Team Package


<a id="orgc66085e"></a>

### Client request

    // 1st argument, Team
    {
      {
        name: 'elated_Galadriel_cl4piph2kic',
        t_created: null,
        points: 0,
        state: 'unregistered'
        roster: [
          {
            username: 'lqplk9p1w68',
            name: 'Finwe',
            surname: 'laughing',
            email: 'lqplk9p1w68@gmail.com',
            state: 'registered',
            wristband: { id: 351, color: 'red', colorCode: 1, state: 'paired' }
          },
          {
            username: 'pgs5ssie3',
            name: 'Eowyn',
            surname: 'strange',
            email: 'pgs5ssie3@gmail.com',
            state: 'registered',
            wristband: { id: 253, color: 'orange', colorCode: 6, state: 'paired' }
          }
        ]
      }
    }
    
    // 2nd argument, package
    {
      id: null,
      name: 'Per Mission 5',
      type: 'mission',
      cost: 50,
      t_start: null,
      t_end: null,
      amount: 5,
      remainder: null,
      state: 'unregistered'
    }
    
    // 3rd argument, options
    { queue: false || true }


<a id="org9ddf09c"></a>

### Backend request

    {
      timestamp : 1707056780735,
      teamName : "affectionate_Shelob_ct4pqxcce8w",
      packageId : 17
    }


<a id="orgc117d2b"></a>

### Backend response

    {
      timestamp : 1707056780791,
      result : "OK",
      team : {
        name : "affectionate_Shelob_ct4pqxcce8w",
        totalPoints : 0,
        teamState : null,
        created : null,
        lastRegisterAttempt : null,
        currentRoster : {
          version : 1,
          players : [ {
            username : "g9781e0di69",
            wristbandNumber : 401,
            wristbandColor : null
          }, {
            username : "18tw5isjpd7e",
            wristbandNumber : 421,
            wristbandColor : null
          } ]
        },
        roomType : null,
        packages : [ ]
      }
    }


<a id="org9e30387"></a>

### Client response

    {
      ok: true,
      team: {
        ...,
        packages: []
      }
    }


<a id="orgf181da2"></a>

## Start team


<a id="org42edf29"></a>

### Client request

    // 1st argument, team
    {
      ...
    },
    
    // 2nd argument options
    { cause: true || false };


<a id="org37576c6"></a>

### Backend request

    {
      timestamp : 1707060079874,
      teamName : "compassionate_Melian_ktl66x5o73f"
    }


<a id="org52d03d8"></a>

### Backend response

    {
      timestamp : 1707060079952,
      result : "OK",
      team : {
        name : "compassionate_Melian_ktl66x5o73f",
        totalPoints : 0,
        teamState : null,
        created : null,
        lastRegisterAttempt : null,
        currentRoster : {
          version : 1,
          players : [ {
            username : "cdc0t3lfjfg",
            wristbandNumber : 154,
            wristbandColor : null
          }, {
            username : "97tixfvlwsp",
            wristbandNumber : 255,
            wristbandColor : null
          } ]
        },
        roomType : null,
        packages : [ {
          id : 21,
          name : "Per Mission 10",
          cost : null,
          started : 1707060079921,
          ended : null,
          missions : 10,
          missionsPlayed : 0,
          active : true
        } ]
      }
    }


<a id="org0537be4"></a>

### Client response

    {
      ...team,
      state: "playing",
    }


<a id="org54b4aaf"></a>

## Find Team


<a id="orgde78033"></a>

### Client request

    // 1st arument
    {
      ...team,
    },
    // 2nd argument, options
    {
      cause: true || false,
    }


<a id="orgcf3f7a9"></a>

### Client response

    {
      team: { ... },
    }


<a id="org6b765d8"></a>

# Session Tasks


<a id="org888bd75"></a>

## List Session


<a id="orgcedeb19"></a>

### Backend response

    {
      timestamp: 1708773525572,
      result: 'OK',
      message: 'No active session'
    }
    
    // Or
    {
      timestamp: 1709248857023,
      result: 'OK',
      message: '{"session":{"current":true,"created":"2024-02-29 19:10:31.306","ended":"null","started":"2024-02-29 19:10:31.305","updated":"2024-02-29 19:10:31.306"},"user":{"active":true,"id":8,"email":"test@gmail.com","username":"TEST"}}'
    }


<a id="org355fef5"></a>

### Client response

    {
      session: {
        current: true,
        created: '2024-02-29 19:10:31.306',
        ended: 'null',
        started: '2024-02-29 19:10:31.305',
        updated: '2024-02-29 19:10:31.306',
        user: {
          active: true,
          id: 8,
          email: 'test@gmail.com',
          username: 'TEST'
        },
        active: true
      },
      ok: true,
      msg: 'Successfully retrieved Session'
    }


<a id="org65b658d"></a>

## Start Session


<a id="org4321859"></a>

### Client request

    // 1st argument, required, cashier
    {
      id: 3,
      username: "test",
      email: "test@gmail.com",
      role: "cashier",
    }
    // 2st argument, required, jwt
    {
      jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA",
    }
    // 3st argument, optional, options
    {
      queue: true | false
    }


<a id="org60591e9"></a>

### Backend request

    {
      jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA",
    }


<a id="orgfa27392"></a>

### Backend response

    {
      timestamp: 1706780850379,
      result: 'OK',
    }


<a id="orgde055bf"></a>

### Client request

    {
      ok: true,
      cashier: {
        id: 3,
        username: "test",
        email: "test@gmail.com",
        role: "cashier",
      },
      jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA",
    }


<a id="org2e96869"></a>

## Stop Session


<a id="orgd69c6b0"></a>

### Client request

    // 1st argument, required, cashier
    {
      id: 3,
      username: "test",
      email: "test@gmail.com",
      role: "cashier",
    }
    // 2st argument, required, jwt
    {
      jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA",
    }
    // 3st argument, optional, comment
    comment: "Nothing unexpected ever happens!"
    // 4th argument, optional, options
    {
      queue: true | false
    }


<a id="org01c2f02"></a>

### Backend request

    {
      jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA",
      comment: "Nothing unexpected ever happens!"
    }


<a id="org5296ab4"></a>

### Backend response

    {
      timestamp: 1706780850379,
      result: 'OK',
    }


<a id="orgee59a5c"></a>

### Client response

    {
      ok: true,
      cashier: {
        id: 3,
        username: "test",
        email: "test@gmail.com",
        role: "cashier",
      },
    }


<a id="org45699bd"></a>

## Stop Sesson force


<a id="orgb9c79a6"></a>

# The Command pattern

The **afmachine** or **afm** for short is the control center of the application.

It's API is consumed by invoking any of the public methods of the **afm**
instance.

All API calls are stored under the directory:

/src/afmachine/tasks/\*
/src/afmachine/synthetic-tasks/\*

Each of these is usually a wrapper for a backend API call.

The backend API calls are found at:

/src/afmachine/device/admin-screen/\*
/src/afmachine/device/rpi-reader/\*

The primary function of **Afmachine** is to allow clients (such as a React
component or the UI in general) to build middleware chains around each Task.
This design model follows loosely the **command** design pattern. see
(<https://en.wikipedia.org/wiki/Command_pattern>)

Each time an API call is made **afm** creates a **Command** for the invoked **Task**.
A **Command** represents one instance of a running **Task**.

For example: If a client was to invoke an API call multiple times:

afm.listPkgs()
afm.listPkgs()
afm.listPkgs()

There would be 3 **Commands** created for the listPkgs **Task**.

Each **Command** carries with it a lot of information but fundamentally it
contains a sequence of functions (the middleware chain) to run.

When a command is created it is placed into a queue by afm. The afm is
responsible for invoking each the commands in the queue in sequence (meaning in
order, waiting for the completion of one to carry on with the next).

For example: If a client was to invoke the API calls:

afm.loginCashier();
afm.listPkgs();
afm.logoutCashier();

There would be 3 **Commands** to run in the queue by **afm**.
It would proceed by running them in these order:

1.  loginCashier()
2.  listPkgs()
3.  logoutCashier()

Clients to afm can register functions that become part of a Command through the
Eventful interface at:

/src/Eventful.js

For exmaple:

// Register a hook to run before each command in the queue.
afm.on('precmd', (afm) => {});

// Register a hook to run after each command in the queue.
afm.on('postcmd', (afm) => {});

// Register a hook to run before each Command for the listPkgs Task.
afm.listPkgs.on('precmd', (command, next) => {});

// Register a hook to run after each Command for the listPkgs Task.
afm.listPkgs.on('postcmd', (command, next) => {});


<a id="orgff12d70"></a>

# Conventions


<a id="org354ed9d"></a>

## Command inputs and outputs

    {
      args: {
        ...AFM_FORM_INPUTS
      }
      req: {
        ...BACKEND_FORM_INPUTS
      }
      raw: {
        ...BACKEND_FORM_OUTPUTS
      }
      res: {
        ...AFM_FORM_OUPUTS
      }
    }


<a id="orgaae9550"></a>

## Commands wrap their return value within an object

Commands never return an entity object, they return an object that contains the
entity or entities.

    // Instead of:
    const response = {
      username: "...",
      name: "...",
    }
    
    // This:
    const response = {
      player: {
        username: "...",
        name: "...",
      },
    }


<a id="org267309d"></a>

# Normalization functions

Normalization function take an array of source objects and combines them into
one object. It is similar to Object.assign(target, &#x2026;sources) but adjusted to
fit the special needs of the ENTITY being normalized. (such as a Player,
Wristband etc). To be more exact, each normalization function is responsible
for:

-   TRANSLATION of an object in backend form to frontend form.
-   DEDUCING the state of the entity.
-   MERGING of multiple sources in any form.
-   NORMALIZATION of the NESTED entities contained within, if any.


<a id="org635bcf8"></a>

## Inputs

All normalization functions accept the following inputs:

-   an array of sources, or a single object, or null, or the empty object etc&#x2026;
-   An Options object

To pass along instructions to a NESTED normalization function, one must begin a
secondary nesting in the Options object.

For example:

    // Considering a Composite Entity such as a Team which
    // contains within Players with each owning a Wristband and Packages.
    // Team -> Players -> Wristband
    // Team -> Packages
    {
      nullSupersede: true, // Team target
      state: 'registered', // Team Target
      package: { // NESTED TARGET -> Package
        state: "playing",
      }
      player: { // NESTED TARGET -> Player
        state: "inTeam",
      }
      wristband: { // NESTED TARGET -> Player -> Wristband
        state: "paired",
        nullsSupersede: false
      }
    }


<a id="org3a6f6f9"></a>

## Deducing state

Deducing state is carried on in 2 stages. The goal is to reduce ambiguity an
introduce Determinism.

The first stage is about interpreting the properties that carry with them State.

For example, given a Package with a non-nil id property:

    // Package
    {
      id: 5
    }

I could interpret the existence of a non-nil ID property as indicative of
the Package being at least Registered.

But I do not (not in the 1st stage). The only properties used in the first stage
in that EXACT order of a Package normalization function are:

-   targetState
    The targetState is passed as an option to the normalization function.
    If it has been defined it interrupts the function and returns immediately
    operating under the assumption that the caller already knows what
    the state of the target should be.
-   active
    This property is found in a BackendForm package. If it is defined and true
    it means the Package is currently active.
-   state
    This property is found in an AfmForm package.
-   defaultState
    The defaultState is passed as an option to the normalization function.
    If no state has been deduced so far in the process, it is used.

The general pattern is that, the targetState has the highest precedence. It is
followed by State backendForm, then by afmForm State, then by defaultState.

In the tobject() functions which must also deduce state the order is:
targetState, afmForm, defaultState.

This is the end of the 1st stage.

The 2nd stage is responsible for binding the Content of the entity to its State.

What do I mean by that?.

Some properties such as:

state or active (in a Package)

are explicitly designed to convey state.

While the other properties in a Package are about its Contents.

    {
      id,
      t_started,
      t_ended,
      remainder,
      amount,
      ...
    }

Therefore, one may allocate each Property as belonging to:

-   State
-   Content

So the 2st stage is about making sure that the target's Contents align with the
State from the 1st stage.

So again carrying on with the above Example:

A Package can be in one of four states:

-   Unregistered
-   Registered
-   Playing
-   Completed

(-START NOTE-)
I believe that the architecture of the backend should be based on Packages.
What do I mean?
Instead of having Teams with Packages and Teams having an active Package.
You have Packages with a 'has-a' Team.
So instead of (1)Team-(\*)Packages you have a (1)Package-(1)Team.
But it is not, so I make best with what I have.
(-END NOTE-)

Lets say that the target after stage 1 looks like these:

    {
      state: 'unregistered'
      id: 5,
      t_start: 100,
      t_end: 500,
    }

This is an example of a misalignment. The State says that this Package
is unregistered but the Contents say that it is Completed.

What should be done in this situation?

In order to help the developer know when a situation like this arises a
state Error is thrown.

So the 2nd stage is responsible for making sure that a misalignment never
occurs.


<a id="org5904f58"></a>

# Schemas


<a id="org607c806"></a>

## Package


<a id="org3b739dc"></a>

### AFM Time

    {
      id: 3,
      name: 'Per Time 90',
      amount: 99999 // milliseconds
      type: "time",
      cost: 90.99,
      amount: 888, // milliseconds,
      remainder: 123, // milliseconds,
      t_start: 1232434324, // milliseconds,
      t_end: 1234234234, // milliseconds
      state: "unregistered" | "registered" | "playing" | "completed"
    }


<a id="orgb9bb0d4"></a>

### AFM Missions

    {
      id: 3,
      name: 'Per Mission 5',
      amount: 5 // missions
      type: "mission",
      cost: 90.99,
      amount: 5, // missions
      remainder: 1, // missions,
      t_start: 1232434324, // milliseconds,
      t_end: 1234234234, // milliseconds
      state: "unregistered" | "registered" | "playing" | "completed"
    }


<a id="org31f422e"></a>

### Backend Time

    // team's package
    {
      id: 5,
      name: 'Per Time 90',
      cost: null,
      started: 1706685129723, // milliseconds
      ended: null, // milliseconds
      duration: 5400, // seconds
      paused: false,
      active: true
    }


<a id="org3c8bcab"></a>

### Backend Missions

    // team's package
    {
      id: 1,
      name: 'Per Mission 5',
      cost: null,
      started: null, // milliseconds
      ended: null, // milliseconds
      missions: 5, // missions
      missionsPlayed: 0, // missions
      active: false
    }


<a id="orgc2fb5f7"></a>

### Available Backend packages

    // Missions
    {
      name: "Per Mission 5",
      amount: 5, // Missions
      type: "mission",
      cost: 150
    }
    
    // time
    {
      name: "Per Time 90",
      amount: 90, // minutes
      type: 'time',
      cost: 150
    }


<a id="org14086e1"></a>

## Device


<a id="orgcca182b"></a>

### AFM rpi reader

    {
      id: 'ADMINISTRATION1Reader',
      type: 'RPI_READER',
      room: 'ADMINISTRATION1'
    }


<a id="org8ccb281"></a>

### AFM admin screen

    {
      id: '001',
      type: 'REGISTRATION_SCREEN',
      room: 'ADMINISTRATION1'
    }


<a id="orgfc0aac7"></a>

### Backend

    {
      deviceId: '001',
      deviceType: 'REGISTRATION_SCREEN',
      roomType: 'ADMINISTRATION1'
    }


<a id="org111176c"></a>

## Cashier


<a id="org568f849"></a>

### AFM

    {
      id: 4394,
      username: '80teepo7fu9',
      email: '80teepo7fu9@gmail.com',
      role: 'manager'
    }


<a id="org107294c"></a>

## Player


<a id="orgcf2ef15"></a>

### AFM

    {
      username: "test"
      name: "testname",
      surname: "testsurname",
      email: "test@gmail.com",
      state: 'unregistered' || 'registered' || 'inTeam' || 'playing'
      wristband: {
        id: null || 3,
        color: null || 'green',
        colorCode: null || 3,
        state: "unpaired" || "pairing" || "unpairing" || "paired"
      }
    }


<a id="org902f164"></a>

### Backend

    {
      username: "test",
      name: "test",
      surname: "test",
      email: "test@gmail.com",
      wristbandMerged: true || false,
    }


<a id="org89a7f7e"></a>

## Team


<a id="orgbc4aa12"></a>

## Wristband


<a id="org13f97da"></a>

### AFM

    {
      id: 3,
      color: "green",
      colorCode: 2,
      state: "unpaired" || "pairing" || "unpairing" || "paired"
    }


<a id="org116e3de"></a>

### Backend

    
    // wristband register
    {
      timestamp : 1706957679789,
      username : "diwgp3nrrtf",
      wristbandNumber : 234
    }
    
    // wristband deregister
    {
      timestamp : 1706960913123,
      result : "OK",
      message : "successfully unregisterWristbandToPlayer"
    }
    
    // wristband info
    {
      timestamp: 1706879364557,
      result: 'OK',
      wristband: { wristbandNumber: 3, wristbandColor: 2, active: false }
    }
    
    // wristband scan
    {
      timestamp: 1706880614077,
      result: 'OK',
      wristbandNumber: 3,
      wristbandColor: 3
    }
    
    
    // list registered players + search players
    {
      username: 'Merry_2mpmnxcgv1s',
      name: 'Merry',
      surname: 'compassionate',
      email: 'Merry@gmail.com',
      wristbandMerged: false,
      wristband: null
    },
    {
      username: 'Wormtongue_klagnkjxqla',
      name: 'Wormtongue',
      surname: 'jovial',
      email: 'Wormtongue@gmail.com',
      wristbandMerged: false,
      wristband: { wristbandNumber: 230, wristbandColor: 3, active: true }
    },
    
    // list registered players with writband
    {
      username: 'Gandalf_deil7sv8j4c',
      name: 'Gandalf',
      surname: 'busy',
      email: 'Gandalf@gmail.com',
      wristbandMerged: false,
      wristband: { wristbandNumber: 233, wristbandColor: 4, active: true }
    },
    
    // list teams
    players: [
      {
        username: 'test1',
        wristbandNumber: null,
        wristbandColor: null
      },
      {
        username: "test3",
        wristbandNumber: 1,
        wristbandColor: null,
      },
      {
        username: "test4",
        wristbandNumber: null,
        wristbandColor: 2,
      },
    
      {
        username: "Sauron_0h96h9q4xixv",
        wristbandNumber: 241,
        wristbandColor: 2,
      },
    
    ]

