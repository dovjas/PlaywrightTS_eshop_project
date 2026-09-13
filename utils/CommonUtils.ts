import cryptoJs from 'crypto-js';

export class CommonUtils {
  private secretKey: string;

  constructor() {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('Key not found');
    }
    this.secretKey = secretKey;
  }

  public encryptData(data: string): string {
    const encryptData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
    console.log('Encrypt: ', encryptData);
    return encryptData;
  }

  public decrypt(data: string) {
    const decryptData = cryptoJs.AES.decrypt(data, this.secretKey);
    return cryptoJs.enc.Utf8.stringify(decryptData);
  }
}
