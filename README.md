# Webtechnologies assignment
Hello there

## Getting started
Install dependencies
```
cd <project-directory>
npm install
```

Build and run application
```
npm run build
npm start
```

## Development
**API**

Assessment
```
GET: api/assessment/topics
GET: api/assessment/quizzes/<id>
```
Attempts
```
GET: api/attempts/topics
POST: api/attempts/topics
```

**Scripts**

| Script | Description |
| --------- | --------- |
| `build-sass` | compile sass to css |
| `build-ts` |  compile ts to js |
| `build` | compile sass, ts and run linting, copy-static-assets |
| `copy-static-assets` | copy static assets to dist |
| `lint` | run eslint rules |
| `start` | start server |
| `watch-node` | watch node and reload on changes |
| `watch-sass` | watch sass and reload on changes |
| `watch-ts` | watch ts and reload on changes |

**Development reloading examples**
```
npm run watch-node
npm run watch-ts
npm run watch-sass
```

**Environment variables**

Copy and rename .env.example to .env and set environment variables when needed
- default port 8080
- session secret
