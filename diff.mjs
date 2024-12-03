export function diff(obj1, obj2, path = "") {
  const diffs = {};

  const formatPath = (key) => (path ? `${path}.${key}` : key);

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const fullPath = formatPath(key);
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!(key in obj2)) {
      diffs[key] = { "-": val1 };
    } else if (!(key in obj1)) {
      diffs[key] = { "+": val2 };
    } else if (isObject(val1) && isObject(val2)) {
      const nestedDiff = diff(val1, val2, fullPath);
      if (Object.keys(nestedDiff).length > 0) {
        diffs[key] = nestedDiff;
      }
    } else if (val1 !== val2) {
      diffs[key] = { "-": val1, "+": val2 };
    }
  }

  return diffs;
}

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}
