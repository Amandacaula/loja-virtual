import { useEffect, useRef, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import ProductCard from '../ProductCard/ProductCard';
import ProductForm from '../ProductForm/ProductForm';
import { getProducts } from '../../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Não foi possível carregar os produtos. Tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  }, []);

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

    return (
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="col-12 md:col-6 lg:col-4">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section>
      <Toast ref={toast} />

      <div className="flex justify-content-end mb-3">
        <Button label="Adicionar produto" icon="pi pi-plus" onClick={() => setFormVisible(true)} />
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
