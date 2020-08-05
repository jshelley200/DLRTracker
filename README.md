# DLRTracker
The purpose of this project is to determine the time that the DLR train will arrive at a selected station and display a countdown to arrival.

## Description
This project could have been done using AJAX request (XMLHttpRequest obeject) but the requests were handled serverside to practice use of express.js. This may be changed in the future with the express portion of the project handling log-in or other pages/calcs

## Known bugs
    - Time errors / time to arrival shown as NaN on heroku

## Upcoming improvements / To-do
    - Login system / cookies to remember user (bcrypt)
    - Cookies to Remember previously selected station dependant on station search
    - Format re-design using better css techniques (flexbox / grid) :heavy_check_mark: (partially, grid not yet used)
    - Possible move to ejs from pug
    - Store availble trains in db (SQLite or MongoDB)
    - Fix time errors / NaN on heroku
    - Change Query to XMLHttpRequest to node server
    - Add support for other lines outside of DLR
