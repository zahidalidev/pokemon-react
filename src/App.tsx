import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Lists, Pokemon } from './pages'
import { store } from './store/index'

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<Lists />} />
        <Route path='/pokemon/:id' element={<Pokemon />} />
      </Routes>
    </Router>
  </Provider>
)

export default App
