const http= require('http');
const path= require('path');
const pug= require('pug');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'passwerd',
  port: 5432,
})


const serveIndex= (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
  next();
}

const serveUser= (req, res) => {
  res.sendFile(path.join(__dirname + '/user.html'));
}

const getTopRated = (request, response) => {
    http.get("http://api.themoviedb.org/3/movie/popular?api_key=NOTWHATYOURELOOKINGFOR&language=en-US&page=1", (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
  
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }
  
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        //const parsedData = JSON.parse(rawData);
        //console.log(parsedData);
        response.status(200).json(rawData)
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

const getRecent = (request, response, next) =>  {
  http.get("http://api.themoviedb.org/3/movie/top_rated?page=1&language=en-US&api_key=NOTWHATYOURELOOKINGFOR", (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
  
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }
  
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        //const parsedData = JSON.parse(rawData);
        //console.log(parsedData);
        response.status(200).json(rawData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
  next();  //get top rated
}

//input: information of user to be added
const createUser = (request, response) => {
  const {firstname, lastname, email, username, password} = request.body;
  console.log(firstname, lastname, email, username, password);
  pool.query(`INSERT INTO useraccount (firstname, lastname, email, username, password)
              VALUES ($1, $2, $3, $4, $5)`, [firstname, lastname, email, username, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Welcome, ${username}`);
  })
}

//input: movie searched for
const getMovie = (req, res) => {
  const id = parseInt(req.params.movieId);
  pool.query(
             `SELECT Title, Year, Genre.Name AS Genre, AgeRating.Rating AS Rating, overallRating
              FROM Movie JOIN Genre ON (genreid = genre.id)
                         JOIN AgeRating ON (agerating.id = ageratingid)
              WHERE Movie.ID = $1`, [id], (error, results) => {
              if (error) {
                throw error
              }
              const queryRes= results.rows[0]
              console.log(queryRes)
              res.render('index', {movieId: id, compositeScore: queryRes.overallrating, movieTitle: queryRes.title,
                         year: queryRes.year, genre: queryRes.genre, rating: queryRes.rating});
            })
}

//return list of search results
const getSearchResults= (req, res) => {
  console.log(req.params);
  const title= req.params.title;
  const yearConstraint= req.params.yearConstraint;
  const year= parseInt(req.params.year);
  const genre= req.params.genre;
  const ageRating= req.params.ageRating;
  const overallRatingConstraint= req.params.overallRatingConstraint;
  const overallRating= parseInt(req.params.overallRating);
  var text, psqlParams;
//  console.log(yearConstraint);
 // console.log(overallRatingConstraint);
  if(yearConstraint == '>' && overallRatingConstraint == '>') {
    text= `SELECT movie.id as ID, Title, Year, genre, rating as agerating, overallrating
       FROM Movie JOIN Genre ON (genre.id = genreid)
                  JOIN agerating ON (agerating.id = ageratingid)
       WHERE (lower(title) = lower($1) AND year >= $2 AND genre.name= $3 AND agerating.rating= $4 AND overallrating >= $5)
       OR (lower(title) = lower($1)) OR (genre.name = $3 AND overallrating >= $5) OR (genre.name = $3)`
       psqlParams= [title, year, genre, ageRating, overallRating];
  }
  else if(yearConstraint == '>' && overallRatingConstraint == '<') {
    text= `SELECT movie.id as ID, Title, Year, genre, rating as agerating, overallrating
       FROM Movie JOIN Genre ON (genre.id = genreid)
                  JOIN agerating ON (agerating.id = ageratingid)
       WHERE (lower(title) = lower($1) AND year >= $2 AND genre.name= $3 AND agerating.rating= $4 AND overallrating <= $5)
       OR (lower(title) = lower($1)) OR (genre.name = $3 AND overallrating <= $5) OR (genre.name = $3)`
       psqlParams= [title, year, genre, ageRating, overallRating];
  }
  else if(yearConstraint == '<' && overallRatingConstraint == '>') {
    text= `SELECT movie.id as ID, Title, Year, genre, rating as agerating, overallrating
       FROM Movie JOIN Genre ON (genre.id = genreid)
                  JOIN agerating ON (agerating.id = ageratingid)
       WHERE (lower(title) = lower($1) AND year <= $2 AND genre.name= $3 AND agerating.rating= $4 AND overallrating >= $5)
       OR (lower(title) = lower($1)) OR (genre.name = $3 AND overallrating >= $5) OR (genre.name = $3)`
       psqlParams= [title, year, genre, ageRating, overallRating];
  }
  else if(yearConstraint == '<' && overallRatingConstraint == '<') {
    text = `SELECT movie.id as ID, Title, Year, genre, rating as agerating, overallrating
       FROM Movie JOIN Genre ON (genre.id = genreid)
                  JOIN agerating ON (agerating.id = ageratingid)
       WHERE (lower(title) = lower($1) AND year <= $2 AND genre.name= $3 AND agerating.rating= $4 AND overallrating <= $5)
       OR (lower(title) = lower($1)) OR (genre.name = $3 AND overallrating <= $5) OR (genre.name = $3)`
       psqlParams= [title, year, genre, ageRating, overallRating];
  }
  else {
    text= `SELECT movie.id as ID, Title, Year, genre, rating as agerating, overallrating
       FROM Movie JOIN Genre ON (genre.id = genreid)
                  JOIN agerating ON (agerating.id = ageratingid)
       WHERE (lower(title) = lower($1) AND genre.name= $2 AND agerating.rating= $3)
       OR (lower(title) = lower($1)) OR (genre.name = $2)`
       psqlParams= [title, genre, ageRating];
  }
  pool.query(text, psqlParams, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows);
    }
  )
}


//input: useful/not useful
//scores are eith 1 or -1 for good and bad resp.
const rateComment= (req,res) => {
  const score= req.params.score;
  const reviewid= req.params.id;
  pool.query(
    `UPDATE Review
     SET ScoreId = ScoreId + $1
     WHERE ID = $2`, [score, reviewid], (error, results) => {
     if(error) {
      throw error
     }
     response.status(201).send(`thumb added ${score}`)
     }
  )
}

const getAccountInfo= (req,res) => {
  const id= req.params.userId;
}

const getUserId= (req, res) => {
  const {username, pass}= req.body;
  //let encoder= new TextEncoder();
  //let encodedPass= encoder.encode(password);
  //const encrypted = window.crypto.subtle.encrypt({name: "RSA-OAEP"}, publicKey, password)
  //const pass= new DataView(encrypted)
  pool.query(
    `SELECT ID \
     FROM UserAccount \
     WHERE username= $1 AND password= $2`, [username, pass], (error, results) => {
     if(error) {
      throw error
     }
     response.status(201).send(`logged in as ${username}`)
    }
  )
}

const getCommentsForMovie= (req, res) => {
  const movieId = parseInt(req.params.movieId);
  pool.query(`SELECT Comment
             FROM Review JOIN Movie ON (movie.id = movieid)
             WHERE Comment IS NOT NULL AND movieid = $1`,
             [movieId], (error, results) => {
               if(error) {
                 throw error;
               }
               res.status(200).json(results.rows);
             }
  )
}

const rateMovie= (req, res) => {
  const movieId= parseInt(req.params.movieId);
  const userId= parseInt(req.params.userId);
  const comment= req.params.comment;
  const thumb= parseInt(req.params.thumb);
  //console.log(thumb);
  pool.query(
    `INSERT INTO REVIEW(movieid, userid, scoreid, comment)
     VALUES($1, $2, $3, $4)`, [movieId, userId, thumb, comment], (error, results) => {
       if(error) {
        throw error;
       }
       res.status(201);
     }
  )
}

/*
$1= movie id
$2= user's score for the movie
$3 = user id

UPDATE MOVIE
SET overallrating = overallrating + (SELECT reputation FROM UserAccount WHERE ID = $3) * $2
WHERE movie.id = $1
*/

module.exports = {
  getCommentsForMovie,
  serveIndex,
  serveUser,
  getTopRated,      //recent top rated movies
  getRecent,        //recently highly rated movies
  getMovie,         //a single movie in the db
  createUser,
  rateMovie,
  rateComment,
  getSearchResults,
  getAccountInfo,
  getUserId,
}