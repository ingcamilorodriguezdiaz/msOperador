import React, { useEffect } from 'react';

const apiUrl = 'http://localhost:8080/product';

function App() {
  useEffect(() => {
    // Ejemplos de uso
    getAllProducts();
    getProductById(1);
    createProduct({ name: 'Nuevo Producto', price: 19.99 });
    updateProduct(1, { name: 'Producto Actualizado', price: 29.99 });
    deleteProduct(2);
  }, []);

  async function getAllProducts() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  async function getProductById(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
    }
  }

  async function createProduct(product) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  }

  async function updateProduct(id, updatedProduct) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`Error al actualizar el producto con ID ${id}:`, error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
      console.log('Producto eliminado correctamente.');
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
    }
  }

  return (
    <div>
      <h1>API Productos</h1>
      {/* Agrega aquí tu formulario dinámico */}
    </div>
  );
}

export default App;
