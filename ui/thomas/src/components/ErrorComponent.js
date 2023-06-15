import React, {useEffect} from 'react';

const ErrorComponent = ({error, setError, className}) => {
    useEffect(() => {
        if(error) {
            setTimeout(()=>{
                setError(null)
            },5000)
        }
    },[error])

    if(!error) {
        return null
    }

    return (
        <div className={className}>
            <span>*{error}</span>
        </div>
    );
};

ErrorComponent.propTypes = {

};

export default ErrorComponent;
