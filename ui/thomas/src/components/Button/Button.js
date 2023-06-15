import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useRef} from 'react';
import "./_button.scss"
import InsideStyles from "./../../screens/screenSelector/ScreenSelectorButton.module.scss";
import {classNameGenerator} from "../../utils/common";


const Button = ({header, bottom, delay, onClick, styles, withSreenSelectorStyles}) => {
    const classnames = classNameGenerator(InsideStyles)
    let buttonElement = useRef(null);
    let animationdelay = "0s";
    useEffect(() => {
        function scaleUp() {
            animationdelay = delay*0.25 + "s";
            buttonElement.current.style.animationDelay = animationdelay;
            //TweenMax.to(buttonElement.current, .75, {y:0,alpha:1, ease: "back.out(1.9)", delay: delay * .25} )
        }
        buttonElement.current.classList.add("show_button");


        scaleUp();
        //TweenMax.to(buttonElement.current, .1,{y:20, onComplete:scaleUp})
    }, [buttonElement, delay]);

    if(withSreenSelectorStyles){
        return(
            <>
                <div style={styles} className="secondEffect" ref={buttonElement} onClick={() => onClick(header)}>
                    <div className={classnames(["btn_game", "effect_click"])}>
                        <div className={classnames(["btn_bg_color"])}/>
                        <div className={['btn_container']}>
                            <div className="header-btn" style={{fontSize:"33px"}}>{header}</div>
                            <div className="bottom-btn">{bottom}</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
           <div style={styles} className="secondEffect" ref={buttonElement} onClick={() => onClick(header)}>
                <div className="btn_game effect_click">
                            <div className="btn_bg_color"/>
                            <div className={['btn_container']}>
                                <div className="header-btn">{header}</div>
                                <div className="bottom-btn">{bottom}</div>
                            </div>
                        </div>
           </div>
    );
};

Button.propTypes = {
    header: PropTypes.string,
    bottom: PropTypes.string,
    onClick: PropTypes.func,
    delay: PropTypes.number,
}

Button.defaultProps = {
    onClick: ()=>{},
    styles: {}
}

export default Button;
