import MqttCore from "./mqttCore";

const LanguageChange = ({client, deviceId, roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/changeLanguage/${roomName}`,
        messageCallback,
        subscriptionPublishUrl: ``
    })

    return [publishCallback, unsubscribeCallback]
};

export default LanguageChange;
