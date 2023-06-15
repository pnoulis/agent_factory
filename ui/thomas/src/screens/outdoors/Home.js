import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import outsideStyles from "./outside.module.scss";
import styles from "./Home.module.scss"
import card_blue from "../../assets/outside/outsideImages/card_blue.png";
import card_blue_transparent from "../../assets/outside/outsideImages/card_blue_transparent.png";
import flame_image from "../../assets/outside/outsideImages/flame.webm";
import HOM_5 from "../../assets/outside/outsideImages/HOM_05.png";
import RoomDifficulty from "./components/RoomDifficulty";
import PlayerSkills from "./components/PlayerSkills";
import LeaderboardTable from "./components/LeaderboardTable";
import {useTranslation} from "../../context/TranslationContext";
import {useOutdoorConfiguration} from "../../context/OutdoorConfigContext";
import {useHistory} from "react-router-dom";
import WristbandScan from "../../neworking/mqtt/WristbandScan";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import OutdoorGameAttempt from "../../neworking/mqtt/OutdoorGameAttempt";
import OutdoorLeaderboard from "../../neworking/mqtt/OutdoorLeaderboard";
import OutdoorDoorClosed from "../../neworking/mqtt/OutdoorDoorClosed";
import ErrorComponent from "../../components/ErrorComponent";
import {getVideoFromName} from "../../utils/common";
import {useOutSideLayoutColorChange} from "../../layouts/OutsideLayout";

//cardVideoPath
const Home = props => {
    const params = useParams()
    const roomName = params?.room

    const history = useHistory()

    const {configuration, client, deviceId, setAttempt, roomUnavailable} = useOutdoorConfiguration()
    const {card, card_transparent} = useOutSideLayoutColorChange()
    const [leaderboard, setLeaderboard] = useState({})

    const {t} = useTranslation()
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

    const [errorMessage, setErrorMessage] = useState('')


    const [publishAttemptCallback, unsubscribeAttemptCallback] = OutdoorGameAttempt({
        client, deviceId, roomName, messageCallback: (message) => {
            handleMqttResponse(message).then((parsedMessage) => {
                console.log("OutdoorGameAttempt parsedMessage", parsedMessage)
                setAttempt(parsedMessage?.newGameAttempt)
                history.replace(`/outside/${roomName}/outsideMergeTeam`)
            }).catch((error) => {
                setErrorMessage(error.message)
            })
        }
    })


    const [unsubscribeWristbandCallback] = WristbandScan({
        client, deviceId, messageCallback: (message) => {
            handleMqttResponse(message).then((parsedMessage) => {
                console.log('parsedMessage WristbandScan', parsedMessage)
                publishAttemptCallback({
                    wristbandNumber: parsedMessage.wristbandNumber,
                    wristbandColor: parsedMessage.wristbandColor
                })

            }).catch((error) => {
                console.error('error', error)
                if (error.message) {
                    setErrorMessage(error.message)
                }
            })
        }
    })


    useEffect(() => {
        const [publishCallback, unsubscribeCallback] = OutdoorLeaderboard({
            client, deviceId, roomName, messageCallback: (message) => {
                setLeaderboard(JSON.parse(message))
            }
        })
        publishCallback("")

        return () => {
            unsubscribeCallback()
            unsubscribeAttemptCallback()
            unsubscribeWristbandCallback()
        }
    }, [client, deviceId])

    return (
        <div className={outsideStyles['the-maze-outside-container']}>
            <div>
                <div className={styles.levels_wrapper}>
                    <div className={styles.levels_container}>
                        <div className={styles.levels_text}>
                            {OutdoorTranslation.gameDescription}
                        </div>
                        <div className={styles.levels_divider}></div>
                        <div className={styles.levels_header}>{OutdoorTranslation.missionGoal}</div>
                        <div className={styles.levels_all_items}>
                            <RoomDifficulty time={configuration?.easyTime} difficulty={OutdoorTranslation.easy}
                                            rate={configuration?.easyRate}/>
                            <RoomDifficulty time={configuration?.mediumTime} difficulty={OutdoorTranslation.medium}
                                            rate={configuration?.mediumRate}/>
                            <RoomDifficulty time={configuration?.hardTime} difficulty={OutdoorTranslation.hard}
                                            rate={configuration?.hardRate}/>
                        </div>
                    </div>
                    <ErrorComponent className={`${styles.form_disclaimer} ${styles.error_message}`} error={errorMessage}
                                    setError={setErrorMessage}/>
                </div>
                <div className={styles.skills_container}>
                    <PlayerSkills skill={OutdoorTranslation.fitness} skillLevel={configuration.fitness}/>
                    <PlayerSkills skill={OutdoorTranslation.intelligence} skillLevel={configuration.intelligence}/>
                    <PlayerSkills skill={OutdoorTranslation.skills} skillLevel={configuration.skills}/>
                </div>
            </div>
            <div className={`${styles.card_wrapper} ${styles.blue_card}`}>
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
                <div
                    className={`${styles.button_container} ${roomUnavailable ? styles.unavailable : styles.available}`}>
                    <div className={styles.button_text}>ROOM {roomUnavailable ? 'UNAVAILABLE' : 'AVAILABLE'}</div>
                </div>
            </div>


            <div className="scoreboard-container">
                <div className="live_info_wrapper">
                    <div className="live_info_container">
                        <div className={styles.live_info_table_container}>
                            <div className={styles.label_live_info}>
                                <div className={styles.live_info_img}>
                                    <img src={HOM_5}/>
                                </div>
                                <div className={styles.live_info_label_text}>
                                    <span>MISSION'S</span>
                                    <span>HALL OF FAME</span>
                                </div>
                            </div>
                            <div className={styles.live_info_table}>
                                <div className={`${styles.live_info_row} ${styles.the_header}`}>
                                    <div className={styles.header_team_name}>Team Name</div>
                                    <div className={styles.header_total_points}>Total Points</div>
                                </div>
                                <LeaderboardTable leaderboard={leaderboard}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

Home.propTypes = {};

export default Home;
