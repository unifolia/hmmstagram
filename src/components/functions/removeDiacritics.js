import diacritics from "diacritics";

const removeDiacritics = input => {
    const noDiacritics = diacritics.remove;

    return noDiacritics(input);
};

export default removeDiacritics;