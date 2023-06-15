import React, {useMemo, useState, useEffect} from 'react';
import {useOutdoorConfiguration} from "../../context/OutdoorConfigContext";
import styles from './OutsideMergeTeam.module.scss'
import {classNameGenerator, getVideoFromName} from "../../utils/common";
import card_blue from "../../assets/outside/outsideImages/card_blue.png";
import flame_video from "../../assets/videos/flame.webm";
import Timer from "../../components/Timer/Timer";
import WristbandScan from "../../neworking/mqtt/WristbandScan";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import {useParams} from "react-router-dom";
import OutdoorGameAttemptUpdate from "../../neworking/mqtt/OutdoorGameAttemptUpdate";
import PlayerSkills from "./components/PlayerSkills";
import {useTranslation} from "../../context/TranslationContext";
import ErrorComponent from "../../components/ErrorComponent";
import {useHistory} from "react-router-dom";
import {useOutSideLayoutColorChange} from "../../layouts/OutsideLayout";
import flame_image from "../../assets/outside/outsideImages/flame.webm";

const classnames = classNameGenerator(styles)

const generateVideoHex = (videoLevel, color) => {
    const video = require(`../../assets/outside/${color}/MERP_0${videoLevel}.webm`).default
    console.log('video', video)
    return <div className={classnames(["mergeteam-item", `mergeteam-${videoLevel}`])}>
        <video autoPlay muted playsInline className="">
            <source src={video} type="video/webm"/>
        </video>
        <video autoPlay loop muted playsInline className={classnames("merge-team-flame")}>
            <source src={flame_video} type="video/webm"/>
        </video>
    </div>
}


const OutsideMergeTeam = (props) => {
    const [errorMessage, setErrorMessage] = useState('')

    const {configuration, client, deviceId, attempt, setAttempt} = useOutdoorConfiguration()
    const {card, card_transparent} = useOutSideLayoutColorChange()

    const {t} = useTranslation()
    const history = useHistory()
    const params = useParams()

    const roomName = params?.room
    const colorName = configuration?.color?.toLowerCase()

    const OutdoorTranslation = {
        light: t('OutScreen/HomeScreen/Text_01'),
        gameDescription: t("OutScreen/HomeScreen/Text_22"),
        missionGoal: t("OutScreen/HomeScreen/Text_23"),
        easy: t('OutScreen/HomeScreen/Text_01'),
        medium: t('OutScreen/HomeScreen/Text_02'),
        hard: t('OutScreen/HomeScreen/Text_03'),
        fitness: t('OutScreen/HomeScreen/Text_04'),
        intelligence: t('OutScreen/HomeScreen/Text_05'),
        skills: t('OutScreen/HomeScreen/Text_06'),
    }

    console.log('attempt', attempt)

    let playersComponent

    playersComponent = useMemo(()=>{
        switch(attempt.teamPlayersNumber) {
            case 2:
                return <>
                    {generateVideoHex(1, colorName)}
                    {generateVideoHex(2, colorName)}
                </>
            case 3:
                return <>
                    {generateVideoHex(1, colorName)}
                    {generateVideoHex(2, colorName)}
                    {generateVideoHex(3, colorName)}
                </>
            case 4:
                return <>
                    {generateVideoHex(1, colorName)}
                    {generateVideoHex(2, colorName)}
                    {generateVideoHex(3, colorName)}
                    {generateVideoHex(4, colorName)}
                </>
            case 5:
                return<>
                    {generateVideoHex(1, colorName)}
                    {generateVideoHex(2, colorName)}
                    {generateVideoHex(3, colorName)}
                    {generateVideoHex(4, colorName)}
                    {generateVideoHex(5, colorName)}
                </>
            case 6:
                return <>
                    {generateVideoHex(1, colorName)}
                    {generateVideoHex(2, colorName)}
                    {generateVideoHex(3, colorName)}
                    {generateVideoHex(4, colorName)}
                    {generateVideoHex(5, colorName)}
                    {generateVideoHex(6, colorName)}
                </>
            default:
                return <></>
        }
    }, [attempt.teamPlayersNumber])

    const [publishAttemptCallback, unsubscribeAttemptCallback] = OutdoorGameAttemptUpdate({client, deviceId, roomName, messageCallback: (message)=> {
            handleMqttResponse(message).then((parsedMessage) => {
                console.log("OutdoorGameAttempt parsedMessage",parsedMessage )
                console.log("OutdoorGameAttempt parsedMessage.gameId",parsedMessage.gameId )
                    if(parsedMessage?.newGameAttempt?.gameId) {
                        setAttempt(parsedMessage?.newGameAttempt)
                        history.replace(`/outside/${roomName}/mission-unlock`)
                    }
            }).catch((error)=>{
                setErrorMessage(error.message)
            })
    }})


    const [unsubscribeWristbandCallback] = WristbandScan({client, deviceId, messageCallback: (message)=> {
            handleMqttResponse(message).then((parsedMessage) => {
                console.log('parsedMessage WristbandScan', parsedMessage)

                publishAttemptCallback({
                    wristbandNumber: parsedMessage.wristbandNumber,
                    newGameAttemptId: attempt?.id,
                    teamId: attempt?.teamId,
                    wristbandColor: parsedMessage.wristbandColor
                })

            }).catch((error)=>{
                console.error('error', error)
                if(error.message) {
                    setErrorMessage(error.message)
                }
            })
        }})

    useEffect(() => () => {
            unsubscribeAttemptCallback()
            unsubscribeWristbandCallback()
    }, [])

    const timeoutAction =()=> {
        history.replace(`/outside/${roomName}/timeout`)
        setAttempt({})
    }

    return(
        <>
            <div>
                <div className={classnames("the-maze-outside-container")}>
                    <div className={classnames(["mergeteam-wrapper","mergeteam-blue"])}>
                        <div className={classnames("mergeteam-container")}>
                            <div className={classnames("mergeteam-card")}>
                                <div className={styles.card_container}>
                                    <div className={styles.card_item}>
                                        <img src={card} className={styles.card_img}/>
                                        <video autoPlay loop muted playsInline className={styles.room_video}>
                                            <source src={getVideoFromName(configuration?.cardVideoPath)} type="video/webm"/>
                                        </video>
                                        <img src={card_transparent} className={styles.card_img_transparent}/>
                                        <video autoPlay loop muted playsInline className={styles.card_video_flame}>
                                            <source src={flame_image} type="video/webm"/>
                                        </video>
                                        <div className={styles.card_name_container}>
                                            <div className={styles.card_name}>
                                                {configuration.roomType}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {playersComponent}
                        </div>
                        <div className={classnames("mergeteam-helptext-container")} >
                            <div className={classnames("mergeteam-helptext")} >
                                PLEASE SCAN ALL YOUR WRISTABANDS TO THE DEVICE
                            </div>
                        </div>
                        <ErrorComponent className={`${styles.form_disclaimer} ${styles.error_message} ${styles.levels_wrapper}`} error={errorMessage} setError={setErrorMessage}/>

                    </div>

                </div>
            </div>
            <Timer countdownTime={90} countdownAction={timeoutAction}/>
        </>
    )
}

export default OutsideMergeTeam;
