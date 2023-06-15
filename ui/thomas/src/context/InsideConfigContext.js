import React, {createContext, useContext, useEffect, useState} from 'react';
import {useMqtt} from "./MQTTcontext";
import {getItem, saveItem} from "../utils/storage";
import {ROOM_TYPES, SCREENS_DEVICE_ID_KEYS} from "../utils/enums";
import {useTranslation} from "./TranslationContext";
import LoadingScreen from "../screens/LoadingScreen";
import ResetWristband from "../neworking/mqtt/ResetWristband";

import {useHistory, useLocation, useParams} from "react-router-dom";
import InsideConfiguration from "../neworking/mqtt/InsideConfiguration";
import {roomsSchema} from "../screens/screenSelector/ScreenSelector";
import ResetDevice from "../neworking/mqtt/ResetDevice";
import {v4 as uuidv4} from "uuid";
import BootDevice from "../neworking/mqtt/BootDevice";
import {handleMqttResponse} from "../utils/mqttUtlils";
import LanguageChange from "../neworking/mqtt/LanguageChange";




const insideConfigContext = createContext({})
const isDevelopment = process.env.NODE_ENV === 'development'

const InsideConfigurationContextProvider = ({children}) => {
    const {client} = useMqtt()

    const params = useParams()
    const history = useHistory()

    const roomName = params.room
    const deviceName = roomsSchema.find((room) => roomName?.toUpperCase() === room.roomName && ROOM_TYPES.INSIDE_ROOM_SCREEN === room.type)


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




    const {search} = useLocation()

    const [configuration, setConfiguration] = useState({})

    const {setTranslations, changeLanguage} = useTranslation()

    const [publishMessage, unsubscribeResetCallback] = ResetWristband({client, deviceId})
    const [ unsubscribeResetDeviceCallback] = ResetDevice({roomName, client, deviceId, messageCallback: (message) => {
            reset()
        }})

    const reset = () => {
        goToHome()
    }

    const goToHome = () => {
        history.replace(`/inside/${roomName}${search}`)
    }

    useEffect(()=> {
        const [publishCallback, unsubscribeCallback] = InsideConfiguration({client, deviceId, roomName, messageCallback: (message)=> {
                const parsedResponse = JSON.parse(message)
                changeLanguage(parsedResponse.language?.toLowerCase())
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
        }
    }, [client, deviceId])

    useEffect(()=> {
        if(configuration) {
            setTranslations(configuration.translations)
        }
    }, [configuration])

    return (
        <insideConfigContext.Provider value={{configuration, client, deviceId}}>
            {isDevelopment && <div onClick={()=>publishMessage("")} style={{position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', color: 'black', cursor: 'pointer', zIndex: '1000'}}>Reset Wristband</div>}
            {!configuration.translations?<LoadingScreen/>:children}
        </insideConfigContext.Provider>
    );
};

export const useInsideConfiguration = () => {
    return useContext(insideConfigContext)
}

InsideConfigurationContextProvider.propTypes = {

};

export default InsideConfigurationContextProvider;
