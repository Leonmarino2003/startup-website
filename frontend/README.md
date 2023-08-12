# Readme file for the frontend.

# Folder structure

## Components

### This folder is for our modals/components, if you're unsure as to what a component is, check the readme in the components folder.

## Pages

### With the way that the webapp is structured, we have very few pages; think of these as separate screens that require re-rendering the page. You probably won't need to add new pages.

## Public

### The public folder is accessible throughout the app and is useful for storing things like a static image. You don't need to navigate to the public folder, src="/image.png" will default to the public folder.

## Redux

### This is where we manage our states using Redux. Which language the app should display in, what currency bids should be placed in, and which component should render and with what content is called from here.

## Services

### This folder is for talking to the backend, and some niché functions we may want to reuse across the app. Read more in the folder's readme file.

## Styles

### This is where our global CSS resides. Module CSS goes in the component folder with the respective component. You can read more how and when to use module or global CSS in the readme file in this folder.

## Utilities

### This folder is for weird or niché functions that we may want to reuse.

## Generated folders

### .next and node_modules contain dependencies that the app requires to function. You don't need to go into these folders.

# Necessary files

## Gitignore

### You should have a .gitignore file in the frontend root folder including node_modules, .env and .env.local files, .vercel, /build, and so on.

## Next Config

### next.config.js contains all the routes. They should all lead to localhost:3000 in the dev branch, but must be changed to Heroku when updating the Main branch.

## Package.json

### This file, and the package-lock file, are generated when you run npm install inside the frontend folder, and is necessary for all dependencies. If you're running into an error and a dependency has been added to the app, you'll need to run npm install again.

## Env files

### You will need an .env.local file in your frontend root with the public access token. This file should be in the gitignore and never be uploaded. Ask the other team members for the access token if you don't have it.


