import {useState, useEffect} from 'react'
import { resetpassword, updatepassword, userReset} from '../actions/userAction'
import {connect} from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


function Tokenforgetpassword({ resetpassword, auth, updatepassword, userReset}) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [formdata, setFormdata] = useState(null)

    const navigate = useNavigate()

    const {tokenpassword} = useParams()

    useEffect(() => {
     
            resetpassword(tokenpassword)
            if(auth.user && !auth.user.error) {
                setEmail(auth.user.email)
                setFormdata(auth.user)
                console.log(formdata)
            }
        
      
        
        
    }, [tokenpassword])

    useEffect(() => {
        if(auth.user) {
            userReset()
        }

    }, [auth.user])    

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('your passwords do not match')
        } else {
            updatepassword({newpassword: password}, auth.user._id)
            toast.success('update password successfully')
            navigate('/')
        }
        
      
    }


    return (
        <form onSubmit={onSubmit} className="w-full flex items-center justify-center flex-col mt-10">
            <input value={email} type="text" className="input rounded-full w-1/3 mx-auto h-14 bg-sky-300 focus:outline-none text-zinc-700 text-xl mt-10" placeholder='enter your password'/>

            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="input rounded-full w-1/3 mx-auto h-14 mt-10 bg-sky-300 focus:outline-none text-zinc-700 text-xl" placeholder='enter your password'/>

            <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="text" className="input rounded-full w-1/3 mx-auto h-14 mt-10 bg-sky-300 focus:outline-none text-zinc-700 text-xl" placeholder='enter your password again'/>

            <button type="submit" className="btn rounded-full w-1/3 mx-auto h-14 bg-sky-300 hover:outline-none mt-10 text-zinc-700 text-xl border-none">Update Password</button>
            
        </form>
    )
}

const mapsPropstoState = state => ({
    auth: state.auth
})

export default connect(mapsPropstoState, { resetpassword, updatepassword, userReset})(Tokenforgetpassword)