/**
 * The Node.js File System module. Provides an API for interacting with
 * the file system.
 */
import {promises, Dirent} from 'fs'
const fs = promises

/**
 * This is a library to read and write files using the fs module.
 * 
 * A frozen factory function.
 * @function
 */
const FilesIO = () => {

    /**
     * Reads a file path using the Node.js file system API.
     * Uses Promises API.
     * @param path The relative file path.
     * @returns A Promise of the file contents.
     */
    function readFile(path: string): Promise<string> {
        console.info('%c Reading file from ' + path, 'color: royalblue;')
        return fs.readFile(path, 'utf8')
    }

    /**
     * Writes string content to a file.
     * @param name File name
     * @param content
     */
    function writeFile(path: string, name: string, content: string): Promise<void>  {
        return fs.writeFile(name, content)
    }

    /**
     * Reads a directory.
     * @param path 
     */
    function readDir(path: string): Promise<Dirent[]> {
        return fs.readdir(path, { encoding: 'utf-8', withFileTypes: true})
    }

    /// return object,
    return Object.freeze({
        readFile,
        writeFile,
        readDir
    })
}

export default FilesIO