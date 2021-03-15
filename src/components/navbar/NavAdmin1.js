/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Navbar,Nav,Button,DropdownButton,Dropdown,Row, Col}from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";


import AuthService from "../../services/auth.service";

import Login from "../../components/login.component";
import Register from "../../components/register.component";
import Home from "../../components/home.component";
import Profile from "../../components/profile.component";
import BoardUser from "../../components/board-user.component";
import BoardModerator from "../../components/board-moderator.component";
import BoardPrensa from "../../components/board-prensa.component";
import BoardAdmin from "../../components/board-admin.component";
import logo1 from "../../assest/images/web/Elementos Web-01.png";
import logo from "../../assest/images/web/Elementos Web-01.png";
import face from "../../assest/images/web/Elementos Web-03.png";
import youtube from "../../assest/images/web/Elementos Web-04.png";
import radiopampa from "../../assest/images/web/Elementos Web-02.png";
import pause from "../../assest/images/header-imagenes/pause.png";
import instagram from "../../assest/images/web/Elementos Web-05.png";
import twitter from "../../assest/images/web/Elementos Web-06.png";
import PlayPause from  '../PlayPause';


import "./NavAdmin1.css";


var audio = new Audio('http://186.33.235.85:8088/;stream/1');
var logoradio=radiopampa;
class NavAdmin extends React.Component{
    constructor(props){
        super(props);
        this.playRadio=this.playRadio.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            radio:true,
            diaTemperatura:20.0,
            diaIcono:3,
            hidden: undefined,
            showModeratorBoard: false,
            showAdminBoard: false,
            showPrensaBoard:false,
            currentUser: undefined,
          };
            
   }
  
   playRadio() {
    
    if(this.state.radio){
        audio.play();
        this.setState({radio:false})
        console.log('play')
        logoradio=pause;
       
    }else{
        audio.pause();
        this.setState({radio:true})
        console.log('stop')
        logoradio=radiopampa;
        
    }
    
   }

   componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showPrensaBoard:user.roles.includes("ROLE_PRENSA"),
      });
    }
  }
 
  logOut() {
    AuthService.logout();
  }
   
 render(){
    const { currentUser, showModeratorBoard, showAdminBoard,showPrensaBoard } = this.state;
        return(

            <>
            
              <Navbar  as="div" bg="light" expand="lg"  className="logo-header" >
            <Navbar.Brand href="/home" >
                <Row className="header-text"> 
                    <img
                                alt=""
                                src={logo}
                                width="80"
                                height="100"
                                className="menu-logo"
                            /> 
                    <h4 className="menu-titulo">San Antonio de Areco</h4>
                </Row>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav " className="buttton-nav">
           <Nav className="mr-auto  " >
            
            </Nav>
            <div >
                <Col>
                <a className="btn-icon active text-secondary ml-4" href="https://www.facebook.com/municipioareco" target="_blank" rel="noopener noreferrer">
                <img alt=""  src={face} width='50' height='50'/>
                </a>
                <a className="btn-icon active text-secondary ml-4" href="https://www.youtube.com/channel/UCPjIvZv1snYrk-Gky-265ZA" target="_blank" rel="noopener noreferrer" >
                <img alt=""  src={youtube} width='50' height='50'/>
                </a>
                </Col>
                <Col>
                <a className="btn-icon active text-secondary ml-4" href="https://www.instagram.com/municipioareco/" target="_blank" rel="noopener noreferrer" >
                <img alt=""  src={instagram} width='50' height='50'/>
                </a>
                <a className="btn-icon active text-secondary ml-4" href="https://twitter.com/municipioareco" target="_blank" rel="noopener noreferrer" >
                <img alt=""  src={twitter} width='50' height='50'/>
                </a>
                </Col>
                </div>
                <div className="header-radio">
                <a className="btn-icon active text-secondary ml-4 pt-3"  data-tip='' data-for='Radio Pampa'>
                <PlayPause url="http://186.33.235.85:8088/;stream/1" alto="60" ancho="60"/>
                <p className='envivo'>EN VIVO</p>
                </a>
               
             </div>
            </Navbar.Collapse>
            </Navbar>

            <Navbar className="bg-menu" expand="lg">
            <Navbar.Brand  className='brand-logo'  href="/home">
            
                <img
                            alt=""
                            src={logo1}
                            width="60"
                            height="80"
                            className="menu-logo-chico"
                        /> 
                <h5 className="">San Antonio de Areco</h5>
              
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav " className="buttton-nav">
                <Nav className="mr-auto ml-0 mt-0 " >
                <Button href="/home" variant="nav" >Inicio</Button>
                {showModeratorBoard && 
                 (<Button href="/mod" variant="nav" >Moderador</Button>)}
                 {showPrensaBoard && 
                 (<Button href="/prensa" variant="nav" >Prensa</Button>)}
                {showAdminBoard &&
                (<Button href="/admin" variant="nav" >Administracion</Button>)}
                
                </Nav>

                {currentUser ? (
                   <Nav className="ml-auto ">
                        <Button   href="/profile" variant="nav" >{currentUser.username}</Button>
                        <Button  href="/login" variant="nav" onClick={this.logOut} >Logout</Button>
                 </Nav> 
                ):(
                    <Nav className="ml-auto ">
                   <Button   href="/login" variant="nav" >Login</Button> 
                   <Button   href="/register" variant="nav" >Sign Up</Button>
                   </Nav>
                )}
                    
                
            </Navbar.Collapse>
            </Navbar>
            <div className=" mt-3 ">
            <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/prensa" component={BoardPrensa} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
            </div>
            </>
        )

    }

}
export default NavAdmin;