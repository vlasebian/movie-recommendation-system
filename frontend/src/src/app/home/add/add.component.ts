import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { BackendService } from '../../backend.service';
import { IMovie } from '../../models/movie';

@Component({
  selector: 'add-component',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  categories: String[] = [
    'Comedy',
    'Drama',
    'Action',
    'Thriller',
    'Horror',
    'Sci-Fi',
    'Fantastic',
    'Romance',
  ];
  currentRate = 5;
  selectedFile: File = null;
  movieForm : FormGroup;

  @ViewChild(FormGroupDirective, {static: false}) formGroupDirective : FormGroupDirective;

  constructor(
    private backendService: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.movieForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(400)]),
      category: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.movieForm.controls[controlName].hasError(errorName);
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  public onSubmit(movieFormInstance) {
    if (this.movieForm.valid) {
      this.addMovie(movieFormInstance);
    }
  }

  private addMovie(movieForm) {
    var fd = new FormData();

    fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('title', movieForm.title);
    fd.append('stars', String(this.currentRate));
    fd.append('description', movieForm.description);
    fd.append('category', movieForm.category);
    fd.append('rating', String(this.currentRate));
    console.log(fd);

    this.backendService.addMovie(fd).subscribe(ret => {
      alert('Movie added succesfully!');
      this.router.navigate(['home/grid/']);
    });

    this.formGroupDirective.resetForm();
    this.currentRate = 5;
  }

}
