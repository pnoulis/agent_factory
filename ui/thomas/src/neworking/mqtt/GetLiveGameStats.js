import MqttCore from "./mqttCore";

const GetLiveGameStats = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/player/liveGameStats/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/player/liveGameStats`
    })

    return [publishCallback, unsubscribeCallback]
};

export default GetLiveGameStats;
