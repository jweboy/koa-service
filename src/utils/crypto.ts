// @ts-ignore
import { webcrypto } from 'crypto';
import { TextEncoder, TextDecoder } from 'util';

// @ts-ignore
const { subtle } = webcrypto;

// export const generateRsaKey = async (moduleLength?: number, hash?: 'SHA-256') => {
//   const publicExponent = new Uint8Array([1, 0, 1]);
//   const { publicKey, privateKey } = await webcrypto.subtle.generateKey(
//     {
//       name: 'RSASSA-PKCS1-v1_5',
//       moduleLength: moduleLength || 2048,
//       publicExponent,
//       hash: hash || 'SHA-256',
//     },
//     true,
//     ['sign', 'verify']
//   );

//   return { publicKey, privateKey };
// };

async function generateAesKey(length = 256) {
  const key = await subtle.generateKey(
    {
      name: 'AES-CBC',
      length,
    },
    true,
    ['encrypt', 'decrypt']
  );

  return key;
}

export async function aesEncrypt(plaintext) {
  const ec = new TextEncoder();
  const key = await generateAesKey();
  // @ts-ignore
  const iv = webcrypto.getRandomValues(new Uint8Array(16));

  const ciphertext = await subtle.encrypt({ name: 'AES-CBC', iv }, key, ec.encode(plaintext));

  return {
    key,
    iv,
    ciphertext,
  };
}

export async function aesDecrypt(ciphertext, key, iv) {
  const dec = new TextDecoder();
  const plaintext = await subtle.decrypt(
    {
      name: 'AES-CBC',
      iv,
    },
    key,
    ciphertext
  );

  return dec.decode(plaintext);
}
