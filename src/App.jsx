import logo from '/logoliga.png';
import './App.css'


function App() {


  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-b from-black to-blue-800 overflow-hidden -z-10">
        {/* Wrapper que mueve la pila hacia arriba y da padding inferior */}
        <div className="w-full h-full flex flex-col items-center justify-center transform -translate-y-6 sm:-translate-y-10 pb-10">
          {/* Logo como enlace (abre la URL en nueva pestaña) */}
          <a
            href="https://giss.tv:666/radiosescolares.mp3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir stream radios escolares"
            className={`
                  inline-flex items-center justify-center
                  focus:outline-none
                  transform-gpu transition-transform duration-200
                  hover:scale-105 active:scale-95
                  select-none pointer-events-auto
      
                  /* altura responsive: más pequeño en móviles, grande en escritorio */
                  h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh]
                  w-auto
                `}
          >
            <img
              src={logo}
              alt="logo"
              className="h-full w-auto object-contain draggable:false pointer-events-none select-none"
              draggable={false}
            />
          </a>

          {/* Cuadro de texto: más cerca del logo con margen negativo y limitando altura */}
          <div
            className={`
                  bg-white/95 text-gray-900
                  max-w-2xl w-[92%] sm:w-[80%] md:w-[70%]
                  px-5 py-4 md:px-6 md:py-5
                  rounded-2xl shadow-lg text-center
      
                  /* aumentamos la superposición para acercar más el texto al logo */
                  -mt-14 sm:-mt-16 md:-mt-20
      
                  /* evitar que el cuadro llegue al borde inferior; si excede, scrollea internamente */
                  max-h-[30vh] sm:max-h-[26vh] md:max-h-[22vh] overflow-auto
                `}
          >
            <p className="text-base sm:text-lg md:text-lg leading-relaxed">
              Somos la <strong>Liga de Radios Escolares Bonaerenses</strong>, una plataforma digital para las
              voces de las y los
              protagonistas de las emisoras escolares de toda la provincia. Las producciones que suenan en nuestra
              programación surgen de gracias al aporte de las y los estudiantes de distintos años junto a sus
              docentes.
            </p>
          </div>
        </div>
      </div>

      <div className="i">
        <iframe src="https://zeno.fm/player/liga-de-radios-escolares-pba" frameborder="0"
        ></iframe>

      </div>
    </>
  )
}

export default App
