import MqttCore from "./mqttCore";

const PanicButtonCall = ({client, deviceId, roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/panicbutton/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/panicbutton/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default PanicButtonCall;
