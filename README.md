 ![Ethereal logo](/client/src/assets/ethereal_logo_with_text_small.png)

# Ethereal E-book Library

※ Where you can simulate borrowing a book! ※


**Class project in COMP229**


[Centennial College](https://www.centennialcolllege.ca), Toronto


### Created by

* Arcan Caglayan [@SaturnWave](https://github.com/SaturnWave)
* Bjornar Egede-Nissen [@galloppinggryphon](https://github.com/galloppinggryphon)
* Julian Bolano Rodriguez [@Julian0718](https://github.com/Julian0718)
* Muhammad Vohra [@muhammadVohra787](https://github.com/muhammadVohra787)
* Nirues Benildus [@Nirues](https://github.com/Nirues)
* Sadiq Abbas

※

## Summary

A client interface for a fictional e-book library built in React , with Express+MongoDB backend. The project is a demonstration of CRUD operations and REST communication, as well as the ability to make a sophisticated SPA-based front-end.


**Packages**

* React v18.2
* MaterialUI v5.14
* Express v4.18
* Mongoose v7.6
* Vite v4.4

## How to install

**⚠️** Production: run `npm ci`  in the `root` folder

**⚠️** To build the client or run in dev: also run `npm ci` in the `client` folder

**⚠️** Create a `.env` file in the root folder from the sample file. Set `STAGE` to `production` or `development`

**⚠️** Note: The server will not run this!

## How to run

Client address on localhost (development mode):  `http://localhost:5173/`

### Commands

**⚠️ All commands are executed from the root folder.**

**⚠️ If running on localhost, make sure** `mongod` **is running.**

| Scope | Command | Mode | Description |
|----|----|----|----|
| Both | `npm run dev` | development | Run both server and client in development mode |
| Server | `npm start` | production | Run server |
| Server | `npm run server:dev` | development | Run server (auto-restart mode) |
| Server | `npm run server:init_db` | n/a | Write sample data to database |
| Client | `npm run client:build` | production | Build client production version |
| Client | `npm run client:preview` | production | Preview client production build |

## Requirements

**⚠️** Node v16.13.2 or higher

## Licence

[MIT](./LICENSE.md)
