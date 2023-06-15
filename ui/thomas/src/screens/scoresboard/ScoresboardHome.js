import React from 'react';
import styles from './scoresboardHome.module.scss';
import {classNameGenerator} from "../../utils/common";
import Asset_5_trophies from "../../assets/scoresboard/Asset_5_trophies.png";
import Asset_6 from "../../assets/scoresboard/Asset_6.png";
import HOM_05 from "../../assets/scoresboard/HOM_05.png";
import Asset_10 from "../../assets/scoresboard/Asset_10.png";
import Asset_7 from "../../assets/scoresboard/Asset 7.png";
import {useTranslation} from "../../context/TranslationContext";
import {useScoresboardConfiguration} from "../../context/ScoresboardConfigContext";



const ScoresboardHome =()=>{

    const classnames = classNameGenerator(styles)

    const {configuration, client, deviceId, scoreboardTopTen} = useScoresboardConfiguration()

    const {t} = useTranslation()

    const Board = configuration?.scoreboard?.map((item, index)=>{
        return(
                <div className={styles.live_info_row}  key={index}>
                    <div className={styles.live_info_num}></div>
                    <div className={styles.live_info_title}>{item.teamName}</div>
                    <div className={styles.live_info_number_of_players}>{item.numberOfPlayers}</div>
                    <div className={styles.live_info_time_used}>{item.timeUsed}</div>
                    <div className={styles.live_info_played}>{item.played}</div>
                    <div className={styles.live_info_won}>{item.won}</div>
                    <div className={styles.live_info_lost}>{item.lost}</div>
                    <div className={styles.live_info_result}>{item.totalPoints}</div>
                </div>
        )
    })

    const TopTenBoard = scoreboardTopTen?.scoreboard?.map((item, index)=>{
        return(
            <div className={styles.live_info_row} key={index}>
                <div className={styles.live_info_num}></div>
                <div className={styles.live_info_title}>{item.teamName}</div>
                <div className={styles.live_info_result}>{item.totalPoints}</div>
            </div>
        )
    })

    return(
        <>
            <div className={classnames(["the-maze-wrapper"])}>
                <div className={styles.scoreboard_wrapper}>
                    <div className={styles.scoreboard_container}>
                        <div className={styles.livescores_container}>
                            <div className={`${styles.live_info_container} ${styles.livescores}`}>
                                <div className={styles.live_info_table_container}>
                                    <div className={styles.label_live_info}>
                                        <div className={styles.live_info_img}>
                                            <img src={Asset_5_trophies}/>
                                        </div>
                                        <div className={styles.live_info_label_text}>
                                            <img src={Asset_6}/>
                                        </div>
                                    </div>
                                    <div className={styles.live_info_table}>
                                        <div className={`${styles.live_info_row} ${styles.the_header}`}>
                                            <div className={`${styles.title_frame} ${styles.header_team_name}`}><span>TEAM NAME</span></div>
                                            <div className={`${styles.title_frame} ${styles.header_number_players}`}>
                                                <span>No OF PLAYERS</span></div>
                                            <div className={`${styles.title_frame} ${styles.header_time_used}`}><span>TIME USED</span></div>
                                            <div className={`${styles.title_frame} ${styles.header_played}`}><span>PLAYED</span></div>
                                            <div className={`${styles.title_frame} ${styles.header_won}`}><span>WON</span></div>
                                            <div className={`${styles.title_frame} ${styles.header_lost}`}><span>LOST</span></div>
                                            <div className={`${styles.title_frame} ${styles.header_total_points}`}><span>TOTAL POINTS</span>
                                            </div>
                                        </div>
                                        {Board}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.top_ten_container}>
                            <div className={`${styles.live_info_container} ${styles.top_ten}`}>
                                <div className={styles.live_info_table_container}>
                                    <div className={styles.label_live_info}>
                                        <div className={styles.live_info_img}>
                                            <img src={HOM_05}/>
                                        </div>
                                        <div className={styles.live_info_label_text}>
                                            <img src={Asset_10}/>
                                        </div>
                                    </div>
                                    <div className={styles.red_info}>
                                        <div className={styles.red_info_img}>
                                            <img src={Asset_7}/>
                                        </div>
                                        <div className={styles.red_info_title}>
                                            ALL TIME
                                        </div>
                                    </div>
                                    <div className={styles.live_info_table}>
                                        <div className={`${styles.live_info_row} ${styles.the_header}`}>
                                            <div className={`${styles.title_frame} ${styles.header_team_name}`}><span>TEAM NAME</span></div>
                                            <div className={`${styles.title_frame} ${styles.header_total_points}`}><span>TOTAL POINTS</span>
                                            </div>
                                        </div>
                                        {TopTenBoard}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ScoresboardHome

