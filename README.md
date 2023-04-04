# Insuranace Application

### Scenario

Customers often start the insurance application process on an external third party site, where that third party site then sends the collected information to our service so that the user can continue their application process and receive a price quote.


## Installation and Getting Started

### [Server Setup](https://github.com/mlee223/insurance-application/server)

Use the package manager [yarn](https://yarnpkg.com) or an equivalent to install dependencies.

```zsh
cd server
yarn install
```

Database configuration used:
```zsh
HOST: "127.0.0.1",
USER: "db_user",
PASSWORD: "123456",
DB: "test_db",
dialect: "mysql",
pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
},
```


### Database Setup

Install MySQL service and create a user & database.
On mac, use Homebrew to install MySQL.

```zsh
brew install mysql
brew services start mysql
```

Login to MySQL and create a user in Terminal:
```zsh
mysql -u root
CREATE USER 'db_user'@'localhost' IDENTIFIED BY '123456';
```

Create a database:
```zsh
mysql -u db_user -p
CREATE DATABASE test_db;
```

### Run the Node.js Express Server

Once package installation and db setup are completed, use `yarn start` to run the service on http://localhost:8080/ and with Express middleware.

The service connects to the MySQL database and sync the db content.
(`applications` table is created if db is empty.)

The endpoints are following:
```json
// Create a new Insuranace Application
POST /api/applications

// Retrieve a single Insuranace Application with id
GET /api/applications/:id

// Update a Insuranace Application with id
PUT /api/applications/:id

// Delete a Insuranace Application with id
DELETE /api/applications/:id

// Validate a Insurance Application and Get price quote
POST /api/applications/:id/validate
```

### Initialize an insurance application

In order to simulate the insurance application process started on an external 3rd-party website, use `curl` command to create a new application.

```zsh
curl --location 'http://localhost:8080/api/applications' \
--header 'Content-Type: application/json' \
--data '{
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1994-01-12",
    "address": {
        "street": "Street 1",
        "city": "City 1",
        "state": "State 1",
        "zipCode": "30009"
    },
    "vehicles": [
        {
            "vin": 123456,
            "year": 2016,
            "model": "BMW"
        }
    ]
}'
```

The endpoint returns a redirect URL that points to the frontend URL to load the created application.

```zsh
{
    redirect: 'http://localhost:8081/applications/1'
}
```

Copy and past the URL in web browser to continue the application process.

### [React Frontend](https://github.com/mlee223/insurance-application/client)

In the `client` folder, run `yarn install` and `yarn start` to run the React application on http://localhost:8081/.

```zsh
cd client
yarn install
yarn start
```

Main packages used:

```json
React v18.2.0
Redux
TypeScript
Yup
Axios
```

In order to start another application, use `curl` command to create a new application and get a `redirect` url.

