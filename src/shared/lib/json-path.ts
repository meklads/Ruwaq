/** Tokenize paths like `.paymentSchedule[0].label` or `[0].name`. */
export function tokenizePath(path: string): (string | number)[] {
  const tokens: (string | number)[] = [];
  let i = 0;
  const s = path.startsWith(".") ? path.slice(1) : path;

  while (i < s.length) {
    if (s[i] === "[") {
      const end = s.indexOf("]", i);
      tokens.push(parseInt(s.slice(i + 1, end), 10));
      i = end + 1;
      if (s[i] === ".") i++;
      continue;
    }

    const dot = s.indexOf(".", i);
    const bracket = s.indexOf("[", i);
    let end = s.length;
    if (dot !== -1 && (bracket === -1 || dot < bracket)) end = dot;
    else if (bracket !== -1) end = bracket;

    tokens.push(s.slice(i, end));
    i = end;
    if (s[i] === ".") i++;
  }

  return tokens;
}

function setByTokens(
  data: unknown,
  tokens: (string | number)[],
  value: unknown
): unknown {
  const [head, ...rest] = tokens;
  if (head === undefined) return value;

  if (rest.length === 0) {
    if (typeof head === "number") {
      const arr = Array.isArray(data) ? [...data] : [];
      arr[head] = value;
      return arr;
    }
    return { ...(data as Record<string, unknown>), [head]: value };
  }

  if (typeof head === "number") {
    const arr = Array.isArray(data) ? [...data] : [];
    arr[head] = setByTokens(arr[head], rest, value);
    return arr;
  }

  const obj =
    data && typeof data === "object" && !Array.isArray(data)
      ? { ...(data as Record<string, unknown>) }
      : {};
  obj[head] = setByTokens(obj[head], rest, value);
  return obj;
}

export function setByPath(data: unknown, path: string, value: unknown): unknown {
  const tokens = tokenizePath(path);
  if (tokens.length === 0) return value;
  return setByTokens(data, tokens, value);
}

/** Apply a proposal field path (e.g. scopeItems[0].title) to a proposal object. */
export function applyProposalFieldUpdate(
  proposal: Record<string, unknown>,
  field: string,
  value: unknown
): Record<string, unknown> {
  const scalarFields = new Set([
    "projectName",
    "clientName",
    "description",
    "budget",
    "introduction",
    "projectLocation",
    "propertyType",
    "areaSqm",
    "durationHint",
    "specifications",
    "paymentType",
    "commercialMode",
    "status",
  ]);

  if (scalarFields.has(field)) {
    return { ...proposal, [field]: value };
  }

  const rootMatch = field.match(/^(\w+)/);
  if (!rootMatch) return proposal;

  const rootKey = rootMatch[1]!;
  const subPath = field.slice(rootKey.length);
  const currentRoot = proposal[rootKey];
  const nextRoot = subPath ? setByPath(currentRoot, subPath, value) : value;

  return { ...proposal, [rootKey]: nextRoot };
}
