export function computeDiff(leftText: string, rightText: string) {
  const leftLines = leftText.split("\n");
  const rightLines = rightText.split("\n");

  const result = {
    leftLines: [] as any[],
    rightLines: [] as any[],
    unifiedLines: [] as any[],
  };

  let leftLineNumber = 1;
  let rightLineNumber = 1;

  // Simple diff algorithm (can be enhanced with more sophisticated algorithms like Myers diff)
  const maxLines = Math.max(leftLines.length, rightLines.length);

  for (let i = 0; i < maxLines; i++) {
    const leftLine = leftLines[i];
    const rightLine = rightLines[i];

    if (leftLine === rightLine) {
      // Line is unchanged
      if (leftLine !== undefined) {
        result.leftLines.push({
          content: leftLine,
          type: "normal",
          lineNumber: leftLineNumber++,
        });
        result.rightLines.push({
          content: rightLine,
          type: "normal",
          lineNumber: rightLineNumber++,
        });
        result.unifiedLines.push({
          content: leftLine,
          type: "normal",
          lineNumber: leftLineNumber - 1,
        });
      }
    } else {
      // Line is different
      if (leftLine !== undefined) {
        result.leftLines.push({
          content: leftLine,
          type: "removed",
          lineNumber: leftLineNumber++,
        });
        result.unifiedLines.push({
          content: leftLine,
          type: "removed",
          lineNumber: leftLineNumber - 1,
        });
      }
      if (rightLine !== undefined) {
        result.rightLines.push({
          content: rightLine,
          type: "added",
          lineNumber: rightLineNumber++,
        });
        result.unifiedLines.push({
          content: rightLine,
          type: "added",
          lineNumber: rightLineNumber - 1,
        });
      }
    }
  }

  return result;
}
