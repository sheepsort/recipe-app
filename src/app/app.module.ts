import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeBookComponent } from './recipe_book/recipe-book.component';
import { RecipeListComponent } from './recipe_book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe_book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe_book/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping_list/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping_list/shopping-list/shopping-list-edit/shopping-list-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
