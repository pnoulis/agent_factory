export const handleMqttResponse = (response) => {
    return new Promise(((resolve, reject) => {
        if (!response) {
            reject()
        }

        const parsedResponse = JSON.parse(response)

        if (parsedResponse.result === "OK") {
            resolve(parsedResponse)
        }

        reject(parsedResponse)
    }))
}
