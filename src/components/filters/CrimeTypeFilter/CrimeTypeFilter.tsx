import React, { Component } from 'react';
import { IonList, IonRow, IonCol, IonLabel, IonCheckbox, IonListHeader, IonItem, IonIcon, IonButton } from '@ionic/react';
import classes from './CrimeTypeFilter.module.css';

class CrimeTypeFilter extends Component<any, any> {
    state = {
        type: [
            { 
                label: 'Arson', 
                icon: 'flame', 
                name: 'Arson', 
                checked: false 
            }, { 
                label: 'Assault', 
                icon: 'body', 
                name: 'AssaultOffense', 
                checked: false
            }, { 
                label: 'Burglary', 
                icon: 'home', 
                name: 'Burglary', 
                checked: false 
            }, { 
                label: 'Homicide', 
                icon: 'body', 
                name: 'Homicide', 
                checked: false 
            }, { 
                label: 'Robbery', 
                icon: 'hand', 
                name: 'Robbery', 
                checked: false 
            }, { 
                label: 'Sexual Assualt', 
                icon: 'body', 
                name: 'SexOffense', 
                checked: false 
            }, { 
                label: 'Theft', 
                icon: 'flame', 
                name: 'Theft', 
                checked: false 
            }, { 
                label: 'Vehicle Break-in', 
                icon: 'car', 
                name: 'LockedVehicle', 
                checked: false 
            }, { 
                label: 'Vehicle Theft', 
                icon: 'car', 
                name: 'VehicleTheft', 
                checked: false 
            }
        ],
        filtersApplied: false
    };

    

    checkboxHandler = (event: any) => {
        const { checked, value } = event.detail;

        const typeList: Array<any> = [...this.state.type];

        let selectedType = typeList.filter((t) => t.name === value)[0];
        selectedType.checked = checked;
        this.setState({ type: typeList});
        const checkedItems = this.state.type.filter((crimeType) => crimeType.checked === true);
        console.log(checkedItems.length > 0);
        this.setState({ appliedFilters: checkedItems.length > 0 });
        console.log('handler', this.state.filtersApplied);
        checkedItems.forEach((item) => console.log(item.label));
    }

    render() {
        console.log('render ', this.state.filtersApplied);
        return (
            <div>
                <IonRow>
                {this.state.type.map((crime) => (
                    <IonCol key={crime.name} size="6" no-margin padding-start>
                        <IonItem lines="none" class={classes.FilterItem} no-padding>
                            <IonCheckbox 
                                slot="start" 
                                no-margin
                                style={{marginRight: '10px'}}
                                value={crime.name} 
                                checked={crime.checked} 
                                onIonChange={(event) => this.checkboxHandler(event)} />
                            <IonLabel text-wrap>{crime.label}</IonLabel>  
                        </IonItem>
                    </IonCol>
                ))}
                </IonRow>
                <IonButton color="danger" disabled={!this.state.filtersApplied}>
                    Reset
                </IonButton>
            </div>
        );
    }
}



export default CrimeTypeFilter;