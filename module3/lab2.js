class User {
  #firstName;
  #lastName;
  #email;

  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  set firstName(value) {
    const nameRe = /^[A-Z][a-z]*$/;
    if (!nameRe.test(value)) {
      throw new Error("First name invalid");
    } else {
      this.#firstName = value;
    }
  }

  set lastName(value) {
    const lastNameRe = /^[A-Z][a-z]*$/;
    if (!lastNameRe.test(value)) {
      throw new Error("Last name invalid");
    } else {
      this.#lastName = value;
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

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get email() {
    return this.#email;
  }

  toString() {
    return `${this.firstName} ${this.lastName} <${this.#email}>`;
  }
}

try {
  let user1 = new User("Aaaa", "Bbbb", "Aaaa@gmail.com");
  console.log("here");
  console.log(user1.toString());
  let user2 = new User("aaaa", "Bbbb", "Aaaa@gmail.com"); // -> Error
  console.log(user2.toString());
} catch (err) {
  console.log(err.message);
}
