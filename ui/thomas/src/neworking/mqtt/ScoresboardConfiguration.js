import MqttCore from "./mqttCore";

const ScoresboardConfiguration = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/scoreboard/live/response`,
        messageCallback,
        subscriptionPublishUrl: `/scoreboard/live`
    })

    return [publishCallback, unsubscribeCallback]
};

export default ScoresboardConfiguration;
