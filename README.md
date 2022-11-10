# Introduction
This documentation is for users who wish to use the [Voluntiers App](https://github.com/AidenValley/VolunTiers). The Voluntiers API is a series of tools that allow users to use Voluntiers App's many features and is a REST API created with Node, Express.js, and MongoDB.

# Deployed on Heroku
[Deployed API](https://voluntiers-server.herokuapp.com/)

# API Setup
To use, fork and clone the repository [here](https://github.com/CatW-M/voluntiers-api)
In your terminal, type `npm install` to install the dependencies
Type ```touch .env``` to create an environment folder.
Add a ```MONGO_CONNECTION_STRING=<Your connection string here>``` and session variable to the environment folder ```JWT=<Any string>```
Add .env to the gitignore file.

## To Start Server
In the terminal, type ```npm start``` in the terminal.

### API Features

The Voluntiers API provides the following features:
1. Retrieve a list of users and related information, such as volunteer hours, opportunities, and profile information
2. Retrieve hours of community service completed
3. Retrieve a list of Volunteer opportunities - all, current, and past
4. Retrieve messages from users regarding the application.

### Opportunity Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| signIn | String | `Date`|
| signOut | String | `Date` |
| eventId | ObjectId | Ref to Opportunities |
| userId | ObjectId | Ref to Opportunities |

### Default Opportunities Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- 
| GET | /opportunitiess| opportunity.js | Get all opportunities |
| GET | /opportunities/:id | opportunity.js | Get one opportunity |
| POST | /opportunities | Opportunity.js | Create an opportunities |
| PUT | /opportunities/:id | Opportunity.js | Update an opportunity|
| DELETE | /opportunities/:id | opportunities.js | Delete an opportunities |

## Opportunity - Detailed Info

Detailed info for serialized oppportunity
- Get all oppportunity : GET /oppportunity
- Get one example : GET /oppportunity/:id
- Create a capsule : POST /oppportunity
- Update a capsule : PUT /oppportunity/:id
- Delete a capsule : DELETE /oppportunity/:id

### Contact Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| signIn | String | `Date`|
| signOut | String | `Date` |
| eventId | ObjectId | Ref to Opportunities |
| userId | ObjectId | Ref to Opportunities |

### Default Contact Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | .js | Welcome to API |
| GET | /contactus| contact.js | Get all contact messages |
| GET | /contactus/:id | contact.js | Get one example |
| POST | /contact | contact.js | Create an contact |
| PUT | /contact/:id | contact.js | Update an contact |
| DELETE | /contact/:id | contact.js | Delete an contact |

## Contact - Detailed Info

Detailed info for serialized contact
- Get all contact : GET /contact
- Get one example : GET /contact/:id
- Create a capsule : POST /contact
- Update a capsule : PUT /contact/:id
- Delete a capsule : DELETE /contact/:id

### Opportunities Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | ObjectId | Made by MongoDB |
| signIn | String | `Date`|
| signOut | String | `Date` |
| eventId | ObjectId | Ref to Opportunities |
| userId | ObjectId | Ref to Opportunities |

### Default Opportunities Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- 
| GET | /contactus| opportunity.js | Get all opportunities |
| GET | /opportunityus/:id | opportunity.js | Get one example |
| POST | /opportunities | Opportunities.js | Create an Opportunities |
| PUT | /opportunities/:id | Opportunities.js | Update an Opportunities |
| DELETE | /opportunities/:id | Opportunities.js | Delete an Opportunities |

## Opportunities - Detailed Info

Detailed info for serialized Opportunities
- Get all Opportunities : GET /Opportunities
- Get one example : GET /Opportunities/:id
- Create a capsule : POST /Opportunities
- Update a capsule : PUT /Opportunities/:id
- Delete a capsule : DELETE /Opportunities/:id

## Users

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | ObjectId | Made by MongoDB |
| name | String | required |
| email | String | required |
| password | String | required (hash) |
| date | Date | Set default date  |
| __v | Number | Made by Mongoose |

## Users - Default Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | /users/test | user.js | Test route for users, no user returned |
| POST | /users/register | user.js | Create a new user and add to DB |
| POST | /users/login | user.js | Logs user in via credentials, returns user |
| GET | /users/profile | user.js | Protected route, need token to access |

# Users - Detailed Info

Detailed info for serialized hours
- Test user routes : GET /users/test
- Create a user : POST /users/signup
- Login a user : POST /users/login
- Return user data (must login beforehand and use token) : GET /users/profile


