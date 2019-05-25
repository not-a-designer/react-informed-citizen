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
         IonButton,
         IonLoading} from '@ionic/react';

import axios from 'axios';

import MapComponent from '../../components/MapComponent/MapComponent';
import classes from './MapPage.module.css';


class MapPage extends Component {
    segmentButtons: Array<any> = [
        {
            icon: 'warning',
            label: 'Crime',
            value: 'crime',
            id: '87843297-a6fa-46d4-ba5d-cb342fb2d3bb'
        }, {
            icon: 'stats',
            label: 'Polls',
            value: 'polls',
            id: 'b50aed9e-2893-483c-a56a-3c51530c2cc9'
        }, {
            icon: 'bicycle',
            label: 'Biking',
            value: 'traffic',
            id: '8fffaa3a-b500-4561-8898-78a424bdacee'
        }, {
            icon: 'restaurant',
            label: 'Food',
            value: 'food',
            id: 'e2fecdb9-3de9-4d34-955e-17d2e815bad6'
        }
    ];

    state = {
        defaultCenter: { lat: 43.09, lng: -87.9},
        defaultZoom: 13,
        currentView: 'crime',
        markers: [],
        isLoading: false
    };


    changeViewHandler = (event: any, newView: string) => {
        console.log(event);
        this.setState({ currentView: newView });
        this.loadData();
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        this.setState({ isLoading: true })
        const BASE_URL = 'https://data.milwaukee.gov/api/3/action/datastore_search';
        const currentMode = this.segmentButtons.filter((buttonData: any) => buttonData.value === this.state.currentView);

        const resourceId = currentMode[0].id;
        const response = await axios.get(BASE_URL, { params: { 'resource_id': resourceId, 'limit': 5 } })
        //console.log(response.data);
        let newList: any[] = [];
        for (let record of response.data.result.records) {
            const geocodeResponse = await this.geocodeAddress(record);
            const newRecord = {...record, isOpened: false, position: { lat: +geocodeResponse.lat, lng: +geocodeResponse.lng } };
            console.log('updatedMarker', newRecord);
            newList.push(newRecord);
        }

        this.setState({ markers: newList, isLoading: false });  
    }

    async geocodeAddress(record: any) {
        let addr: string = '';
        let zip: number = -1;

        if (record['Polling Place Address']) {
            console.log('Polls');
            addr = record['Polling Place Address'];
        }
        else if (record['ACCIDENTLOC']) {
            console.log('Traffic');
            addr = record.ACCIDENTLOC;
        }
        else if (record['ADDRESS']) {
            console.log('Food');
            addr = record.ADDRESS;
        }
        else {
            console.log('Crime');
            addr = record.Location;
            zip = +record.ZIP;
        }
        const query = (zip < 0) ? `${addr}, Milwaukee, WI` : `${addr}, Milwaukee, WI ${zip}`
        if (addr) {
            const geocodeURL: string = 'https://api.opencagedata.com/geocode/v1/json';
            const params = {
                'key': '9df276e154574e268bca6cf24e1ade88',
                'q': query
            };
            const geoResponse = await axios.get(geocodeURL, {params: params});
            return geoResponse.data.results[0].geometry;
        }
        
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
                    <IonLoading isOpen={this.state.isLoading} message="loading markers" onDidDismiss={() => {}} />
                    <MapComponent 
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCG7jwYwhPvLKDRESqjFcwT4-W4jSSzw4c&libraries=places`}
                        loadingElement={<div style={{height: '100%'}} />}
                        mapElement={<div style={{height: '100%'}} />}
                        containerElement={<div style={{height: '100%'}} />}
                        center={this.state.defaultCenter} 
                        zoom={this.state.defaultZoom} 
                        markers={this.state.markers} />
                </IonContent>
            </IonPage>
        )
    }
}



export default MapPage;