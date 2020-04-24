/**
 * The Node.js File System module. Provides an API for interacting with
 * the file system.
 */
import * as fs from 'fs'
import {promises, Dirent} from 'fs'
const fspromises = promises

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
        return fspromises.readFile(path, 'utf8')
    }

    /**
     * Writes string content to a file.
     * @param name File name
     * @param content
     */
    function writeFile(path: string, name: string, content: string): Promise<void>  {
        return fspromises.writeFile(name, content)
    }

    /**
     * Reads a directory.
     * @param path 
     */
    function readDir(path: string): Promise<Dirent[]> {
        return fspromises.readdir(path, { encoding: 'utf-8', withFileTypes: true})
    }

    /**
     * Watch directory event changes.
     * @param path 
     * @param watcher Callback listening to watcher.
     */
    function watchDir(path: string, watcher: (event: string, filename: string) =>  void) {
        fs.watch(path, 'utf-8', (event, filename) => watcher(event, filename))
    }

    /// return object,
    return Object.freeze({
        readFile,
        writeFile,
        readDir, 
        watchDir
    })
}

export default FilesIO