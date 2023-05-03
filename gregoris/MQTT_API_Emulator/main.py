from Libs.mqttConnection import clientInit,getClient,match,getSinglewildcard
import json
import asyncio
from time import time
from time import sleep
from random import *

CreateUniquePath = ''

ResetWristbandsTopic = f"/themaze/registration_uuid/gui/wristband/resetWristbands"

GetAllTeams                     = f"/themaze/teams/get/all"
EmulateWristbandScanTopic       = f"/themaze/+/emulateScan/+/+"       #EX:"RoomName/Random WristbandNumber/Random WristbandColor"
EmulateResetWristbandsTopic     = f"/themaze/emulate/Resetwristbands"
EmulateMergeGroupTeamTopic      = f"/themaze/emulate/MergeGroupTeam"

PaulosTestTopic = "/themaze/registrationPoint1/gui/player/wristbandScan"

topics = [ 
    (GetAllTeams,0),
    (EmulateWristbandScanTopic,0),
    (EmulateResetWristbandsTopic,0),#(f"{ResetWristbandsTopic}/response",0)
    (PaulosTestTopic,0),
    (EmulateMergeGroupTeamTopic,0)
]

global BootedReader
BootedReader = False

def myTimestamp():
    return (int(round(time()*1000)))

def consumeMessage(topic,msg,gos,retain): 
    print(f"[Message]Topic:{topic}\nData:{msg}")#Qos:{qos}\nRetain:{retain}")     
    if topic==GetAllTeams:  
        f = open('teams.json')
        teams = json.load(f)    
        print(json.dumps(teams))
        client.publish(f"{topic}/response",json.dumps(teams))
    if match(EmulateWristbandScanTopic,topic):
        obj = { 
            "roomName":        getSinglewildcard(topic,2), 
            "wristbandNumber": getSinglewildcard(topic,4), 
            "wristbandColor":  getSinglewildcard(topic,5)
        }
        EmulateWristbandScan(obj,'RPI_EMULATE_SCAN')
    if topic==EmulateResetWristbandsTopic:
        client.publish(ResetWristbandsTopic,"Nothing")

    if topic==PaulosTestTopic:
        print(f"[CorrectlyRecieved]Data:{msg}")

    if topic==EmulateMergeGroupTeamTopic:
        EmulateMergeGroupTeam()


async def taskPopulate():
    while True:
        noulisDummy()
        await asyncio.sleep(5)


def EmulateMergeGroupTeam():
    global BootedReader
         
    if BootedReader==False:
        msg = {	"timestamp" : myTimestamp(),  "deviceId": 'reg5', "roomName": "REGISTRATION_5", "deviceType": "REGISTRATION_SCREEN" }
        client.publish("/themaze/booted", json.dumps(msg))
        BootedReader=True
        sleep(1)
    msg =  {
        "timestamp": 12444,
        "teamName": "kl",
        "groupPlayers": [
            {
            "username": "pl",
            "wristbandNumber": 2
            },
            {
            "username": "pk",
            "wristbandNumber": 3
            }
        ]
    }
    client.publish("/themaze/reg5/gui/groupteam/merge", json.dumps(msg))
    sleep(1)
    msg = {
        "timestamp": 12444,
        "teamName": "kl",
        "name": "Per Mission 15"
    }
    client.publish("/themaze/reg5/gui/team/package/add", json.dumps(msg))
    sleep(1)
    msg = {
        "timestamp": 12444,
        "teamName": "kl"
    }
    client.publish("/themaze/reg5/gui/team/activate", json.dumps(msg))


    

def EmulateWristbandScan(obj,typeofscan):
    global BootedReader
    ACCEPTOR = typeofscan

    if ACCEPTOR=='DIRECT_MESSAGE':
        deviceId = '53c2b6ff-3420-4545-b547-a26c996ed843'
        RegistrationWristbandScan = f"/themaze/{deviceId}/gui/player/registerWristband"
        msg = { "result":"OK","timestamp" : myTimestamp(), "wristbandNumber": randint(1, 100), "wristbandColor": randint(1, 6)}
        client.publish(f"{RegistrationWristbandScan}",json.dumps(msg))

    if ACCEPTOR=='RPI_EMULATE_SCAN': 
        roomName = obj["roomName"]; wristbandNumber = obj["wristbandNumber"]; wristbandColor = obj["wristbandColor"]
        #print(f"roomName:{roomName}"); print(f"wristbandNumber:{wristbandNumber}"); print(f"wristbandColor:{wristbandColor}")      
        if wristbandNumber == 'r': wristbandNumber = randint(1, 100)
        if wristbandColor  == 'r': wristbandColor  = randint(1, 6)  
        readerId = f"{roomName}Reader"
           
        if BootedReader==False:
            msg = {	"timestamp" : myTimestamp(),  "deviceId": readerId, "roomName": roomName, "deviceType": "RPI_READER" }
            client.publish("/themaze/booted", json.dumps(msg))
            BootedReader=True
            sleep(1)

        RegistrationWristbandScan = f"/themaze/{readerId}/rpi/wristbandScan"
        if wristbandNumber == 'all' and wristbandColor=='all':
            for x in range(6):
                msg = { "timestamp" : myTimestamp(), "wristbandNumber": x+1, "wristbandColor": x+1 }
                client.publish(f"{RegistrationWristbandScan}",json.dumps(msg))
                sleep(1)
        else:
            msg = { "timestamp" : myTimestamp(), "wristbandNumber": wristbandNumber, "wristbandColor": wristbandColor }
            client.publish(f"{RegistrationWristbandScan}",json.dumps(msg))

    

def noulisDummy():
    NoulisTopic = '/themaze/registrationPoint1/gui/player/wristbandScan'
    NoulisMsg = 'Hi this a fucking test'
    client.publish(NoulisTopic, NoulisMsg)

loop = asyncio.get_event_loop()
try:
    clientInit(consumeMessage,topics)
    client = getClient()
    #loop.create_task(taskPopulate())
    loop.run_forever()
finally:
    loop.close()  