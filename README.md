hapi testing with lab
=====================

This code is for **Testing Hapi Services with Lab** by 
[Fionn Kelleher](https://twitter.com/_expr) <br /> 
see: 
https://medium.com/the-spumko-suite/testing-hapi-services-with-lab-96ac463c490a

Followed the tutorial but when ever I ran `node .` or `npm test` I got the following error:

**Error: Invalid routeConfig options (/users/{username})**

Screenshot:

![Hapi Testing with Lab Error Message](http://i.imgur.com/swQe1lS.png)

Sent @_expr a tweet asking for help:
https://twitter.com/nelsonic/statuses/475023275253592064 <br />
@_expr replied with a pull request.

Had to change the **path** to **params** for Hapi 5.x

All working now.
But code coverage is low because the tests do not force
errors to follow the error-checking branches.

Tests passing:

[tests passing](http://i.imgur.com/AiS27Rq.png)