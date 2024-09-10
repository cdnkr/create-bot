// UNUSED

import { stopPropagation } from "@/utils/event";
import { getFileNameFromUrl, handleDownload } from "@/utils/file";
import { ImArrowDown } from "react-icons/im";
import { IoMdDocument } from "react-icons/io";

function DocumentDisplay({
    documentUrl
}: { documentUrl: string }) {

    function onDownloadClick(e: React.MouseEvent) {
        stopPropagation(e);
        handleDownload(documentUrl);
    }

    return (
        <div className="w-full">
            <div
                className="rounded-md w-full p-2 bg-gray-700 flex gap-1 items-start justify-center cursor-pointer"
            >
                <div className="text-white pl-1">
                    <IoMdDocument />
                </div>
                <div className="mr-auto">
                    <p className="leading-none text-white text-wrap text-sm">{decodeURIComponent(getFileNameFromUrl(documentUrl))}</p>
                    <p className="text-[#8796a1] text-[10px] min-w-[50px]">243&nbsp;KB&nbsp;•&nbsp;html</p>
                </div>
                <div className="w-5" />
                <div className="px-3" onClick={onDownloadClick}>
                    <div className="text-green-400 text-xs rounded-full border-green-400 border-[1.5px] p-1 ml-auto">
                        <ImArrowDown />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentDisplay;