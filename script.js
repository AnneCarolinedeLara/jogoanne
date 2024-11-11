document.addEventListener('DOMContentLoaded', () => {
    const words = ["caneta", "professor", "mochila", "folha", "lapis" ,"giz" , "cadeira" , "uniforme" ];
    let currentWord = '';
    let hiddenWord = '';
    let score = 0;
    let level = 1;
    let timeLeft = 30;
    let timerInterval;

    const timerDisplay = document.getElementById('timer');
    const wordDisplay = document.getElementById('word-display');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const messageDisplay = document.getElementById('message');
    const letterButtons = document.querySelectorAll('.letter-btn');
    const resetButton = document.getElementById('reset-button');

    // Função para começar o jogo
    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        hiddenWord = "_".repeat(currentWord.length);
        updateWordDisplay();
        resetTimer();
        startTimer();
        updateScore();
        updateLevel();
        messageDisplay.textContent = '';
    }

    // Função para atualizar a palavra na tela
    function updateWordDisplay() {
        wordDisplay.textContent = hiddenWord.split('').join(' ');
    }

    // Função para atualizar a pontuação
    function updateScore() {
        scoreDisplay.textContent = score;
    }

    // Função para atualizar o nível
    function updateLevel() {
        levelDisplay.textContent = level;
    }

    // Função para lidar com a tentativa de uma letra
    function handleLetterClick(event) {
        const letter = event.target.textContent.toLowerCase();
        let newHiddenWord = '';

        // Se a letra está na palavra
        if (currentWord.includes(letter)) {
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === letter) {
                    newHiddenWord += letter;
                } else {
                    newHiddenWord += hiddenWord[i];
                }
            }
            hiddenWord = newHiddenWord;
            updateWordDisplay();

            // Verifica se o jogador completou a palavra
            if (hiddenWord === currentWord) {
                score += 10;
                level += 1;
                setTimeout(() => {
                    startGame();
                }, 1000);
            }
        } else {
            timeLeft -= 3;  // Penaliza o tempo
        }
    }

    // Função para iniciar o cronômetro
    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                messageDisplay.textContent = 'Tempo esgotado! A palavra era ' + currentWord;
            } else {
                timerDisplay.textContent = timeLeft;
                timeLeft--;
            }
        }, 1000);
    }

    // Função para resetar o cronômetro
    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 60;
    }

    // Evento para os botões de letras
    letterButtons.forEach(button => {
        button.addEventListener('click', handleLetterClick);
    });

    // Evento para o botão de reiniciar
    resetButton.addEventListener('click', startGame);

    // Começar o jogo ao carregar
    startGame();
});




