import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1njanrhdkCnsahrebfdMvbjo32hqnd31');
const iv = CryptoJS.enc.Utf8.parse('jsKidmshatyb4jdu');

export default class Crypto {

    AESEncrypt = (message) => {
        return CryptoJS.AES.encrypt(message, key, { iv: iv });
    }

    AESDecrypt = (encrypted) => {
        let decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
        return CryptoJS.enc.Utf8.stringify(decrypted);
    }
}
