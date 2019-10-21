import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  
  ingredients:Ingredient[];
  constructor(private shoppingListService: ShoppingListService) { 
    this.ingredients = this.shoppingListService.getIngrediants();
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngrediants();

    this.shoppingListService.ingrediantsChange.subscribe(
      (ingrediants) => this.ingredients  = ingrediants
    )
  }


  onEditItem(index:number) {
    this.shoppingListService.startedEditing.next(index);
  }


 

}
