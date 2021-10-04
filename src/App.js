import { IsLoggedContext } from './globalcontext/isLogged';
import HomePage from './components/HomePage/HomePage';
import { useContext } from 'react';
import Feed from './Feed';
import './App.css';


function App() {
  const {loggeduserState} = useContext(IsLoggedContext);
  const [loggeduser] = loggeduserState;


  return (
    <div>
      <div id="App"></div>
      <div className='d-none' id="main">
        { loggeduser.length > 0?
        <div>
          <Feed currentUser={loggeduser[0]}/>
        
        </div>
        :
        <HomePage />
        }
      </div>
    </div>

  );
}

export default App;
