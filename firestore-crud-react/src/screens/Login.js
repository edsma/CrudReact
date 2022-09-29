import React, { useState } from 'react'
import {db} from '../Firebase';
import {getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword  
} from 'firebase/auth'
import {getFirestore, doc, setDoc} from 'firebase/firestore'

const auth = getAuth(db);
const firestore = getFirestore(db);
function Login() {
  const initialStateValues = {
    email: '',
    password: '',
    rol: ''
  }


  const [values, setValues] = useState(initialStateValues);


  const [isRegistrando,setIsRegistrando] = useState(true);

  async function registrarUsuario(form){
    const info = await createUserWithEmailAndPassword(auth,form.email,form.password)
    .then((usuarioFireBase) => {
      return usuarioFireBase;
    });

    const docuRef = doc(firestore,`usuarios/${info.user.uid}`);
    setDoc(docuRef, {correo: form.email , rol: form.rol});
  }

  
  const handleInputChange = e => {
    const {name,value} = e.target;
    setValues({...values, [name] : value});
}

  const handleSubmit = e =>{
    debugger;
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    if(isRegistrando){
      registrarUsuario(values);
    }else{
      signInWithEmailAndPassword(auth,values.email,values.password);
    }

  }

  return (
    <div>
      <h1>{isRegistrando? 'Registrate' : 'Inicia Sesion'}</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Correo electronico:
          <input className='form-control'  onChange={handleInputChange}  id='email' name='email' type="email"/>
        </label>

        <label>
          Contraseña:
          <input  className='form-control' onChange={handleInputChange} id='password' name='password' type="password"/>
        </label>

        <label>
          rol:
          <select  onChange={handleInputChange}  className='form-control'  id='rol' name='rol'>
            <option value='admin'>Administrador</option>
            <option value='user'>Usuario</option>
          </select>
        </label>
        <input type='submit'  onClick={() => setIsRegistrando(!isRegistrando)}
        value={!isRegistrando? 'Registrar': 'Iniciar sesión'} />

        <button type="submit" className="btn btn-primary btn-block">
                {isRegistrando?  'Ya tengo una cuenta' : 'Quiero registrarme'}
            </button>
      </form>
    </div>
  )
}

export default Login