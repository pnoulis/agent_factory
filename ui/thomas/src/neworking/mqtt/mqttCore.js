import mqttListenersUtil from "../../utils/mqttListeners";

const brokerPrefix = process.env.REACT_APP_BROKER_PREFIX

const MqttCore = ({client, subscriptionUrl, subscriptionPublishUrl,  messageCallback}) => {
        if(client) {
            mqttListenersUtil.init(client)

            mqttListenersUtil.addSubscription(`${brokerPrefix}${subscriptionUrl}`)

            mqttListenersUtil.addListener({subscriptionUrl: `${brokerPrefix}${subscriptionUrl}`, messageCallback})
        }
        const unsubscribeCallback = () => {
            if(client) {
                mqttListenersUtil.removeListener(`${brokerPrefix}${subscriptionUrl}`)
                mqttListenersUtil.removeSubscription(`${brokerPrefix}${subscriptionUrl}`)
            }

        }

    const publishMessage = (payload) => {
        if(client && subscriptionPublishUrl) {
            const publishUrl = `${brokerPrefix}${subscriptionPublishUrl}`

            if(typeof payload === "string") {
                client.publish(publishUrl, payload)
            } else {
                const _payload = {
                    timestamp: new Date().getTime()
                }
                client.publish(publishUrl, JSON.stringify({..._payload, ...payload}))
            }
        }
    }

        const isSubscribed = () => {
            return mqttListenersUtil.isSubscribed(subscriptionUrl)
        }

    return [publishMessage, unsubscribeCallback, isSubscribed]
};


export default MqttCore;
