// #1
class School {
  constructor(name) {
    this.name = name;
    this.address = "kalkstensvägen 3";
    this.zipcode = 22478;
    this.city = "lund";
    this.students = [];
    this.teachers = [];
  }
}

// #2
class Subject {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teacher = null;
  }
}

const english = new Subject("English");
const math = new Subject("Math");
const programming = new Subject("Programming");

// #3
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.subjects = [];
  }
  addStudent(student) {
    this.students.push(student);
    student.subjects.push(this.name);
  }
}

const student1 = new Student("Nicholas", 30);
const student2 = new Student("Wictor", 29);
const student3 = new Student("Jonas", 33);
const student4 = new Student("Oskar", 21);
const student5 = new Student("Oliver", 24);

// #4
class Teacher {
  constructor(name) {
    this.name = name;
    this.subjects = [];
  }
  addSubject(subject) {
    this.subjects.push(subject);
  }
}

// #5
const teacher1 = new Teacher("Niklas");
teacher1.addSubject("Programming");

console.log(teacher1);

// #6
function addSubjectToTeacher(subject, teacher) {
  if (!teacher.subjects.includes(subject)) {
    teacher.subjects.push(subject);
  }
  return teacher;
}

const updatedTeacher = addSubjectToTeacher("English", teacher1);
console.log(updatedTeacher);

// #7
