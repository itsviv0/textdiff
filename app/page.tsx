"use client";

import { Controls } from "@/components/Controls";
import { DiffViewer } from "@/components/DiffViewer";
import { FileUpload } from "@/components/FileUpload";
import Footer from "@/components/Footer";
import { TextInput } from "@/components/TextInput";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [viewMode, setViewMode] = useState<"split" | "unified">("split");
  const [realTime, setRealTime] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [diffContent, setDiffContent] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  useEffect(() => {
    if (realTime) {
      updateDiff();
    }
  }, [leftText, rightText, realTime]);

  useEffect(() => {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(userPrefersDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleFileSelect = (content: string, side: "left" | "right") => {
    if (side === "left") {
      setLeftText(content);
    } else {
      setRightText(content);
    }
    if (realTime) {
      updateDiff();
    }
  };

  const updateDiff = () => {
    setDiffContent(
      `=== Original Text ===\n${leftText}\n\n=== Modified Text ===\n${rightText}`
    );
    setShowDiff(true);
  };

  const handleDownload = () => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 transition-colors text-black md:py-8">
      <div className="max-w-6xl mx-auto px-2 md:px-4 flex-grow">
        <h1 className="text-2xl md:text-3xl mb-4 md:mb-8">
          <Image
            src="/textdiff-logo.svg"
            alt="TextDiff Logo"
            width={160}
            height={160}
            className="w-40 mx-auto mb-4"
            style={{ filter: darkMode ? "invert(1)" : "none" }}
          />
        </h1>

        <Controls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          realTime={realTime}
          onRealTimeChange={setRealTime}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
          <div>
            <FileUpload onFileSelect={handleFileSelect} side="left" />
            <div className="mt-4">
              <TextInput
                value={leftText}
                onChange={(value) => {
                  setLeftText(value);
                  if (!realTime) {
                    setShowDiff(false);
                  }
                }}
                label="Original Text"
                onClear={() => {
                  setLeftText("");
                  if (!realTime) {
                    setShowDiff(false);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <FileUpload onFileSelect={handleFileSelect} side="right" />
            <div className="mt-4">
              <TextInput
                value={rightText}
                onChange={(value) => {
                  setRightText(value);
                  if (!realTime) {
                    setShowDiff(false);
                  }
                }}
                label="Modified Text"
                onClear={() => {
                  setRightText("");
                  if (!realTime) {
                    setShowDiff(false);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {(leftText || rightText) && (
          <div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={updateDiff}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Eye className="w-4 h-4 inline-block mr-2" />
                See Diff
              </button>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              >
                <Download className="w-4 h-4 inline-block mr-2" />
                Download Diff
              </button>
            </div>
            {showDiff && (
              <DiffViewer
                leftText={leftText}
                rightText={rightText}
                viewMode={viewMode}
                darkMode={darkMode}
              />
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
