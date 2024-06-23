# SQL

- it is the language that helps to work and connect to DB ( such as MySQL, PSQL, SQL Server, Oracle, etc.) through Database Management System (DBMS)
- MySQL, PSQL, SQL Server, Oracle, etc. - are Database Management System (DBMS)

# When working with PSQL

- Running a file with PSQL
- pslq allow to write and read commands from the file
- create file (for example) --> data.sql
- SQL statements can also be written in a file and then run with psql to make the code reusable with the following commands:

```JS
// in terminal we write

//to print output to the terminal
psql -f data.sql


//to print output to an example.txt file
psql -f data.sql > example.txt
```

- write all needed commands in the file (as example) -->

```JS
// in data.sql file

DROP DATABASE IF EXISTS my_database;
CREATE DATABASE my_database;

\c my_database

-- create tables

-- insert into tables

-- select from tables
```

# DBeaver

- supports all popular databases, it is an instrument that can control DB
- allow to interact with our DB, where we indicate the data from ElephantSQL or connecting to local DB
- DBever must connect either to local DB or network DB.
- DB should already exist locally or on hosting website when we are connecting DBeaver to DB.

Steps to follow when working with PSQL + ElephantSQL + DBeaver:

1. psql local --> creating DB
2. DBeaver --> connecting to DB, indicating - Database name, Username, password (all details from DB to access it)

- If we are working with local PSQL - we can interact with DB, create tables, insert the data to the tables etc. using VScode (psql -f data.sql) or through DBeaver.

# PSQL + ElephantSQL

- go to ElephantSQL, getting a link from there and inserting that link to URL in the .ENV (server.js)
- then connect DBever with ElephantSQL
- then creating abd inserting all the data into our tables in DBeaver --> INSERT INTO
- put all the commands in the DBeaver to create and insert the tables (data.sql file --> invoke commands only for local use only, for hosting we add the same commands in the DBeaver)

- ElephantSQL - allow us to create all the details that needed to connect to our DB ( DBeaver )
- ElephantSQL - creates Server name, user, password, URL connection to database (link
  )

# MongoDB

- go to Mongo Atlas ( MongoDB hosting , our DB in the web)
- connect new cluster ( creating new cluster)
- take the link from Mongo Atlas (link to our database) and we put this link to .ENV file (Back-End ) to URL in the server.js file in VScode.
- We changing the link from Mongo Atlas inserting all the data from our DB to USERNAME, PASSWORD, DATABASE name
- then we go to Render.com , go to Environment section (.Env secrets from our project we put to Environment section)
- then we make a pull from GitHub --> Manual Deploy --> Deploy latest commit
- each time when you hosting new Back-End project to the Render.com --> Render.com creates new link to your Back-End

# SQLite -local

1. Creating file --> db.js ( here we will have DB connection)
2. Creating SLQ file (here we will create all needed tables, and inserting the data into it --> example --> mysql.slq)
3. Download extenstion --> SQLite to VScode (ctr + shift + p <-- reload VScode)
4. In sql file (mysql.sql file) we write

```JS
DROP DATABASE IF EXISTS my_database;
CREATE DATABASE my_database;

\c my_database

CREATE TABLE(....)
```

5. then in VScode we press --> ctr +shift + p or View/command Palette --> write SQLite:Run Query
6. then we choosing our DB file --> we click on that file that we created --> db.js
7. We delete command --> CREATE TABLE(...)
8. INSERT INTO(....) <--inserting data to the correct table and then SQLite:Run Query
9. we delete all commands --> and put SELECT \* FROM(...) <--it will show our table with data
10. Save --> SQLite;Run Query
