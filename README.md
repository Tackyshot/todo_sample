# Simple Todo List

A simple todo list built as an introduction to Node.js and React.js.

## Setup:

To get this todo list running in your own environment follow the following steps.

1. Checkout this repository to your machine.
2. Make sure you're running Node v5.1.0 or later. an easy way to manage your node versions is via NVM found [Here](https://github.com/creationix/nvm)
3. Navigate to the root directory of your repository via command line and run the following command:
  * `npm install`
4. In the same directory via command line transpile and build the bundle by running:
  * `webpack`
5. Once you have bundled your client side code, start the HTTP server by running:
  * `node app.js` 
6. Finally, Navigate to the todo list via your browser by going to `http://localhost:3001`

## Overview:

Todo List has two main working directories

 1. [client](https://github.com/tackyshot/todo_sample/tree/master/docs/client.md)
   `client` contains all files related to react components, flux stores, or any other scripts that are transpiled and bundled for use by the server.
 2. [server](https://github.com/tackyshot/todo_sample/tree/master/docs/server.md)
   `server` contains all files and data related to starting and serving http requests.


## Notes:

1. This example application does not use a database, but a plain text file loaded into the application memory at run time. It was done intentionally in an effort to make setup and execution quick and easy. Because the text file is loaded into memory at runtime and is mutated in memory only, it will not persist through server restarts.
2. React router is used in this application. Even though there is only one route, the routes file can be easily edited to add more routes and features.