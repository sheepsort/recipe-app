import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeBookComponent } from './recipe_book/recipe-book.component';
import { ShoppingListComponent } from './shopping_list/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe_book/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe_book/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipeBookComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: ':id', component: RecipeDetailComponent }
    ]},
    { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
