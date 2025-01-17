import React from "react";
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
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
    };

    const renderLineNumbers = () => {
        const lines = value.split("\n").length;
        return (
            <div className="select-none text-gray-500 pr-2 text-right border-r border-gray-300 mr-2 pt-2">
                {Array.from({ length: lines }, (_, i) => (
                    <div key={i + 1} className="h-6 text-sm">
                        {i + 1}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium dark:text-gray-200">{label}</h3>
                <div className="space-x-2">
                    <button
                        onClick={handleCopy}
                        className="p-1 hover:bg-gray-200 rounded dark:hover:bg-gray-700 dark:text-gray-200"
                        title="Copy"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onClear}
                        className="p-1 hover:bg-gray-200 rounded dark:hover:bg-gray-700 dark:text-gray-200"
                        title="Clear"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="flex-1 border rounded dark:border-gray-700">
                <div className="flex h-full">
                    {renderLineNumbers()}
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="flex-1 pt-2 pr-2 font-mono text-sm resize-none focus:outline-none dark:bg-gray-800 dark:text-gray-200 leading-6"
                        placeholder="Paste or type your text here..."
                    />
                </div>
            </div>
        </div>
    );
};
