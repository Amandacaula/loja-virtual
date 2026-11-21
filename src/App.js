import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <div className="min-h-screen flex flex-column">
      <Header />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-3 md:px-5 py-4">
        <ProductList />
      </main>
      <footer className="surface-0 border-top-1 surface-border text-center text-500 text-sm py-3">
        Loja Virtual &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
