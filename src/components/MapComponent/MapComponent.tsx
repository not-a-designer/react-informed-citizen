import React, { Component, RefObject, createRef } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';


class MapComponent extends Component<any, any> {

    render() {
        //console.log(this.props);
        const { center, zoom } = this.props;

        const defaultOpts = {
            disableDefaultUI: true
        };

        

        return (
            <GoogleMap 
                defaultOptions={defaultOpts}
                defaultCenter={center}
                defaultZoom={zoom}
                defaultClickableIcons={false} />
        );
    }
}



export default withScriptjs(withGoogleMap(MapComponent));