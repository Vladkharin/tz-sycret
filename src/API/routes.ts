const URLAPI = "https://sycret.ru/service/api/api";

async function f(method, data, url) {
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  try {
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getCertificates(dataObj) {
  return await f("POST", dataObj, URLAPI);
}
