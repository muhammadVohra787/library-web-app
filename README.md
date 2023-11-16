# library-web-app

\*\*\*

## Localhost links

Client: <http://localhost:5173/>

Server: [http://localhost:3000/](http://localhost:5173/)

## Install

**⚠️ Run** `npm ci` **instead of** `npm install`**.** This ensures we all use the same package versions.

**⚠️** It’s necessary to run npm ci in both the `root` and `client` folders.

## How to run

**⚠️ Everything can be run from the root folder.**

| Scope | Command | Description |
|----|----|----|
| Both | `npm run dev` | Run both server and client in development mode |
| Server | `npm start` | Run server |
| Server | `npm run server:dev` | Run server (auto-restart mode) |
| Client | `npm run client:dev` | Run client in development mode |
| Client | `npm run client:build` | Build client production version |
| Client | `npm run client:preview` | Preview client production build |

## Requirements

**⚠️** Node v16.13.2 or higher

## VSCode config

### Super-recommended plugins

* eslint: <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>
* npm intellisense: [ https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)


### Recommended workspace settings

.vscode/setttings.json:

```javascript
{
    "search.exclude": {
        "**/dist": true,
        "**/package-lock.json": true,
        "**/node_modules": true
      },

      //Enable automatic code formatting
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },

      "eslint.format.enable": true,
}
```


## Material UI documentation

<https://mui.com/material-ui/getting-started/>
