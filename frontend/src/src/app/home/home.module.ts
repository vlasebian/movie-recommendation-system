import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search/search.component';
import { GridComponent } from './grid/grid.component';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './add/add.component';
import { MatButtonModule, MatIconModule, MatListModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, SearchComponent, GridComponent, AddComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbRatingModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  entryComponents: [HomeComponent]
})
export class HomeModule { }
