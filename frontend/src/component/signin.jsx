import {AiOutlineMail} from 'react-icons/ai'
import {FaUserTag} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {signin, userError, userReset} from '../actions/userAction'
import {toast} from 'react-toastify'
import { useNavigate, Navigate} from 'react-router-dom'

function Signin({auth: {user}, signin , userReset, userError}) {
    const [formdata, setFormdata] = useState({
        email: '', 
        password: ''
    })
    const navigate = useNavigate()
    useEffect(() => {
        if(user) {
            userReset()
        }
    }, [user])
    const {email, password} = formdata
    const onChange = (e) => {
        setFormdata(pre => ({...pre, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formdata)
        if(!email || !password) {
            toast.error('please fill all information required')
            userError()
        } else {
            signin(formdata)
            setFormdata({
                email: '',
                password: ''
            })
            toast.success('you logged in successfully')
            navigate('/')
        }

    }

    return (
        <div className="w-full flex flex-col items-center justify-center px-20">
            <h1 className="mx-auto text-3xl font-bold font-mono text-sky-700 mb-6">Your Account</h1>
            <form className="flex flex-col items-center justify-even w-full mx-auto" onSubmit={onSubmit}>
                <div className="relative w-2/3 mb-8 h-14" >
                    <input onChange={onChange} type="email" value={email} className="pl-20 w-full h-full rounded-full text-lg focus:outline-none" placeholder='email' name='email'/>
                    <AiOutlineMail className='absolute text-sky-700 w-10 h-10 top-2 left-4'></AiOutlineMail>
                </div>
                
                <div className="relative w-2/3 mb-8 h-14" >
                    <input name='password' value={password} onChange={onChange} type="password" className="pl-20 w-full h-full rounded-full text-lg focus:outline-none" placeholder='password'/>
                    <RiLockPasswordFill className='absolute text-sky-700 w-10 h-10 top-2 left-4'></RiLockPasswordFill>
                </div>
                
                <button type='submit' onSubmit={onSubmit} className='btn bg-sky-700 w-2/3 h-12 hover:bg-sky-400 active:bg-sky-500 border-none rounded-full'>Signin</button>
                <button className='btn bg-sky-700 w-2/3 h-12 hover:bg-sky-500 active:bg-sky-400 border-none rounded-full mt-6' type='button' onClick={() => navigate('/forgetpassword')}>Forgot your password</button>
            </form>
        </div>
    )
}
const mapStatetoProps = state => ({
    auth: state.auth
})

export default connect(mapStatetoProps, {signin, userReset, userError})(Signin)