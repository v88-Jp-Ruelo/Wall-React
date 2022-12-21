import React, {useEffect} from "react";
import right_panel_image from "../../assets/images/userpanel.png";
import "./SignupPage.scss";
import { useForm } from 'react-hook-form'

export default function SignupPage(){
    useEffect(()=>{document.title = "Sign Up"},[]);

    const { register, handleSubmit, formState: { errors }, watch} = useForm();
    let password = watch("password");

    const onSubmit = data => {
        console.log(data);
        window.location.href = "/login";
    }
    return(
        <main>
            <div className="container">
                <div className="sign_up">
                    <form action="POST" onSubmit={handleSubmit(onSubmit)}>
                        <h1>The Wall</h1>
                        <h2>Register</h2>
                        <label>Email</label>
                        <input {...register('email',{required: "Email is required",
                                                    pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,message: "Invalid email address"},
                                                    })} tabIndex="1" type="text" name="email" className={errors.email ? "error_input" : ""}/>
                        {errors.email && <p className="error_text">{errors.email.message}</p>}
                        <label>Password</label>
                        <input {...register('password',{required: "Password is required",
                                                        minLength: {value: 8,message: "Password must have at least 8 characters"},
                                                        })} tabIndex="2" type="password" name="password" className={errors.password ? "error_input" : ""}/>
                        {errors.password && <p className="error_text">{errors.password.message}</p>}
                        <label>Confirm Password</label>
                        <input {...register('confirmPassword',  {required: "Confirm Password is required",
                                                                validate: value => value === password || "The passwords do not match.",
                                                                })} tabIndex="3" type="password" name="confirmPassword" className={errors.confirmPassword ? "error_input" : ""}/>
                        {errors.confirmPassword && <p className="error_text">{errors.confirmPassword.message}</p>}
                        
                        <p className="note">By creating an account, you agree with The Wall's <a href="/sign-up">Privacy Policy</a> and<a href="/sign-up"> Terms of Use</a>.</p>
                        <button tabIndex="4" type="submit">SIGN UP</button>
                        <p className="is_registered">Already have an account ? <a tabIndex="5" href="/login">Sign in</a></p>
                    </form>
                </div>
            </div>
            <div id="design-panel">
                <img src={right_panel_image} alt="A guy holding a paper" />
            </div>
        </main>
    );
}