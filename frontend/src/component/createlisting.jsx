import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import {createhouse} from '../actions/houseaction'
import { toast } from 'react-toastify'
import {updatehouse, resetEdit} from '../actions/houseaction'
import { useNavigate } from 'react-router-dom'

function Createlisting({createhouse, House, auth, updatehouse, resetEdit}) {
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        type: 'sell',
        offer: false,
        location: '',
        city: '',
        parking: false,
        regularprice: 0,
        discountedprice: 0,
        country: '',
        propertyname: '',
        furnished: true,
        bathroom: 1,
        bedroom: 1,
        imagefiles: []
    })
    const {type, offer, location, city, parking, regularprice, discountedprice, country, propertyname, furnished, bathroom, bedroom, imagefiles} = formdata

    useEffect(() => {
        if(House.edit) {
            setFormdata({
                type: House.edithouse.type,
                offer: House.edithouse.offer,
                location: House.edithouse.location,
                city: House.edithouse.city,
                parking: House.edithouse.parking,
                regularprice: House.edithouse.regularprice,
                discountedprice: House.edithouse.discountedprice ? House.edithouse.discountedprice : 0,
                country: House.edithouse.country,
                propertyname: House.edithouse.propertyname,
                furnished: House.edithouse.furnished,
                bathroom: House.edithouse.bathroom,
                bedroom: House.edithouse.bedroom,
                imagefiles: House.edithouse.image
            })
            console.log(formdata, 'hello')
        } 
    }, [House.edithouse])

    const onMute = (e) => {
        
        
        if(e.target.files) {
            console.log(e.target.files)
            setFormdata(prev => ({...prev, imagefiles: [...e.target.files]}))
            
            
        } else if(e.target.value ==='true' || e.target.value === 'false') {

            let booleantype
            if(e.target.value === 'true') {
            booleantype = true
            } else if (e.target.value === 'false') {
            booleantype = false
            }
            setFormdata(prev => ({...prev, [e.target.name]: booleantype}))

        } else {
           
            console.log(e.target.value)
            setFormdata(prev => ({...prev, [e.target.name]: e.target.value}))
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
       
        if(House.edit) {
            if(auth.user && House.edithouse) {
                updatehouse(auth.user.token, House.edithouse._id, formdata )
            }
            setFormdata({
                type: 'sell',
                offer: true,
                location: '',
                city: '',
                parking: false,
                regularprice: 0,
                discountedprice: '',
                country: '',
                propertyname: 0,
                furnished: true,
                bathroom: 1,
                bedroom: 1,
                imagefiles: []
            })
            toast.success('Update house listing successfully')
            resetEdit()
            navigate('/profile')
            
        }
        else {
            if(auth.user) {
                createhouse(auth.user.token, formdata)
            }
            setFormdata({
                type: 'sell',
                offer: true,
                location: '',
                city: '',
                parking: false,
                regularprice: 0,
                discountedprice: 0,
                country: '',
                propertyname: 0,
                furnished: true,
                bathroom: 1,
                bedroom: 1,
                imagefiles: []
            })
            toast.success('creating house listing successfully')
            navigate('/profile')
        }

       
    }


    return (
       <div className='w-2/3 flex flex-col items-center justify-start mx-auto my-6'>
            <h1 className='text-3xl font-bold font-mono my-4 text-sky-700'>{House.edit ? 'Update your listing' : 'Create you listing'}</h1>
            <form action="" className='w-1/2 mx-auto' onSubmit={onSubmit}>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>Sell/Rent</label>
                   <div>
                   <button  onClick={onMute} type='button' value='rent' name='type' className={type === 'rent' ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>Rent</button>
                    <button onClick={onMute} type='button' value='sell' name='type' className={type === 'sell' ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>Sell</button>
                   </div>
                    
                </div>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>Property Name</label>
                    <input onChange={onMute} type="text" value={propertyname} name='propertyname' className='w-2/3 h-12 rounded-full focus:outline-none text-lg pl-6' />         
                </div>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>Address</label>
                    <input onChange={onMute} type="text" value={location} name='location' className='w-2/3 h-12 rounded-full focus:outline-none text-lg pl-6' />         
                </div>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>City</label>
                    <input onChange={onMute} type="text" value={city} name='city' className='w-2/3 h-12 rounded-full focus:outline-none text-lg pl-6' />         
                </div>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>Country</label>
                    <input  onChange={onMute} type="text" value={country} name='country' className='w-2/3 h-12 rounded-full focus:outline-none text-lg pl-6' />         
                </div>
                <div className='flex  items-center justify-between w-1/2 mx-auto  my-8'>
                    <div className='flex flex-col items-center justify-center mr-10'>
                        <label className='text-lg font-bold font-mono mb-4'>Bedrooms</label>
                        <input onChange={onMute} value={bedroom} type="number" name='bedroom' min='1' max='10' className='w-20 h-12 text-center rounded-lg focus:outline-none text-2xl '/>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-lg font-bold font-mono mb-4'>Bathrooms</label>
                        <input onChange={onMute} value={bathroom} type="number" name='bathroom' min='1' max='10' className='w-20 h-12 text-center rounded-lg focus:outline-none text-2xl '/>
                    </div>
                </div>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>Parking</label>
                    
                    <div>
                    <button onClick={onMute} type='button' value={true} name='parking' className={parking === true ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>Yes</button>
                    <button  onClick={onMute} type='button' value={false} name='parking' className={parking === false ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>No</button>
                    </div>
                    
                    
                </div>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>Furnished</label>
                   <div>
                   <button onClick={onMute} type='button' value={true} name='furnished' className={furnished === true ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>Yes</button>
                    <button onClick={onMute} type='button' value={false} name='furnished' className={furnished === false ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>No</button>
                   </div>
                    
                </div>
                <div className='flex  items-center justify-between w-full my-4'>
                    <label className='text-lg font-bold mr-12 font-mono'>Offer</label>
                   <div>
                   <button onClick={onMute} type='button' value={true} name='offer' className={offer === true ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>Yes</button>
                    <button onClick={onMute} type='button' value={false} name='offer' className={offer === false ? 'btn bg-green-400  active:bg-green-700 mr-6 border-none w-32' : 'btn bg-white active:bg-green-700 border-none mr-6 border-none w-32 text-zinc-700'}>No</button>
                   </div>
                    
                </div>
                <div className='flex  items-center justify-between w-full my-6'>
                        <label className='text-lg font-bold font-mono mb-4'>Regular Price</label>
                       <div className=' w-2/3 flex inline-flex items-center justify-center'>
                        <input onChange={onMute} value={regularprice} type="number" name='regularprice' min='0' className='w-28 h-12 text-center rounded-lg focus:outline-none text-2xl mr-6 '/>
                        <p className='text-lg font-bold font-mono text-center'>{type === 'rent' ? '$/Month' : '$'}</p>

                       </div>
                </div>
                {offer && (
                    <div className='flex  items-center justify-between w-full my-6'>
                    <label className='text-lg font-bold font-mono mb-4'>Discounted Price</label>
                   <div className='flex w-2/3 inline-flex items-center justify-center'>
                    <input onChange={onMute} value={discountedprice} type="number" name='discountedprice' min='0' className='w-28 h-12 text-center rounded-lg focus:outline-none text-2xl mr-6 '/>
                    <p className='text-lg font-bold font-mono text-center'>{type === 'rent' ? '$/Month' : '$'}</p>

                   </div>
            </div>
                )}

                <div className='flex  items-center justify-left  w-full my-6'>
                        <label className='text-lg font-bold font-mono mb-4 mr-6'>Images</label>
                       <input onChange={onMute} type="file" name='imagefiles' className='formInputFile' accept='.jpg,.png,.jpeg' multiple required max='5'/>
                </div>
                <button type='submit'  onSubmit={onSubmit} className='btn bg-green-400 border-none hover:bg-green-800 w-full h-10 text-center my-8'>{House.edit ? 'Update' : 'Create'}</button>
            </form>
       </div>
    )
}

const mapStatetoProps = state => ({
    auth: state.auth,
    House: state.House
})

export default connect(mapStatetoProps, {createhouse, updatehouse,  resetEdit})(Createlisting)