const { faker } = require("@faker-js/faker");


function generateWords() {
  var words = [];

  for (var id = 0; id < 5; id++) {
    var verbData = faker.word.verb();
    var adverbData = faker.word.adverb();
    var nounData = faker.word.noun();
    words.push({
      id: id,
      verbData: verbData,
      adverbData: adverbData,
      nounData: nounData

    });
  }

  return { words };
}

module.exports = generateWords;


// function generateAdverbs() {
//   var adverbs = [];

//   for (var id = 0; id < 5; id++) {
//     var adverbData = faker.word.adverb();
//     adverbs.push({
//       id: id,
//       adverbData: adverbData
//     });
//   }

//   return { adverbs };
// }

// module.exports = generateAdverbs;


