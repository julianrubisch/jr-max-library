const Max = require("max-api");
const { Configuration, OpenAIApi } = require("openai");

Max.addHandler(Max.MESSAGE_TYPES.DICT, async (predict) => {
  const { apiKey, ...query } = predict;

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    ...query,
  });

  Max.outlet(response.data);
});
