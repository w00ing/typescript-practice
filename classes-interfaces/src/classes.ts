// Abstract classes can't be instantiated,
// but have to be extended
abstract class Department {
  static fiscalYear = 2021;
  // private readonly id: string;
  // private name: string;

  // private properties are neither accessible from outside nor by inherited classes;
  // protected properties, on the other hand, are still not accessible from outside but accessible by inherited classes;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name };
  }

  // Abstract methods must be implemented by all classes that extend from the given abstract class
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport(): string {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass some value");
    }
    this.addReport(value);
  }

  // private constructors are used to implement singleton pattern,
  // where the class only has to have one instance
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // with private constructors, the class is instanciated inside itself with a static method.
  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(name: string) {
    if (name === "Woo") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Yeong");

console.log(employee1, Department.fiscalYear);
const it = new ITDepartment("1", ["Wooyeong"]);

it.addEmployee("Woo");
it.addEmployee("Yeong");

const accounting = AccountingDepartment.getInstance();

// getters are accessed as normal properties, not as methods.
// console.log(accounting.mostRecentReport);

accounting.addEmployee("Woo");
accounting.addEmployee("Yeong");

accounting.addReport("New report");

// Directly assigning like this is not recommended
// turning employees to private solves this pattern
// accounting.employees[2] = 'Else'

it.describe();
accounting.describe();
// accounting.getReports();

// const accountingCopy = { name: "name", describe: accounting.describe };

// This would not compile because 'this' here refers to accountingCopy, which does not have properties and methods defined in Department class
// accountingCopy.describe();
