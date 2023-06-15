import React from 'react';
import styles from './ThankYou.module.scss';
import {useTranslation} from "../../context/TranslationContext";
import {useHistory, useParams} from "react-router-dom";

const RegistrationThankYou = () => {

    const {t} = useTranslation()
    const history = useHistory()
    const params = useParams()
    const roomNumber = params.number

    const translations = {
        thankYou: t('Registration/Text_34'),
        thankYouDescription: t('Registration/Text_35'),
        registerButtonHeader: t('Registration/Text_36'),
        registerButtonBottom: t('Registration/Text_37'),
        mergeButtonHeader: t('Registration/Text_38'),
        mergeButtonBottom: t('Registration/Text_39'),
    }

    return(

        <div className={styles.wristband_wrapper}>
            <div className={styles.wristband_container}>
                <div className={styles.wristband_content}>
                    <header>
                        <h2>{translations.thankYou}</h2>
                    </header>
                    <header>
                        <h3>{translations.thankYouDescription}</h3>
                    </header>

                </div>
            </div>

            <div className={styles['two-buttons-container']}>
                <div className={styles['two-buttons-item']} onClick={()=>history.replace(`/registration/${roomNumber}/login`)}>
                        <div className={`${styles.btn_game} ${styles.effect_click}`}>
                            <div className={styles.btn_bg_color}/>
                            <div className={styles.btn_container}>
                                <div className={styles['header-btn']}>{translations.registerButtonHeader}</div>
                                <div className={styles['bottom-btn']}>{translations.registerButtonBottom}</div>
                            </div>
                        </div>
                </div>
                <div className={styles['two-buttons-item']} onClick={()=>history.replace(`/registration/${roomNumber}/mergeTeam`)}>
                    <div className={`${styles.btn_game} ${styles.effect_click}`}>
                        <div className={styles.btn_bg_color}/>
                        <div className={styles.btn_container}>
                            <div className={styles['header-btn']}>{translations.mergeButtonHeader}</div>
                            <div className={styles['bottom-btn']}>{translations.mergeButtonBottom}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegistrationThankYou
