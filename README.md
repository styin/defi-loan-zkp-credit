## Decentralized Lending Platform with Zero-Knowledge Proof-Based Credit

---

This project is a full-stack implementation of a proposed protocol enabling decentralized lending based on zero-knowledge proof-based credit fostering more efficient virtual asset liquidity.

---

- in partial fulfillment of the requirements for COMP 4981 in the Department of Computer Science and Engineering, The Hong Kong University of Science and Technology;

- and in partial fulfillment of the requirements for CPEG 4901 in the Computer Engineering Program Office, The Hong Kong University of Science and Technology.


### Project Notes

---
#### 1. Architecture Overview

The project principally follows a MERN-stack structure:
##### Frontend: 
- Vite (frontend build tool for HMR support and faster builds)
- React Typescript
##### Backend:
- Express Typescript
- Node.js
##### Database:
- MongoDB (currently hosted via Mongo Atlas for dev)

#### 2. Codebase Structure
The frontend react app is separate from the backend express app, each having their own node package management. Open respective terminals and change directory into the backend/frontend folder before adding/deleting packages.

##### Frontend: 
`./utils` currently contains utility functions for formatting
`./public` should contain all the static files, like stylesheets, images etc. (e.g.`./public/images`)
##### Backend:
The codebase uses .dotenv (`/.env`) files for abstracting sensitive information from the source code that is published to GitHub. Don't expose database credentials.

`./src/models` should contain the data models and database schemas

[!] the backend express app uses nodemon for HMR support.
[!] the backend uses the mongoose Object Data Modeling (ODM) library


#### 3. Some extensions to install (VS Code)
##### necessary
- ESLint (for Typescript linting)
- Thunder Client (for Rest API testing) (alternatives available)
##### quality of life
- npm Intellisense
- Pretty TypeScript Errors
- ES7+ React/Redux/React-Native snippets
