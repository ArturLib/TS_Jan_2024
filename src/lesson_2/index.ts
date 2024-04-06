// ------------------------------------------------------------------------------------------------------------------ //
class GreetingService {
    static greeting ():void {     // - тут оголосили статичний метод greeting через ключове слово static
        console.log('Hello from method using static');
    }
}
GreetingService.greeting(); // - тут викликали цей метод

class GreetingService2 {
    greeting ():void {     // - тут оголосили звичайний метод greeting без використання static
        console.log('Hello from method without using statics');
    }
}
const greetingService = new GreetingService2;
// потрібно оголосити екземпляр класу для подальшого використання методу в класі
greetingService.greeting(); // таким чином відбувається виклик методу в класі


// ------------------------------------------------------------------------------------------------------------------ //
interface IUserForm {
    name: string,
    age: number
} // інтерфейс описаний для того, щоб типізувати дані отримані з форми

interface IUser extends IUserForm{
    id: number,
}  // інтерфейс IUser розширює інтерфейс IUserForm для того, щоб стилізувати юзера і приймати де це буде необхідно

interface IInput {
    name: HTMLInputElement,
    age: HTMLInputElement
} // створюємо інтерфейс з типами, щоб можна було протипізувати дані з форми

class UserService {
    private static readonly _userKey = 'users';
    // readonly - це щось на кшталт const, але в класі, в цьому рядку
    // ми оголосили змінну _userKey яка буде записуватись потім в наш локалсторедж і характеризуватиме ключ users

    private static _getAll(): IUser[] {
        return JSON.parse(localStorage.getItem(this._userKey)) || [];
    }; // це метод за допомогою якого ми хочемо звернутись в localStorage і забрати з нього масив юзерів,
       // якщо там нема нічого, то повернути пустий масив

    static create(data: IUserForm): void {
        const users = this._getAll(); // знову використовуємо метод _getAll(), щоб забрати всіх юзерів

        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        // якщо в юзерсів є довжина (якщо це масив), то тоді беремо за допомогою метода slice останній елемент масиву
        // (slice поверне останній елемент масиву, -1 вказує на останній елемент масиву, [0] вказує на 0 індекс масиву),
        // це останній юзер, беремо його id і додаємо 1, якщо масив пустий то тоді присвоюємо 1. (? тернарний оператор)

        users.push({id, ...data}); // в масив юзерів пушимо id, що згенерували раніше і data яка прийде з форми заповненої

        this._setToStorage(users); // через метод _setToStorage кладемо наших юзерсів в localStorage
    };

    static showHtml(): void {
        const userContainer = document.getElementById('userContainer') as HTMLDivElement;
        // витягуємо по id з html документа наш блок div в який будемо наповнювати, в подальшому юзерів.
        // Типізуємо через as цей елемент як HTMLDivElement

        userContainer.innerHTML = ''; // для того щоб при заповненні форми вона спершу перед збереженням обнулялась

        const users = this._getAll(); // this тут працює тільки тому, що метод _getAll є статичним
        // скориставшись методом _getAll() який раніше описали ми або отримуємо юзерів або пустий масив який
        // раніше описали в методі _getAll()

        const usersHtmlContent = users.map(user => {
            const itemDiv = document.createElement('div'); // створюємо при ітерації
            // div element для заповнення юзера. Типізація не потрібна, бо при створенні елемента з вказанням,
            // що це буде div, TS типізує його як div element самостійно
            const button = document.createElement('button');
            button.innerText = 'delete';
            button.onclick = () => {
                this._deleteById(user.id) // через метод _deleteById по кліку на кнопку видаляємо юзера
            };
            // створюємо при ітерації кнопку для видалення юзера. Типізація не потрібна, бо при створенні елемента з
            // вказанням, що це буде button, TS типізує його як button element самостійно
            itemDiv.innerText = `${user.id} - ${user.name}, age - ${user.age}`;
            // при ітерації наповнюємо itemDiv element значеннями юзера
            itemDiv.appendChild(button); // в itemDiv element запушили кнопку видалення юзера
            return itemDiv; // при переборі кожного елемента, map мусить повернути цей елемент, в результаті роботи map
            // поверне масив елементів з юзерами, тому ми даємо цьому блоку загальну змінну usersHtmlContent яка в собі
            // нестиме масив елементів (кожного юзера)
        });

        if (usersHtmlContent.length) {
            userContainer.append(...usersHtmlContent);
        } // робимо перевірку чи usersHtmlContent не пустий, якщо не пустий, то беремо userContainer
          // (який є блоком в html документі нашому) і апендимо туди деструктуризований масив юзерів з usersHtmlContent
        else {
            userContainer.innerText = 'Users not exist'
        } // якщо usersHtmlContent є пустим, то врисуємо що юзери відсутні
    };

    private static _setToStorage(data: IUser[]): void {
        localStorage.setItem(this._userKey, JSON.stringify(data)) // створили метод який прийматиме data типу IUser[]
        // та записуватиме її в localStorage по ключу _userKey оголошеного в методі з самого початку,
        // JSON.stringify(data) - якраз передаватиме масив юзерів, перетворюючи його в стрінгу

        this.showHtml(); // звертаємось до методу showHtml для того щоб перемальовувати сторінку при маніпуляціїї з нею
    };

    private static _deleteById(id: number): void {
        const users = this._getAll(); // знову витягуємо актуальну інфу з локал стореджа про юзерсів

        const index = users.findIndex(user => user.id === id);
        // таким чином шукаємо індекс елементу який треба видалити. Для цього беремо всіх users за допомогою методу
        // findIndex перебираємо всіх юзерів і шукаємо user.id щоб дорівнювало id яку нам треба видалити

        users.splice(index, 1); // беремо масив users і видаляємо юзера через знайдений раніше index цього юзера

        this._setToStorage(users); // через метод _setToStorage кладемо оновлений масив юзерсів для
        // відображення потім на сторінці оновленого масиву
    };
}

UserService.showHtml(); // викликаємо наш UserService та його метод showHtml, який є статичним і не приватним
                        // (приватний не можливо так викликати), для того, щоб відмалювати юзерів в документі

const form = document.forms['userForm'] as HTMLFormElement; // витягуємо форму з хтмл документа і
// примусово через ключове слово as вказуємо який тип ми матимемо - HTMLFormElement

form.onsubmit = (e: SubmitEvent) => { // e: SubmitEvent - типізуємо це як - SubmitEvent
    e.preventDefault(); // обнулюємо налаштування перезавантаження сторінки при відпрацюванні форми

    const {name: nameInput, age: ageInput} = form as any as IInput;
    // для того щоб перебити раніше протипізований нами form (рядок 96)
    // який ми протипізували як HTMLFormElement, потрібно спершу вказати що це тип any і перепризначити типізацію
    // на тип IInput вказаний нами в інтерфейсі IInput. Тепер form1 буде бачити name і age що приходять з форми.
    // {name: nameInput, age: ageInput} це одразу деструктуризований обєкт що приходить з форми

    UserService.create({name: nameInput.value, age: +ageInput.value})
    // викликаємо метод create написаний нами, та через дату в методі заповняємо дані що прийшли з форми в наступному
    // форматі - {name: nameInput.value, age: +ageInput.value} (+ поставили для того, щоб з форми дані перевести в number

    form.reset(); // ресетаємо форму, щоб вона очищалась
};