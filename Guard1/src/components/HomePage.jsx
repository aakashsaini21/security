import React from 'react'
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';

function HomePage() {
  return (
    <div>
      <Navbar />
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  )
}

export default HomePage