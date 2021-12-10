// Generally, generics are type definitions that are somehow related to the base(?) type

// Here <> refers to each element of the array
const names: Array<string> = []; // the same as string[]
// We safely can use string methods here:
// names[0].split("");

// Here <> refers to the type of the resolved value
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done!");
  }, 2000);
});

// Again, we can safely use string methods here:
promise.then(data => {
  data.split("");
});

// Generic Functions
// Here T, U means that the generic is type of 'any'
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Woo", hobbies: ["Sports"] }, { age: 25 });

mergedObj.name;

// Type constraint
function mergeWithConstraint<T extends object, U extends object>(
  objA: T,
  objB: U,
) {
  return Object.assign(objA, objB);
}

// Typescript will complain here because 30 is not an object!
// const mergedObjWithConstaint = mergeWithConstraint({ name: "Woo", hobbies: ["Sports"] }, 30)

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length > 0) {
    descriptionText = "Got " + element.length + " values.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe([1, 2]));

// 'keyof' constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U,
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Woo" }, "name"));

// Generic Classes
class DataStorage<T extends string | number | object> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Woo");
textStorage.addItem("Yeong");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);

const objStorage = new DataStorage<object>();
const wooObj = { name: "Woo" };
objStorage.addItem(wooObj);
objStorage.addItem({ name: "Yeong" });
objStorage.removeItem(wooObj);
console.log(objStorage.getItems());

// Generic Utility Types (examples)
// Partial<>
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date,
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// Readonly<>
const namesArr: Readonly<string[]> = ["Woo", "Yeong"];
// Typescript will complain here!
// namesArr.push("Kim");
// namesArr.pop();
