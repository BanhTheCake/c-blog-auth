# Backend:

-   Nodejs + ExpressJs
-   Database: mongoose + mongoDB
-   Auth: JWT + nodemailer + bcrypt
    -   Register will send gmail for user to activated account
    -   Forgot password will send gmail for user to reset password
    -   Refresh page will automatic login
    -   handle error with next(error) (expressJS)
    -   Refresh when access token expired

# Frontend:

-   ReactJs
-   store: redux + react-query
-   api: axios (interceptor) (handle err not send when access token expired)
-   form: react-hook-form and yup (for validation)
    -   Use scss for write style
    -   Sign with google

# Other:

-   This project is mainly about authenticate
-   Learn about how to handle forgot + reset password
-   Handle send email with nodemailer (oath2)
-   Use next(error) to handle error
-   Sign in with google
-   Custom hooks to write axios interceptor and react-query

# Source/base: 
-   (https://www.youtube.com/channel/UC2rLlS8PqRBJtebcHsFRLzg)
