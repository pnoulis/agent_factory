import MqttCore from "./mqttCore";

const OutdoorGameAttemptUpdate = ({client, deviceId,roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/gameAttempt/update/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/gameAttempt/update/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default OutdoorGameAttemptUpdate;
