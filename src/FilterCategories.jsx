export function FilterCategories({filter,onSelectFilter}) {
  return (
    <div className='my-4 flex gap-x-2 flex-wrap gap-y-2'>
    <BtnFilter name='Todo' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Carteras y Bolsos' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Monederos' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Billeteras' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Lentes de Sol' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Accesorios para Caballeros' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Papeleria' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Accesorios para Termos' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Skincare' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Haircare' onSelect={onSelectFilter} filter={filter}/>
    <BtnFilter name='Accesorios para Dama' onSelect={onSelectFilter} filter={filter}/>
    </div>
  );
}

const BtnFilter = ({name,onSelect,filter})=>{
  return(
    <button value={name}
      className= {`dark:bg-white btn border-2 rounded-full border-slate-700 font-regular text-sm ${filter.toLowerCase() === name.toLowerCase() ? 'text-white bg-slate-700':'text-slate-700'}`}
      onClick={(e)=>onSelect(e.target.value)}>{name}</button>
  )
}
