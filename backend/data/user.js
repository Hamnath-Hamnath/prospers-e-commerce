const bcrypt = require('bcryptjs')
const usersData = [
  {
    name: 'Admin user',
    email: 'hamnath.hamnath.k@gmail.com',
    password: bcrypt.hashSync('Abc@12345678',10),
    isAdmin: true,
  },
  {
    name: 'Hamnath',
    email: 'hamnath.hamnath.k@outlook.com',
    password: bcrypt.hashSync('Abc@12345678',10),
  },
];

module.exports = usersData