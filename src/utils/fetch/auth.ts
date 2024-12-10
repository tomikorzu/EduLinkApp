export async function fetchAuth(props: object, url: string) {
  const res = await fetch(`/api/auth/${url}`, {
    method: "POST",
    body: JSON.stringify(props),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
