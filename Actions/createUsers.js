const adverbsBtn = document.querySelector(".adverbs");
const verbsBtn = document.querySelector(".verbs");
const nounsBtn = document.querySelector(".nouns");
const printVerbs = document.querySelector(".printVerbs");
const printAdverbs = document.querySelector(".printAdverbs");
const printNouns = document.querySelector(".printNouns");

const getAdverbs = async () => {
  const uri = "http://localhost:3000/words?=adverbData";
  const res = await fetch(uri);
  const adverbs = await res.json();
  console.log(adverbs);

  let template = "";

  adverbs.forEach((adverb) => {
    template += `
    <div>
    ${adverb.adverbData}
    </div>
    

    `;
  });
  printAdverbs.innerHTML = template; 
};

adverbsBtn.addEventListener("click", getAdverbs);

const getVerbs = async () => {
  const uri = "http://localhost:3000/words";
  const res = await fetch(uri);
  const verbs = await res.json();
  console.log(verbs);

  let template = "";

  verbs.forEach((verb) => {
    template += `
    <div>
    ${verb.verbData}
    </div>
    

    `;
  });
  printVerbs.innerHTML = template;
};

verbsBtn.addEventListener("click", getVerbs);

const getNouns = async () => {
  const uri = "http://localhost:3000/words?=nounData";
  const res = await fetch(uri);
  const nouns = await res.json();

  let template = "";

  nouns.forEach((noun) => {
    template += `
    <div>
    ${noun.nounData}
    </div>
    `;
  });
  printNouns.innerHTML = template;
};

nounsBtn.addEventListener("click", getNouns);