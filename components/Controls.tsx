import React from "react";
import {
    Moon,
    Sun,
    SplitSquareVertical,
    AlignJustify,
    RefreshCw,
} from "lucide-react";

interface ControlsProps {
    viewMode: "split" | "unified";
    onViewModeChange: (mode: "split" | "unified") => void;
    realTime: boolean;
    onRealTimeChange: (enabled: boolean) => void;
    darkMode: boolean;
    onDarkModeChange: (enabled: boolean) => void;
}

export const Controls: React.FC<ControlsProps> = ({
    viewMode,
    onViewModeChange,
    realTime,
    onRealTimeChange,
    darkMode,
    onDarkModeChange,
}) => {
    return (
        <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
            <div className="space-x-2">
                <button
                    onClick={() => onViewModeChange("split")}
                    className={`px-3 py-2 rounded ${
                        viewMode === "split"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                >
                    <SplitSquareVertical className="w-4 h-4 inline-block mr-2" />
                    Split View
                </button>
                <button
                    onClick={() => onViewModeChange("unified")}
                    className={`px-3 py-2 rounded ${
                        viewMode === "unified"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                >
                    <AlignJustify className="w-4 h-4 inline-block mr-2" />
                    Unified View
                </button>
            </div>
            <div className="space-x-2">
                <button
                    onClick={() => onRealTimeChange(!realTime)}
                    className={`px-3 py-2 rounded ${
                        realTime
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                >
                    <RefreshCw className="w-4 h-4 inline-block mr-2" />
                    Real-time Diff
                </button>
                <button
                    onClick={() => onDarkModeChange(!darkMode)}
                    className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                >
                    {darkMode ? (
                        <Sun className="w-4 h-4 inline-block" />
                    ) : (
                        <Moon className="w-4 h-4 inline-block" />
                    )}
                </button>
            </div>
        </div>
    );
};
