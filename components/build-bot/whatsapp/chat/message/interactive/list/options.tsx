import { WhatsAppInteractiveListMessageSection, WhatsAppInteractiveListMessageSectionRow } from "@/types/whatsapp";
import { stopPropagation } from "@/utils/event";
import { GoInfo, GoPlusCircle } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import EditWhatsAppMessageField from "../../../edit-field";
import WhatsAppUtilityButton from "../../../utility-button";

interface WAInteractiveListOptionsProps {
    sections: WhatsAppInteractiveListMessageSection[];
    title: string;
    setShowListOptions: (val: boolean) => void;
    editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function WAInteractiveListOptions({ sections, title, setShowListOptions, editing }: WAInteractiveListOptionsProps) {

    function close() {
        setShowListOptions(false);
    };

    function onAddRowClick(rows: WhatsAppInteractiveListMessageSectionRow[], sectionIndex: number) {
        if (!editing) return;

        const newRow = {
            id: "",
            title: "",
            description: ""
        };

        editing.set(['interactive', 'action', 'sections', sectionIndex.toString(), 'rows'], [...rows, newRow]);
    }

    function onAddSectionClick() {
        if (!editing) return;

        const newSection = {
            title: "",
            rows: [
                {
                    id: "",
                    title: "",
                    description: ""
                }
            ]
        };

        editing.set(['interactive', 'action', 'sections'], [...sections, newSection]);
    }

    return (
        <div onClick={close} className="w-full h-full cursor-pointer absolute bottom-0 left-0 right-0" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <div onClick={stopPropagation} className="w-full h-auto max-h-full overflow-y-auto p-3 cursor-default absolute bottom-0 left-0 right-0 rounded-t-xl bg-white">
                <div className="w-full flex">
                    <div className="justify-self-center ml-auto">
                        <p className="text-black font-semibold">{title}</p>
                    </div>
                    <div onClick={close} className="cursor-pointer justify-self-end ml-auto p-1 text-lg bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
                        <IoMdClose />
                    </div>
                </div>
                {sections && Array.isArray(sections) && sections.map((section, i) => (
                    <div key={i} className="w-full mt-8">
                        <div className="p-2 border-b-[0.5px] border-solid">
                            {!editing ? (
                                <p className="text-gray-500 text-sm leading-4">{section.title || 'Section title'}</p>
                            ) : (
                                <EditWhatsAppMessageField
                                    mode="light"
                                    value={editing.get(['interactive', 'action', 'sections', i.toString(), 'title'])}
                                    onChange={e => editing.set(['interactive', 'action', 'sections', i.toString(), 'title'], e.target.value)}
                                    placeholder="Section title"
                                />
                            )}
                        </div>
                        {section.rows.map((row, j) => (
                            <div key={`${i}${j}`} className="px-2 py-4 border-b-[0.5px] border-solid cursor-pointer">
                                {!editing ? (
                                    <p className="text-black leading-5">{row.title || 'Row title'}</p>
                                ) : (
                                    <EditWhatsAppMessageField
                                        mode="light"
                                        value={editing.get(['interactive', 'action', 'sections', i.toString(), 'rows', j.toString(), 'title'])}
                                        onChange={e => editing.set(['interactive', 'action', 'sections', i.toString(), 'rows', j.toString(), 'title'], e.target.value)}
                                        placeholder="Row title"
                                    />
                                )}
                                {!editing ? (
                                    <p className="text-gray-400 text-sm leading-5">{row.description || 'Row description'}</p>
                                ) : (
                                    <div>
                                        <EditWhatsAppMessageField
                                            mode="light"
                                            value={editing.get(['interactive', 'action', 'sections', i.toString(), 'rows', j.toString(), 'description'])}
                                            onChange={e => editing.set(['interactive', 'action', 'sections', i.toString(), 'rows', j.toString(), 'description'], e.target.value)}
                                            placeholder="Row description"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        {editing && (section.rows.length < 10) ? (
                            <WhatsAppUtilityButton
                                Icon={<GoPlusCircle />}
                                size="small"
                                label="Add row"
                                onClick={() => onAddRowClick(section.rows, i)}
                            />
                        ) : editing && (
                            <div className="w-full text-red-400 flex items-center gap-1 mt-2">
                                <GoInfo />
                                <p className="text-xs">Maximum number of rows added for this section. WhatsApp only allows up to 10 rows per section.</p>
                            </div>
                        )}
                    </div>
                ))}
                {editing && (sections.length < 10) ? (
                    <WhatsAppUtilityButton
                        className='mt-8'
                        Icon={<GoPlusCircle />}
                        size="small"
                        label="Add section"
                        onClick={onAddSectionClick}
                    />
                ) : editing && (
                    <div className="w-full text-red-400 flex items-center gap-1 mt-2">
                        <GoInfo />
                        <p className="text-xs">Maximum number of sections added for this section. WhatsApp only allows up to 10 sections.</p>
                    </div>
                )}
                {/* <div className="w-full p-5 absolute bottom-0 left-0 right-0 flex justify-center">
                    <p className="text-gray-500 text-xs">Tap an item to select it</p>
                </div> */}
            </div>
        </div>
    )
}

export default WAInteractiveListOptions;