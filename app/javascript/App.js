import React from 'react'
import "bootstrap";
import "./packs/stylesheets/application.scss";

import StripeConnect from './src/StripeConnect'

const App = () => {
    return (
        <div>
            <h4>react</h4>
            <StripeConnect/>
        </div>
    )
}

export default App
