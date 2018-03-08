# Townie

Townie is a town building app, users can create their own houses with residents and put them into the towns. I built this as my second project at [General Assembly](https://generalassemb.ly/).

## Overview
![towns view](https://i.imgur.com/aZKJlBB.jpg)
Check out the app [here](https://townie-project.herokuapp.com/)


To use the app you start by choosing a town and clicking it. In there you can click on houses to view them, or hit the new button and make your own house. Click on the house then click edit to edit or delete your house, don't forget your password!

## Technologies Used
* MongoDB with [MLAB](https://mlab.com/) hosting the remote database
* Express.js
* Handlebars
* Node.js

## Features
* Click on a town to view the houses inside
* Make your own house
* Name your house
* Add residents in your house
* App generates a random vector image for your house
* Prevent edits to your house with a secure, hashed password
* Delete or Edit your house 

## How it works

There is two models, the Town and the House.
In the town, the houses are stored in an array along with the town's name and picture.
```javascript
const TownSchema = new mongoose.Schema({
  name: String,
  image: String,
  houses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House'
    }
  ]
})
```
The house model stores the house name, residents, key, and picture. The key is hashed using [BCrypt](https://www.npmjs.com/package/bcrypt-nodejs) and the picture is randomly generated using [The Noun Project's API](http://api.thenounproject.com/) and [Lodash's](https://lodash.com/) sample method. 
```javascript 
const HouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  residents: Array,
  key: {
    type: String,
    required: true
  },
  image: String
})
```

## Styling, why Bulma and not Materialize?

I chose to style this project using [Bulma](https://bulma.io/) even though I feel Bulma is less featured compared to [Materialize](http://materializecss.com/) because I liked the default styles more and it increases variation among my classes designs. Most of my class was only introduced to Materialize and it seemed nearly all of them were planning to use it, I wanted my project to stand out from the others.

## The authentication system
This currently stores a hashed key with each house, set by the creator of the house. I originally intended to use a full user system such as passport. I was running into a large amount of errors with no error codes so fixing them was difficult to say the least. I decided to implement the current password system in order to meet the project's deadline. The passport branch is still there, outdated compared to master, if you wanna see the attempt.

#### Why is this not good?
This password storing system is mostly secure using BCrypt but the problem lies in being able to delete houses as an admin would. There is no admin account I can give access, so I had to set an environment variable with a string to use as the admin pass. Obviously storing an admin password in an environment variable is a bad idea for security reasons even if you're storing the hash only and thats a major reason I intend to add passport in the future.

## Future Plans

In the future this will definitely have a better authentication system, whether it be passport or another option. The better system will have houses linked to users and an admin account that has access to all houses.

A mail system between houses would be added after better authentication as well.

I also really wanted each house to show different characters but have not been able to finish it yet. Below is a picture from my partially working branch using this character system. You can view the branch [here.]
(https://github.com/BrandonS8/project-2/tree/test-resident-object)
![character example](https://i.imgur.com/1Po71UE.png)

The main problem is updating the characters, right now the only method I could get working is to just delete all the residents and remake them using the new list. The other option is to make a different form for adding residents and another one for removing them.

## Running on a local machine
If you want to get this running on your system (assuming you have MongoDB and it's running) you need to follow these steps: 
1. Fork and clone [this repository](https://github.com/BrandonS8/project-2/)
2. Install node packages:  
`npm i`
3. Configure your [The Noun Project API](http://api.thenounproject.com/) key and secret in terminal:  
` export TNP_API_KEY=paste your key here `  
`export TNP_API_SECRET=paste your secret here `  
4. Configure your admin key (put this in the delete password field of a house to delete it) in terminal:  
`export ADMIN_KEY=TYPE AN ADMIN KEY HERE `  
5. Seed the database, run in terminal:  
`node db/seed.js`  
6. Finally, start the app.  
`node index.js`  
or with nodemon:  
`nodemon index.js`
 
