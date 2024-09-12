import { PlaceLocation } from '@/types/geo';
import SelectLocation from '.';
import Modal from '../../general/modal';
import Button from '@/components/general/button';

interface Props {
    location: PlaceLocation | null;
    setLocation: (loc: PlaceLocation | null) => void;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
}

function SelectLocationModal(props: Props) {
    const {
        location,
        setLocation,
        showModal,
        setShowModal
    } = props;

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <div className='w-full'>
                <SelectLocation
                    location={location}
                    setLocation={setLocation}
                />
            </div>
            <div className='pl-5 pr-5 pb-5'>
                <Button
                    text='Use this location'
                    onClick={() => setShowModal(false)}
                />
            </div>
        </Modal>
    )
}

export default SelectLocationModal
