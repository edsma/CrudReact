import React, {useEffect, useState} from "react";
import { db } from "../Firebase";
import {getStorage, ref, uploadBytes,getDownloadURL} from 'firebase/storage';
import { getAuth,signOut } from "firebase/auth";

const auth = getAuth(db);
const storage = getStorage(db);
export const LinForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: '',
        urlFoto: '' 
    }

    const handleInputChange = e => {
        const {name,value} = e.target;
        setValues({...values, [name] : value});
    }

    const  uploadFile = async (e) => {
        const storageRef = ref(storage, file.name);
        await uploadBytes(storageRef,e);
        return getDownloadURL(storageRef);
    }
    
    useEffect(() => {
        if(props.currentId === '' ){
            setValues({...initialStateValues});
        }else{
            getLinkById(props.currentId);
        }
    }, [props.currentId])

    const getLinkById = async(id) => {
        const doc = await db.firestore().collection('links').doc(id).get();
        setValues({...doc.data()})
    }


    const [values, setValues] = useState(initialStateValues);
    const [file, setFile] = useState(null);


    const handleSubmit = async e => {

        console.log(file);
        e.preventDefault();
        const rutaArchivo = await uploadFile(file);
        values.urlFoto = rutaArchivo;
        props.addOrEditLink(values);
        setValues({...initialStateValues});

    }
    return (
      
        <form className="card card-body" onSubmit={handleSubmit}>
            <div>
                <button onClick={() => signOut(auth)} className="btn btn-default btn-block">
                    Cerrar sesión
                </button>
            </div>
            <div className="form-group input group">
                <div className="input-group-text bg-light" >
                    <div className="input-group-text bg-light">
                        <i className="material-icons">insert_link</i>
                    </div>
                    <input type="text" 
                        className="form-control" 
                        placeholder="https://www.youtube.com"
                        name="url"
                        value={values.url}
                        onChange={handleInputChange}/>
                </div>
         
            </div>

            <div className="form-group input group">
                <div className="input-group-text bg-light" >
                    <div className="input-group-text bg-light">
                        <i className="material-icons">create</i>
                    </div>
                    <input type="text" 
                        className="form-control" 
                        placeholder="website name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}/>
                </div>
        
            </div>
            
            <div className="form-group ">
                    <textarea 
                        name="description" 
                        rows="3" 
                        className="form-control"
                        placeholder="write a description"
                        value={values.description}
                        onChange={handleInputChange}> 
                    </textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
                {props.currentId === ''?  'Save' : 'Upload'}
            </button>
            <br></br>
            <input type="file" name="urlFoto" id="urlFoto" onChange={e => setFile(e.target.files[0])}/>
        </form>
                        
    )
} ;

export default LinForm;