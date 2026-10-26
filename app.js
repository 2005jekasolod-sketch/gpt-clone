const submitButton = document.querySelector('#submit');
const inputElement = document.querySelector('input');
const outputElement = document.querySelector('#output');

async function getMessage() {
    const userMessage = inputElement.value.trim();

    if (!userMessage) return;

    //Показываем сообщение пользователя
    outputElement.value = '';

    // Очищаем поле ввода
    inputElement.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        //Показываем ответ ИИ
        outputElement.innerHTML += `<p style="color: red;"><Error:</strong> ${error.message}</p>`;

    } catch (error) {
        console.error (error);
        outputElement.innerHTML += `<p style="color: red;"><strong>Error:</strong> ${error.message}</p>`;
    }
}

// Клик по кнопке
submitButton.addEventListener('click', getMessage);

//Нажатие Enter
inputElement.addEventListener('keydown', (e) => {
    if   (e.key === 'Enter') {
        getMessage();
    }
})