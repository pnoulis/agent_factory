import React from 'react';
import {useHistory} from "react-router-dom";
import Container from "../../components/Container";
import BootDevice from "../../neworking/mqtt/BootDevice";
import {v4 as uuidv4} from 'uuid';
import {getItem, saveItem} from "../../utils/storage";
import {useMqtt} from "../../context/MQTTcontext";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import {ROOM_TYPES} from "../../utils/enums";
import {classNameGenerator} from "../../utils/common";
import Button from "./../../components/Button/Button";
import styles from "./ScreenSelector.module.scss";

export const roomsSchema = [
    {
        name: 'registration 1',
        path: '/registration/1',
        roomName: 'registration1',
        type: ROOM_TYPES.REGISTRATION_SCREEN
    },
    {
        name: 'registration 2',
        path: '/registration/2',
        roomName: 'registration2',
        type: ROOM_TYPES.REGISTRATION_SCREEN
    },
    {
        name: 'registration 3',
        path: '/registration/3',
        roomName: 'registration3',
        type: ROOM_TYPES.REGISTRATION_SCREEN
    },
    {
        name: 'registration 4',
        path: '/registration/4',
        roomName: 'registration4',
        type: ROOM_TYPES.REGISTRATION_SCREEN
    },
    {
        name: 'registration 5',
        path: '/registration/5',
        roomName: 'registration5',
        type: ROOM_TYPES.REGISTRATION_SCREEN
    },
    {
        name: 'Outside ALLEYOOPS',
        path: '/outside/alleyoops',
        roomName: 'ALLEYOOPS',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside LASERDANCE ',
        path: '/outside/laserdance',
        roomName: 'LASERDANCE',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside GRANDPIANO ',
        path: '/outside/grandpiano',
        roomName: 'GRANDPIANO',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside justdoit ',
        path: '/outside/justdoit',
        roomName: 'JUSTDOIT',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside FUNINTHEBARN ',
        path: '/outside/funinthebarn',
        roomName: 'FUNINTHEBARN',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside bubblebobble ',
        path: '/outside/bubblebobble',
        roomName: 'BUBBLEBOBBLE',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside letterfloor ',
        path: '/outside/letterfloor',
        roomName: 'LETTERFLOOR',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside spacejam ',
        path: '/outside/spacejam',
        roomName: 'SPACEJAM',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside goal ',
        path: '/outside/goal',
        roomName: 'GOAL',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside suckerpunch ',
        path: '/outside/suckerpunch',
        roomName: 'SUCKERPUNCH',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Outside reflections ',
        path: '/outside/reflections',
        roomName: 'REFLECTIONS',
        type: ROOM_TYPES.OUTSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside ALLEYOOPS',
        path: '/inside/alleyoops',
        roomName: 'ALLEYOOPS',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside LASERDANCE ',
        path: '/inside/laserdance?showPoints=false',
        roomName: 'LASERDANCE',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside GRANDPIANO ',
        path: '/inside/grandpiano?showPoints=false',
        roomName: 'GRANDPIANO',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside justdoit ',
        path: '/inside/justdoit?showPoints=false',
        roomName: 'JUSTDOIT',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside FUNINTHEBARN ',
        path: '/inside/funinthebarn?showPoints=false',
        roomName: 'FUNINTHEBARN',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside bubblebobble ',
        path: '/inside/bubblebobble?showPoints=false',
        roomName: 'BUBBLEBOBBLE',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside letterfloor ',
        path: '/inside/letterfloor?showPoints=false',
        roomName: 'LETTERFLOOR',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside spacejam ',
        path: '/inside/spacejam',
        roomName: 'SPACEJAM',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside goal ',
        path: '/inside/goal',
        roomName: 'GOAL',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside suckerpunch ',
        path: '/inside/suckerpunch?showPoints=false',
        roomName: 'SUCKERPUNCH',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Inside reflections ',
        path: '/inside/reflections?showPoints=false',
        roomName: 'REFLECTIONS',
        type: ROOM_TYPES.INSIDE_ROOM_SCREEN
    },
    {
        name: 'Scoreboard',
        path: '/scoreboard',
        roomName: 'SCOREBOARD',
        type: ROOM_TYPES.SCOREBOARD_SCREEN
    }

]
const ScreenSelector = () => {
    const classnames = classNameGenerator(styles)
    const history = useHistory()
    const {client} = useMqtt()

    const onClick = (path, type, roomName) => {
        let screenUUID = getItem(path)

        if(!screenUUID) {
            screenUUID = uuidv4();
            saveItem(path, screenUUID)
        }
         const [publishCallback] = BootDevice({client, deviceId: screenUUID, messageCallback:(message)=>{
                handleMqttResponse(message).then(()=>{
                    history.replace(path)
                }).catch(()=>{
                    console.error('Exception')
                })
        }})
        publishCallback({
            deviceId: screenUUID,
            roomName,
            deviceType: type
        })
    }

    return (
        <>
            <Container>
                <div className={classnames(["select-room-container"])} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <div>
                        <h2>Registration</h2>
                        <ul>
                            {roomsSchema.filter(button => button.type === ROOM_TYPES.REGISTRATION_SCREEN).map(button=>{
                                return(
                                <li>
                                    <Button styles={{width: '100%'}} key={button.path} header={button.name} onClick={()=> onClick(button.path, button.type, button.roomName)} withSreenSelectorStyles/>
                                </li>
                                )
                            })}

                        </ul>
                    </div>
                    <div>
                        <h2>Outside</h2>
                        <ul>
                            {roomsSchema.filter(button => button.type === ROOM_TYPES.OUTSIDE_ROOM_SCREEN).map(button=>{
                                return(
                                    <li>
                                        <Button styles={{width: '100%'}} key={button.path} header={button.name} onClick={()=> onClick(button.path, button.type, button.roomName)} withSreenSelectorStyles/>
                                    </li>
                                )
                            })}

                        </ul>

                    </div>
                    <div>
                        <h2>Inside</h2>
                        <ul>
                            {roomsSchema.filter(button => button.type === ROOM_TYPES.INSIDE_ROOM_SCREEN).map(button=>{
                                return(
                                    <li>
                                        <Button styles={{width: '100%'}} key={button.path} header={button.name} onClick={()=> onClick(button.path, button.type, button.roomName)} withSreenSelectorStyles/>
                                    </li>
                                )
                            })}

                        </ul>


                    </div>
                    <div>
                        <h2>Scoreboard</h2>
                        <ul>
                            {roomsSchema.filter(button => button.type === ROOM_TYPES.SCOREBOARD_SCREEN).map(button=>{
                                return(
                                    <li>
                                        <Button styles={{width: '100%'}} key={button.path} header={button.name} onClick={()=> onClick(button.path, button.type, button.roomName)} withSreenSelectorStyles/>
                                    </li>
                                )
                            })}

                        </ul>
                        </div>
                </div>
            </Container>
        </>
    );
};

export default ScreenSelector;
