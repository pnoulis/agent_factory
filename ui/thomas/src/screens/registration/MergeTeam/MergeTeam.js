import React, {useEffect, useState} from 'react';
import styles from "./MergeTeam.module.scss";
import Container from "../../../components/Container";
import imgB from "../../../assets/images/wristband_transparent_b.png";
import CardioLineVideo from "../../../assets/videos/Cardio Line.webm";
import imgT from "../../../assets/images/wristband_transparent.png";
import imgX  from "../../../assets/images/Mrg_01.png";
import {useTranslation} from "../../../context/TranslationContext";
import {useHistory, useParams} from "react-router-dom";
import {useStateHook} from "../../../context/StateContext";
import {useMqtt} from "../../../context/MQTTcontext";
import {getItem} from "../../../utils/storage";
import {SCREENS_DEVICE_ID_KEYS} from "../../../utils/enums";
import {handleMqttResponse} from "../../../utils/mqttUtlils";
import WristbandScan from "../../../neworking/mqtt/WristbandScan";
import WristbandValidation from "../../../neworking/mqtt/WristbandValidation";
import Timer from "../../../components/Timer/Timer";
import ErrorComponent from "../../../components/ErrorComponent";


const MergeTeam = props => {
    const history = useHistory()
    const {t} = useTranslation()
    const {mergeTeamUsers, setMergeTeamUser, setMergeTeamName, clearMergeTeamUsers} = useStateHook()

    const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    const deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)
    const [errorMessage, setErrorMessage] = useState('')

    const [publishMessage, wristbandValidationUnsubscribeCallback] = WristbandValidation({client, deviceId, messageCallback: (message)=> {
            handleMqttResponse(message).then((parsedMessage)=>{
                console.log('parsedMessage', parsedMessage)
                    const isUserAlreadyAdded = mergeTeamUsers.filter((player)=>player.username === parsedMessage?.player?.username).length > 0
                if(isUserAlreadyAdded) {
                    setErrorMessage("User has already added in this team")
                } else {
                    setMergeTeamUser(parsedMessage.player)
                }

            }).catch((error)=>{
                console.error('error RegisterWristband', error)
                if(error.message) {
                    setErrorMessage(error.message)
                }
            })
        }})

    const [unsubscribeCallback] = WristbandScan({client, deviceId, messageCallback: (message)=> {
            handleMqttResponse(message).then((parsedMessage) => {
                console.log('parsedMessage WristbandScan', parsedMessage)
                if(mergeTeamUsers.length === 6) {
                    setErrorMessage("Maximum player number has been reached")
                } else {
                    publishMessage({
                        wristbandNumber: parsedMessage.wristbandNumber
                    })
                }
            }).catch((error)=>{
                console.error('error', error)
                if(error.message) {
                    setErrorMessage(error.message)
                }
            })
        }})


    useEffect(() =>{
        clearMergeTeamUsers()
        return () => {
            unsubscribeCallback()
            wristbandValidationUnsubscribeCallback()
        }
    }, [])


    const translations = {
        please: t('Registration/Text_42'),
        merge: t('Registration/Text_43'),
        player1:t('Registration/Text_44'),
        player2:t('Registration/Text_45'),
        player3:t('Registration/Text_46'),
        player4:t('Registration/Text_47'),
        player5:t('Registration/Text_48'),
        player6:t('Registration/Text_49'),
    }

    const handleMergeTeamAction = () => {
        if(mergeTeamUsers?.length < 2) {
            setErrorMessage("Team should have at least 2 members")
        } else {
            history.replace(`/registration/${roomNumber}/mergeTeam/enter-name`)

        }
    }

    const countdownAction = () => {
        setMergeTeamName('')
        clearMergeTeamUsers()
        history.replace(`/registration/${roomNumber}`)
    }

    return(
        <Container>
        <div className={styles.wristband_wrapper}>
            <div className={styles.wristband_container}>
                <div className={styles.wristband_content}>
                    <header>
                        <h3>{translations.please}</h3>
                    </header>
                </div>
            </div>

            <div className={styles.wristband_flame_container}>
                <div className={`${styles.wristband_flame_item} ${styles.red_flame}`}>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img_b}`}>
                        <img src={imgB} />
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_video}`}>
                        <video width="" height="" autoPlay loop muted playsInline className={styles.video_bg}>
                            <source src={CardioLineVideo} type="video/webm" />
                        </video>
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img}`}>
                        <img src={imgT} />
                    </div>
                    <div className={styles.remove_flame}>
                        <img src={imgX} />
                    </div>
                    <div className={styles.name_of_your_team}>
                        {mergeTeamUsers && mergeTeamUsers[0]? mergeTeamUsers[0].username :  translations.player1}
                    </div>
                </div>

                <div className={`${styles.wristband_flame_item} ${styles.red_flame}`}>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img_b}`}>
                        <img src={imgB} />
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_video}`}>
                        <video width="" height="" autoPlay loop muted playsInline className={styles.video_bg}>
                            <source src={CardioLineVideo} type="video/webm" />
                        </video>
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img}`}>
                        <img src={imgT} />
                    </div>
                    <div className={styles.remove_flame}>
                        <img src={imgX} />
                    </div>
                    <div className={styles.name_of_your_team}>
                    {mergeTeamUsers && mergeTeamUsers[1]? mergeTeamUsers[1].username : translations.player2}
                    </div>
                </div>

                <div className={`${styles.wristband_flame_item} ${styles.red_flame}`}>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img_b}`}>
                        <img src={imgB} />
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_video}`}>
                        <video width="" height="" autoPlay loop muted playsInline className={styles.video_bg}>
                            <source src={CardioLineVideo} type="video/webm" />
                        </video>
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img}`}>
                        <img src={imgT} />
                    </div>
                    <div className={styles.remove_flame}>
                        <img src={imgX} />
                    </div>
                    <div className={styles.name_of_your_team}>
                    {mergeTeamUsers && mergeTeamUsers[2]? mergeTeamUsers[2].username : translations.player3}
                    </div>
                </div>

                <div className={`${styles.wristband_flame_item} ${styles.red_flame}`}>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img_b}`}>
                        <img src={imgB} />
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_video}`}>
                        <video width="" height="" autoPlay loop muted playsInline className={styles.video_bg}>
                            <source src={CardioLineVideo} type="video/webm" />
                        </video>
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img}`}>
                        <img src={imgT} />
                    </div>
                    <div className={styles.remove_flame}>
                        <img src={imgX} />
                    </div>
                    <div className={styles.name_of_your_team}>
                    {mergeTeamUsers && mergeTeamUsers[3]? mergeTeamUsers[3].username : translations.player4}
                    </div>
                </div>

                <div className={`${styles.wristband_flame_item} ${styles.red_flame}`}>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img_b}`}>
                        <img src={imgB} />
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_video}`}>
                        <video width="" height="" autoPlay loop muted playsInline className={styles.video_bg}>
                            <source src={CardioLineVideo} type="video/webm" />
                        </video>
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img}`}>
                        <img src={imgT} />
                    </div>
                    <div className={styles.remove_flame}>
                        <img src={imgX} />
                    </div>
                    <div className={styles.name_of_your_team}>
                    {mergeTeamUsers && mergeTeamUsers[4]? mergeTeamUsers[4].username : translations.player5}
                    </div>
                </div>

                <div className={`${styles.wristband_flame_item} ${styles.red_flame}`}>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img_b}`}>
                        <img src={imgB} />
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_video}`}>
                        <video width="" height="" autoPlay loop muted playsInline className={styles.video_bg}>
                            <source src={CardioLineVideo} type="video/webm" />
                        </video>
                    </div>
                    <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img}`}>
                        <img src={imgT} />
                    </div>
                    <div className={styles.remove_flame}>
                        <img src={imgX} />
                    </div>
                    <div className={styles.name_of_your_team}>
                    {mergeTeamUsers && mergeTeamUsers[5]? mergeTeamUsers[5].username : translations.player6}
                    </div>
                </div>

            </div>



            <div className={`${styles.one_button_container} ${styles.mauve_btns}`}>
                <ErrorComponent className={styles.error_msg_container} error={errorMessage} setError={setErrorMessage}/>

                <div className={styles.one_button_item} onClick={handleMergeTeamAction}>
                    <div className={`${styles.btn_game} ${styles.effect_click}`} style={{}}>
                        <div className={styles.btn_bg_color}></div>
                        <div className={styles.btn_container}>
                            <div className={styles.header_btn}>{translations.merge}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Timer  countdownTime={90} countdownAction={countdownAction}/>
        </Container>
    )
}

export default MergeTeam
