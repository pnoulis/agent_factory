try:
    import paho.mqtt.client as mqtt
except ModuleNotFoundError as e:
    os.system("pip install paho-mqtt")

import time
from Libs.configuration import getConfiguration,initConfiguration

global client
client = 'Unknown'

def printError(message):
    CRED = '\033[91m'
    CEND = '\033[0m'       
    print(f"{CRED}{message}{CEND}")   

def printSuccess(message):
    CGREEN = '\033[32m'
    CEND = '\033[0m'       
    print(f"{CGREEN}{message}{CEND}")

def on_message(client, userdata, message):
    topic = message.topic
    msg = message.payload.decode('utf-8')
    qos = message.qos
    retain = message.retain;    
    client.messageCallback(topic,msg,qos,retain)
  
def on_connect(client, userdata, flags, rc):
    if rc==0:
       printSuccess(f"[MQTT]Client connected with the Broker with code {rc}.")    
       setSubscription()
    else:
       printError(f"[MQTT]Client bad connection Returned code: {rc}")

def clientReconnect(rc):
    METHOD_RECONNECT = 1
    if METHOD_RECONNECT == 1:
        showMessages=True
        while rc != 0:
            if showMessages==True: print("[MQTT]Reconnecting...")
            showMessages=False
            try:
                time.sleep(1)
                rc = client.reconnect()
            except Exception as e:
                pass
    if METHOD_RECONNECT == 2:
        tryConnection()

def on_disconnect(client, userdata, rc):
    printError("[MQTT]Client disconnected")
    clientReconnect(rc)

def clientInit(handler,topics):
    global client
    initConfiguration()
    initConfiguration()
    config = getConfiguration()   
    uuid = config["deviceId"]
    client = mqtt.Client(uuid,transport='websockets')
    client.messageCallback = handler
    client.subscriptionTopics = topics
    client.on_message    = on_message
    client.on_disconnect = on_disconnect
    client.on_connect    = on_connect  
    client.username_pw_set(
        username = config["username"],
        password = config["password"]
    )   
    tryConnection()
    
def match(sub, topic):
    if mqtt.topic_matches_sub(sub, topic)==False:
        #print("ERROR: "+sub+" "+topic)
        return False
    return True  

def getSinglewildcard(topic,ZeroBasedIndexOfWildcard):
    readTopic = topic.split("/")
    nameTopic = readTopic[ZeroBasedIndexOfWildcard]
    #printSuccess(f"[getSinglewildcard]{nameTopic}")
    return nameTopic
    
def setSubscription():
    global client
    print("[MQTT]Setting subscriptions")
    print(f"[MQTT]Topics:{client.subscriptionTopics}")
    client.subscribe(client.subscriptionTopics)

def getClient():
    return client

def tryConnection():
    showErrors = True
    config = getConfiguration()   
    broker = config["host"]
    port   = int(config["port"])  
    print("[Connection]Connecting to broker",broker,"On port",port)
    while True:
        try:        
            client.connect(broker,port)
            client.loop_start()
            break
        except Exception as e:
            if showErrors : printError(f"[Connection]Error:{e}")
            showErrors=False       
            try:       
                client.connect(broker,port)
                client.loop_start()
                break
            except:
                time.sleep(2)