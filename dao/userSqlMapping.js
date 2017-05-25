var user = {
	insert:'INSERT INTO user(name, age) VALUES(? , ?)',
	update:'UPDATE user SET name = ?, age = ? WHERE id = ?',
	delete: 'DELETE FROM user WHERE id=?',
	queryById: 'SELECT * FROM user WHERE id=?',
	queryAll: 'SELECT * FROM user'
};

module.exports = user;