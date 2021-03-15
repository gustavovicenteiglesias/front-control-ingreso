import React from 'react';
import './Footer.css';
import facebook from "../assest/images/web/Elementos Web-03.png";
import youtube from "../assest/images/web/Elementos Web-04.png";
import instagram from "../assest/images/web/Elementos Web-05.png";
import twitter from "../assest/images/web/Elementos Web-06.png";

import PlayPause from  './PlayPause';



class  Redes extends React.Component {
    constructor(props){
        super(props);
       
        this.state = {
            radio:true,
           
          };
            
   }
  

    render (){
        return(
            <>
            <a class="btn-icon active text-secondary " href="https://www.facebook.com/municipioareco" target="_blank" rel="noopener noreferrer">
            <img className="" alt='' src={facebook} width="50" height="50" />{' '}
            </a>
            <a class="btn-icon active text-secondary " href="https://www.instagram.com/municipioareco/" target="_blank" rel="noopener noreferrer" >
            <img className="" alt='' src={instagram} width="50" height="50" />{' '}
            </a>
            <a class="btn-icon active text-secondary " href="https://twitter.com/municipioareco" target="_blank" rel="noopener noreferrer" >
            <img className="" alt='' src={twitter} width="50" height="50" />{' '}
            </a>
            <a class="btn-icon active text-secondary " href="https://www.youtube.com/channel/UCPjIvZv1snYrk-Gky-265ZA" target="_blank" rel="noopener noreferrer" >
            <img className="" alt='' src={youtube} width="50" height="50" />{' '}
            </a>
            <a class="btn-icon active text-secondary " href data-tip='' data-for='Radio Pampa'>
            <PlayPause url="http://186.33.235.85:8088/;stream/1" alto="60" ancho="60"/>
             </a>
            
             
            </>
        )
    }


}
export default Redes;