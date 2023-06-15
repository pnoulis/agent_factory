import React, {useCallback, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "../../../context/TranslationContext";
import {useStateHook} from "../../../context/StateContext";
import {useMqtt} from "../../../context/MQTTcontext";
import {getItem} from "../../../utils/storage";
import {SCREENS_DEVICE_ID_KEYS} from "../../../utils/enums";
import styles from './../MergeTeam/EnterYourTeamName.module.scss'
import {classNameGenerator, keyboardOnChange} from "../../../utils/common";
import MazeLogo from '../../../assets/images/FOT_02.png'
import Keyboard from "../components/Keyboard/Keyboard";
import {handleMqttResponse} from "../../../utils/mqttUtlils";
import Timer from "../../../components/Timer/Timer";
import ErrorComponent from "../../../components/ErrorComponent";
import CreateEventUser from "../../../neworking/mqtt/CreateEventUser";
import moment from "moment";
const classnames = classNameGenerator(styles)

const EnterUserDetails = props => {
    const history = useHistory()
    const {t} = useTranslation()
    const {setMergeTeamUser, clearMergeTeamUsers, wristbandNumberGroupEvent} = useStateHook()
    const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    const deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)
    const [elementOpenedKeyboard, showKeyboard] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [useDetails, setUserDetails] = useState({firstName: '', lastName: '', birthDate: ''})

    const [publishMessage, createEventUserUnsubscribeCallback] = CreateEventUser({client, deviceId, messageCallback: (message)=> {
            handleMqttResponse(message).then((parsedMessage) => {
                console.log('parsedMessage', parsedMessage)
                setMergeTeamUser(parsedMessage.eventPlayer)

                history.replace(`/registration/${roomNumber}/create-event/scan-wristband`)
            }).catch((error)=>{
                console.error('error MergeTeam', error)
                if(error.message) {
                    setErrorMessage(error.message)
                }
            })
        }})

    useEffect(() => {
        return ()=> {
            createEventUserUnsubscribeCallback()
        }
    }, [])

    const handleOnClickInput = (e) => {
        e.stopPropagation()
        e.preventDefault()
        showKeyboard(e)
    }


    const translations = {
        pleaseEnterName: t('Registration/Text_60'),
        go: t('Registration/Text_62'),
        fname: t('Registration/Text_24'),
        lname: t('Registration/Text_25'),
        birth: t('Registration/Text_27'),
    }

    const handleOnchange = ({target:{name, value}}) => {
        setUserDetails(prevState=>({...prevState, [name]: value}))
    }

    const handleCreateUser = () => {
        publishMessage({
            firstName: useDetails.firstName,
            lastName: useDetails.lastName,
            birthDate: useDetails.birthDate  &&  moment(useDetails.birthDate, "YYYY-MM-DD").format("YYYY-MM-DD"),
            wristbandNumber: wristbandNumberGroupEvent
        })
    }

    const handleOnKeyboardChange = useCallback(keyboardOnChange({submit:handleCreateUser, elementOpenedKeyboard, values: useDetails, setValues: setUserDetails}), [elementOpenedKeyboard, useDetails])

    const countdownAction = () => {
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
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '16px'}}>
                                <div className={classnames("enter_team_name_form_title")}>
                                    {translations.fname}
                                </div>
                                <div className={classnames("enter_team_name_form_input")}>
                                    <input type="text" name={'firstName'} value={useDetails.firstName}
                                           onChange={handleOnchange} onClick={handleOnClickInput}/>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '16px'}}>
                                <div className={classnames("enter_team_name_form_title")}>
                                    {translations.lname}
                                </div>
                                <div className={classnames("enter_team_name_form_input")}>
                                    <input type="text" name={'lastName'} value={useDetails.lastName}
                                           onChange={handleOnchange} onClick={handleOnClickInput}/>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '16px'}}>
                                <div className={classnames("enter_team_name_form_title")}>
                                    {translations.birth}
                                </div>
                                <div className={classnames("enter_team_name_form_input")}>
                                    <input name={'birthDate'} value={useDetails.birthDate}
                                           onChange={handleOnchange}
                                           onClick={handleOnClickInput}
                                           type="tel"
                                           pattern={'/[0-9]{2}/[0-9]{2}/[0-9]{4}/'}
                                           placeholder="DD/MM/YYYY"/>
                                </div>
                            </div>
                        </div>
                        <ErrorComponent className={classnames("enter_team_name_form_error")} error={errorMessage}
                                        setError={setErrorMessage}/>

                        <div className={classnames("enter_team_name_form_button")} onClick={handleCreateUser}>
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

EnterUserDetails.propTypes = {

};

export default EnterUserDetails;
