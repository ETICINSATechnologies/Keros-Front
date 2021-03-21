# Keros Front (ETIC INSA Technologies' ERP)

This repository hosts the source code for the front-end of Keros, a proprietary ERP developed to manage ETIC INSA Technologies.

## Getting Started

### Installation

This project is powered by [nodeJS](https://nodejs.org). You can install it through the package managers available for your distribution but it is recommended to retrieve the installer of the latest version from the official website. This installs both the `node` and `npm` binaries on your machine. To verify succesful installation of the required binaries : 

```
node --version
npm --version
```

To install the dependencies of the project :
```
npm install
```

If everything runs without errors, you're good to go!

### Quick Start

After the installation, you can then compile the project :
```
npm run build
```

On succesful compilation, you can host a local instance of the project :
```
npm start
```

For hot-reloading functionalities for development :
```
npm run dev
```

A local instance of the project should then be available on http://localhost:8080/.

## Technologies / Frameworks

This project uses :
* [Handlebars](https://handlebarsjs.com/guide) for page templating
* [Grunt](https://gruntjs.com) for task automation
* [Express](https://expressjs.com) for the web framework
* [Docker](https://www.docker.com/get-started) for virtualization
* [ESLint](https://eslint.org/docs/user-guide/getting-started) for enforcing coding style

## Project Structure

This project uses a module-based structure. What this essentially means is that each part of the project is divided into individual modules, where each module provides an extension to the features provided by the `core` module. This allows each part of the project to be intuitively separated. Each module systematically has the following files :
* `models.ts` - contains the type or interface definition of the objects in the corresponding module
* `services.ts` - contains the business logic behind the features of the module
* `controller.ts` - code to bridge the model and its corresponding view, handles request reception and response rendering
* `helpers.ts` - utility functions to keep code clean
* `index.ts` - entry point of the module, serves as the interface of the module to the outside
* `routes.ts` - route definition of the corresponding module

Available modules :
* `auth` - handles authentication (logging in, logging out, session handling, etc...)
* `common` - an abstract module to inherit from
* `core` - module for the basic functionalities, concerning members and consultants.
* `sg` - module which handles secretarial functions

The documentation for each module will be specified in their respective directories. The extension of each functionality corresponding to different units will require the creation of a new module corresponding to the unit (`ua`, `treso`, etc...).

Please see the [Nuclino](https://app.nuclino.com/ETIC-INSA-Technologies/Keros) for information
