import React from 'react';
import PropTypes from 'prop-types';
import styles from "../styles/_base.module.scss";

const Container = ({children, style, ...rest}) => {
    return (
        <div className={styles['the-maze-container']} style={style} {...rest}>
            {children}
        </div>
    );
};

Container.propTypes = {
    style: PropTypes.object
};

Container.defaultProps = {
    style: {}
}

export default Container;
