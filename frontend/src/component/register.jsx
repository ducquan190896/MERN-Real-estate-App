import {AiOutlineMail} from 'react-icons/ai'
import {FaUserTag} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {register, userError, userReset} from '../actions/userAction'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function Register({auth: {user}, register, userError, userReset}) {
    const [formdata, setFormdata] = useState({
        email: '',
        name: '',
        password: '',
        password2: ''

    })
    const navigate = useNavigate()

    useEffect(() => {
        if(user) {
            userReset()
           
        } 
    }, [user])

    const {email, name, password, password2} = formdata
    const onChange = (e) => {
        setFormdata(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(formdata)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        
        if(!name || !email || !password || !password2) {  
            userError()
            toast.error('please fill all information required')
        } else if( password !== password2) {
            userError()
            toast.error('your passwords do not match')
        } else {
            console.log(formdata)
            register(formdata)
            toast.success('your registered your account successfully')
            setFormdata({
                email: '',
                name: '',
                password: '',
                password2: ''
            })
            navigate('/')
        }


    }

    return (
        <div className="w-full flex flex-col items-center justify-center px-20">
            <h1 className="mx-auto text-3xl font-bold font-mono text-sky-700 mb-6">Create your account</h1>
            <form className="flex flex-col items-center justify-even w-full mx-auto" onSubmit={onSubmit}>
                <div className="relative w-2/3 mb-8 h-14" >
                    <input onChange={onChange} type="email" value={email} className="pl-20 w-full h-full rounded-full text-lg focus:outline-none" placeholder='email' name='email'/>
                    <AiOutlineMail className='absolute text-sky-700 w-10 h-10 top-2 left-4'></AiOutlineMail>
                </div>
                <div className="relative w-2/3 mb-8 h-14" >
                    <input onChange={onChange} name='name' value={name} type="text" className="pl-20 w-full h-full rounded-full text-lg focus:outline-none" placeholder='Name'/>
                    <FaUserTag className='absolute text-sky-700 w-10 h-10 top-2 left-4'></FaUserTag>
                </div>
                <div className="relative w-2/3 mb-8 h-14" >
                    <input name='password' value={password} onChange={onChange} type="password" className="pl-20 w-full h-full rounded-full text-lg focus:outline-none" placeholder='password'/>
                    <RiLockPasswordFill className='absolute text-sky-700 w-10 h-10 top-2 left-4'></RiLockPasswordFill>
                </div>
                <div className="relative w-2/3 mb-8 h-14" >
                    <input onChange={onChange} type="password" name='password2' value={password2} className="pl-20 w-full h-full rounded-full text-lg focus:outline-none" placeholder='enter password again '/>
                    <RiLockPasswordFill className='absolute text-sky-700 w-10 h-10 top-2 left-4'></RiLockPasswordFill>
                </div>
                <button className='btn bg-sky-700 w-2/3 h-12 hover:bg-sky-400 active:bg-sky-400 border-none rounded-full'>Register</button>
            </form>
        </div>
    )
}

const mapStatetoProps = state => ({
    auth: state.auth
})

export default connect(mapStatetoProps, {register, userError, userReset})(Register)