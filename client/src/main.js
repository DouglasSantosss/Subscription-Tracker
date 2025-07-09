// src/main.js
export async function fetchData(
  route,
  data = {},
  method = 'GET',
  headers = { 'Content-Type': 'application/json' }
) {
  const opts = { method, headers };

  // GET/HEAD must not have a body
  if (method !== 'GET' && method !== 'HEAD') {
    opts.body = JSON.stringify(data);
  }

  const res = await fetch(route, opts);

  // parse JSON (if any)
  let payload;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  // if HTTP status is not 2xx, throw an Error with a useful message
  if (!res.ok) {
    // payload might be { error: "Some message" }
    const msg =
      payload && (payload.error || payload.message)
        ? (payload.error || payload.message)
        : `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return payload;
}
