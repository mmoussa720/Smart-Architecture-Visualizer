import React, {useEffect, useRef, useState} from 'react';
import {useOutletContext} from "react-router";
import {CheckCircle2, ImageIcon, UploadIcon} from "lucide-react";
import {PROGRESS_INCREMENT, PROGRESS_INTERVAL_MS, REDIRECT_DELAY_MS} from "~/lib/Constants";

interface UploadProps {
    onComplete?: (base64Data: string) => void;
}

const Upload = ({onComplete = () => {}}: UploadProps) => {
    const [file,setFile]=useState<File | null>(null);
    const [isDragging,setIsDragging]=useState(false);
    const [progress,setProgress]=useState(0);
    const {isSignedIn}=useOutletContext<AuthContext>();

    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }

            if (redirectTimeoutRef.current) {
                clearTimeout(redirectTimeoutRef.current);
            }
        };
    }, []);

    const resetTimers = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }

        if (redirectTimeoutRef.current) {
            clearTimeout(redirectTimeoutRef.current);
            redirectTimeoutRef.current = null;
        }
    };

    const processFile = (selectedFile: File) => {
        if (!isSignedIn) return;

        resetTimers();
        setFile(selectedFile);
        setProgress(0);
        setIsDragging(false);

        const reader = new FileReader();

        reader.onload = () => {
            const base64Data = typeof reader.result === "string" ? reader.result : "";
            if (!base64Data) return;

            progressIntervalRef.current = setInterval(() => {
                setProgress((currentProgress) => {
                    const nextProgress = Math.min(currentProgress + PROGRESS_INCREMENT, 100);

                    if (nextProgress === 100) {
                        if (progressIntervalRef.current) {
                            clearInterval(progressIntervalRef.current);
                            progressIntervalRef.current = null;
                        }

                        redirectTimeoutRef.current = setTimeout(() => {
                            onComplete(base64Data);
                        }, REDIRECT_DELAY_MS);
                    }

                    return nextProgress;
                });
            }, PROGRESS_INTERVAL_MS);
        };

        reader.readAsDataURL(selectedFile);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        processFile(selectedFile);
        event.target.value = "";
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!isSignedIn) return;

        const droppedFile = event.dataTransfer.files?.[0];
        setIsDragging(false);

        if (!droppedFile) return;
        processFile(droppedFile);
    };

  return (
    <div className="upload">
        {
            !file?(
                <div
                    className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept=".jpg,.jpeg,png"
                        disabled={!isSignedIn}
                        onChange={handleChange}
                    />
                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>
                        <p>
                            {isSignedIn?("Click to upload or just drag and drop the file."):("Sign in or sign up to upload")}
                        </p>
                        <p className="help">Max 20 MB</p>
                    </div>
                </div>
            ):(
                <div className="status-status">
                    <div className="status-icon">
                        {progress==100?(
                            <CheckCircle2 className="check" />
                        ):(
                            <ImageIcon className="image"/>
                        )}
                    </div>
                    <h3>{file.name}</h3>
                    <div className='progress'>
                        <div className="bar" style={{width:`${progress}%`}} />
                        <p className="status-text">
                            {progress<100?'Analyzing Floor Plan...':'Redirecting...'}
                        </p>
                    </div>
                </div>
            )
        }
    </div>
  );
};

export default Upload;
