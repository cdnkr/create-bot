'use client'; // If using Next.js App Router

import { PlaceLocation } from '@/types/geo';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
    overflow: 'hidden'
};

const defaultCenter = {
    lat: -34.397,
    lng: 150.644
};

interface Props {
    location: PlaceLocation | null;
}

const GoogleMapComponent = ({
    location
}: Props) => {
    const center = (location && location.lat && location.lng) ? { lat: location.lat, lng: location.lng } : defaultCenter;

    return (
        <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScriptNext>
    );
};

export default GoogleMapComponent;
