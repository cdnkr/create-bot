"use client"

import { useCallback, useEffect, useRef } from "react";

interface Props {
    setFileUrl: (val: string) => void,
    children: React.ReactNode;
    setIsUploading: (val: boolean) => void;
}

const FILE_UPLOAD_LIMIT_MB = 10000000 // 10MB

export default function FileUpload({
    setFileUrl,
    children,
    setIsUploading
}: Props) {
    const dropRef = useRef<HTMLDivElement>(null)
    const filesRef = useRef<HTMLInputElement>(null)

    async function uploadFileToServer(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/file/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.fileUrl;
    }

    const handleUploadFile = useCallback(async (file: File) => {
        setIsUploading(true)
        const fileUrl = await uploadFileToServer(file) // upload file here
        setIsUploading(false)
        if (!fileUrl) {
            alert("An error occurred while processing the file")
            return
        }

        setFileUrl(fileUrl)
    }, [setFileUrl])

    const handleOnDrop = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e && e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUploadFile(e.dataTransfer.files[0])
            e.dataTransfer.clearData()
        }
    }, [handleUploadFile])

    useEffect(() => {
        let div = dropRef.current
        if (div) {
            div.addEventListener('dragenter', handleDragIn)
            div.addEventListener('dragleave', handleDragOut)
            div.addEventListener('dragover', handleDrag)
            div.addEventListener('drop', handleOnDrop)
        }

        return () => {
            if (div) {
                div.removeEventListener('dragenter', handleDragIn)
                div.removeEventListener('dragleave', handleDragOut)
                div.removeEventListener('dragover', handleDrag)
                div.removeEventListener('drop', handleOnDrop)
            }
        }
    }, [handleOnDrop])

    function handleDrag(e: Event) {
        e.preventDefault()
        e.stopPropagation()
    }

    function handleDragIn(e: DragEvent) {
        e.preventDefault()
        e.stopPropagation()
    }

    function handleDragOut(e: DragEvent) {
        e.preventDefault()
        e.stopPropagation()
    }

    function handleFilesClick() {
        if (filesRef && filesRef.current) {
            filesRef.current.click()
        }
    }

    function handleChange() {
        if (filesRef && filesRef.current) {
            const files = filesRef.current.files

            if (files && files[0] && files[0].size && (files[0].size > FILE_UPLOAD_LIMIT_MB)) {
                alert('File too large - Please select an file less than 10MB in size')

                return
            }
            if (files && files[0]) {
                handleUploadFile(files[0])
            }
        }
    }

    return (
        <>
            <div ref={dropRef} className="flex cursor-pointer" onClick={handleFilesClick}>
                {children}
                <input
                    className="invisible w-0 h-0"
                    type="file"
                    ref={filesRef}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}