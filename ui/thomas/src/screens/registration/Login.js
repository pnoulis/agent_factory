import React, {useCallback, useEffect, useState} from 'react';
import Container from "../../components/Container";
import Keyboard from './components/Keyboard/Keyboard';
import UserLogin from "../../neworking/mqtt/UserLogin";
import {useMqtt} from "../../context/MQTTcontext";
import {getItem} from "../../utils/storage";
import {SCREENS_DEVICE_ID_KEYS} from "../../utils/enums";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import styles from "./Login.module.scss"
import {useStateHook} from "../../context/StateContext";
import {useHistory, useParams} from "react-router-dom";
import basestyles from "./baseRegistrationStyle.module.scss"
import {useTranslation} from "../../context/TranslationContext";
import Timer from "../../components/Timer/Timer";
import {keyboardOnChange} from "../../utils/common";
import ErrorComponent from "../../components/ErrorComponent";


const Login = () => {
    const [values, setValues] = useState({username: '', password: ''})
    const [errorMessage, setErrorMessage] = useState(null)
    const [elementOpenedKeyboard, showKeyboard] = useState(null)
    const history = useHistory()
    const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    const deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)
    const {setUser} = useStateHook()
    const {t} = useTranslation()



    const messageCallback = (message) => {
        handleMqttResponse(message).then((parsedMessage)=>{
            console.log('parsedMessage', parsedMessage)
            setUser(parsedMessage.player)
            history.replace(`/registration/${roomNumber}/scan-wristband`)
        }).catch((error)=>{
            console.error('Exception', error)
            let validationString = ''
            if(error.message) {
                validationString = error.message.toUpperCase()
            } else if(error.validationErrors) {
                validationString = Object.entries(error.validationErrors).reduce((errorArrayMessage, [key, value], index) => {
                    const errorString =  `${key} cannot be ${value} `
                    errorArrayMessage.push("" + errorString.toUpperCase())
                    if(!(index === Object.entries(error.validationErrors).length - 1)) {
                        errorArrayMessage.push("- ")
                    }

                    return errorArrayMessage
                }, [])
            }
            setErrorMessage(validationString)
        })
    }
    const [publishCallback, unsubscribeCallback] = UserLogin({client, deviceId, messageCallback })

    useEffect(()=> {
        return () => {
            unsubscribeCallback()
        }
    }, [])

    const handleOnchange = ({target:{name, value}}) => {
        setValues(prevState=>({...prevState, [name]: value}))
    }

    const handleLogin = () => {
        publishCallback({
            username: values.username,
            password: values.password
        })
    }

    const handleOnClickInput = (e) => {
        e.stopPropagation()
        e.preventDefault()
        showKeyboard(e)
    }

    const handleOnKeyboardChange = useCallback(
        keyboardOnChange({submit:handleLogin, elementOpenedKeyboard, values, setValues}),
        [elementOpenedKeyboard, values])

    const translations = {
        logInDescription: t('Registration/Text_10'),
        username: t('Registration/Text_11'),
        password: t('Registration/Text_12'),
        logInButton: t('Registration/Text_13'),
        forgetButton: t('Registration/Text_14'),
        usernameOrPassword: t('Registration/Text_15'),
        or: t('Registration/Text_16'),
        register: t('Registration/Text_17'),
        playFirstTime: t('Registration/Text_18'),

    }

    const countdownAction = () => {
        history.replace(`/registration/${roomNumber}`)
    }



    return (
        <>
            <Container onClick={()=>showKeyboard(null)}>
                <div className={styles.form_wrapper}>
                    <div className={styles.form_container}>
                        <div className={styles.form_login}>
                            <header><h1>{translations.logInDescription}</h1></header>
                            <div className={styles.inputs_container}>
                                <div className={`${styles.form_input} ${styles.input_username}`}>
                                    <label htmlFor="username">{translations.username}</label>
                                    <input type="text"
                                           className={` ${elementOpenedKeyboard === 'username'&& styles.focused_input}`}
                                           name="username"
                                           value={values.username}
                                           onChange={handleOnchange}
                                           onClick={handleOnClickInput}/>
                                </div>
                                <div className={`${styles.form_input} ${styles.input_password} `}>
                                    <label htmlFor="password_login">{translations.password}</label>
                                    <input type="text"
                                           className={`${elementOpenedKeyboard === 'password'&& styles.focused_input}`}
                                           name="password"
                                           style={{fontFamily: 'password'}}
                                           value={values.password}
                                           onChange={handleOnchange}
                                           onClick={handleOnClickInput}/>
                                </div>
                            </div>
                            <div className={styles.btn_login_container}>
                                <div className={`${styles.btn_game} ${styles.medium_button} ${basestyles.effect_click}`} onClick={handleLogin}>
                                    <div className={styles.btn_bg_color}/>
                                    <div className={styles.btn_container}>
                                        <div className={styles.header_btn}>{translations.logInButton}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.form_disclaimer} ${styles.forgot_disclaimer}`}>
                                <div className={styles.forgot_link}>{translations.forgetButton} </div>&nbsp;{translations.usernameOrPassword}
                            </div>
                            <div className={`${styles.form_disclaimer} ${styles.register_disclaimer}`}>
                                {translations.or}
                                <div className={`${styles.btn_game} ${styles.small_button} ${basestyles.effect_click}`} onClick={()=>history.replace(`/registration/${roomNumber}/register`)}>
                                    <div className={styles.btn_bg_color} />
                                    <div className={styles.btn_container} >
                                        <div className={styles.header_btn}>{translations.register}</div>
                                    </div>
                                </div>
                                {translations.playFirstTime}
                            </div>
                            <ErrorComponent className={`${styles.form_disclaimer} ${styles.error_message}`} error={errorMessage} setError={setErrorMessage}/>
                        </div>
                    </div>
                </div>
            </Container>
            <Keyboard showKeyboard={elementOpenedKeyboard} onChange={handleOnKeyboardChange} submitText={translations.logInButton}/>
            <Timer countdownTime={30} countdownAction={countdownAction}/>
        </>
    );
};

export default Login;
