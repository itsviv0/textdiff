export interface DiffLine {
  content: string;
  type: "normal" | "added" | "removed";
  lineNumber: number;
}

export interface DiffResult {
  leftLines: DiffLine[];
  rightLines: DiffLine[];
  unifiedLines: DiffLine[];
}
