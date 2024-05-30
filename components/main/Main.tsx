import { useSelector } from 'react-redux';
import s from './Main.module.scss'
import About from './components/About'
import Tariffs from './components/Tariffs'
import Carousel from './components/Сarousel'
import { RootState } from '@/store/store';

export default function Main() {
    const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);
    const currentTariff = useSelector((state: RootState) => state.auth.currentTariff);

    return (
        <div className={`${s.main} container`}>
            <About isLoggedIn={isLoggedIn} />
            <Carousel />
            <Tariffs currentTariff={currentTariff} />
        </div>
    )
}