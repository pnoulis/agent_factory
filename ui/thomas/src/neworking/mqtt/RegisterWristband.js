import MqttCore from "./mqttCore";

const RegisterWristband = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/player/registerWristband/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/player/registerWristband`
    })

    return [publishCallback, unsubscribeCallback]
};

export default RegisterWristband;
