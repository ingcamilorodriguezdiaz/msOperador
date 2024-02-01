package com.sthore.msOperador.Controlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sthore.msOperador.models.Product;
import com.sthore.msOperador.service.ProductService;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
 
import org.springframework.http.HttpStatus;
 

import java.util.List;

 

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@RefreshScope
@Getter
@Setter
 
@CrossOrigin(origins = "*")
public class ProductoController {
    @Autowired
    public  ProductService productService;
     

     @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/holamundo")
    public String holaMundo() {
        return "¡Hola Mundo!";
    }

    @GetMapping("/{id}")//ResponseEntity<Product>
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
       Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }  
         
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

   /*  @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product updatedProduct) {
        Product existingProduct = productService.getProductById(id);

        if (existingProduct != null) {
            updatedProduct.setId(id);  // Asegurar que el ID del producto se mantenga igual
            productService.saveProduct(updatedProduct);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    } */
    @PutMapping("/{id}")
public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
    Product existingProduct = productService.getProductById(id);

    if (existingProduct != null) {
        updatedProduct.setId(Long.valueOf(id));  // Convertir el ID a Long si es necesario
        productService.saveProduct(updatedProduct);
        return ResponseEntity.ok(updatedProduct);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Product existingProduct = productService.getProductById(id);

        if (existingProduct != null) {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
