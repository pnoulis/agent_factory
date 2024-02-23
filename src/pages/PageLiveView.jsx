import { Outlet } from "react-router-dom";
import { Panel } from "#components/panel/Panel.jsx";
import { PanelActionbar } from "#components/panel/PanelActionbar.jsx";
import { PanelNavbar } from "#components/panel/PanelNavbar.jsx";
import { PanelNavLink } from "#components/links/PanelNavLink";
import IconLiveView from "/assets/icons/liveView.svg?react";
import { liveView } from "/src/links.jsx";
import { useContextApp } from "/src/contexts/ContextApp";
import { TableTeams } from "#components/tables/TableTeams.jsx";
import { Center } from "#components/Center.jsx";
import styled from "styled-components";
import { AncestorDimensions } from "react_utils";

const teams = [
  {
    name: "lucid_Radagast_ed45qk6ljtc",
    t_created: 1708609172859,
    points: 341,
    state: "playing",
    roster: [
      {
        username: "w7sa3lnlsdn",
        name: "Samwise",
        surname: "pedantic",
        email: "w7sa3lnlsdn@gmail.com",
        state: "registered",
        wristband: { id: 291, color: "blue", colorCode: 5, state: "paired" },
      },
      {
        username: "646dni25oed",
        name: "Ungoliant",
        surname: "quizzical",
        email: "646dni25oed@gmail.com",
        state: "registered",
        wristband: { id: 197, color: "purple", colorCode: 2, state: "paired" },
      },
    ],
    packages: [
      {
        id: 2989,
        name: "Per Mission 20",
        type: "mission",
        cost: 417.180203863076,
        t_start: 1708652372860,
        t_end: null,
        amount: 20,
        remainder: 20,
        state: "playing",
      },
      {
        id: 2280,
        name: "Per Time 90",
        type: "time",
        cost: 17.082385568308876,
        t_start: null,
        t_end: null,
        amount: 5400000,
        remainder: 5400000,
        state: "unregistered",
      },
    ],
    activePackage: {
      id: 2989,
      name: "Per Mission 20",
      type: "mission",
      cost: 417.180203863076,
      t_start: 1708652372860,
      t_end: null,
      amount: 20,
      remainder: 20,
      state: "playing",
    },
  },
  {
    name: "serene_Beren_hshg1ttx23e",
    t_created: 1708630772860,
    points: 127,
    state: "playing",
    roster: [
      {
        username: "2vungi24ekj",
        name: "Hurin",
        surname: "ecstatic",
        email: "2vungi24ekj@gmail.com",
        state: "registered",
        wristband: { id: 94, color: "blue", colorCode: 5, state: "paired" },
      },
      {
        username: "jb0qvcckj0r",
        name: "Luthien",
        surname: "thirsty",
        email: "jb0qvcckj0r@gmail.com",
        state: "registered",
        wristband: { id: 445, color: "blue", colorCode: 5, state: "paired" },
      },
    ],
    packages: [
      {
        id: 1273,
        name: "Per Mission 10",
        type: "mission",
        cost: 79.32320732095998,
        t_start: 1708652372860,
        t_end: null,
        amount: 10,
        remainder: 2,
        state: "playing",
      },
      {
        id: 1254,
        name: "Per Mission 10",
        type: "mission",
        cost: 448.8810952587794,
        t_start: null,
        t_end: null,
        amount: 10,
        remainder: 10,
        state: "unregistered",
      },
    ],
    activePackage: {
      id: 1273,
      name: "Per Mission 10",
      type: "mission",
      cost: 79.32320732095998,
      t_start: 1708652372860,
      t_end: null,
      amount: 10,
      remainder: 2,
      state: "playing",
    },
  },
  {
    name: "priceless_Arwen_33hb6wjpfa",
    t_created: 1708635092860,
    points: 186,
    state: "playing",
    roster: [
      {
        username: "xnnbcmi5wai",
        name: "Baggins",
        surname: "distracted",
        email: "xnnbcmi5wai@gmail.com",
        state: "registered",
        wristband: { id: 327, color: "green", colorCode: 3, state: "paired" },
      },
      {
        username: "v40nus79cno",
        name: "Elwing",
        surname: "sad",
        email: "v40nus79cno@gmail.com",
        state: "registered",
        wristband: { id: 13, color: "yellow", colorCode: 4, state: "paired" },
      },
    ],
    packages: [
      {
        id: 2721,
        name: "Per Time 90",
        type: "time",
        cost: 26.84316113422158,
        t_start: 1708651022860,
        t_end: null,
        amount: 5400000,
        remainder: 4050000,
        state: "playing",
      },
      {
        id: 1134,
        name: "Per Time 120",
        type: "time",
        cost: 264.3369851959626,
        t_start: null,
        t_end: null,
        amount: 7200000,
        remainder: 7200000,
        state: "registered",
      },
    ],
    activePackage: {
      id: 2721,
      name: "Per Time 90",
      type: "time",
      cost: 26.84316113422158,
      t_start: 1708651022860,
      t_end: null,
      amount: 5400000,
      remainder: 4050000,
      state: "playing",
    },
  },
  {
    name: "laughing_Baggins_mtuijx2kl98",
    t_created: 1708623572861,
    points: 57,
    state: "playing",
    roster: [
      {
        username: "971frqame8a",
        name: "Celeborn",
        surname: "reverent",
        email: "971frqame8a@gmail.com",
        state: "registered",
        wristband: { id: 48, color: "yellow", colorCode: 4, state: "paired" },
      },
      {
        username: "4okp5ap2d9q",
        name: "Pippin",
        surname: "bold",
        email: "4okp5ap2d9q@gmail.com",
        state: "registered",
        wristband: { id: 318, color: "orange", colorCode: 6, state: "paired" },
      },
    ],
    packages: [
      {
        id: 3379,
        name: "Per Mission 10",
        type: "mission",
        cost: 443.9118693053826,
        t_start: 1708652372861,
        t_end: null,
        amount: 10,
        remainder: 5,
        state: "playing",
      },
      {
        id: 2439,
        name: "Per Mission 10",
        type: "mission",
        cost: 41.98613163121867,
        t_start: 1708652372861,
        t_end: 1708652372861,
        amount: 10,
        remainder: 0,
        state: "completed",
      },
    ],
    activePackage: {
      id: 3379,
      name: "Per Mission 10",
      type: "mission",
      cost: 443.9118693053826,
      t_start: 1708652372861,
      t_end: null,
      amount: 10,
      remainder: 5,
      state: "playing",
    },
  },
  {
    name: "objective_Feanor_966dbq6akxt",
    t_created: 1708623572861,
    points: 290,
    state: "playing",
    roster: [
      {
        username: "9bs73tunjgc",
        name: "Gilgalad",
        surname: "romantic",
        email: "9bs73tunjgc@gmail.com",
        state: "registered",
        wristband: { id: 270, color: "orange", colorCode: 6, state: "paired" },
      },
      {
        username: "bmi4rtsnmbe",
        name: "Morgoth",
        surname: "sad",
        email: "bmi4rtsnmbe@gmail.com",
        state: "registered",
        wristband: { id: 66, color: "blue", colorCode: 5, state: "paired" },
      },
    ],
    packages: [
      {
        id: 543,
        name: "Per Mission 20",
        type: "mission",
        cost: 217.35270949585282,
        t_start: 1708652372861,
        t_end: null,
        amount: 20,
        remainder: 6,
        state: "playing",
      },
      {
        id: 2109,
        name: "Per Mission 15",
        type: "mission",
        cost: 218.16739499273496,
        t_start: null,
        t_end: null,
        amount: 15,
        remainder: 15,
        state: "registered",
      },
    ],
    activePackage: {
      id: 543,
      name: "Per Mission 20",
      type: "mission",
      cost: 217.35270949585282,
      t_start: 1708652372861,
      t_end: null,
      amount: 20,
      remainder: 6,
      state: "playing",
    },
  },
  {
    name: "hardcore_Beren_tr8pn9eqih4",
    t_created: 1708630772861,
    points: 404,
    state: "playing",
    roster: [
      {
        username: "dvmr866gtfd",
        name: "Thingol",
        surname: "stoic",
        email: "dvmr866gtfd@gmail.com",
        state: "registered",
        wristband: { id: 432, color: "red", colorCode: 1, state: "paired" },
      },
      {
        username: "dopsewwv8vk",
        name: "Treebeard",
        surname: "peaceful",
        email: "dopsewwv8vk@gmail.com",
        state: "registered",
        wristband: { id: 368, color: "red", colorCode: 1, state: "paired" },
      },
    ],
    packages: [
      {
        id: 1788,
        name: "Per Time 60",
        type: "time",
        cost: 456.6302613565896,
        t_start: 1708650572861,
        t_end: null,
        amount: 3600000,
        remainder: 1800000,
        state: "playing",
      },
      {
        id: 3948,
        name: "Per Mission 10",
        type: "mission",
        cost: 179.77440292455717,
        t_start: 1708652372861,
        t_end: 1708652372861,
        amount: 10,
        remainder: 0,
        state: "completed",
      },
    ],
    activePackage: {
      id: 1788,
      name: "Per Time 60",
      type: "time",
      cost: 456.6302613565896,
      t_start: 1708650572861,
      t_end: null,
      amount: 3600000,
      remainder: 1800000,
      state: "playing",
    },
  },
  {
    name: "stoic_Elwing_2oajg13tdbn",
    t_created: 1708623572861,
    points: 331,
    state: "playing",
    roster: [
      {
        username: "o39jo6w6en",
        name: "Theoden",
        surname: "suspicious",
        email: "o39jo6w6en@gmail.com",
        state: "registered",
        wristband: { id: 238, color: "red", colorCode: 1, state: "paired" },
      },
      {
        username: "w3hcibafpn",
        name: "Treebeard",
        surname: "condescending",
        email: "w3hcibafpn@gmail.com",
        state: "registered",
        wristband: { id: 22, color: "yellow", colorCode: 4, state: "paired" },
      },
    ],
    packages: [
      {
        id: 1968,
        name: "Per Time 60",
        type: "time",
        cost: 128.17019572231504,
        t_start: 1708650572861,
        t_end: null,
        amount: 3600000,
        remainder: 1800000,
        state: "playing",
      },
      {
        id: 4520,
        name: "Per Time 60",
        type: "time",
        cost: 157.18356968763948,
        t_start: null,
        t_end: null,
        amount: 3600000,
        remainder: 3600000,
        state: "registered",
      },
    ],
    activePackage: {
      id: 1968,
      name: "Per Time 60",
      type: "time",
      cost: 128.17019572231504,
      t_start: 1708650572861,
      t_end: null,
      amount: 3600000,
      remainder: 1800000,
      state: "playing",
    },
  },
  {
    name: "wonderful_Elrond_7i9je3e5djg",
    t_created: 1708623572861,
    points: 276,
    state: "playing",
    roster: [
      {
        username: "1wmiwat580wb",
        name: "Melian",
        surname: "gifted",
        email: "1wmiwat580wb@gmail.com",
        state: "registered",
        wristband: { id: 110, color: "orange", colorCode: 6, state: "paired" },
      },
      {
        username: "t16kdxtil2",
        name: "Denethor",
        surname: "naughty",
        email: "t16kdxtil2@gmail.com",
        state: "registered",
        wristband: { id: 276, color: "orange", colorCode: 6, state: "paired" },
      },
    ],
    packages: [
      {
        id: 4309,
        name: "Per Mission 20",
        type: "mission",
        cost: 403.12102446759866,
        t_start: 1708652372861,
        t_end: null,
        amount: 20,
        remainder: 10,
        state: "playing",
      },
      {
        id: 2748,
        name: "Per Time 120",
        type: "time",
        cost: 279.09378841564126,
        t_start: null,
        t_end: null,
        amount: 7200000,
        remainder: 7200000,
        state: "unregistered",
      },
    ],
    activePackage: {
      id: 4309,
      name: "Per Mission 20",
      type: "mission",
      cost: 403.12102446759866,
      t_start: 1708652372861,
      t_end: null,
      amount: 20,
      remainder: 10,
      state: "playing",
    },
  },
  {
    name: "cranky_Shelob_ekrla0pkgv",
    t_created: 1708609172861,
    points: 78,
    state: "playing",
    roster: [
      {
        username: "9oldc4ae6jo",
        name: "Galadriel",
        surname: "interesting",
        email: "9oldc4ae6jo@gmail.com",
        state: "registered",
        wristband: { id: 104, color: "blue", colorCode: 5, state: "paired" },
      },
      {
        username: "h5v7q1r85et",
        name: "Galadriel",
        surname: "brave",
        email: "h5v7q1r85et@gmail.com",
        state: "registered",
        wristband: { id: 254, color: "blue", colorCode: 5, state: "paired" },
      },
    ],
    packages: [
      {
        id: 3039,
        name: "Per Mission 15",
        type: "mission",
        cost: 482.26395236577093,
        t_start: 1708652372861,
        t_end: null,
        amount: 15,
        remainder: 15,
        state: "playing",
      },
      {
        id: 1353,
        name: "Per Time 90",
        type: "time",
        cost: 58.72427930185331,
        t_start: null,
        t_end: null,
        amount: 5400000,
        remainder: 5400000,
        state: "unregistered",
      },
    ],
    activePackage: {
      id: 3039,
      name: "Per Mission 15",
      type: "mission",
      cost: 482.26395236577093,
      t_start: 1708652372861,
      t_end: null,
      amount: 15,
      remainder: 15,
      state: "playing",
    },
  },
  {
    name: "blissful_Elwing_6aoatxwpo7e",
    t_created: 1708630772861,
    points: 348,
    state: "playing",
    roster: [
      {
        username: "nns114m06a6",
        name: "Gilgalad",
        surname: "priceless",
        email: "nns114m06a6@gmail.com",
        state: "registered",
        wristband: { id: 372, color: "red", colorCode: 1, state: "paired" },
      },
      {
        username: "tvi0c7xubv",
        name: "Eomer",
        surname: "kind",
        email: "tvi0c7xubv@gmail.com",
        state: "registered",
        wristband: { id: 460, color: "orange", colorCode: 6, state: "paired" },
      },
    ],
    packages: [
      {
        id: 1164,
        name: "Per Time 120",
        type: "time",
        cost: 78.86451258257443,
        t_start: 1708650572861,
        t_end: null,
        amount: 7200000,
        remainder: 5400000,
        state: "playing",
      },
      {
        id: 1873,
        name: "Per Mission 20",
        type: "mission",
        cost: 157.61301284860573,
        t_start: null,
        t_end: null,
        amount: 20,
        remainder: 20,
        state: "registered",
      },
    ],
    activePackage: {
      id: 1164,
      name: "Per Time 120",
      type: "time",
      cost: 78.86451258257443,
      t_start: 1708650572861,
      t_end: null,
      amount: 7200000,
      remainder: 5400000,
      state: "playing",
    },
  },
];
function Component() {
  const { t } = useContextApp();
  return (
    <Panel>
      <PanelActionbar>
        <PanelNavbar>
          <PanelNavLink.Anchor end to={t(liveView.path)}>
            <PanelNavLink.Icon>
              <IconLiveView />
            </PanelNavLink.Icon>
            <PanelNavLink.Text>{t(liveView.label)}</PanelNavLink.Text>
          </PanelNavLink.Anchor>
        </PanelNavbar>
      </PanelActionbar>
      <Page>
        <TableTeams teams={teams} />;
      </Page>
    </Panel>
  );
}

const Page = styled("div")`
  padding-top: 80px;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 85%;
  grid-template-rows: 1fr;
  justify-content: center;
`;

export { Component };
