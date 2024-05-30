import s from '../Results.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/defaultimage.png';
import { Doc } from '@/components/utils/shared';
import { getImageFromXML, parceText } from '@/components/utils/utils';

interface DocsProps {
    documents: Doc[];
    shownDocs: number;
}

export default function Docs({ documents, shownDocs}: DocsProps) {
    // определяем, сколько документов показыать
    const shownDocsCard = documents.slice(0, shownDocs);

    return (
        <div className={s.docs_wrapper}>
            <div className={s.docs_cards}>
                {shownDocsCard.map((doc) => (
                    <div className={s.docs_card} key={doc.id}>
                        <div className={s.docs_header}>
                            <p className={s.date}>{new Date(doc.ok.issueDate).toLocaleDateString()}</p>
                            <Link 
                                className={s.source} 
                                target="_blank" 
                                href={doc.ok.url}
                            >
                                {doc.ok.source.name.replace(/\s*\([^)]*\)/, '')}
                            </Link>
                        </div>

                        <div className={s.docs_main}>
                            <div className={s.title}>{doc.ok.title.text.length > 73 ? doc.ok.title.text.slice(0, 73) + '. . .' : doc.ok.title.text}</div>
                            {doc.isTechNews && (
                                <div className={s.docs_bage}>
                                    <p className={s.theme}>
                                        {doc.ok.attributes.isTechNews && 'Технические новости' || doc.ok.attributes.isAnnouncement && 'Анонсы и события' || doc.ok.attributes.isDigest && 'Сводки новостей'}
                                    </p>
                                </div>
                            )}

                            <Image
                                src={doc.ok.content.markup.includes('<img') ? getImageFromXML(doc.ok.content.markup) : image}
                                alt='Image'
                                className={s.card_image}
                                width={581}
                                height={158}
                            />
                            <p className={s.article}>{parceText(doc)}</p>
                        </div>

                        <div className={s.card_footer}>
                            <button className={s.toSource}>
                                <Link 
                                    className={s.source} 
                                    target="_blank" 
                                    href={doc.ok.url}>
                                        Читать в источнике
                                </Link>
                            </button>
                            <div className={s.wordsamount}>{doc.ok.attributes.wordCount} слов</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}