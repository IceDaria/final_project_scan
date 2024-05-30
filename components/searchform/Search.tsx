import s from './SearchForm.module.scss';
import Image from 'next/image';
import searchformbanner from '@/public/searchformbanner.svg'
import SearchForm from './SearchForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';

export default function Search() {
    const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);
    const router = useRouter();

    // Если пользователь не авторизован, перенаправляем его на страницу авторизации
    if (!isLoggedIn) {
        router.push('/auth'); 
        return null; 
    }

    return (
        <div className={`${s.searchpage} container`}>
            <div className={s.header}>
                <h1 className={s.title}>Найдите необходимые<br/> данные в пару кликов.</h1>
                <div className={s.subtitle}>Задайте параметры поиска.<br/> Чем больше заполните, тем точнее поиск</div>
            </div>
            <div className={s.search_block}>
                <SearchForm />
                <Image 
                    src={searchformbanner}
                    alt='A person searching for someting'
                    className={s.banner}
                    width={442}
                    height={470}
                />
            </div>
        </div>
    )
}