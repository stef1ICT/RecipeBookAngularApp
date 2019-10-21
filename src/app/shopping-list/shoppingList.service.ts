import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';


export class ShoppingListService {

  startedEditing = new Subject<number>();

  ingrediantsChange = new EventEmitter<Ingredient[]>();

  private ingrediants = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];



  getIngrediants() {
    return this.ingrediants.slice();
  }


  addIngrediant(ingrediant:Ingredient) {
        this.ingrediants.push(ingrediant);
        this.ingrediantsChange.emit(this.ingrediants.slice());
  }

  addToShoppingList(ingrediants: Ingredient[]) {
     
      this.ingrediants.push(...ingrediants);
      this.ingrediantsChange.emit(this.ingrediants.slice());
  }
  getIngrediant(index : number) {
    return this.ingrediants.slice()[index];
      }

    updateIngrediant(index:number, newIngrediant:Ingredient) {
      this.ingrediants[index] = newIngrediant;
      this.ingrediantsChange.emit(this.ingrediants.slice());
    }


    deleteIngrediant(index:number) {
      this.ingrediants.splice(index,1);
      this.ingrediantsChange.next(this.ingrediants.slice());
    }
}