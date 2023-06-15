import React from "react";
import Footer from "../components/Footer/Footer";

const ScoresboardLayout = ({children}) =>{

    return(
        <>
            {children}
            <Footer homeButtonUrl={"/scoreboard"}/>
        </>
    )
}

export default ScoresboardLayout;