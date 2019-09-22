import { Lexer } from "./Lexer"

// @flow

/**
 * The Node.js File System module. Provides an API for interacting with
 * the file system.
 */
const fs = require('fs').promises

/**
 * This is a library to read Language Plugins from the file system.
 * It contains helper functions to read, parse and return a Javascript
 * object of the plugin for use in the App.
 * 
 * A frozen factory function.
 * @function
 */
const PluginReader = () => {

    /**
     * Reads a file path into a JSON object using the Node.js file system API.
     * Uses the Promises API.
     * @param {string} path The relative file path.
     * @returns {Promise} A Promise of the JSON object.
     */
    function readPlugin(path: string): Promise<Lexer.Plugin> {
        console.info('%c Reading plugin from ' + path, 'color: royalblue;')
        return fs.readFile(path).then(parseJson)
    }

    /**
     * Parses a string into JSON wrapped in a promise.
     * @param {string} str String to parse into JSON.
     * @returns {Promise} A Promise of the JSON object.
     */
    function parseJson(str: string): Promise<Lexer.Plugin> {
        console.info('%c Parsing JSON...', 'color: royalblue;')
        return new Promise((resolve, reject) => {
            try {
                resolve(JSON.parse(str))
                console.info('%c Success! JSON parsed...', 'color: royalblue;')
            } catch (error) {
                reject(error)
                console.info('%c Error! JSON error...', 'color: royalblue;')
            }
        })
    }

    /// return object,
    return Object.freeze({
        readPlugin
    })
}

export default PluginReader