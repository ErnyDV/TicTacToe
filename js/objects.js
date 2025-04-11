'use strict'
const gameBoard = (function(){
    const board = [0,0,0,0,0,0,0,0,0]

    const updateBoard = (choice, player) => {
        console.log(choice)
        console.log(player)
        if (player.toUpperCase() === 'X'){
            player = 1
        }else{
            player = 2
        }

        if(choice > 9 || choice < 1){
            return `Invalid choice ${choice}` 
        }
        

        if(player !== 1 && player !== 2){
            return 'Invalid player'
        }
        
        if(board[choice - 1] !== 0){
            return 'Spot already taken'
        }

        board[choice - 1] = player;

        return true
    }
    
    const displayBoard = () => {
        console.log(`
             ${board[0]}|${board[1]}|${board[2]}
             ${board[3]}|${board[4]}|${board[5]}
             ${board[6]}|${board[7]}|${board[8]}
            `)

        return 'Board displayed'
    }

    const clearBoard = () => {
        board.fill(0,0,8)

        return 'Board cleared'
    }

    return {board , updateBoard, displayBoard, clearBoard}
})()


const game = (function(){
    const players = []
    let playerTurn;
    let togglePlayer = true;

    const checkWinner = (board) => {
        //Row Check
        for(let i = 0; i < 6; i += 3){
            if(board[i] === 1 && board[i + 1] === 1 && board[i + 2] === 1) return `Row ${i + 1}`
            
            if(board[i] === 2 && board[i + 1] === 2 && board[i + 2] === 2) return `Row ${i + 1}`
        }
        //Column check
        for(let i = 0; i < 3; i++){
            if(board[i] === 1 && board[i + 3] === 1 && board[i + 6] === 1) return `Column ${i + 1}`
    
            if(board[i] === 2 && board[i + 3] === 2 && board[i + 6] === 2) return `Column ${i + 1}`
        }

        //Diagonal check
        if(board[0] === 1 && board[4] === 1 && board[8] === 1) return `Diagonal left to right`
        if(board[0] === 2 && board[4] === 2 && board[8] === 2) return `Diagonal left to right`

        if(board[2] === 1 && board[4] === 1 && board[6] === 1) return `Diagonal right to left`
        if(board[2] === 2 && board[4] === 2 && board[6] === 2) return `Diagonal right to left`

        if(board.includes(0)){
            return false
        }else{
            return 'Tie'
        }
    }

    function changePlayer(){
        console.log(players)
        if (!togglePlayer){
            togglePlayer = !togglePlayer
            this.playerTurn = players[0]
        }else{
            togglePlayer = !togglePlayer
            this.playerTurn = players[1]
        }
    }

    function importPlayer(player){
        console.log(player)
        this.players.push(player)
        console.log(players)
    }

    return {playerTurn, players ,checkWinner, importPlayer, changePlayer}
})()

const gameDom = (function(){
    const playerTurnEl = document.querySelector('#tictactoe-message');

    const assignClickEvents = function(element){
        if(element?.type === 'optionGroup'){
            element.src.forEach((option) => {
                option.addEventListener('click', (event) => {
                    this.optionSelection(event.target.parentElement.parentElement,event.target)
                })
            })
        }
        
        if(element?.type === 'readyButton'){
            element.src.addEventListener('click', () => {
                document.querySelector("#player-container").style.display = 'none'
                document.querySelector('#tictactoe-container').style.display = 'flex'
            })
        }

        if(element?.type === 'cell'){
            element.src.addEventListener('click', (event) =>{
                event.stopPropagation()
                let playerChoice;

                if (event.target.classList.contains('player-mark')){
                   playerChoice = event.target.parentElement.ariaLabel
                }else{
                    playerChoice = event.target.ariaLabel
                }
                let isBoardUpdated = gameBoard.updateBoard(playerChoice, game.playerTurn.mark)


                if(typeof isBoardUpdated === typeof '') return
                event.target.innerHTML = `<p class="player-mark">${game.playerTurn.mark}</p>`
                if(typeof game.checkWinner(gameBoard.board) === typeof '') {
                    console.log('hello')
                    this.updatePlayerTurnEl(`Player ${game.playerTurn.name} wins! ${game.checkWinner(gameBoard.board)}`)

                    let eventChildren = [...event.target.parentElement.children]
                    eventChildren.forEach((el) => {
                        console.log(el)
                        el.replaceWith(el.cloneNode(true))
                    })
                    return
                }
                this.updatePlayerTurnEl()
                game.changePlayer()     

                
                console.log(event.target.parentElement.children)
              
            })
        }
    }

    const optionSelection = (optionGroup, optionClicked) => {
        if(!optionGroup || !optionClicked) return 'Element missing'
        
        if(optionClicked.style.backgroundColor === 'rgb(59, 97, 141)') return
   
        const options = [...optionGroup.querySelectorAll('.option-icon')]

        if(options.findIndex((el) => el === optionClicked ) === 1){
            options[0].classList.remove('option-selected')
            options[1].classList.add('option-selected')
        }else{
            options[1].classList.remove('option-selected')
            options[0].classList.add('option-selected')
        }
    }

    const formError = (playerType, markType, name) => {

        if(!playerType[0] || !playerType[1] || !markType[0] || !markType[1] || !name){ 
            console.log('Button Missing')
            return true
        }

        if (!playerType[0]?.classList?.contains('option-selected') && !playerType[1]?.classList?.contains('option-selected')){
            console.log('Missing player type')
            return true
        }

        if (!markType[0].classList.contains('option-selected') && !markType[1].classList.contains('option-selected')){ 
                console.log('Missing mark type')
                return true
        }

        if (name.value === ''){
            console.log('Missing name')
            return true
        }
        
        return false
    }

    const checkReadyStatus = function(player){
        if (this.formError(player.playerType, player.markType, player.name)){
            return true            
        }else{
            return false
        }

    }


    const readyUp = (button, formError) => {
        if(!button) return 'Button missing'
        if (formError){
            document.querySelector(button).style.backgroundColor = '#B85D51'
            return
        }
        
        document.querySelector(button).style.backgroundColor = '#5FB361'
    }

    const enableStartButton = (button, bool) =>{
        console.log(document.querySelector(button))
        if(bool){
            document.querySelector(button).style.display = 'block'

        }else{
            document.querySelector(button).style.display = 'none'
        }
    }

    const updatePlayerTurnEl = function(optionalMessage){
        if(optionalMessage){
            playerTurnEl.textContent = optionalMessage;
            return
        }

       playerTurnEl.textContent = `Player ${game.playerTurn.name}'s turn`;
    }

    return {updatePlayerTurnEl, assignClickEvents, optionSelection, formError, checkReadyStatus,readyUp, enableStartButton}
})()

function player(name, mark, playerType){
    if (typeof name !== typeof '') return 'Name must be a string';
    
    if (typeof mark !== typeof '') return 'Mark must be a string';

    if (typeof playerType !== typeof '') return 'Playertype must be a string'

    if (playerType.toUpperCase() !== 'HUMAN' && playerType.toUpperCase() !== 'BOT') return `Invalid player type in player creation ${playerType}`

    if (mark.toUpperCase() !== 'X' && mark.toUpperCase() !== 'O') return `Invalid mark type in player creation: ${mark}`

    return {name, mark: mark.toUpperCase(), playerType}
}
