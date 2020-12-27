const commands = document.querySelectorAll('.command__item')

const opens = (e) => {
    commands.forEach(item => {
        const acc = item.querySelector('.command__accardeon')
        if (e !== item || item.classList.contains('active')) {
            item.classList.remove('active')
            acc.style.height = 0 + 'px'
        } else {
            item.classList.toggle('active')
            let height = 20
            acc.childNodes.forEach(items => {
                height += !isNaN(items.clientHeight) ? parseInt(items.clientHeight) : 0
            })
            acc.style.height = height + 'px'
        }
    })
}

commands.forEach(item => {
    item.addEventListener('click', () => opens(item))
})