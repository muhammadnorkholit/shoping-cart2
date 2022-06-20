// console.log(Data)
// console.log(Storage.getAllCart())
const productBox = document.querySelector('.boxs');

// ? class class

class Products {
    async getProducts() {
        try {

            const req = await fetch("data.json");
            const res = await req.json()

            return res
        } catch (error) {
            console.log(error)
        }
    }

}

class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static saveCart(products) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = []
        }
        cart.push(products)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    static getProducts(id) {
        let product = JSON.parse(localStorage.getItem('products'));
        if (!product) {
            product = []
        }
        return product.find(data => data.id === id)
    }
    static getCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = []
        }
        return cart.find(data => data.id === id)
    }
    static getAllCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = []
        }
        return cart
    }

}

class UI {
    displayProducts(products) {
        let result = ""
        products.forEach(product => {
            result += `<div class="box">
                    <figure>
                        <img src="${product.image}"
                            alt="">
                    </figure>
                    <div class="content">
                        <p class="title">${product.title}</p>
                        <p class="price">IDR ${parseFloat(product.price).toLocaleString()}</p>
                        <button class="add_cart" id="${product.id}">add to cart <i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>`
        })

        productBox.innerHTML = result

    }
    static setCartNum() {

        const cartNum = document.querySelector('.cart-num');
        let carts = Storage.getAllCart().length

        if (carts > 0) {
            cartNum.classList.add('active')
            cartNum.innerHTML = carts
        } else {
            cartNum.classList.remove('active')
        }


    }
    static displayCart() {
        const carts = document.querySelector('#cart');
        const close = document.querySelector('.close');
        carts.addEventListener("click", () => {
            const cart_container = document.querySelector('.cart_container')
            cart_container.classList.add("active");
        })
        close.addEventListener("click", () => {
            const cart_container = document.querySelector('.cart_container')
            cart_container.classList.remove("active");
        })
        let result = '';
        const productCart = document.querySelector('.product-cart');
        const cart = Storage.getAllCart()


        let chec = ""
        let total = 0
        const checkout = document.querySelector('.checkout .info')

        cart.forEach((data, index) => {
            result += ` <div class="product">
                    <figure>
                        <img src="${data.image}" alt="">
                    </figure>
                    <div class="info">
                        <p class="title">${data.title}</p>
                        <p class="price">IDR ${parseFloat(data.price).toLocaleString()}</p>
                    </div>
                     <div class="action">
                        <i id="${index}" class="fa far far fa-trash-alt remove-cart"></i>

                    </div>
                </div>`
            total += parseFloat(data.price)

        })

        chec += `  <p>total harga (${cart.length} barang)</p>
                        <p class="price">IDR ${total.toLocaleString()}</p>
            `
        checkout.innerHTML = chec
        productCart.innerHTML = result


        this.removeCart()


    }
    static removeCart() {
        const btnRemove = document.querySelectorAll(".remove-cart")
        btnRemove.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.id
                // let cart = []
                const carts = Storage.getAllCart()
                // cart.push(carts)
                carts.splice(index, 1)
                console.log(carts)

                // Storage.saveCart(carts)
                localStorage.setItem("cart", JSON.stringify(carts))

                UI.setCartNum()
                UI.displayCart()
                const btn = new Cart()
                btn.getBtn()
            })

        })
    }

}

class Cart {
    getBtn() {
        const btnAddCart = document.querySelectorAll('.add_cart');

        btnAddCart.forEach(btn => {
            const id = btn.id
            const rue = Storage.getCart(id)
            if (rue) {
                btn.disabled = true;
            } else {
                btn.disabled = false;

                btn.addEventListener("click", (e) => {
                    btn.disabled = true;
                    const dataProduct = Storage.getProducts(id)
                    Storage.saveCart(dataProduct)
                    UI.setCartNum()
                    UI.displayCart()
                })
            }

        })
    }
}
// ? load file

window.addEventListener('DOMContentLoaded', () => {
    const products = new Products()
    const ui = new UI()
    const cart = new Cart()

    products.getProducts().then(data => {
        ui.displayProducts(data)
        Storage.saveProducts(data)

    }).then(() => {
        cart.getBtn()
        UI.setCartNum()
        UI.displayCart()
        UI.removeCart()
    })

})


// ? get element
// import {
//     ltorage
// } from "./Storage";

// console.log(ltorage)