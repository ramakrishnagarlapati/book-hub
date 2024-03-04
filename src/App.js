import {Redirect, Route, Switch} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import Bookshelves from './pages/Bookshelves'
import BookDetails from './pages/BookDetails'
import NotFound from './pages/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
