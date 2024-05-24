import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Onboard from './pages/onboard/Onboard';
import Navbar from './common/Navbar/Index';
import MyWork from './pages/mywork/MyWork';
import "../src/assets/style/Global.css"
import CreatePage from './pages/createPage/CreatePage';
import ViewPage from './pages/viewPage/ViewPage';
import ProjectInfo from './pages/createPage/ProjectInfo';
import WebsiteDesign from './pages/viewPage/WebsiteDesign';
import { useEffect } from 'react';

function App() {
  

  return (
    <div className="App">

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/onboard' element={<><Navbar /><Onboard /></>} />
        <Route exact path='/mywork' element={<><Navbar /><MyWork /></>} />
        <Route exact path='/newpage' element={<><Navbar /><ProjectInfo /></>} />
        <Route exact path='/createpage/:websiteId' element={<><Navbar /><CreatePage /></>} />
        <Route exact path='/viewpage/:id' element={<><Navbar /><ViewPage /></>} />
        <Route exact path='/website/page/:id' element={<><Navbar /><WebsiteDesign /></>} />
      </Routes>
    </div>
  );
}

export default App;
