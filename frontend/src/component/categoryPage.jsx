import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {gethouses} from '../actions/houseaction'
import Carditem from './carditem'
import {useParams, useNavigate} from 'react-router-dom'

function CategoryPage({auth, House: {houses}, gethouses}) {
    const {housetype} = useParams()
    const [houseCategory, setHouseCategory] = useState(null)

    useEffect(() => {
        gethouses()
        if(houses) {
            setHouseCategory(houses.filter(houseitem => houseitem.type === housetype))
        }
    }, [housetype])

    return (
        <div className='w-full px-10 mx-auto flex flex-col my-6'>
            <h1 className='font-bold font-mono text-4xl mx-auto text-sky-600'>{housetype === 'rent' ? 'Rent' : 'Sale'}</h1>
           <div className='w-full grid grid-cols-2 gap-y-6 gap-x-20 my-6'>
           {houseCategory && houseCategory.map(houseitem => <Carditem houseitem={houseitem}></Carditem>)}
           </div>
        </div>
    )
}

const mapStatetoProps = state => ({
    auth: state.auth,
    House: state.House
})

export default connect(mapStatetoProps, {gethouses})(CategoryPage)

