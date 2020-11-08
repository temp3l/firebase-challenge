Hi,

Thanks for the challenge!

Due to time constraints I had to "cut short" a few aspects:
1. styling
2. validation (very basic)
3. error-handling (logs to console)
4. I only implemented `PUT /orders/:orderId`  (not `POST /orders`)
5. no tests

The create-react-app is running on http://localhost:3000

The express-backend is running on  http://localhost:5000

The frontend uses the `dev-proxy` in package.json to reach the backend.

## Open TODOS:
1. frontend: refactor components + pages
2. frontend: "librarify" business & fetch -logic
3. mentioned in comments


## Setup:dev
```bash
  cd challenge-front
  npm i
  npm run start

  cd challenge-back
  npm i
  npm run start:dev
```

## Setup:prod
```bash
  cd challenge-front
  npm i
  npm run build
  PORT=3000 serve -s build

  cd challenge-back
  npm i
  npm run build
  npm run start
```

The prod version needs separate proxy!



## Excluded from the repo:
* challenge-back/src/serviceAccountKey
* challenge-front/src/Fire.ts

Please copy them from the email to src/ or dist/ folder!
