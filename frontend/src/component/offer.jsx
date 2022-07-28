import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {gethouses} from '../actions/houseaction'
import Carditem from './carditem'
import {useParams, useNavigate} from 'react-router-dom'

function Offer({auth, House: {houses}, gethouses}) {
    const {housetype} = useParams()
    const [houseOffer, setHouseOffer] = useState(null)

    useEffect(() => {
        gethouses()
        if(houses) {
            setHouseOffer(houses.filter(houseitem => houseitem.offer === true))
        }
    }, [housetype])

    return (
        <div className='w-full px-10 mx-auto flex flex-col my-6'>
            <h1 className='font-bold font-mono text-4xl mx-auto text-sky-600'>{housetype}</h1>
           <div className='w-full grid grid-cols-2 gap-y-6 gap-x-20 my-6'>
           {houseOffer && houseOffer.map(houseitem => <Carditem houseitem={houseitem}></Carditem>)}
           </div>
        </div>
    )
}

const mapStatetoProps = state => ({
    auth: state.auth,
    House: state.House
})

export default connect(mapStatetoProps, {gethouses})(Offer)

