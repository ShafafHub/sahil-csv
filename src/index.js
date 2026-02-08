const { readFileSync, writeFileSync } = require("node:fs");
const { parseCsv, toCsv } = require("./lib/csv");
const { parseOptions, printHelp, errorExit } = require("./lib/cli");
const { stats, filterRows, sortRows } = require("./lib/ops");

const args = process.argv.slice(2);
if (
  args.length === 0 ||
  args.includes("--help") ||
  args.includes("-h") ||
  args[0] === "help"
) {
  printHelp();
  process.exit(0);
}

const [command, ...rest] = args;
const options = parseOptions(rest);
const filePath = options.file || options.f;

if (!filePath) {
  errorExit("Missing --file <path>.");
}

const csvText = readFileSync(filePath, "utf8");
const rows = parseCsv(csvText);

if (command === "stats") {
  const column = options.column;
  if (!column) errorExit("Missing --column <name>.");
  const result = stats(rows, column);
  console.log(`stats(${column})`);
  console.log(`count: ${result.count}`);
  if (typeof result.min !== "undefined") console.log(`min: ${result.min}`);
  if (typeof result.max !== "undefined") console.log(`max: ${result.max}`);
  if (typeof result.avg !== "undefined") console.log(`avg: ${result.avg}`);
} else if (command === "filter") {
  const column = options.column;
  const value = options.value;
  if (!column || !value) errorExit("Missing --column or --value.");
  const result = filterRows(rows, column, value);
  console.table(result);
} else if (command === "sort") {
  const column = options.column;
  const order = options.order || "asc";
  if (!column) errorExit("Missing --column <name>.");
  const result = sortRows(rows, column, order);
  console.table(result);
} else if (command === "export") {
  const outPath = options.out;
  if (!outPath) errorExit("Missing --out <path>.");
  const csvOut = toCsv(rows);
  writeFileSync(outPath, csvOut, "utf8");
  console.log(`Exported ${rows.length} rows to ${outPath}`);
} else {
  errorExit(`Unknown command: ${command}`);
}
