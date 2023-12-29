# Project Build Instructions

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Setup the database](#setup-the-database)
  - [Build the Project](#build-the-project)

## Introduction

Welcome to the project! This document provides instructions on how to build and run the project.

## Prerequisites

Before you begin, ensure you have the following installed:

- NodeJS
- PostgreSQL and pgAdmin 4

## Getting Started

### Clone the repository

```bash
git clone https://github.com/mathiasbalian/learning-webapp.git
cd your-repository
```
### Install dependencies
To install dependencies, open 2 terminals, one for the frontend and one for the backend. Run the following commands:  
- Frontend terminal
    
  ```bash
  cd frontend
  npm i
  ```
- Backend terminal
    
  ```bash
  cd backend
  npm i
  ```

### Setup the database
In order to use the web application, you need to have a PostreSQL database ready. Begin by opening pgAdmin 4, and create a user for the database you're about to create, with the following attributes:
- Name: learningDbUser
- Password: root
- Privileges: all

Once this is done, create a database with the following attributes:
- Name: LearningDb
- Owner: learningDbUser (the user we just created)  

Leave the rest as default.  
Now, run the Database_setup.sql script on your newly created database, and you're all set !

### Build the project
To build the project, begin by compiling the typescript code in the backend folder. If you are using Webstorm, click on any typescript file in the backend folder, right click anywhere in the code, and click 
"Compile Typescript".   
Once this is done, open up the terminals that were used to install the dependencies, and run the following commands:  
- Backend terminal  
  ```bash
  node app.js
  ```
- Frontend terminal  
  ```bash
  ng serve
  ```
Once finished, the project should start building, and you should see, in the frontend terminal, a link to http://localhost:4200  
Click on it, and enjoy the experience !
  
