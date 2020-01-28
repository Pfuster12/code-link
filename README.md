# Welcome to code-link
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A react x electron code editor.

## Get started
`code-link` is an electron app. Visit the [electron docs](https://electronjs.org/docs) to get started in your machine.
Written in Typescript, because it's so much better.

Simple steps to boot it up:
- Download [current Node.js](https://nodejs.org/en/)
- Clone this project into a directory
- Install dependencies with `npm install`
- Create a `.env` file in the root dir. See [dotenv package](https://www.npmjs.com/package/dotenv)
- (Optional) Install React Developer Tools in Chrome and populate the `.env` file local path name.
- Run `npm start`

## Project Structure
```js
- public
  - themes // Public code editor themes packaged into project
- src
  - io // File and Network IO
  - lexer // Language Lexer and Plugins
    - plugins
    - Lexer.ts
  - ui // UI components
    - assets 
    - components // Reusable components
    - editor // Related to the code editor
    - sidebar // Sidebar plugins
    - utils
    - styles // CSS
  - test // Test files and component tests
  - app.tsx // Electron render process
  - index.html // Electron render page
- main.ts // Electron main process
```

## Documentation
Check the [wiki](https://github.com/Pfuster12/code-link/wiki) for documented electron issues affecting the app and workarounds if necessary.

## Version Control
This repo uses [Commitizen](https://github.com/commitizen/cz-cli) for AngularJS format commit messages. Run `git cz` to start a commit.
