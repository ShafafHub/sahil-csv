# Data Toolkit CLI

A Simple Node.js CSV File Analyzer.

## Key Features

- Read CSV files
- Export results to CSV

## Quickstart

```bash
pnpm i
pnpm start -- --help
```

## Sample commands

```bash
pnpm start  stats --file data/people.csv --column age
pnpm start  filter --file data/people.csv --column Name --value "zia"
pnpm start  sort --file data/people.csv --column age --order asc
pnpm start  export --file data/people.csv --out data/people-export.csv
```

## Implemented tasks

- implemented Empty file handaling in `src/lib/csv.js`
- implemented count, min, max, avg for numeric column in `src/lib/ops.js`
- implemented numeric + string sort `src/lib/ops.js`
