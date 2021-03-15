import axios from "axios";
import http from "./http-common";

const user = JSON.parse(localStorage.getItem('user'));
class UploadFilesService {
  
  upload(nombre,file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("nombre", file);

    return http.post("/upload/"+nombre, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": 'Bearer ' + user.accessToken
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files",{headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": 'Bearer ' + user.accessToken
    }});
  }
  setFace(id,link){
    const data={
      id:id,
      link:link
    }
    return axios.post("http://localhost:9525/api/facebook/facebook/create",data,{headers: {
      
      "Authorization": 'Bearer ' + user.accessToken
    }})
  }
   getFace(){
  return axios.get("http://localhost:9525/api/facebook/ultimo")
  
  
 }
}

export default new UploadFilesService();
