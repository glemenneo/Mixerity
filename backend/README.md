## Description

[Mixify](https://github.com/glemenneo/Mixify) backend server written in TypeScript built using Nest, Passport, TypeORM and MySQL.

Mixify is currently still in development.

## Authentication
Authentication is handled using Passport. Passport-Local is used to authenticate users. Passowrd-JWT is used to authorise users and guard protected APIs. 

The server uses a access-token and refresh-token system whereby users upon being authenticated are issued a short lived access-token to access protected APIs and a long lived refresh-token. The access-token and refresh-tokens are then stored in the browser cookies and retrived as such. Upon expiry of the access-token, clients can call an API to refresh their access-token using their refresh-token.

## Modules
There are 4 modules in the project Users, Auth, Profile and Posts. 

#### Users
The Users module contains APIs related to a accessing and changing a user's authentication information such as usernames, passwords and refresh-tokens. 

#### Auth
The Auth module contains APIs and methods relating to authenticating and authorising a client to access protected APIs.

#### Profile
The Profile module contains APIs related to a user's public information viewable by other users such as display names, profile pictures and followers as well as the information related to the profiles.

#### Posts
The Posts module contains APIs related to posts that users can upload and engage with as well as the information on related to a post such as the picture and description.

#### Comments
The Comments module contains APIs related to comments that users can post and the engagement surrounding comments such as likes, replies and comment chains.

## Database
Database storage is handled using TypeORM running on the MySQL dialect. There are 4 entites representing all the information needed by the server, User, Profile, Post and Comment. 

The repositories are set up in a way such that there is a one-to-one relation between User and Profile. A Profile can have a self-referencing many-to-many relation to represent followers and followings. A Profile also has a one-to-many relation to Post where a profile can have many posts but each pos has only one user. A Post can then have a one-to-many relation to Comment where each post has multiple comments but each comment belongs to one post.

Pagination is used to handle large requests such as a search request for multiple users using a DTO to validate query parameters on incoming requests.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
