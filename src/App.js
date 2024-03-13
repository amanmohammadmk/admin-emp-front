import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import View from './pages/View';
import Edit from './pages/Edit';
import Add from './pages/Add';
import Header from './components/Header';
import Login from './pages/Login';
import Main from './pages/Main';




function App() {
  return (
    <div className="App">

      <Header/>
      <Routes>
        
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/view/:id" element={<View/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
      
    
    </div>
  );
}

export default App;