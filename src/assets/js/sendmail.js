const form = document.querySelector('#form'),
    sumbit = document.getElementById('sumbit'),
    modal = document.getElementById('response'),
    message = document.getElementById('message'),
    closeModal = document.getElementById('closeModal')

const changeModal = () => {
    modal.classList.toggle('active')
}

modal.addEventListener('click', e => {
    if (e.target === modal)
        changeModal()
})

const changeState = (text) => {
    message.innerText = text
    changeModal()
}

closeModal.addEventListener('click', (e) => {
    e.preventDefault()
    changeModal()
})



sumbit.addEventListener('click', (e) => {
    if (!form.checkValidity())
        return

    e.preventDefault()

    var xhr = new XMLHttpRequest();

    var json = JSON.stringify({
        name: form.name.value,
        phone: form.phone.value,
        comment: form.comment.value,
        to: "empiks18@gmail.com"
    });

    xhr.open("POST", 'https://webdev-api.loftschool.com/sendmail', true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            changeState("Сообщение успешно отправленно")
        } else {
            changeState("Ошибка отправки сообщения")
            return
        }
    }

    xhr.send(json)
})