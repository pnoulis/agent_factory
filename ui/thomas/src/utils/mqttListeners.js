class MqttListeners {
    constructor() {
        if(this.instance) {
            return this.instance
        }

        this.addListener = this.addListener.bind(this)
        this.init = this.init.bind(this)
        this.instance = this
    }

    init = (client)=>{
        this.client = client
    }

    addListener = ({subscriptionUrl, messageCallback}) => {
        if(!this[subscriptionUrl]) {
            this[subscriptionUrl] = function (topic, message) {
                if(topic === subscriptionUrl) {
                    messageCallback(message.toString())
                }
            }
            this.client.on('message', this[subscriptionUrl])
        } else {
            this.removeListener(subscriptionUrl)
            this[subscriptionUrl] = function (topic, message) {
                if(topic === subscriptionUrl) {
                    messageCallback(message.toString())
                }
            }
            this.client.on('message', this[subscriptionUrl])
        }
    }

    removeListener = (subscriptionUrl) => {
        if(this[subscriptionUrl]) {
            this.client.removeListener('message', this[subscriptionUrl])
            this[subscriptionUrl] = null
        }
    }

    addSubscription = (subscriptionUrl) => {
        if(!this[subscriptionUrl + 'subscription']) {
             this.client.subscribe(subscriptionUrl, function (err) {
                if (!err) {
                    console.log(`Subscribed to ${subscriptionUrl}`)
                }
            })

            this[subscriptionUrl + 'subscription'] = subscriptionUrl
        }
    }

    removeSubscription = (subscriptionUrl) => {
        this.client.unsubscribe(`${subscriptionUrl}`, function (err) {
            if (!err) {
                console.log(`unsubscribed from ${subscriptionUrl}`)
            }
        })
        this[subscriptionUrl + 'subscription'] = null
    }

    isSubscribed = (subscriptionUrl) => {
        return !! this[subscriptionUrl + 'subscription']
    }
}

const mqttListenersUtil = new MqttListeners()
export default mqttListenersUtil
