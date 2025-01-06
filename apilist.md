#Dev Tindr APIs:

## authrouter
-post /signup
-post /login
-post /logout

## profileRouter
-get /profile/view
-patch /profile/edit
-patch /profile/password

STATUS : ignore , interested  , accpeted , rejected
## connectionRequestRouter
-POST /request/send/:status/:userid
    POST /request/send/intersted/:userid
    POST /request/send/ignored/:userid  

-POST /request/review/accpeted/:requestid
    /request/review/ignored/:requestid

-GET user/connection
    /request/recieved
    /feed  - gets youthe profile of other users on platform 




