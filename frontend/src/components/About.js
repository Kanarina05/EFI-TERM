import React from "react";

function About() {
  return (
    <section className="about">
      <div className="about-hero">
        <h1>Rreth Efi Term</h1>
        <p>Zgjidhje moderne për Intsalimin E Nxemjes Qendore  <br></br>& Ujësjellës <br></br> & Sistemin Vakum Te Fshesave Qendore</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Kush jemi ne?</h2>
          <p>
            <strong>Efi Term</strong> është një firmë profesionale e fokusuar në
            sisteme moderne të ngrohjes dhe ftohjes, duke kombinuar teknologjinë,
            cilësinë dhe korrektësinë.
          </p>

          <p>
            Ne punojmë me standarde të larta dhe ofrojmë zgjidhje efikase
            energjetike për shtëpi dhe biznese, gjithmonë të përshtatura sipas
            nevojave të klientit.
          </p>
        </div>

        <div className="about-cards">
          <div className="card">
            <h3>🎯 Misioni</h3>
            <p>
              Të ofrojmë komoditet maksimal dhe kursim energjie për çdo klient.
            </p>
          </div>

          <div className="card">
            <h3>👁️ Vizioni</h3>
            <p>
              Të jemi lider në tregun e zgjidhjeve termike me teknologji të
              avancuar.
            </p>
          </div>

          <div className="card">
            <h3>🤝 Vlerat</h3>
            <p>
              Besueshmëri, profesionalizëm dhe përkushtim ndaj cilësisë.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
