import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {gethouses} from '../actions/houseaction'
import Carditem from './carditem'

function Explore({auth, House: {houses}, gethouses}) {

    useEffect(() => {
        gethouses()
    }, [])

    return (
        <div className='w-full px-10 mx-auto flex flex-col '>
            <h1 className='font-bold font-mono text-4xl mx-auto text-sky-600'>Explore</h1>
           <div className='w-full grid grid-cols-2 gap-y-6 gap-x-20 my-6'>
           {houses && houses.map(houseitem => <Carditem houseitem={houseitem}></Carditem>)}
           </div>
        </div>
    )
}

const mapStatetoProps = state => ({
    auth: state.auth,
    House: state.House
})

export default connect(mapStatetoProps, {gethouses})(Explore)

