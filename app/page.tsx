"use client";

import { DiffViewer } from "@/components/DiffViewer";
import { FileUpload } from "@/components/FileUpload";
import React, { useState } from "react";

export default function Home() {
    const [leftText, setLeftText] = useState("");
    const [rightText, setRightText] = useState("");
    const [viewMode, setViewMode] = useState<"split" | "unified">("split");

    const handleFileSelect = (content: string, side: "left" | "right") => {
        if (side === "left") {
            setLeftText(content);
        } else {
            setRightText(content);
        }
    };
    const handleDownload = () => {
        const diffContent = `=== Original Text ===\n${leftText}\n\n=== Modified Text ===\n${rightText}`;
        const blob = new Blob([diffContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "diff-result.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Text Diff Checker
                </h1>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Original Text
                        </h2>
                        <FileUpload
                            onFileSelect={handleFileSelect}
                            side="left"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Modified Text
                        </h2>
                        <FileUpload
                            onFileSelect={handleFileSelect}
                            side="right"
                        />
                    </div>
                </div>

                {(leftText || rightText) && (
                    <DiffViewer
                        leftText={leftText}
                        rightText={rightText}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        onDownload={handleDownload}
                    />
                )}
            </div>
        </div>
    );
}
