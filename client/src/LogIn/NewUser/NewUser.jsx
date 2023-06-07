import React, { useEffect, useState } from "react";

const NewUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/login')
            .then((r) => r.json())
            .then((data) => {
                setUsers(data.users);
            });
    }, []);

    
    // THis needs to be a post into the backend user table. 
    return (
        <div className=" ">
            <h1>Create New User</h1>
            <input placeholder="First Name..."></input>
            <input placeholder="Last Name..."></input>
            <input placeholder="Email..."></input>
            <input placeholder="Address..."></input>
            <input placeholder="Phone Number..."></input>
        </div>
    )
}

export default NewUser