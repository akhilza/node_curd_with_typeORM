require('reflect-metadata'); 
const express = require('express');
const bodyParser = require('body-parser');
const AppDataSource = require('./db'); 
const Item = require('./models/Item'); 
const app = express();
const port = 8080;

app.use(bodyParser.json());

AppDataSource.initialize().then(() => {
    console.log('Database connected');
    
    // CREATE
    app.post('/items', async (req, res) => {
        try {
            const { name, price } = req.body;
            const itemRepository = AppDataSource.getRepository(Item);
            const newItem = itemRepository.create({ name, price });
            await itemRepository.save(newItem);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // READ ALL
    app.get('/items', async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository(Item);
            const items = await itemRepository.find();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // READ ONE
    app.get('/items/:id', async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository(Item);
            const item = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!item) return res.status(404).json({ message: 'Item not found' });
            res.json(item);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // UPDATE
    app.put('/items/:id', async (req, res) => {
        try {
            const { name, price } = req.body;
            const itemRepository = AppDataSource.getRepository(Item);
            const item = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!item) return res.status(404).json({ message: 'Item not found' });

            item.name = name;
            item.price = price;
            await itemRepository.save(item);
            res.json({ message: 'Item updated successfully', item });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // DELETE
    app.delete('/items/:id', async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository(Item);
            const item = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!item) return res.status(404).json({ message: 'Item not found' });

            await itemRepository.remove(item);
            res.json({ message: 'Item deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((error) => console.error("Database connection error:", error));
