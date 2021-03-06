# LSP Plugin

Can I write a plugin to the TS language service which VS Coud would then use?

Minimal plugin example:
https://github.com/sjkillen/minimal-tsserver-plugin

LSP documentation including tips on running and testing:
https://code.visualstudio.com/api/language-extensions/language-server-extension-guide

SO Q&A showing how to run a LSP plugin:
https://stackoverflow.com/a/56156004/2715716

First, VS Code workspace TS version must be used. Cmd+Shift+P when in a TS file
and search for TypeScript: Select TypeScript Version. Select the one defined in
the workspace. I currently have it pointing to just regular old TypeScript,
since we do not need to use a fork of it.

Next up, we need to configure the language service to register our plugin. This
is done in `tsconfig.json`.

It is also helpful to use the TypeScript: Restart TS Server command and to check
the Output pane TypeScript channel for TS Server messages. This is where the
plugin messages written through the TS Server infrastructure should go I think.

https://www.typescriptlang.org/tsconfig#plugins

https://code.visualstudio.com/api/references/contribution-points#contributes.typescriptServerPlugins

View TS Server logs:
https://github.com/microsoft/TypeScript/wiki/Getting-logs-from-TS-Server-in-VS-Code

The plugin will not load if workspace TypeScript version is pointed at the stock
global TypeScript installation, because it makes the working directory the one
where TypeScript is coming from, not this repository's directory.

Maybe installing TypeScript locally will work. `npm i typescript` and move the
plugin code into `node_modules/plugin` and make sure a `package.json` with that
name is there. I had no luck trying to make it look outside of `node_modules`.
I have removed the `plugin` local path module from `package.json` in the repo
root for that reason, because it was not doing anything and was just confusing.

My wisdom so far collected in https://stackoverflow.com/a/66504080/2715716.

At this point, with this setup, opening this directory in VS Code, the language
service for TypeScript kicks in and loads the plugin and printing the line
`Started custom plugin :-)` to the TS Server log.
