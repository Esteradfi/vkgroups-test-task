import preloader from "./../../assets/preloader.svg";
import styles from "./Preloader.module.css";

const Preloader = () => {
    return (
        <div className={styles.wrapper}>
            <img src={`${preloader}`} alt="Загрузка групп"/>
        </div>
    )
}

export default Preloader;