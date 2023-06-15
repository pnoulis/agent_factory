import React, {useState, useEffect} from 'react';
import {useInsideConfiguration} from "../../context/InsideConfigContext";
import {classNameGenerator, getVideoFromName} from "../../utils/common";
import {useTranslation} from "../../context/TranslationContext";
import styles from "./Difficulty.module.scss";
import RoomVideo from "../../assets/inside/insideVideos/RoomVideo.webm";
import flame from "../../assets/inside/insideVideos/flame.webm";
import HOM_05 from "../../assets/inside/insideImages/HOM_05.png";
import CD_03 from "../../assets/inside/insideImages/CD_03.png"
import difficulty_btn_new from "../../assets/inside/insideImages/difficulty_btn_new.png";
import {useInsideLayoutColorChange} from "../../layouts/InsideLayout";
import {useHistory, useLocation, useParams} from "react-router-dom";
import InsideTimeup from "../../neworking/mqtt/InsideTimeup";
import {useStateHook} from "../../context/StateContext";
import SetDifficulty from "../../neworking/mqtt/SetDifficulty";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import Timer from "../../components/Timer/Timer";

const InsideDifficulty = () => {

    const {configuration, client, deviceId} = useInsideConfiguration()
    const {t} = useTranslation()
    const {card, card_transparent, text_color} = useInsideLayoutColorChange()
    const classnames = classNameGenerator(styles)
    const [difficulty, setDifficulty] = useState("")
    const {gameId, setGameSession} = useStateHook()
    const {room} = useParams()
    const {search} = useLocation()


    const chooseDifficulty = (difficulty) => {
        setDifficulty(difficulty)
    }

    const insideTranslation ={
        easy_text: t("InsideScreen/Difficulty/Text_02"),
        medium_text: t("InsideScreen/Difficulty/Text_03"),
        hard_text: t("InsideScreen/Difficulty/Text_04"),
        choose_difficulty: t("InsideScreen/Difficulty/Text_01"),
        start_game: t("InsideScreen/Difficulty/text_12"),
    }

    const history = useHistory()

    const [publishCallback, unsubscribeCallback] = SetDifficulty({client, deviceId, roomName: room, messageCallback:(message)=>{
            handleMqttResponse(message).then((parsedMessage)=>{
                console.log('parsedMessage', parsedMessage)
                setGameSession(parsedMessage)
                history.replace(`/inside/${room}/insideStart${search}`)
            })
        }})

    useEffect(()=>{
        return unsubscribeCallback
    },[])

    const countdownAction = () => {
        const [publishMessage, unpublishCallback] = InsideTimeup({client, deviceId, roomName:room})
        publishMessage({gameId})
        unpublishCallback()
    }

    const handleSetDifficulty = () => {
        publishCallback({gameId, difficulty})
    }

    return(
        <>
            <div className={classnames(["inside-difffculty-wrapper", "blue-screen"])}>
                <div className={classnames(["inside-difffculty-wrapper"])}>
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
                    <div className={classnames(["inside-difffculty-container"])}>
                        <div className={classnames(["difficulty-outer"])}>
                            <div className={classnames(["difficulty-inner"])}>
                                <div className={classnames(["difficulty-header"])}>{insideTranslation.choose_difficulty}</div>
                                <div className={classnames(["difficulty-levels-container"])}>
                                    <div className={classnames(["difficulty-level-item"])}>
                                        <div className={classnames(["difficult-img"])} onClick={()=>chooseDifficulty('EASY')}>
                                            {difficulty === "EASY"?<img src={CD_03}/>:<img src={difficulty_btn_new}/>}
                                        </div>
                                        <div className={classnames(["difficult-text"])}>
                                            {difficulty === "EASY"?<span className={classnames([text_color])}>{insideTranslation.easy_text}</span>:<span>{insideTranslation.easy_text}</span>}
                                        </div>
                                    </div>
                                    <div className={classnames(["difficulty-level-item"])}>
                                        <div className={classnames(["difficult-img"])} onClick={()=>chooseDifficulty('MEDIUM')}>
                                            {difficulty === "MEDIUM"?<img src={CD_03}/>:<img src={difficulty_btn_new}/>}
                                        </div>
                                        <div className={classnames(["difficult-text"])}>
                                            {difficulty === "MEDIUM"?<span className={classnames([text_color])}>{insideTranslation.medium_text}</span>:<span>{insideTranslation.medium_text}</span>}
                                        </div>
                                    </div>
                                    <div className={classnames(["difficulty-level-item"])}>
                                        <div className={classnames(["difficult-img"])} onClick={()=>chooseDifficulty('HARD')}>
                                            {difficulty === "HARD"?<img src={CD_03}/>:<img src={difficulty_btn_new}/>}
                                        </div>
                                        <div className={classnames(["difficult-text"])}>
                                            {difficulty === "HARD"?<span className={classnames([text_color])}>{insideTranslation.hard_text}</span>:<span>{insideTranslation.hard_text}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className={classnames(["difficulty-btn-out"])} onClick={handleSetDifficulty}>
                                    <div className={classnames(["difficulty-btn-in"])}>
                                        <div className={classnames(["difficulty-btn-img"])}>
                                            <img src={HOM_05}/>
                                        </div>
                                        {difficulty==""?<div className={classnames(["difficulty-btn-text"])}>{insideTranslation.start_game}</div>:
                                            <div className={classnames(["difficulty-btn-text", text_color])}>{insideTranslation.start_game}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(["countdown-inside-right"])}>
                        <div className={classnames(["countdown-inside", text_color])}>
                            <Timer countdownTime={30} countdownAction={countdownAction} withoutContainer/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default InsideDifficulty;
