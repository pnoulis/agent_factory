import MqttCore from "./mqttCore";

const InsideConfiguration = ({client, deviceId,roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/inside/config/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/inside/config/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default InsideConfiguration;