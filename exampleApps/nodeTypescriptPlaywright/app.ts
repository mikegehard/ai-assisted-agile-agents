import express, { Express, Request, Response } from 'express';
import path from 'path';
import { engine } from 'express-handlebars';

const app: Express = express();
const port: number = 3000;

// Set up Handlebars as the template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the home page
app.get('/', (req: Request, res: Response) => {
  res.render('home', { title: 'Hello World', message: 'Hello World!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
