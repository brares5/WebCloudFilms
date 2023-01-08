# Web & Cloud Application

## Group: 1241EA

Team members:
* ARGHIR ANDA-VALENTINA
* BIRZANEANU RARES 
* CANEA VALENTIN-DUMITRU
* MAFTEI MIHAI

## Registered Users


| email                 | password | name  |
| --------------------- | -------- | ----- |
| doe.john@upb.ro    | password | John  |
| my_mario@gmail.com | password | Mario |

## List of APIs offered by the server

POST http://localhost:3000/api/v1/login
Content-Type: application/json
 
{
    "username": "username",
    "password": "password"
}

This POST request allows a user to login.

-----------------------------------------------

POST http://localhost:3000/api/v1/logout

This POST request allows the logged in user to log out.

-----------------------------------------------

GET http://localhost:3000/api/v1/user

This GET request allows the logged in user to retrive its data (personal such as name, username and id).

-----------------------------------------------

GET http://localhost:3000/api/v1/films

This GET request allows us to get all films from the database for each user. It will return the film objects with all the fields.

-----------------------------------------------
GET http://localhost:3000/api/v1/favs

This GET request allows us to get all favorite films from the database for each user. It will return the favorite film objects with all the fields.

-----------------------------------------------
GET http://localhost:3000/api/v1/bestrated

This GET request allows us to get the best rated films from the database for each user. It will return those film objects with all the fields.

-----------------------------------------------
GET http://localhost:3000/api/v1/seenlastmonth

This GET request allows us to get the films from the database which were watched less than 30 days ago for each user.

-----------------------------------------------
GET http://localhost:3000/api/v1/unseen

This GET request allows us to get the unseen films from the film list for each user.

-----------------------------------------------
GET http://localhost:3000/api/v1/films/2

This GET request will get the film with id=2. It will return all the object's fields if it exists and if owned by user.

-----------------------------------------------
POST http://localhost:3000/api/v1/films
Content-Type: application/json
 
{
    "title": "Test Test 3",
    "favorite": true,
    "date": "2022-05-11",
    "rating": 3
}

This request will add a film with the title "Test test 3" into the database for the user that has called this API. 
If it goes through, it will show "200 OK". In case of errors, it will show error 400 bad request.

-----------------------------------------------
PUT http://localhost:3000/api/v1/films/update/2
Content-Type: application/json
 
{
    "title": "21 Grams II",
    "favorite": true,
    "date": "2022-05-18",
    "rating": 4
}
 
This request will edit the film with the title "21 Grams" and will change its title to "21 Grams II". 
If it goes through, it will show "200 OK". In case of errors, it will show error 400 bad request.

-----------------------------------------------
DELETE http://localhost:3000/api/v1/films/delete/6
 
 
This request will remove film with id=6 if the user called it, is the owner of the film.

-----------------------------------------------
