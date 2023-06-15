import React, {createContext, useContext, useEffect, useState} from 'react';
import {useMqtt} from "./MQTTcontext";
import {getItem, saveItem} from "../utils/storage";
import {ROOM_TYPES} from "../utils/enums";
import {useTranslation} from "./TranslationContext";
import LoadingScreen from "../screens/LoadingScreen";
import ResetWristband from "../neworking/mqtt/ResetWristband";
import OutdoorConfiguration from "../neworking/mqtt/OutdoorConfiguration";
import {useHistory, useParams} from "react-router-dom";
import ResetDevice from "../neworking/mqtt/ResetDevice";
import {roomsSchema} from "../screens/screenSelector/ScreenSelector";
import OutdoorDoorClosed from "../neworking/mqtt/OutdoorDoorClosed";
import {v4 as uuidv4} from "uuid";
import BootDevice from "../neworking/mqtt/BootDevice";
import {handleMqttResponse} from "../utils/mqttUtlils";
import LanguageChange from "../neworking/mqtt/LanguageChange";





const outdoorConfigContext = createContext('en')
const isDevelopment = process.env.NODE_ENV === 'development'

const OutdoorConfigurationContextProvider = ({children}) => {
    const {client} = useMqtt()

    const params = useParams()
    const roomName = params.room

    const deviceName = roomsSchema.find((room) => roomName?.toUpperCase() === room.roomName && ROOM_TYPES.OUTSIDE_ROOM_SCREEN === room.type)

    let deviceId = getItem(deviceName?.path)

    if(!deviceId) {
        deviceId = uuidv4();
        saveItem(deviceName?.path, deviceId)
        const [publishCallback] = BootDevice({client, deviceId: deviceId, messageCallback:(message)=>{
                handleMqttResponse(message).then(()=>{

                }).catch(()=>{
                    console.error('Exception')
                })
            }})

        publishCallback({
            deviceId: deviceId,
            roomName,
            deviceType: deviceName.type
        })
    }

    const history = useHistory()

    const [configuration, setConfiguration] = useState({})

    const [attempt, setAttempt] = useState({})
    const [roomUnavailable, setRoomUnavailable] = useState(false)

    const {setTranslations, changeLanguage} = useTranslation()

    const [publishMessage, unsubscribeResetCallback] = ResetWristband({client, deviceId})
    const [ unsubscribeResetDeviceCallback] = ResetDevice({roomName, client, deviceId, messageCallback: (message) => {
            reset()
        }})

    useEffect(()=> {
        const [publishCallback, unsubscribeCallback] = OutdoorConfiguration({client, deviceId, roomName, messageCallback: (message)=> {
            const parsedResponse = JSON.parse(message)
            console.log(parsedResponse);
            //changeLanguage(parsedResponse.language?.toLowerCase())
            changeLanguage('en')
            setConfiguration(parsedResponse)         
        }})
        publishCallback("")


        const [, unsubscribeCallbackChaneLanguage] = LanguageChange({client, deviceId, roomName, messageCallback: (message)=> {
                handleMqttResponse(message).then((parsedMessage)=>{
                    changeLanguage(parsedMessage.language?.toLowerCase())

                }).catch((error)=>{
                    console.error('error changeLanguage', error)

                })

            }})


        return () => {
            unsubscribeCallbackChaneLanguage()
            unsubscribeCallback()
            unsubscribeResetCallback()
            unsubscribeResetDeviceCallback()
        }
    }, [client, deviceId])

    useEffect(()=> {
        if(configuration) {
            setTranslations(configuration.translations)
        }
    }, [configuration])

    const reset = () => {
        goToHome()
        setAttempt({})
        setRoomUnavailable(false)
    }

    const goToHome = () => {
        history.replace(`/outside/${roomName}`)
    }

    useEffect(() => {
        if(attempt?.gameId) {
            setRoomUnavailable(true)
            const timeoutId = setTimeout(()=>{
                setRoomUnavailable(false)
                setAttempt({})
            }, 30000)
            const [publishCallback, unsubscribeCallback] = OutdoorDoorClosed({client, deviceId, roomName, messageCallback: (message)=> {
                    clearTimeout(timeoutId)
                    unsubscribeCallback()
                }})

        }

    }, [attempt?.gameId])

    return (
        <outdoorConfigContext.Provider value={{configuration, client, deviceId, attempt, setAttempt, goToHome, reset, setRoomUnavailable, roomUnavailable}}>
            {isDevelopment && <div onClick={()=>publishMessage("")} style={{position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', color: 'black', cursor: 'pointer', zIndex: '1000'}}>Reset Wristband</div>}
            {!configuration.translations?<LoadingScreen/>:children}
        </outdoorConfigContext.Provider>
    );
};

export const useOutdoorConfiguration = () => {
    return useContext(outdoorConfigContext)
}

OutdoorConfigurationContextProvider.propTypes = {

};

export default OutdoorConfigurationContextProvider;
