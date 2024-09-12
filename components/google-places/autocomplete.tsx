'use client';

import useLoadGoogleMaps from '@/hooks//google-places/useLoadGoogleMaps';
import { PlaceLocation } from '@/types/geo';
import { useEffect, useRef } from 'react';
import Input from '../general/input';

interface Props {
    location: PlaceLocation | null;
    setLocation: (loc: PlaceLocation | null) => void;
    isScriptLoaded: boolean;
}

const GooglePlacesAutocompleteInput = ({
    location,
    setLocation,
    isScriptLoaded
}: Props) => {
    const autocompleteRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        console.log({
            isScriptLoaded,
            autocompleteRef,
            inputRef
        })
        if (isScriptLoaded && !autocompleteRef.current && inputRef.current) {
            // Initialize Google Places Autocomplete
            autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                fields: ['formatted_address', 'geometry', 'name'],
            });

            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                if (place.geometry) {
                    const { lat, lng } = place.geometry.location;
                    setLocation({
                        lat: lat(),
                        lng: lng(),
                        address: place.formatted_address,
                        name: place.name
                    });
                }
            });
        }
    }, [isScriptLoaded, inputRef.current]);

    // if (loadError) {
    //     return <div>Error loading maps</div>;
    // }

    return (
        <Input
            _ref={inputRef}
            placeholder="Start typing place name..."
            showBorderOnFocus={false}
        />
    );
};

export default GooglePlacesAutocompleteInput;