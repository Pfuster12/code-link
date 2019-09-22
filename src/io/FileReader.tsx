// @flow

/**
 * The Node.js File System module. Provides an API for interacting with
 * the file system.
 */
const fs = require('fs').promises

/**
 * This is a library to read files from the file system.
 * It contains helper functions to read a file.
 * 
 * A frozen factory function.
 * @function
 */
const FileReader = () => {

    /**
     * Reads a file path using the Node.js file system API.
     * Uses the Promises API.
     * @param {string} path The relative file path.
     * @returns {Promise} A Promise of the file contents.
     */
    function readFile(path: string): Promise<string> {
        console.info('%c Reading file from ' + path, 'color: royalblue;')
        return fs.readFile(path, 'utf8')
    }

    /// return object,
    return Object.freeze({
        readFile
    })
}

export default FileReader