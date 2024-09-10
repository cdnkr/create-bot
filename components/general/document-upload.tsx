"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface Props {
    setDocumentUrl: (val: string) => void,
    children: React.ReactNode;
    setIsUploading: (val: boolean) => void;
}

const DOCUMENT_UPLOAD_LIMIT_MB = 10000000 // 10MB

export default function DocumentUpload({
    setDocumentUrl,
    children,
    setIsUploading
}: Props) {
    const dropRef = useRef<HTMLDivElement>(null)
    const documentsRef = useRef<HTMLInputElement>(null)

    async function uploadFileToServer(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/document/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.documentUrl;
    }

    const handleUploadDocument = useCallback(async (document: File) => {
        setIsUploading(true)
        const documentUrl = await uploadFileToServer(document) // upload document here
        setIsUploading(false)
        if (!documentUrl) {
            alert("An error occurred while processing the document")
            return
        }

        setDocumentUrl(documentUrl)
    }, [setDocumentUrl])

    const handleOnDrop = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e && e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUploadDocument(e.dataTransfer.files[0])
            e.dataTransfer.clearData()
        }
    }, [handleUploadDocument])

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

    function handleDocumentsClick() {
        if (documentsRef && documentsRef.current) {
            documentsRef.current.click()
        }
    }

    function handleChange() {
        if (documentsRef && documentsRef.current) {
            const documents = documentsRef.current.files

            if (documents && documents[0] && documents[0].size && (documents[0].size > DOCUMENT_UPLOAD_LIMIT_MB)) {
                alert('Document too large - Please select an document less than 10MB in size')

                return
            }
            if (documents && documents[0]) {
                handleUploadDocument(documents[0])
            }
        }
    }

    return (
        <>
            <div ref={dropRef} className="flex" onClick={handleDocumentsClick}>
                {children}
                <input
                    className="invisible w-0 h-0"
                    type="file"
                    ref={documentsRef}
                    onChange={handleChange}
                />
            </div>
        </>
    )
}