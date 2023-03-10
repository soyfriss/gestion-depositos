import { Route, Switch } from 'react-router-dom';
import AdminApp from './admin';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <AdminApp />
      </Route>
      <Route path='*'>
        <p>Invalid route</p>
      </Route>
    </Switch>
  );
}

export default App;
