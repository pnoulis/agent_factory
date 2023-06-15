import MqttCore from "./mqttCore";

const OutdoorLeaderboard = ({client, deviceId,roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/leaderboard/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/leaderboard/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default OutdoorLeaderboard;