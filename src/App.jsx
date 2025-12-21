
import {productos} from './products' 
const productsData = [
  {
    "id": 101,
    "name": "Tarjetero Rosa",
    "sku_base": "SLC-ESC-001",
    "price": 9.00,
    "description": "Tarjeteros con capacidad para 5 tarjetas",
    "category": "Muebles de Sala",
    "image_url": "https://placehold.co/400x300/60a5fa/ffffff?text=Imagen+Base+Producto+1",
    
    "variants": [
      {
        "variant_id": "V101A",
        "type": "color",
        "value": "#ffb6efff",
        "name": "Rosa",
        "stock": 15,
        "variant_price_adjust": 0.00,
        "variant_image_url": "https://placehold.co/400x300/6B7280/ffffff?text=Gris+Grafito"
      },
      {
        "variant_id": "V101B",
        "type": "color",
        "value": "#b7ffbbff",
        "name": "Verde Lima",
        "stock": 0,
        "variant_price_adjust": 15.00,
        "variant_image_url": "https://placehold.co/400x300/15803d/ffffff?text=Verde+Oliva"
      },
      {
        "variant_id": "V101C",
        "type": "color",
        "value": "#82d2e6ff",
        "name": "Azul Cielo",
        "stock": 8,
        "variant_price_adjust": 0.00,
        "variant_image_url": "https://placehold.co/400x300/FCD34D/000000?text=Mostaza"
      }
    ]
  },
   {
    "id": 101,
    "name": "Tarjetero Rosa",
    "sku_base": "SLC-ESC-001",
    "price": 9.00,
    "description": "Tarjeteros con capacidad para 5 tarjetas",
    "category": "Muebles de Sala",
    "image_url": "https://placehold.co/400x300/60a5fa/ffffff?text=Imagen+Base+Producto+1",
    
    "variants": [
      {
        "variant_id": "V101A",
        "type": "color",
        "value": "#ffb6efff",
        "name": "Rosa",
        "stock": 15,
        "variant_price_adjust": 0.00,
        "variant_image_url": "https://placehold.co/400x300/6B7280/ffffff?text=Gris+Grafito"
      },
      {
        "variant_id": "V101B",
        "type": "color",
        "value": "#b7ffbbff",
        "name": "Verde Lima",
        "stock": 0,
        "variant_price_adjust": 15.00,
        "variant_image_url": "https://placehold.co/400x300/15803d/ffffff?text=Verde+Oliva"
      },
      {
        "variant_id": "V101C",
        "type": "color",
        "value": "#82d2e6ff",
        "name": "Azul Cielo",
        "stock": 8,
        "variant_price_adjust": 0.00,
        "variant_image_url": "https://placehold.co/400x300/FCD34D/000000?text=Mostaza"
      }
    ]
  },
  {
    "id": 202,
    "name": "Lámpara de Pie Industrial",
    "sku_base": "LMP-IND-005",
    "price": 89.99,
    "description": "Diseño metálico con bombilla expuesta. Estilo vintage.",
    "category": "Iluminación",
    "image_url": "https://placehold.co/400x300/f87171/000000?text=Imagen+Base+Producto+2",
    
    "variants": null  // Producto simple
  },
  
  {
    "id": 303,
    "name": "Set de Toallas de Algodón Pima",
    "sku_base": "TOW-PIM-010",
    "price": 65.00,
    "description": "Máxima suavidad y absorción garantizada por algodón Pima.",
    "category": "Baño",
    "image_url": "https://placehold.co/400x300/34d399/000000?text=Imagen+Base+Producto+3",
    
    "variants": [
      {
        "variant_id": "V303A",
        "type": "color",
        "value": "#DBEAFE",
        "name": "Azul Cielo",
        "stock": 25,
        "variant_price_adjust": 0.00
      },
      {
        "variant_id": "V303B",
        "type": "color",
        "value": "#E0F2F1",
        "name": "Blanco Puro",
        "stock": 30,
        "variant_price_adjust": 0.00
      }
    ]
  },
   {
    "id": 303,
    "name": "Set de Toallas de Algodón Pima",
    "sku_base": "TOW-PIM-010",
    "price": 65.00,
    "description": "Máxima suavidad y absorción garantizada por algodón Pima.",
    "category": "Baño",
    "image_url": "https://placehold.co/400x300/34d399/000000?text=Imagen+Base+Producto+3",
    
    "variants": [
      {
        "variant_id": "V303A",
        "type": "color",
        "value": "#DBEAFE",
        "name": "Azul Cielo",
        "stock": 25,
        "variant_price_adjust": 0.00
      },
      {
        "variant_id": "V303B",
        "type": "color",
        "value": "#E0F2F1",
        "name": "Blanco Puro",
        "stock": 30,
        "variant_price_adjust": 0.00
      }
    ]
  }
];
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { useState, useEffect, useMemo } from 'react';
import { FilterCategories } from './FilterCategories';
function App() {
  const [products, setProducts]=useState(productos)
  const [selectedFilter,setSelectedFilter] = useState('todo')
  const [displayProducts,setDisplayProducts] = useState(products)

  function handleSelectFilter(category){
    console.info(category)
    if(category.toLowerCase()===selectedFilter.toLowerCase()){return

    } else {
    setSelectedFilter(category)
  }
}
useEffect(()=>{
  function filterProducts(filter){
    if(filter.toLowerCase()==='todo'){ 
    
      setDisplayProducts(products)}
    else{
    const filteredProducts = products.filter(product=> product.category.toLowerCase() ===filter.toLowerCase())
  
   setDisplayProducts(filteredProducts)
  }
  }
  filterProducts(selectedFilter)

},[selectedFilter])

  return (
    <>
      <div>
      <nav className='flex justify-between px-18 my-4 bg-beige h-18 mt-0 items-center'>
      <h1 className='font-semibold text-xl color-slate-700'>Dalaz Shop</h1>
      <div className='flex gap-x-2 items-center pe-12'>
      <button className='btn btn-circle border-none bg-beige hover:bg-slate-700 hover:text-white'>
        <span><FontAwesomeIcon icon={faInstagram} size='lg'/></span>
      </button>
      <button className='btn btn-circle bg-beige border-none hover:bg-slate-700 hover:text-white'>
        <span><FontAwesomeIcon icon={faTiktok} size='lg'/></span>
      </button>
        
      </div>
      </nav>
      <div>
        <main className="flex flex-col justify-center mx-16 ">
        {/* FILTROS PARA MOSTRAR PRODUCTOS POR CATEGORIAS */}
          <FilterCategories filter={selectedFilter} onSelectFilter={handleSelectFilter}/>
          <div className=' flex justify-start gap-x-4 gap-y-6 max-w-7xl flex-wrap'>
            {displayProducts && displayProducts.map((product)=>{
              return(<ProductCard key={product.id} product={product}/>)
            })}
          </div>
        </main>
      </div>
      </div>
    </>
  )
}

const ProductCard = ({ product }) => {

  const hasVariants = product.variants && product.variants.length > 0;
  
  // Inicializa la variante seleccionada con la primera variante si existen
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants != undefined ? product.variants[0] : null
  );

  // Lógica para el botón de Añadir al Carrito
  const handleAddToCart = () => {
    const item = {
      productId: product.id,
      name: product.name,
      price: product.price,
      variant: selectedVariant?.name || 'Base',
      // Aquí se enviaría el SKU final (product.sku_base + selectedVariant.variant_id, etc.)
    };
    console.log("Producto añadido al carrito:", item);
    // Aquí iría la lógica real para añadir a un estado global o a una API
  };

  // Renderiza los selectores de color si existen variantes
  const renderVariantSelectors = () => {
    if (!hasVariants) return null;

   if(hasVariants) return (
      <div className="flex flex-col items-start mt-3">
        <span className="text-xs font-semibold text-gray-500 mb-1">
          Color: {selectedVariant.name}
        </span>
        <div className="flex space-x-2">
          {product.variants.map((variant) => (
            <button
              key={variant.variant_id} // Usamos variant_id del JSON
              className={`w-6 h-6 rounded-full border-2 transition duration-150 ease-in-out 
                ${selectedVariant.variant_id === variant.variant_id ? 'border-pink-500 ring-2 ring-pink-300' : 'border-gray-300 hover:pink-indigo-400'}
                ${variant.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}
              `}
              style={{ backgroundColor: variant.value }}
              onClick={() => setSelectedVariant(variant)}
              title={variant.name + (variant.stock === 0 ? ' (Agotado)' : '')}
              disabled={variant.stock === 0}
            >
              {variant.stock === 0 && (
                // Indicador visual de agotado (una línea cruzada)
                <span className="block w-full h-full rounded-full relative">
                  <span className="absolute inset-0 border-t-2 border-red-500 transform rotate-45"></span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="card w-70 bg-white shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 h-xs flex flex-col">
      
      {/* Imagen del Producto */}
      <figure className="relative h-60 overflow-hidden">
        {/* Si hay variante seleccionada con imagen, úsala. Si no, usa la imagen base. */}
        <img 
          src={(selectedVariant && selectedVariant.variant_image_url) || product.image_url} 
          alt={product.name + " - " + (selectedVariant?.name || "Base")} 
          className="w-full h-full object-cover transition duration-300 hover:scale-[1.03]" 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/374151/ffffff?text=Image+Missing"; }}
        />
        {/*isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <span className="badge badge-error text-white text-lg p-3">AGOTADO</span>
            </div>
        )*/}
      </figure>

      <div className="card-body p-5 grow flex flex-col">
        
        {/* Nombre y Precio */}
        <div className='flex justify-between gap-x-4'>
        <h2 className="card-title text-gray-800 text-xl mb-1">{product.name}</h2>
        <p className="text-3xl font-bold text-slate-700 mb-2">${product.price.toFixed(2)}</p>
        </div>
        
        {/* Descripción */}
        {
/*
        <p className="text-sm text-gray-500   h-4 overflow-hidden">{product.description}</p>
        */}
        
        {/* Selectores de Variantes (Renderizado Condicional) */}
        {renderVariantSelectors()}

        <div className="card-actions flex flex-nowrap  justify-center mt-2 pt-4 border-t border-gray-100 w-full">
          <button 
          className="btn btn-md font-semibold rounded-full transition duration-300 border-slate-700 border-2 text-slate-700"
            /*onClick={handleAddToCart}
            className={`btn btn-block font-semibold transition duration-300 ${isOutOfStock ? 'btn-disabled bg-gray-300 text-gray-500' : 'btn-primary hover:bg-indigo-700'}`}
            disabled={isOutOfStock}*/
          >
          Agregar al carrito
           {/* <ShoppingCart className="w-5 h-5" />
            {isOutOfStock ? 'Producto Agotado' : 'Añadir al Carrito'}*/}
          </button>
          <button className='btn btn-md font-semibold rounded-full transition duration-300 border-slate-700 border-2  text-slate-700'>Comprar</button>
        </div>
      </div>
    </div>
  );
};
export default App
