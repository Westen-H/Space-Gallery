const HeaderPage = ({ onOpenFavorites }) => {
  return (
    <header className="main-header">
      <div className="header-contain">
        <div className="logo">
          <span className="logo-icon">📸</span>
          <span className="logo-text">
            Space<span>Gallery</span>
          </span>
        </div>

        <nav className="nav-menu">
          <ul>
            <li>
              <button className="btn-favorites" onClick={onOpenFavorites}>
                <span className="icon">🤍</span> Favoritos
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderPage;
