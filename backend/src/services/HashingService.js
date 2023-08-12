const { businessConfig } = require('./configs/config');
const SALT_ROUNDS = businessConfig.hashingSaltRounds;

const bcrypt = require('bcrypt');

class HashingService {
  /**
   * Hashes the input data using bcrypt.
   * @param {string} data The data to be hashed.
   * @returns {Promise<string}>} A Promise that resolves with an object containing the hash
   */
  static async hash(data) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
  }

  /**
   * Compares the input data to a hashed data object using bcrypt.
   * @param {string} data The data to compare.
   * @param {{ salt: string, hash: string }} hashedData The hashed data to compare against.
   * @returns {Promise<boolean>} A Promise that resolves with a boolean indicating whether the data matches the hashed data.
   */
  static compare = bcrypt.compare;
}

module.exports = HashingService;
