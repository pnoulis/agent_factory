import MqttCore from "./mqttCore";

const BootDevice = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl:`/booted/${deviceId}`,
        messageCallback,
        subscriptionPublishUrl: '/booted'
    })

    return [publishCallback, unsubscribeCallback]
};

export default BootDevice;
