const polybiusModule = (function () {
  function generatePolybiusCipher(encode = true) {
    const alphabet = "abcdefgh(i/j)klmnopqrstuvwxyz"; //follow the format if you want to include more groups
    let row = 1,
      column = 1;
    const polybiusCipher = {};
    for (let i = 0; i < alphabet.length; i++) {
      if (column == 6) {
        //number of columns -1
        column = 1;
        row += 1;
      }
      if (alphabet[i] == "(") {
        //adding key:value for combined keys
        polybiusCipher[alphabet.substring(i, i + 5)] = `${column}${row}`;
        column += 1;
        i += 4;
      } else {
        //adding key:value for single keys
        polybiusCipher[alphabet[i]] = `${column}${row}`;
        column += 1;
      }
    }
    if (encode === true) {
      //returning (key = letter, value = code)
      return polybiusCipher;
    } else {
      //returning (key = code, value = letter)
      for (const key in polybiusCipher) {
        polybiusCipher[polybiusCipher[key]] = key;
      }
      return polybiusCipher;
    }
  }

  function polybius(input, encode = true) {
    //quick check if when deconding the number of characters in string excluding spaces
    //is even
    if (encode === false && input.replace(" ", "").length % 2 > 0) return false;

    input = input.toLowerCase();
    const polybiusCipher = generatePolybiusCipher(encode);
    const codeMessage = [];
    const encodeFlag = encode === true ? 1 : 2;

    for (let i = 0; i < input.length; i += encodeFlag) {
      const searchItem = input.slice(i, i + encodeFlag); //1 letter for encoding, 2 numbers for decoding
      if (input[i] == " ") {
        codeMessage.push(input[i]); //pushing spaces without changes
        i = i + (1 - encodeFlag); //makes difference only if decoding
      } else if (polybiusCipher[searchItem]) {
        codeMessage.push(polybiusCipher[searchItem]);
      } else {
        //expensive search for combined letters only (rarely utilized)
        const cipherGroups = Object.keys(polybiusCipher);
        const foundKey = cipherGroups.find((key) => key.includes(searchItem));
        codeMessage.push(polybiusCipher[foundKey]);
      }
    }
    return codeMessage.join("").toString();
  }

  return {
    polybius,
  };
})();

module.exports = polybiusModule;
