import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserFormModule } from './user-form/user-form.module';
import { CoreModule } from './core/core.module';
import { DocFormModule } from './doc-form/doc-form.module';

@NgModule({
  imports: [
    CoreModule,
    UserFormModule,
    DocFormModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
