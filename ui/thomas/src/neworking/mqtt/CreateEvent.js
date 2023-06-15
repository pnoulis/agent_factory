import MqttCore from "./mqttCore";

const CreateEvent = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/groupEvent/createPersonResponsible/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/groupEvent/createPersonResponsible`
    })

    return [publishCallback, unsubscribeCallback]
};

export default CreateEvent;
