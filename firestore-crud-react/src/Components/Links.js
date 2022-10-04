import React, {useEffect, useState} from "react";
import LinForm from './LinkForm';
import {db} from '../Firebase';
import { toast } from "react-toastify";

export const Links = () => {
    const [links,setLinks] = useState([]);
    const [currentId, setCurrentId] = useState([]);
    const addOrEditLink = async (linkObject)  => {
        debugger;
        if(currentId === ''){
            await db.firestore().collection('links').doc().set(linkObject);
            toast('New link added',
                {type: 'success'}
            )
        }else{
            db.firestore().collection('links').doc(currentId).update(linkObject);
            toast('Updated link',
                {type: 'success'}
            );
            setCurrentId('');
        }
    } 

    const onDeleteClick = async (id) => {
        if(window.confirm('are you sure you want to delete this link?')){
            await db.collection('links').doc(id).delete();
            toast('New link eliminted',
            {type: 'success'}
        )
        }
    }

    const getLinks = async () => {
        await db.firestore().collection('links').onSnapshot((querySnapShoot) => {
            const docs = [];
            querySnapShoot.forEach(doc => {
                console.log(doc.data());
                docs.push({...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
        
    }

    useEffect(() => {
        getLinks();
    }, []);

    return (
        <div className="container p-4">
            <div  className="col-md-12">
                <LinForm {...{addOrEditLink,currentId, links}}/>
            </div>
              
             
                <div className="col-md-12">
                    {links.map((link) => ( 
                        <div className="card mb-1" key={link.id}>
                            <div className="card-body">
                                <div className="d-flex justify-cont">
                                    <h4>{link.name}</h4>
                                    <i 
                                        className="material-icons text-danger"
                                        onClick={()=> onDeleteClick(link.id)}>close</i>
                                                   <i 
                                        className="material-icons"
                                        onClick={()=> setCurrentId(link.id)}>create</i>
                                        
                                </div>
                              <div>
                              {link.urlFoto?  
                               <img src={link.urlFoto} alt="Girl in a jacket" width="500" height="600"></img>:
                                <div></div>
                                }
                               
                              </div>
                          
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website</a>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )

} 

export default Links;