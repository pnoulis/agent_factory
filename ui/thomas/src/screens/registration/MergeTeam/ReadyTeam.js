import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReadyTeam.module.scss'
import {classNameGenerator} from "../../../utils/common";
import MazeLogo from '../../../assets/images/FOT_02.png'
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "../../../context/TranslationContext";
import {useStateHook} from "../../../context/StateContext";
import Timer from "../../../components/Timer/Timer";

const classnames = classNameGenerator(styles)

const ReadyTeam = props => {
    const history = useHistory()
    const {t} = useTranslation()
    const {mergeTeamName, setMergeTeamName, clearMergeTeamUsers} = useStateHook()
    const params = useParams()
    const roomNumber = params.number

    const translations = {
        youReady: t('Registration/Text_92'),
        haveFun: t('Registration/Text_93')
    }

    const countdownAction = () => {
        setMergeTeamName('')
        clearMergeTeamUsers()
        history.replace(`/registration/${roomNumber}`)
    }

    return (
            <div className={classnames(["the-maze-wrapper", "black-screen"])}>
                <div className={classnames("logo_container")}>
                    <img src={MazeLogo}/>
                </div>
                <div className={classnames("the-maze-container")}>

                    <div className={classnames("disclaimer_black_screen_container")}>
                        <div className={classnames("disclaimer_black_screen_title")}>
                            <div className={classnames("disclaimer_black_screen_title")}>
                                {translations.youReady} {mergeTeamName}
                            </div>
                            <div className={classnames("disclaimer_black_screen_title")}>
                                {translations.haveFun}
                            </div>
                            <div className={classnames("disclaimer_black_screen_title")}>
                                Please refer to reception to purchase game packages
                            </div>
                        </div>
                    </div>
                </div>
                <Timer countdownTime={8} countdownAction={countdownAction}/>
            </div>

    );
};

ReadyTeam.propTypes = {

};

export default ReadyTeam;
