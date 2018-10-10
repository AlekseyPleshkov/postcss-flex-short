import postcss from 'postcss'
import test    from 'ava'

import plugin from './'

function run(t, input, output, opts = { }) {
  return postcss([ plugin(opts) ]).process(input)
    .then( result => {
      console.log(result.css)
      t.deepEqual(result.css, output)
      t.deepEqual(result.warnings().length, 0)
    })
}

test('Test flex-container', t => {
  return run(t, 
    'div { flex-container: width 1200px, direction row, align center, justify stretch, wrap nowrap; }', 
    'div {display: flex;width: 100%;max-width: 1200px;flex-direction: row;align-items: center;justify-content: stretch;flex-wrap: nowrap; }', 
  { })
})

test('Test flex-column', t => {
  return run(t, 
    'p { flex-column: width 400px, flex 1 0 0, basis 400px, grow 0, shrink 1, align flex-start, justify stretch; }', 
    'p {width: 100%;max-width: 400px;flex: 1 0 0;flex-basis: 400px;flex-grow: 0;flex-shrink: 1;align-self: flex-start;justify-self: stretch; }', 
  { })
})