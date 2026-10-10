
import {productos} from './products' 

import  { useState, useEffect } from 'react';
import { FilterCategories } from './FilterCategories';
import { ProductCard } from './ProductCard';
import MobileFilter from './MobileFilter';
 import ReactGA from "react-ga4";
import NavBar from './components/navbar';
import { useParams, useSearchParams } from 'react-router-dom';
import Filter from './components/filter';

{/*GA STUFF*/}
const GA_MEASUREMENT_ID = "G-QZHMMMJ5R4";
ReactGA.initialize(GA_MEASUREMENT_ID);


{/*GA STUFF*/}



function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = useParams('category');
  console.log(categoryParam.category)

  const [products, setProducts]=useState(productos)
  const [selectedFilter,setSelectedFilter] = useState(categoryParam.category ||'todo')
  const [displayProducts,setDisplayProducts] = useState(products)

  const [eurorate,setEuroRate] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  

    {/*STUFF GOOGLE ANALYTICS START*/}
   
    const trackFilterSelection = (categoria, resultados) => {
    console.log(`Enviando a GA: Filtro: ${categoria}, Resultados: ${resultados}`);
    ReactGA.event({
      category: "Filtros",
      action: "Selección de Categoría",
      label: categoria,
      value: resultados,
    });
  };
{/*STUFF GOOGLE ANALYTICS END*/}

  function handleSelectFilter(category){
    
    if(category.toLowerCase()===selectedFilter.toLowerCase()){return

    } else {
    setSelectedFilter(category)
  }
}


useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

 
  },[])

useEffect(()=>{
  function filterProducts(filter){
    let filteredProducts;
    if(filter.toLowerCase()==='todo'){ 
      setDisplayProducts(products)}
    else{
      filteredProducts = products.filter(product=> product.category.toLowerCase() ===filter.toLowerCase())
    
       setDisplayProducts(filteredProducts)
       trackFilterSelection(selectedFilter, filteredProducts.length);
    }
    }
  filterProducts(selectedFilter)

},[selectedFilter])

  return (
    <>
    {console.log(categoryParam)}
      <div>
      <NavBar />
      <div className='dark:bg-white'>
        <main className="flex flex-col justify-center mx-8 xl:mx-16  ">
        {/* FILTROS PARA MOSTRAR PRODUCTOS POR CATEGORIAS */}
        <div className='max-w-6xl xl:flex xl:justify-start xl:ms-4'>
          <Filter filter={selectedFilter} onSelectFilter={handleSelectFilter}/>
        {/*<MobileFilter filter={selectedFilter} onSelectFilter={handleSelectFilter}/>*/}
        </div>
          {/*Productos o CONTENIDO PRINCIPAL */}
          <div className=' flex justify-between 2xl:justify-start 2xl:px-8 gap-x-1 gap-y-6 2xl:gap-x-8 w-full lg:max-w-8xl flex-wrap'>
          {isLoading && <span className="loading loading-spinner loading-xl text-pink-300"></span>}
            {!isLoading && !errMsg && displayProducts && displayProducts.map((product)=>{
              return(<ProductCard key={product.id} product={product} rate={eurorate&&1}/>)
            })}
            {errMsg && <p>Error: {errMsg}</p>}
          </div>
        </main>
      </div>
      </div>
    </>
  )
}



export default App
