# A-Card Client

## Overview

A-Card is a chip and PIN subscription-based card enabling holders to take control of their fuel management expenses. In addition to a generous discount towards fuel-rates nation wide, subscribers also enjoy access to our state-of-the-art expense management portal, providing real time access to online reports and current, up-to-date gas station prices. Whether you're a fleet manager or individual owner, A-Card can help you plan your fuel expenses in advance and help maximize your savings.

## Application

This application enables an A-card subscriber to manage fuel expenses through an expense management portal. Here, users can postulate fuel expenses for their motorvehicles and monitor total savings over a period of time. In addition to the generous discount rate of 5% offered for each purchase, Real time access to current fuel station data will enable an A-card subscriber to make better decisions on the respective gas stations they use to fuel their vehicles. Finally, continued subsciption to A-card earns a user rewards which can include discount rates of up to 20% and free trips to the gas station.

## Technologies Used

- HTML
- css
- Bootstrap
- Bootstrap min
- JavaScript - jQuery

## Unsolved Problems

1) Need to Incorporate pagination on transactions grid for a neater layout.
2) Have to figure out a way to conveniently enable subscribers to sort through expenses for weekly periods.
3) Have to create admin functionality on the front-end so that an A-card administrator can manage fuel station data and card discount rates without having to query the back end.
4) Need to develop a feasible many-many relationship between expenses and cards when A-card is expanded to include more than one card with differing discount rate benefits.

## Planning, Process and Problem Solving

1) Developed WireFrames, User Stories and ERD diagrams based on initial A-card expense management idea. These were evaluated by consultant Michael before I was given the green light to proceed with tackling requirements.
2) Followed Capstone Project schedule quite religiously. Set up Rails API and Heroku deployment based on guidelines. Decided I would use the ga-browser-template for this project while I improve my proficiency in front-end frameworks such as React and Ember.
3) Once API development for the MVC was complete, I moved on to the client (this) application. I began by performing authentication curl requests to the API before developing the login-page web app. Debugged and tested all authentication requests from web app thoroughly before moving on to resource development.
4) Once authentication development of the login-page was complete, I debugged and tested expense curl requests before building the web app. When I started with the MVC, I had both price and net total as required input fields for create and update actions.
5) In version 2 of project development, I condensed input fields for CU actions to include just vehicle information and hard-coded discount rate and added an additional fuel station field. I relied on the one-many relationship between the station and expense resources (where a station can have many expenses and an expense belongs to a station) to obtain the price and net total for display in the front end.
6) I realized that automobiles use primarily petrol or diesel, so I changed the vehicle field to a drop down list to ensure simplicity in establishing the one-many relationship as I could then easily index the station price based on the vehicle selected by looking to see if the vehicle consumed petrol or diesel. This price was then eventually used to calculate the net total and subsequently the total savings via the following formula:

- Total Gross = (price/gallon * Total Gallons)
- Total Net = (price/gallon * 0.05 * Total Gallons)
- Total Savings = Total Gross - Total Net

7) In version 2 of the project development, I created a drop down list for fuel station with names that correspond to those preset in the production stations table. The station_id can then be determined for each station name selected (I used a switch-case conditional algorithm to this effect) and obtained station_id for each create and update action. JSON returned contained all the fields of the stations table which I could then easily parse through to obtain values for display in the user interface.
8) Ensured appropriate page links for the transactions and fuel-rates page, as a deliverable for A-Card subscribers.
9) Styled layout using a sky blue theme for the navigational header and other colors that were easy to the eye. Bootstrap Buttons were designated appropriately based on the events they handled.
10) Finished with code clean up; removing unnecessary comments, debugger and console log statements.

Initially ran into issues establishing the one-many relationship. Confusion surrounded specific fields that should be present in each resource table. I would revisit the ERD and write out pseudo code to help me think through the problem at hand. I would also consult online forums such as Stack Overflow and reference the Rails API documentation.

### API Repository

https://github.com/axb6452/A-CardAPI

### Wire frames and User Stories

https://files.acrobat.com/a/preview/14dafb14-09a9-4d33-8709-e6ab1897615e
https://files.acrobat.com/a/preview/e573a199-4df6-4ed9-9a50-5c9bc1a8a934

### App Screenshot

![Alt text](https://drive.google.com/uc?export=view&id=1cHbLGeCFIGT3CF_ogi4DvlSuW3xWXYaU "Transactions Page screen shot")

### Deployed Paths

- Server deployed path: https://infinite-spire-29940.herokuapp.com
- Client deployed path: https://axb6452.github.io/A-CardClient
