import React from 'react';
import Connector from "./MQTTcontext";
import TranslationContextProvider from "./TranslationContext";
import StateContextProvider from "./StateContext";

const TheMazeProvider = ({children}) => {
    return (
        <Connector>
            <StateContextProvider>
                <TranslationContextProvider>
                    {children}
                </TranslationContextProvider>
            </StateContextProvider>
        </Connector>
    );
};

export default TheMazeProvider;

