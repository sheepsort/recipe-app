import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEdtComponent } from './recipe-edt/recipe-edt.component';
import { RecipesResolversService } from './recipes-resolver.service';
import { RecipeBookComponent } from './recipe-book.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeBookComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEdtComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolversService]
      },
      {
        path: ':id/edit',
        component: RecipeEdtComponent,
        resolve: [RecipesResolversService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
