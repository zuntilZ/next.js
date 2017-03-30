import { connect } from 'react-redux'

const AsyncCounter = ({ count, dispatch }) => {
  return (
    <div>
      <h2>Async Count: {count}</h2>
      <p>The reducer for this counter will when it is needed.</p>
      <button onClick={() => dispatch({ type: 'INCREMENT_LOCAL_COUNTER' })}>
        increment counter
      </button>
    </div>
  )
}

export default connect(state => ({ count: state.asyncCounter }))(AsyncCounter)

export const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_LOCAL_COUNTER':
      return state + 1
    default:
      return state
  }
}
