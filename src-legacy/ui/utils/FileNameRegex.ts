export const FileNameRegex = {
    JAVASCRIPT: /^[a-zA-Z_\-0-9]+?\.js$/,
    JSON: /^[a-zA-Z_\-0-9]+?\.json$/,
    GITIGNORE: /\.gitignore/,
    TYPESCRIPT: /^[a-zA-Z_\-0-9]+?\.ts$/,
    TYPESCRIPT_CUSTOM_TYPES: /^[a-zA-Z_\-0-9]+?\.d\.ts$/,
    TYPESCRIPT_CONFIG: /^tsconfig.json$/,
    WEBPACK_CONFIG: /^webpack\.[a-zA-Z_\-0-9]+?\.js$/,
    SVG: /^[a-zA-Z_\-0-9]+?\.svg$/,
    HTML: /^[a-zA-Z_\-0-9]+?\.html$/,
    CSS: /^[a-zA-Z_\-0-9]+?\.css$/,
    REACT: /^[a-zA-Z_\-0-9]+?\.(jsx|tsx)$/,
    MARKDOWN: /^[a-zA-Z_\-0-9]+?\.md$/,
    README: /^README\.md$/,
}

/**
 * Extract file extension from file path.
 * @param path 
 */
export function extractFileExtension(path: string) {
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
}