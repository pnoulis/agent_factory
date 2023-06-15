import MqttCore from "./mqttCore";

const GroupEventMergeTeam = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/groupteam/merge/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/groupteam/merge`
    })

    return [publishCallback, unsubscribeCallback]
};

export default GroupEventMergeTeam;
