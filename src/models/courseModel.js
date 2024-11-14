class Course {
  constructor(id, name, description, credits, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.credits = credits;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Converts the row from the database into a Course model instance
  static fromDatabase(row) {
    return new Course(
      row.id,
      row.name,
      row.description,
      row.credits,
      row.created_at,
      row.updated_at
    );
  }

  // Validates the course data before performing database operations
  validate() {
    if (!this.name || !this.credits) {
      throw new Error('Course name and credits are required.');
    }

    if (this.credits <= 0) {
      throw new Error('Credits must be a positive number.');
    }
  }

  // Formats the model for insertion into the database
  toDatabase() {
    return {
      name: this.name,
      description: this.description,
      credits: this.credits
    };
  }
}

export default Course;
