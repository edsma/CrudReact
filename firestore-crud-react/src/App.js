import logo from './logo.svg';
import './App.css';
import Links from './Components/Links';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './screens/Login';
import { useState } from 'react';
import { db } from "./Firebase";
import { getFirestore, doc,getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth' // front-end code !!!

const auth = getAuth(db);
const firestore = getFirestore(db);

function App() {

  async function getRol(uid){
    const docRef = doc(firestore,`usuarios/${uid}`);
    const docuCifrado = await getDoc(docRef);
    const intoFinal = docuCifrado.data().rol;
    return intoFinal;
  }

  const [user,setUser] = useState(null);
  
  onAuthStateChanged(auth, (usuarioFireBase)=> {
    if(usuarioFireBase){
      getRol(usuarioFireBase.uid)
      .then((rol)=> {
        const userData = {
          uid: usuarioFireBase.uid,
          email: usuarioFireBase.email,
          rol: rol
        }
        setUser(userData);
      });
      
    }else{
      setUser(null);
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          rel="noopener noreferrer"
        >
        
          <div className='container p-4' >
          </div>
          {user?      
            <div className='row'>
              <Links/> 
            </div>: <div><Login/></div> }
       
            <ToastContainer/>
        </a>
      </header>
    </div>
  );
}

export default App;
