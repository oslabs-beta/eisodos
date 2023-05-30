Template for a MERN project bundled with webpack!

### Setup
- `npm install` to install dependencies
- Set project name, description, and authors in `package.json`
- Add your MongoDB connection string to `mongoURI` in `server.js`

### Development
- `npm start` will start the server on `localhost:3000` and serve frontend on `localhost:8080`
- The dev server is configured for the backend to be accessible via `localhost:8080/api`
- Mongoose is used to model database collections

### Production
- `npm run build` will bundle frontend files into a `/dist` folder
