import fs from "fs";
import path from "path";
import { parse } from "node-html-parser";

const svgPath = path.resolve("public", "icons.svg");
const outputPath = path.resolve("src/types", "icons.d.ts");

const svgContent = fs.readFileSync(svgPath, "utf-8");
const root = parse(svgContent);

// Extract all <symbol id="...">
const symbols = root.querySelectorAll("symbol");
const ids = symbols.map((symbol) => symbol.getAttribute("id")).filter((id): id is string => !!id);

// Create type definition string
const typeDef = `export type IconId =
${ids.map((id) => `  | "${id}"`).join("\n")};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, typeDef, "utf-8");

console.log(`✅ icons.d.ts generated with ${ids.length} icons.`);
