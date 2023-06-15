import styles from "./../Home.module.scss"
import React from "react";

const LeaderboardTable = (props) =>{

    const leaderboard = props.leaderboard

    const listTeams = leaderboard?.roomScores?.map((team, index) =>{
        return (
                <div className={styles.live_info_row} key={index}>
                    <div className={styles.live_info_title}>{team.teamName}</div>
                    <div className={styles.live_info_result}>{team.score}</div>
                </div>)}
                )

    return(
        <>
            {listTeams}
        </>
    )
}

export default LeaderboardTable;
