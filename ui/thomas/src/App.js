import React from 'react'
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import RegistrationHome from "./screens/registration/Home";
import RegistrationLogin from "./screens/registration/Login";
import RegistrationRegister from "./screens/registration/Register"
import TheMazeProvider from "./context/TheMazeProvider";
import ScreenSelector from "./screens/screenSelector/ScreenSelector";
import RegistrationConfigProvider from "./context/RegistrationConfigContext";
import RegistrationLayout from "./layouts/RegistrationLayout";
import ScanWristband from "./screens/registration/ScanWristband";
import RegistrationThankYou from "./screens/registration/ThankYou";
import MergeTeam from "./screens/registration/MergeTeam/MergeTeam";
import EnterYourTeamName from "./screens/registration/MergeTeam/EnterYourTeamName";
import ReadyTeam from "./screens/registration/MergeTeam/ReadyTeam";
import LiveInfo from "./screens/registration/LiveInfo";
import Home from "./screens/outdoors/Home";
import OutsideLayout from "./layouts/OutsideLayout";
import OutdoorConfigurationContextProvider from "./context/OutdoorConfigContext";
import OutsideMergeTeam from "./screens/outdoors/OutsideMergeTeam";
import MissionTimeout from "./screens/outdoors/MissionTimeout";
import MissionUnlock from "./screens/outdoors/MissionUnlock";
import HomeDoorOpenInside from "./screens/inside/HomeDoorOpenInside";
import InsideConfigurationContextProvider from "./context/InsideConfigContext";
import InsideLayout from "./layouts/InsideLayout";
import InsideDifficulty from "./screens/inside/Difficulty";
import InsideStart from "./screens/inside/InsideStart";
import InsideFinal from "./screens/inside/InsideFinal";
import InsideResult from "./screens/inside/InsideResult";
import HomeInside from "./screens/inside/HomeInside";
import ScreenSelectorLayout from "./layouts/ScreenSelectorLayout";
import ScoresboardHome from "./screens/scoresboard/ScoresboardHome";
import ScoresboardLayout from "./layouts/ScoresboardLayout";
import ScoresboardConfigurationContextProvider from "./context/ScoresboardConfigContext";
import CreateEvent from "./screens/registration/CreateEvent/CreateEvent";
import ScanWristbands from "./screens/registration/CreateEvent/ScanWristbands";
import EnterTeamName from "./screens/registration/CreateEvent/EnterYourTeamName";
import EnterUserDetails from "./screens/registration/CreateEvent/EnterUserDetails";

function App() {

    return (
        <TheMazeProvider>
            <Router>

                    <Switch>
                        <Route exact path="/">
                            <ScreenSelectorLayout>
                                <ScreenSelector/>
                            </ScreenSelectorLayout>
                        </Route>
                        <Route path={'/registration/:number'}>
                            <RegistrationLayout>
                            <RegistrationConfigProvider>
                                <Switch>
                                    <Route exact path="/registration/:number/mergeTeam/ready">
                                        <ReadyTeam />
                                    </Route>
                                    <Route exact path="/registration/:number/mergeTeam/enter-name">
                                        <EnterYourTeamName />
                                    </Route>
                                    <Route exact path="/registration/:number/mergeTeam">
                                        <MergeTeam />
                                    </Route>
                                    <Route exact path="/registration/:number/LiveInfo">
                                        <LiveInfo />
                                    </Route>
                                    <Route exact path="/registration/:number/register">
                                        <RegistrationRegister />
                                    </Route>
                                    <Route exact path="/registration/:number/create-event/enter-user-details">
                                        <EnterUserDetails />
                                    </Route>
                                    <Route exact path="/registration/:number/create-event/enter-name">
                                        <EnterTeamName />
                                    </Route>
                                    <Route exact path="/registration/:number/create-event/scan-wristband">
                                        <ScanWristbands />
                                    </Route>
                                    <Route exact path="/registration/:number/create-event">
                                        <CreateEvent />
                                    </Route>
                                    <Route exact path="/registration/:number/scan-wristband">
                                        <ScanWristband/>
                                    </Route>
                                    <Route exact path="/registration/:number/login">
                                        <RegistrationLogin/>
                                    </Route>
                                    <Route exact path="/registration/:number/thankYou">
                                        <RegistrationThankYou/>
                                    </Route>
                                    <Route exact path="/registration/:number">
                                        <RegistrationHome/>
                                    </Route>
                                </Switch>
                            </RegistrationConfigProvider>
                            </RegistrationLayout>
                        </Route>
                        <Route path={'/outside/:room'}>

                                <OutdoorConfigurationContextProvider>
                                    <OutsideLayout>
                                    <Switch>
                                        <Route exact path={"/outside/:room/timeout"}>
                                            <MissionTimeout />
                                        </Route>
                                        <Route exact path={"/outside/:room/mission-unlock"}>
                                            <MissionUnlock />
                                        </Route>
                                        <Route exact path={"/outside/:room/outsideMergeTeam"}>
                                            <OutsideMergeTeam />
                                        </Route>
                                        <Route path={'/outside/:room/scan-wristband'}>
                                            <Home/>
                                        </Route>
                                        <Route path={'/outside/:room'}>
                                            <Home/>
                                        </Route>
                                    </Switch>
                                    </OutsideLayout>
                                </OutdoorConfigurationContextProvider>
                        </Route>
                        <Route path={'/inside/:room'}>

                                <InsideConfigurationContextProvider>
                                    <InsideLayout>
                                    <Switch>
                                        <Route path={'/inside/:room/insideResult'}>
                                            <InsideResult />
                                        </Route>
                                        <Route path={'/inside/:room/insideFinal'}>
                                            <InsideFinal />
                                        </Route>
                                        <Route path={'/inside/:room/insideStart'}>
                                            <InsideStart />
                                        </Route>
                                        <Route path={'/inside/:room/difficulty'}>
                                            <InsideDifficulty />
                                        </Route>
                                        <Route path={'/inside/:room/openDoor'}>
                                            <HomeDoorOpenInside />
                                        </Route>
                                        <Route path={'/inside/:room'}>
                                            <HomeInside />
                                        </Route>
                                    </Switch>
                                    </InsideLayout>
                                </InsideConfigurationContextProvider>
                        </Route>
                            <ScoresboardConfigurationContextProvider>
                                <ScoresboardLayout>
                                    <Switch>
                                        <Route path={'/scoreboard'}>
                                            <ScoresboardHome />
                                        </Route>
                                    </Switch>
                                </ScoresboardLayout>
                            </ScoresboardConfigurationContextProvider>
                    </Switch>
            </Router>
        </TheMazeProvider>
    );
}

export default App;
