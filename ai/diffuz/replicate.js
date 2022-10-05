const Max = require("max-api");
globalThis.fetch = require("node-fetch");

(async () => {
  const Replicate = (await import("replicate-js")).default;

  Max.addHandler(Max.MESSAGE_TYPES.DICT, async (predict) => {
    const { token, model } = predict;

    const replicate = new Replicate({
      token,
    });

    const replicateModel = await replicate.models.get(model);

    const prediction = await replicateModel.predict({
      ...predict,
    });

    Max.outlet(prediction);
  });
})();
