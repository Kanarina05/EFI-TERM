

export default function ContactEfiTerm() {
  return (
    <section className="contact-wrapper">
      <div className="contact-card">

        {/* Info */}
        <div className="contact-info">
          <h1>Kontakto Efi Term</h1>
          <p>
            Për çdo pyetje rreth produkteve apo shërbimeve tona,
            na kontaktoni dhe do t’ju përgjigjemi sa më shpejt.
          </p>
          <ul>
            <li><strong>📍 Adresa:</strong> Lipjan, Kosovë</li>
            <li><strong>📞 Telefoni:</strong> +383 44 574 631</li>
            <li><strong>✉️ Email:</strong> efi.term.01@gmail.com</li>
          </ul>
        </div>

        <div className="contact-form">
          <h2>Na shkruani</h2>
          <form>
            <label>Emri</label>
            <input type="text" placeholder="Emri juaj" />

            <label>Email</label>
            <input type="email" placeholder="email@example.com" />

            <label>Mesazhi</label>
            <textarea rows="4" placeholder="Mesazhi juaj..."></textarea>

            <button type="submit">Dërgo Mesazhin</button>
          </form>
        </div>

      </div>
    </section>
  );
}


