# 3 options to work with MongoDB:

- Mongo Atlas (DB that are available globally in the web)
- MongoDB Compass ( Additional App with special interface, work only with local DB in your computer)
- MongoDB Shell (the same as MongoDB Compass, allow to work with MongoDB using VScode terminal)

# MongoDB ( No SQL database, no tables database )

- All the data in MongoDB is stored in BSON format (similar to JSON ). BSON - Binary JavaScript Object Notation.
- BSON - is working faster with the data than JSON (search and processing). BSON uses more space for Data than JSON.

- MongoDB uses collections and documents (document -> each file in collection)
- Collections - it is sub database that group the data by using some type (EXAMPLE --> movies, directors,....)
- Each document can have different structure and properties.

```JS
//This is document example-->
//with such a structure

{
    "title" : "Pulp Fiction",                        //<--string (different data types)
    "director" : "Quantin Tarantino",
    "year" : 1994,                                   //<--number (different data types)
    "genres" : ["crime", "dramma"],
    "reviews" : [{"name": "Jack", "text": "Amazing movie"},{"name: "Tom, "text": "Super cool"}],       //<--Array ( different data types), attached documents
    "duration": {"hours": 2, "minutes": 34},           //<--object type , attached documents
    "rating" : 8.9
}
```

- Each document inside collection creates their oven --> Id , with special data type --> ObjectId (it is unique Id)
- You can work with MongoDB using:

1. MongoDB Shell from VScode terminal or
2. MongoDB compass (Additional App with special interface, work only with local MongoDB, more convinient way to work with MongoDB than MongoDB Shell)

...............................................................................................................................................

After installing MongoDB on VScode --> to start working you should write in terminal -->

```JS
npm i mongodb  //<--mongodb installation
```

```JS
mongosh   //<-- it will invoke MongoDB shell
```

```JS
npm i mongoose  // it will install mongoose library, database acces through VScode
```

# MongoDB Shell

- It is an environment inside terminal which allow to make different commands and interact with MongoDB. (MongoDB Compass has the same functionality, but showing all the changes to the user, easier more convinient way than MongoDB Shell)

### we use VScode terminal to work with MongoDB Shell:

```JS
show dbs                     //<--will show all available databases which are stored in MongoDB

test>                       //<-- if terminal line starts from this code , it means that you are in the test database(working with test database)

use nameOfTheDatabase       //<-- this command will allow to go to another database and work with it, (Example --> use moviebox)

cls                        //<--will clear terminal from previous commands

help                       //<-- will show all commands (basic commands)

show collections          //<--to show all collections which are present in that database that you have entered before

db                        //<--to check in what database we working now

db.movies                  //<-- will create movies collection (db <-- your database name, Example --> Moviebox.movies)

db.movies.drop()          //<-- will delete movies collection

```

### Commands to use

```JS

db.movies.insertOne({"title": "Snatch", "director": "Guy Ritchi", ...})   //<-- One document that we are inserting to movies collection (db <--is a current database that you are working with)

db.movies.insertMany({"name": "John"},{"name": "Max"},...)           //<-- can insert many documents to movies collection (db <--is a current database that you are working with)
```

```JS
//Find some values

db.movies.find()    //<-- will show info from movies collection in the terminal (db <--is a current database that you are working with)



db.movies.find({director: "Quantin Tarantino", rating: 8.9})   //<-- will show films which are matching this request
//if collection has many (as an example 1000 results by this request) they will be shown in block by 20 documents in each block
```

If collection has many (as an example 1000 results by this request) films with this info --> after using this command, terminal will show them with blocks in 20 documents in each block, this optimises the processing and interactions with database, to don't your computer freeze or fail to load all 1000 documents at once in the terminal (as example).

to see second block --> next 20 documents iy that collection, we need to use command:

```JS
it  //<--to go next block, to see another 20 documents in the collection
```

Each document can have many fields with data, but not all the fields we want to see after request. Then we can request only specific fields in request.
If we want to return only certain info from document:

```JS
db.movies.find({director: "Quantin Tarantino"},{title:1,director:1})  //<-- this request will return only documnts where director = Quantin Tarantino and title, director fields from all document and nothing else


db.movies.find({},{title:1,director:1})   //<-- there is no parametrs, and will show all documents with title and director fields
```

find method is loop through all the elements in the collection and returns matching results. To optimise the current process and we know that we need to return only one element from collection we need to use another method -->

```JS
db.movies.findOne({_id: ObjectId("2333.....")})   //<-- in this method always we are passing id, because id is unique, we have to write -> ObjectId("...."), to avoid an error

db.movies.findOne({_id: ObjectId(".....")},{title:1})  //<--also works in this example and will return only 1 field -> title
```

```JS
db.movies.find().count()     //<--will show total number of documents in this collection(movies)
db.movies.countDocuments()   //<--will show total number of documents in this collection(movies)

db.movies.limit(5)   //<--we will receive only 5 documents back, this example uses chaining (method find and method limit are linked using dot)
```

### Sort some value from collection (sort data)

```JS
//we use chaining method, using different methods and connect the together using dot

db.movies.find({director:"Quantin Tarantino"}).sort({rating: -1})  //sorting by descending rating
```

### Operators

- we use operators to make find method more specific,(Example --> we want to find all films with rating 8.9 and higher)

```JS
//different oparators-->
//$gt <--means greater than
//$lt <--means less than
//$gte <--greater and equal than
//$lte <--less and equal than
//$eq <--equal
//$ne <-- not equal
//$or
//$in  <--include
//$nin  <--not include
//$all
//$set  <--update
//$inc  <--increment

db.movies.find({rating:{$gt: 8.9}})   //<--will show all the movies with rating 8.9 and higher

db.movies.find({rating:{$lt: 8}})   //<--will show all the movies with rating less than 8

db.movies.find({rating:{$gte: 8}})   //<--will show all the movies with rating 8 and higher , including rating 8

db.movies.find({rating:{$eq: 8.8}})   //<--will show all the movies with rating 8.8 only, works the same as --> db.movies.find({rating: 8.8})

db.movies.find({rating:{$ne: 8.8}})   //<--will show all the movies except movies with rating 8.8
```

### Complex Queries

- request contains operator and exact value (Example --> review 8 > and director: "Quantin Tarantino")

```JS
db.movies.find({$or: [{director: "Quantin Tarantino"},{director:"Guy Ritchie"}]})  //<--will show all the results that are matching with any of the requets

db.movies.find({$or: [{director: "Quantin Tarantino"},{rating:9.2}]})              //<--will show all the results that are matching, (all Tarantino movies + all movies with rating 9.2)

db.movies.find({rating:{$in: [7.8,8.2,8.3]}})               //<-- will show movies with rating 7.8, 8.2, 8.3

db.movies.find({rating:{$nin: [7.8,8.2,8.3]}})               //<-- will show all movies except rating 7.8, 8.2, 8.3
```

### Querying Nested documents

```JS
db.movies.find({genres:"crime"})  //<--will show all the movies which have crime in genres

db.movies.find({genres:["crime"]})  //<--will show movies where only crime in genres

db.movies.find({genres:["drama", "crime"]})   //<-- in genres will be drama and crime only, only in this order will be searched (Example--> if movie will have - crime, drama, it won't show in this request, it is better to don't use this method), In these case it is better to use operator - all

db.movies.find({genres:{$all:["drama", "crime"]}})   //<-- will show all movies with drama and crime. Order is not important, can be crime and drama,

db.movies.find({"reviews.name": "Jack"})   //<-- use when we have nested object in the array, will return Jack's reviews
```

### Deleting documents

```JS
db.movies.deleteOne({_id:ObjectId('.....')})    //<--delete one document

db.movies.deleteMany({director:"Guy Ritchie"})   //<-- delete many documents, all movies where director: Guy Ritchie
```

### Updating documents

```JS
db.movies.updateOne({_id:ObjectId('.....')},{$set:{rating:10, year:1995}})  //<-- this document's rating nad year will be changed, and new values for rating and year will be --> rating:10, year:1995

db.movies.updateMany({director:"Guy Ritchie"},{$set:{rating:10}})  //<-- all "Guy Ritchie" movies rating will be changed to rating:10

db.movies.updateOne({_id:ObjectId('.....')},{$inc:{year:2}})       //<-- will increase the year +2 for this document

db.movies.updateMany({},{$inc:{"duration.minutes":-2}})    //<-- will decrease minutes -2 for all documents

db.movies.updateOne({_id:ObjectId('.....')},{$pull:{genres:"drama"}})   // will take out/pull out(delete) from the genre list --> genre: drama for certain document

db.movies.updateOne({_id:ObjectId('.....')},{$push:{genres:"drama"}})   //will add new genre: drama --> to the list of genres for certain document

db.movies.updateOne({_id:ObjectId('.....')},{$push:{genres:{$each:["drama","comedy"]}}})   //will add few genres to ceratin document
```

#### Separate response

We know that comand:

```JS
db.movies.find()
```

will return full list, all the documents of movies collection and the list will be displayed as one piece of text, all documents will be together. It is hard to read and find particular document.

Using sample below, will help to separate each document and will be easier to read and find certain document in the list

```JS
db.movies.find().pretty()
```

### Search documents by different criteria

- We can search document by absent fields

```JS
db.movies.find({rating:null})    //will find document where is no rating field , rating field not existing in this document
```

- Find how many different years(variety) present in our collection, will show only different years that are used in all documents in certain collection (similar years won't be shown). It is useful to know all the values to put them in the UI in sort or filter block in Front-End

```JS
db.movies.distinct("year")   //will show an array of different years that are presenting in our collection

db.movies.distinct("genres")  //will show an array of different genres that present in our collection
```

### Change document

```JS
db.movies.replaceOne({_id:ObjectId('.....')},{title:"Alien"})   // will replace the title or add if the title doesn't exist
```

### Operator

```JS
db.movies.find({$and:[director:"Quantin Tarantino"]},{rating:9.2})   //will show the document that are corresponding,matching to all 2 requests
```

# Commands to work with MongoDB Shell

```JS
version()  // check MongoDB Shell version

db.dropDatabase()  // will delete database will all collections and documents in it

db.getCollectionNames()  //the same as --> show collections, but this command will show collection in array

show users   // will show users array, list of users with their fields and users data for current database

db.directors.drop()  // will delete unwanted collection --> directors

db.getCollectionInfos()  //will show all available info for the current collection, info -> type, uniqui id, readOnly:false --> support all CRUD operations

db.createCollection("directors")  // will create directors collection

db.movies.renameCollection("movies2")  // rename collection movies for movies2

db.movies.validate() // will check correct filled fields in the collection ,(structure, errors -> warning[...], errors[...]), if there is no errors --> valid:true

db.movies.totalSize()  // will return collection size in bites (with indexes)

db.movies.storageSize()  // will return collection size in bites (without indexes)

db.movies.stats()  // can track all the operations that was performed with this collection, full info about collection(size, element numbers, info about operations with this collection)

db.hostInfo()   // will return server info
```

# Commands in VScode terminal

```JS
show databases;

use <database name>;  // can be any name of database, we indicate what db to use, if it doesn't exist it will create this database, with such a name

db.createCollection("users")  // will create collection and the name of collection will be users

show collections;   // will show all collections in current db

db.dropDatabase()  //delete db

db.users.insertOne({name:"John", age:25 })  // add 1 document to users collection

db.users.find()  // will show all documents in users collection

db.users.insertMany([{name:"Max",age:27},{name:"Jack",age:16},{...}])  // can add many documents to users collection

db.users.find({age:25})   //<--using a "age" key we can find all users who have age = 25

db.users.find({age:25, name:"Max"})   //<--we can use 2 parametrs, it will find documents with this info

db.users.find({$or:[{name:"Jack"},{age:32}]})   // will show documents eather by searching by first parametr or second, if both exists ->will show documents from both parameters

db.users.find({age:{$lt:30}})  // will show all users whos age is less than 30 (less than)

db.users.find({age:{$lte:30}})  // will show all users whos age is equeal or less than 30 (less or eaqual)

db.users.find({age:{$gt:28}})  // will show all users whos age is greater than 28 (greater than)

db.users.find({age:{$ne:28}})   // will all ages apart from age=28 (not equal)

db.users.find().sort({age:1})  // sorting by age, ascending(age:1) and descending(age:-1)

db.users.updateOne({name:"Michael"},{$set:{name:"Tom", age: 79}})  // will change name -> Michael on Tomand age= 79

db.users.updateMany({},{$rename:{name:"fullName"}})   //will change all documents name for - fullName

db.users.deleteOne({age:27})   // will delete users with age =27

db.users.update({fullname:"Jack"},{$set:{posts:[{title:"JavaScript", text: "js top"},{title:"mongo", text: "mongo database"}]}})   // creating and adding fields --> posts to user Jack ( one to many relationship link, one user can have many posts)

db.users.findOne({fullname:"Tom"},{posts:1})  // will show only Tom's posts

```
