// Intersection Types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

/**
 *  Exactly same as
 * interface Admin {
 *   name: string;
 *   privileges: string[];
 * }npm start
 *
 * interface Employee {
 *   name: string;
 *   startDate: Date;
 * }
 *
 * interface ElevatedEmployee extends Employee, Admin {}
 */

const e1: ElevatedEmployee = {
  name: "Woo",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// 2. Type Guards
function add(a: Combinable, b: Combinable) {
  // This is type guard.
  // But what about custom types?
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);

  // Check if property exists
  if ("privileges" in emp) {
    console.log("Previleges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate);
  }
}

printEmployeeInfo({ name: "Woo", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("Driving");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ... " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // Warning: we wouldn't be able to use instanceof if it were an interface
  // Because interfaces are not compiled to JS code,
  // So there is no way the compiled code would know about the class 'Truck'
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// 3. Discriminated Unions

interface Bird {
  // Types are 'discriminated' with this property ('type' property here)
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // This won't work, because Bird here is an instance / type
  // if (animal instanceof Bird)

  let speed: number;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

// 4. Type Casting

// Typescript here infers type of the element
// because we select the element with a tagname
const elementWithExactInferredType = document.querySelector("p");

// Typescript does not dive into html nor it looks up ids,
// so it can't infer the exact type of the element.
const elementWithoutExactInferredType =
  document.getElementById("message-output");

// Here typecasting can be used to specify the type of the element exactly

// with <>
const userInputElement = <HTMLInputElement>(
  document.getElementById("user-input")
);
// with as
const userInputElement2 = document.getElementById(
  "user-input",
) as HTMLInputElement;

userInputElement.value = "Hi There!";
userInputElement.value = "Hi There 2!";

// 5. Index properties

interface ErrorContainer {
  // {email: 'Not a valid email', username: 'Must start with a character'}
  [prop: string]: string;
}

// 6. Function Overloads

// This would work also if b is optional
// function addWithOverload(n: number): number;
function addWithOverload(a: number, b: number): number;
function addWithOverload(a: string, b: string): string;
function addWithOverload(a: number, b: string): string;
function addWithOverload(a: string, b: number): string;
function addWithOverload(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// const result = addWithOverload(1,2 )
// result.split('w')
