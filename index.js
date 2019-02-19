const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const server = express();

const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints heres
server.post('/api/zoos', (req, res) => {
	db.insert(req.body)
		.into('zoos')
		.then(res => {
			res.status(201).json(res);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/api/zoos', (req, res) => {
	db('zoos')
		.then(zoos => {
			res.status(200).json(zoos);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/api/zoos/:id', (req, res) => {
	const { id } = req.params;
	db('zoos')
		.where('id', id)
		.then(zoo => {
			res.status(200).json(zoo);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.delete('/api/zoos/:id', (req, res) => {
	const { id } = req.params;
	db('zoos')
		.where('id', id)
		.del()
		.then(zoo => {
			res.status(200).json(zoo);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.put('/api/zoos/:id', (req, res) => {
	const { id } = req.params;

	db('zoos')
		.where('id', id)
		.update(req.body)
		.then(zoo => {
			res.status(200).json(zoo);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
