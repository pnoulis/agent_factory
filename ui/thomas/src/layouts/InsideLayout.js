import React, {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import styles from "../screens/inside/insideChangeable.module.scss";
import Particles from "../components/Particles";
import Footer from "../components/Footer/Footer";
import {useParams} from "react-router-dom";
import {classNameGenerator} from "../utils/common";

import card_blue from "../assets/inside/blue/card_blue.png";
import card_red from "../assets/inside/red/card_red.png";
import card_yellow from "../assets/inside/yellow/card_yellow.png";
import card_blue_transparent from "../assets/inside/blue/card_blue_transparent.png";
import card_red_transparent from "../assets/inside/red/card_red_transparent.png";
import card_yellow_transparent from "../assets/inside/yellow/card_yellow_transparent.png";
import home_blue from "../assets/inside/blue/FOT_04b.png";
import home_red from "../assets/inside/red/FOT_04r.png";
import home_yellow from "../assets/inside/yellow/FOT_04y.png";
import shield_blue from "../assets/inside/blue/TIM_04_blue.png";
import shield_red from "../assets/inside/red/TIM_04_red.png";
import {useOutdoorConfiguration} from "../context/OutdoorConfigContext";
import {useInsideConfiguration} from "../context/InsideConfigContext";

const classnames = classNameGenerator(styles)
const insideLayoutColorChange = createContext()

const particlesParams = (color) => ({
    particles: {
        color,
        number: {
            value: 33,
            density: {
                enable: true,
                value_area: 600
            }
        }
    }
})


const InsideLayout = ({children}) => {
    const params = useParams()
    const {configuration} = useInsideConfiguration()
    console.log('configuration', configuration)
    const roomColor = configuration?.color?.toLowerCase()

    let color
    let card_transparent
    let card
    let text_color
    let homeColoredButton
    let shield

    switch (roomColor){
        case 'blue':
            color =  '#1cddec'
            card = card_blue
            card_transparent = card_blue_transparent
            text_color = "active-blue"
            homeColoredButton = home_blue
            shield = shield_blue
            break
        case 'red':
            color =  '#a44166'
            card = card_red
            card_transparent = card_red_transparent
            text_color = "active-red"
            homeColoredButton = home_red
            shield = shield_red
            break
        case 'yellow':
            card = card_yellow
            card_transparent = card_yellow_transparent
            text_color = "active-yellow"
            homeColoredButton = home_yellow
            shield = shield_red
            color =  '#b3b159'
            break
        default:
            card = card_blue
            card_transparent = card_blue_transparent
            text_color = "active-blue"
            homeColoredButton = home_blue
            shield = shield_blue
            color = '#1cddec'
            break
    }


    return (
        <insideLayoutColorChange.Provider value ={{card, card_transparent, text_color, shield}}>
            <div className={classnames(['the-maze-inside-wrapper', roomColor])}>
                <Particles height={1080} width={1920} params={particlesParams(color)}/>
                {children}
                <Footer showHome={false} homeButtonUrl={`/inside/${params.room}`} insideDifficultyUrl ={`/inside/${params.room}/difficulty`} homeColoredButton={homeColoredButton}/>
            </div>
        </insideLayoutColorChange.Provider>
    );
};

export const useInsideLayoutColorChange = () => {
    return useContext(insideLayoutColorChange)
}

InsideLayout.propTypes = {

};

export default InsideLayout;
