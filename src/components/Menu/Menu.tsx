import React, { Component } from 'react';
import { IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonListHeader, 
    IonLabel, 
    IonItem, 
    IonIcon, 
    IonCard,
    IonCardContent,
    IonSegment,
    IonSegmentButton} from '@ionic/react';

import classes from './Menu.module.css';
import CrimeTypeFilter from '../filters/CrimeTypeFilter/CrimeTypeFilter';
import CrimeDateFilter from '../filters/CrimeDateFilter/CrimeDateFilter';

class Menu extends Component {
    state = {
        filterView: 'type'
    }

    filterViewHandler = (event: any) => {
        const newVal: string = event.detail.value;
        this.setState({filterView: newVal})
    }

    render() {
        return (
            <IonMenu contentId="main" side="start" menuId="main" class={classes.IonMenu}>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Filters</IonTitle>
                    </IonToolbar>
                    <IonToolbar color="tertiary">
                        <IonSegment value={this.state.filterView} onIonChange={(event) => this.filterViewHandler(event)}>
                            <IonSegmentButton layout="icon-start" value="type">
                                <IonIcon name="options" />
                                <IonLabel>Type</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton layout="icon-start" value="date">
                                <IonIcon name="calendar" />
                                <IonLabel>Date</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton layout="icon-start" value="distance">
                                <IonIcon name="walk" />
                                <IonLabel>Distance</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        {this.state.filterView === 'type' ? <CrimeTypeFilter /> : null}
                        {this.state.filterView === 'date' ? <CrimeDateFilter /> : null}
                    </IonList>
                </IonContent>
            </IonMenu>
        );
    }
}



export default Menu;