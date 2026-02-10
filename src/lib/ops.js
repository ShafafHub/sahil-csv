function stats(rows, column) {
  const values = rows.map((r) => r[column]);
  const numeric = values.every((v) => !isNaN(v));

  if (!numeric) return { count: rows.length };

  const numbers = values.map(Number);

  return {
    count: numbers.length,
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    avg: numbers.reduce((a, b) => a + b, 0) / numbers.length,
  };
}

function filterRows(rows, column, value) {
  return rows.filter((r) =>
    String(r[column]).toLowerCase().includes(value.toLowerCase()),
  );
}

function sortRows(rows, column, order = "asc") {
  return [...rows].sort((a, b) => {
    const A = a[column];
    const B = b[column];

    if (!isNaN(A) && !isNaN(B)) {
      return order === "desc" ? B - A : A - B;
    }

    return order === "desc" ? B.localeCompare(A) : A.localeCompare(B);
  });
}

module.exports = { stats, filterRows, sortRows };
