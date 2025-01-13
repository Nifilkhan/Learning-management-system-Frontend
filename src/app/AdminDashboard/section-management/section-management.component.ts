import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../shared/services/course.service';
import { Lecture } from '../shared/models/lecture';
import { section } from '../shared/models/courseModels';


@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.scss']
})
export class SectionManagementComponent implements OnInit {
  courseId!: string;
  videoForm!: FormGroup;
  sectionData:section [] = [];
  previewMode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchCourseId();
    this.fetchSections();
  }

    /**
   * Initializes the form.
   */

  initializeForm() {
    this.videoForm = this.fb.group({
      sections: this.fb.array([])
    });
  }

    /**
   * Gets the sections form array.
   * @returns {FormArray} The sections form array.
   */
  get sections(): FormArray<FormGroup>{
    return this.videoForm.get('sections') as FormArray<FormGroup> ;
  }

    /**
   * Creates a form group for a section.
   * @param {string} title - The title of the section.
   * @param {boolean} isEditable - Whether the section is editable.
   * @param {string} id - The ID of the section.
   * @returns {FormGroup} The form group for the section.
   */
  createSectionField(title: string = '', isEditable: boolean = true,id:string = ''): FormGroup {
    return this.fb.group({
      title: [title, Validators.required],
      isEditable: [isEditable],
      id:[id],
      lectures:this.fb.array([]),
    });
  }

  createLectureField(lecture:any): FormGroup {
    return this.fb.group({
      title:[lecture?.title,Validators.required],
      contentType:[lecture?.contentType,Validators.required],
      videoUrl:[lecture?.videoUrl || ''],
      articleContent: [lecture?.articleContent],
      description:[lecture?.description, Validators.required],
      lectureId:[lecture?._id]
    })
  }

    /**
   * Adds a new section.
   */
  addSection(): void {
    this.sections.push(this.createSectionField());
  }

    /**
   * Removes a section.
   * @param {number} index - The index of the section to remove.
   */
  removeSection(index: number): void {
    const section = this.sections.at(index) as FormGroup;
    if(!section) {
      console.error('Section ID not found.');
      return;
    }

    const sectionId = section.get('id')?.value;
    console.log('Section object:', section.value); // Debug: log full section object
    if (!sectionId) {
      console.error('Section ID not found at index:', index);
      return;
    }
      this.courseService.deleteSection(this.courseId,sectionId).subscribe({
        next:(response) => {
          this.sections.removeAt(index);
          console.log('Section deleted:',response);
        },
        error:(err) => console.error('Error deleting section:',err)
      })
  }

    /**
   * Fetches the course ID from the route parameters.
   */
  fetchCourseId(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';
    if (!this.courseId) {
      console.error('Course ID is missing from route parameters.');
    }
  }

    /**
   * Fetches the sections for the course.
   */
  fetchSections(): void {
    if (!this.courseId) return;

    this.courseService.getSections(this.courseId).subscribe({
      next: (response) => {
        const sections = response.sections;
        if (!sections || sections.length === 0) {
          console.log('No sections found for this course.');
          this.sectionData = [];
          return;
        }
        sections.forEach(({ title, _id,lectures }: { title: string, _id: string , lectures:Lecture[]}) => {
          // if (!isDeleted) { // Only add sections that are not deleted
            const sectionGroup = this.createSectionField(title, false, _id); // Use MongoDB _id
            const lectureArray = sectionGroup.get('lectures') as FormArray

            lectures.forEach(lecture => {
              lectureArray.push(this.createLectureField(lecture));
            })
            this.sections.push(sectionGroup);
          // }
        });
      },
      error: (err) => console.error('Error fetching sections:', err)
    });
  }

    /**
   * Saves a section.
   * @param {number} index - The index of the section to save.
   */
  saveSection(index: number): void {
    const sectionGroup = this.sections.at(index) as FormGroup;
    const title = sectionGroup.get('title')?.value;
    const sectionId = sectionGroup.get('id')?.value;

    if (!this.courseId || !title){
      console.error('Course ID or title is missing.');
      return;
    }
    if(sectionId) {
      this.courseService.editSection(this.courseId,sectionId,title).subscribe({
        next:(response) => {
          sectionGroup.get('isEditable')?.setValue(false);
          this.sectionData = response.section;
        },
        error: (err) => console.error('Error updating section:', err)
      })
    } else{
    this.courseService.addSection(title, this.courseId).subscribe({
      next: (response) => {
        if (response && response.section && response.section._id) {
          sectionGroup.get('id')?.setValue(response.section._id); // Access _id inside section
          sectionGroup.get('isEditable')?.setValue(false); // Update UI state
        } else {
          console.error('Unexpected response format for addSection:', response);
        }

      },
      error: (err) => console.error('Error saving section:', err)
    });
  }
}

  /**
   * Toggles the edit mode for a section.
   * @param {number} index - The index of the section to toggle edit mode.
   */
  toggleEditMode(index: number): void {
    const sectionGroup = this.sections.at(index) as FormGroup;
    const currentMode = sectionGroup.get('isEditable')?.value;
    sectionGroup.get('isEditable')?.setValue(!currentMode);
  }

  togglePreview() {
    this.previewMode = !this.previewMode;
  }
}
