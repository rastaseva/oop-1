const SMALL_HAMBURGER = {
  size: 'Small',
  price: 50,
  cals: 20,
};

const LARGE_HAMBURGER = {
  size: 'Large',
  price: 100,
  cals: 40,
}

const CHEESE = {
  name: 'cheese',
  price: 10,
  cals: 20,
};

const SALAD = {
  name: 'salad',
  price: 20,
  cals: 5,
};

const POTATO = {
  name: 'potato',
  price: 15,
  cals: 10,
};

const OLIVIER = {
  name: 'Olivier salad',
  price: 50,
  cals: 80,
};

const CAESARUS = {
  name: 'Caesarus salad',
  price: 100,
  cals: 20,
};

const COLA = {
  name: 'Coke',
  price: 50,
  cals: 40,
}

const COFFEE = {
  name: 'Coffee',
  price: 80,
  cals: 20,
};

class Food {
  constructor(dish) {
    this.price = dish.price;
    this.cals = dish.cals;
  }

  get fullPrice() {
    return this.price;
  }
  get fullCals() {
    return this.cals;
  }
};

class Hamburger extends Food {
  constructor(dish, stuffing) {
    super(dish);
    this.size = dish.size;
    this.stuffing = stuffing;
    if(this.stuffing === undefined) console.log('Hamburger must have at least 1 kind of stuffing');
  };

  name = 'Hamburger';

  getStuffing() {
    return this.stuffing.map(item => item.name).join(', ');
  };

  get fullPrice() {
    return this.stuffing.reduce((price, item) => {
      return price + item.price;
    }, this.price)
  }

  get fullCals() {
    return this.stuffing.reduce((cals, item) => {
      return cals + item.cals;
    }, this.cals)
  }

  get printValue() {
    return `
    ${this.size} ${this.name} 
    stuffing: ${this.getStuffing()}
    price: ${this.fullPrice} tugs
    calories: ${this.fullCals} cals`;
  };
};

class Salad extends Food {
  constructor(dish, weight = 100) {
    super(dish);
    this.name = dish.name;
    this.weight = weight;
    this.weightCoef = this.weight / 100
  }

  get fullPrice() {
    return this.price * this.weightCoef
  }

  get fullCals() {
    return this.cals * this.weightCoef
  }

  get printValue() {
    return `
    ${this.name} 
    weight: ${this.weight}g
    price: ${this.fullPrice} tugs
    calories: ${this.fullCals} cals`;
  }
};

class Beverage extends Food {
  constructor(dish) {
    super(dish);
    this.name = dish.name;
  };

  get printValue() {
    return `
    ${this.name}
    price: ${this.fullPrice} tugs
    calories: ${this.fullCals} cals`;
  }
};

class Order {
  orderState = 'open';
  constructor(list) {
    this.list = list;
  }

  add(dish) {
    if (this.orderState === 'closed') {
      return console.log('Sorry, you already paid for this order, please make another one.')
    }

    this.list.push(dish);
  }

  delete(dish) {
    if (this.orderState === 'closed') {
      return console.log('Sorry, you already paid for this order, please make another one.')
    }

    const index = this.list.findIndex(item => item === dish);
    if (index !== -1) {
      this.list.splice(index, 1)
    }
  }

  addToList(dishes) {
    if (this.orderState === 'closed') {
      return console.log('Sorry, you already paid for this order, please make another one.')
    }

    this.list.push(...dishes);
  };

  get totalPrice() {
    let price = 0;
    this.list.forEach(item => {
      price += item.fullPrice;
    })
    return price;
  }

  get totalCalories() {
    let calories = 0;
    this.list.forEach(item => {
      calories += item.fullCals;
    })
    return calories;
  };

  printOrder() {
    const order = this.list.map(item => item.printValue).join(
      `
    `);
    return `${order}

    total price: ${this.totalPrice} tugs
    total calories: ${this.totalCalories} cals`;
  }

  closeCheck() {
    this.orderState = 'closed';
  };
};

const ham = new Hamburger(SMALL_HAMBURGER, [CHEESE, SALAD, POTATO, CHEESE]);
const ces = new Salad(CAESARUS, 150)
const coke = new Beverage(COLA)

const ord = new Order([ham, ces, coke]);

ord.add(ham)
ord.delete(ham)
ord.closeCheck();
console.log(ord.printOrder());

const ham1 = new Hamburger(SMALL_HAMBURGER);

ord.add(ham1)