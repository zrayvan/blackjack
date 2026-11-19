function checkForBusts (whichPlayerScore: number) {
    if (whichPlayerScore > 21) {
        currentPlayerTurn += 1
    } else {
    	
    }
}
function runTurn (whichPlayer: number) {
    let endTurn = 0
    for (let index = 0; index < 2; index++) {
        DrawCard()
    }
    while (!(endTurn)) {
        if (game.ask("Hit (A) or Stand (B)?")) {
            DrawCard()
        } else {
            currentPlayerTurn += 1
        }
    }
}
function DrawCard () {
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
}
let card = 0
let whichSuit = 0
let cardNumber4: number[] = []
let cardNumber3: number[] = []
let cardNumber2: number[] = []
let cardNumber1: number[] = []
let suit: number[] = []
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
let currentPlayerTurn = 1
forever(function () {
    runTurn(currentPlayerTurn)
})
