import MqttCore from "./mqttCore";

const RegisterUser = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/player/registration/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/player/registration`
    })

    return [publishCallback, unsubscribeCallback]
};

export default RegisterUser;
