import {Link} from 'react-router-dom'
import rentCategoryImage from '../house-images/rentCategoryImage.jpg'
import sellCategoryImage from '../house-images/sellCategoryImage.jpg'
function Home() {

    const style = {
        width: '700px',
        height: '250px',
        borderRadius: '20px',
        boxShadow: '5px 8px 10px rgba(0, 0, 0, 0.5)',
        objectFit: 'cover'
    }


    return (
        <div className="w-full flex flex-col items-center justify-center mt-20">
            {/* <div className="mb-10">Swiper</div> */}
            <div className="flex items-center justify-between w-full px-10">
                <div className=" flex flex-col items-left justify-center ">
                    <Link to='/housingtype/rent'><img src={rentCategoryImage} style={style}></img></Link>
                    <p className='text-2xl font-mono mt-5'>Places for Rent</p>
                </div>
                <div className=" flex flex-col items-left justify-center ">
                    <Link to='/housingtype/sell'><img src={sellCategoryImage} style={style}></img></Link>
                    <p className='text-2xl font-mono mt-5'>Places for selling</p>
                </div>
            </div>
        </div>
    )
}

export default Home