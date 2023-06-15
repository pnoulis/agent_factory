import React,{useEffect, useState} from 'react';
import styles from "./LiveInfo.module.scss";
import Container from "../../components/Container";
import Liv02 from "./../../assets/images/Liv_02.png";
import {useTranslation} from "../../context/TranslationContext";
import {useMqtt} from "../../context/MQTTcontext";
import {getItem} from "../../utils/storage";
import {SCREENS_DEVICE_ID_KEYS} from "../../utils/enums";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import GetLiveGameStats from "../../neworking/mqtt/GetLiveGameStats";




const LiveInfo = () => {

const {t} = useTranslation()
const [errorMessage, setErrorMessage] = useState('')
const history = useHistory()
const [liveStats, setLiveStats] = useState({})

const LiveInfoTranslation = {
    linfo: t('Registration/Text_00'), //I couldn't find translation for Live Information label
    name: t('Registration/Text_67'),
    teamName: t('Registration/Text_68'),
    missions: t('Registration/Text_69'),
    points: t('Registration/Text_70'),
    timePlayed: t('Registration/Text_71'),
    timeRemaining: t('Registration/Text_72'),
}

const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    const deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)
const query = new URLSearchParams(useLocation().search);

const [publishMessageStats, UnsubscribeCallbackStats] = GetLiveGameStats({client, deviceId, messageCallback: (message)=> {
    handleMqttResponse(message).then((parsedMessage)=>{

        console.log('parsedMessageStats', parsedMessage)
        setLiveStats(parsedMessage)

    }).catch((error)=>{
        console.error('error GetLiveGameStats', error)
        if(error.message) {
            setErrorMessage(error.message)
        }
    })
}})


useEffect(()=>{

publishMessageStats({wristbandNumber:query.get("wristbandNumber")})

return UnsubscribeCallbackStats

},[])

return (
    <>
        <Container>
            <div className={styles.the_maze_container}>
                <div className={styles.live_info_wrapper}>
                    <div className={styles.live_info_container}>
                        <div className={styles.live_info_table_container}>
                            <div className={styles.label_live_info}>
                                <div className={styles.live_info_img}>
                                    <img src={Liv02} />
                                </div>
                                <div className={styles.live_info_label_text}>
                                    <span>LIVE INFORMATION</span>
                                </div>
                            </div>
                            <div className={styles.live_info_table}>
                                <div className={styles.live_info_row}>
                                    <div className={styles.live_info_title}>{LiveInfoTranslation.name}</div>
                                    <div className={styles.live_info_result}>{liveStats.username}</div>

                                </div>
                                <div className={styles.live_info_row}>
                                    <div className={styles.live_info_title}>{LiveInfoTranslation.teamName}</div>
                                    <div className={styles.live_info_result}>{liveStats.teamName}</div>
                                </div>
                                <div className={styles.live_info_row}>
                                    <div className={styles.live_info_title}>{LiveInfoTranslation.missions}</div>
                                    <div className={styles.live_info_result}>{liveStats.missionsPlayed}</div>
                                </div>
                                <div className={styles.live_info_row}>
                                    <div className={styles.live_info_title}>{LiveInfoTranslation.points}</div>
                                    <div className={styles.live_info_result}>{liveStats.totalPoints}</div>
                                </div>
                                <div className={styles.live_info_row}>
                                    <div className={styles.live_info_title}>{LiveInfoTranslation.timePlayed}</div>
                                    <div className={styles.live_info_result}>{liveStats.timePlayed}</div>
                                </div>
                                {/* I took out Remaining Time */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </>
)
}

export default LiveInfo
