import "../styles/PageHeader.css";

function PageHeader({ title }) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <img
        className="page-header__logo"
        src="../src/assets/ytseal.svg"
        alt="Logo placeholder"
      />
    </header>
  );
}

export default PageHeader;