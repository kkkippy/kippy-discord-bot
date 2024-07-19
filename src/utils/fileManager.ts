import path from "node:path";
import fs from "node:fs";

const forEachFile = async <FileStruct> (
    dirPath: string,
    callback: (file: FileStruct) => void
) => {
    const folder = fs.readdirSync(dirPath);

    for (const file of folder)
    {
        const filePath = path.join(dirPath, file);

        const fileStat = fs.lstatSync(filePath);

        if (fileStat.isFile())
        {
            const requiredFile = require(filePath);
            callback(requiredFile);
        }

        if (fileStat.isDirectory()) forEachFile(filePath, callback);
    }
}

export default forEachFile;