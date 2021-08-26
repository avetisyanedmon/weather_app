import React,{FC,Suspense } from 'react'
import Home from './pages/Home/Home' 
import { BrowserRouter as Router, Route} from 'react-router-dom'
import FavoriteCities from './pages/FavoriteCitites/FavoriteCities'
import Navbar from './components/Navbar/Navbar'



const App:FC = () => {

 
  return (
    <Router>
      <Navbar/>
     <Suspense fallback={<div>Loading...</div>}>  
        <Route path='/' exact component={Home}/>
        <Route path='/favorite' component={FavoriteCities}/>
      </Suspense>
    </Router>

  );
}

export default App;
