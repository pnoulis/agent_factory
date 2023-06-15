
import MqttCore from "./mqttCore";

const InsideTimeup = ({client, deviceId, roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/game/timeup/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/game/timeup/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default InsideTimeup;
