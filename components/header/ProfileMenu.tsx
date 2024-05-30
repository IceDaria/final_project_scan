import React, { useEffect } from "react";
import Link from 'next/link';
import s from './Header.module.scss';
import Image from 'next/image';
import placeholder from '@/public/placeholderiser.png'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/Slices/authReducer";
import { getAccountInfo } from "@/api/auth";
import Loader from "../loader/Loader";

interface ProfileMenuProps {
    isBurgerOpen: boolean; 
}

export default function ProfileMenu({ isBurgerOpen }: ProfileMenuProps) {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const isLoggedIn = !!authState.accessToken; // Проверка, авторизован ли пользователь
    const accountInfo = authState.accountInfo; 
    const loadingAccountInfo = authState.loadingAccountInfo;

    useEffect(() => {
        // Получение информации об аккаунте при авторизации пользователя
        if (isLoggedIn && authState.accessToken) {
            dispatch(getAccountInfo(authState.accessToken));
        }
    }, [isLoggedIn, authState.accessToken, dispatch]);

    // Обработчик выхода из аккаунта
    const handleLogout = () => {
        dispatch(logout());

        // удаление информации из локального хранилища
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire');
    };

    return (
        <div>
            {isLoggedIn ? ( // Если пользователь авторизован, показываем
                <div className={s.loggedmenu}>
                    <div className={s.companies}>
                        {loadingAccountInfo ? (
                            <Loader />
                        ) : (
                            <>
                                <p className={s.used}>
                                    Использовано компаний: <span className={s.used_number}>{accountInfo?.eventFiltersInfo.usedCompanyCount || 0}</span>
                                </p>
                                <p className={s.left}>
                                    Лимит по компаниям: <span className={s.left_number}>{accountInfo?.eventFiltersInfo.companyLimit || 0}</span>
                                </p>
                            </>
                        )}
                    </div>
                    <div className={`${s.user} ${isBurgerOpen ? s.active : ''}`}>
                        <div className={s.userinfo}>
                            <p className={s.username}>Фамилия И.</p>
                            <button className={s.logout} onClick={handleLogout}>Выйти</button>
                        </div>
                        <Image 
                            src={placeholder}
                            alt='User avatar'
                            className={s.useravatar}
                            width={32}
                            height={32}
                        />
                    </div>
                </div>
            ) : ( // Если пользователь не авторизован
                <div className={`${s.unloggedmenu} ${isBurgerOpen ? s.active : ''}`}>
                    <a href="#" className={s.singUp}>Зарегистрироваться</a>
                    <span className={s.line}></span>
                    <Link href="/auth" passHref>
                        <button className={s.logIn}>Войти</button>
                    </Link>
                </div>
            )}
        </div>
    );
}