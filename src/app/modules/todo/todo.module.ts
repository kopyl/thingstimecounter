import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DurationComponent } from '../../modules/todo/duration/duration.component';
import { ToggleComponent } from '../../modules/todo/toggle/toggle.component';
import { TodoComponent } from './todo-component/todo-component.component';

import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [
    DurationComponent,
    ToggleComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoModule { }
