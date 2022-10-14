import { CommentFormComponent } from './comment-form/comment-form.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommentComponent
  ],
  declarations: [
    CommentComponent,
    CommentFormComponent
  ]
})
export class CommentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommentModule
    };
  }
}
