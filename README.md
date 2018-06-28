# react-node-jwt-starter

A starter project for node and react using JWT for authentication.

## Node

* Add server and libraries
  * `touch server.js`
  * `yarn add express jsonwebtoken express-jwt`
  * Create express server, routes and setup JWT

## React

* Add react app
  * `yarn add create-react-app -D`
  * `npx create-react-app client`
  * Set proxy in package.json
  * Create auth.js helper function
  * Create Home, Login components and update App to check for authenticated user