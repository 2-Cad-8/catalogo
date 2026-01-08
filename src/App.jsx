
import {productos} from './products' 

import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { useState, useEffect } from 'react';
import { FilterCategories } from './FilterCategories';
import { ProductCard } from './ProductCard';
function App() {
  const [products, setProducts]=useState(productos)
  const [selectedFilter,setSelectedFilter] = useState('todo')
  const [displayProducts,setDisplayProducts] = useState(products)

  const [eurorate,setEuroRate] = useState(1)
  const [isLoading,setIsLoading] = useState(true)
  const [errMsg, setErrMsg] = useState('')

    const localRate =handleGetLocalRate()
    const today = new Date().toISOString().split('T')[0];

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
      <a href='https://www.instagram.com/dalazshopve?igsh=dHFwaXprc3Z1OWNu' className='btn btn-circle border-none bg-beige hover:bg-slate-700 hover:text-white'>
        <span><FontAwesomeIcon icon={faInstagram} size='lg'/></span>
      </a>
      <a href='https://www.tiktok.com/@dalazshopve?_r=1&_t=ZM-92goKgChWQN' className='btn btn-circle bg-beige border-none hover:bg-slate-700 hover:text-white'>
        <span><FontAwesomeIcon icon={faTiktok} size='lg'/></span>
      </a>
        
      </div>
      </nav>
      <div>
        <main className="flex flex-col justify-center mx-16 ">
        {/* FILTROS PARA MOSTRAR PRODUCTOS POR CATEGORIAS */}
          <FilterCategories filter={selectedFilter} onSelectFilter={handleSelectFilter}/>
          <div className=' flex justify-start gap-x-4 gap-y-6 max-w-7xl flex-wrap'>
            {isLoading && <p>Cargando...</p>}
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
