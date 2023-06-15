import MqttCore from "./mqttCore";

const RegistrationConfiguration = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/registration/config/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/registration/config`
    })

    return [publishCallback, unsubscribeCallback]
};

export default RegistrationConfiguration;
