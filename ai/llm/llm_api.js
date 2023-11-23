const Max = require("max-api");
const fs = require("fs");
globalThis.fetch = require("node-fetch");

Max.addHandler(Max.MESSAGE_TYPES.DICT, async (predict) => {
  const { api_base_url: apiBaseUrl, endpoint } = predict;

  const response = await fetch(`${apiBaseUrl}/v1/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...predict,
    }),
  });

  const json = await response.json();

  Max.outlet(json.choices[0].text);
});
