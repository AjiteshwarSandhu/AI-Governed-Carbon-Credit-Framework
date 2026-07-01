const API = "http://127.0.0.1:8000";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_API_KEY,
};

export async function mintCredits(submissionId: number) {

  const response = await fetch(
    `${API}/mint-credit/${submissionId}`,
    {
      method: "POST",
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Mint Failed");
  }

  return data;
}

export async function retireCredits(submissionId: number) {

  const response = await fetch(
    `${API}/retire-credit/${submissionId}`,
    {
      method: "POST",
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Retire Failed");
  }

  return data;
}

export async function getCredits() {

  const response = await fetch(
    `${API}/carbon-credits`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load credits");
  }

  return response.json();
}