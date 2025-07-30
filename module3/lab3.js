class User {
  #name;
  #surname;
  #email;

  constructor(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
  }

  set name(value) {
    const nameRe = /^[A-Z][a-z]*$/;
    if (!nameRe.test(value)) {
      throw new Error("First name invalid");
    } else {
      this.#name = value;
    }
  }

  set surname(value) {
    const surnameRe = /^[A-Z][a-z]*$/;
    if (!surnameRe.test(value)) {
      throw new Error("Last name invalid");
    } else {
      this.#surname = value;
    }
  }

  set email(value) {
    const emailRe = /^[a-z]+(\.[a-z]+)*@[a-z]+(\.[a-z]+)*$/;
    let lowerValue = value.toLowerCase();
    if (!emailRe.test(lowerValue)) {
      throw new Error("Email invalid");
    } else {
      this.#email = lowerValue;
    }
  }

  get name() {
    return this.#name;
  }

  get surname() {
    return this.#surname;
  }

  get email() {
    return this.#email;
  }

  toString() {
    return `${this.name} ${this.surname} <${this.#email}>`;
  }
}

class Users {
  constructor() {
    this.usersMap = new Map();
  }

  add(name, surname, email) {
    try {
      let tempUser = new User(name, surname, email);
      if (this.usersMap.has(email)) {
        // Checking if the user already exists
        throw new Error("User already exists");
      }

      this.usersMap.set(email, tempUser);
    } catch (Error) {
      console.log(Error);
    }
  }

  get(email) {
    return this.usersMap.get(email);
  }

  getAll(type) {
    switch (type) {
      case "name":
        return Array.from(this.usersMap.values()).sort((previous, next) =>
          previous.name.localeCompare(next.name),
        );
      case "surname":
        return Array.from(this.usersMap.values()).sort((previous, next) =>
          previous.surname.localeCompare(next.surname),
        );
      case "email":
        return Array.from(this.usersMap.values()).sort((previous, next) =>
          previous.email.localeCompare(next.email),
        );
      default:
        throw new Error("Invalid sorting method");
    }
  }
}

let users = new Users();
users.add("Aaaa", "Bbbb", "aaaa@gmail.com");
users.add("Cccc", "Dddd", "bbbb@gmail.com");
users.add("Eeee", "Ffff", "cccc@gmail.com");
users.add("Gggg", "Hhhh", "dddd@gmail.com");
console.log(users.get("dddd@gmail.com"));
console.log(users.getAll("name").map((u) => u.name));
console.log(users.getAll("surname").map((u) => u.surname));
console.log(users.getAll("email").map((u) => u.email));
