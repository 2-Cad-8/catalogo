export default function MobileFilter({filter,onSelectFilter}){
    return(
        <div className="p-4  max-w-sm">

        <select className="select  rounded-xl dark:bg-white" defaultValue={filter} onChange={(e)=> onSelectFilter(e.target.value)}>
            <option 
            value="Todo" 
            
            >Todo</option>
            <option 
            value="Carteras y Bolsos" 
            
            >Carteras y Bolsos</option>
            <option 
            value="Monederos" 
           
            >Monederos</option>
               <option 
            value="Billeteras" 
            
            >Billeteras</option>
               <option 
            value="Lentes de Sol" 
        
            >Lentes de Sol</option>
            <option 
            value="Accesorios para Caballeros" 
          
            >Accesorios para Caballeros</option>
            <option 
            value="Papeleria" 
            
            >Papeleria</option>
            <option 
            value="Accesorios para Termos" 
      
            >Accesorios para Termos</option>
            <option 
            value="Skincare" 
         
            >Skincare</option>
            <option 
            value="Haircare" 

            >Haircare</option>
            <option 
            value="Accesorios para Dama" 
        
            >Accesorios para Dama</option>
        </select>
        </div>
    )
}