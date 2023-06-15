import MqttCore from "./mqttCore";

const CheckWristband = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/wristband/info/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/wristband/info`
    })

    return [publishCallback, unsubscribeCallback]
};

export default CheckWristband;
