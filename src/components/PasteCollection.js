import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./PasteCollection.css"


const PasteCollection = (props) => {

    const [pastes, setPastes] = useState();
    const [fetched, setFetched] = useState(false);
    const [extend, setExtend] = useState(false);
    const [increase, setIncrease] = useState(0);
    const [id, setId] = useState();

    let shown;

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + '/pastes').then((response) => {
            console.log(response.data);
            setPastes(response.data);
            setFetched(true);
        })
    }, [])

    const handleDelete = (paste_id) => {
        // console.log(paste_id);
        axios.get(process.env.REACT_APP_SERVER_URL + "/delete/" + paste_id).then((response) => {
            console.log(response);
            window.location.reload();
        })
    }

    const handleEdit = (e,paste_id) => {
        setExtend(!extend);
        // console.log(e);
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();
        // console.log(increase);
        const obj = {
            id: id,
            extend: increase
        };
        // console.log(process.env.REACT_APP_SERVER_URL + "/update/" + id);
        axios.post(process.env.REACT_APP_SERVER_URL + "/update/" + id, obj).then((response) => {
            console.log(response);
            window.location.reload();
        })
    }
    
    const handleExtend = (e) => {
        // console.log(e.target.id);
        setIncrease(e.target.value);
        setId(e.target.id);
    }

    const handleLinkView = (paste_id) => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/views/" + paste_id).then((response) => {
            console.log(response);
        });
        <Link to={`/views/${paste_id}`}></Link>
    }

    return (
        <div className="text-center mt-4">
            <h1 className="text-2xl font-bold mb-8">Here's a collection of all working pastes that you have created and are working.</h1>
            <div className="flex flex-col gap-y-2 min-h-screen justify-center items-center mx-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Generated URL</th>
                            <th>Created on</th>
                            <th>Expiration</th>
                            <th>Encrypted</th>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>View IPs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched && pastes.map((paste) => {
                            return (
                                <tr>
                                    <td><a className='text-blue-600 underline' href={paste.tinyURL}>{paste.tinyURL}</a></td>
                                    <td>{new Date(paste.date).toLocaleString()}</td>
                                    <td>{new Date(paste.validity).toLocaleString()}</td>
                                    <td>{paste.toEncrypt ? "true" : "false"}</td>
                                    <td><button className='bg-red-500 px-4 py-2 text-white rounded-md' onClick={() => handleDelete(paste.shortID)}>Delete</button></td>
                                    <td>
                                    <button className='bg-blue-500 px-4 py-2 text-white rounded-md' onClick={(e) => handleEdit(e, paste.shortID)}>EXTEND</button>
                                    {extend && <form name='extendExpiration' onSubmit={(e) => handleSubmit(e,paste.shortID)} className='flex gap-x-1'>
                                        <input id={paste.shortID} className='border border-black' type='text' placeholder='(seconds)' onChange={handleExtend}></input>
                                        <button className="p-1 bg-blue-400 text-white rounded-md" type='submit'>Extend</button>
                                    </form>}
                                    </td>
                                    <td><Link to={`/views/${paste.shortID}`}><button className='bg-green-500 px-4 py-2 text-white rounded-md'>Views</button></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default PasteCollection;

// <div className="flex justify-between items-center w-full">
// <p>Generated URL</p>
// <p>Created</p>
// <p>Expiration</p>
// <p>Encrypted</p>
// </div>
// {fetched && pastes.map((paste) => {
// return (
// <div className="flex justify-between items-center w-full">

//     <a className='text-blue-600' href={paste.tinyURL}>{paste.tinyURL}</a>
//     <p>{new Date(paste.date).toLocaleString()}</p>
//     <p>{new Date(paste.validity).toLocaleString()}</p>
//     <p>{paste.toEncrypt ? "true" : "false"}</p>
//     <div>
//         <button onClick={() => handleDelete(paste.shortID)}>Delete</button>
//         <button onClick={() => handleEdit(paste.shortID)}>Modify</button>
//         {/* <button onClick={() => handleLinkView(paste.shortID)}>Views</button> */}
//         <Link to={`/views/${paste.shortID}`}>Views</Link>
//     </div>
// </div>
// );
// })}