import useLoadGoogleMaps from '@/hooks/google-places/useLoadGoogleMaps';
import { PlaceLocation } from '@/types/geo';
import GooglePlacesAutocompleteInput from '../autocomplete';
import GoogleMapComponent from '../map';

interface Props {
    location: PlaceLocation | null;
    setLocation: (loc: PlaceLocation | null) => void;
}

function SelectLocation(props: Props) {
    const {
        location,
        setLocation,
    } = props;
    const { isLoaded, loadError } = useLoadGoogleMaps();

    return (
        <div>
            {!loadError && (
                <div className='w-full'>
                    <div className='w-full flex flex-col gap-5 p-5'>
                        <h1 className="font-bold text-2xl leading-none">Select location</h1>
                        <GooglePlacesAutocompleteInput
                            location={location}
                            setLocation={setLocation}
                            isScriptLoaded={isLoaded}
                        />
                        {isLoaded && (
                            <GoogleMapComponent
                                location={location}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectLocation
