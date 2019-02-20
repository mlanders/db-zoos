const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const server = express();

const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints heres
server.post('/api/zoos', async (req, res) => {
	try {
		const id = await db('zoos').insert(req.body);
		res.status(201).json(id);
	} catch (error) {
		res.status(500).json(error);
	}
});

server.get('/api/zoos', async (req, res) => {
	try {
		const result = await db('zoos');
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
});

server.get('/api/zoos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const idCheck = await db('zoos').where('id', id);
		if (idCheck.length) {
			const result = await db('zoos').where('id', id);
			res.status(200).json(result);
		} else {
			res.status(404).json({ message: 'Unable to find that ID' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

server.delete('/api/zoos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const idCheck = await db('zoos').where('id', id);
		if (idCheck.length) {
			const result = await db('zoos')
				.where('id', id)
				.del();
			res.status(200).json(result);
		} else {
			res.status(404).json({ message: 'Unable to find that ID' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

server.put('/api/zoos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const idCheck = await db('zoos').where('id', id);
		if (idCheck.length) {
			const result = await db('zoos')
				.where('id', id)
				.update(req.body);
			res.status(200).json(result);
		} else {
			res.status(400).json({ message: 'Unable to find that ID' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
