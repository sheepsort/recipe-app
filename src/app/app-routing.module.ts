import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeBookComponent } from './recipe_book/recipe-book.component';
import { ShoppingListComponent } from './shopping_list/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe_book/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe_book/recipe-detail/recipe-detail.component';
import { RecipeEdtComponent } from './recipe_book/recipe-edt/recipe-edt.component';
import { RecipesResolversService } from './recipe_book/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {
        path: 'recipes',
        component: RecipeBookComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEdtComponent},
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolversService] },
            { path: ':id/edit', component: RecipeEdtComponent, resolve: [RecipesResolversService]}
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
