import { test } from 'tape-modern'
import getCards from './lib/get-cards'
import { includes, map, filter, reduce, compose } from 'ramda'

export default function() {
  const ex1 = 'Use map to transform list of card data to list of images'
  const exercise1 = _ => {
    const data = getCards()
    function createImage (card) {
      return `<img src=${card.image} />`
    }
    const imageList = map(createImage, data.cards)
    return imageList
  }

  const ex2 = 'Use filter to filter list of cards of the suit clubs'
  const exercise2 = _ => {
    const data = getCards()
    function clubs(card) {
      return card.suit === 'CLUBS'
    }
    const clubCards =  filter(clubs, data.cards)
    return clubCards
  }

  const ex3 =
    'Use reduce and count the number of cards that have a value of 8 or value of 6'
  const exercise3 = _ => {
    const data = getCards()
    function isEightOrSix(count, card) {
      if (includes(card.value, ['6','8'])) {
        return count + 1
      }
      return count
    }
    return reduce(isEightOrSix, 0, data.cards)
  }

  const ex4 = `Use map, filter and reduce with compose
    to show all cards as images that contain values of 8 or 6`
  const exercise4 = _ => {
    const data = getCards()
    const addImageHtml = function (card) {
      return { html: `<img src=${card.image} />`, ...card }
    }
    const newCards = map(addImageHtml)
    const includes8or6 = function (card) {
      return includes(card.value, ['6', '8'])
    }
    const only8or6 = filter(includes8or6)
    const createImageList = function (acc, card) {
      return acc + card.html
    }
    const result = reduce(createImageList, '')
    return compose(result, only8or6, newCards)(data.cards) 
  }

  /* tests to validate exercises go here */
  test('Level 4', assert => {
    assert.deepequals(
      exercise1(),
      [
        '<img src=http://deckofcardsapi.com/static/img/6H.png />',
        '<img src=http://deckofcardsapi.com/static/img/7H.png />',
        '<img src=http://deckofcardsapi.com/static/img/KS.png />',
        '<img src=http://deckofcardsapi.com/static/img/2D.png />',
        '<img src=http://deckofcardsapi.com/static/img/QS.png />',
        '<img src=http://deckofcardsapi.com/static/img/0C.png />',
        '<img src=http://deckofcardsapi.com/static/img/8H.png />',
        '<img src=http://deckofcardsapi.com/static/img/JD.png />',
        '<img src=http://deckofcardsapi.com/static/img/8C.png />'
      ],
      ex1
    )

    assert.deepequals(
      exercise2(),
      [
        {
          code: '0C',
          image: 'http://deckofcardsapi.com/static/img/0C.png',
          images: {
            png: 'http://deckofcardsapi.com/static/img/0C.png',
            svg: 'http://deckofcardsapi.com/static/img/0C.svg'
          },
          suit: 'CLUBS',
          value: '10'
        },
        {
          code: '8C',
          image: 'http://deckofcardsapi.com/static/img/8C.png',
          images: {
            png: 'http://deckofcardsapi.com/static/img/8C.png',
            svg: 'http://deckofcardsapi.com/static/img/8C.svg'
          },
          suit: 'CLUBS',
          value: '8'
        }
      ],
      ex2
    )
    assert.equal(exercise3(), 3, ex3)
    assert.equal(
      exercise4(),
      '<img src=http://deckofcardsapi.com/static/img/6H.png /><img src=http://deckofcardsapi.com/static/img/8H.png /><img src=http://deckofcardsapi.com/static/img/8C.png />',
      ex4
    )
  })
}
