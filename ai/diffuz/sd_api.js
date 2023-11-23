const Max = require("max-api");
const fs = require("fs");
globalThis.fetch = require("node-fetch");

Max.addHandler(Max.MESSAGE_TYPES.DICT, async (predict) => {
  const {
    api_base_url: apiBaseUrl,
    output_path: outputPath,
    endpoint,
  } = predict;

  if (endpoint === "txt2img") {
    const response = await fetch(`${apiBaseUrl}/sdapi/v1/${endpoint}`, {
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

    const image = Buffer.from(json.images[0], "base64");

    const timeStamp = Date.now();
    const tmpFile = `${outputPath}/${timeStamp}.png`;

    fs.writeFile(tmpFile, image, (err) => {
      if (err) Max.post(err);
      Max.outlet(tmpFile);
    });
  }

  if (endpoint === "interrogate") {
    fs.readFile(predict.image, async (err, data) => {
      const image = Buffer.from(data).toString("base64");

      const response = await fetch(`${apiBaseUrl}/sdapi/v1/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          image,
        }),
      });

      const json = await response.json();

      Max.outlet(json.caption);
    });
  }

  if (endpoint === "interrupt") {
	const response = await fetch(`${apiBaseUrl}/sdapi/v1/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const json = await response.json();

    Max.outlet(json);
  }
});

function predict() {}
