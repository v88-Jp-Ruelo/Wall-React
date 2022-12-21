import React, {useState, useEffect} from "react";
import right_panel_image from "../../assets/images/userpanel.png";
import "./SignupPage.scss";

export default function SignupPage(){
    const document_title = "Sign Up";
    const [formData, setFormData] = useState({email:"", password:"", confirmPassword:""});
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const isErrorInput={
        email: errors.email ? "error_input" : "",
        password: errors.password ? "error_input" : "",
        confirmPassword: errors.confirmPassword ? "error_input" : ""
    }
    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setFormData((formData)=>({
            ...formData,
            [name]:value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!formData.email){
            newErrors.email = "Email is required.";
        }
        else if(!isEmailValid.test(formData.email)){
            newErrors.email = "Please enter a valid Email.";
        }

        if(!formData.password){
            newErrors.password = "Password is required.";
        }
        else if(formData.password.length<8){
            newErrors.password = "Password must be at least 8 characters long.";
        }

        if(!formData.confirmPassword){
            newErrors.confirmPassword = "Please confirm your password.";
        }
        else if(formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return newErrors;
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setIsSubmit(true);
        validateForm();
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmit){
            window.location.href = "/login";
        }
    });
    useEffect(()=>{document.title = document_title},[]);

    return(
        <main>
            <div className="container">
                <div className="sign_up">
                    <form action="POST" onSubmit={handleSubmit}>
                        <h1>The Wall</h1>
                        <h2>Register</h2>
                        <label>Email</label>
                        <input tabIndex="1" type="text" name="email" className={isErrorInput.email} value={formData.email} onChange={handleInputChange}/>
                        <p className="error_text">{errors.email}</p>
                        <label>Password</label>
                        <input tabIndex="2" type="password" name="password" className={isErrorInput.password} value={formData.password} onChange={handleInputChange}/>
                        <p className="error_text">{errors.password}</p>

                        <label>Confirm Password</label>
                        <input tabIndex="3" type="text" name="confirmPassword" className={isErrorInput.confirmPassword} value={formData.confirmPassword} onChange={handleInputChange}/>
                        <p className="error_text">{errors.confirmPassword}</p>
                        
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