# Database Usage

## Contents

-   [Function Documentation](#function-documentation)
    -   [Get](#get)
    -   [GetAll](#getall)
    -   [New](#new)
    -   [Set](#set)
-   [Basic Usage](#basic-usage)
-   [Collections Overview](#collections-overview)
-   [Collection Data Specifications](#collection-data-specifications)
    -   [Student Accounts](#student-accounts)
    -   [Organization Accounts](#organization-accounts)
    -   [Volunteer Postings](#volunteer-postings)
    -   [Volunteer Applications](#volunteer-applications)

## Function Documentation

The four types of functions you may need are `get`, `getAll`, `new`, and `set`. Each collection has these four functions.

### Get

The `get` function is how you look for something in a collection. You give it a query object of a key/value to look for and it will return the document from the collection if it finds one, or null if there is no match. Here's the general format:

`await DB.get<Collection_Name>( {queryKey: queryValue} );`

Current `get` functions: `getStudent`, `getOrg`, `getPosting`, `getApplication`.

### GetAll

The `getAll` function is how you look for more than one of something in a collection. You give it a query object of a key/value to look for and it will return an array of matching documents. By default, a max of 50 documents will be fetched; this be be modified by declaring the optional `limit` option.

`await DB.getAll<Collection_Name>( {queryKey: queryValue} );`  
OR  
`await DB.getAll<Collection_Name>( {queryKey: queryValue}, {limit: 123} );`

Current `getAll` functions: `getAllStudents`, `getAllOrgs`, `getAllPostings`, `getAllApplications`.

### New

The `new` function is how you create a something in a collection. You give it an object of properties for the new document and it will first verify them and second create and save a new document to the collection. It returns `true` if the document was saved successfully, or `false` if something went wrong. Here's the general format:

`await DB.new<Collection_Name>( {key1: val1, key2: val2 } );`

Current `new` functions: `newStudent`, `newOrg`, `newPosting`, `newApplication`.

### Set

The `set` function is how you update something in a collection. You give it an updated version of a document (an object from `get` with updated properties) and it will update it in the database. It returns `true` if the document was successfully updated, or `false` if something went wrong.

`await DB.set<Collection_Name>(newData);`

Current `new` functions: `setStudent`, `setOrg`, `setPosting`, `setApplication`.

See the docstrings attached to each function for further description of the correct usage for each function. You'll only need to use the `get`, `new`, and `set` methods for each collection. The other methods are used internally.

## Basic Usage

```js
// First import the database from db.js in the database folder.
const { Database: DB } = require("./database/db");

// All of the database functions are asyncronous meaning that you have to "await" them. The code will wait while the database function completes.
// You can only use "await" in asyncronous functions so you have to make one if your function isn't asynchronous.
async function myTestFunc() {
    // The database must be initialized ONLY ONCE for the whole program before calling any functions.
    await DB.init();

    // To query, or get an item from a collection, use the 'get' function and specify the search criteria.
    // For example, to search for a student's account by their email:
    var studentAccount = await DB.getStudent({ email: "cool@email.com" });
    console.log(studentAccount); // the account information, or null if no match for query.

    // To create a new item from a collection, use the 'new' function and pass any fields to fill in. It will be saved to the database.
    // For example, to create a new organization account with some sample information from their signup:
    var orgInfo = {
        email: "super.secret@company.org",
        password: "ABC123",
        profileInfo: {
            orgName: "The Coolest Company",
            contactName: "John Doe",
            contactEmail: "john@company.org",
            contactPhoneNumber: "1234567890",
            description: "We are very cool.",
            more: "Like, the coolest",
        },
    };
    var result = await DB.newOrg(orgInfo);
    console.log(result); // Will be true if successful, or false if an error occurred.

    // To update an existing item in a collection, use the 'set' function and pass the updated document (from get).
    // For example, to change the title of a volunteer posting:
    var postingInfo = await DB.getPosting({ name: "Come Volunteer!" }); // First get the existing document for this posting.
    postingInfo.title = "The Coolest Opportunity"; // Change the posting title.
    var result = await DB.setPosting(postingInfo);
    console.log(result); // Will be true if successful, or false if an error occurred.
}

// Call the asyncronous function.
myTestFunc();
```

## Collections Overview

-   Student Accounts
-   Organization Accounts
-   Volunteer Postings (from organizations)
-   Volunteer Applications (by students)

## Collection Data Specifications

### Student Accounts

**Collection Name: `students`**  
**Current Version: `0`**

```js
DataProperties: {
    email: "",
    password: "",
    applications: [],
    profileInfo: {
        name: "",
        phoneNumber: "",
        bio: "",
        skills_interests: "",
        experience: "",
    },
}
```

### Organization Accounts

**Collection Name: `organizations`**  
**Current Version: `0`**

```js
DataProperties: {
    email: "",
    password: "",
    postings: [],
    profileInfo: {
        orgName: "",
        contactName: "",
        contactEmail: "",
        contactPhoneNumber: "",
        description: "",
        more: "",
    },
}
```

### Volunteer Postings

**Collection Name: `postings`**  
**Current Version: `0`**

```js
DataProperties: {
    author: null,
    title: "",
    date: "",
    description: "",
    duties: "",
    benefits: "",
    tags: [],
    applications: [],
}
```

### Volunteer Applications

**Collection Name: `applications`**  
**Current Version: `0`**

```js
DataProperties: {
    author: null,
    name: "",
    nsid: "",
    experience: "",
    email: "",
    major: "",
    message: "",
}
```
