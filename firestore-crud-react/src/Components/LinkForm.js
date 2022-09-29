import React, {useEffect, useState} from "react";
import { db } from "../Firebase";
import { getAuth,signOut } from "firebase/auth";

const auth = getAuth(db);
export const LinForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    }

    const handleInputChange = e => {
        const {name,value} = e.target;
        setValues({...values, [name] : value});
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


    const handleSubmit = e => {
        e.preventDefault();
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
        </form>
                        
    )
} ;

export default LinForm;