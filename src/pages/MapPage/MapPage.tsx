import React, { Component } from 'react';
import { IonHeader, 
         IonToolbar, 
         IonTitle, 
         IonContent, 
         IonPage, 
         IonButtons, 
         IonMenuButton, 
         IonSegment, 
         IonSegmentButton, 
         IonIcon, 
         IonLabel, 
         IonSearchbar,
         IonButton} from '@ionic/react';

import MapComponent from '../../components/MapComponent/MapComponent';


class MapPage extends Component {
    segmentButtons: Array<any> = [
        {
            icon: 'warning',
            label: 'Crime',
            value: 'crime'
        }, {
            icon: 'stats',
            label: 'Polls',
            value: 'polls'
        }, {
            icon: 'bicycle',
            label: 'Biking',
            value: 'traffic'
        }, {
            icon: 'restaurant',
            label: 'Food',
            value: 'food'
        }
    ];

    state = {
        defaultCenter: { lat: 43.09, lng: -87.9},
        defaultZoom: 13,
        currentView: 'crime'
    };


    changeViewHandler = (event: any, newView: string) => {
        console.log(event);
        this.setState({ currentView: newView })
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton menu="main" autoHide={true} />
                        </IonButtons>
                        <IonSearchbar animated searchIcon="map" placeholder="Search Milwaukee..." />
                        <IonButtons slot="end">
                            {(window.innerWidth > 567) ? (
                                <IonButton fill="clear">
                                    <IonIcon name="funnel" />
                                </IonButton>
                            ) : null}
                        </IonButtons>
                    </IonToolbar>
                    <IonToolbar color="tertiary">
                        <IonSegment value={this.state.currentView}>
                            {this.segmentButtons.map((button: any) => (
                                <IonSegmentButton 
                                    layout="icon-start" 
                                    key={button.value} 
                                    value={button.value} 
                                    onIonSelect={(event) => this.changeViewHandler(event, button.value)}>
                                    <IonIcon name={button.icon} />
                                    <IonLabel>{button.label}</IonLabel>
                                </IonSegmentButton>
                            ))}
                        </IonSegment>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <MapComponent 
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCG7jwYwhPvLKDRESqjFcwT4-W4jSSzw4c&libraries=places`}
                        loadingElement={<div style={{height: '100%'}} />}
                        mapElement={<div style={{height: '100%'}} />}
                        containerElement={<div style={{height: '100%'}} />}
                        center={this.state.defaultCenter} 
                        zoom={this.state.defaultZoom} />
                </IonContent>
            </IonPage>
        )
    }
}



export default MapPage;