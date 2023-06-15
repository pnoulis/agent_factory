import React, {useEffect} from 'react';
import {classNameGenerator, getVideoFromName} from "../../utils/common";
import {useInsideConfiguration} from "../../context/InsideConfigContext";
import {useInsideLayoutColorChange} from "../../layouts/InsideLayout";
import {useTranslation} from "../../context/TranslationContext";

import styles from "./InsideStart.module.scss";
import flame from "../../assets/inside/insideVideos/flame.webm";
import WLS_02 from "../../assets/inside/insideImages/WLS_02.png";
import {useStateHook} from "../../context/StateContext";
import Timer from "../../components/Timer/Timer";
import ScoreStatus from "../../neworking/mqtt/ScoreStatus";
import {useHistory, useParams, useLocation} from "react-router-dom";


const InsideStart = () => {

    const classnames = classNameGenerator(styles)
    const {configuration, client, deviceId} = useInsideConfiguration()

    const {t} = useTranslation()
    const {card, card_transparent, text_color, shield} = useInsideLayoutColorChange()

    const {gameSession, updateScore} = useStateHook()
    const {replace} = useHistory()
    const {room} = useParams()
    const {search} = useLocation()

    const urlParams = new URLSearchParams(search)
    const showPoints = urlParams.get("showPoints")

    const [unsubscribeCallback] = ScoreStatus({client, deviceId, roomName: room, messageCallback:(message)=>{
            const parsedMessage = JSON.parse(message)

            if(parsedMessage.gameStatus && (parsedMessage.gameStatus === "WIN"  || parsedMessage.gameStatus === "LOSE")) {
                replace(`/inside/${room}/insideResult?status=${parsedMessage.gameStatus}`)
            } else {
                updateScore(parsedMessage.remainingScore)
            }

        }})

    useEffect(()=>{
        return unsubscribeCallback
    },[])

    const insideTranslation = {
        difficulty_text : t("InsideScreen/Header/Text_05"),
    }

    return(
        <>
            <div className={classnames(["inside-wrapper", "inside-difffculty-wrapper", "blue-screen"])}>
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
                            <div className={classnames(["inside-top", "inside-top-middle"])}>
                                { showPoints !== "false" && <div className={classnames(["score-container"])}>
                                    <div className={classnames(["score-number"])}><span className={classnames([text_color])}>{gameSession?.pointsToWin}</span></div>
                                    <div className={classnames(["score-header"])}>POINTS TO WIN</div>
                                    <div className={classnames(["score-image"])}>
                                        <img src={shield}/>
                                    </div>
                                </div>}
                            </div>
                            <div className={classnames(["inside-top", "inside-top-right"])}>
                                <div className={classnames(["difficulty-block"])}>
                                    <div className={classnames(["difficulty-block-header"])}>
                                        <span className={classnames([text_color])}>{insideTranslation.difficulty_text}:</span>
                                    </div>
                                    <div className={classnames(["difficulty-block-title"])}>
                                        {gameSession?.difficulty}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(["inside-bottom-outer"])}>
                        <div className={classnames(["inside-bottom-inner"])}>
                            <div >
                                <div className={classnames(["btn_game", "effect_click"])} >
                                    <div className={classnames(["btn_bg_color"])}></div>
                                    <div className={classnames(["btn_container"])}>
                                        <div className={classnames(["header-btn"])} style={{fontSize: '120px'}}>
                                            <Timer countdownTime={gameSession?.time} withoutContainer/>
                                        </div>
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

export default InsideStart;
