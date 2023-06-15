import styles from "./../Home.module.scss"

const PlayerSkills = (props) => {

        const skill = props.skill
        const skillLevel = props.skillLevel
        const fullSkills = [];
                
        for(let i = 0; i < 6; i++) {
            if(i<skillLevel) {
                fullSkills.push(<div className={`${styles.point} ${styles.achieved}`} key={i}></div>)
            }
            else {
                fullSkills.push(<div className={`${styles.point}`} key={i}></div>) 
            }
        }        

    return(
        <>
                <div className={styles.skill_item}>
                    <div className={styles.skill_text}>{skill}</div>
                    <div className={styles.skill_score}>{fullSkills}</div>
                </div>
        </>
    )
}

export default PlayerSkills;