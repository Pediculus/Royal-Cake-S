const bcrypt = require('bcryptjs');

const password = 'admin'; // Replace with the password you want to hash

// Generate a salt
const salt = bcrypt.genSaltSync(10);

// Hash the password
const hashedPassword = bcrypt.hashSync(password, salt);

console.log(`Hashed Password: ${hashedPassword}`);