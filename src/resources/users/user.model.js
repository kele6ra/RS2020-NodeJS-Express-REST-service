const uuid = require('uuid');
const usernameGenerator = require('username-generator');
const generatePassword = require('password-generator');

class User {
  constructor({
    id = uuid(),
    name,
    login = usernameGenerator.generateUsername(),
    password = generatePassword()
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
      password: this.password
    };
  }

  set({ name, login, password } = {}) {
    this.name = name;
    this.login = typeof login === 'undefined' ? this.login : login;
    this.password = typeof password === 'undefined' ? this.password : password;
  }

  toResponce() {
    return {
      id: this.id,
      name: this.name,
      login: this.login
    };
  }
}

module.exports = User;
