import { useEffect, useRef, useState } from 'react';
import logo from '/logoliga.png';
import footerLogo from './assets/images/Pie-institucional-blanco-3 (2).png';
import './App.css';

// La misma señal que utiliza el reproductor oficial de esta emisora en Zeno.
const STREAM_URL = 'https://stream.zeno.fm/yxbgeorcmewtv';

function RadioPlayer() {
  const audioRef = useRef(null);
  const requestedRef = useRef(false);
  const attemptRef = useRef(0);
  const [status, setStatus] = useState('idle');
  const isPlaying = status === 'playing';
  const isLoading = status === 'connecting' || status === 'buffering';

  function stopPlayback() {
    requestedRef.current = false;
    attemptRef.current += 1;
    const audio = audioRef.current;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    setStatus('idle');
  }

  function reportError() {
    if (!requestedRef.current) return;
    requestedRef.current = false;
    audioRef.current.pause();
    setStatus('error');
  }

  async function togglePlayback() {
    if (requestedRef.current) {
      stopPlayback();
      return;
    }
    const audio = audioRef.current;
    const attempt = ++attemptRef.current;
    // Una nueva conexión vuelve a la emisión actual después de pausar.
    audio.src = STREAM_URL;
    requestedRef.current = true;
    setStatus('connecting');
    try {
      await audio.play();
    } catch {
      if (attempt === attemptRef.current) reportError();
    }
  }

  useEffect(() => {
    if (!isLoading) return;
    const timeout = window.setTimeout(() => {
      requestedRef.current = false;
      attemptRef.current += 1;
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
      setStatus('error');
    }, 20000);
    return () => window.clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      requestedRef.current = false;
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    };
  }, []);

  const messages = {
    idle: 'Escuchá la radio',
    connecting: 'Conectando…',
    buffering: 'Reconectando…',
    playing: 'En vivo',
    error: 'No se pudo conectar. Tocá Play para reintentar.',
  };

  return (
    <section className={`radio-player ${isPlaying ? 'is-playing' : ''}`} aria-label="Reproductor de radio">
      <audio
        ref={audioRef}
        preload="none"
        onPlaying={() => {
          if (requestedRef.current && !audioRef.current.paused) setStatus('playing');
        }}
        onWaiting={() => {
          if (requestedRef.current) setStatus('buffering');
        }}
        onPause={() => {
          if (requestedRef.current && audioRef.current.paused) {
            requestedRef.current = false;
            setStatus('idle');
          }
        }}
        onEnded={reportError}
        onError={reportError}
      />
      <button
        type="button"
        className={`play-button ${isLoading ? 'is-loading' : ''}`}
        onClick={togglePlayback}
        aria-label={isLoading ? 'Cancelar conexión' : isPlaying ? 'Pausar radio' : 'Reproducir radio en vivo'}
        aria-pressed={isPlaying || isLoading}
        aria-describedby="playback-status"
      >
        {isLoading ? (
          <span className="loading-spinner" aria-hidden="true" />
        ) : (
          <svg viewBox="0 0 32 32" aria-hidden="true" className="play-icon">
            {isPlaying ? (
              <path d="M9 6h5v20H9zM18 6h5v20h-5z" />
            ) : (
              <path d="M11 5.5a1.5 1.5 0 0 0-2.25 1.3v18.4a1.5 1.5 0 0 0 2.25 1.3l16-9.2a1.5 1.5 0 0 0 0-2.6z" />
            )}
          </svg>
        )}
      </button>
      <div id="playback-status" className={`playback-status ${status === 'error' ? 'has-error' : ''}`} role="status" aria-live="polite">
        {isPlaying && (
          <span className="sound-wave" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </span>
        )}
        <span>{messages[status]}</span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="radio-page">
      <div className="radio-content">
        <div className="logo-frame">
          <img src={logo} alt="La Liga de Radios Escolares Bonaerenses" className="league-logo" draggable={false} />
        </div>
        <div className="description bg-white/95 text-gray-900 max-w-2xl w-[92%] sm:w-[80%] md:w-[70%] px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 rounded-2xl shadow-lg text-center">
          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            Somos la <strong>Liga de Radios Escolares Bonaerenses</strong>, una plataforma digital para las voces de las y los
            protagonistas de las emisoras escolares de toda la provincia. Las producciones que suenan en nuestra
            programación surgen gracias al aporte de las y los estudiantes de distintos años junto a sus docentes.
          </p>
        </div>
        <RadioPlayer />
      </div>
      <footer className="institutional-footer">
        <img
          src={footerLogo}
          alt="Dirección de Tecnología Educativa, Dirección General de Cultura y Educación de la Provincia de Buenos Aires"
        />
      </footer>
    </main>
  );
}
