import React, { useMemo } from "react";
import { computeDiff } from "../utils/diffUtils";

interface DiffViewerProps {
    leftText: string;
    rightText: string;
    viewMode: "split" | "unified";
    darkMode: boolean;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
    leftText,
    rightText,
    viewMode,
    darkMode,
}) => {
    const diffResult = useMemo(
        () => computeDiff(leftText, rightText),
        [leftText, rightText]
    );

    const getDiffCount = () => {
        const removedCount = diffResult.leftLines.filter(
            (line) => line.type === "removed"
        ).length;
        const addedCount = diffResult.rightLines.filter(
            (line) => line.type === "added"
        ).length;
        return { removedCount, addedCount };
    };

    const { removedCount, addedCount } = getDiffCount();

    const renderDiffLine = (line: any, index: number) => {
        const baseClasses =
            "px-2 sm:px-4 py-1 font-mono text-xs sm:text-sm whitespace-nowrap overflow-x-auto";
        const lineNumberClasses =
            "select-none text-gray-500 pr-2 sm:pr-4 border-r border-gray-300 w-8 sm:w-12 inline-block text-right dark:text-gray-400";

        let lineClasses = `${baseClasses} ${darkMode ? "dark:text-gray-200" : ""}`;
        if (line.type === "added") {
            lineClasses +=
                " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        } else if (line.type === "removed") {
            lineClasses +=
                " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        }

        return (
            <div key={index} className={lineClasses}>
                <span className={lineNumberClasses}>{line.lineNumber}</span>
                <span className="pl-2 sm:pl-4">{line.content}</span>
            </div>
        );
    };

    const renderDiffStats = (count: number, type: "removed" | "added") => {
        const color = type === "removed" ? "text-red-600" : "text-green-600";
        const sign = type === "removed" ? "-" : "+";
        return count > 0 ? (
            <span className={`${color} ml-2 text-xs sm:text-sm`}>
                {sign}
                {count} {count === 1 ? "line" : "lines"}
            </span>
        ) : null;
    };

    const renderSplitView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="border rounded dark:border-gray-700">
                <div className="bg-gray-100 p-2 font-semibold border-b text-sm sm:text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                    Original Text
                    {renderDiffStats(removedCount, "removed")}
                </div>
                <div className="overflow-x-auto max-h-[300px] md:max-h-[600px]">
                    {diffResult.leftLines.map((line, index) =>
                        renderDiffLine(line, index)
                    )}
                </div>
            </div>
            <div className="border rounded dark:border-gray-700">
                <div className="bg-gray-100 p-2 font-semibold border-b text-sm sm:text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                    Modified Text
                    {renderDiffStats(addedCount, "added")}
                </div>
                <div className="overflow-x-auto max-h-[300px] md:max-h-[600px]">
                    {diffResult.rightLines.map((line, index) =>
                        renderDiffLine(line, index)
                    )}
                </div>
            </div>
        </div>
    );

    const renderUnifiedView = () => (
        <div className="border rounded dark:border-gray-700">
            <div className="bg-gray-100 p-2 font-semibold border-b text-sm sm:text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                Unified View
                {renderDiffStats(removedCount, "removed")}
                {renderDiffStats(addedCount, "added")}
            </div>
            <div className="overflow-x-auto max-h-[300px] md:max-h-[600px]">
                {diffResult.unifiedLines.map((line, index) =>
                    renderDiffLine(line, index)
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full">
            {viewMode === "split" ? renderSplitView() : renderUnifiedView()}
        </div>
    );
};
