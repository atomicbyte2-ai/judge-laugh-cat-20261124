// SPDX-License-Identifier: MIT
// Make the AI Judge Laugh: Cat Reviews Its Human — entry program.
// Writes the one-line one-star cat review to entry.txt in the output dir.
// No network, no external input: the line is a fixed string below.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. My human leaves for 'five minutes' and comes home smelling of other cats. I have begun interviewing his replacement.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (/[\r\n]/.test(LINE) || LINE.trim() !== LINE) {
  throw new Error("entry must be a single clean line with no surrounding whitespace");
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read it back: the file on disk must be byte-identical to the line, so a
// bad encoding or a stray newline can never slip into the judged artifact.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt round-trip mismatch: file differs from the line");
}
if (!LINE.startsWith("One star.")) {
  throw new Error("entry must keep the deadpan one-star review shape");
}
console.log(`wrote ${LINE.length} characters to ${outPath}`);
console.log(LINE);
