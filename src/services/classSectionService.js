import ClassSectionRepository from '../repositories/classSectionRepository.js';

export class ClassSectionService {
  // Create class section with custom section naming scheme
  async createClassSection(classSectionData) {
    const { year } = classSectionData;

    // Get the current section count for the given year
    const sectionCount = await ClassSectionRepository.getClassSectionCountByYear(year);

    // Generate the section name in the format 'year-increment'
    const sectionIncrement = sectionCount + 1;  // Increment by the number of sections
    const sectionName = `${year}-${sectionIncrement}`;

    // Create the updated class section data with the generated section name
    const updatedClassSectionData = { ...classSectionData, section: sectionName };

    // Create the class section
    return await ClassSectionRepository.createClassSection(updatedClassSectionData);
  }

  // Get all class sections
  async getAllClassSections() {
    return await ClassSectionRepository.getAllClassSections();
  }

  // Get class section by ID
  async getClassSectionById(id) {
    return await ClassSectionRepository.getClassSectionById(id);
  }

  // Update class section
  async updateClassSection(id, classSectionData) {
    return await ClassSectionRepository.updateClassSection(id, classSectionData);
  }

  // Delete class section
  async deleteClassSection(id) {
    return await ClassSectionRepository.deleteClassSection(id);
  }
}

