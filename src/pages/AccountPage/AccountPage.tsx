import React, { Component } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton } from '@ionic/react';


class AccountPage extends Component {
    state = {};

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton menu="main" autoHide={true} />
                        </IonButtons>
                        <IonTitle>Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    Account
                </IonContent>
            </IonPage>
        )
    }
}



export default AccountPage;