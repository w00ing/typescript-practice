// interface Person {
//   name: string;
//   age: number;
//   greet(phrase: string): void;
// }

// let user1: Person;

// user1 = {
//   name: "Woo",
//   age: 25,
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };

// user1.greet("phrase");

interface Named {
  readonly name: string;
  // optional property
  outputName?: string;
}

// interfaces can be extended as well
// unlike classes, we can extend from multiple interfaces
interface Greetable extends Named {
  greet(phrase: string): void;
}

// implementing interface forces the class to 'implement' all the properties of the given interface
class Person implements Greetable {
  name: string;
  age: number = 30;
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log("Hello");
  }
}

let user1: Greetable;
user1 = new Person("Woo");

// interface can also be defined as function type.
interface AddFn {
  (a: number, b: number): number;
}

// this is equivalent to the following type:
// type AddFn = (a: number, b: number)  => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
