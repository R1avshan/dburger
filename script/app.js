const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    }
}



const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    basketCloseModal = document.querySelector('.wrapper__navbar-close'),
    basketCheckList = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    orderBasket = document.querySelector('.wrapper__navbar-bottom'),
    basketCount = document.querySelector('.warapper__navbar-count')


basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})

basketCloseModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})



productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        addBurger(this)
    })
})


// метод closest() возвращает ближайший родительский элемент, который соответствует селектору или null, если таковых нет.
// метод getAttribute() возвращает значение атрибута с указанным именем, или null, если атрибут не существует.

function addBurger(btn) {
    let parent = btn.closest('.wrapper__list-card')
    let parentId = parent.getAttribute('id')
    product[parentId].amount++
    renderBasket()
}

// toLowerCase() - преобразует строку в нижний регистр

function renderBasket() {
    const productArray = []
    for (const key in product) {
        const productItem = product[key]
        const productCard = document.querySelector(`#${productItem.name.toLowerCase()}`)
        const productCardAmount = productCard.querySelector('.wrapper__list-count')
        if (productItem.amount) {
            productArray.push(productItem)
            productCardAmount.classList.add('active')
            productCardAmount.innerHTML = productItem.amount /* добавляем количество каждого бургера */
        } else {
            productCardAmount.classList.remove('active')
            productCardAmount.innerHTML = 0 /* обнуляем количество бургеров в блоке */
        }
    }
    basketCheckList.innerHTML = ''
    productArray.forEach(item => {
        basketCheckList.innerHTML += cardItemBurger(item)
    })
    let allCount = totalCount()
    if (allCount) {
        basketCount.classList.add('active')
        basketCount.innerHTML = allCount
    } else {
        basketCount.classList.remove('active')
    }

    totalPriceBasket.innerHTML = `${totalSum()} сум`


}

function totalCount() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}

function totalSum() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}


function cardItemBurger(obj) {
    const { name, price, amount, img } = obj

    return `
        <div class="wrapper__navbar-product">
            <div class="wrapper__navbar-info">
                <img src="${img}" alt="${name}" class="wrapper__navbar-productImage">
                <div class="wrapper__navbar-infoSub">
                    <p class="wrapper__navbar-infoName">${name}</p>
                    <p class="wrapper__navbar-infoPrice">${price} сум</p>
                </div>
            </div>
            <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
                <button class="wrapper__navbar-symbol" data-symbol="-">-</button>
                <output class="wrapper__navbar-count">${amount}</output>
                <button class="wrapper__navbar-symbol" data-symbol="+">+</button>
            </div>
        </div>
    `
}

// contains('.wrapper__navbar-symbol') - возвращает true, если у элемента есть указанный класс, иначе false.

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('wrapper__navbar-symbol')) {
        const attr = e.target.getAttribute('data-symbol')
        const parent = e.target.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idProduct].amount--
            else if (attr == '+') product[idProduct].amount++
            renderBasket()
        }
    }
})


const print = document.querySelector('.print'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer')


orderBasket.addEventListener('click', () => {

    printBody.innerHTML = ''
    for (const key in product) {
        const { name, amount, totalSum } = product[key]
        if (amount) {
            print.style = `
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        background: #fff;
        border-radius: 10px;
        padding: 50px;
        `
            printBody.innerHTML += `
                <div class="print__body-item">
                    <p class="print__body-item_name">
                        <span class="name">${name}</span>
                        <span class="count">${amount} шт</span>
                    </p>
                    <p>${totalSum}</p>
                </div>
            `
            basketCheckList.innerHTML = ''
        }
    }
})


