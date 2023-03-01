import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, userLogOut } from '../store/slices/userInfo.slice'
import "./styles/Login.css"

const Login = () => {
  const {register, handleSubmit, reset} = useForm()

  const {
    token, 
    user: {firstName, lastName},
  } = useSelector(store => store.userInfo)

  const dispatch = useDispatch()

  const submit = (data) => {
    dispatch(loginUser(data))
    reset({
      email: "",
      password: ""
    })
  }

  const handleLogOut = () => {
    dispatch(userLogOut())
  }

  return (
    <main className='login__container'>
      {
        token ? (
          <section className='user'>
            <i className='bx bxs-user-circle'></i>
            <h3 className='user__name'>{firstName} {lastName}</h3>
            <button onClick={handleLogOut}>Logout</button>
          </section>
        ) : (
          <article className='login__container'>

            <form className='login__card' onSubmit={handleSubmit(submit)}>
              <h3 className='login__title'><span className='input__span'>Welcome!</span><br></br> Enter your email and password to continue</h3>

              <div>
                <h4 className='login__subtitle'>Test data</h4>
                <div><i className='bx bx-envelope'></i> john@gmail.com</div>
                <div><i className='bx bx-lock-alt'></i> john1234</div>
              </div>
              <div className="bb">
              <div className='login__form'>

              <div>
                {/* <label htmlFor="">Email</label> */}
                <input className='input__email' type="text" {...register("email")} placeholder="E-Mail" />
              </div>
              <div>
                {/* <label htmlFor="">Password</label> */}
                <input className='input__password' type="password" {...register("password")} placeholder="Pasword"/>
              </div>

              <button className='login__btn'>Login</button>

              </div>

              </div>
              <p className='parrafo'>Don't have an account? <span>Sign up</span></p>
            </form>
          </article>
        )
      }
    </main>
  )
}

export default Login