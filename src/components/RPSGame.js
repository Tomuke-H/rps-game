import React, { useEffect, useState } from 'react'
import { Card, Grid, Icon } from 'semantic-ui-react'
import '../stylesheets/RPSGame.css'

const choices = ["rock", "paper", "scissors"]

const allMessages = [
    "Looks like you lost! Try again?",
    "You won! Nice job.",
    "A tie?? That won't do, try again!"
]

const RPSGame = () =>{
    const [userChoice, setUserChoice] = useState('')
    const [userPrevPick, setUserPrevPick] = useState('')
    const [compPrevPick, setCompPrevPick] = useState('')
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [ties, setTies] = useState(0)
    const [message, setMessage] = useState('Pick Rock, Paper, or Scissors to begin!')
    const [totalGames, setTotalGames] = useState(0)

    useEffect(()=>{
        if(userChoice !== ''){
            setTotalGames(totalGames + 1)
            runGame();
        }
    }, [userChoice])


    const handleRock = (comp) => {
        setUserPrevPick('rock')
        if(comp === 'scissors'){
            setWins(wins + 1)
            setMessage(allMessages[1])
        } else {
            setLosses(losses + 1)
            setMessage(allMessages[0])
        }
    }

    const handleScissors = (comp) => {
        setUserPrevPick('scissors')
        if(comp === 'paper'){
            setWins(wins + 1)
            setMessage(allMessages[1])
        } else {
            setLosses(losses + 1)
            setMessage(allMessages[0])
        }
    }

    const handlePaper = (comp) => {
        setUserPrevPick('paper')
        if(comp === 'rock'){
            setWins(wins + 1)
            setMessage(allMessages[1])
        } else {
            setLosses(losses + 1)
            setMessage(allMessages[0])
        }
    }


    const runGame = () => {
        let compChoice = choices[Math.floor(Math.random() * 3)]
        setCompPrevPick(compChoice)
        // let compChoice = 'rock'
        console.log("Comp picked:", compChoice)
        console.log("User picked:", userChoice)
        if(compChoice == userChoice){
            setMessage(allMessages[2])
            setUserPrevPick(userChoice)
            setCompPrevPick(compChoice)
            setUserChoice('')
            return setTies(ties + 1)
        }
        if(userChoice === 'rock'){
            handleRock(compChoice)
        } else if (userChoice == 'paper'){
            handlePaper(compChoice)
        } else if (userChoice == 'scissors'){
            handleScissors(compChoice)
        } else {
            console.log('something went wrong')
        }
        setUserChoice('')
    }

    return (
        <div className="game-wrapper">
            <h1>Let's Play some Rock, Paper, Scissors</h1>
            <div style={{marginBottom:"40px"}}>
                <Icon 
                    size='huge'
                    name="hand rock outline" 
                    onClick={() => setUserChoice('rock')}
                    />
                <Icon 
                    size="huge"
                    name="hand paper outline"  
                    onClick={() => setUserChoice('paper')}
                    />
                <Icon 
                    size="huge"
                    name="hand scissors outline" 
                    onClick={() => setUserChoice('scissors')}
                    />
            </div>
            <Card.Group>
                <Card color={message == allMessages[0] ? "red" : "green"} style={{margin: "30px"}}>
                    <Card.Content>
                        <h3>{message}</h3>
                        <Card.Description>
                            {(totalGames > 0) && `The computer picked ${compPrevPick}, you picked ${userPrevPick}`}
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            {`Total Wins: ${wins}`}
                        </Card.Header>
                        <Card.Meta>
                            <label>{`Winrate: ${totalGames > 0 ? Math.floor((wins/totalGames) * 100): 0}%`}</label>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content>
                        <Card.Header>
                            {`Total Losses: ${losses}`}
                        </Card.Header>
                        <Card.Meta>
                            <label>{`Lossrate: ${totalGames > 0 ? Math.floor((losses/totalGames) * 100): 0}%`}</label>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content>
                        <Card.Header>
                            {`Total Ties: ${ties}`}
                        </Card.Header>
                        <Card.Meta>
                            <label>{`Tierate: ${totalGames > 0 ? Math.floor((ties/totalGames) * 100) : 0}%`}</label>
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
}


export default RPSGame;