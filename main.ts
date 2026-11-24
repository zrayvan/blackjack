namespace SpriteKind {
    export const Camera = SpriteKind.create()
    export const Text = SpriteKind.create()
}
/**
 * treat it nice, or else it will be give you nan for a score
 * 
 * (we dont know why)
 */
// checks if the  player busted, if they did then it splashes bust and moves on to the next turn
function checkForBusts () {
    if (player1Score > 21) {
        player1Score = 0
        game.splash("Bust!")
        currentPlayerTurn += 1
    } else if (player2score > 21) {
        player2score = 0
        game.splash("Bust!")
        currentPlayerTurn = 3
        dealerTurn()
    } else if (dealerScore > 21) {
        dealerScore = 0
        game.splash("Bust!")
        timeToEndGame = true
    }
}
// runs the turn; draws two card, splashes the score, and then asks the user to hit or stand. hitting draws a card, displays the score and then checks for busts, while standing gives the next player their turn
function runTurn () {
    endTurn = false
    for (let index = 0; index < 2; index++) {
        drawCard()
    }
    displayScore()
    while (!(endTurn)) {
        if (game.ask("Hit (A) or Stand (B)?")) {
            drawCard()
            displayScore()
            checkForBusts()
        } else {
            currentPlayerTurn += 1
            endTurn = true
        }
    }
}
// ends the intro when a is pressed
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    IntroEnd = true
})
// checks for who wins by seeing if each player's score is higher than everyone else's; if it is, that player wins
// if it gets to the end and and it hasnt chosen somebody, then it says its a tie
function endGameIfAtEnd () {
    if (timeToEndGame) {
        game.setGameOverEffect(true, effects.confetti)
        if (player1Score > player2score && player1Score > dealerScore) {
            game.splash("Player 1 Wins!")
            game.gameOver(true)
        } else if (player2score > player1Score && player2score > dealerScore) {
            game.splash("Player 2 Wins!")
            game.gameOver(true)
        } else if (dealerScore > player1Score && dealerScore > player2score) {
            game.splash("...The dealer won!", "Wow. That's pretty bad.")
            game.gameOver(false)
        } else {
            game.splash("...It's a tie!", "Nobody wins!")
            game.gameOver(false)
        }
    }
}
// =simulates a deck of cards using the array from the start; picks a random element from each array and removes it. before moving onto scoring the card
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
// scores the hand for each player; aces are forced to hard if score is under 10
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
        checkForBusts()
    }
    game.splash("Dealer Score: " + dealerScore)
    timeToEndGame = true
    if (true) {
    	
    } else {
    	
    }
}
// when called, it displays the current player's score
function displayScore () {
    if (currentPlayerTurn == 1) {
        game.splash("P1 Score: " + player1Score)
    } else if (currentPlayerTurn == 2) {
        game.splash("P2 Score: " + player2score)
    } else {
    	
    }
}
// creates the intro screen
function IntroFunc () {
    tiles.setCurrentTilemap(tilemap`TITLEBG`)
    CameraSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Camera)
    scene.cameraFollowSprite(CameraSprite)
    CameraSprite.setVelocity(15, 15)
    Title = sprites.create(assets.image`TitleText`, SpriteKind.Text)
    Title.setVelocity(15, 15)
    Title.setPosition(80, 55)
    TextIntro = sprites.create(assets.image`TitleText0`, SpriteKind.Text)
    TextIntro.setVelocity(15, 15)
    TextIntro.setPosition(80, 70)
}
// starts the intro, then after creates the main background and starts the song, creates the deck (which is the massive list of arrays) and then sets the player turn to 1
let TextIntro: Sprite = null
let Title: Sprite = null
let CameraSprite: Sprite = null
let card = 0
let whichSuit = 0
let endTurn = false
let timeToEndGame = false
let dealerScore = 0
let player2score = 0
let player1Score = 0
let currentPlayerTurn = 0
let cardNumber4: number[] = []
let cardNumber3: number[] = []
let cardNumber2: number[] = []
let cardNumber1: number[] = []
let suit: number[] = []
let IntroEnd = false
IntroFunc()
pauseUntil(() => IntroEnd)
tiles.setCurrentTilemap(tilemap`level`)
sprites.destroyAllSpritesOfKind(SpriteKind.Text, effects.none, 100)
pause(200)
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
// main loop of the game: if checks if the game is ready to end, and if not, runs the turn, and afterwards if it's the dealer's turn, then it goes to the dealer's turn
forever(function () {
    endGameIfAtEnd()
    runTurn()
    if (currentPlayerTurn == 3) {
        dealerTurn()
    }
})
