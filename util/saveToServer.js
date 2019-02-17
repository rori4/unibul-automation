const fs = require("fs");
var path = require("path");
var appDir = path.dirname(require.main.filename);
const imageType = require("image-type");


async function fromURL(imageBuffer, destination, id) {
    const type = imageType(imageBuffer) == null ? 'jpg' : type.ext;
    const pathToSave = `${appDir}\\static\\imageDatabase\\${destination}\\${id}.${type}`;
  //   await fs.mkdir(pathToSave, { recursive: true }, err => {
  //     if (err) throw err;
  //   });
    await fs.writeFile(pathToSave, imageBuffer, err => {
      console.log(err ? err : "done!");
    });
    return pathToSave;
}

async function fromBase64(imageBuffer, destination, id) {
    try {
        const type = imageType(imageBuffer) == null ? 'png' : type.ext;
        let pathToSave = `${appDir}\\static\\imageDatabase\\${destination}\\`;
        fs.mkdirSync(pathToSave, { recursive: true });
        pathToSave = pathToSave + `${id}.${type}`;
        fs.writeFileSync(pathToSave, imageBuffer,'base64');
        return pathToSave;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    fromURL,
    fromBase64,
};
