import React from 'react';

const authContext= React.createContext({status:false, Login:()=>{}});

export default authContext;