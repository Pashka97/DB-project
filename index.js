const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//home page (table of top rated/most popular)
app.get('/', db.serveIndex, db.getRecent, db.getTopRated);
//retrieve a list of search results as filling in search form
app.get('/:title&:yearConstraint&:year&:ageRating&:genre&:overallRatingConstraint&:overallRating', db.getSearchResults);

//user signup/login
app.get('/user', db.serveUser);

/****** TEST interface with user ******/
//app.get('/users', db.getUsers);

//create a new user account as filling in forms on /account
// /account has a create account/sign in if not isgned in, or a page displaying logged in user info
app.post('/account', db.createUser);

//retrieve my account information (am already signed in)
app.get('/account/:userId', db.getAccountInfo);
app.get('/account/:loginInfo', db.getUserId);

//movieView stuff
app.get('/movieView/:movieId', db.getMovie);
app.get('/comments/:movieId', db.getCommentsForMovie);
app.post('/movieView/:movieId&:userId&:thumb&:comment', db.rateMovie);
app.post('/movieView/:score/:id', db.rateComment);

app.set('views', './views');
app.set('view engine', 'pug');
app.listen(port, () => {
  console.log(`FAMR running on port ${port}.`);
})

// root: 5 search forms, search results, table of select movies
// account : create a new account, signed in user details
// movieView : all info on a given movie, form to review a movie and give thumb, list of other reviews and option to give thumb