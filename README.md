# Code Link

## Local setup:

### Prerequisites

1. **NodeJS:** <br>
   Please install [NodeJS >= 10.15.0](https://nodejs.org/en/download/). Which also automatically installs the [npm](https://www.npmjs.org/) -> node package manager.

---

Once you have the [Prerequisites](#prerequisites) covered:

1. [Fork](https://help.github.com/en/articles/fork-a-repo) [Code Link repository](https://github.com/Pfuster12/code-link) into your own GitHub account.

1. [Clone](https://help.github.com/articles/cloning-a-repository/) forked repository from GitHub onto your local computer.

   ```sh
   $ git clone https://github.com/<YOUR_GITHUB_USERNAME>/code-link.git
   ```

1. Navigate into the project folder and install all of its necessary dependencies with npm.

   ```sh
   $ cd code-link
   $ npm install
   ```

1. Add [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) Chrome Extension to your Chrome browser.

1. Make a copy of `.env.sample` and rename it to `.env`. You can do so with this simple command:

   > **NOTE:** If you are using Windows Command Prompt, you need to use `copy` instead of `cp`. <br>

   ```sh
   $ cp .env.sample .env
   ```

1. Update/set `EXTENSION_PATH` variable in `.env` to proper value

   Replace `USER_NAME` with your logged-in username of the computer. Example, ironman, wonderwoman, etc. <br>
   Replace `USER_PROFILE` with a profile name on which you have the React Developer Tools Extension installed. Example, Profile 1, Profile 2, etc. <br>
   Replace `VERSION` with whatever the current extension version is.

   - On Windows:
     ```
     EXTENSION_PATH="C:/Users/USER_NAME/AppData/Local/Google/Chrome/User Data/USER_PROFILE/Extensions/fmkadmapgofadopljbjfkapdkoienihi/VERSION"
     ```
   - On MAC:
     ```
     EXTENSION_PATH="~/Library/Application\ Support/Google/Chrome/USER_PROFILE/Extensions/fmkadmapgofadopljbjfkapdkoienihi/VERSION"
     ```
   - On Linux:
     ```
     EXTENSION_PATH="~/.config/google-chrome/USER_PROFILE/Extensions/fmkadmapgofadopljbjfkapdkoienihi/VERSION"
     ```

1. You can now run

   ```sh
   $ npm start
   ```

   You should now be able to see a window popup with developer tools.

Further, checkout [package.json](https://github.com/Pfuster12/code-link/blob/master/package.json) file to learn about (more) available scripts/commands.

Happy coding! 🥂
