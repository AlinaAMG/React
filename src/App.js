import './App.css';
import MessageDetails from './components/MessageDetails';
import Messages from './components/Messages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocalMessagesDetails from './components/LocalMessages';

 import Header from "./components/Header";
 import Footer from "./components/Footer";
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div>
      <Header/>
        <Routes>
          
          
          <Route path="/" element={<Messages />} />
          <Route path="/message/:id" element={<MessageDetails />} />
          <Route path="/local-message/:id" element={<LocalMessagesDetails />} />


          <Route path="/*" element={<NotFound/>}/>

        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
