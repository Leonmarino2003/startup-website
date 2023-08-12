#### First time installment

For first time installment of the environment you need to do a npm install in both the Backend AND Frontend folder. To start the dev servers it is:

- npm run devStart for backend
- npm run dev for frontend
- Always start the backend server first, and then the frontend, reason for this is backend is hardcoded to use port 3000 while frontend can dynamically change port.
- Also make sure both folders have a .env file with the required enviroment variables
- Manage the app as a dev

We do not wanna make any changes directly in the main branch because thats the branch that is hooked up to the deployment.
We also do not wanna write code directly in the dev branch, but instead each time we wanna add a feature or fix a bug (write any code) create a new branch from the dev branch, and then when you are done, merge it into dev.

#### Merge from your branch to dev

- git checkout dev
- git pull
- git checkout YOUR BRANCH
- git merge dev
  FIX EVENTUAL MERGE CONFLICTS ON YOUR BRANCH, Test that everything works again, git add, git commit, git push
- git checkout dev
- git merge YOUR BRANCH
- git push

### Deploy a new version

We deploy our frontend on Vercel and our backend on Heroku.

Vercel login:
login using github through the LIA-Startup account

Heroku login:
regular email and password login

[Login Credentials](https://trello.com/c/E6yioHiL/17-account-detailsgithub-mongodb-trello-figma-gmail-eniro-api-facebook-mapbox-api)

#### Deploy frontend

- git checkout main
- git pull
- git checkout dev
- git merge main
- git checkout main
- git merge dev

When that is done we need to connect the frontend to the "real" server backend.

In the next.config.js file change the destination from localhost to the heroku server. (https://dev-branch-server.herokuapp.com)

- git add --all
- git push

Now the frontend is deployed on Vercel

#### Deploy backend

- Login in on Heroku.com
- If you don’t have heroku installed. Go to deploy and select Heroku CLI and follow the steps there(once)
- Create a new folder for the server, not the same as the "original" project
- Open a new VScode and open the folder you created
- Open the terminal and write `heroku login` the browser will be opened and just do as you are instructed to do
- `heroku git:clone -a dev-branch-server`
- `cd dev-branch-server`
- Now you should have the old code that is currently deployed on Heroku. So it’s time to make the changes, you can just copy them from the original project backend folder(main branch)(don't copy node_module, .env, readme files)
- `git add .`
- `git commit -am "MESSAGE"`
- `git push heroku main`
- You can remove the dev-branch-server folder if you want, if you keep it you can start from step 8 next time

## Environment variables

##### local

Navigate to the [Google Drive](https://drive.google.com/drive/u/2/my-drive) and download env and env.local. Drag the env to your backend folder and rename it to `.env`. Drag the env.local to your frontend folder and rename it to `.env.local`

##### Vercel

If you ever need to add new environment variables to Vercel, here is how:
go to the project on Vercel and click on the Settings tab, then Environment Variables and just add a new one

##### Heroku

Navigate to the dev-branch-server project on Heroku, go to Settings, click on Reveal Config Vars and add a new one if ever needed
