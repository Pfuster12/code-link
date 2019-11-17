const FileNameRegex = {
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

export default FileNameRegex