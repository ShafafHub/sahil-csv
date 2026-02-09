function stats(rows, column) {
  // TODO: implement count, min, max, avg for numeric column
  const isNum = !isNaN(Number(rows[0][column]));
  if (isNum) {
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (const row of rows) {
      if (min > row[column]) {
        min = row[column];
      }
      if (max < row[column]) {
        max = row[column];
      }
      sum += +row[column];
    }
    return {
      count: rows.length,
      min: min,
      max: max,
      avg: sum / rows.length,
    };
  }

  return {
    count: rows.length,
  };
}

function filterRows(rows, column, value) {
  // TODO: implement equals match
  return rows.filter(
    (row) => row[column] === value || row[column]?.includes(value),
  );
}

function sortRows(rows, column, order) {
  // TODO: implement numeric + string sort
  const copy = [...rows];

  copy.sort((a, b) => {
    let valA = a[column];
    let valB = b[column];

    const numA = parseFloat(valA);
    const numB = parseFloat(valB);

    if (!isNaN(numA) && !isNaN(numB)) {
      return order === "desc" ? numB - numA : numA - numB;
    }

    if (order === "desc") {
      return String(valB).localeCompare(String(valA));
    } else {
      return String(valA).localeCompare(String(valB));
    }
  });

  return copy;
}
module.exports = { stats, filterRows, sortRows };
