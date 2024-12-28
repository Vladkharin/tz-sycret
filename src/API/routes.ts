const URLAPI = "https://sycret.ru/service/api/api";

async function f(method: string, data, url: string) {
  const response = await fetch(url, {
    method: method,
    // body: JSON.stringify(data),
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

export async function getCertificates(dataObj) {
  return await f("GET", dataObj, URLAPI + "?MethodName=OSGetGoodList&ismob=0&ApiKey=011ba11bdcad4fa396660c2ec447ef14");
}
