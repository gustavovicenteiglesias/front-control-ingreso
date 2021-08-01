/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense, lazy }  from 'react';
import {Navbar,Nav,Button,Row}from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import Placeholder from './Placeholder';
import AuthService from "../../services/auth.service";
import logo1 from "../../assest/Logo.png";
import logo from "../../assest/Logo.png";
import "./NavAdmin1.css";

const Cohortes = lazy(() =>import ("../Cohortes/AdministrarCohortes"));
const Aulas= lazy(() =>import ("../Aulas/AdministrarAulas"));
const Proximas = lazy(() =>import ("../AsignarAulas/AsignarAulas"));
const Seguimientos = lazy(() => import ("../Seguimientos/AdminSeguimientos"));

const Home = lazy(() =>import ('../home.component'));
const Register = lazy(() =>import ('../register.component'));
const Login = lazy(() =>import ('../login.component'));
const Profile = lazy(() =>import ('../profile.component'));
const Actividades = lazy(() =>import ('../Actividades/AdministrarActividades'));







class NavAdmin extends React.Component{
    constructor(props){
        super(props);
        
        this.logOut = this.logOut.bind(this);
        this.state = {
            
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
              <LinkContainer to="/home">
            <Navbar.Brand  >
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
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav " className="buttton-nav">
           <Nav className="mr-auto  " >
            
            </Nav>
           
            </Navbar.Collapse>
            </Navbar>

            <Navbar className="bg-menu" expand="lg">
            <LinkContainer to="/home">
            <Navbar.Brand  className='brand-logo' >
            
                <img
                            alt=""
                            src={logo1}
                            width="60"
                            height="80"
                            className="menu-logo-chico"
                        /> 
            
              
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav " className="buttton-nav">
                <Nav className="mr-auto ml-0 mt-0 " >
                <LinkContainer to="/home">
                <Button href="/home" variant="nav" >Inicio</Button>
                </LinkContainer>
                {(showModeratorBoard || showAdminBoard )&&
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
                 {showAdminBoard && 
                 (
                  <LinkContainer to="/seguimientos">
                 <Button variant="nav" >Seguimientos</Button>
                 </LinkContainer>
                 )}
                </Nav>

                {currentUser ? (
                   <Nav className="ml-auto ">
                        <Button   href="/profile" variant="nav" >{currentUser.username}</Button>
                        <Button  href="/login" variant="nav" onClick={this.logOut} >Cerrar sesión</Button>
                 </Nav> 
                ):(
                    <Nav className="ml-auto ">
                   <Button   href="/login" variant="nav" >Login</Button> 
                   <Button   href="/register" variant="nav" >Registrate</Button>
                   </Nav>
                )}
                    
                
            </Navbar.Collapse>
            </Navbar>
            <div className=" mt-3 ">
            <Suspense fallback={<Placeholder/>}>
            <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            
            <Route path="/actividades" component={Actividades} />
            <Route path="/cohortes" component={Cohortes} />
            <Route path="/aulas" component={Aulas} />
            <Route path="/proximasclases" component={Proximas} />
            <Route path="/seguimientos" component={Seguimientos} />

          </Switch>
          </Suspense>
            </div>
            </>
        )

    }

}
export default NavAdmin;