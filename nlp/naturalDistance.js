const Max = require("max-api");
const fs = require("fs");
const natural = require("natural");

let filenames = [];

Max.addHandler("readFileNames", (path) => {
  filenames = fs.readdirSync(path).filter((name) => !name.startsWith("."));
});

Max.addHandler("compare", (prompt) => {
  const splitPrompt = prompt.split(" ");

  let similarities = {};
  filenames.forEach((filename) => {
    const splitFilename = filename.split("-");

    const distances = splitFilename.map((word) => {
      return Math.max(
        ...splitPrompt.map((refWord) =>
          natural.JaroWinklerDistance(word, refWord, { ignoreCase: true })
        )
      );
    });

    similarities[filename] =
      distances.reduce((sum, distance) => sum + distance, 0) / distances.length;
  });

  const sorted = Object.entries(similarities).sort((a, b) => b[1] - a[1]);
  Max.outlet(sorted[0][0]); // output filename
});
