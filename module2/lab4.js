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
    super({ name, surname, email, role });
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
    if (!courseName) {
      let matchingCourses = [];
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
      return matchingCourses.length > 0 ? matchingCourses : undefined;
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
  }
}

class Teacher extends ExtendedUser {
  constructor({ name, surname, email }) {
    super(name, surname, email, "teacher");
  }
}

class Student extends ExtendedUser {
  constructor({ name, surname, email }) {
    super(name, surname, email, "student");
  }
}

class Tutoring {
  constructor() {
    this.students = [];
    this.teachers = [];
  }

  addStudent(name, surname, email) {
    let student = new Student({ name, surname, email });
    this.students.push(student);
    return student;
  }

  addTeacher(name, surname, email) {
    let teacher = new Teacher({ name, surname, email });
    this.teachers.push(teacher);
    return teacher;
  }

  getStudentByName(name, surname) {
    for (let student of this.students) {
      if (student.name === name && student.surname === surname) {
        return student;
      }
    }
  }

  getTeacherByName(name, surname) {
    for (let teacher of this.teachers) {
      if (teacher.name === name && teacher.surname === surname) {
        return teacher;
      }
    }
  }

  getStudentsForTeacher(teacher) {
    let students = [];
    for (let student of this.students) {
      for (let studentCourse of student.courses) {
        for (let teacherCourse of teacher.courses) {
          if (
            teacherCourse.courseName === studentCourse.courseName &&
            teacherCourse.level >= studentCourse.level
          ) {
            students.push(student);
          }
        }
      }
    }
    return students;
  }

  // You were going to finish this function
  getTeacherForStudent(student) {
    let matchingTeacher = [];
    for (let studentCourse of student.courses) {
      for (let teacher of this.teachers) {
        for (let teacherCourse of teacher.courses) {
          if (
            teacherCourse.courseName === studentCourse.courseName &&
            teacherCourse.level >= studentCourse.level
          ) {
            matchingTeacher.push(teacher);
            break; // Prevent duplicate teachers if teacher has multiple matching courses
          }
        }
      }
    }
    return matchingTeacher;
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

let tutoring = new Tutoring();
tutoring.addStudent("Rafael", "Fife", "rfife@rhyta.com");
tutoring.addStudent("Kelly", "Estes", "k_estes@dayrep.com");
tutoring.addTeacher("Paula", "Thompkins", "PaulaThompkins@jourrapide.com");
let student = tutoring.getStudentByName("Rafael", "Fife");
student.addCourse("maths", 2);
student.addCourse("physics", 4);
let teacher = tutoring.getTeacherByName("Paula", "Thompkins");
teacher.addCourse("maths", 4);
let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...
