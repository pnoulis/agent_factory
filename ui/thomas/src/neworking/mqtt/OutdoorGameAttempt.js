import MqttCore from "./mqttCore";

const OutdoorGameAttempt = ({client, deviceId,roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/gameAttempt/init/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/gameAttempt/init/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default OutdoorGameAttempt;