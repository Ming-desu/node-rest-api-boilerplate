# Node REST API Boilerplate

A starter boilerplate for Node.js built with Express along with Babel for transpiling, Sequelize for ORM, and Mysql for RDB, and Eslint for coding styles and standards.

## Requirements
1. NodeJS
2. Mysql
3. Redis

## Getting Started - Setup
1. Download or clone the project's repository [from here](https://github.com/Ming-desu/node-rest-api-boilerplate.git).

   ```bash
   git clone https://github.com/Ming-desu/node-rest-api-boilerplate.git && cd ./node-rest-api-boilerplate
   ```

2. Install the project dependencies.

   ```bash
   npm ci # npm >= 5.8
   # or npm install
   ```

3. Create .env for the app.

   ```bash
   cp .env.example .env.development
   # .env - production
   # .env.test - test
   ```

4. Fill the properties from the created .env.

5. Set up the database.

   ```bash
   npx sequelize-cli db:create 
   # npx sequelize-cli db:migrate
   ```

6. Start the server.

   ```bash
   npm run watch
   ```

## Build and Deployment

We can build and minified the project source code with the help of Babel.

```bash
npm run build
```

## Bugs and Feature Requests
Encountered a bug? [Report bug](https://github.com/Ming-desu/node-rest-api-boilerplate/issues/new?template=bug.md)

Have feature request? [Request feature](https://github.com/Ming-desu/node-rest-api-boilerplate/issues/new?template=feature.md&labels=feature)


## Copyright and License
The source code and documentation copyright 2022-2023 to the authors. Code released under the [MIT License](https://github.com/Ming-desu/node-rest-api-boilerplate/blob/master/LICENSE).

Have a nice day and enjoy! :metal: