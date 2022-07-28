import {useState} from 'react'
import {forgetpassword} from '../actions/userAction'
import {connect} from 'react-redux'


function Forgetpassword({forgetpassword}) {

    const [email, setEmail] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()
       if(email) {
        forgetpassword(email)
       }
    }


    return (
        <form onSubmit={onSubmit} className="w-full flex items-center justify-center flex-col mt-40">
            <input onChange={(e) => setEmail(e.target.value)} type="text" className="input rounded-full w-1/3 mx-auto h-14 bg-sky-300 focus:outline-none text-zinc-700 text-xl" placeholder='enter your email...'/>
            <button type="submit" className="btn rounded-full w-1/3 mx-auto h-14 bg-sky-300 hover:outline-none mt-10 text-zinc-700 text-xl border-none">Send</button>
        </form>
    )
}

const mapsPropstoState = state => ({
    auth: state.auth
})

export default connect(mapsPropstoState, {forgetpassword})(Forgetpassword)