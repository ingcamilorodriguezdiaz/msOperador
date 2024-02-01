import React, { useEffect, useState } from 'react';

const apiUrl = 'http://localhost:7000/product';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const createProduct = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      console.log('Producto creado:', data);
      getAllProducts();
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProduct),
      });
      const data = await response.json();
      console.log('Producto actualizado:', data);
      getAllProducts();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      console.log('Producto eliminado correctamente.');
      getAllProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price}{' '}
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Agregar Nuevo Producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Precio"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <button onClick={createProduct}>Agregar Producto</button>

      {selectedProduct && (
        <>
          <h2>Editar Producto</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={selectedProduct.name}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Precio"
            value={selectedProduct.price}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
          />
          <button onClick={updateProduct}>Guardar Cambios</button>
        </>
      )}
    </div>
  );
};

export default ProductList;
