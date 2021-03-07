# LSP Plugin

This repository includes my attempt as building a TypeScript language server
plugin which would strip `?search` and `#fragment` off relative path local file
ESM module imports.

To test it, open this repository in VS Code, accept the prompt to switch to the
workspace TypeScript version or if it doesn't show, press Cmd+Shift+P when in a
TS/JS file and select *TypeScript: Select TypeScript Version*. Once done, open
`demo-ts/index.ts` or `demo-js/index.js` and see that the `mod.ts` import works.
Without this TS Server plugin, that import would fail. You can verify this by
switching back to the VS Code's version of TypeScript. The plugin will not load
in case a non-workspace version of TS Server is used.

Using the workspace version will not be needed once this work is packaged as a
VS Code extension that would register the TS Server plugin automatically. This
extension could then be placed in the recommended extensions in the workspace
configuration of VS Code.

https://code.visualstudio.com/api/references/contribution-points#contributes.typescriptServerPlugins

Until that is done, the TypeScript version used by the workspace is placed in
`node_modules` and the plugin is registered through `tsconfig.json`. There is
some trickiness to loading it (it is really in `node_modules/plugin` and loads
`plugin.js`) and I'm hoping this will go away once the VS Code extension way is
used. More info on this in https://stackoverflow.com/a/66504080/2715716.

To test changes to the code, make them in `plugin.js` and then press Cmd+Shift+P
and select *TypeScript: Restart TS Server* and monitor the Output pane channel
TypeScript. This log will show whether the changed plugin was successfully added
to TS Server (*Starting...* and *Forking...* will show) or not (*Killing* will
show). In case the TS Server starts up fine, the Cmd+Shift+P *TypeScript: Open
TS Server log* command can be used to view the TS Server log. In case it won't,
this command might not work and the `Log file:` line path from the Output pane
TypeScript channel needs to be manually opened, for example in the Integrated
Terminal using `code "${logFilePath}"` substituting the path from the log line.
