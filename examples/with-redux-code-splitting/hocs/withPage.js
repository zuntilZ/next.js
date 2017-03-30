import withRedux from './withRedux'
import { initStore } from '../store'

// Normally you would compose
// multible hocs here
// Please keep in mind that you'll need
// to copy static methods manually when you
// are composing hocs.
// Take a look at package hoist-non-react-statics
// for more info.
export default withRedux(initStore)
