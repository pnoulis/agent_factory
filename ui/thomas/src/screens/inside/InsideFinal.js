import React, {useState, useEffect} from 'react';
import {classNameGenerator, getVideoFromName} from "../../utils/common";
import {useInsideConfiguration} from "../../context/InsideConfigContext";
import {useInsideLayoutColorChange} from "../../layouts/InsideLayout";
import {useTranslation} from "../../context/TranslationContext";
import styles from "./InsideFinal.module.scss";
import RoomVideo from "../../assets/inside/insideVideos/RoomVideo.webm";
import flame from "../../assets/inside/insideVideos/flame.webm";
import WLS_02 from "../../assets/inside/insideImages/WLS_02.png";
import CD_03 from "../../assets/inside/insideImages/CD_03.png";
import difficulty_btn_new from "../../assets/inside/insideImages/difficulty_btn_new.png";
import {useHistory, useLocation, useParams} from "react-router-dom";
import Timer from "../../components/Timer/Timer";
import RequestRegame from "../../neworking/mqtt/RequestRegame";
import SetDifficulty from "../../neworking/mqtt/SetDifficulty";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import {useStateHook} from "../../context/StateContext";
import InsideTimeup from "../../neworking/mqtt/InsideTimeup";

const InsideFinal =()=>{

    const classnames = classNameGenerator(styles)
    const {configuration, client, deviceId} = useInsideConfiguration()
    const {t} = useTranslation()
    const {card, card_transparent, text_color} = useInsideLayoutColorChange()
    const {gameId, gameSession, setGameSession} = useStateHook()

    const [difficulty, setDifficulty] = useState("")
    const {room} = useParams()
    const {search} = useLocation()

    const insideTranslation ={
        easy_text: t("InsideScreen/Difficulty/Text_02"),
        medium_text: t("InsideScreen/Difficulty/Text_03"),
        hard_text: t("InsideScreen/Difficulty/Text_04"),
        choose_difficulty: t("InsideScreen/Difficulty/Text_01"),
        start_game: t("InsideScreen/Difficulty/text_12"),
        final_choose: t("InsideScreen/Difficulty2/Text_07")
    }

    const history = useHistory()
    const countdownAction = () => {
        const [publishMessage, unpublishCallback] = InsideTimeup({client, deviceId, roomName:room})
        publishMessage({gameId})
        unpublishCallback()
    }


    const [publishMessage, unsubscribeCallback] = RequestRegame({client, deviceId, roomName:room})
    const [publishMessageDifficulty, unsubscribeCallbackDifficulty] = SetDifficulty({client, deviceId, roomName:room, messageCallback:(message)=> {
            handleMqttResponse(message).then((parsedMessage)=>{
                setGameSession(parsedMessage)
                history.replace(`/inside/${room}/insideStart${search}`)
            })
        }})

    useEffect(()=>{
        return() => {
            unsubscribeCallback()
            unsubscribeCallbackDifficulty()
        }
    },[])

    const chooseDifficulty = (difficulty) => {
        setDifficulty(difficulty)
        publishMessage({difficulty, teamName: gameSession?.teamName})
    }

    return(
        <>
            <div style={{margin:0}}>
                <div className={classnames(["inside-wrapper", "inside-difffculty-wrapper", "inside-final blue-screen"])}>
                    <div className={classnames(["inside-container"])}>
                        <div className={classnames(["inside-top-outer"])}>
                            <div className={classnames(["inside-top-inner"])}>
                                <div className={classnames(["inside-top", "inside-top-left"])}>
                                    <div className={classnames(["inside-the-maze-team-container"])}>
                                        <div className={classnames(["inside-the-maze-team-img"])}>
                                            <img src={WLS_02}/>
                                        </div>
                                        <div className={classnames(["inside-the-maze-team-text"])}>
                                            {gameSession?.teamName}
                                        </div>
                                    </div>

                                </div>
                                <div className={classnames(["inside-top", "inside-top-middle"])}>
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
                                <div className={classnames(["inside-top inside-top-right"])}>

                                </div>
                            </div>
                        </div>
                        <div className={classnames(["inside-bottom-outer"])}>
                            <div className={classnames(["inside-bottom-inner"])}>
                                <div className={classnames(["inside-difffculty-container"])}>
                                    <div className={classnames(["difficulty-outer"])}>
                                        <div className={classnames(["difficulty-inner"])}>
                                            <div className={classnames(["difficulty-header"])}>
                                                <div className={classnames(["difficulty-header-disclaimer"])}>
                                                    {insideTranslation.final_choose}
                                                </div>
                                            </div>
                                            <div className={classnames(["difficulty-levels-container"])}>
                                                <div className={classnames(["difficulty-level-item"])}>
                                                    <div className={classnames(["difficult-img"])} onClick={()=>chooseDifficulty("EASY")}>
                                                        {difficulty === "EASY" ? <img src={CD_03}/>:<img src={difficulty_btn_new}/>}
                                                    </div>
                                                    <div className={classnames(["difficult-text"])}>
                                                        {difficulty === "EASY" ? <span className={classnames([text_color])}>{insideTranslation.easy_text}</span>:<span>{insideTranslation.easy_text}</span>}
                                                    </div>
                                                </div>
                                                <div className={classnames(["difficulty-level-item"])}>
                                                    <div className={classnames(["difficult-img"])} onClick={()=>chooseDifficulty("MEDIUM")}>
                                                        {difficulty === "MEDIUM"?<img src={CD_03}/>:<img src={difficulty_btn_new}/>}
                                                    </div>
                                                    <div className={classnames(["difficult-text"])}>
                                                        {difficulty === "MEDIUM"?<span className={classnames([text_color])}>{insideTranslation.medium_text}</span>:<span>{insideTranslation.medium_text}</span>}
                                                    </div>
                                                </div>
                                                <div className={classnames(["difficulty-level-item"])}>
                                                    <div className={classnames(["difficult-img"])} onClick={()=>chooseDifficulty("HARD")}>
                                                        {difficulty === "HARD"?<img src={CD_03}/>:<img src={difficulty_btn_new}/>}
                                                    </div>
                                                    <div className={classnames(["difficult-text"])}>
                                                        {difficulty === "HARD"?<span className={classnames([text_color])}>{insideTranslation.hard_text}</span>:<span>{insideTranslation.hard_text}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(["countdown-inside-right"])}>
                        <div className={classnames(["countdown-inside"])}>
                            <div className={classnames([text_color])}>
                            <Timer countdownTime={30} countdownAction={countdownAction} withoutContainer/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default InsideFinal;
