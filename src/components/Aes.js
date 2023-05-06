var CryptoJS = require("crypto-js");
const key = "31c0584d7241ffe123ae1786c44e7cdaded9b316b2269eddccdd9943d421fe1b";
// crypto.randomBytes(32); // Generate a random key
const iv = "339cd1a8904a110b3467087308a0313d";
// crypto.randomBytes(16); // Generate a random IV

// Encrypt
export const Aesencryption = (data) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
  }).toString();

// Decrypt
export const Aesdecryption = (cipherText) => {
  var bytes = CryptoJS.AES.decrypt(cipherText, key, { iv: iv });
  return  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// console.log(encrypt(data));
// console.log(decrypt(encrypt(data)))

// module.exports = {
//     enc : (string) => Aesencryption(string),
//     dec : (cipherText) => Aesdecryption(cipherText)
// }

