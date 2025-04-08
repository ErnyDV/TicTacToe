'use strict'
const gameBoard = (function(){
    const board = [0,0,0,0,0,0,0,0,0]

    const updateBoard = (choice, player) => {
        if(choice > 9 || choice < 1){
            return 'Invalid choice'
        }
        

        if(player !== 1 && player !== 2){
            return 'Invalid player'
        }
        
        if(board[choice - 1] !== 0){
            return 'Spot already taken'
        }

        board[choice - 1] = player;

        return 'Board updated'
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


    const checkWinner = (board) => {
        //Row Check
        for(let i = 0; i < 6; i += 3){
            if(board[i] === 1 && board[i + 1] === 1 && board[i + 2] === 1) return `Row ${i + 1} user 1 win`
            
            if(board[i] === 2 && board[i + 1] === 2 && board[i + 2] === 2) return `Row ${i + 1} user 2 win`
        }
        //Column check
        for(let i = 0; i < 3; i++){
            if(board[i] === 1 && board[i + 3] === 1 && board[i + 6] === 1) return `Column ${i + 1} user 1 win`
    
            if(board[i] === 2 && board[i + 3] === 2 && board[i + 6] === 2) return `Column ${i + 1} user 2 win`
        }

        //Diagonal check
        if(board[0] === 1 && board[4] === 1 && board[8] === 1) return `Diagonal left to right user 1 win`
        if(board[0] === 2 && board[4] === 2 && board[8] === 2) return `Diagonal left to right user 2 win`

        if(board[2] === 1 && board[4] === 1 && board[6] === 1) return `Diagonal right to left user 1 win`
        if(board[2] === 2 && board[4] === 2 && board[6] === 2) return `Diagonal right to left user 2 win`

        if(board.includes(0)){
            return 'Game still in progress'
        }else{
            return 'Tie'
        }
    }

    return {checkWinner}
})()

const gameDom = (function(){
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
        console.log(playerType)
        console.log(markType)
        
        if(!playerType[0] || !playerType[1] || !markType[0] || !markType[1] || !name){ 
            console.log('Button Missing')
            return true
        }

        if (!playerType[0]?.classList?.contains('option-selected')&& !playerType[1]?.classList?.contains('option-selected')){
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
            console.log('hello')
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

    return {assignClickEvents, optionSelection, formError, checkReadyStatus,readyUp, enableStartButton}
})()

function player(name, mark){
    if (typeof name !== typeof '') return 'Name must be a string';
    
    if (typeof mark !== typeof '') return 'Mark must be a string';

    if (mark.toUpperCase() !== 'X' && mark.toUpperCase() !== 'O') return `Invalid mark type in player creation: ${mark}`

    return {name, mark: mark.toUpperCase()}
}
