import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Survey from './pages/Survey';
import AnalysisPage from './pages/Analysis';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/analysis">
              <AnalysisPage />
            </Route>
            <Route path="/">
              <Survey />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
