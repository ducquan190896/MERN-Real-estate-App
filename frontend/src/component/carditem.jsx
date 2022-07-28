import {AiFillCar} from 'react-icons/ai'
import {GiBed} from 'react-icons/gi'
import {FaShower} from 'react-icons/fa'
import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import { getsinglehouse } from '../actions/houseaction'

function Carditem({houseitem, getsinglehouse}) {
    const {type, propertyname, discountedprice, regularprice, location, city, country, bedroom, bathroom, image, furnished, offer, parking, _id, user} = houseitem
    const navigate = useNavigate()

    const onClick = (e) => {
        console.log('housing')
        getsinglehouse(_id)
        navigate(`/singlehouse/${_id}`)
    }


    return (
        <div onClick={onClick} className='card card-side bg-white shadow-xl relative cursor-pointer'>
                <figure><img src={`http://localhost:5000/${image[0]}`} alt="" style={{width: '300px', height: '100%', borderRadius: '10px'}} /></figure>
                <div className='card-body'>
                    <h1 className='font-bold font-mono text-2xl'>{propertyname}</h1>
                    <p className='text-lg font-mono font-bold text-gray-400'>{location} {city} {country}</p>
                    <div className="badge bg-green-400 border-none absolute top-5 right-2 text-white font-bold text-lg py-4 px-6">{type}</div>
                    <p className="text-xl text-green-400 font-bold my-2">£ {regularprice} <small>{type === 'rent' ? '/ Month': null }</small></p>
                    <div className="flex inline-flex items-center justify-center">
                        
                        <AiFillCar className='mr-4 w-8 h-8 text-gray-400'></AiFillCar>
                        <p className=' mr-4 text-lg font-bold text-gray-400'>{bedroom} {bedroom > 1 ? 'Bedrooms': 'Bedroom'}</p>
                        <p  className=' mr-4 text-lg font-bold text-gray-400'>{bathroom} {bathroom > 1 ? 'Bathrooms': 'Bathroom'}</p>
                    
                    </div>
                    {offer && <h2 className='text-green-400 text-lg my-2 font-bold font-mono'><small className='text-lg font-mono text-gray-400 font-bold'>Discounted offer:</small> £{discountedprice} {type === 'rent' ? '/ Month' : null} </h2>}
                </div>
            </div>
    ) 
}

const mapStatetoProps = state => ({
    auth: state.auth,
    House: state.House
})

export default connect(mapStatetoProps, {getsinglehouse})(Carditem)