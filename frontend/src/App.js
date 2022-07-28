import store from './store'
import {Provider} from 'react-redux'
import Navbar from './component/navbar';
import Home from './component/home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './component/register';
import Signin from './component/signin';
import Profile from './component/profile';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Createlisting from './component/createlisting';
import Explore from './component/explore';
import Singlehouse from './component/singlehouse';
import CategoryPage from './component/categoryPage';
import Offer from './component/offer';
import Forgetpassword from './component/forgetpassword';
import Tokenforgetpassword from './component/tokenforgetpassword';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='w-full min-h-screen bg-zinc-200'>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/signin' element={<Signin/>}></Route>
            <Route path='/createlisting' element={<Createlisting/>}></Route>
            <Route path='/explore' element={<Explore/>}></Route>
            <Route path='/singlehouse/:houseid' element={<Singlehouse/>}></Route>
            <Route path='/housingtype/:housetype' element={<CategoryPage/>}></Route>
            <Route path='/offer' element={<Offer/>}></Route>
            <Route path='/forgetpassword' element={<Forgetpassword/>}></Route>
          <Route path='/forgetpassword/:tokenpassword' element={<Tokenforgetpassword/>} ></Route>
          </Routes>
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
        </div>
      </Router>
        
    </Provider>
  );
}

export default App;
