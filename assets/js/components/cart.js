function cart(db, printProducts) {
     let cart = []

     // Elementos del Dom
     const productsDOM = document.querySelector('.products__container')
     const notifyDOM = document.querySelector('.notify')
     const cartDOM = document.querySelector('.cart__body')
     const countDOM = document.querySelector('.cart__count--item')
     const totalDOM = document.querySelector('.cart__total--item')
     const checkoutDOM = document.querySelector('.btn--buy')


     /* ***************** */

     function printCart() {

          let htmlCart = ''

          if (cart.length === 0) {
               htmlCart += `
                    <div class="cart__empty">
                         <i class='bx bxs-hot'></i>
                         <p class="cart__empty--text">
                              No hay productos en el carrito
                         </p>
                    </div>
               `
               notifyDOM.classList.remove('show--notify')
          } else {
               for (const item of cart) {
                    const product = db.find(p => p.id === item.id)
                    htmlCart += `
                    <article class="article" >
                    <div class="article--image">
                    <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="article--content">
                    <h3 class="article--title">${product.name}</h3>
                    <span class="article--price">$${product.price}</span>
                    <div class="article--quantity">
                    <button  type="button" class="article--quantity--btn article--minus" data-id="${item.id}" >
                    <i class='bx bx-minus'></i>
                    </button>
                    <span class="article--quantity-text">${item.qty}</span>
                    <button  type="button" class="article--quantity--btn article--plus" data-id="${item.id}" >
                    <i class='bx bx-plus'></i>
                    </button>    
                    </div>
                    <button  type="button" class="article--btn remove-from-cart" data-id="${item.id}" >
                    <i class='bx bx-trash' ></i>
                    </button>
                    </div>
               </article>
          `
               }
               notifyDOM.classList.add('show--notify')
          }

          cartDOM.innerHTML = htmlCart
          notifyDOM.innerHTML = showItemsCount()
          countDOM.innerHTML = showItemsCount()
          totalDOM.innerHTML = showTotal()
     }

     // Parte 1 del carrito agregar los objetos
     function addToCart(id, qty = 1) {
          const itemFinded = cart.find(i => i.id === id)

          if (itemFinded) {
               itemFinded.qty += qty
          } else {
               cart.push({ id, qty })
          }
          printCart()
     }

     // Parte 2 del carrito suma objetos al carrito
     function removeFromCart(id, qty = 1) {
          const itemFinded = cart.find(i => i.id === id)

          const result = itemFinded.qty - qty

          if (result > 0) {
               itemFinded.qty -= qty
          } else {
               cart = cart.filter(i => i.id !== id)
          }
          printCart()
     }

     // Parte 3 del carrito elimina todos los objetos del car
     function deleteFromCart(id) {
          cart = cart.filter(i => i.id !== id)

          printCart()
     }

     // Parte 4 visualizar los objetos del carrito
     function showItemsCount() {
          let suma = 0
          for (const item of cart) {
               suma += item.qty
          }
          return suma
     }

     // Parte 5 total de compra
     function showTotal() {
          let total = 0
          for (const item of cart) {
               const productsFinded = db.find(p => p.id === item.id)
               total += item.qty * productsFinded.price
          }
          return total
     }

     // Parte 6 comprar el producto|
     function checkout() {
          for (const item of cart) {
               const productsFinded = db.find(p => p.id === item.id)
               productsFinded.quantity -= item.qty
          }
          cart = []
          printCart()
          printProducts()
          window.alert('Gracias por su compra')
     }

     printCart()

     // Eventos del Dom
     productsDOM.addEventListener('click', function (e) {
          if (e.target.closest('.add--to--cart')) {
               const id = +e.target.closest('.add--to--cart').dataset.id
               addToCart(id)
          }
     })

     cartDOM.addEventListener('click', function (e) {
          if (e.target.closest('.article--minus')) {
               const id = +e.target.closest('.article--minus').dataset.id
               removeFromCart(id)
          }

          if (e.target.closest('.article--plus')) {
               const id = +e.target.closest('.article--plus').dataset.id
               addToCart(id)
          }

          if (e.target.closest('.remove-from-cart')) {
               const id = +e.target.closest('.remove-from-cart').dataset.id
               deleteFromCart(id)
          }
     })

     checkoutDOM.addEventListener('click', function () {
          checkout()
     })



}

export default cart