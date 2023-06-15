import React, {useEffect} from 'react';
import {classNameGenerator, getVideoFromName} from "../../utils/common";
import {useInsideConfiguration} from "../../context/InsideConfigContext";
import styles from './HomeInside.module.scss';
import HOM1_02 from "../../assets/inside/insideImages/HOM1_02.png";
import {useHistory, useLocation, useParams} from "react-router-dom"

import flame from "../../assets/inside/insideVideos/flame.webm";
import {useInsideLayoutColorChange} from "../../layouts/InsideLayout";
import PromptToCloseTheDoor from "../../neworking/mqtt/PromptToCloseTheDoor";
import {useStateHook} from "../../context/StateContext";


const HomeInside = () => {

    const classnames = classNameGenerator(styles)
    const {replace} = useHistory()
    const {room} = useParams()
    const {search} = useLocation()

    const {configuration, client, deviceId} = useInsideConfiguration()
    const {card, card_transparent} = useInsideLayoutColorChange();
    const {setGameId}= useStateHook()

    const [unsubscribeCallback] = PromptToCloseTheDoor({client, roomName: room, deviceId, messageCallback:(message)=>{
                const parsedMessage = JSON.parse(message)
                console.log('parsedMessage', parsedMessage)
                setGameId(parsedMessage.gameId)
                replace(`/inside/${room}/openDoor${search}`)
        }})

    useEffect(()=>{
        return unsubscribeCallback
    }, [])

    return(
        <>
            <div>
                <div className={classnames(["the-maze-inside-wrapper", "blue-screen"])}>
                    <div className={classnames(["the-maze-inside-container", "inside-two-sides"])}>
                        <div className={classnames(["the-maze-inside-left"])}>
                            <div className={classnames(["the-maze-inside-left-inner"])}>
                                <div className={classnames(["card-wrapper", "blue-card"])}>
                                    <div className={classnames(["card-container"])}>
                                        <div className={classnames(["card-item"])}>
                                            <img src={card} className={classnames(["card-img"])}/>
                                            <video autoPlay loop muted playsInline className={classnames(["room-video"])}>
                                                <source src={getVideoFromName(configuration?.cardVideoPath)} type="video/webm"/>
                                            </video>
                                            <img src={card_transparent} className={classnames(["card-img-transparent"])}/>
                                            <video autoPlay loop muted playsInline className={classnames(["card-video-flame"])}>
                                                <source src={flame} type="video/webm"/>
                                            </video>
                                            <div className={classnames(["card-name-container"])}>
                                                <div className={classnames(["card-name"])}>
                                                    {configuration?.roomType}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classnames(["the-maze-inside-right"])}>
                            <div className={classnames(["the-maze-inside-right-inner"])}>
                                <div className={classnames(["logo-inside-right"])} >
                                    <img src={HOM1_02} style={{maxWidth: '430px'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeInside;
