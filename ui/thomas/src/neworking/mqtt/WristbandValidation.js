import MqttCore from "./mqttCore";

const WristbandValidation = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/player/isValid/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/player/isValid`
    })

    return [publishCallback, unsubscribeCallback]
};

export default WristbandValidation;
