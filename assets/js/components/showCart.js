function showCart () {
     const btnCart = document.querySelector('.nav')
     const cart = document.querySelector('.cart')

     btnCart.addEventListener('click', function () {
          cart.classList.toggle('show--cart')
     })
     cart.addEventListener('click' , function (e) {
          if (e.target.closest('.btn--close')) {
               cart.classList.toggle('show--cart')
          }
          // Pregunta sobre el punto y no el punto
     })

}
export default showCart