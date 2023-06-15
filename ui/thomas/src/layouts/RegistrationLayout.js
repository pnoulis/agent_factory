import React from 'react';
import styles from "../screens/registration/registration.module.scss";
import Particles from "../components/Particles";
import Footer from "../components/Footer/Footer";
import {useParams} from "react-router-dom";

const RegistrationLayout = ({children}) => {
    const params = useParams()
    const roomNumber = params.number
    return (
        <div className={styles['the-maze-wrapper']}>
            <Particles/>
            {children}
            <Footer homeButtonUrl={`/registration/${roomNumber}`}/>
        </div>
    );
};

export default RegistrationLayout;
