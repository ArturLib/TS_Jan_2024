// const greeting:string = 'Hello from typescript'
//     console.log(greeting);

// const asd = (names: string[], ddd: number, hhh: boolean) => {
//     console.log(names, ddd, hhh)
// };
// asd(['Max', 'Ol'], 54, false);


// class User {
//     constructor(private _name: string, public age: number, protected status: boolean) {
//     }
//
//     // самостійний спосіб описати доступ до приватних змінних
//     // getNme(): string {
//     //     return this.name;
//     // }
//     // setName(name: string): void {
//     //     this.name = name;
//     // }
//
//     // спосіб через ts generate getters and setters (cmnd+N)
//     get name(): string {
//         return this._name;
//     }
//
//     set name(value: string) {
//         this._name = value;
//     }
// }

// const user3 = new User('Sem', 45, false);
    // до першого способу відноситься
// user3.setName('Victor');
// console.log(user3.getNme());

    // до другого способу відноситься
// user3.name = 'Pit';
// console.log(user3.name);

    // абстрактні класи і абстрактні методи (але це вже застарілі способи, зараз це все робиться через інтерфейси)
// abstract class Shape {
//
//     // описую тут два абстрактні методи perimeter and area
//     abstract perimeter():number
//     abstract area():number
// }
//
//     // унаслідуємось від abstract class Shape
// class Rectangle extends Shape {
//     constructor(private a: number, private b: number) {
//         super();
//     }
//     perimeter(): number {
//         return (this.a + this.b) * 2;
//     };
//
//     area(): number {
//         return (this.a * this.b);
//     }
// }
//
//     // унаслідуємось від abstract class Shape
// class Triangle extends Shape{
//
//     constructor(private a: number, private b: number, private c: number) {
//         super();
//     }
//
//     perimeter(): number {
//         return this.a + this.b + this.c;
//     }
//
//     area(): number {
//         return this.a * this.b * this.c;
//     }
// }
//
// // а тепер через те що в нас всі фігури Rectangle Triangle унаслідувані від Shape то ми можемо використати поліморфізм
// const shapes: Shape[] = [
//     new Triangle(1, 2, 3),
//     new Rectangle(44, 55),
//     new Triangle(5, 2, 1)
// ];
// console.log(shapes);
// for (const shape of shapes) {
//     console.log(shape.perimeter());
//     console.log(shape.area());
// }

    // робота як в попередньому зразку (абстрактні класи і абстрактні методи) але через інтерфейси
abstract class Shape {
    abstract perimeter(): number;
}

interface ITools {
    area: () => number;
    perimeter: () => number
}

interface IGreeting {
    greeting: () => void
}

class Rectangle implements ITools, IGreeting {
    constructor(private a: number, private b: number) {
    }

    perimeter(): number {
        return (this.a + this.b) * 2;
    }

    area(): number {
        return this.a + this.b;
    }

    greeting(): void {
        console.log('Hello');
    }
}

class Triangle implements ITools{
    constructor(private a: number, private b: number, private c: number) {
    }

    perimeter(): number {
        return this.a + this.b + this.c;
    }

    area(): number {
        return this.b * this.b * this.c;
    }
}

const rectangle = new Rectangle(44,66);
const shapes2: ITools[] = [
    new Triangle(2,5,7),
    new Triangle(42,15,77),
    rectangle,
]

for (const shape of shapes2) {
    console.log(shape.perimeter());
    console.log(shape.area());
}

rectangle.greeting();