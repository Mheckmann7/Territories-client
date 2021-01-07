import { useState } from 'react';
import { signup } from '../../services/userService';
import styles from './Signup.module.css';

function Signup(props) {
    const [formState, setFormState] = useState(getInitialFormState());
        
        
        
    function getInitialFormState() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    }

    function handleChange(event) {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        })); 
    }
    async function handleSubmit(event) {
        try {
            event.preventDefault(); 
            await signup(formState) 
            setFormState(getInitialFormState());
            props.history.push('/dashboard');

        } catch(error) {
            alert(error.message);
        }
        
    }

    return (
        <div className="Page">
            <form onSubmit={handleSubmit} className={styles.Form}>
                <input
                    value={formState.firstName}
                    onChange={handleChange}
                    name="firstName"
                    type="text" /> 
                <input
                    value={formState.lastName}
                    onChange={handleChange}
                    name="lastName"
                    type="text" />
                <input
                    value={formState.email}
                    onChange={handleChange}
                    name="email"
                    type="email" />
                <input
                    value={formState.password}
                    onChange={handleChange}
                    name="password"
                    type="password" />
                <button>Signup</button>
            </form> 
        </div>
    );
}

export default Signup; 