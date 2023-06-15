import MqttCore from "./mqttCore";

const SetDifficulty = ({client, deviceId, roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/game/difficultySet/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/game/difficultySet/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default SetDifficulty;
