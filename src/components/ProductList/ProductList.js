import { useEffect, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import ProductCard from '../ProductCard/ProductCard';
import { getProducts } from '../../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Não foi possível carregar os produtos. Tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  }, []);

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
}

export default ProductList;
