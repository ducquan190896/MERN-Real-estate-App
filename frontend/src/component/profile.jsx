import {Link, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout, userReset} from '../actions/userAction'
import {AiFillHome} from 'react-icons/ai'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import sellCategoryImage from '../house-images/sellCategoryImage.jpg'
import {gethouseUser} from '../actions/houseaction'
import carditemProfile from './carditemProfile'
import {useState, useEffect} from 'react'
import CarditemProfile from './carditemProfile'

function Profile({auth: {user}, logout, userReset, gethouseUser, House: {houses, userhouses}}) {

    const style = {
        width: '300px',
        height: '250px',
       
        objectFit: 'cover'
    }


    const navigate = useNavigate()
    useEffect(() => {
        if(user) {
            gethouseUser(user.token)
        }
    }, [user])

    const onClick  = (e) => {
        logout()
        userReset()
        navigate('/')
        
    }

    return (
        <div className='w-full px-20'>
          {!user && (
             <div className="w-1/3 mx-auto flex items-center justify-center">
              <Link to='/Register' className='btn  w-60 h-10 text-center bg-sky-500 mr-10 mt-20 border-none active:bg-sky-700 hover:bg-sky-700'>Register</Link>
            <Link to='/signin' className='btn w-60 h-10 bg-sky-500 mr-10 mt-20 border-none active:bg-sky-700 hover:bg-sky-700 text-center'>Sign In</Link>
             </div>
          )}
         {user && (
            <div className='w-full flex justify-between'>
                <div className=' relative w-1/3 flex flex-col items-left justify-center'>
                    <h1 className='text-2xl font-bold text-sky-700 font-mono'>My Profile</h1>
                    <button onClick={onClick} className='btn absolute top-20 left-72  w-28 h-10 text-center bg-sky-500  rounded-full border-none active:bg-sky-700 hover:bg-sky-700'>Logout</button>
                    <p className='mt-8 mb-4 text-lg font-mono'>personal details</p>
                    <div className='py-6 px-8 bg-white shadow-2xl rounded-lg mb-6'>
                        <h1 className='font-bold text-lg w-full bg-gray-300 my-6'>{user.name}</h1>
                        <h1 className='font-bold text-lg w-full bg-gray-300 my-6'>{user.email}</h1>
                    </div>
                    <div className='py-6 px-4 bg-white shadow-2xl rounded-lg flex items-center justify-between w-full'>
                        <Link to='/'>
                            <AiFillHome className='w-10 h-10 text-sky-700'></AiFillHome>
                        </Link>
                        <p className='font-bold font-mono text-lg'>Sell or Rent your home</p>
                       <Link to='/createlisting'> 
                            <BsFillArrowRightCircleFill className='text-sky-700 w-6 h-6'></BsFillArrowRightCircleFill>
                       </Link>
                    </div>
                    
                </div>
                <div className='flex flex-col items-left justify-start w-1/2'>
                    <h1 className='mx-auto text-2xl text-sky-600 font-bold font-mono my-6'>your Listing</h1>
                    {/* <div className='card card-side w-4/5 mx-auto  shadow-xl bg-base-200'>
                        <figure><img src={sellCategoryImage} alt="" style={style}/></figure>
                        <div className='card-body'>
                            <h1 className='card-title'>New movie</h1>
                        </div>
                    </div> */}
                    {userhouses && userhouses.length > 0 && userhouses.map(houseitem => <CarditemProfile houseitem={houseitem}></CarditemProfile>)}
                    
                </div>
              

            </div>
         )}
   

        </div>
    )
}

const mapStatetoProps = state => ({
    auth: state.auth,
    House: state.House
})

export default connect(mapStatetoProps, {userReset, logout, gethouseUser})(Profile)