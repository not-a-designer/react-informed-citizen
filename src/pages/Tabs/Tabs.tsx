import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { IonTabs, 
         IonTabBar, 
         IonTabButton, 
         IonIcon, 
         IonLabel, 
         IonRouterOutlet, 
         IonTab} from '@ionic/react';
import MapPage from '../MapPage/MapPage';
import Tab2 from '../Tab2/Tab2';
import AccountPage from '../AccountPage/AccountPage';


class Tabs extends Component {
    state = {};

    render() {
        return (
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/:tab(map)" exact component={MapPage} />
                    <Route path="/:tab(tab2)" exact component={Tab2} />
                    <Route path="/:tab(account)" exact component={AccountPage} />
                    <Route path="/" render={() => <Redirect to="/map" />} />
                </IonRouterOutlet>

                <IonTabBar slot="bottom" color="primary">
                    <IonTabButton tab="map" href="/map">
                        <IonIcon name="map" />
                        <IonLabel>Map</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tab2">
                        <IonIcon name="apps" />
                        <IonLabel>Apps</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="account" href="account">
                        <IonIcon name="person" />
                        <IonLabel>Account</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        );
    }
}



export default Tabs;