import { useEffect, useMemo, useRef, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import ProductCard from '../ProductCard/ProductCard';
import ProductForm from '../ProductForm/ProductForm';
import { getProducts } from '../../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [search, setSearch] = useState('');
  const toast = useRef(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Não foi possível carregar os produtos. Tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return products;
    }

    return products.filter(({ title, category }) =>
      `${title} ${category}`.toLowerCase().includes(term)
    );
  }, [products, search]);

  const handleAddProduct = (product) => {
    setProducts((current) => [product, ...current]);
    setFormVisible(false);
    toast.current.show({
      severity: 'success',
      summary: 'Produto adicionado',
      detail: `${product.title} foi adicionado à lista.`,
      life: 3000,
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-content-center p-6">
          <ProgressSpinner />
        </div>
      );
    }

    if (error) {
      return <Message severity="error" text={error} className="w-full" />;
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="flex flex-column align-items-center gap-2 p-6 text-500">
          <i className="pi pi-search text-4xl" />
          <span>Nenhum produto encontrado.</span>
        </div>
      );
    }

    return (
      <div className="grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 sm:col-6 lg:col-4 xl:col-3">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section>
      <Toast ref={toast} />

      <div className="surface-card border-round shadow-1 p-3 mb-4 flex flex-column md:flex-row align-items-stretch md:align-items-center justify-content-between gap-3">
        <div>
          <h2 className="m-0 text-xl">Produtos</h2>
          <small className="text-500">{filteredProducts.length} produto(s) exibido(s)</small>
        </div>

        <div className="flex flex-column sm:flex-row gap-2">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto"
              className="w-full"
            />
          </IconField>
          <Button label="Adicionar produto" icon="pi pi-plus" onClick={() => setFormVisible(true)} />
        </div>
      </div>

      {renderContent()}

      <Dialog
        header="Novo produto"
        visible={formVisible}
        onHide={() => setFormVisible(false)}
        style={{ width: '40rem' }}
        breakpoints={{ '640px': '95vw' }}
        modal
      >
        <ProductForm onSubmit={handleAddProduct} onCancel={() => setFormVisible(false)} />
      </Dialog>
    </section>
  );
}

export default ProductList;
