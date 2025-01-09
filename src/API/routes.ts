const URLAPI = "https://sycret.ru/service/api/api";

async function f(method: string, url: string) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Accept-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      "Access-Control-Allow-Headers": "*",
    },
  });

  try {
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getCertificates() {
  return await f("GET", URLAPI + "?MethodName=OSGetGoodList&ismob=0&ApiKey=011ba11bdcad4fa396660c2ec447ef14");
}

export async function OSSale(url) {
  return await f("GET", URLAPI + "?" + url);
}
