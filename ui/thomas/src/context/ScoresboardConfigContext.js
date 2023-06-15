import React, {createContext, useContext, useEffect, useState} from 'react';
import {useMqtt} from "./MQTTcontext";
import {getItem} from "../utils/storage";
import {ROOM_TYPES, SCREENS_DEVICE_ID_KEYS} from "../utils/enums";
import {useTranslation} from "./TranslationContext";
import LoadingScreen from "../screens/LoadingScreen";
import ResetWristband from "../neworking/mqtt/ResetWristband";
import ScoresboardConfiguration from "../neworking/mqtt/ScoresboardConfiguration";
import {useHistory, useParams} from "react-router-dom";
import {roomsSchema} from "../screens/screenSelector/ScreenSelector";
import ResetDevice from "../neworking/mqtt/ResetDevice";
import ScoreboardTopTenMqtt from "../neworking/mqtt/ScoreboardTopTenMqtt";






const scoresboardConfigContext = createContext({})
const isDevelopment = process.env.NODE_ENV === 'development'

const ScoresboardConfigurationContextProvider = ({children}) => {
    const {client} = useMqtt()

    const params = useParams()
    const history = useHistory()

    const roomName = params.room
    const deviceId = getItem(SCREENS_DEVICE_ID_KEYS.SCOREBOARD)

    const [configuration, setConfiguration] = useState({})
    const [scoreboardTopTen, setScoreboardTopTen] = useState({})

    const {setTranslations} = useTranslation()

    const [publishMessage, unsubscribeResetCallback] = ResetWristband({client, deviceId})

    const [ unsubscribeResetDeviceCallback] = ResetDevice({roomName, client, deviceId, messageCallback: (message) => {
            reset()
        }})

    const reset = () => {
        goToHome()
    }

    const goToHome = () => {
        history.replace(`/scoreboard`)
    }

    useEffect(()=> {
        const [publishCallback, unsubscribeCallback] = ScoresboardConfiguration({client, deviceId, roomName, messageCallback: (message)=> {
                setConfiguration(JSON.parse(message))
            }})
        publishCallback("")

        return () => {
            unsubscribeCallback()
            unsubscribeResetCallback()
        }
    }, [client, deviceId])

    useEffect(()=> {
        const [publishCallback, unsubscribeCallback] = ScoreboardTopTenMqtt({client, deviceId, roomName, messageCallback: (message)=> {
                setScoreboardTopTen(JSON.parse(message))
            }})
        publishCallback("")

        return () => {
            unsubscribeCallback()
            unsubscribeResetCallback()
        }
    }, [client, deviceId])

    useEffect(()=> {
        if(configuration) {
            setTranslations(configuration.translations)
        }
    }, [configuration])

    return (
        <scoresboardConfigContext.Provider value={{configuration, client, deviceId, scoreboardTopTen}}>
            {isDevelopment && <div onClick={()=>publishMessage("")} style={{position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', color: 'black', cursor: 'pointer', zIndex: '1000'}}>Reset Wristband</div>}
            {configuration.translations?<LoadingScreen/>:children}
        </scoresboardConfigContext.Provider>
    );
};

export const useScoresboardConfiguration = () => {
    return useContext(scoresboardConfigContext)
}

ScoresboardConfigurationContextProvider.propTypes = {

};

export default ScoresboardConfigurationContextProvider;
