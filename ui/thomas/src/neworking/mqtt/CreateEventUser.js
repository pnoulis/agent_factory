import MqttCore from "./mqttCore";

const CreateEventUser = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/groupEvent/registerEventPlayerWithWristband/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/groupEvent/registerEventPlayerWithWristband`
    })

    return [publishCallback, unsubscribeCallback]
};

export default CreateEventUser;
