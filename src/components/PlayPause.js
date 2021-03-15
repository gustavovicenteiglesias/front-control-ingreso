/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import radiopampa from "../assest/images/header-imagenes/logoradio.jpg";
import pause from "../assest/images/header-imagenes/pause.png";


const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
      audio.volume=1;
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};
const paused=(ancho,alto)=>{
    return <img alt=""  src={pause} width={ancho} height={alto} className="radio"/>

}

const played=(ancho,alto)=>{
    return <img alt=""  src={radiopampa} width={ancho} height={alto} className="radio"/>
}
const Player = ({ url,ancho,alto }) => {
  const [playing, toggle] = useAudio(url);

  return (
   
      <a 
       onClick={toggle}>{playing ? paused(ancho,alto) : played(ancho,alto)}</a>
    
  );
};

export default Player;
