import s from './Loader.module.scss';

export default function Loader() {
    return (
        <div className={s.loaderContainer}>
            <div className={s.loader__dot}></div>
            <div className={s.loader__dot}></div>
            <div className={s.loader__dot}></div>
            <div className={s.loader__dot}></div>
            <div className={s.loader__dot}></div>
            <div className={s.loader__dot}></div>
            <div className={s.loader__dot}></div>
            <div className={s.loader__dot}></div>
        </div>
    )
}