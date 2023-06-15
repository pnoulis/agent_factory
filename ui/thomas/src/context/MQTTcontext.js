import React, {createContext, useContext, useState, useEffect} from 'react';
import mqtt from 'mqtt'

const MqttContext = createContext(null)

const brokerUsername = process.env.REACT_APP_BROKER_USERNAME
const brokerPassword = process.env.REACT_APP_BROKER_PASSWORD
const brokerUrl = process.env.REACT_APP_BROKER_URL
const brokerPort = process.env.REACT_APP_BROKER_PORT
const brokerProtocol = process.env.REACT_APP_BROKER_PROTOCOL

const mqttHost = `${brokerProtocol}://${brokerUrl}:${brokerPort}`
const mqttOptions = {
    // username: brokerUsername,
    // password: brokerPassword,
    keepalive: 30,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: false,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    rejectUnauthorized: false
}

const Connector = ({children}) => {
    const [client, setClient] = useState(null);

    const mqttConnect = () => {
        setClient(mqtt.connect(mqttHost, mqttOptions));
    };
    useEffect(()=>{
        mqttConnect()
    }, [])

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                console.log('connected')

            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                console.log('Reconnecting')
            });
        }
        return () => {
            if(client) {
                return client.end()
            }
        }
    }, [client]);

    return (
        <MqttContext.Provider value={{client}}>
            {children}
        </MqttContext.Provider>
    );
};

export const useMqtt = () => {
    return useContext(MqttContext)
}

export default Connector;
