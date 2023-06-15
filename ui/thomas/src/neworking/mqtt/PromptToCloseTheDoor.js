// "/themaze/insideScreen1/gui/game/promptToCloseTheDoor/alleyhoops"

import MqttCore from "./mqttCore";

const PromptToCloseTheDoor = ({client, deviceId, roomName, messageCallback}) => {

    const [ unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/game/promptToCloseTheDoor/${roomName}`,
        messageCallback,
        subscriptionPublishUrl: ``
    })

    return [unsubscribeCallback]
};

export default PromptToCloseTheDoor;
