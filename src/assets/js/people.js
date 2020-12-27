const cards = document.querySelectorAll('.card__inner'),
    photos = document.querySelectorAll('.photos__item')


const changeCard = (index) => {
    for (var i = 0; i < photos.length; i++) {
        photos[i].classList.remove('active')
        cards[i].classList.remove('active')
    }
    photos[index].classList.add('active')
    cards[index].classList.add('active')
}

photos.forEach((item, index) => {
    item.addEventListener('click', e => {
        e.preventDefault()
        changeCard(index)
    })
})