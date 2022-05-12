# typescriptandwebpack

Practice using typescript with webpack

## Notes

### What is webpack and why do we need it?

-In a project that has multiple files for different sections of codes, when launching the project this will cause multiple http requests, reguardless of the size of the file they all have a base amount of time for it to load, so while the download may be fast, it will still take extra time. Having a large amount of requests can cause latency issues.

-This is where webpack comes into play. Webpack is a tool that helps us bundle our files together. It helps us reduce http requests by bundling code togther. This will optomize our code by reducing the amount of code users need to download.

-Side note on installing typescript, while you will most likely have installed typescript globally, it could be good practice to install it independently to each project. That way you lock in the version that you work with for the project so any future changes made to typescript wont break your project.

-depenendcies to install:
ts-loader, this will help tell webpack how to compile ts code.
typescript, as mentioneed aboved
webpack, webpack itself for bundling files
webpack-cli,
webpack-dev-server
