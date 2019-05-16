import React, { Component, RefObject, createRef } from 'react';
import { IonRow, IonItemGroup, IonDatetime, IonItem, IonLabel, IonIcon, IonText, IonCol, IonButton } from '@ionic/react';
import { format } from 'date-fns';


class CrimeDateFilter extends Component {
    startRef: RefObject<HTMLIonDatetimeElement>;
    endRef: RefObject<HTMLIonDatetimeElement>;
    today: string = '';
    minDate: string = '2005-01-01';
    state = {
        startingDate: '',
        endingDate: ''
    };

    constructor(props: any) {
        super(props);
        this.startRef = createRef<HTMLIonDatetimeElement>();
        this.endRef = createRef<HTMLIonDatetimeElement>();
        this.today = format(new Date(), 'YYYY-MM-DD');
        /*const now = format(new Date(), 'YYYY-MM-DD');
        const years = now.split('-')[0];
        let remaining = now.split('-')[1];
        const months = remaining.split('-')[0];
        let days: string;

        switch(+months) {
            case (2): {
                days = +years % 4 === 0 ? '29' : '28';
                break;
            }
            case (4):
            case (6):
            case (9): 
            case (11): {
                days = '30';
                break;
            }
            default: {
                days = '31';
                break;
            }
        }
        this.today = `${years}-${months}-${days}`;*/
    }

    toggleDatetimeHandler = (event: any, whichDate: string) => {
        console.log('today: ',this.today);
        console.log(event);
        if (whichDate === 'start' && this.startRef && this.startRef.current) {
            this.startRef.current.open();
        }
        if (whichDate === 'end' && this.endRef && this.endRef.current) {
            this.endRef.current.open();
        }
    }

    changeDatetimeHandler = (event: any, whichDate: string) => {
        console.log(event.detail.value, whichDate);
        const formattedDate = format(new Date(event.detail.value), 'MMM DD YYYY');
        whichDate === 'start' ? 
            this.setState({ startingDate: formattedDate }) : 
            this.setState({ endingDate: formattedDate });
    }

    resetDateHandler = (event: any, whichDate: string) => {
        console.log(event.detail.value);
        whichDate === 'start' ? 
            this.setState({ startingDate: ''}) : 
            this.setState({ endingDate: ''});
    }



    render() {
        return(
            <IonItemGroup>
                <IonRow no-padding>
                    <IonCol size="6">
                        <IonItem 
                            button 
                            lines="none"
                            detail={false} 
                            onClick={(event) => this.toggleDatetimeHandler(event, 'start')}>
                            <IonIcon margin-end name="calendar" slot="start" />
                            <IonLabel>
                                <h2><IonText color="medium">From</IonText></h2>
                                <h3>{this.state.startingDate !== '' && this.state.startingDate}</h3>
                                
                            </IonLabel>
                            <IonDatetime 
                                hidden 
                                ref={this.startRef} 
                                onIonChange={(event) => this.changeDatetimeHandler(event, 'start')} 
                                value={this.state.startingDate}
                                max={this.state.endingDate !== '' ? format(new Date(this.state.endingDate), 'YYYY-MM-DD') : this.today} />
                        </IonItem>
                        <IonButton 
                            disabled={this.state.startingDate == ''}
                            expand="full" 
                            color="danger" 
                            onClick={(event) => this.resetDateHandler(event, 'start')}>
                            Reset
                        </IonButton>
                    </IonCol>
                    <IonCol size="6">
                        <IonItem 
                            button 
                            lines="none"
                            detail={false} 
                            onClick={(event) => this.toggleDatetimeHandler(event, 'end')}>
                            <IonIcon margin-end name="calendar" slot="start" />
                            <IonLabel>
                                <h2><IonText color="medium">Until</IonText></h2>
                                <h3>{this.state.endingDate !== '' && this.state.endingDate}</h3>
                            </IonLabel>
                            <IonDatetime 
                                hidden 
                                ref={this.endRef} 
                                onIonChange={(event) => this.changeDatetimeHandler(event, 'end')} 
                                value={this.state.endingDate}
                                max={this.today}
                                min={this.state.startingDate !== '' ? format(new Date(this.state.startingDate), 'YYYY-MM-DD') : this.minDate} />
                        </IonItem>
                        <IonButton 
                            disabled={this.state.endingDate == ''}
                            expand="full" 
                            color="danger" 
                            onClick={(event) => this.resetDateHandler(event, 'end')}>
                            Reset
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonItemGroup>
        );
    }
}



export default CrimeDateFilter;