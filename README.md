# Pokémon App

## Setup Requirements

To develop and run this project, you need to have Node.js installed on your machine.

### Node.js Installation

Node.js includes NPM, which will simplify the setup process. After installing Node.js, you can verify the installation with:

    $ node --version
    v20.11.0

    $ npm --version
    10.2.4

## Installation

Navigate to the project directory and install the dependencies:

    $ npm install

## Running the Application

To start the development server and watch for file changes:

    $ npm start

## Running Tests

To run the project's test suite:

    $ npm test

## Technologies

### TypeScript

- **React:** For building the user interface.
- **Redux Toolkit:** For managing application state.
- **RTK Query:** For fetching and caching data efficiently.
- **Jest:** For writing and running tests.

## Features

- **Paginated Pokémon List:**
  - Retrieves a list of Pokémon from an external API.
  - Implements pagination to manage and display Pokémon in pages.
  - Allows users to navigate through the pages of Pokémon.

- **Pokémon Details View:**
  - Displays detailed information about a selected Pokémon.
  - Information includes the Pokémon's name, image, height, weight, and types.

- **Responsive Design:**
  - Ensures the application is accessible and functional on various devices, including mobile phones.

## Additional Information

- Environment-specific configurations such as API base URLs can be managed using `.env` files.