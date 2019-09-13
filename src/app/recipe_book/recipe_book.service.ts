import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping_list/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.returnRecipes();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  returnRecipes() {
    return this.recipesChanged.next(this.getRecipes());
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.returnRecipes();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.returnRecipes();
  }

  addToList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.returnRecipes();
  }
}
