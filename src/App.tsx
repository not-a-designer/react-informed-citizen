import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { IonApp, IonSplitPane, IonPage } from '@ionic/react';

import Menu from './components/Menu/Menu';
import Tabs from './pages/Tabs/Tabs';
import './theme.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="App">
          <IonApp>
            <IonSplitPane contentId="main">
              <Menu />
              <IonPage id="main">
                <Route path="/" component={Tabs} />
              </IonPage>
            </IonSplitPane>
          </IonApp>
        </div>
      </Router>
    );
  }
}

export default App;
