import React, {useCallback, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "../../../context/TranslationContext";
import {useStateHook} from "../../../context/StateContext";
import {useMqtt} from "../../../context/MQTTcontext";
import {getItem} from "../../../utils/storage";
import {SCREENS_DEVICE_ID_KEYS} from "../../../utils/enums";
import styles from './../MergeTeam/EnterYourTeamName.module.scss'
import {classNameGenerator, createRandomTeamName, keyboardOnChange} from "../../../utils/common";
import MazeLogo from '../../../assets/images/FOT_02.png'
import Keyboard from "../components/Keyboard/Keyboard";
import {handleMqttResponse} from "../../../utils/mqttUtlils";
import Timer from "../../../components/Timer/Timer";
import ErrorComponent from "../../../components/ErrorComponent";
import GroupEventMergeTeam from "../../../neworking/mqtt/GroupEventMergeTeam";
const classnames = classNameGenerator(styles)

const EnterTeamName = props => {
    const history = useHistory()
    const {t} = useTranslation()
    const {mergeTeamName, mergeTeamUsers, setMergeTeamName, clearMergeTeamUsers, personResponsible} = useStateHook()
    const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    const deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)
    const [elementOpenedKeyboard, showKeyboard] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const [publishMessage, mergeTeamUnsubscribeCallback] = GroupEventMergeTeam({client, deviceId, messageCallback: (message)=> {
            handleMqttResponse(message).then((parsedMessage)=>{
                console.log('parsedMessage', parsedMessage)
                clearMergeTeamUsers()
                history.replace(`/registration/${roomNumber}/mergeTeam/ready`)
            }).catch((error)=>{
                console.error('error MergeTeam', error)
                if(error.message) {
                    setErrorMessage(error.message)
                }
            })
        }})

    useEffect(()=>{
        setMergeTeamName(createRandomTeamName())
        return ()=> {
            mergeTeamUnsubscribeCallback()
        }
    }, [])

    const handleOnClickInput = (e) => {
        e.stopPropagation()
        e.preventDefault()
        showKeyboard(e)
    }


    const translations = {
        pleaseEnterName: t('Registration/Text_60'),
        go: t('Registration/Text_62')
    }

    const handleOnchange = ({target:{name, value}}) => {
        handleTeamNameChange(prevState=>({...prevState, [name]: value}))
    }

    const handleMergeTeam = () => {
        publishMessage({
            teamName: mergeTeamName,
            groupPlayers: mergeTeamUsers
        })
    }

    const handleTeamNameChange = (callback) => {
        const values = callback({mergeTeamName})
        setMergeTeamName(values.mergeTeamName)
    }
    const handleOnKeyboardChange = useCallback(keyboardOnChange({submit:handleMergeTeam, elementOpenedKeyboard, values: {mergeTeamName}, setValues:handleTeamNameChange}), [elementOpenedKeyboard, mergeTeamName])

    const countdownAction = () => {
        setMergeTeamName('')
        clearMergeTeamUsers()
        history.replace(`/registration/${roomNumber}`)
    }

    return (
            <div className={classnames(['the-maze-wrapper', 'black-screen'])}>
                <div className={classnames("logo_container")}>
                    <img src={MazeLogo}/>
                </div>
                <div className={classnames("the-maze-container")}>

                    <div className={classnames("enter_team_name_form_container")}>
                        <div className={classnames("enter_team_name_form")}>
                            <div className={classnames("enter_team_name_form_title")}>
                                {translations.pleaseEnterName}
                            </div>
                            <div className={classnames("enter_team_name_form_input")}>
                                <input type="text" name={'mergeTeamName'} value={mergeTeamName} onChange={handleOnchange} onClick={handleOnClickInput}/>
                            </div>
                            <ErrorComponent className={classnames("enter_team_name_form_error")} error={errorMessage} setError={setErrorMessage}/>

                            <div className={classnames("enter_team_name_form_button")} onClick={handleMergeTeam}>
                                {translations.go}
                            </div>
                        </div>
                    </div>
                </div>
                <Keyboard showKeyboard={elementOpenedKeyboard} onChange={handleOnKeyboardChange} submitText={translations.go}/>
                <Timer countdownTime={30} countdownAction={countdownAction}/>
            </div>
    );
};

EnterTeamName.propTypes = {

};

export default EnterTeamName;
