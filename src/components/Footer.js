import React from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../assest/images/logofull.png';
import {  Link } from "react-router-dom";
import Redes from './Redes'
import './Footer.css';

const Footer = ()=>{
    return(
        <>
        <div className="footer-margin footer-grande" >
         <Row>
            <Col md={4}  >
                <Link to='/home'>
                <Row className="footer-col1" >
                   
                <img
                        alt=""
                        src={logo}
                        width="70"
                        height="70"
                        className="menu-logo"
                        
                    /> 
                <h5 className="footer-titulo1 " >San Antonio de Areco</h5>
                </Row>
                </Link>
            </Col>
            <Col md={4} >
                <h5 className="footer-text-grande" style={{marginTop : 10}}>Lavalle 363 – San Antonio de Areco</h5>
                <h5 className="footer-text-grande">Tel.: (02326) 456202/454722</h5>
                <h5 className="footer-text-grande" >
                    <a style={{color: '#ffffff'}}  href="mailto:comunicacion@areco.gob.ar">comunicacion@areco.gob.ar</a>
                </h5>
            </Col>
            <Col md={4} >
                <Row className="footer-redes">
                   <Redes></Redes>
                </Row>
            </Col>
         </Row>    
         </div>

         <div className="footer-margin footer-pequenio" >
         
            <Col lg={4}  >
            
                <Row className="footer-col1">
                    
                <div className="footer-centrado " hidden={true}>
                <img
                        alt=""
                        src={logo}
                        width="70"
                        height="70"
                        className="logo-footer"
                    /> 
                </div>
               

                <div className="footer-redes footer-centrado">
                <Redes></Redes>
                </div>
                 
                </Row>
            </Col>
            <Col lg={4}  >
                <h5 className="footer-text">Lavalle 363 – San Antonio de Areco</h5>
                <h5 className="footer-text">Tel.: (02326) 456202/454722</h5>
                <h5 className="footer-text" >
                    <a style={{color: '#ffffff'}}  href="mailto:comunicacion@areco.gob.ar">comunicacion@areco.gob.ar</a>
                </h5>
            </Col>
          
           
         </div>
         </>
    );
    
    }
    export default Footer;