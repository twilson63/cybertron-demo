import { test } from 'tape-modern'
import hex2color from './lib/hex2color'
import { __, not, includes, map, filter, reduce, compose } from 'ramda'

export default function() {
  /* Level 2 - colors */

  const ex1 =
    'Use map and the hex2color function to convert list of hex values to list of colors'
  const exercise1 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']
    
    return map(hex2color, hexes)
  }

  const ex2 =
    'Use filter and the hex2color function to filter list of hex values to only list colors that are not blue, red, or green'
  const exercise2 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']
    function excludeRGB(hex) {
      const color = hex2color(hex)
      return (color !== 'red' && color !== 'blue' && color !== 'green') 
    }
    return filter(excludeRGB, hexes)
  }

  const ex3 =
    'Use reduce and the hex2color function to count list of hex values that have a `r` in their name'
  const exercise3 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']
    function countColorR(acc, value) {
      const color = hex2color(value)
      if (color.includes('r')) {
        return acc + 1
      }
      return acc
    }
    return reduce(countColorR, 0, hexes) 
  }

  const ex4 =
    'Use map, filter and reduce with compose to convert all hex codes to colors then filter out (blue, red, green) and count all the colors that contain a "b"'
  const exercise4 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']
    const colors = map(hex2color)
    const excludeRGB = function (color) {
      return not(includes(color, ['red', 'green', 'blue']))
      //return (color !== 'red' && color !== 'blue' && color !== 'green')
    }
    //const excludeRGB = compose(not, includes(__, ['red','green', 'blue']))
    const notRGB = filter(excludeRGB)
    function countB(acc, value) {
      if (value.includes('b')) {
        return acc + 1
      }
      return acc
    }
    const colorsthatcontainB = reduce(countB, 0) 
    return compose(colorsthatcontainB, notRGB, colors)(hexes)
  }

  /* tests to validate exercises go here */
  test('Level 2', assert => {
    assert.deepequals(
      exercise1(),
      ['blue', 'beige', 'peru', 'rebeccapurple', 'orange'],
      ex1
    )
    assert.deepequals(exercise2(), ['#f5f5dc', '#cd853f', '#663399', '#ffa500'], ex2)
    assert.equal(exercise3(), 3, ex3)
    assert.equal(exercise4(), 2, ex4)
  })
}
