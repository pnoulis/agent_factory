import React, {useState} from 'react';
import {classNameGenerator, getVideoFromName} from "../../utils/common";
import styles from "./InsideResult.module.scss"
import RoomVideo from "../../assets/inside/insideVideos/RoomVideo.webm";
import flame from "../../assets/inside/insideVideos/flame.webm";
import {useInsideLayoutColorChange} from "../../layouts/InsideLayout";
import {useInsideConfiguration} from "../../context/InsideConfigContext";
import WLS_02 from "../../assets/inside/insideImages/WLS_02.png";
import {useTranslation} from "../../context/TranslationContext";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useStateHook} from "../../context/StateContext";
import Timer from "../../components/Timer/Timer";

const InsideResult =()=>{

    const classnames = classNameGenerator(styles)
    const {card, card_transparent, text_color} = useInsideLayoutColorChange()
    const {configuration} = useInsideConfiguration()
    const {t}= useTranslation()
    const {gameId, gameSession, updateScore} = useStateHook()

    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const status = query.get('status')
    console.log('status', status)
    const {room} = useParams()

    const insideTranslation = {
        difficulty_text : t("InsideScreen/Header/Text_05"),
        team_points: t("InsideScreen/TimerScreen/Text_06"),
    }

    const history = useHistory()
    const countdownAction = () => {
        history.replace(`/inside/${room}/insideFinal`)
    }

    let win_lose_class
    let win_lose_text

    switch (status){
        case 'WIN':
            win_lose_class = "you-win-button"
            win_lose_text = "YOU WIN!"
            break
        case 'LOSE':
            win_lose_class = "you-lose-button"
            win_lose_text = "YOU LOSE"
            break
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
                                <div className={classnames(["teams-point"])}>
                                    {insideTranslation.team_points}: {gameSession?.pointsToWin}
                                </div>
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
                    <div className={classnames("inside-bottom-outer")}>
                        <div className={classnames(["inside-bottom-inner"])}>
                            <div className={classnames(["win-lose-button", win_lose_class])}>
                                <div className={classnames(["btn_game", "effect_click"])} >
                                    <div className={classnames(["btn_bg_color"])}></div>
                                    <div className={classnames(["btn_container"])}>
                                        <div className={classnames(["header-btn"])}>{win_lose_text}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(["countdown-inside-right"])}>
                        <div className={classnames(["countdown-inside", text_color])}>
                            <Timer countdownTime={5} countdownAction={countdownAction} withoutContainer/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InsideResult;
