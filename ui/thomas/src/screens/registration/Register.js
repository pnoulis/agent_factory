import React, {useCallback, useEffect, useState} from 'react';
import Container from "../../components/Container";
import styles from "./Register.module.scss";
import basestyles from "./baseRegistrationStyle.module.scss"
import {useTranslation} from "../../context/TranslationContext";
import {useMqtt} from "../../context/MQTTcontext";
import {getItem} from "../../utils/storage";
import {SCREENS_DEVICE_ID_KEYS} from "../../utils/enums";
import {useStateHook} from "../../context/StateContext";
import {handleMqttResponse} from "../../utils/mqttUtlils";
import RegisterUser from "../../neworking/mqtt/RegisterUser";
import {useHistory, useParams} from "react-router-dom";
import Keyboard from "./components/Keyboard/Keyboard";
import "./components/UpdatesAndPromotions/promotionalmodal.scss";
import PromotionalModal from "./components/UpdatesAndPromotions/PromotionalModal";
import moment from "moment";
import Timer from "../../components/Timer/Timer";
import {keyboardOnChange} from "../../utils/common";
import ErrorComponent from "../../components/ErrorComponent";


const RegistrationRegister = () => {
    const [elementOpenedKeyboard, showKeyboard] = useState(null)
    const [showmod, setShowmod] = useState(false)
    const onCloseModal = () => {
      setShowmod(false)
    }
    const onOpenModal = () => {
        setShowmod(true)
    }
    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    const {t} = useTranslation()
    const {client} = useMqtt()
    const params = useParams()
    const roomNumber = params.number

    const deviceId = getItem(`${SCREENS_DEVICE_ID_KEYS.REGISTRATION}/${roomNumber}`)
    const {setUser} = useStateHook()
    const history = useHistory()

    const [publishCallback, unsubscribeCallback] = RegisterUser({
        client, deviceId, messageCallback: (message) => {
            handleMqttResponse(message).then((parsedMessage) => {
                console.log('parsedMessage', parsedMessage)
                setUser(parsedMessage.player)
                history.replace(`/registration/${roomNumber}/scan-wristband`)
            }).catch((error) => {
                console.error('Exception', error)
                if(error.message) {
                    setErrorMessage(error.message.toUpperCase())
                } else if(error.validationErrors) {
                    const validationString = Object.entries(error.validationErrors).reduce((errorArrayMessage, [key, value], index) => {
                        const errorString =  `${key} cannot be ${value} `
                        errorArrayMessage.push("" + errorString.toUpperCase())

                        if(!(index === Object.entries(error.validationErrors).length - 1)) {
                            errorArrayMessage.push(`| `)
                        }

                        return errorArrayMessage
                    }, [])
                    setErrorMessage(validationString)
                }


            })
        }
    })

    useEffect(() => {
        return unsubscribeCallback
    }, [])

    const registerTranslation = {
        fill: t('Registration/Text_23'),
        fname: t('Registration/Text_24'),
        lname: t('Registration/Text_25'),
        phone: t('Registration/Text_26'),
        birth: t('Registration/Text_27'),
        email: t('Registration/Text_28'),
        username: t('Registration/Text_30'),
        password: t('Registration/Text_29'),
        confirmPassword: t('Registration/Text_94'),
        checkbox: t('Registration/Text_31'),
        registerButton: t('Registration/Text_33'),
        validInfo: t('Registration/Text_32'),
    }

    const handleOnchange = ({target: {name, value, maxLength}}) => {
        if(name === "phone") {
            if(value.length <= maxLength && !isNaN(Number(value))){
                setValues(prevState => ({...prevState, [name]: value}))
            }
        }
        else {
            setValues(prevState => ({...prevState, [name]: value}))
        }
    }

    const handleRegister = () => {
        const newValues = {...values}
        setErrorMessage('')
        publishCallback(newValues)
    }

    const handleOnClickInput = (e) => {
        e.stopPropagation()
        showKeyboard(e)
    }

    const handleOnKeyboardChange = keyboardOnChange({submit:handleRegister, elementOpenedKeyboard, values, setValues})

    const countdownAction = () => {
        history.replace(`/registration/${roomNumber}`)
    }

    return (
        <>
            <Container onClick={() => showKeyboard(null)}>
                <div className={styles.form_wrapper}>
                    <div className={styles.form_container}>
                        <div className={styles.form_register}>
                            <header><h1>{registerTranslation.fill}</h1></header>
                            <div className={styles.inputs_wrapper}>
                                <div className={styles.inputs_container}>
                                    <div className={`${styles.form_input} ${styles.input_name}`}>
                                        <label htmlFor="name_register">{registerTranslation.fname}</label>
                                        <input type="text" onClick={handleOnClickInput} onChange={handleOnchange}
                                               value={values.name} name="name"/>
                                    </div>
                                    <div className={`${styles.form_input} ${styles.input_lastname}`}>
                                        <label htmlFor="lastname_register">{registerTranslation.lname}</label>
                                        <input type="text" onClick={handleOnClickInput} onChange={handleOnchange}
                                               value={values.surname} name="surname"/>
                                    </div>
                                </div>
                                <div className={styles.inputs_container}>
                                    <div className={`${styles.form_input} ${styles.input_email}`}>
                                        <label htmlFor="email_register">{registerTranslation.email}</label>
                                        <input type="text" onClick={handleOnClickInput} onChange={handleOnchange}
                                               value={values.email} name="email"/>
                                    </div>


                                </div>
                                <div className={styles.inputs_container}>
                                    <div className={`${styles.form_input} ${styles.input_email}`}>
                                        <label htmlFor="email_register">{registerTranslation.username}</label>
                                        <input type="text" onClick={handleOnClickInput} onChange={handleOnchange}
                                               value={values.username} name="username"/>
                                    </div>
                                    <div className={`${styles.form_input} ${styles.input_password}`}>
                                        <label htmlFor="password_register">{registerTranslation.password}</label>
                                        <input type="text" style={{fontFamily: 'password'}} onClick={handleOnClickInput} onChange={handleOnchange}
                                               value={values.password} name="password"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.form_disclaimer} ${styles.register_disclaimer}`}>
                                <div className={styles.checkbox_container}>
                                    <input type="checkbox" name="get_informed" id="get_informed"/>
                                    <label htmlFor="get_informed">
                                        <span>{registerTranslation.checkbox}.</span>
                                    </label>
                                       <div>&nbsp;&nbsp;READ&nbsp;&nbsp;</div> <div  className={styles.btn_read_here}>
                                           <span onClick={onOpenModal}>HERE.</span>
                                           <PromotionalModal onClose={onCloseModal} show={showmod}/>
                                           </div>
                                </div>
                                <div className={`${styles.btn_game} ${styles.small_button} ${basestyles.effect_click}`}
                                     onClick={handleRegister}>
                                    <div className={styles.btn_bg_color}/>
                                    <div className={styles.btn_container}>
                                        <div className={styles.header_btn}>{registerTranslation.registerButton}</div>
                                    </div>
                                </div>
                            </div>
                            <ErrorComponent className={`${styles.form_disclaimer} ${styles.error_message}`} error={errorMessage} setError={setErrorMessage}/>
                        </div>
                    </div>
                </div>
            </Container>
            <Keyboard showKeyboard={elementOpenedKeyboard}
                      onChange={handleOnKeyboardChange}
                      submitText={registerTranslation.registerButton}/>
            <Timer countdownTime={140} countdownAction={countdownAction}/>
        </>
    );
}

export default RegistrationRegister
