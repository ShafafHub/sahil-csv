# sahil-csv

This is a small Node.js project for working with CSV files.  
It includes scripts for parsing, filtering, sorting, and exporting CSV data.

## Features

- Implemented empty file handling in `src/lib/csv.js`
- Implemented count, min, max, avg for numeric column in `src/lib/ops.js`
- Implemented numeric + string sort in `src/lib/ops.js`

## Installation

pnpm start stats --file data/people.csv --column age
pnpm start filter --file data/people.csv --column Name --value "zia"
pnpm start sort --file data/people.csv --column age --order asc
pnpm start export --file data/people.csv --out data/people-export.csv
