import styles from './Header.module.css';

function Header(props) {
    return (
        <header className={styles.Header}>
            <h1>Territories</h1>
            <nav>
                <ul>
                    <li>Login</li>
                    <li>Signout</li>
                    <li>Signup</li>
                    <li>Dashboard</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header; 