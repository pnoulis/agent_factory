import React, {useEffect, useState} from 'react';
import WristbandBackgroundB from "../../assets/images/wristband_transparent_b.png";
import WristbandBackground from "../../assets/images/wristband_transparent.png";
import CardioLineVideo from "../../assets/videos/Cardio Line.webm";
import styles from "./scanwristband.module.scss"
import {useTranslation} from "../../context/TranslationContext";
import {useMqtt} from "../../context/MQTTcontext";
import {getItem} from "../../utils/storage";
import {SCREENS_DEVICE_ID_KEYS} from "../../utils/enums";
import WristbandScan from "../../neworking/mqtt/WristbandScan";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import {useStateHook} from "../../context/StateContext";
import {useHistory, useLocation, useParams} from "react-router-dom";
import RegisterWristband from "../../neworking/mqtt/RegisterWristband";
import Timer from "../../components/Timer/Timer";
import ErrorComponent from "../../components/ErrorComponent";

const ScanWristband = props => {
    const {t} = useTranslation()
    const history = useHistory()
    const {user, setUser} = useStateHook()
    const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    const deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)
    const [errorMessage, setErrorMessage] = useState('')
    const query = new URLSearchParams(useLocation().search);


    const [publishMessage, registerWristbandUnsubscribeCallback] = RegisterWristband({client, deviceId, messageCallback: (message)=> {
            handleMqttResponse(message).then((parsedMessage)=>{
                console.log('parsedMessage', parsedMessage)

                if(!query.has("redirectCheckUrl")){
                    history.replace(`/registration/${roomNumber}/thankYou`)
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
                if(query.has("redirectCheckUrl")){
                    history.replace(`${query.get("redirectCheckUrl")}?wristbandNumber=${parsedMessage.wristbandNumber}`)
                }

                else {
                    publishMessage({
                        username: user.username,
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

        if(!query.has("redirectCheckUrl") && !user?.username) {
            history.replace(`/registration/${roomNumber}`)
        }

        return () => {
            unsubscribeCallback()
            registerWristbandUnsubscribeCallback()

        }
    }, [])


    const translations = {
        scanYourWristband: t("Registration/Text_40"),
        keepYourWristband: t("Registration/Text_41")
    }

    const countdownAction = () => {
        setUser({})
        history.replace(`/registration/${roomNumber}`)
    }

    return (
        <div>
            <div className={styles.wristband_wrapper}>
                <div className={styles.wristband_container}>
                    <div className={styles.wristband_content}>
                        <header>
                            <h1>{translations.scanYourWristband}</h1>
                        </header>


                        <div className={styles.wristband_disclaimer}>
                            {translations.keepYourWristband}
                        </div>
                       <ErrorComponent className={`${styles.form_disclaimer} ${styles.error_message}`} error={errorMessage} setError={setErrorMessage}/>
                    </div>
                </div>
                <div className={styles.wristband_flame_container}>
                    <div className={styles.wristband_flame_item}>
                        <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img_b}`}>
                            <img src={WristbandBackgroundB}/>
                        </div>
                        <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_video}`}>
                            <video width="" height="" autoPlay loop muted playsInline className={styles.video_bg}>
                                <source src={CardioLineVideo} type="video/webm"/>
                            </video>
                        </div>
                        <div className={`${styles.wristabnd_flame_media} ${styles.wristband_flame_img}`}>
                            <img src={WristbandBackground}/>
                            </div>
                        </div>
                        <div className={styles.name_of_your_team}>
                            {user?.username}
                        </div>
                </div>
            </div>
            <Timer countdownTime={30} countdownAction={countdownAction}/>
        </div>
    );
};

ScanWristband.propTypes = {

};

export default ScanWristband;
