const fs = require('fs');
const path = require('path');

exports.saveFileStream = (fileBuffer, fileName) => {
  const filePath = path.join('uploads', fileName);
  const stream = fs.createWriteStream(filePath);
  stream.write(fileBuffer);
  stream.end();
  return filePath;
};