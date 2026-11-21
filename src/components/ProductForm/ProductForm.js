import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { createProduct } from '../../services/api';

const categories = [
  { label: "Roupas masculinas", value: "men's clothing" },
  { label: 'Roupas femininas', value: "women's clothing" },
  { label: 'Joias', value: 'jewelery' },
  { label: 'Eletrônicos', value: 'electronics' },
];

const initialValues = {
  title: '',
  price: null,
  category: null,
  image: '',
  description: '',
};

const validate = (values) => {
  const errors = {};

  if (!values.title.trim()) {
    errors.title = 'Informe o nome do produto.';
  }

  if (values.price === null || values.price <= 0) {
    errors.price = 'Informe um preço maior que zero.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  if (values.image && !/^https?:\/\/.+/i.test(values.image.trim())) {
    errors.image = 'Informe uma URL válida (http ou https).';
  }

  if (!values.description.trim()) {
    errors.description = 'Informe a descrição do produto.';
  }

  return errors;
};

function ProductForm({ onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const product = {
      title: values.title.trim(),
      price: values.price,
      category: values.category,
      image: values.image.trim(),
      description: values.description.trim(),
    };

    setSubmitting(true);
    await createProduct(product).catch(() => null);
    setSubmitting(false);
    setValues(initialValues);
    onSubmit({ ...product, id: Date.now(), rating: { rate: 0, count: 0 } });
  };

  const fieldError = (field) =>
    errors[field] && <small className="p-error">{errors[field]}</small>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-3" noValidate>
      <div className="flex flex-column gap-2">
        <label htmlFor="title" className="font-medium">Nome</label>
        <InputText
          id="title"
          value={values.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={classNames({ 'p-invalid': errors.title })}
          placeholder="Ex.: Camiseta básica"
        />
        {fieldError('title')}
      </div>

      <div className="grid">
        <div className="col-12 sm:col-6 flex flex-column gap-2">
          <label htmlFor="price" className="font-medium">Preço</label>
          <InputNumber
            inputId="price"
            value={values.price}
            onValueChange={(e) => handleChange('price', e.value)}
            mode="currency"
            currency="USD"
            locale="pt-BR"
            min={0}
            className={classNames('w-full', { 'p-invalid': errors.price })}
            inputClassName="w-full"
          />
          {fieldError('price')}
        </div>

        <div className="col-12 sm:col-6 flex flex-column gap-2">
          <label htmlFor="category" className="font-medium">Categoria</label>
          <Dropdown
            inputId="category"
            value={values.category}
            options={categories}
            onChange={(e) => handleChange('category', e.value)}
            placeholder="Selecione"
            className={classNames('w-full', { 'p-invalid': errors.category })}
          />
          {fieldError('category')}
        </div>
      </div>

      <div className="flex flex-column gap-2">
        <label htmlFor="image" className="font-medium">URL da imagem</label>
        <InputText
          id="image"
          value={values.image}
          onChange={(e) => handleChange('image', e.target.value)}
          className={classNames({ 'p-invalid': errors.image })}
          placeholder="https://..."
        />
        {fieldError('image')}
      </div>

      <div className="flex flex-column gap-2">
        <label htmlFor="description" className="font-medium">Descrição</label>
        <InputTextarea
          id="description"
          value={values.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          autoResize
          className={classNames({ 'p-invalid': errors.description })}
        />
        {fieldError('description')}
      </div>

      <div className="flex justify-content-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" outlined onClick={onCancel} />
        <Button type="submit" label="Salvar" icon="pi pi-check" loading={submitting} />
      </div>
    </form>
  );
}

export default ProductForm;
