import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserFormModule } from './user-form/user-form.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    CoreModule,
    UserFormModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
