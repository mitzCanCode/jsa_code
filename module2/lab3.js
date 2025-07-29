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
        break;
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
        break;
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

  static match(teacher, student, courseName = null) {
    let matchingCourses = [];
    if (!courseName) {
      for (let course of teacher.courses) {
        for (let studentCourse of student.courses) {
          if (
            course.courseName === studentCourse.courseName &&
            course.level === studentCourse.level
          ) {
            matchingCourses.push({
              course: course.courseName,
              level: course.level,
            });
          }
        }
      }
    } else {
      let found = false;
      for (let course of student.courses) {
        if (course.courseName === courseName) {
          found = true;
          for (let teacherCourse of teacher.courses) {
            if (
              teacherCourse.courseName === courseName &&
              teacherCourse.level === course.level
            ) {
              return {
                course: course.courseName,
                level: course.level,
              };
            }
          }
        }
      }
      if (!found) {
        console.log(`Student does not have the course ${courseName}`);
      }
    }
    return matchingCourses.length > 0 ? matchingCourses : undefined;
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
student1.addCourse("physics", 4);
teacher1.addCourse("maths", 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse("maths", 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse("physics", 4);
match = ExtendedUser.match(teacher1, student1, "physics");
console.log(match); // -> {course: 'physics', level: 4}
console.log("Teacher courses:", teacher1.courses);
console.log("Student courses:", student1.courses);
