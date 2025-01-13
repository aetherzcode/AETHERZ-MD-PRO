// FIXED uploadImage.js FOR ESM

import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

/**
 * Upload image to catbox.moe
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * - `image/gif`
 * @param {Buffer} buffer Image Buffer
 */
export default async function uploadImage(buffer) {
  let { ext } = await fileTypeFromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("fileToUpload", buffer, "file." + ext);
  bodyForm.append("reqtype", "fileupload");

  let res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: bodyForm,
  });

  let data = await res.text();
  return data;
}