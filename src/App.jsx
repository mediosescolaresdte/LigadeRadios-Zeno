// App.jsx
import React from 'react';
import logo from '/logoliga.png';
import './App.css';

export default function App() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black to-blue-800 overflow-hidden">
      {/* Contenedor principal: evita scroll y centra todo */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-6">

        {/* Logo (ya NO es link). Tiene efecto hover solo visual */}
        <div
          role="img"
          aria-label="Logo Liga de Radios Escolares"
          tabIndex={-1}
          className="block w-full max-w-4xl"
        >
          <div
            className="
              w-full flex items-center justify-center
              h-[26vh] sm:h-[32vh] md:h-[38vh] lg:h-[44vh]
              transition-transform duration-200 ease-out
              hover:scale-105 hover:translate-y-[-2px] hover:shadow-2xl
              rounded-lg
            "
          >
            <img
              src={logo}
              alt="logo"
              className="max-h-full w-auto object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>

        {/* Reproductor embebido (iframe) — ahora siempre visible pero con tamaño responsivo */}
        <div className="mt-3 flex items-center justify-center w-full">
          <div
            className="
              w-[88vw] sm:w-[80vw] md:w-[60vw] lg:w-[48vw] max-w-2xl
              h-[10vh] sm:h-[12vh] md:h-[16vh] lg:h-[20vh]
              rounded-lg overflow-hidden shadow-lg
            "
          >
            <iframe
              src="https://zeno.fm/player/liga-de-radios-escolares-pba"
              title="Zeno.fm Player"
              frameBorder="0"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>

        {/* Texto descriptivo (debajo). Tipografías y alturas reducidas en xs para evitar overflow */}
        <div
          className="
            bg-white/95 text-gray-900
            max-w-2xl w-[92%] sm:w-[80%] md:w-[70%]
            px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5
            rounded-2xl shadow-lg text-center mt-4
            overflow-auto
            max-h-[28vh] sm:max-h-[24vh] md:max-h-[20vh] lg:max-h-[16vh]
          "
        >
          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            Somos la <strong>Liga de Radios Escolares Bonaerenses</strong>, una plataforma digital para las voces de las y los
            protagonistas de las emisoras escolares de toda la provincia. Las producciones que suenan en nuestra
            programación surgen gracias al aporte de las y los estudiantes de distintos años junto a sus docentes.
          </p>
        </div>

      </div>
    </main>
  );
}
