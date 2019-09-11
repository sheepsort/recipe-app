import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const itemName = this.nameInputRef.nativeElement.value;
    const itemAmount = this.amountInputRef.nativeElement.value;
    const newItem = new Ingredient(itemName, itemAmount);
    this.slService.addIngredient(newItem);
  }

/*
This could be done using just an event emitter, with @Output, rather than @ViewChild
  onAddIngredient(name: HTMLInputElement, amount: HTMLFormElement) {
    this.addIngredient.emit({
      name: name.value,
      amount: amount.value
    });
  }
*/
  onRemoveItem(name) {

  }

  onClearItems() {

  }

}
