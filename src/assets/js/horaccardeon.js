const accardeon = document.querySelectorAll('.price__click')


const closeAcc = el => {
    const item = document.querySelectorAll('.price__item')
    item.forEach(e => {
        const temp = e.querySelector('.price__info')
        if (e !== el.parentNode || el.nextElementSibling.classList.contains('active')) {
            temp.classList.remove('active')
            e.classList.remove('active')
        } else {
            temp.classList.add('active')
            e.classList.add('active')
        }
    })
}

accardeon.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault()
        closeAcc(item)
    })
})