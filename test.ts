const url = 'http://localhost:3100/users';

async function sendRequest(i: number) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Request ${i + 1} failed:`, res.status, res.statusText);
      return;
    }

    const data = await res.json();
    console.log(`Request ${i + 1} success:`, data);
  } catch (error) {
    console.error(`Request ${i + 1} error:`, error);
  }
}

for (let i = 0; i < 18; i++) {
  sendRequest(i);
}
