import React, {useEffect} from "react";
import right_panel_image from "../../assets/images/userpanel.png";
import "./LoginPage.scss";
import { useForm } from 'react-hook-form'

export default function LoginPage(){
    useEffect(()=>{document.title = "Log In"},[]);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const user = {
        email:"testemail@gmail.com",
        password:"qwerty12321"
    }
    const onSubmit = data => {
        console.log(data);
        window.location.href = "/dashboard";
    }

    return(
        <main>
            <div className="container">
                <div className="login">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>The Wall</h1>
                        <h2>Log In</h2>
                        <label htmlFor="email">Email</label>
                        <input {...register('email',    {required: "Email is required",
                                                        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message: "Invalid email address"},
                                                        validate: value => value === user.email || "The email you entered isn't connected to an account.",
                                                        })} type="text" className={errors.email ? "error_input" : ""} tabIndex="1"/>
                        {errors.email && <p className="error_text">{errors.email.message}</p>}
                        <label htmlFor="email">Password
                            <a href="/">Forgot Password ?</a>
                        </label>
                        <input {...register('password',{required: "Password is required",
                                                        minLength: {value: 8,message: "Password must have at least 8 characters"},
                                                        validate: value => value === user.password || "Incorrect Password.",
                                                        })} type="password" className={errors.password ? "error_input" : ""} tabIndex="2"/>

                        {errors.password && <p className="error_text">{errors.password.message}</p>}

                        <button tabIndex="3" type="submit">SIGN IN</button>
                        <p className="is_registered">I don't have an account ? <a tabIndex="4" href="/sign-up">Sign Up</a></p>
                    </form>
                </div>
            </div>
            <div id="design-panel">
                <img src={right_panel_image} alt="A guy holding a paper" />
            </div>
        </main>
    );
}