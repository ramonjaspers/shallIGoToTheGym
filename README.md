# Shall I go To The Gym information
This is a project made by Ramon Japsers for his frontend module on NOVI University. 
This app informs end users how to reach their desired fitness goals and a healthier lifstyle. It gives advice to go to the gym or not and can create a workout for the user to execute. 
<!-- add image -->
## Main functionalities:
- Generating advice to go to the gym or not (based on questionnaire)
- Giving a workout (based on questionnaire)
- Calculating TDEE
- Giving information about fitness goals
- Exercise finder

## Install the application
Open a terminal app of choice cointaining a NPM installation. If you do not have NPM installed follow the NPM installation manual https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
If you got this covered continue.
### Navigate to the project root
Example given how to reach your project in a terminal
```bash
$ cd ~/Code/shall-i-go-to-the-gym
```
Execute the following commands from your project root. If this is not done from the current project's root the commands shall not work as intended.
### Install modules
```bash
$ npm ci
```
### Running the application
```bash
$ npm start
```
After running the app the app should be available on `localhost:3000` in your browser.
### Running Unit Tests
```bash
$ npm test
```

## Creating an account
In order to access the user profile an account needs to be created. This can be done by navigating to `http://localhost:3000/signup`. Use an email, password and username of choice e.g.
* Username: BuffHuman
* Email: example: buffhuman@strong.com
* Password: example: strongerThanUrM0m
<!-- image of signup -->
## Sign In
After registering the user will be transferred to the login page `http://localhost:3000/login`. On this page you can now log in with your given username and password e.g.
* Username: example: BuffHuman
* Password: example: strongerThanUrM0m
<!-- image of login -->
