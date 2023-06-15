import clock from "./../../../assets/images/HOM_03.png"
import styles from "./../Home.module.scss"


const RoomDifficulty = (props) => {
    const time = props.time
    const difficulty = props.difficulty
    const rate = props.rate

    return(
        <>
            <div className={styles.levels_item}>
                <div className={styles.levels_item_header}>{difficulty}</div>
                <div className={styles.levels_item_header}>
                    {rate}
                </div>
                <div className={styles.levels_clock}>
                    <div className={styles.levels_clock_image}>
                        <img src={clock} />
                    </div>
                    <div className={styles.levels_clock_time}>
                        {time}
                    <div className={styles.levels_clock_hms}>min</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RoomDifficulty;
