import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { UserFormModule } from './user-form/user-form.module';
import { CoreModule } from './core/core.module';
import { DocFormModule } from './doc-form/doc-form.module';
import { UsersTableModule } from './users-table/users-table.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    UserFormModule,
    DocFormModule,
    UsersTableModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
