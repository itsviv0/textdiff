import React, { useState } from "react";
import { Copy, Trash2 } from "lucide-react";

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    onClear: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    label,
    onClear,
}) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleCopy = async () => {
        if (!value.trim()) {
            setToastMessage("Nothing to copy!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
            return;
        }

        try {
            await navigator.clipboard.writeText(value);
            setToastMessage("Copied to clipboard!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
            setToastMessage("Failed to copy text");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    const renderLineNumbers = () => {
        const lines = value.split("\n").length;
        return (
            <div className="select-none text-gray-500 pr-1 sm:pr-2 text-right border-r border-gray-300 mr-1 sm:mr-2 pt-2">
                {Array.from({ length: lines }, (_, i) => (
                    <div key={i + 1} className="h-5 sm:h-6 text-xs sm:text-sm">
                        {i + 1}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full relative">
            {showToast && (
                <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mt--2 px-4 py-2 rounded-lg text-sm shadow-lg transition-opacity duration-200 z-50 ${
                        toastMessage === "Nothing to copy!"
                            ? "bg-yellow-500 text-white"
                            : toastMessage === "Failed to copy text"
                              ? "bg-red-500 text-white"
                              : "bg-gray-800 text-white"
                    }`}
                >
                    {toastMessage}
                </div>
            )}
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg sm:text-base dark:text-gray-200">
                    {label}
                </h3>
                <div className="space-x-1 sm:space-x-2">
                    <button
                        onClick={handleCopy}
                        className="p-1 hover:bg-gray-200 rounded dark:hover:bg-gray-700 dark:text-gray-200"
                        title="Copy"
                    >
                        <Copy className="w-10 sm:w-4" />
                    </button>
                    <button
                        onClick={onClear}
                        className="p-1 hover:bg-gray-200 rounded dark:hover:bg-gray-700 dark:text-gray-200"
                        title="Clear"
                    >
                        <Trash2 className="w-10 sm:w-4" />
                    </button>
                </div>
            </div>
            <div className="flex-1 border rounded dark:border-gray-700">
                <div className="flex h-full">
                    {renderLineNumbers()}
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="flex-1 pt-2 pr-2 font-mono text-xs sm:text-sm resize-none focus:outline-none dark:bg-gray-800 dark:text-gray-200 leading-5 sm:leading-6"
                        placeholder="Paste or type your text here..."
                    />
                </div>
            </div>
        </div>
    );
};
