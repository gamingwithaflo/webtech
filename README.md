# Webtechnologies assignment

Hello there


## Getting started
Run server application inside directory `server` with commands below and repeat inside directory `client` to run the client.

```
npm install (only on first install)
npm start
(npm run startDev (optional automatic reloading))

Output: localhost started (default port client 8080 and server 8081) and url printed in console
```

## Development
Compile sass to css inside `client` directory when changing styles
```
sass --no-source-map --watch src/scss:public/styles
- output in public/styles/main.css
```

Compile typescript to javascript inside `server` or `client` directories when changing code.
```
npx tsc src/app.ts
- output in src/app.js
```

## Motivation
// todo verantwoording
- sass
- typescript
