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
const FilesIO = {

    /**
     * Reads a file path using the Node.js file system API.
     * Uses Promises API.
     * @param path The relative file path.
     * @returns A Promise of the file contents.
     */
    readFile: (path: string): Promise<string> => {
        console.info('%c [FILESIO] Reading file from ' + path, 'color: green;')
        return fspromises.readFile(path, 'utf8')
    },

    /**
     * Writes string content to a file.
     * @param name File name
     * @param content
     */
    writeFile: (path: string, name: string, content: string): Promise<void> => {
        return fspromises.writeFile(name, content)
    },

    /**
     * Reads a directory.
     * @param path 
     */
    readDir: (path: string): Promise<Dirent[]> => {
        return fspromises.readdir(path, { encoding: 'utf-8', withFileTypes: true})
    },

    /**
     * Watch directory event changes.
     * @param path 
     * @param watcher Callback listening to watcher.
     */
    watchDir: (path: string, watcher: (event: string, filename: string) =>  void) => {
        fs.watch(path, 'utf-8', (event, filename) => watcher(event, filename))
    },

    /**
     * Get a uri's last path.
     */
    getLastPath: (path: string) => {
        const paths = path.split(/\/|\\/)
        return paths[paths.length - 1] ? paths[paths.length - 1] : path
    },

    /**
     * Extract file extension from file path.
     * @param path 
     */
    extractFileExtension: (path: string) => {
        var temp = ''
        if (path) {
            const routes = path.split('/')
            const name = routes[routes.length - 1]
    
            if (name) {
                const fileNames = name.split('.')
    
                if (fileNames.length > 1) {
                    temp = fileNames[fileNames.length - 1]
                }
            }
        
            return temp
        }
    },

    /**
     * Sort a list of files and directories by directories first.
     * @param dirs
     */
    sortByDirectory: (dirs: Dirent[]): Promise<Dirent[]> => {
        return new Promise((resolve, reject) => {
            // sort out content by dirs first,
            dirs.sort((a, b) =>  {
                if (a.isDirectory() && b.isDirectory()) {
                    return 0
                } else if (a.isDirectory() && !b.isDirectory()) {
                    return -1
                } else {
                    return 1
                }
            })
            resolve(dirs)
        })
    }
}

export default FilesIO