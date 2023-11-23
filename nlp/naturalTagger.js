const Max = require("max-api");
const natural = require("natural");

const tokenizer = new natural.WordTokenizer();
const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";

const tags = {
  noun: "NN",
  nouns: "NNS",
  verb: "VB",
  gerund: "VBG",
  adjective: "JJ",
};

const lexicon = new natural.Lexicon(
  language,
  defaultCategory,
  defaultCategoryCapitalized
);
const ruleSet = new natural.RuleSet("EN");
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

Max.addHandler(Max.MESSAGE_TYPES.DICT, (dict) => {
  const { text, filter_tags: filterTags } = dict;

  const tokens = tokenizer.tokenize(text);

  const taggedWords = tagger.tag(tokens).taggedWords;

  const filteredTokens = taggedWords
    .filter((taggedWord) =>
      (Array.isArray(filterTags) ? filterTags : new Array(filterTags))
        .map((tag) => tags[tag])
        .includes(taggedWord.tag)
    )
    .map((taggedWord) => taggedWord.token);

  console.log(filteredTokens);

  Max.outlet(filteredTokens);
});
