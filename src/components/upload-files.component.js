import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import { Form,Button,Col,Row} from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { preventOverflow } from "@popperjs/core";
export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.facebook=this.facebook.bind(this);
    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      entrada:null,
      fileInfos: [],
      face:"",
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });

    UploadService.getFace().then((response)=>{
      this.setState({face:response.data.data.link});
    console.log(response.data.data.link);
    })
    

  }
  

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }
   
  facebook(link){
    
      UploadService.setFace("",link)
      console.log("FAce");
      
  }

   upload(foto) {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(foto,currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        window.location.reload();
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      
    } = this.state;

    return (
      <div style={{minHeight:400}}>
        {/*Foto 1 */}
        <Col lg={12}>
      <div style={{ margin: "20px" }}>
        <h3>Foto 1 </h3>
      </div>
      <div>
          <img alt="" src="http://localhost:9525/api/home/imagen/foto1.png" height="400" width="100%"/>
        </div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
          
         <Col lg={12}>
         <label className=" btn-default ">
            <input type="file" onChange={this.selectFile} />
          </label>
         </Col>
         <div className="d-grid gap-2">
         <Button
          block
          className="btn btn-success mt-2 mb-2"
          disabled={!selectedFiles}
          onClick={()=>this.upload("foto1.png")}
          >
          Subir 
           </Button>  
         </div>
         <div className="alert alert-light" role="alert">
          {message}
        </div>
      </Col>
      {/*Foto 2 */}
      <Col lg={12}>
      <div style={{ margin: "20px" }}>
        <h3>Foto 2 </h3>
      </div>
      <div>
          <img alt="" src="http://localhost:9525/api/home/imagen/foto2.png" height="400" width="100%"/>
        </div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
        <Col lg={12}>
         <label className=" btn-default ">
            <input type="file" onChange={this.selectFile} />
          </label>
         </Col>
         <div className="d-grid gap-2">
         <Button
          block
          className="btn btn-success mt-2 mb-2"
          disabled={!selectedFiles}
          onClick={()=>this.upload("foto2.png")}
          >
          Subir 
           </Button>  
         </div>
        
        <div className="alert alert-light" role="alert">
          {message}
        </div>
      </Col>
      {/*Foto 3 */}
      <Col lg={12}>
      <div style={{ margin: "20px" }}>
        <h3>Foto 3 </h3>
      </div>
      <div>
          <img alt="" src="http://localhost:9525/api/home/imagen/foto3.png" height="400" width="100%"/>
        </div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
        <Col lg={12}>
         <label className=" btn-default ">
            <input type="file" onChange={this.selectFile} />
          </label>
         </Col>
         <div className="d-grid gap-2">
         <Button
          block
          className="btn btn-success mt-2 mb-2"
          disabled={!selectedFiles}
          onClick={()=>this.upload("foto3.png")}
          >
          Subir 
           </Button>  
         </div>
       
      </Col>
     {/*FACE*/}
      <Col lg={12}>
        <div>
        <ReactPlayer
        className="face-unminuto"
         url={this.state.face} 
         width="100%"
         height="100%"
         style={{align: 'center'}}
         />
        </div>
        <Form >
      <Form.Row>
        <Form.Label column lg={3} className="" >
         Ingresa link 
        </Form.Label>
        <Col lg={9}>
        <Form.Control
          className="mb-2 mt-2"
          id="linkFacebook"
          value={this.state.face}
          onChange={(e)=>{this.setState({face:e.target.value})}}
          />
        </Col>
        </Form.Row>
        
        <Button type="submit" className="mb-2 " 
        onClick={(e)=>{e.preventDefault()  ;this.facebook(this.state.face)}}
        block
        variant='success'
        >
        Subir
        </Button>
        
      
      </Form>
      </Col>
      
      
      </div>
    );
  }
}
