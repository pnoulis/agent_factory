import React from 'react';
import PropTypes from 'prop-types';
import styles from './OutsideModal.module.scss'
import {classNameGenerator} from "../../utils/common";
import {useTranslation} from "../../context/TranslationContext";
import MazeIcon from "../../assets/images/FOT_02.png"
import Timer from "../../components/Timer/Timer";
import {useOutdoorConfiguration} from "../../context/OutdoorConfigContext";

const classnames = classNameGenerator(styles)

const MissionUnlock = props => {
    const {t} = useTranslation()
    const {goToHome} = useOutdoorConfiguration()

    const translations = {
            missionUnlocked: t("OutScreen/MissionUnlocked/Text_13"),
            nowYouCanEnter: t("OutScreen/MissionUnlocked/Text_14"),
            closeTheDoor: t("OutScreen/MissionUnlocked/Text_15")
    }

    return (
        <div className={classnames("outside-modal-wrapper")}>
            <div className={classnames("outside-modal-container")}>
                <div className={classnames("outside-modal-logo-outer")}>
                    <div className={classnames("outside-modal-logo")}>
                        <img src={MazeIcon}/>
                    </div>
                </div>
                <div className={classnames("outside-modal-texts-outer")}>
                    <div className={classnames("outside-modal-text-block")}>
                        <p>{translations.missionUnlocked}</p>
                    </div>
                    <div className={classnames("outside-modal-text-block")}>
                        <p>{translations.nowYouCanEnter}</p>
                    </div>
                    <div className={classnames("outside-modal-text-block")}>
                        <p>{translations.closeTheDoor}</p>
                    </div>
                </div>
                <div className={classnames("outside-modal-countdown-outer")}>
                    <div className={classnames("outside-modal-countdown")}>
                        <div className={classnames(["btn_game", "effect_click"])} >
                            <div className={classnames("btn_bg_color")}/>
                            <div className={classnames("btn_container")}>
                                <div className={classnames("header-btn")}>
                                    <Timer countdownTime={3} countdownAction={goToHome} withoutContainer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

MissionUnlock.propTypes = {

};

export default MissionUnlock;
