import { connect } from 'react-redux'

const ActiveReducers = ({ reducers }) => {
  return (
    <div>
      <h2>Active Reducers</h2>
      <ul>
        {reducers.map((name, index) => <li key={index}>{name}</li>)}
      </ul>
    </div>
  )
}

export default connect(state => ({
  reducers: Object.keys(state)
}))(ActiveReducers)
