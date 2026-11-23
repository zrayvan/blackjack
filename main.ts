/**
 * start from the forever, then down the left column and afterwards read the right column downwards to read the program sequentially.
 */
function runTurn (whichPlayer: number) {
    endTurn = false
    for (let index = 0; index < 2; index++) {
        drawCard()
    }
    while (!(endTurn)) {
        if (game.ask("Hit (A) or Stand (B)?")) {
            drawCard()
        } else {
            currentPlayerTurn += 1
            endTurn = true
        }
    }
    if (currentPlayerTurn == 5) {
        dealerTurn()
    }
}
function drawCard () {
    whichSuit = suit._pickRandom()
    if (whichSuit == 1) {
        card = cardNumber1.removeAt(randint(0, 12))
    } else if (whichSuit == 2) {
        card = cardNumber2.removeAt(randint(0, 12))
    } else if (whichSuit == 3) {
        card = cardNumber3.removeAt(randint(0, 12))
    } else {
        card = cardNumber4.removeAt(randint(0, 12))
    }
    roundCardForScoring(card)
    scoreHand()
}
// rounds down the card for scoring
function roundCardForScoring (cardNum: number) {
    if (cardNum <= 10) {
    	
    } else if (cardNum == 11) {
        card = cardNum - 1
    } else if (cardNum == 12) {
        card = cardNum - 2
    } else {
        card = cardNum - 3
    }
}
// scores the hand for the player
function scoreHand () {
    // checks for which player, and then checks if the card is an ace. if yes, and an 11 would not cause the player to bust, it adds 11 to their score. otherwise, it adds the card's now rounded down score to their score. repeat this for each player and the dealer and you get this wall of if statemenets
    if (currentPlayerTurn == 1) {
        if (card == 1 && player1Score < 10) {
            player1Score = 11 + player1Score
        } else {
            player1Score = card + player1Score
        }
    } else if (currentPlayerTurn == 2) {
        if (card == 1 && player2score < 10) {
            player2score = 11 + player2score
        } else {
            player2score = card + player2score
        }
    } else if (currentPlayerTurn == 3) {
        if (card == 1 && player3score < 10) {
            player3score = 11 + player3score
        } else {
            player3score = card + player3score
        }
    } else if (currentPlayerTurn == 4) {
        if (card == 1 && player4Score < 10) {
            player4Score = 11 + player4Score
        } else {
            player4Score = card + player4Score
        }
    } else {
        if (card == 1 && dealerScore < 10) {
            dealerScore = 11 + dealerScore
        } else {
            dealerScore = card + dealerScore
        }
    }
}
// dealer draws two at the start, then draws again if score is 16 or lower
function dealerTurn () {
    for (let index = 0; index < 2; index++) {
        drawCard()
    }
    while (dealerScore < 17) {
        drawCard()
    }
    timeToEndGame = true
    if (timeToEndGame) {
        game.setGameOverEffect(true, effects.confetti)
        if (player1Score > player2score && (player1Score > player3score && (player1Score > player4Score && player1Score > dealerScore))) {
            game.splash("Player 1 Wins!")
            game.gameOver(true)
        } else if (player2score > player1Score && (player2score > player3score && (player2score > player4Score && player2score > dealerScore))) {
            game.splash("Player 2 Wins!")
            game.gameOver(true)
        } else if (player3score > player1Score && (player3score > player2score && (player3score > player4Score && player3score > dealerScore))) {
            game.splash("Player 3 Wins!")
            game.gameOver(true)
        } else if (player4Score > player1Score && (player4Score > player2score && (player4Score > player3score && player4Score > dealerScore))) {
            game.splash("Player 4 Wins!")
            game.gameOver(true)
        } else if (dealerScore > player1Score && (dealerScore > player2score && (dealerScore > player3score && dealerScore > player4Score))) {
            game.splash("...The dealer won!", "Wow. That's pretty bad.")
            game.gameOver(false)
        } else {
            game.splash("...It's a tie!", "Nobody wins!")
            game.gameOver(false)
        }
    }
}
let timeToEndGame = false
let dealerScore = 0
let player4Score = 0
let player3score = 0
let player2score = 0
let player1Score = 0
let card = 0
let whichSuit = 0
let endTurn = false
let currentPlayerTurn = 0
let cardNumber4: number[] = []
let cardNumber3: number[] = []
let cardNumber2: number[] = []
let cardNumber1: number[] = []
let suit: number[] = []
music.play(music.createSong(hex`00b6000408040105001c000f0a006400f4010a00000400000000000000000000000000000000027e0000000c00010d0c001000010d10001400011414001800010d18001c00010a1c002200010824002c0001082c003000011130003800011238004000010f40004c00010d4c005000010d50005400011454005800010d58005c00010a5c006200010864006c0001086c007400010c74007800010878007c00010c7c008000010f`), music.PlaybackMode.LoopingInBackground)
// this WALL of arrays look intimidating, but in reality all it does it set up the array for suits, and then creates an array up to 13 for each suit
suit = [
1,
2,
3,
4
]
cardNumber1 = [
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13
]
cardNumber2 = [
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13
]
cardNumber3 = [
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13
]
cardNumber4 = [
1,
2,
3,
4,
5,
6,
7,
8,
9,
10,
11,
12,
13
]
currentPlayerTurn = 1
forever(function () {
    runTurn(currentPlayerTurn)
})
game.onUpdateInterval(500, function () {
	
})
