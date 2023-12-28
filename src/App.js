import React, { useState, useEffect, useRef } from "react";
import './App.css';
import open from "../src/Assets/Image/open.png";
import close from "../src/Assets/Image/close mouth.png";
import Footer from "./Footer";
import backgroundMusic from "../src/Assets/Image/i am a coconut.mp3";
import soundEffect from "../src/Assets/Image/niganma.mp3";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });
  const timerRef = useRef(null);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 85);
    const y = Math.random() * (window.innerHeight - 48);
    setButtonPosition({ left: x, top: y });
  };

  const handleClick = () => {
    clearTimeout(timerRef.current);
    setIsOpen(true);
    setNumber((prevNumber) => prevNumber + 1);
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    console.log("Number updated:", number);
  }, [number]);

  useEffect(() => {
    const audioElement = document.getElementById("backgroundMusic");

    const playAudio = () => {
      if (audioElement) {
        audioElement.play().catch(error => {
          console.error("Autoplay failed:", error);
        });
      }
    };

    playAudio();
    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const audioElement = document.getElementById("niganmaSound");

    const playNiganma = () => {
      if (audioElement) {
        audioElement.currentTime = 0; // Reset the audio to the beginning before playing
        audioElement.play().catch(error => {
          console.error("Failed to play niganma sound:", error);
        });
      }
    };

    document.getElementById("clickButton").addEventListener("click", playNiganma);

    return () => {
      document.getElementById("clickButton").removeEventListener("click", playNiganma);
    };
  }, []);

  return (
    <div className="App">
      <audio id="backgroundMusic" autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Browser does not support the audio.
      </audio>

      <audio id="niganmaSound" src={soundEffect} type="audio/mp3">
        Browser does not support the audio.
      </audio>

      <main className="w-full h-full flex flex-col items-center justify-center">
        <Footer />
        <p className="pt-2 mb-4 text-[3em] font-bold text-white justify-center">{number}</p>
        <img src={isOpen ? open : close} alt="Mouth" className="image mb-4 w-5/6 mx-auto flex justify-center items-center" />
        <div className='flex flex-row w-5/6 justify-center gap-x-12 font-bold text-white mb-6'>
          <button id="clickButton" onClick={handleClick} className='px-2 py-2 border rounded-lg hover:text-black text-[1.5em]'>Happy</button>
          <button
            id="closeButton"
            className='px-2 py-2 border rounded-lg hover:text-black text-[1.5em]'
            style={{ position: 'absolute', left: buttonPosition.left, top: buttonPosition.top }}
            onMouseOver={moveButton}
          >
            Close
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
