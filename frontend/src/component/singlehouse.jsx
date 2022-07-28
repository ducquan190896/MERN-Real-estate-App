import {useState, useEffect} from 'react' 
import {useParams, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {getsinglehouse, gethouseUser, deletehouse, choosehouseUpdate} from '../actions/houseaction'
import {AiFillCar} from 'react-icons/ai'
import {GiBed} from 'react-icons/gi'
import {FaShower} from 'react-icons/fa'
import {TbSofa} from 'react-icons/tb'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { toast } from 'react-toastify'

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])


function Singlehouse({House: {house}, getsinglehouse, auth: {user}, gethouseUser, deletehouse, choosehouseUpdate}) {
    const {houseid} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(houseid) {
            getsinglehouse(houseid)
           
        }
    }, [houseid])
    
   
    if(house ) {
        const {type, propertyname, discountedprice, regularprice, location, city, country, bedroom, bathroom, image, furnished, offer, parking, latitude, longtitude, _id} = house
        const position = [latitude, longtitude]

       const  deletebutton = (e) => {
       
        if(user && _id) {
            deletehouse(user.token, _id)
            navigate('/profile')
            console.log('delete')
            toast.success('deleted your listing successfully')
        }else {
            console.log('not authorized to delete')
            toast.error('not authorized to delete')
        }
       } 
       const updatebutton = (e) => {
        if(user && _id) {
            choosehouseUpdate(house)
            navigate('/createlisting')
            console.log('update')
            toast.success('let update your listing')
        }else {
            console.log('not authorized to update')
            toast.error('not authorized to update')
        }
       }

        return (
            <div className='w-full flex flex-col  justify-start'>
                <div className='w-full mb-6'>
                    <Swiper spaceBetween={50} slidesPerView={1} pagination={{clickable: true}}>
                    {image && image.map(imageitem => <SwiperSlide><img src={`http://localhost:5000/${imageitem}`} alt="" className='w-full h-96 object-center' /></SwiperSlide>)}

                    </Swiper>
                </div>
                <div className=' relative w-full flex flex-col items-left justify-start px-32'>
                    <h1 className='text-3xl font-bold text-gray-700 font-mono my-4'>{propertyname}</h1>
                    <p className='text-xl text-zinc-600 font-bold font-mono my-2'>{location} {city}, {country}</p>
                    {/* <p className='text-xl text-zinc-600 font-bold font-mono my-2'>Landlord's Email: {user.email}</p> */}
                    <div className='absolute top-5 right-1/2 badge py-4 font-bold font-mono px-4 text-lg text-white bg-green-500 border-none'>For {type === 'rent'? 'rent' : 'sale'}</div>
                    <div className='flex items-left my-4'>
                        
                        <div className='mr-6 badge py-4 font-bold font-mono px-4 text-lg text-white bg-sky-600 border-none'>${regularprice} {type === 'rent' ? '/Month': null}</div>
                        {offer && (
                            <div className='mr-6 badge py-4 font-bold font-mono px-4 text-lg text-white bg-orange-600 border-none'>${discountedprice} {type === 'rent' ? '/Month': null} discount</div>
                        )}
                        
                    </div>
                    <div className='w-full flex items-left my-4'>
                        {parking && (
                            <div className='flex flex-col items-center justify-center mr-8'>
                            <AiFillCar className='w-12 h-12 text-zinc-600'></AiFillCar>
                            <p className='text-zinc-600 font-bold text-lg font-mono mt-4'>Parking</p>
                            </div>
                        )}
                        <div className='flex flex-col items-center justify-center mr-8'>
                            <GiBed className='w-12 h-12 text-zinc-600'></GiBed>
                            <p className='text-zinc-600 font-bold text-lg font-mono mt-4'>{bedroom} {bedroom > 1 ? 'Bedrooms' : 'Bedroom'}</p>
                        </div>
                        <div className='flex flex-col items-center justify-center mr-8'>
                            <FaShower className='w-12 h-12 text-zinc-600'></FaShower>
                            <p className='text-zinc-600 font-bold text-lg font-mono mt-4'>{bathroom} {bathroom > 1 ? 'Bathrooms' : 'Bathroom'}</p>
                        </div>
                        {   furnished && (
                             <div className='flex flex-col items-center justify-center mr-8'>
                             <TbSofa className='w-12 h-12 text-zinc-600'></TbSofa>
                             <p className='text-zinc-600 font-bold text-lg font-mono mt-4'>Furnished</p>
                         </div>
                        )}
                    </div>
                    <h1 className='text-xl font-bold text-gray-700 font-mono my-4'>Location</h1>
                   
                    
                    <div className='w-full h-96 my-10 rounded-lg'>
                    <MapContainer
                            style={{ height: '100%', width: '100%' }}
                             center={[latitude, longtitude]}
                            zoom={13}
                            scrollWheelZoom={false}
                            >
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                        />

                        <Marker
                        position={[latitude, longtitude]}
                        >
                        <Popup>{location} {city} {country}</Popup>
                        </Marker>
                    </MapContainer>
                   
                    </div>
                     {user && (
                     <div className='flex flex-col items-left justify-center absolute  top-20 right-40'>
                            <button onClick={updatebutton} className='mb-6 btn bg-sky-700 border-none hover:bg-sky-400'>Edit your listing</button>
                            <button onClick={deletebutton} className='btn bg-red-700 border-none hover:bg-red-400'>Delete your listing</button>
                        </div>
                     )}  
                </div>
    
            </div>
        ) 

    } else {
        return <h1>Loading....</h1>
    }
   

   
}


const mapStatetoProps = state => ({
    auth: state.auth,
    House: state.House
})
export default connect(mapStatetoProps, {getsinglehouse, gethouseUser, deletehouse,choosehouseUpdate})(Singlehouse)

