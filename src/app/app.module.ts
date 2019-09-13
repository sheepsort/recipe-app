import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeBookComponent } from './recipe_book/recipe-book.component';
import { RecipeListComponent } from './recipe_book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe_book/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe_book/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping_list/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping_list/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping_list/shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipe_book/recipe-start/recipe-start.component';
import { RecipeEdtComponent } from './recipe_book/recipe-edt/recipe-edt.component';
import { RecipeService } from './recipe_book/recipe_book.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/styles/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEdtComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
