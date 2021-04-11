# Calculate Exchange Rates from USD

#### What This Project Does
* exchanges an amount of United States dollars into an amount of chosen foreign currency
* offers exchange to five foreign currencies

#### By _**Tyler Sinks**_

## Technologies Used

* _CSS, html5, JavaScript_
* _app.exhangerate-API, webpack, npm_
* _Bootstrap, jQuery_
* _see package.JSON for thorough list of dependencies_

## Description
* takes in an amount of US dollars (USD)
* takes in a destination currency for exchange amount determination
* shows the current amount in destination currency would indicated US dollar amount be exchanged
* ignores any anticipated exchange-service or broker fees

## Setup/Installation Requirements

**Download the repo:**
1. Go to https://github.com/sinkstyt/usd-exchange
2. Click the green ![green download Code button](src/assets/images/code_button.png) button on middle upper right part of webpage.
3. Click on "Download ZIP"
4. Navigate to the downloaded zip and double click it.
5. Open the folder with the same name that is now unzipped.
6. Double-click on the HTML file to open it in your default browser.

**Clone the repo:**
1. Go to https://github.com/sinkstyt/usd-exchange
2. Click the green ![green download Code button](src/assets/images/code_button.png) at right edge of the tab bar atop this README.
3. Copy the HTTPs address to your clipboard.
4. Open terminal or bash and navigate to or create a directory into which you will store the entire project on your machine.
5. Once you have switched into your desired directory, in your terminal or command line prompt, enter the following:
> `$ git clone https://github.com/sinkstyt/usd-exchange` and press <kbd>ENTER</kdb>
6. Change directory into the new root folder of this project
> `$ cd usd-exchange`
7. Type "code ." into your terminal to launch your default text/code editer at this directory
> `$ code .`
8. Right click click on the index.html in the file explorer (VS Code) and select "copy absolute path"
9. Launch your web browser and paste your clipboard contents into the address bar
10. Press <kbd>ENTER</kdb> or click "Go"

## How to Get Your Own API key
1. Navigate to https://www.exchangerate-api.com/
2. Create a file named ".env" at the root directory of this project repository
> `{FULL_FILEPATH_TO_THIS_REPOSITORY}- $ touch .env`
3. Ensure .env appears in file, also at the root of the project, ".gitignore"
4. Stage the saved .gitignore file and commit now to prevent accidental sharing of API key
> `$ git add .gitignore`
> `$ git commit -m "add environment vars file to .gitignore"`
5. At https://www.exchangerate-api.com/ click "Get free key" button after entering your email address
6. Copy the alphanumeric after "Your API key:"
7. Paste into .env file after `API_KEY = ` &emdash; do _not_ wrap your key in quotes or apostrophes

## Known Bugs

* _The site is not yet built_
* _but this README is off to a good start_

## License
_MIT 2.0_

Copyright (c) 2021 **_Tyler Sinks_**

## Contact Information
* Reach Tyler: via <a href="https://www.linkedin.com/in/tyler-sinks-93438137/" target="_blank">LinkedIn</a> or <a href="mailto:tyler.sinksa@gmail.com" target="_blank">email</a>.<br>
Checkout Tyler's <a href="https://github.com/sinkstyt" target="_blank">GitHub profile</a>.</li>