import MqttCore from "./mqttCore";

const ScoreStatus = ({client, deviceId, roomName, messageCallback}) => {

    const [unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/game/scoreStatus/${roomName}`,
        messageCallback,
        subscriptionPublishUrl: ``
    })

    return [ unsubscribeCallback]
};

export default ScoreStatus;
