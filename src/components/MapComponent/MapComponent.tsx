import React, { Component, RefObject, createRef } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { IonSpinner, IonLoading } from '@ionic/react';


class MapComponent extends Component<any, any> {

    state = {
        selectedMarker: null
    }

    markerClickHandler = (event: any, index: any) => {
        // close all info windows
        this.props.markers.forEach((marker: any) => this.closeMarkerHandler(marker));
        const selectedMarker = this.props.markers[index];
        //open specific info window
        selectedMarker.isOpened = true;
        this.setState({ selectedMarker: selectedMarker });
    }

    closeMarkerHandler = (marker: any) => {
        marker.isOpened = false;
    }

    render() {
        //console.log(this.props);
        const { center, zoom, markers } = this.props;

        const defaultOpts = {
            disableDefaultUI: true
        };
        let markerList: any[] = [];
        if (markers.length) {
            markerList = markers.map((marker: any, i: number) => {
                let key: string;
                if (marker['ADDRESS']) {
                    key = marker.ADDRESS;
                }
                else if (marker['ACCIDENTLOC']) {
                    key = marker.ACCIDENTLOC;
                }
                else if (marker['Polling Place Address']) {
                    key = marker._id;
                }
                else {
                    key = marker.IncidentNum;
                }
                return (
                    <Marker key={key} position={marker.position} onClick={(event) => this.markerClickHandler(event, i)}>
                        {marker.isOpened && 
                            <InfoWindow defaultPosition={marker.position} onCloseClick={() => this.closeMarkerHandler(marker)}>
                                <p>
                                    {marker.ADDRESS ? marker.ADDRESS : null}
                                    {marker.ACCIDENTLOC ? marker.ACCIDENTLOC : null}
                                    {marker['Polling Place Address'] ? marker['Polling Place Address'] : null}
                                    {marker.Location ? marker.Location : null}
                                </p>
                            </InfoWindow>
                        }
                    </Marker>
                );
            })
        }
        
        return (
            <GoogleMap 
                defaultOptions={defaultOpts}
                defaultCenter={center}
                defaultZoom={zoom}
                defaultClickableIcons={false}>
                {markerList.length ? markerList : null}
            </GoogleMap>
        )
    }
}



export default withScriptjs(withGoogleMap(MapComponent));