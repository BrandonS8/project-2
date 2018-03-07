# Townie

Townie is a town building app, users can create their own houses with residents and put them into the towns. I built this as my second project at [General Assembly](https://generalassemb.ly/). It uses mongodb, express.js, handlebars, and node.js.


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

## Future Plans

In the future this will defintely have a better authentication system, whether it be passport or another option. I was running into a large amount of errors with no error codes so fixing them was difficult to say the least. I decided to implement the current password system in order to meet the project's deadline. The passport branch is still there, outdated compared to master, if you wanna see the attempt. I would connect the houses to the user's when the new authentication is added.


