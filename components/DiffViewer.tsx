"use client";

import React from "react";
import {
    ChevronDown,
    ChevronUp,
    Download,
    SplitSquareVertical,
    AlignJustify,
} from "lucide-react";
import { DiffLine, DiffResult } from "../types/diff";
import { computeDiff } from "../utils/diffUtils";

interface DiffViewerProps {
    leftText: string;
    rightText: string;
    viewMode: "split" | "unified";
    onViewModeChange: (mode: "split" | "unified") => void;
    onDownload: () => void;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
    leftText,
    rightText,
    viewMode,
    onViewModeChange,
    onDownload,
}) => {
    const diffResult = React.useMemo(
        () => computeDiff(leftText, rightText),
        [leftText, rightText]
    );

    const renderDiffLine = (line: DiffLine, index: number) => {
        const baseClasses = "px-4 py-1 font-mono text-sm whitespace-pre";
        const lineNumberClasses =
            "select-none text-gray-500 pr-4 border-r border-gray-300 w-12 inline-block text-right";

        let lineClasses = baseClasses;
        if (line.type === "added") {
            lineClasses += " bg-green-100 text-green-800";
        } else if (line.type === "removed") {
            lineClasses += " bg-red-100 text-red-800";
        }

        return (
            <div key={index} className={lineClasses}>
                <span className={lineNumberClasses}>{line.lineNumber}</span>
                <span className="pl-4">{line.content}</span>
            </div>
        );
    };

    const renderSplitView = () => (
        <div className="grid grid-cols-2 gap-4">
            <div className="border rounded">
                <div className="bg-gray-100 p-2 font-semibold border-b">
                    Original Text
                </div>
                <div>
                    {diffResult.leftLines.map((line, index) =>
                        renderDiffLine(line, index)
                    )}
                </div>
            </div>
            <div className="border rounded">
                <div className="bg-gray-100 p-2 font-semibold border-b">
                    Modified Text
                </div>
                <div>
                    {diffResult.rightLines.map((line, index) =>
                        renderDiffLine(line, index)
                    )}
                </div>
            </div>
        </div>
    );

    const renderUnifiedView = () => (
        <div className="border rounded">
            <div className="bg-gray-100 p-2 font-semibold border-b">
                Unified View
            </div>
            <div>
                {diffResult.unifiedLines.map((line, index) =>
                    renderDiffLine(line, index)
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="space-x-2">
                    <button
                        onClick={() => onViewModeChange("split")}
                        className={`px-3 py-2 rounded ${
                            viewMode === "split"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
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
                                : "bg-gray-200"
                        }`}
                    >
                        <AlignJustify className="w-4 h-4 inline-block mr-2" />
                        Unified View
                    </button>
                </div>
                <button
                    onClick={onDownload}
                    className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    <Download className="w-4 h-4 inline-block mr-2" />
                    Download Diff
                </button>
            </div>
            {viewMode === "split" ? renderSplitView() : renderUnifiedView()}
        </div>
    );
};
