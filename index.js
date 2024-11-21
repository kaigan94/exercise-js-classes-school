// #1 Skola - Klass som representerar en skola
class School {
  constructor(name) {
    this.name = name;
    this.address = "Kalkstensvägen 3";
    this.zipcode = 22478;
    this.city = "Lund";
    this.students = []; // Lista över skolans alla studenter
    this.teachers = []; // Lista över skolans alla lärare
  }

  // Metod för att lägga till en student i skolan
  addStudent(student) {
    if (!this.students.includes(student)) {
      this.students.push(student); // Lägger till studenten om den inte redan finns
    }
  }

  // Metod för att lägga till en lärare i skolan
  addTeacher(teacher) {
    if (!this.teachers.includes(teacher)) {
      this.teachers.push(teacher); // Lägger till läraren om den inte redan finns
    }
  }

  // Metod för att utesluta en student från skolan
  relegateStudent(student) {
    this.students = this.students.filter((s) => s !== student); // Tar bort studenten från skolans lista
    student.subjects.forEach((subject) => subject.quitSubject(student)); // Tar bort studenten från alla ämnen
  }

  // Metod för att sparka en lärare från skolan
  fireTeacher(teacher) {
    this.teachers = this.teachers.filter((t) => t !== teacher); // Tar bort läraren från skolans lista
    teacher.subjects.forEach((subject) => subject.removeTeacher()); // Tar bort läraren från alla ämnen
  }
}

// #2 Ämne - Klass som representerar ett ämne
class Subject {
  constructor(name) {
    this.name = name; // Ämnets namn
    this.students = []; // Lista över studenter som är inskrivna i ämnet
    this.teacher = null; // Lärare för ämnet
  }

  // Metod för att lägga till en lärare till ämnet
  addTeacher(teacher) {
    if (!this.teacher) {
      this.teacher = teacher; // Om ämnet inte redan har en lärare, sätt denna som lärare
      teacher.addSubject(this); // Lägg till ämnet i lärarens ämneslista
    }
  }

  // Metod för att lägga till en student till ämnet
  enlistToSubject(student) {
    if (!this.students.includes(student)) {
      this.students.push(student); // Lägg till studenten till ämnet om den inte redan finns
      student.subjects.push(this); // Lägg till ämnet till studentens ämneslista
    }
  }

  // Metod för att ta bort läraren från ämnet
  removeTeacher() {
    if (this.teacher) {
      const teacher = this.teacher;
      this.teacher = null; // Sätt läraren till null
      teacher.subjects = teacher.subjects.filter((subject) => subject !== this); // Ta bort ämnet från lärarens ämneslista
    }
  }
}

// #3 Student - Klass som representerar en student
class Student {
  constructor(name, age) {
    this.name = name; // Studentens namn
    this.age = age; // Studentens ålder
    this.subjects = []; // Lista över ämnen studenten är inskriven i
    this.grades = {}; // Lista över betyg per ämne
  }

  // Metod för att lägga till betyg för ett ämne
  addGrade(subject, grade) {
    this.grades[subject.name] = grade; // Lägg till betyget för ämnet
  }

  // Metod för att hämta betyg för ett specifikt ämne
  getGrade(subject) {
    return this.grades[subject.name] || null; // Returnera betyget eller null om studenten inte har betyg i ämnet
  }
}

// #4 Lärare - Klass som representerar en lärare
class Teacher {
  constructor(name) {
    this.name = name; // Lärarens namn
    this.subjects = []; // Lista över ämnen läraren undervisar i
  }

  // Metod för att lägga till ett ämne till läraren
  addSubject(subject) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject); // Lägg till ämnet i lärarens lista om det inte redan finns
    }
  }
}

// #5 Betyg - Klass för att hantera betyg
class Grade {
  constructor(value, student, subject) {
    this.value = value; // Betygsvärde (t.ex. A, B, C)
    this.student = student; // Studenten som får betyget
    this.subject = subject; // Ämnet betyget gäller för
    this.date = new Date(); // Datum för när betyget gavs
  }

  // Metod för att uppdatera betyget
  updateGrade(newValue) {
    this.value = newValue; // Uppdatera betygsvärdet
  }

  // Metod för att visa betyget på ett användarvänligt sätt
  displayGrade() {
    return `${this.student.name} received grade ${this.value} in ${
      this.subject.name
    } on ${this.date.toLocaleDateString()}`;
  }
}

// Skapa exempelobjekt för testning
const english = new Subject("English");
const math = new Subject("Math");
const student1 = new Student("Nicholas", 30);
const student2 = new Student("Wictor", 29);
const teacher1 = new Teacher("Niklas");
const teacher2 = new Teacher("Lars");

teacher1.addSubject(english);
teacher1.addSubject(math);
teacher2.addSubject(english);

english.enlistToSubject(student1);
math.enlistToSubject(student2);

// Lägg till betyg
const grade1 = new Grade("A", student1, english);
student1.addGrade(english, grade1);
const grade2 = new Grade("B", student2, math);
student2.addGrade(math, grade2);

// Fristående funktioner för att visa data
function displayAllStudents(school) {
  return school.students.map((student) => student.name).join(", "); // Returnerar alla studenters namn i skolan
}

function displayAllSubjectsOfStudent(student) {
  return student.subjects.map((subject) => subject.name).join(", "); // Returnerar alla ämnen för en student
}

function displayAllStudentsEnlistedToSubject(subject) {
  return subject.students.map((student) => student.name).join(", "); // Returnerar alla studenter som är inskrivna i ett ämne
}

function displayAllTeachers(school) {
  return school.teachers.map((teacher) => teacher.name).join(", "); // Returnerar alla lärares namn i skolan
}

function displayAllGradesOfStudent(student) {
  let gradesList = [];
  for (let subjectName in student.grades) {
    let grade = student.grades[subjectName];
    gradesList.push(`${subjectName}: ${grade.value}`); // Skapar en lista med alla betyg för studenten
  }
  return `${student.name}'s grades: ${gradesList.join(", ")}`;
}

function displayGradeForSubject(subject) {
  let gradesList = subject.students.map((student) => {
    let grade = student.getGrade(subject); // Hämtar betyget för varje student i ämnet
    return grade
      ? `${student.name}: ${grade.value}`
      : `${student.name}: No grade`; // Returnerar betyget eller "No grade"
  });
  return `Grades for ${subject.name}: ${gradesList.join(", ")}`;
}

// Testa funktionerna i konsolen
const school = new School("Lund High School");
school.addStudent(student1);
school.addStudent(student2);
school.addTeacher(teacher1);
school.addTeacher(teacher2);

console.log(displayAllStudents(school)); // Alla studenter i skolan
console.log(displayAllSubjectsOfStudent(student1)); // Alla ämnen för student1
console.log(displayAllStudentsEnlistedToSubject(english)); // Alla studenter inskrivna i engelska
console.log(displayAllTeachers(school)); // Alla lärare i skolan

console.log(displayAllGradesOfStudent(student1)); // Visa betyg för Nicholas
console.log(displayGradeForSubject(english)); // Visa betyg för engelska
console.log(grade1.displayGrade()); // Visa betyget för Nicholas i engelska
console.log(grade2.displayGrade()); // Visa betyget för Wictor i matematik
