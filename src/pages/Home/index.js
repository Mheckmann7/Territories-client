import styles from './Home.module.css';
import step1 from '../../img/step1.png';
import step2 from '../../img/step2.png';
import step3 from '../../img/step3.png';



function Home(props) {
    return (
        <div className={styles.Home}>
            <h2>Welcome to Shape Wars!</h2>
            <p>Shape wars is a game that allows you to compete with and work alongside other players. The goal of the game is to build off of one anothers shapes while also earning the most points for yourself. </p>
            <h2>How to Play: </h2>
            <img src={step1} alt='step1'/> 
            <p>Other players shapes will be shown in black, your shapes will be shown in white. Place a marker at your current location by clicking on the ‘Place Markers’ button at the bottom of the screen. </p>
            <img src={step2} alt='step2' /> 
            <p>After you have placed three markers a shape will be drawn automatically connecting to the first marker you placed (be careful where you place your markers to maximize points!) Player 1: 630 points Player 2: 523 points</p>
            <img src={step3} alt='step3' /> 
            <p>Once you place your markers your shape will be automatically connected to other players nearest shapes. Don’t worry you’ll still keep the same amount of points! But the area between those two shapes (shown by the orange outline) becomes dead space meaning no one can earn any points. So keep in mind where you and other players are placing markers to maximize points! </p>
    
        </div>
    
    );
    
}

export default Home; 