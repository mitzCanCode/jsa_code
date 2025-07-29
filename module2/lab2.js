function sendEmail({ from, to, message }) {
  to.messages.push({
    from,
    message,
  });
}

class User {
  constructor({ name, surname, email, role }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.courses = [];
    this.messages = [];
  }
  addCourse(course, level) {
    this.courses.push({
      courseName: course,
      level: level,
    });
  }

  removeCourse(courseName) {
    let index = 0;
    let found = false;
    for (let course of this.courses) {
      if (course.courseName === courseName) {
        this.courses.splice(index, 1); // Remove course
        found = true;
      }
      index++;
    }
    if (!found) {
      console.log("Course not found in order to delete");
    }
  }

  editCourse(courseName, level) {
    let found = false;
    for (let course of this.courses) {
      if (course.courseName === courseName) {
        course.level = level;
        found = true;
      }
    }
    if (!found) {
      console.log("Course not found in order to edit");
    }
  }

  sendMessage(from, message) {
    sendEmail({
      from: from,
      to: this,
      message: message,
    });
  }

  showMessagesHistory() {
    console.log(this.messages);
    for (let message of this.messages) {
      console.log(`${message.from.email} -> ${this.email} ${message.message}`);
    }
  }
}

class ExtendedUser extends User {
  constructor(name, surname, email, role) {
    super(name, surname, email, role);
  }

  set fullName(value) {
    let [name, surname] = value.split(" ");
    this.name = name;
    this.surname = surname;
  }

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
}

class Teacher extends ExtendedUser {
  constructor(name, surname, email) {
    super(name, surname, email, "teacher");
  }
}

class Student extends ExtendedUser {
  constructor(name, surname, email) {
    super(name, surname, email, "student");
  }
}

let student1 = new Student({
  name: "Rafael",
  surname: "Fife",
  email: "rfife@rhyta.com",
});
let student2 = new Student({
  name: "Kelly",
  surname: "Estes",
  email: "k_estes@dayrep.com",
});
let teacher1 = new Teacher({
  name: "Paula",
  surname: "Thompkins",
  email: "PaulaThompkins@jourrapide.com",
});

student1.addCourse("maths", 2);
teacher1.addCourse("biology", 3);
teacher1.editCourse("chemistry", 4);
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fife: 1 courses
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); // -> Paula Thompkins: 2 courses
student1.fullName = "Rafael Fifer";
console.log(`${student1.fullName}: ${student1.courses.length} courses`); // -> Rafael Fifer: 1 courses
