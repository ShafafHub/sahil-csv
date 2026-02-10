function printHelp() {
  console.log(`
Simple CSV Toolkit

node src/index.js <command> [options]

Commands:
  stats
  filter
  sort
  export
`);
}

function parseOptions(list) {
  return list.reduce((acc, cur, i) => {
    if (cur.startsWith("-")) {
      acc[cur.replace(/^-+/, "")] = list[i + 1];
    }
    return acc;
  }, {});
}

function errorExit(msg) {
  console.error("❌ " + msg);
  process.exit(1);
}

module.exports = { printHelp, parseOptions, errorExit };
