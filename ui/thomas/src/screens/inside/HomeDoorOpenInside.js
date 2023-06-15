import React, {useEffect} from 'react';
import {classNameGenerator, getVideoFromName} from "../../utils/common";
import {useInsideConfiguration} from "../../context/InsideConfigContext";
import {useTranslation} from "../../context/TranslationContext";
import {useHistory, useLocation, useParams} from "react-router-dom"
import styles from './HomeInside.module.scss';
import HOM1_02 from "../../assets/inside/insideImages/HOM1_02.png";
import flame from "../../assets/inside/insideVideos/flame.webm";
import {useInsideLayoutColorChange} from "../../layouts/InsideLayout";
import {useStateHook} from "../../context/StateContext";
import InsideTimeup from "../../neworking/mqtt/InsideTimeup";
import OutdoorDoorClosed from "../../neworking/mqtt/OutdoorDoorClosed";
import Timer from "../../components/Timer/Timer";

const HomeDoorOpenInside = () => {

    const classnames = classNameGenerator(styles)
    const {configuration, client, deviceId} = useInsideConfiguration()
    const {card, card_transparent, text_color} = useInsideLayoutColorChange();
    const {gameId} = useStateHook()
    const {search} = useLocation()

    const {t} = useTranslation()
    const history = useHistory()
    const {room} = useParams()

    const [publishMessage, unpublishCallback] = OutdoorDoorClosed({client, deviceId, roomName:room, messageCallback:(message)=>{
        console.log('message', message)
            history.replace(`/inside/${room}/difficulty${search}`)
        }})

    const countdownAction = () => {
       const [publishMessage, unpublishCallback] = InsideTimeup({client, deviceId, roomName:room})
        publishMessage({gameId})
        unpublishCallback()

    }
    useEffect(()=>{
        return unpublishCallback
    },[])

    const insideTranslation = {
        closeDoor: t("InsideScreen/HomeScreen1/Text_11"),
    }


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
                                <div className={classnames(["logo-inside-right"])}>
                                    <img src={HOM1_02}/>
                                </div>
                                <div className={classnames(["text-inside-right", text_color])}>
                                    <span>{insideTranslation.closeDoor}</span>
                                </div>
                                <div className={classnames(["countdown-inside-right"])}>
                                    <div className={classnames(["countdown-inside", text_color])}>
                                        <Timer countdownTime={30} countdownAction={countdownAction} withoutContainer/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeDoorOpenInside;
