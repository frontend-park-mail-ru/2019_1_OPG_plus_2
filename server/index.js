'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(body.json());
app.use(cookie());



const users = {
	'ivan.morozov@list.ru': {
		name: 'Ivan',
		email: 'ivan.morozov@list.ru',
		password: 'password',
		score: 72,
	}
};
const ids = {};

app.post('/signup', function(req, res) {

	const name = req.body.name;
	const password = req.body.password;
	const email = req.body.email;

	console.log(name, password, email);
	if (
		!password || !email ||
		!email.match(/@/)
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {name, email, password, score: 0};
	ids[id] = email;
	users[email] = user;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/login', function(req, res) {
	const password = req.body.password;
	const email = req.body.email;

	if (!password || !email) {
		return res.status(400).json({error: 'Не указан E-mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = email;

	res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({id});
});

app.get('/me', function(req, res) {
	const id = req.cookies['sessionid'];
	const email = ids[id];
	if (!email || !users[email]) {
		return res.status(401).end();
	}

	users[email].score += 1;

	res.json(users[email]);
});

app.get('/users', function (req, res) {
	const scorelist = Object.values(users)
		.sort((l, r) => r.score - l.score)
		.map(user => {
			return {
				email: user.email,
				age: user.age,
				score: user.score,
			}
		});

	res.json(scorelist);
});

app.post('/signout', function (req, res) {
	const id = req.cookies['sessionid'];
	const email = ids[id];

	delete ids[id];
	res.status(200).json({});

})

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
})