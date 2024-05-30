import Link from 'next/link';
import s from './Header.module.scss';
import Image from 'next/image';
import logo from '../../public/logo.png'
import logoinwhite from '@/public/withe-logo.png';
import ProfileMenu from './ProfileMenu';
import { useState } from 'react';

export default function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false); // Состояние для открытия/закрытия бургер-меню

    // Функция для переключения состояния бургер-меню
    const toggleBurgerMenu = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };
    return (
        <div className={`${s.header} ${isBurgerOpen ? s.active : ''} container`}>
            {/* Лого с ссылкой на главную страницу, меняется в мобильной версии при открытом меню */}
            <Link href="/" aria-label="Open main page">
                {isBurgerOpen ? (
                    <Image 
                        src={logoinwhite}
                        alt='Our logo but in white'
                        className={s.logo}
                    />
                ) : (
                    <Image 
                        src={logo}
                        alt='Our logo'
                        className={s.logo}
                    />
                )}
            </Link>
            
            <nav className={`${s.nav_wrapper} ${isBurgerOpen ? s.active : ''}`}>
                <ul className={s.nav}>
                    <li className={s.link_wrapper}><Link href="/" className={s.link} aria-label="Open main page">Главная</Link></li>
                    <li className={s.link_wrapper}><a href="#" className={s.link}>Тарифы</a></li>
                    <li className={s.link_wrapper}><a href="#" className={s.link}>FAQ</a></li>
                </ul>
            </nav>

            <ProfileMenu isBurgerOpen={isBurgerOpen} />

            {/* Иконка бургер-меню */}
            <div className={`${s.burgerMenu} ${isBurgerOpen ? s.active : ''}`} onClick={toggleBurgerMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    )
}