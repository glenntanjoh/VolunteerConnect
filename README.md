# CMPT-370 Fall 2023 Group 19 Project

## Description

Volunteer Connect is a comprehensive platform designed to bridge the gap between university organizations seeking volunteers and students eager to contribute their time and skills to worthy causes.

## Installation

The project can be run with Node.js in a Docker container (preferred), or locally. Before running, you must first duplicate the `server/SECRET.env.template` and rename to `server/SECRET.env`. This file contains the credentials for MongoDB and secret keys for authentication cookies, and must be filled out.

Once both the client and server are running, they can be reached at http://localhost:4173 and http://localhost:8000 respectively.

### Docker

The included `Dockerfile`s and `docker-compose.yml` should be sufficient for building the project images and running them as containers.

1. Install Docker: https://www.docker.com/
1. Build the Docker images: `docker compose build`
1. Start the containers: `docker compose up -d`

Use `docker compose down` to remove the containers.

### Locally

While Docker is the preferred method of installation, you can run the project locally with Node.js.

1. Install Node.js: https://nodejs.org/en/download
1. Start the server:
    1. Change into the `server` directory: `cd server`
    1. Install the required server dependencies: `npm i`
    1. Run the server: `npm start`
1. Start the client:
    1. Change into the `client` directory: `cd client`
    1. Install the required client dependencies: `npm i`
    1. Build the client: `npm build`
    1. Run the client: `npm preview`

## Authors

-   Nisarg Chaudhary (ujc862@usask.ca)​
-   Glenn Tanjoh Jong (jot567@usask.ca)​
-   Feranmi Aluwasikun (csb904@usask.ca)​
-   Enioluwa Israel Akinwande (iea995@usask.ca)​
-   Zander Rommelaere (gbd016@usask.ca)​
-   Dhruv Chugh (qme017@usask.ca)​
