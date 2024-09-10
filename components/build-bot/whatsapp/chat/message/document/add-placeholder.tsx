import { IoAddCircleOutline } from "react-icons/io5";

function AddDocumentPlaceholder() {
    return (
        <div className="w-full">
            <div
                className="rounded-md max-w-[270px] w-full p-2 bg-gray-700 border border-dashed border-white flex gap-1 items-center justify-center cursor-pointer"
            >
                <div className="text-gray-200 pl-1">
                    <IoAddCircleOutline />
                </div>
                <div className="mr-auto">
                    <p className="leading-none text-gray-200 whitespace-pre-line text-sm font-light">Click to add your document</p>
                </div>
            </div>
        </div>
    )
}

export default AddDocumentPlaceholder;