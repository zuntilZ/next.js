import React from 'react'
import { connect, Provider } from 'react-redux'
import { createStore as reduxCreateStore, combineReducers } from 'redux'

export const createStore = (reducers, initialState = {}, enhancer, asyncReducers = {}) => {
  const reducer = combineReducers({
    ...reducers,
    ...asyncReducers
  })

  const store = reduxCreateStore(
    reducer,
    initialState,
    enhancer
  )

  store.asyncReducers = {}
  store.injectAsyncReducers = function (asyncReducers = {}) {
    store.asyncReducers = {
      ...store.asyncReducers,
      ...asyncReducers
    }
    const newReducer = combineReducers({
      ...reducers,
      ...store.asyncReducers
    })
    store.replaceReducer(newReducer)
  }

  return store
}

/**
 * Create store or extend it
 *
 * @param  {Function} createStore
 * @param  {Object}   [initialState]
 * @param  {Object}   [asyncReducers]
 * @return {Object}
 */
let clientStore = null
const createOrExtendStore = (createStore, req, initialState, asyncReducers) => {
  const isServer = !!req

  // Create Server Store
  if (isServer) {
    // In order to connect to the store from the `_document`
    // component we need to add it to the current request object.
    if (!req.reduxStore) {
      req.reduxStore = createStore(initialState, asyncReducers)
    }
    return req.reduxStore
  }

  // Create Client Store
  if (!clientStore) {
    clientStore = createStore(initialState, asyncReducers)
  }

  clientStore.injectAsyncReducers(asyncReducers)

  return clientStore
}

export default (createStore, ...connectArgs) => ComposedComponent => {
  // Since provide should always be after connect we connect here
  const ConnectedCmp = connect(...connectArgs)(ComposedComponent)

  // Get the asyncReducers from the ComposedComponent component
  const asyncReducers = ComposedComponent.getAsyncReducers
    ? ComposedComponent.getAsyncReducers()
    : {}

  // Create the actual higher order component
  return class extends React.Component {
    static async getInitialProps (context) {
      // Add the redux store to the context object
      context.store = createOrExtendStore(createStore, context.req, {}, asyncReducers)

      // Get the `initialProps` from the ComposedComponent
      const initialProps = ComposedComponent.getInitialProps
          ? await ComposedComponent.getInitialProps(context)
          : {}

      return {
        store: context.store,
        initialState: context.store.getState(),
        initialProps
      }
    }

    constructor (props) {
      super(props)

      const hasStore = props.store &&
        props.store.getState &&
        props.store.dispatch

      // After ssr we need to create the
      // store on the client, too.
      this.store = hasStore
          ? props.store
          : createOrExtendStore(createStore, undefined, props.initialState, asyncReducers)
    }

    render () {
      return (
        <Provider store={this.store}>
          <ConnectedCmp {...this.props.initialProps} />
        </Provider>
      )
    }
  }
}
