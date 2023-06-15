// /themaze/outsideScreen1/gui/game/doorClosed/alleyoops

import MqttCore from "./mqttCore";

const OutdoorDoorClosed = ({client, deviceId, roomName, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/game/doorClosed/${roomName}`,
        messageCallback,
        subscriptionPublishUrl: ``
    })

    return [publishCallback, unsubscribeCallback]
};

export default OutdoorDoorClosed;
