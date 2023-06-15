import MqttCore from "./mqttCore";

const OutdoorConfiguration = ({client, deviceId,roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/outside/config/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/outside/config/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default OutdoorConfiguration;
