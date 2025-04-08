(function(){
    const startGame = document.querySelector('#star-game')
    gameDom.assignClickEvents({
        src: [...document.querySelectorAll('.option')],
        type: 'optionGroup'
    })
    gameDom.assignClickEvents({
        src: startGame,
        type: 'startGame'
    })

    let gameReadyCheck = setInterval(() => {
        const player1Ready = gameDom.checkReadyStatus(
        {
            playerType: [...document.querySelector('#player1 #p1playertype-options').getElementsByClassName('option-icon')],
            markType: [...document.querySelector('#player1 #p1marktype-options').getElementsByClassName('txt')],
            name: document.querySelector('#player1name'),
            ready: document.querySelector('#player1ready')

        })

        const player2Ready = gameDom.checkReadyStatus({
            playerType: [...document.querySelector('#player2 #p2playertype-options').getElementsByClassName('option-icon')],
            markType: [...document.querySelector('#player2 #p2marktype-options').getElementsByClassName('txt')],
            name: document.querySelector('#player2name'),
            ready: document.querySelector('#player2ready')
            
        })
        
        gameDom.readyUp('#player1ready', player1Ready)
        gameDom.readyUp('#player2ready', player2Ready)

        if(!player1Ready && !player2Ready){
            gameDom.enableStartButton('#start-game', true)
        }else{
            gameDom.enableStartButton('#start-game', false)
        }
    }, 100)
    
})()


