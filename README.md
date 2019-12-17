<img src="https://www.oamk.fi/images/oamk/oamk-logo2.png" width="115" align="right">
<h1 align="left">Pathfinder Project</h1>
<sup>Oulu University of Applied Sciences - Autmn term 2019</sup>

Participants: [Tim Pachmann](https://github.com/tpachmann), [Jakob Benkö](https://github.com/JakobBenkoe), [Simon Janik](https://github.com/simonjanik)

User Frontend: [https://oamk-pathfinder.herokuapp.com/](https://oamk-pathfinder.herokuapp.com/)

Admin Frontend: [https://oamk-pathfinder.herokuapp.com/admin](https://oamk-pathfinder.herokuapp.com/admin)

GraphQL: [https://oamk-pathfinder.herokuapp.com/graphql](https://oamk-pathfinder.herokuapp.com/graphql)

Mockups: [https://drive.google.com/open?id=1-ovEb5N5-0p5QjVqm4tiOC4_cZ_SIU5l](https://drive.google.com/open?id=1-ovEb5N5-0p5QjVqm4tiOC4_cZ_SIU5l)

Presentation of the User Frontend/Design (by Simon): [https://youtu.be/62xGC1gRD2o](https://youtu.be/62xGC1gRD2o)

Presentation of the Admin Frontend (by Tim): [https://youtu.be/XIN6rlQ29ew](https://youtu.be/XIN6rlQ29ew)

## Local Deployment

### Database
The database schema is described in [this file](database/dump.sql).
The schema contains some sample data, including some types/templates and one admin user with the following credentials:

E-Mail: `admin@pathfinder-demo.com`

Password: `testpw`

### Docker setup
For an easy to use deployment you can use the pre-build Docker container containing the application and the database with the following command:
```
docker-compose up --build
```

### Manual setup
1. Add a `.env` file containing the required environment variables to the root folder:
```
NODE_ENV=development
PORT=8000
DATABASE_URL=postgres://zbxafoncbcpmyz:[HIDDEN]@ec2-54-247-171-30.eu-west-1.compute.amazonaws.com:5432/d1cjs992d8sbtq?ssl=true
JWT_SECRET=jrhQqUZ4h7zxZJ2AGkvTZTt4edXER4Nd
JWT_AUDIENCE=http://localhost:8000/graphql
JWT_ISSUER=http://localhost:8000
```

2. Install all the NPM dependencies: 
``` npm install ```

3. Build the user & admin frontend: 
``` npm run build ```

4. Start the application: 
``` npm start ```
