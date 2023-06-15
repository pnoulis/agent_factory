import MqttCore from "./mqttCore";

const UserLogin = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/player/login/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/player/login`
    })

    return [publishCallback, unsubscribeCallback]
};

export default UserLogin;
