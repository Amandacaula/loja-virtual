function Header() {
  return (
    <header className="bg-primary shadow-2">
      <div className="max-w-screen-xl mx-auto px-3 md:px-5 py-4 flex flex-column md:flex-row align-items-center justify-content-between gap-2">
        <div className="flex align-items-center gap-3">
          <i className="pi pi-shopping-bag text-4xl" />
          <div>
            <h1 className="m-0 text-2xl md:text-3xl font-bold">Loja Virtual</h1>
            <p className="m-0 text-sm opacity-80">Os melhores produtos em um só lugar</p>
          </div>
        </div>
        <span className="flex align-items-center gap-2 text-sm">
          <i className="pi pi-truck" />
          Frete grátis em todo o Brasil
        </span>
      </div>
    </header>
  );
}

export default Header;
