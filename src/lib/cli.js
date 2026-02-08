function printHelp() {
  console.log(`
data-toolkit (starter)

Usage:
  node src/index.js <command> [options]

Commands:
  help
  stats  --file <path> --column <name>
  filter --file <path> --column <name> --value <value>
  sort   --file <path> --column <name> --order asc|desc
  export --file <path> --out <path>

Examples:
  node src/index.js stats --file data/people.csv --column age
  node src/index.js filter --file data/people.csv --column city --value "Austin"
  node src/index.js sort --file data/people.csv --column age --order desc
  node src/index.js export --file data/people.csv --out data/people-export.csv
`);
}

function parseOptions(args) {
  const options = {};
  for (let i = 0; i < args.length; i += 1) {
    const current = args[i];
    if (current.startsWith("--")) {
      const key = current.slice(2);
      const value = args[i + 1];
      options[key] = value;
      i += 1;
    } else if (current.startsWith("-")) {
      const key = current.slice(1);
      const value = args[i + 1];
      options[key] = value;
      i += 1;
    }
  }
  return options;
}

function errorExit(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

module.exports = { printHelp, parseOptions, errorExit };
