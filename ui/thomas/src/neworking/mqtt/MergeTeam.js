import MqttCore from "./mqttCore";

const MergeTeam = ({client, deviceId, messageCallback}) => {

    const [publishCallback, unsubscribeCallback] = MqttCore({
        client,
        subscriptionUrl: `/${deviceId}/gui/team/merge/response`,
        messageCallback,
        subscriptionPublishUrl: `/${deviceId}/gui/team/merge`
    })

    return [publishCallback, unsubscribeCallback]
};

export default MergeTeam;
