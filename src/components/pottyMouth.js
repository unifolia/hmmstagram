import BadWordsFilter from "bad-words";

const filter = new BadWordsFilter({
    replaceRegex: /[A-Za-z0-9가-힣_]/g,
});

const pottyMouth = userInput => filter.clean(userInput);

export default pottyMouth;