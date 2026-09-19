import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar(){
    return(
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
    )
}