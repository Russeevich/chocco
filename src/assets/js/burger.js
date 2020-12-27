const burger = document.getElementById('burger'),
    fmenu = document.getElementById('fmenu'),
    links = document.querySelectorAll('.fmenu__link')

const menu = () => {
    burger.classList.toggle('active')
    fmenu.classList.toggle('active')
        // document.body.style.overflow = burger.classList.contains('active') ? 'hidden' : 'auto'
}

burger.addEventListener('click', menu)

links.forEach(item => item.addEventListener('click', e => {
    e.preventDefault()
    menu()
}))