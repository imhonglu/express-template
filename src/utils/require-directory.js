/* eslint-disable import/no-dynamic-require, global-require, no-param-reassign */
import fs from 'fs';
import path from 'path';

import toCase from './to-case';

function getStack() {
    const { prepareStackTrace } = Error;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack.slice(1);
    Error.prepareStackTrace = prepareStackTrace;
    return stack;
}

function getCallerDirectory() {
    const stack = getStack();
    const callerFilename = stack[2].getFileName();
    return path.dirname(callerFilename);
}

function indexDirectory(props = {}) {
    const {
        pathName,
        callback,
        useDefault,
        caseName = 'camel',
    } = props;
    const directory = pathName || getCallerDirectory();
    const files = fs.readdirSync(directory);

    return files.reduce((acc, fileName) => {
        const filePath = `${directory}/${fileName}`;
        const extName = path.extname(filePath);
        const baseName = path.basename(filePath, extName);
        if (!pathName && baseName === 'index') return acc;

        const importedFile = require(filePath);
        const hasDefault = Object.prototype.hasOwnProperty.call(importedFile, 'default');
        const isDirectory = fs.lstatSync(filePath).isDirectory();
        const key = toCase[caseName](baseName);

        if (pathName && baseName === 'index') {
            acc = hasDefault ? importedFile.default : importedFile;
        } else if (isDirectory) {
            const options = {
                ...props,
                pathName: filePath,
            };
            acc[key] = indexDirectory(options);
        } else if (callback) {
            acc[key] = callback(filePath);
        } else {
            acc[key] = useDefault && hasDefault
                ? importedFile.default
                : importedFile;
        }
        return acc;
    }, {});
}

export default indexDirectory;
