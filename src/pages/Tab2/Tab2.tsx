import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton } from '@ionic/react';


class Tab2 extends Component {
    state = {};

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton menu="main" autoHide={true} />
                        </IonButtons>
                        <IonTitle>Tab2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    Tab2
                </IonContent>
            </IonPage>
        );
    }
}



export default Tab2;