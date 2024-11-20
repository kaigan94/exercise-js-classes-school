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

  addStudent(student) {
    if (!this.students.includes(student)) {
      this.students.push(student);
    }
  }

  addTeacher(teacher) {
    if (!this.teachers.includes(teacher)) {
      this.teachers.push(teacher);
    }
  }

  relegateStudent(student) {
    this.students = this.students.filter((s) => s !== student);
    student.subjects.forEach((subject) => subject.quitSubject(student));
  }

  fireTeacher(teacher) {
    this.teachers = this.teachers.filter((t) => t !== teacher);
    teacher.subjects.forEach((subject) => subject.removeTeacher());
  }
}

// #2
class Subject {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teacher = null;
  }

  addTeacher(teacher) {
    if (!this.teacher) {
      this.teacher = teacher;
      teacher.addSubject(this);
    }
  }
  enlistToSubject(student) {
    if (!this.students.includes(student)) {
      this.students.push(student);
      student.subjects.push(this);
    }
  }

  removeTeacher() {
    if (this.teacher) {
      const teacher = this.teacher;
      this.teacher = null;
      teacher.subjects = teacher.subjects.filter((subject) => subject !== this);
    }
  }
}

const english = new Subject("English");
const math = new Subject("Math");
const programming = new Subject("Programming");
const history = new Subject("History");

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
  addSubject(subject) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject);
    }
  }
}

// #5
const teacher1 = new Teacher("Niklas");
const teacher2 = new Teacher("Lars");
teacher1.addSubject("Programming");
teacher2.addSubject("Nonsense");

console.log(teacher1);
console.log(teacher2);

// #6 + #7
function addSubjectToTeacher(subject, teacher) {
  if (!teacher.subjects.includes(subject)) {
    teacher.subjects.push(subject);
  }
  if (!subject.teacher) {
    subject.teacher = teacher;
  }
  return teacher;
}

addSubjectToTeacher(programming, teacher1);
addSubjectToTeacher(programming, teacher2);
console.log(teacher1);
console.log(programming);
console.log(teacher2);

// #8 - Både för-och nackdelar med fristående funktion och inuti.

// Fördel/nackdel inuti: Lägger man till funktionen inne i objektet blir den mer objektorienterad (inkapslad, snyggare, mer tydlig), och enklare att hitta/koppla och förstå. Däremot kan man inte koppla den med andra operationer eller så, eftersom den är bunden till objektet om jag förstått rätt. Har man en fristående funktion måste man vara noga med att uppdatera båda objekten (i detta fall ämnet och läraren). Är logiken redan inbyggd i läraren blir detta automatiskt rätt.

// Fördel nackdel om man lägger en funktion som fristående (utanför objektet) : Den kan återanvändas, användas på fler sätt som berör flera klasser, som att kanske uppdatera läraren & ämnet samtidigt. Skulle man vilja ändra klasser i framtiden är det enklare att ändra en fristående funktion än att ändra metoder inuti en klass.

// I detta fall/denna uppgift är det bäst att ha funktionen inuti Teacher klassen.

// #9
// addStudent + addTeacher till "School" klassen - index.js:2
// addTeacher + enlistToSubject till "Subject" klassen - index.js:26
// addSubject till "Teacher" klassen - index.js:71

// #10 - ✔️ done

// #11
// quitSubject(student) hör hemma i "Subject" klassen
// removeTeacher() hör hemma i "Subject" klassen
// relegateStudent(student) hör hemma i "School" klassen
// fireTeacher(teacher) hör hemma i "School" klassen

// #12 - ✔️ done (smidigt!)

// #13
