# How to use

[URL to access website](https://portal-client-james.web.app)

First of all, this project is hosted on free services. Firebase for the frontend (this repo) and heroku for the [backend](https://github.com/BarcaJames/PortalBackend).

This website uses react to connect to a spring boot server that uses spring security with JWT for authentication and authorization.

**NOTE: [Heroku will sleep after 30 mins of inactivity](https://devcenter.heroku.com/articles/free-dyno-hours). Please be patient, the first request will take about 10 seconds to wake the dyno.**

There is a set of pre populated users in the system so that you can test the features of this system.

<!-- (Add users and privilege here...) -->

| username | password | role        | Privilege                    |
| -------- | -------- | ----------- | ---------------------------- |
| Jamie    | password | Super Admin | read, create, update, delete |
| Jane     | password | Admin       | read, create, update         |
| Kimmy    | password | Manager     | read, create                 |
| Pam      | password | HR          | read, create                 |
| Johnny   | password | User        | read                         |

You can also register a user then login with the password that was sent to the email address provided.

I assume people will manipulate the data in the system, to always have data available for people to test the functionality, a cron job will run at 12 am GMT-5 to clear the database and add the above table data. **This app is running on a free tier so chances are that this cron job will not execute if the dyno is sleeping.**

## Happy coding!
