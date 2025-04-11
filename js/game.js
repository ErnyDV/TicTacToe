(function(){
    const startGame = document.querySelector('#start-game')
    gameDom.assignClickEvents({
        src: [...document.querySelectorAll('.option')],
        type: 'optionGroup'
    })
    gameDom.assignClickEvents({
        src: startGame,
        type: 'startGame'
    })

    const player1El = 
    {
        playerType: [...document.querySelector('#player1 #p1playertype-options').getElementsByClassName('option-icon')],
        markType: [...document.querySelector('#player1 #p1marktype-options').getElementsByClassName('txt')],
        name: document.querySelector('#player1name'),
        ready: document.querySelector('#player1ready'),

    }

    const player2El = 
    {
        playerType: [...document.querySelector('#player2 #p2playertype-options').getElementsByClassName('option-icon')],
        markType: [...document.querySelector('#player2 #p2marktype-options').getElementsByClassName('txt')],
        name: document.querySelector('#player2name'),
        ready: document.querySelector('#player2ready'),
        
    }
    
    let eventAssigned = false;
    

    let gameReadyCheck = setInterval(() => {
        const player1Ready = gameDom.checkReadyStatus(player1El)

        const player2Ready = gameDom.checkReadyStatus(player2El)
        
        gameDom.readyUp('#player1ready', player1Ready)
        gameDom.readyUp('#player2ready', player2Ready)

        if(!player1Ready && !player2Ready){
            gameDom.enableStartButton('#start-game', true)
            console.log('hello')

            if(eventAssigned) return
            eventAssigned = true
            startGame.addEventListener('click', () => {
                const playerType1 = document.querySelector('#player1 #p1playertype-options').getElementsByClassName('option-selected')
                const playerType2 = document.querySelector('#player2 #p2playertype-options').getElementsByClassName('option-selected')
                const markType1 = document.querySelector('#player1 #p1marktype-options').getElementsByClassName('option-selected')
                const markType2 = document.querySelector('#player2 #p2marktype-options').getElementsByClassName('option-selected')
            

                if(markType1[0].ariaLabel === markType2[0].ariaLabel){
                    startGame.setCustomValidity('Mark types cannot be the same')
                    startGame.reportValidity()
                    return
                }
                clearInterval(gameReadyCheck)

                const player1 = player(player1El.name.value, markType1[0].ariaLabel, playerType1[0].ariaLabel, 1)
                const player2 = player(player2El.name.value, markType2[0].ariaLabel, playerType2[0].ariaLabel, 2)

                game.importPlayer(player1)
                game.importPlayer(player2)
            
                document.querySelector(".player-container").style.display = 'none'
                document.querySelector('.tictactoe-container').style.display = 'flex'
                startGame.style.display = 'none'
                
                game.playerTurn = player1
                const domBoard = [...document.querySelector('#tictactoe').children];
            
                domBoard.forEach((el) => {
                    gameDom.assignClickEvents({
                        src: el,
                        type: 'cell'
                    })
                })
                
                gameDom.updatePlayerTurnEl()
            })

        }else{
            gameDom.enableStartButton('#start-game', false)
        }
    }, 100)
    
})()


