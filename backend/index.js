import express from 'express';
import { PORT } from './config.js';
import database from './db/database.js'
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();


app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin:"http://localhost:8000",
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     allowedHeaders:['Content-Type']
// }));

app.get('/', (req, res) => {
    res.send('Server working!!');
});

//using a middleware for routes
app.use('/books',booksRoute);



app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})