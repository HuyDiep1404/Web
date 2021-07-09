import React, { useState } from "react";
import PropTypes from 'prop-types'; 

  export default function FetchApi(method, url, headers,body, callback) {
    const requestOption = {};
    if(body){
        requestOption.body=body;
    }

    if(method==='POST'){
      
        requestOption.method= method;
   
    
    }
    if(headers){
        requestOption.headers= headers;
    }
   
      
      fetch(url,requestOption)
      .then(res => res.json())
      .then((data) => {
        callback(data);
      })
      .catch(e => console.log(e));
      /*
       fetch(url,requestOption)
      .then(res => res.json())
      .then((data) => {
        callback(data);
      })
      .catch(e => console.log(e)); */
    
  
}