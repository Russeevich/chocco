const player = document.getElementById('player'),
    play = document.getElementById('video__play'),
    video = document.getElementById('video'),
    timer = document.getElementById('timer'),
    volume = document.getElementById('volume'),
    sound = document.querySelector('.controls__sound')

let time,
    isMuted = false,
    lastVolume = volume.value


const getTime = (time) => {
    let minutes = Math.floor(time / 60),
        seconds = Math.floor(time - minutes * 60)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    return `${minutes}:${seconds}`
}

video.addEventListener('loadeddata', e => {
    Init()
})

sound.addEventListener('click', e => {
    isMuted = !isMuted

    if (isMuted) {
        lastVolume = volume.value
        volume.value = 0
    } else {
        volume.value = lastVolume
    }
})

const Init = () => {
    document.querySelector('.controls__end').innerText = getTime(video.duration)
    timer.max = Math.floor(video.duration)
    video.volume = volume.value
}

const activeVideo = () => {
    video.play()

    time = setInterval(() => {
        timer.value = video.currentTime
        document.querySelector('.controls__now').innerText = getTime(video.currentTime)
    }, 1000)
}

const disableVideo = () => {
    video.pause()
    clearInterval(time)
}

play.addEventListener('click', e => {
    if (player.classList.contains('active'))
        disableVideo()
    else activeVideo()

    player.classList.toggle('active')
})

timer.addEventListener('change', e => {
    video.currentTime = timer.value
})

video.addEventListener('ended', e => {
    disableVideo()
    player.classList.toggle('active')
})

volume.addEventListener('change', e => {
    video.volume = volume.value
})

Init()