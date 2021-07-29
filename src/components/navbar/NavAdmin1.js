/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Navbar,Nav,Button,DropdownButton,Dropdown,Row, Col}from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

import AuthService from "../../services/auth.service";

import Login from "../login.component";
import Register from "../register.component";
import Home from "../home.component";
import Profile from "../profile.component";
import BoardUser from "../board-user.component";
import BoardModerator from "../board-moderator.component";
import BoardPrensa from "../board-prensa.component";
import BoardAdmin from "../board-admin.component";
import Actividades from "../Actividades/AdministrarActividades";
import Cohortes from "../Cohortes/AdministrarCohortes";
import Aulas from "../Aulas/AdministrarAulas";
import Proximas from "../AsignarAulas/AsignarAulas";

import logo1 from "../../assest/Logo.png";
import logo from "../../assest/Logo.png";



import "./NavAdmin1.css";




class NavAdmin extends React.Component{
    constructor(props){
        super(props);
        
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
                                width="123"
                                height="123"
                                className="menu-logo"
                            /> 
                    
                </Row>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav " className="buttton-nav">
           <Nav className="mr-auto  " >
            
            </Nav>
           
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
                
              
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav " className="buttton-nav">
                <Nav className="mr-auto ml-0 mt-0 " >
                <Button href="/home" variant="nav" >Inicio</Button>
                
                {showAdminBoard &&
                (
                  <LinkContainer to="/actividades">
                <Button  variant="nav" >Actividades</Button>
                </LinkContainer>
                )
                }
                {showAdminBoard && 
                 (
                  <LinkContainer to="/cohortes">
                   <Button  variant="nav" >Cohortes</Button>
                   </LinkContainer>
                   )}
                 {showAdminBoard && 
                 (
                  <LinkContainer to="/aulas">
                 <Button variant="nav" >Aulas</Button>
                 </LinkContainer>
                 )}
                 {showAdminBoard && 
                 (
                  <LinkContainer to="/proximasclases">
                 <Button variant="nav" >Próximas clases</Button>
                 </LinkContainer>
                 )}
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
            <Route path="/actividades" component={Actividades} />
            <Route path="/cohortes" component={Cohortes} />
            <Route path="/proximasclases" component={Proximas} />

          </Switch>
            </div>
            </>
        )

    }

}
export default NavAdmin;