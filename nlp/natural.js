const Max = require("max-api");
const natural = require("natural");

const tokenizer = new natural.WordTokenizer();

Max.addHandler("text", (text) => {
  const tokens = tokenizer.tokenize(text);
  const tagger = new natural.BrillPOSTagger(
    natural.BrillPOSTagger.defaultRuleset(),
    natural.BrillPOSTagger.NOUN_VERB
  );

  console.log(tokens);

  Max.outlet(tokens);
});
