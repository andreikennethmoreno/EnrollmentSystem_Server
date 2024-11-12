class CourseSubject {
    constructor(courseId, subjectId) {
      this.courseId = courseId;
      this.subjectId = subjectId;
    }
  
    static fromDatabase(row) {
      return new CourseSubject(row.course_id, row.subject_id);
    }
  }
  
  export default CourseSubject;
  