class Student {
    constructor(id, name, email, courseIds = []) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.courseIds = courseIds;
    }
  
    // Maps a row from the database to a Student object
    static fromDatabase(row) {
      return new Student(row.id, row.name, row.email, row.course_ids || []);
    }
  }
  
  export default Student;
  