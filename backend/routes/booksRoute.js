import express from 'express';
import { Book } from '../models/bookModel.js';
import database from '../db/database.js';

const router = express.Router();



//Route to save a book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            res.status(400).send({
                message: "Send all required fields : title, author, publishYear"
            });
        }
        else {
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
            })

            const bookSaved = await newBook.save();
            res.status(201).send({
                message: "Book saved to database!!",
                bookSaved
            });
            console.log('Book saved to database!!');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
});

//get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send({
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


//get one book by _id
router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const book = await Book.findById(_id);
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

//update a book by using patch
router.patch('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(_id, req.body);
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).send({ message: "Book updated successfully!!"});

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


//delete a book
router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(_id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found!" })
        }
        res.status(200).send({message: "Book deleted successfully!!"})

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default router;