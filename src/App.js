import { useContext } from 'react';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import AuthContext from './utils/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Header />
      {authCtx.isLoggedIn ? <Main /> : <Login />}
    </div>
  );
}

export default App;
