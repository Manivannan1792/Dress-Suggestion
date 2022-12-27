import { useState,useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { MyContext } from "../../context";
import axios from "../../Axios"
import {API}  from "../../pages/global"

export function Login () {
	const[email,setEmail] =useState("");
    const [password,setPassword]=useState("");
	const [error, setError] = useState("");
	const navigate=useNavigate();
	//const{ setUser} = useContext(MyContext);
      const[user,setUser]=useState({email:"", password:""})
	 const handleSubmit =async(e) =>{
	e.preventDefault();
		if(!email || !password){
		  return alert("Please fill out fields");
		}
		await axios.post("/login",{email,password})
			.then(({data})=>{
			  localStorage.setItem("user", JSON.stringify(data));
			 /* setUser({email:data.email,password:data.password});  */
			 setUser(JSON.stringify(data))
			 console.log(user)
			 navigate("/")
			  
			})

			 .then(res=>console.log(user)) 
			.catch((error)=> {
				console.log(error)
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError("invalid credentials");
				}
			}
		)
		
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							name="email"
                            placeholder="Enter email"  
                            onChange={(e) =>setEmail(e.target.value)}
                            value={email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e)=>setPassword(e.target.value)}
							value={password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
					<p>
					<u>UserId :abc@gmail.com</u><br></br>
				<u>Password :123456</u></p>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

