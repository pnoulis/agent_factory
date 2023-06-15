import React, {createContext, useContext, useEffect, useState} from 'react';
import {useMqtt} from "./MQTTcontext";
import RegistrationConfiguration from "../neworking/mqtt/RegistrationConfiguration";
import {getItem, saveItem} from "../utils/storage";
import {ROOM_TYPES, SCREENS_DEVICE_ID_KEYS} from "../utils/enums";
import {useTranslation} from "./TranslationContext";
import {useParams} from "react-router-dom";
import ResetWristband from "../neworking/mqtt/ResetWristband";
import {v4 as uuidv4} from "uuid";
import BootDevice from "../neworking/mqtt/BootDevice";
import {handleMqttResponse} from "../utils/mqttUtlils";

const registrationConfigContext = createContext('en')

const isDevelopment = process.env.NODE_ENV === 'development'

const RegistrationConfigurationContextProvider = ({children}) => {
    const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    let deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)

    if(!deviceId) {
        deviceId = uuidv4();
        saveItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`, deviceId)
        const [publishCallback] = BootDevice({client, deviceId: deviceId, messageCallback:(message)=>{
                handleMqttResponse(message).then(()=>{

                }).catch(()=>{
                    console.error('Exception')
                })
            }})

        publishCallback({
            deviceId: deviceId,
            roomName: `registration${roomNumber}`,
            deviceType: ROOM_TYPES.REGISTRATION_SCREEN
        })
    }
    const [configuration, setConfiguration] = useState({})

    const {setTranslations} = useTranslation()
    const [publishMessage, unsubscribeResetCallback] = ResetWristband({client, deviceId})

    useEffect(()=> {
        const [publishCallback, unsubscribeCallback] = RegistrationConfiguration({client, deviceId, messageCallback: (message)=> {
            setConfiguration(JSON.parse(message))
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
        <registrationConfigContext.Provider value={{configuration}}>
            {isDevelopment && <div onClick={()=>publishMessage("")} style={{position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', color: 'black', cursor: 'pointer', zIndex: '1000'}}>Reset Wristband</div>}
            {children}
        </registrationConfigContext.Provider>
    );
};

export const useRegistrationConfiguration = () => {
    return useContext(registrationConfigContext)
}

RegistrationConfigurationContextProvider.propTypes = {

};

export default RegistrationConfigurationContextProvider;
