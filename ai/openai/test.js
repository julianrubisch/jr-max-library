const { Configuration, OpenAIApi } = require("openai");

(async () => {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt:
      "Modify the following StableDiffusion prompt by changing the artist:\n\na painting of three trees in a grassy field, an ultrafine detailed painting by Nassos Daphnis, shutterstock contest winner, cloisonnism, photo taken with provia, impressionism, creative commons attribution",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response.data);
})();
