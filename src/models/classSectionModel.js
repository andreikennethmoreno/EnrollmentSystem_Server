class ClassSection {
  constructor(id, year, section, courseIds) {
    this.id = id;
    this.year = year;
    this.section = section;
    this.courseIds = courseIds || [];
  }

  static fromDatabase(row) {
    return new ClassSection(row.id, row.year, row.section, row.course_ids);
  }
}

export default ClassSection;
