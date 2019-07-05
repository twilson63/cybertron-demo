import { test, assert } from 'tape-modern'
import { map, filter, reduce, compose, prop } from 'ramda'

const stars = [
  { first: 'elvis', last: 'presley', alive: false },
  { first: 'jim', last: 'morrison', alive: false },
  { first: 'bob', last: 'dylan', alive: true },
  { first: 'buddy', last: 'holly', alive: false }
]
const fullname = o => `${prop('first', o)} ${prop('last', o)}`

/* Level 3 - rockstars */

export default function() {
  const ex1 =
    'Use map to transform list of rockstar first,last name objects to objects with fullname'
  const exercise1 = _ => {
    function toFullname(rockstar) {
      return { fullname: fullname(rockstar) }
    }
    return map(toFullname, stars)
  }

  const ex2 = 'Use filter to filter list of rockstars that are still alive'
  const exercise2 = _ => {
    function isAlive(rockstar) {
      return rockstar.alive
    }
    return filter(isAlive, stars)
  }

  const ex3 =
    'Use reduce and count the number of stars that are no longer living'
  const exercise3 = _ => {
    function countTheDead(count, rockstar) {
      if (rockstar.alive === false) {
        return count + 1
      }
      return count
    }
    return reduce(countTheDead, 0, stars)
  }

  const ex4 =
    'Use map, filter and reduce with compose show a concatenated string of the fullnames of each alive star'
  const exercise4 = _ => {
    function createFullname(rockstar) {
      return { fullname: fullname(rockstar), ...rockstar }
    }
    const fullnames = map(createFullname)
    const isAlive = filter(prop('alive'))
    function concatFullnames(acc, rockstar) {
      return acc + rockstar.fullname
    }
    const aliveStars = reduce(concatFullnames, '')
    return compose(aliveStars, isAlive, fullnames)(stars) 
  }

  /* tests to validate exercises go here */
  test('Level 3', assert => {
    assert.deepequals(
      exercise1(),
      [
        { fullname: 'elvis presley' },
        { fullname: 'jim morrison' },
        { fullname: 'bob dylan' },
        { fullname: 'buddy holly' }
      ],
      ex1
    )

    assert.deepequals(
      exercise2(),
      [{ first: 'bob', last: 'dylan', alive: true }],
      ex2
    )
    assert.equal(exercise3(), 3, ex3)
    assert.equal(exercise4(), 'bob dylan', ex4)
  })
}
