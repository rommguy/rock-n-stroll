import React, { FunctionComponent } from 'react'
import { Map } from './components/Map'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Intro } from './components/Intro'
import './App.scss'

export const App: FunctionComponent<{}> = () => (
    <Router>
        <div className="App">
            <Route path="/map" component={Map} />
            <Route path="/" component={Intro} />
        </div>
    </Router>
)
