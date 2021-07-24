let targetComponent = null;
let outputComponent = null;

let wordsDictionary = [];

const AssertNull = (target) => {
  if (target === null) {
    console.log("is null");
    return;
  }
};

const ShowData = (data = []) => {
  console.clear();
  data.forEach((p) => console.log(p));
};

const GenerateTranslation = (target, output) => {
  AssertNull(target);
  let englishWord = target.children[0].textContent;
  let spanishWord = output.children[0].textContent.replace("das", "");

  let NewWord = {
    englishWord,
    spanishWord,
    completeTranslation: `${englishWord} => ${spanishWord}`,
  };
  return NewWord;
};

const ValidateNewWordInTheExistingDictionary = (newWord) => {
  const isWordInDictionary = wordsDictionary.some(
    (existingWord) => existingWord.englishWord === newWord.englishWord
  );
  return isWordInDictionary;
};

const GetComponents = () => {
  targetComponent = document.querySelector(".TnITTtw-original");
  outputComponent = document.querySelector(".TnITTtw-main-variant");

  let components = {
    targetComponent,
    outputComponent,
  };

  return components;
};

const AddNewWordToDictionary = (newWord) => wordsDictionary.push(newWord);

const hasNewWordSelected = targetComponent === null || outputComponent === null;

const GetDictionary = () => {
  const ExtractFromPlugin = () => {
    const { targetComponent, outputComponent } = GetComponents();

    const componentIsNull = targetComponent === null;

    if (componentIsNull) {
      ShowData(["no has seleccionado ninguna palabra nueva"]);
      return;
    }

    let NewWord = GenerateTranslation(targetComponent, outputComponent);

    const isWordInDictionary = ValidateNewWordInTheExistingDictionary(NewWord);
    if (isWordInDictionary) {
      console.log("ho hay nada nuevo");
      return;
    }

    AddNewWordToDictionary(NewWord);

    let args = [NewWord.completeTranslation, wordsDictionary];
    ShowData(args);
  };

  hasNewWordSelected ? ExtractFromPlugin() : () => {};
};

const WordCollectorService = (refreshTimeInMiliseconds) => {
  setInterval(() => {
    GetDictionary();
  }, refreshTimeInMiliseconds);
};

let EIGHT_HUNDRED_MILLSECOND = 800;
WordCollectorService(EIGHT_HUNDRED_MILLSECOND);
