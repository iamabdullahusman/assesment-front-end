import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  studentForm: FormGroup;
  editStudentId: number | null = null;
  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) {}
  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      age: [null, [Validators.required, Validators.min(1)]]
    });
    
  }
  onSubmit(): void {
    const student = this.studentForm.value as Student;
    if (this.editStudentId) {
      this.auth.updateStudent(student).subscribe(() => {
        this.messageService.success('Student updated successfully!');
        this.studentForm.reset(); // Clear form after update
        this.editStudentId = null; // Reset edit mode
      }, error => {
        this.messageService.error('Error updating student: ' + error.message);
      });
    } else {
      this.studentService.createStudent(student).subscribe(() => {
        this.messageService.success('Student created successfully!');
        this.studentForm.reset(); // Clear form after creation
      }, error => {
        this.messageService.error('Error creating student: ' + error.message);
      });
    }
  }

  onEditStudent(studentId: number): void {
    this.studentService.getStudent(studentId).subscribe(student => {
      this.studentForm.patchValue(student);
      this.editStudentId = studentId;
    });
  }

}
