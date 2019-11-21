import React from 'react';
import '../../styles/pageNotFound.scss';


export default function PageNotFound(props) {
    const returnClicked = () => {
        props.history.push(`/`)
      };
    
    return (
        <div>
            <div className="face">
                <div className="band">
                    <div className="red"></div>
                    <div className="white"></div>
                    <div className="blue"></div>
                </div>
                <div className="eyes"></div>
                <div className="dimples"></div>
                <div className="mouth"></div>
            </div>

            <h1>Oops! Something went wrong!</h1>
            <div className="btn" onClick={() => returnClicked()}>Return to Home</div>
        </div>
    );
}