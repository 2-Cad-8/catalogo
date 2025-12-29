
import {productos} from './products' 

import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { useState, useEffect, useMemo } from 'react';
import { FilterCategories } from './FilterCategories';
function App() {
  const [products, setProducts]=useState(productos)
  const [selectedFilter,setSelectedFilter] = useState('todo')
  const [displayProducts,setDisplayProducts] = useState(products)

  const [eurorate,setEuroRate] = useState(1)
  const [isLoading,setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState('')


  function handleSelectFilter(category){
    console.info(category)
    if(category.toLowerCase()===selectedFilter.toLowerCase()){return

    } else {
    setSelectedFilter(category)
  }
}

useEffect(()=>{

     async function  getEuroRate(){
      try{
        const res =  await fetch('https://backendsalessys.onrender.com/api/v1/euro/')
        const data = await res.json()
        setEuroRate(data.rate)
        console.info(data)
        setIsLoading(false)
      }catch(err){
        setErrMsg(err)
      }finally{
        setIsLoading(false)
        setErrMsg("")
      }
    }
    getEuroRate()
  },[])

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
            {isLoading && <p>Cargando...</p>}
            {!isLoading && !errMsg && displayProducts && displayProducts.map((product)=>{
              return(<ProductCard key={product.id} product={product} rate={eurorate}/>)
            })}
            {errMsg && <p>Error: {errMsg}</p>}
          </div>
        </main>
      </div>
      </div>
    </>
  )
}

const ProductCard = ({ product, rate }) => {
  
  const hasVariants = product.variants && product.variants.length > 0;
  const handleBuyOnWhatsApp= (product)=>{
    const msg = `Hola! vengo del catalogo, estoy interesada en el ${product}`
    return encodeURIComponent(msg)
  }
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
  }

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
       
        <p className="text-3xl font-bold text-slate-700 mb-2">{(product.price*rate).toFixed(2)}bs</p>
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
export default App
