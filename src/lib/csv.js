const { errorExit } = require("./cli");

function parseCsv(text) {
  if (!text?.trim()) errorExit("CSV file is empty");

  const [header, ...body] = text.trim().split(/\r?\n/);
  const keys = header.split(",").map((k) => k.trim());

  return body.map((line) =>
    line.split(",").reduce((obj, val, i) => {
      obj[keys[i]] = val.trim();
      return obj;
    }, {}),
  );
}

function toCsv(rows) {
  if (!rows.length) return "";

  const headers = Object.keys(rows[0]);
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => r[h]).join(",")),
  ].join("\n");
}

module.exports = { parseCsv, toCsv };
