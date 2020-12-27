const sections = [...document.getElementsByTagName('section')],
    points = document.querySelectorAll('.points__link'),
    menu__link = document.querySelectorAll('.menu__link')
let currentSection = 0

scrollToSection(currentSection)

points.forEach((item, index) => {
    item.addEventListener('click', e => {
        currentSection = index
        e.preventDefault()
        if (index <= sections.length - 1)
            scrollToSection(index)
    })
})

menu__link.forEach((item, index) => {
    item.addEventListener('click', e => {
        currentSection = index + 1
        e.preventDefault()
        if (index <= sections.length - 1)
            scrollToSection(index + 1)
    })
})

window.addEventListener('wheel', function(e) {
    e.preventDefault()
    scrolling(e)
}, { passive: false })

const scrolling = (e) => {
    (e.deltaY < 0) ? --currentSection: ++currentSection

    if (currentSection < 0) currentSection = 0
    else if (currentSection > (sections.length - 1)) currentSection = (sections.length - 1);

    scrollToSection(currentSection)
}

function scrollToSection(i) {
    points.forEach((item, index) => {
        if (index === i)
            item.classList.add('active')
        else item.classList.remove('active')
    })
    document.querySelector(`.${sections[i].className}`).scrollIntoView({
        block: 'center',
        behavior: 'smooth'
    });
}

const scrollMob = (dir) => {
    switch (dir) {
        case 'up':
            currentSection++
            break
        case 'down':
            currentSection--
            break

        default:
            break
    }

    if (currentSection < 0) currentSection = 0
    else if (currentSection > (sections.length - 1)) currentSection = (sections.length - 1);

    scrollToSection(currentSection)
}

window.addEventListener('touchmove', e => {
    e.preventDefault()
}, { passive: false })

$('body').swipe({
    swipe: function(
        event,
        direction
    ) {
        scrollMob(direction)
        console.log(direction)
    }
})