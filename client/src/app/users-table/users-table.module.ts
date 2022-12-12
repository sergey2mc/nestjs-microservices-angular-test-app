import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersTableComponent } from './users-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [UsersTableComponent],
  declarations: [UsersTableComponent],
})
export class UsersTableModule { }
