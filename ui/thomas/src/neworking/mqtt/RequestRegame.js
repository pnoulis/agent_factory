
//"/themaze/insideScreen1/gui/game/requestRegame/alleyhoops"

import MqttCore from "./mqttCore";

const RequestRegame = ({client, deviceId, roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/game/requestRegame/${roomName}/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/game/requestRegame/${roomName}`
    })

    return [publishCallback, unsubscribeCallback]
};

export default RequestRegame;
