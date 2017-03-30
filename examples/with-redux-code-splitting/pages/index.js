import React from 'react'
import withPage from '../hocs/withPage'
import Clock from '../components/Clock'
import GlobalCounter from '../components/GlobalCounter'
import ActiveReducers from '../components/ActiveReducers'
import Link from 'next/link'

class IndexPage extends React.Component {
  static getInitialProps ({ store, req }) {
    store.dispatch({ type: 'TICK', light: !req, ts: Date.now() })
  }

  render () {
    return (
      <div>
        <h1>Index Page</h1>
        <Clock />
        <GlobalCounter />
        <ActiveReducers />
        <nav>
          <h2>Nav</h2>
          <Link href='/other'><a>Navigate</a></Link>
        </nav>
      </div>
    )
  }
}

export default withPage(IndexPage)
