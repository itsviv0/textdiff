import React from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
    onFileSelect: (content: string, side: "left" | "right") => void;
    side: "left" | "right";
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    side,
}) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            const file = files[0];
            const text = await file.text();
            onFileSelect(text, side);
        }
    };

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const file = files[0];
            const text = await file.text();
            onFileSelect(text, side);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <Upload className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-2 sm:mb-4" />
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
                Drag and drop a file here, or
            </p>
            <label className="inline-block mt-2 sm:mt-2">
                <span className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded cursor-pointer hover:bg-blue-600 text-sm sm:text-base">
                    Browse Files
                </span>
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".txt,.js,.jsx,.ts,.tsx,.md,.html,.css"
                />
            </label>
        </div>
    );
};
