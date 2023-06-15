import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import backgroundIcon from '../../assets/images/FOT_09.png'
import styles from './Timer.module.scss'
import moment from "moment";

const Timer = ({countdownTime, countdownAction, withoutContainer}) => {

    const [currentTime, setCurrentTime] = useState(countdownTime)

    useEffect(()=>{
       const intervalId = setInterval(()=>{
           setCurrentTime(prev => {


               if(prev - 1 === 0) {
                   setTimeout(()=>{
                       countdownAction && countdownAction()
                   }, 100)
                    clearInterval(intervalId)
               } else {
                   return prev -1
               }
           })
        }, 1000)

        return () => {
           clearInterval(intervalId)
        }
    }, [])

    let minutes = currentTime / 60
    let seconds = currentTime % 60

    const time = currentTime && moment().seconds(seconds).minutes(minutes).format("mm:ss").toString()
    if(withoutContainer) {
        return <span >{time}</span>
    }
    return (
        <div className={styles.timer_container}>
            <img src={backgroundIcon} width={150}/>
            <span className={styles.timer_time}>{time}</span>
        </div>
    );
};

Timer.propTypes = {

};

export default Timer;
