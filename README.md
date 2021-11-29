# ZCC-TicketViewer

Zendesk Ticket Viewer is an application developed as a part of Zendesk Internship Coding Assessment.

* The Challenge is to use zendesk api's and make a replica of zendesk ticket viewer panel.
* The application takes in Zendesk sub domain name, username and password to fetch tickets
* Individual Tickets can be viewed upon clicking the row of any ticket

>NOTE : The application requires a username and password that has enabled API authentication using an agent's email address and password) 


The application is developed using ExpressJS (NodeJS) backend and AngularJS frontend.
>NOTE : make sure to install NodeJS before attempting to setup the application

To setup the application follow the below setups

* Uncompress the downloaded project at your desired location and open the application folder in your terminal and run the cmd ```npm install```
  This will install the required node_modules of ExpressJS backend app
* Go to ticketviewerUI folder in your terminal and run the cmd ```npm install```
  This will install the required node_modules of AngularJS frontend app
 
The application can you be ran in two different modes ( dev | prod )

To run in dev mode
* Start the express app, goto the main application folder in a terminal window and run the cmd ```node app.js``` 
* And in a different window goto the ticketviewerUI folder and run the cmd ```ng serve```
      
  This will start the backend at locahost:8000 and the angular UI in dev mode at localhost:4200. 
  You can go and checkout the ticketviewer at localhost:4200  
  
To run in prod mode
* Goto ticketviewerUI folder and run the cmd ```ng build --prod``` to build the angular application

* Once done go back to the main application folder in the terminal window and run the cmd ```npm start```. This will start the expressJs app bundled with the angularJS UI as a static content. You can go ```localhost:8000``` using your browser and checkout the ticketviewer. 
  
To run backend Unit Testing
* Goto the main application folder in your terminal window and run the cmd  ```npm test```
  >NOTE : make sure to update the credentials in the cred.json file under test folder before running the npm test)
        
To run frontend Unit Testing
* Goto the ticketviewerUI folder in your terminal window and run the cmd ```ng test```

