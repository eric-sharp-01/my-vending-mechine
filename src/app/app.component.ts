import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flavours: Flavour[] = [];
  flavourNames: string[];
  cash: number;
  card: number;
  selectedId: number;

  constructor(){
    this.flavourNames = ["Orange", "Apple", "Strawberry", "Blueberry", "Pear", "Mango", "Lemon", "Grape", "Nectarine", "Rockmelon"];
    this.card = 0;
    this.cash = 0;
  }

  ngOnInit(){
    this.flavourNames.forEach((value, index) => {
      this.flavours.push(new Flavour(index + 1, 15, 1.50, value));
    })
  }

  select(id: number){
    let found = this.flavours.find((item) => item.id == id);
    if(found && found.amount > 0){     
      this.selectedId = id;
    }
  }

  pay(method: string){
    let found = this.flavours.find((item) => item.id == this.selectedId);
    if(found && found.amount > 0){    
      found.amount -= 1; 
      switch(method){
        case 'card':
          this.card = this.card + found.price;
          break;
        case 'cash':
          this.cash = this.cash + found.price;
          break;
        default:
          break;
      }
    }
    this.selectedId = 0;
  }

  getCansLeft(){
    return this.flavours.reduce((prev, current, index) => { return prev + current.amount; }, 0);
  }

  getCansSold(){
    return this.flavours.reduce((prev, current, index) => { return prev + 15 - current.amount; }, 0);
  }


  restock(){
    this.cash = 0;
    this.card = 0;
    this.flavours = [];
    this.flavourNames.forEach((value, index) => {
      this.flavours.push(new Flavour(index + 1, 15, 1.50, value));
    })
    this.selectedId = 0;
  }
}


class Flavour{
  id: number;
  amount: number;
  flavour: string;
  price: number;

  constructor(id: number, amount: number, price: number, flavour: string){
    this.amount = amount;
    this.price = price;
    this.flavour = flavour;
    this.id = id;
  }
}
