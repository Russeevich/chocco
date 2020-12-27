const slider = document.getElementById('slider'),
    left = document.getElementById('left'),
    right = document.getElementById('right'),
    viewslide = 1

let slideOffset = document.getElementById('slider__show').offsetWidth,
    maxWidth = (slider.children.length - viewslide) * slideOffset,
    position = 0

const init = () => {
    slideOffset = document.getElementById('slider__show').offsetWidth
    maxWidth = (slider.children.length - viewslide) * slideOffset
    reSize()
}

const reSize = () => {
    slider.style.right = position = 0;
    document.querySelectorAll('.slider__content').forEach(item => {
        item.style.width = document.getElementById('slider__show').offsetWidth + 'px'
    })
}

window.onresize = () => {
    init()
}

left.addEventListener('click', () => {
    if (position <= 0)
        return
    position -= slideOffset
    slider.style.right = position + 'px'
})

right.addEventListener('click', () => {
    if (position >= maxWidth)
        return
    position += slideOffset
    slider.style.right = position + 'px'
})

init()