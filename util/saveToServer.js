const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const imageType = require("image-type");
const mkdir = require('../util/mkdir');

async function fromURL(imageBuffer, destination, id) {
    try {
        let imgType = imageType(imageBuffer);
        const type = imgType == null ? 'png' : imgType.ext;
        let pathToSave = `${appDir}\\static\\imageDatabase\\${destination}\\`;
        await mkdir.byPathSync(pathToSave);
        pathToSave = pathToSave + `${id}.${type}`;
        await fs.writeFileSync(pathToSave, imageBuffer);
        return pathToSave;
    } catch (error) {
        console.log(error);
    }
}

async function fromBase64(imageBuffer, destination, id) {
    try {
        let imgType = imageType(imageBuffer);
        const type = imgType == null ? 'png' : imgType.ext;
        let pathToSave = `${appDir}\\static\\imageDatabase\\${destination}\\`;
        await mkdir.byPathSync(pathToSave);
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
