import styles from './Locate.module.css';


function Locate({panTo}) {

    return (
        <button 
            className={styles.button}
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
    </button>
    );
    
}

export default Locate; 