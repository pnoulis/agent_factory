import MqttCore from "./mqttCore";

const ResetDevice = ({client, deviceId, roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        subscriptionUrl: `/${deviceId}/gui/game/reset/${roomName}`,
        client,
        subscriptionPublishUrl: '',
        messageCallback
    })

    return [publishCallback, unsubscribeCallback]
};

export default ResetDevice;

