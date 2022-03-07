const cardOne = document.querySelector('.card-one')
const cardTwo = document.querySelector('.card-two')
const cardThree = document.querySelector('.card-three')
const cardFour = document.querySelector('.card-four')
const cardFive = document.querySelector('.card-five')
const bankRoll = document.querySelector('.bankRoll')
const slotOptions = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace']
let startingStack = Number(prompt('Enter starting stack: '))

const getRandomSet = () => {
    const randomCardOne = slotOptions[Math.floor(Math.random()*slotOptions.length)]
    const randomCardTwo = slotOptions[Math.floor(Math.random()*slotOptions.length)]
    const randomCardThree = slotOptions[Math.floor(Math.random()*slotOptions.length)]
    const randomCardFour = slotOptions[Math.floor(Math.random()*slotOptions.length)]
    const randomCardFive = slotOptions[Math.floor(Math.random()*slotOptions.length)]
    return [randomCardOne, randomCardTwo, randomCardThree, randomCardFour, randomCardFive]
}

const changeDomCards = (cards) => {
    cardOne.innerHTML = cards[0]
    cardTwo.innerHTML = cards[1]
    cardThree.innerHTML = cards[2]
    cardFour.innerHTML = cards[3]
    cardFive.innerHTML = cards[4]
    bankRoll.innerHTML = `Bankroll: $${startingStack}`
    
}

const sleep = () => {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,100);
    })
}

const shuffleCards = async() => {
    for (let i = 0; i < 50; i++) {
        await sleep()
        const randomSet = getRandomSet()
        console.log(randomSet)
        changeDomCards(randomSet)
        if (i === 49) {
            return randomSet
        }
    }
}

const checkOneOrTwoPair = (roundCards) => {
    const uniqueCards = new Set(roundCards)
    const filteredCards = roundCards.filter(item => {
        if(uniqueCards.has(item)) {
            uniqueCards.delete(item)
        } else {
            return item
        }
    })
    return filteredCards.length === 1 ? 300 : filteredCards.length === 2 ? 1000: 0
}

const checkRoyalStraight = (roundCards) => {
    if (roundCards.includes('Ace') && roundCards.includes('King') && roundCards.includes('Queen',) && roundCards.includes('Jack') && roundCards.includes('10')) {
        return 10000
    } else {
        return 0
    }
}

const runGame = async() => {
    startingStack-=100
    const endingCards = await shuffleCards()
    .then(cards => {
        startingStack += checkOneOrTwoPair(cards)
        startingStack += checkRoyalStraight(cards)
        bankRoll.innerHTML = `Bankroll: $${startingStack}`
    })
} 


