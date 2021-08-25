import './App.css';
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import FavoriteCities from './components/FavoriteCitites/FavoriteCities';


const App:React.FC = () => {

 
  return (
    <Router>
      <div className="App">
        <Route path='/' component={Navbar}/>
        <Route path='/' exact component={Home}/>
        <Route path='/favorite' component={FavoriteCities}/>
      </div>
    </Router>

  );
}

export default App;
