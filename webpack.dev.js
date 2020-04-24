const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { spawn } = require('child_process')

module.exports = merge(common, {
    // Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
    mode: 'development',
    // inline-source-map - A SourceMap is added as a DataUrl to the bundle.
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        // devServer.before
        // Provides the ability to execute custom middleware prior to all other 
        // middleware internally within the server. This could be used to define custom handlers.
        before() {
            // The child_process.spawn() method spawns a new process using the given command, with command line
            // arguments in args. If omitted, args defaults to an empty array.
            // If the shell option is enabled, do not pass unsanitized user input to this function. 
            // Any input containing shell metacharacters may be used to trigger arbitrary command execution.
            spawn(
            // The command to run,
            'electron',
            // list of string arguments ,
            ['./src/main/main.js'],
            // options object,
            // shell runs command inside of a shell. Uses '/bin/sh' on Unix, and process.env.ComSpec on Windows. A different shell can be specified as a string. 
            { 
                shell: true, 
                //Use env to specify environment variables that will be visible to the new process, the default is process.env.
                env: process.env, 
                // Child's stdio configuration
                // The options.stdio option is used to configure the pipes that are established between the parent
                // and child process. By default, the child's stdin, stdout, and stderr are redirected to corresponding 
                // subprocess.stdin, subprocess.stdout, and subprocess.stderr streams on the ChildProcess object. This
                // is equivalent to setting the options.stdio equal to ['pipe', 'pipe', 'pipe'].
                // For convenience, options.stdio may be one of the following strings:

                // 'pipe' - equivalent to ['pipe', 'pipe', 'pipe'] (the default)
                // 'ignore' - equivalent to ['ignore', 'ignore', 'ignore']
                // 'inherit' - equivalent to ['inherit', 'inherit', 'inherit'] or [0, 1, 2]
                stdio: 'inherit' 
            }
            )
            // listeners,
            .on('close', code => process.exit(0))
            .on('error', spawnError => console.error(spawnError))
        }
    }
});