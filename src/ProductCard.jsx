import { useState } from 'react';


export const ProductCard = ({ product, rate }) => {

  const hasVariants = product.variants && product.variants.length > 0;
  const handleBuyOnWhatsApp = (product) => {
    const msg = `Hola! vengo del catalogo, estoy interesada en el ${product}`;
    return encodeURIComponent(msg);
  };
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

    if (hasVariants) return (
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
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/374151/ffffff?text=Image+Missing"; }} />
        {product.units === 0 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="badge badge-error text-white text-lg font-semibold p-3.5">Agotado</span>
                </div>
            )}

      </figure>

      <div className="card-body p-5 grow flex flex-col">

        {/* Nombre y Precio */}
        <div className='flex justify-between gap-x-4'>

          <p className="text-3xl font-bold text-slate-700 mb-2">{(product.price * rate).toFixed(2)}bs</p>
        </div>
        <h2 className="card-title text-gray-800 text-xl mb-1">{product.name}</h2>
        {/* Descripción */}


        <p className="text-sm text-gray-500   h-4 overflow-hidden">Para mas informacion haz clic en comprar</p>


        {/* Selectores de Variantes (Renderizado Condicional) */}
        {renderVariantSelectors()}

        <div className="card-actions flex flex-nowrap  justify-center mt-2 pt-4 border-t border-gray-100 w-full">
          {/*<button
            className="btn btn-md font-semibold rounded-full transition duration-300 border-slate-700 border-2 text-slate-700"
              /*onClick={handleAddToCart}
              className={`btn btn-block font-semibold transition duration-300 ${isOutOfStock ? 'btn-disabled bg-gray-300 text-gray-500' : 'btn-primary hover:bg-indigo-700'}`}
              disabled={isOutOfStock}
            >
            Agregar al carrito */}
          {/* <ShoppingCart className="w-5 h-5" />
             {isOutOfStock ? 'Producto Agotado' : 'Añadir al Carrito'}
           </button>*/}
          {/* <button
            className='btn btn-md font-semibold rounded-full transition duration-300 border-slate-700 border-2  text-slate-700'>*/}
          <a className='btn btn-md w-full text-lg font-semibold rounded-full transition duration-300 border-slate-700 border-2  text-slate-700' href={`https://api.whatsapp.com/send/?phone=%2B584245103321&text=${handleBuyOnWhatsApp(product.name)}`}>
            Comprar
          </a>
          {
            /*
            </button>
             */
          }
        </div>
      </div>
    </div>
  );
};
