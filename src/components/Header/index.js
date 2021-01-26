import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header(props) {
    return (
        <header className={styles.Header}>
            <Link to="/">
                <h1>Shape Wars</h1>
            </Link>
            <nav>
                <ul>
                {
                props.user ? 
                    <>
                        <li>{props.user.username}</li>
                        <li>
                          
                            <Link to="" onClick={props.handleLogout}>Logout</Link>
                        </li>
                        <li>
                            <Link to="/dashboard"> Map</Link>
                        </li>
                        
                    </>
                    :
                    <>
                        <li className={styles.Login}>Start Here →</li>
                        <li>
                        
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                }
                </ul>
            </nav>
        </header>
    );
};

export default Header; 