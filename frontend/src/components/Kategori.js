
export default function CategoriesEfiTerm() {
  return (
    <section className="categories-section">
      <h2 className="section-title">Shërbimet tona</h2>
      <p className="section-subtitle">
        Zgjidhje profesionale për shtëpi dhe biznese
      </p>

      <div className="categories-grid">
        <div className="category-card">
          <div className="icon">💧</div>
          <h3>Ujësjellës & Sanitari</h3>
          <p>
            Instalime dhe riparime profesionale të ujësjellësit,
            banjo dhe kuzhina moderne.
          </p>
        </div>

        <div className="category-card">
          <div className="icon">🔥</div>
          <h3>Ngrohje Qendrore</h3>
          <p>
            Sisteme ngrohjeje efikase me radiatorë,
            dysheme nënngrohëse dhe kaldaja.
          </p>
        </div>

        <div className="category-card">
          <div className="icon">🌪️</div>
          <h3>Sistem Vakumi</h3>
          <p>
            Fshesa qendrore moderne për ajër më të pastër
            dhe zhurmë minimale.
          </p>
        </div>

        <div className="category-card">
          <div className="icon">🛠️</div>
          <h3>Mirëmbajtje & Servis</h3>
          <p>
            Servis i shpejtë dhe mirëmbajtje teknike
            për të gjitha sistemet.
          </p>
        </div>
      </div>
    </section>
  );
}

