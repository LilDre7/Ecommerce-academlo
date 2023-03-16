function loader() {
     window.addEventListener('animate', function () {
          const loader = document.querySelector('.animater')
          loader.classList.add('loader--hidden')
     })
}


function pageLoaded() {
     let loaderSection = document.querySelector('.loader-section'); loaderSection.classList.add('loaded');
}

document.onload = pageLoaded();

export default loader
