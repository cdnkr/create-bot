'use client'; // If using Next.js App Router

import { PlaceLocation } from '@/types/geo';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const defaultCenter = {
    lat: -34.397,
    lng: 150.644
};

interface Props {
    location?: PlaceLocation | null;
    height?: string;
}

const GoogleMapComponent = ({
    location,
    height = '400px'
}: Props) => {
    const center = (location && location.latitude && location.longitude) ? { lat: parseFloat(location.latitude.toString()), lng: parseFloat(location.longitude.toString()) } : defaultCenter;
    const containerStyle = {
        width: '100%',
        height,
        borderRadius: '8px',
        overflow: 'hidden',
    };

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
