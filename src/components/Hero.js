import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">Little Lemon</h2>
          <h3 className="hero-subtitle">Chicago</h3>
          <p className="hero-description">
            We are a family owned Mediterranean restaurant, focused on traditional 
            recipes served with a modern twist. Experience authentic flavors in a 
            warm and welcoming atmosphere.
          </p>
          <a 
            href="#reservations" 
            className="cta-button"
            aria-label="Reserve a table at Little Lemon restaurant"
          >
            Reserve a Table
          </a>
        </div>
        <div className="hero-image">
          <img 
            src="/logo512.png" 
            alt="Delicious Mediterranean food from Little Lemon restaurant" 
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;