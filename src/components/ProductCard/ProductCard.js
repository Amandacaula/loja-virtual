import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { formatCurrency } from '../../utils/formatCurrency';
import './ProductCard.css';

function ProductCard({ title, price, description, category, image, rating }) {
  const header = (
    <div className="product-card__image-wrapper flex align-items-center justify-content-center p-4">
      {image ? (
        <img className="product-card__image" src={image} alt={title} />
      ) : (
        <i className="pi pi-image text-6xl text-300" />
      )}
    </div>
  );

  const footer = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-2xl font-bold text-primary">{formatCurrency(price)}</span>
      {rating && (
        <div className="flex align-items-center gap-2">
          <Rating value={Math.round(rating.rate)} readOnly cancel={false} />
          <small className="text-500">({rating.count})</small>
        </div>
      )}
    </div>
  );

  return (
    <Card
      className="product-card h-full"
      header={header}
      title={<span className="product-card__title">{title}</span>}
      subTitle={<Tag value={category} severity="info" rounded />}
      footer={footer}
    >
      <p className="product-card__description m-0 text-600 line-height-3">{description}</p>
    </Card>
  );
}

export default ProductCard;
