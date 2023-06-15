import MqttCore from "./mqttCore";

const ResetWristband = ({client, deviceId}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        subscriptionUrl: '',
        client,
        subscriptionPublishUrl: `/${deviceId}/gui/wristband/resetWristbands`,
        messageCallback: ()=>{}
    })

    return [publishCallback, unsubscribeCallback]
};

export default ResetWristband;
