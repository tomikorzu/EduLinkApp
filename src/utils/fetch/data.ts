export async function fetchData(
  url: string,
  method: string,
  props?: object | null,
  header?: object | null
) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(header ? header : null),
    },
  };

  if (props) {
    options.body = JSON.stringify(props);
  }

  const res = await fetch(`/api/${url}`, options);

  const data = await res.json();
  return { data, status: res.status };
}
