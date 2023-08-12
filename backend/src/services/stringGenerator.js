/**
 * @class CodeGenerationService - For generating and encrypting codes for various purposes
 */
class StringGenerator {
  constructor(length, characterSet = Characters.alphanumericMixed) {
    this.length = length;
    this.characterSet = characterSet;
    this.generatedString = null;
  }
  async generate(length = this.length, characterSet = this.characterSet) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characterSet.charAt(
        Math.floor(Math.random() * characterSet.length)
      );
    }
    this.generatedString = result;
    return result;
  }
}

// characters.js
const Characters = {
  numeric: '0123456789',
  alphabeticLower: 'abcdefghijklmnopqrstuvwxyz',
  alphabeticUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumericLower: '0123456789abcdefghijklmnopqrstuvwxyz',
  alphanumericUpper: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  alphanumericMixed:
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

module.exports = { Characters, StringGenerator };
