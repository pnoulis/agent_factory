import React from 'react';
import styles from './registration.module.scss'
import {useTranslation} from "../../context/TranslationContext";
import HowToPlay from './components/HowToPlay/HowToPlay';
import Button from './../../components/Button/Button';
import {useHistory, useParams} from "react-router-dom";
import Container from "../../components/Container";

const Registration = () => {
    const history = useHistory()
    const params = useParams()
    const roomNumber = params.number

    const {t} = useTranslation()

    const buttons = [
        {id: 1, header: t('Registration/Text_01'), bottom: t('Registration/Text_02'), onClick:() =>history.replace(`/registration/${roomNumber}/login`)},
        {id: 2, header: t('Registration/Text_03'), bottom: t('Registration/Text_04'), onClick:() =>history.replace(`/registration/${roomNumber}/mergeTeam`)},
        {id: 3, header: t('Registration/Text_05'), bottom: t('Registration/Text_06'),  onClick:() =>history.replace(`/registration/${roomNumber}/create-event/scan-wristband`)},
        {id: 4, header: t('Registration/Text_07'), bottom: t('Registration/Text_08'), onClick:() =>history.replace(`/registration/${roomNumber}/scan-wristband?redirectCheckUrl=/registration/${roomNumber}/LiveInfo`)}
      ];

    return (
       <>
            <HowToPlay />
            <Container>
                <div className={styles['four-buttons-container']}>
                {buttons.map((button, index) => <div className={styles['four-buttons-item']} key={button.header}>
                        <Button header={button.header} bottom={button.bottom} delay={index/2} onClick={button.onClick} />
                    </div>
                )}
                </div>
            </Container>
       </>
    );
};

export default Registration;
