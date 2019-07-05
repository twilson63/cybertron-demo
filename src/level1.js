import { test, assert } from 'tape-modern'
import { equals, map, filter, reduce, compose } from 'ramda'

export default function() {
  /* Level 1 */
  const ex1 = 'use map to double each value and return'
  const exercise1 = _ => {
    const numbers = [1, 2, 4, 8, 16, 32]
    const double = function (v) { return v * 2 }
    
    return map(double, numbers) 
  }

  const ex2 = 'use filter to only return even numbers'
  const exercise2 = _ => {
    const numbers = [1, 2, 3, 4, 5, 6]
    const isEven = function (n) {
      return (n % 2 === 0)
    }
    return filter(isEven, numbers) // return answer here
  }

  const ex3 = 'use reduce to sum the numbers'
  const exercise3 = _ => {
    const numbers = [1, 2, 3, 4, 5, 6]
    function reducer(acc, value) {
      return acc + value
    }
    return reduce(reducer, 0, numbers) 
  }

  const ex4 = `use compose to run the following three commands

1. map over the numbers and square each number
2. use filter keep numbers divisible by 8
3. use reduce to count the resulting numbers
`
  const exercise4 = _ => {
    const numbers = [1, 2, 4, 8, 16, 32]
    function square(n) {
      return n * n
    }
    function divBy8(n) {
      return n % 8 === 0
    }
    function inc(a,b) {
      return a + 1 
    }
    const squaredNumbers = map(square, numbers)
    const onlyNumbersDivBy8 = filter(divBy8, squaredNumbers)
    
    
    return compose(reduce(inc, 0), filter(divBy8), map(square))(numbers)
  }

  /* tests to validate exercises go here */
  return test('Level 1', assert => {
    assert.deepequals(exercise1(), [2, 4, 8, 16, 32, 64], ex1)
    assert.deepequals(exercise2(), [2, 4, 6], ex2)

    assert.equal(exercise3(), 21, ex3)

    assert.equal(exercise4(), 4, ex4)
  })
}
