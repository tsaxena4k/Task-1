import React, { useState, useEffect } from 'react';

function fetchUser(res) {
    const [user,setUser]=useState(null);

    useEffect(() => {
        const {email,name,imageUrl}=res.profileObj;
        setUser({
            email,
            name,
            imageUrl
        })
    }, []);

    return user;
}

export default fetchUser; 
