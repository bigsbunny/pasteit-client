import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const PageViews = (props) => {
    const { pasteId } = useParams();
    const [ips, setIps] = useState();
    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/views/" + pasteId).then((response) => {
            console.log(response);
            setIps(response.data);
            setFetched(true);
        });
    
    }, [])
    

    return (
        <div className="text-center p-6">
            <h1 className="text-2xl font-bold mb-6">List of IP addresses who have visited <a className="text-blue-600 underline" href={process.env.REACT_APP_CLIENT_URL + "/" + pasteId}>{process.env.REACT_APP_CLIENT_URL + "/" + pasteId}</a></h1>
            <div className="flex flex-col gap-y-4 justify-center items-center">
                {fetched && 
                    ips.slice().reverse().map((ip) => {
                        return (
                            <div className="bg-gray-200 border border-gray-400 w-1/2 px-4 py-2 rounded-md">
                                <p><span className="text-gray-600">IP Address - </span><span className="font-bold">{ip.ip}</span></p>
                                <p><span className="text-gray-600">Accessed Timestamp - </span><span className="font-bold">{new Date(ip.timestamp).toLocaleString()}</span></p>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default PageViews;