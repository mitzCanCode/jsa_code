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

let student1 = new User({
  name: "Rafael",
  surname: "Fife",
  email: "rfife@rhyta.com",
  role: "student",
});
let student2 = new User({
  name: "Kelly",
  surname: "Estes",
  email: "k_estes@dayrep.com",
  role: "student",
});
let teacher1 = new User({
  name: "Paula",
  surname: "Thompkins",
  email: "PaulaThompkins@jourrapide.com",
  role: "teacher",
});

student1.addCourse("maths", 2);
student1.addCourse("physics", 1);
student1.removeCourse("physics");
teacher1.addCourse("biology", 3);
teacher1.editCourse("biology", 4);
console.log(`${student1.name}: ${student1.courses.length} courses`); // -> Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // -> Paula: 1 courses
teacher1.sendMessage(student1, "test message");
teacher1.sendMessage(student1, "another message");
teacher1.showMessagesHistory();
