import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error(
        'The core module has already been loaded. A troupe of trained badgers has been dispatched to your location to deal with you. We are not sorry for any inconvenience.'
      );
    }
  }
}
