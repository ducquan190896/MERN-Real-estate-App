import {Link} from 'react-router-dom'
import {MdLocalOffer, MdOutlineExplore} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
import {BsFillHouseFill} from 'react-icons/bs'

function Navbar() {
    
    return (
        <div className="w-full fixex h-20 flex flex-row items-center justify-between  px-10 bg-white drop-shadow-xl ">
            <Link to='/' className="text-3xl font-mono font-bold flex flex-inline items-center justify-center text-sky-700"><BsFillHouseFill className='w-10 h-10 mr-4'/>Finding house</Link>
            <div className="flex justify-between w-1/4 items-center">
                <Link to='/explore' className=' text-xl font-bold font-mono text-sky-700 flex-col flex justify-center items-center active:text-sky-300 hover:text-sky-300'><MdOutlineExplore className='w-8 h-8'/>Explore</Link>
                <Link to='/offer' className=' text-xl font-bold font-mono text-sky-700 flex-col flex justify-center items-center active:text-sky-300 hover:text-sky-300'><MdLocalOffer className='w-8 h-8'/>Offers</Link>
                <Link to='/profile' className=' text-xl font-bold font-mono text-sky-700 flex-col flex justify-center items-center active:text-sky-300 hover:text-sky-300'><FaUser className='w-8 h-8'/>Profile</Link>
            </div>
        </div>
    )
}

export default Navbar