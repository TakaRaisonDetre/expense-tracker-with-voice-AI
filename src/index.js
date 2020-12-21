import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from './context/context'
import App from './App'
import {SpeechProvider} from '@speechly/react-client'

import './index.css'

ReactDOM.render(
   < SpeechProvider appId="0f0a28fd-d88d-4ae2-be83-2084e156f8c0" language="en-US">
<Provider>
    <App/>
</Provider>
</SpeechProvider>, 
document.getElementById('root'));