
import {productos} from './products' 

import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { useState, useEffect } from 'react';
import { FilterCategories } from './FilterCategories';
import { ProductCard } from './ProductCard';
import MobileFilter from './MobileFilter';
 import ReactGA from "react-ga4";

{/*GA STUFF*/}
const GA_MEASUREMENT_ID = "G-QZHMMMJ5R4";
ReactGA.initialize(GA_MEASUREMENT_ID);


{/*GA STUFF*/}



function App() {
  const [products, setProducts]=useState(productos)
  const [selectedFilter,setSelectedFilter] = useState('todo')
  const [displayProducts,setDisplayProducts] = useState(products)

  const [eurorate,setEuroRate] = useState(1)
  const [isLoading,setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState('')

    const localRate =handleGetLocalRate()
    const today = new Date().toISOString().split('T')[0];

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
    console.info(category)
    if(category.toLowerCase()===selectedFilter.toLowerCase()){return

    } else {
    setSelectedFilter(category)
  }
}

  function handleSetLocalRate(rate){
    const rateData = {'rate':rate, "date":new Date().toISOString().split('T')[0]}
    window.localStorage.setItem('rate',JSON.stringify(rateData))

  }

   function handleGetLocalRate(){
    const rateData = JSON.parse(window.localStorage.getItem('rate'))
    return rateData
  }

useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

     async function  getEuroRate(){
      try{
        const res =  await fetch('https://backendsalessys.onrender.com/api/v1/euro/')
        const data = await res.json()
        setEuroRate(data.rate)
        console.info(data)
        handleSetLocalRate(data.rate)
        setIsLoading(false)
      }catch(err){
        setErrMsg(err)
      }finally{
        setIsLoading(false)
        setErrMsg("")
      }
    }
    setIsLoading(false);
  /*
    if(localRate !=null){

      if(localRate.date != today){
        getEuroRate()
      }else{
        console.info('using local rate')
        setEuroRate(localRate.rate)
        setIsLoading(false)
      }
    }else{
        getEuroRate()
      }*/
  },[])

useEffect(()=>{
  function filterProducts(filter){
    if(filter.toLowerCase()==='todo'){ 
    
      setDisplayProducts(products)}
      const numResultados = filter(p => p.cat === nuevaCategoria).length;
      trackFilterSelection(nuevaCategoria, numResultados);
    else{
    const filteredProducts = products.filter(product=> product.category.toLowerCase() ===filter.toLowerCase())
  
   setDisplayProducts(filteredProducts)
  }
  }
  filterProducts(selectedFilter)
  trackFilterSelection(selectedFilter, filtered.length);

},[selectedFilter])

  return (
    <>
      <div>
      <nav className='flex justify-between px-12 xl:px-18 my-4 bg-beige h-18 mt-0 items-center'>
      <h1 className='font-semibold text-xl text-slate-700  dark:text-slate-700'>Dalaz Shop</h1>
      <div className='flex gap-x-2 items-center pe-12'>
      <a href='https://www.instagram.com/dalazshopve?igsh=dHFwaXprc3Z1OWNu' className='btn btn-circle border-none dark:text-slate-700 bg-beige hover:bg-slate-700 hover:text-white'>
        <span><FontAwesomeIcon icon={faInstagram} size='lg'/></span>
      </a>
      <a href='https://www.tiktok.com/@dalazshopve?_r=1&_t=ZM-92goKgChWQN' className='btn btn-circle dark:text-slate-700 bg-beige border-none hover:bg-slate-700 hover:text-white'>
        <span><FontAwesomeIcon icon={faTiktok} size='lg'/></span>
      </a>
        
      </div>
      </nav>
      <div className='dark:bg-white'>
        <main className="flex flex-col justify-center mx-8 xl:mx-16  ">
        {/* FILTROS PARA MOSTRAR PRODUCTOS POR CATEGORIAS */}
        <div className='xl:flex xl:justify-start xl:me-12'>

        <MobileFilter filter={selectedFilter} onSelectFilter={handleSelectFilter}/>
        </div>
        {/*  <FilterCategories filter={selectedFilter} onSelectFilter={handleSelectFilter}/>*/}
          {/*Productos o CONTENIDO PRINCIPAL */}
          <div className=' flex justify-center xl:justify-start gap-x-2 gap-y-6 max-w-7xl flex-wrap'>
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
