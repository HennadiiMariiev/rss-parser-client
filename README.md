# RSS Parser Client 📰

## General 🔍

This is a simple client-side React application for viewing and administration parsed [Lifehacker RSS](https://lifehacker.com/rss) feed. App is bundled with [es-build](https://github.com/evanw/esbuild) and based on React with TypeScript. The back-end server-side application code is located in my GitHub right here [rss-parser-server](https://github.com/HennadiiMariiev/rss-parser-server).

## App Stack

To provide it main functionality this app uses the following packages/libraries :

- [react-query](https://react-query-v3.tanstack.com/) - powerful instrument for fetching, caching and updating data in React and React Native applications
- [react-hook-form](https://www.react-hook-form.com/) - great stuff for dealing with forms in React
- [react-window](http://react-window.now.sh/) - for virtualization of a large data set
- [react-bootstrap](https://react-bootstrap.github.io/) - for styling UI components.

## App Functionality

This app shows **lifehacker RSS** posts, which are parsed by schedule on server-side and stored in database. Unauthorized users can view all posts using pagination, filter by creators and categories, sort by date and title, search by title and description as well. Registered and authorized users (admins) can perform CRUD operations on posts, categories and creators. App's design is responsive and mobile-friendly))

### N.B.!:

If you want to **sign in** as admin in dev mode without email verification, feel free to use next credentials (no worries: this won't hurt any app's security - this works only in container and local database):

- **email**: **admin@gmail.com**
- **password**: **Qwerty123-**

## Live Client App

The App Client is currently located on [netlify](https://www.netlify.com/) platform. Here is [link](https://rss-parser-client.netlify.app/).

## Docker and Makefile

This is containerized app. Please, check out `./Makefile` with most used commands for quick application start.
`make up` | Start all containers (in background)
`make down` | Stop all started containers
`make shell-once` | Start node container
`make run-dev` | Start node container and start app in development mode
`make run-build` | Start node container and build app

### Please, feel free to use this repo))

Clone it, install dependencies and run the APP.

#### App's technical debt

It will be better to improve next stuff in this app (so-called TODOs):

- add SASS-preprocessor and improve css
- refactor TypeScript interfaces
- improve routing: there are only 2 routes in App (**/**, **/login** and **/register**) - I got some issues with es-build
- add eslint
