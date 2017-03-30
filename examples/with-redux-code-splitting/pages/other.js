import React from 'react'
import withPage from '../hocs/withPage'
import Clock from '../components/Clock'
import GlobalCounter from '../components/GlobalCounter'
import ActiveReducers from '../components/ActiveReducers'
import Link from 'next/link'

import AsyncCounter, {reducer as asyncCounterReducer} from '../components/AsyncCounter'

class OtherPage extends React.Component {
  /**
   * The hoc `withRedux` reads
   * from this static method.
   * It allows us to add local reducers to
   * the store. These reducers will be merged
   * on route change
   *
   * @return {Object}
   */
  static getAsyncReducers () {
    return {
      asyncCounter: asyncCounterReducer
    }
  }

  /**
   * The hoc `withRedux` adds
   * the redux store to the context
   * object of getInitialProps
   *
   * @param  {Object} context
   * @param  {Object} context.store
   * @param  {String} context.pathname
   * @param  {Object} context.query
   * @param  {Object} context.req
   * @param  {Object} context.res
   * @param  {Object} context.jsonPageRes
   * @param  {Object} context.err
   * @return {Promise}
   */
  static getInitialProps ({ store, req, pathname }) {
    store.dispatch({ type: 'TICK', light: !req, ts: Date.now() })
  }

  render () {
    return (
      <div>
        <h1>Other Page</h1>
        <Clock />
        <GlobalCounter />
        <AsyncCounter />
        <ActiveReducers />
        <nav>
          <h2>Nav</h2>
          <Link href='/'><a>Back</a></Link>
        </nav>
      </div>
    )
  }
}

export default withPage(OtherPage)
