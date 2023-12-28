import React, { useState, useEffect, useRef } from "react";
import './App.css';
import open from "../src/Assets/Image/open.png";
import close from "../src/Assets/Image/close mouth.png";
import Footer from "./Footer";
import backgroundMusic from "../src/Assets/Image/i am a coconut.mp3";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [number, setNumber] = useState(0);
  const [buttonPosition, setButtonPosition] = useState(false);
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

  return (
    <div className="App">
      <audio id="backgroundMusic" autoPlay loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Browser does not support the audio.
      </audio>

      <main className="w-full h-full flex flex-col items-center justify-center">
          <Footer />
          <p className="pt-2 mb-4 text-[3em] font-bold text-white justify-center">{number}</p>
        <img src={isOpen ? open : close} alt="Mouth" className="image mb-4 w-5/6 mx-auto flex justify-center items-center" />
        <div className='flex flex-row w-5/6 justify-center gap-x-12 font-bold text-white mb-6'>
          <button id="clickButton" onClick={handleClick} className='px-2 py-2 border rounded-lg hover:text-black text-[1.5em]'>Click</button>
          <button
            id="closeButton"
            className='px-2 py-2 border rounded-lg hover:text-black text-[1.5em] md:block hidden'
            style={{ position: 'absolute', left: buttonPosition.left, top: buttonPosition.top }}
            onMouseOver={moveButton}
          >
            Close
          </button>

          <button
            id="closeButton"
            className='px-2 py-2 border rounded-lg hover:text-black text-[1.5em] block md:hidden'
            style={{ position: 'absolute', left: buttonPosition.left, top: buttonPosition.top }}
            onClick={moveButton}
          >
            Close
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
