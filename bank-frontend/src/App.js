import {Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Gambling from './pages/Gambling/Gambling';
import AccountManager from './pages/AccountManager/AccountManager';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/play" element={<Gambling />}/>
      <Route path="/account" element={<AccountManager />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
