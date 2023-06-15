import React, {useEffect} from "react";
import styles from "../InsideStart.module.scss";
import {classNameGenerator} from "../../../utils/common";
import FOT_10 from "../../../assets/inside/insideImages/FOT_10.png";
import FOT_9 from "../../../assets/inside/insideImages/FOT_09.png";
import {useParams} from "react-router-dom";
import {useInsideConfiguration} from "../../../context/InsideConfigContext";

import PanicButtonCall from "../../../neworking/mqtt/PanicButtonCall";

const PanicButton = ()=>{

    const classnames = classNameGenerator(styles)
    const {room} = useParams()
    const {client, deviceId} = useInsideConfiguration()

    const [publishCallback, unSubscribeCallback] = PanicButtonCall({client, deviceId, roomName: room})
    useEffect(() => {
        return unSubscribeCallback
    }, []);

    const handleOnClick = () => {
        console.log('adsdas')
        publishCallback({})
    }
    return(
        <>
            <div className={classnames(["inside-home-panic-container"])} >
                <div className={classnames(["panic-button-container"])} >
                    <div className={classnames(["panic-button-header"])}>
                        <img src={FOT_10}/>
                    </div>
                    <div className={classnames(["panic-button-img"])} onClick={handleOnClick}>
                        <img src={FOT_9}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PanicButton;
