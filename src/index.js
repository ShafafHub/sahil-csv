const fs = require("node:fs");
const { parseCsv, toCsv } = require("./lib/csv");
const { parseOptions, printHelp, errorExit } = require("./lib/cli");
const ops = require("./lib/ops");

const input = process.argv.slice(2);

if (!input.length || input.includes("-h") || input.includes("--help")) {
  printHelp();
  process.exit(0);
}

const command = input[0];
const options = parseOptions(input.slice(1));

const file = options.file || options.f;
if (!file) errorExit("File path is required!");

const content = fs.readFileSync(file, "utf8");
const rows = parseCsv(content);

switch (command) {
  case "stats": {
    if (!options.column) errorExit("Column is missing");
    const res = ops.stats(rows, options.column);
    console.log(`stats(${options.column})`);
    Object.entries(res).forEach(
      ([k, v]) => v !== undefined && console.log(`${k}: ${v}`),
    );
    break;
  }

  case "filter": {
    if (!options.column || !options.value) errorExit("Column or value missing");
    console.table(ops.filterRows(rows, options.column, options.value));
    break;
  }

  case "sort": {
    if (!options.column) errorExit("Column missing");
    console.table(ops.sortRows(rows, options.column, options.order || "asc"));
    break;
  }

  case "export": {
    if (!options.out) errorExit("Output path missing");
    fs.writeFileSync(options.out, toCsv(rows));
    console.log("Export done ✔");
    break;
  }

  default:
    errorExit(`Unknown command: ${command}`);
}
