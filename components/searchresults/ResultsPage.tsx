import s from './Results.module.scss';
import Image from 'next/image';
import banner from '@/public/resultbanner.svg'
import Slider from './components/Slider';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import Docs from './components/Card';
import { setInitialShownDocs, showDocs } from '@/store/Slices/documentsReducer';
import { useEffect } from 'react';
import { PostDocuments } from '@/api/documents';
import Loader from '../loader/Loader';
import { useRouter } from 'next/router';

export default function ResultPage() {
    const dispatch: AppDispatch = useDispatch();
    
    // Получаем данные из состояния хранилища Redux
    const sliderData = useSelector((state: RootState) => state.histograms.data);
    const documents = useSelector((state: RootState) => state.docs.data);
    const shownDocs = useSelector((state: RootState) => state.docs.shownDocs);
    const status = useSelector((state: RootState) => state.docs.status);
    const error = useSelector((state: RootState) => state.docs.error);
    const encodedIds = useSelector((state: RootState) => state.objectsearch.dataObjectsearch);

    const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);
    const router = useRouter();

    // Если пользователь не авторизован, перенаправляем его на страницу авторизации
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/auth');
        }
    }, [isLoggedIn, router]);

    // Сбросить состояние shownDocs при загрузке страницы
    useEffect(() => {
        dispatch(setInitialShownDocs(10)); // Установить показанные документы обратно на 10 при загрузке страницы
    }, [dispatch]);

    // Проверяем, показаны ли все документы
    const allDocsDisplayed = shownDocs >= documents.length;

    useEffect(() => {
        if (encodedIds.length > 0) {
            dispatch(PostDocuments({ listEncodedId: encodedIds }));
        }
    }, [encodedIds, dispatch]);

    const LoadMore = () => {
        dispatch(showDocs(10));
    };

    // Определяем заголовок и текст в зависимости от статуса загрузки
    const while_waitingContent = status === 'succeeded' ? (
        <>
            <h1 className={s.title}>Нашли! Можете<br/>ознакомиться с данными. </h1>
            <p className={s.subtitle}>Поиск завершен! <br/> Посмотрите результаты ниже.</p>
        </>
    ) : (
        <>
            <h1 className={s.title}>Ищем. Скоро<br/> будут результаты</h1>
            <p className={s.subtitle}>Поиск может занять некоторое время,<br/> просим сохранять терпение.</p>
        </>
    );

    if (!isLoggedIn) {
        return null;
    }

    return(
        <div className={`${s.resultpage} container`}>
            <div className={s.while_waiting}>
                <div>
                    {while_waitingContent}
                </div>

                <Image 
                    src={banner}
                    alt='A firl with magnifying glass'
                    className={s.banner}
                    width={552}
                    height={369}
                />
            </div>
            <Slider sliderData={sliderData} />
            <div className={s.docs_section}>
                <h2 className={s.section_title}>Список документов</h2>
                {status === 'loading' && <div className={s.loader_docs}><Loader />Загружаем документы, может потребоваться некоторое время</div>}
                {status === 'failed' && <div className={s.error_docs}>Ошибка: {error}</div>}
                {status === 'succeeded' && (
                <>
                    <Docs
                        documents={documents} 
                        shownDocs={shownDocs} 
                    />
                    {!allDocsDisplayed && <button className={s.loadmore} onClick={LoadMore}>Показать больше</button>}
                </>
                )}
            </div>
        </div>
    );
}