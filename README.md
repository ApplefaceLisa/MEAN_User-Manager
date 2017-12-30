# AngularJS
## homework #6 - using route

Start with a good example at W3Schooles.com:

http://www.w3schools.com/angular/tryit.asp?filename=try_ng_w3css

It shows a list of users (which is in a JS array) and allows NEW / EDIT on a selected user.
This homework is to enhance this app in the following way:

1. Add a few new fields such as Title, Sex, Age. It should be to all aspects, including list, new, and edit;
2. Implement filtering / searching and sorting to the User list.
3. Implement 'Delete User' - add a new column in the User list. In this column, each rows shows a
'delete' icon. By clicking it, the selected user will be deleted from the list (and the JS array).
4. Implement paging / pagination by having 'Prev Page' and 'Next Page'. (the size of each page is
pre-defined, such as 20).

Note: You should create your own code files for this.

## Homework 7
This homework is to enhance this app in the following way:

- To split the page into 3 separate 'pages': User List, New User, and Edit User.
- Each page will be actually a `<div>` and will be displayed as part of index.html.
- It is controlled by AngularJS via `ng-view`.

Two things may be needed to complete this homework:
1. Need to learn how to use `ng-view`;
2. May need to run this within a web server (until you turn off the web
security in a web browser).

## Homework 9
This homework is to enhance this app in the following way:
To create an angularJS service that encapsulates the USERS array and all the other shared functions. The instance of this service will be shared among all the controllers.

Two things may be considered to complete this homework:
1. It's up to you to choose a form of the service: Factory, Service and Provider, and leverage as
much of its functionality as possible.
2. It's up to you to decide which functions will be in this service. However, there should be no
global objects (data or functions) after this homework.

# NodeJS
## Homework 4
Enhance this app in the following way:

To create an expressJS application that:
- implement the complete REST API for user management (CRUD) in the expressJS app, with necessary routes and http methods.
- update your angularJS app's service to call this expressJS app to access the user array completely.

[repo](https://github.com/ApplefaceLisa/MEAN_User-Manager.git)

# mySQL
### [Using MySQL Database from Node.js [Guide]](https://www.freelancer.com/community/articles/using-mysql-database-from-node-js-guide)
### [Using MySQL with Node.js & the mysql JavaScript Client](https://www.sitepoint.com/using-node-mysql-javascript-client/)
#### How to use MySQL in Node in 5 easy steps
1. Create a new project: `mkdir mysql-test && cd mysql-test`  
2. Create a package.json file: `npm init –y`  
3. Install the mysql module: `npm install mysql –save`  
4. Create an `app.js` file and copy in the snippet below. Connecting database.  
```
//app.js

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: <host_name>,
  user: <user_name>,
  password: <password>,
  database: <database_name>
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
```
5. Run the file: `node app.js`. Observe a “Connected!” message.

#### Using mySQL workbench create a database called `sitepoint` and a table called `employees`.
```
CREATE TABLE employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  location varchar(50),
  PRIMARY KEY (id)
)

INSERT INTO employees (id, name, location) VALUES
(1, 'Jasmine', 'Australia'),
(2, 'Jay', 'India'),
(3, 'Jim', 'Germany'),
(4, 'Lesley', 'Scotland');
```

#### Executing Queries
1. Reading / GET  
```
// Get all
connection.query('SELECT * FROM employees', (err,rows, fields) => {
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});

// rows in console:
  [ { id: 1, name: 'Jasmine', location: 'Australia' },
  { id: 2, name: 'Jay', location: 'India' },
  { id: 3, name: 'Jim', location: 'Germany' },
  { id: 4, name: 'Lesley', location: 'Scotland' } ]


// Get by id
var id = 2;
connection.query('SELECT * FROM employees WHERE id = ?', [id], (err,rows, fields) => {
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});

// rows in console:
[{ id: 2, name: 'Jay', location: 'India' }]
```
2. Creating / POST  
```
const employee = { name: 'Winnie', location: 'Australia' };
connection.query('INSERT INTO employees SET ?', employee, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});
```
3. Updating / PUT  
```
connection.query(
  'UPDATE employees SET location = ? Where ID = ?',
  ['South Africa', 5],
  (err, result) => {
    if (err) throw err;

    console.log(`Changed ${result.changedRows} row(s)`);
  }
);
// OR
const employee = { name: 'Winnie', location: 'Australia' };
connection.query(
  'UPDATE employees SET ? Where ID = ?',
  [employee, 5],
  (err, result) => {
    if (err) throw err;

    console.log(`Changed ${result.changedRows} row(s)`);
  }
);
```
4. Destroying / DELETE  
```
connection.query(
  'DELETE FROM employees WHERE id = ?', [5], (err, result) => {
    if (err) throw err;

    console.log(`Deleted ${result.affectedRows} row(s)`);
  }
);
```
