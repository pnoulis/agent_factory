import MqttCore from "./mqttCore";

const ScoreboardTopTenMqtt = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/scoreboard/topTen/response`,
        messageCallback,
        subscriptionPublishUrl: `/scoreboard/topTen`
    })

    return [publishCallback, unsubscribeCallback]
};

export default ScoreboardTopTenMqtt;
