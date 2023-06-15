import MqttCore from "./mqttCore";

const WristbandScan = ({client, deviceId, messageCallback}) => {

    const [unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/player/wristbandScan`,
        messageCallback
    })

    return [unsubscribeCallback]
};

export default WristbandScan;
