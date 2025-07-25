# prisma

npx prisma db push # push schema to db
npx prisma studio # open visual DB editor
npx prisma generate # generate client
npx prisma migrate dev # (optional) with migrations

# postman

# POST /api/auth/signup — Create User

URL: http://localhost:5000/api/auth/signup
Method: POST
Body → JSON:
Copy
Edit
{
"email": "test@example.com",
"password": "123456"
}

# POST /api/auth/login — Login

URL: http://localhost:5000/api/auth/login
Method: POST
Body → JSON:
{
"email": "test@example.com",
"password": "123456"
}

# POST /api/articles — Create Article

URL: http://localhost:5000/api/articles
Method: POST
Headers:
Authorization: Bearer <your-token>
Content-Type: application/json
{
"title": "Sample Article",
"body": "This is an example article body.",
"tags": ["AI", "Knowledge"]
}

# GET /api/articles — List User's Articles

URL: http://localhost:5000/api/articles
Method: GET
Headers:
Authorization: Bearer <your-token>

# DELETE /api/articles/:id — Delete Article

Copy an id from the article list above.

URL: http://localhost:5000/api/articles/<article-id>
Method: DELETE
Headers:
Authorization: Bearer <your-token>

# POST /api/articles/:id/summarize — Summarize Article

URL: http://localhost:5000/api/articles/<article-id>/summarize
Method: POST
Headers:
Authorization: Bearer <your-token>

# set up Docker

# unit test for loginand sign up

# CI/CD pipeline
.github/workflows/ci.yml build

Linting with ESLint

Formatting with Prettier

Testing with Jest

npm run lint # To lint your code
npm run format # To auto-format
npm test # To run tests



server deploy link :
: https://knowledgebase-backend-ombg.onrender.com
