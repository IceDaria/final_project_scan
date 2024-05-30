// Функция, чтобы распарсить текст статьи
export const parceText = (doc: any) => {
    let xml = doc.ok.content.markup;
    let div = document.createElement("div");
    div.innerHTML = xml;
    let text = div.textContent || div.innerText || "";

    return text.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").length > 730 ? text.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").slice(0, 730) + ' . . .' : text.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
};

// Функция, чтобы распарсить и получить изображение
// *либо я что-то не так сделала, либо изображение никогда не приходит*
export const getImageFromXML = (xml: string): string => {
    // Регулярное выражение для поиска URL изображения в теге <img>
    const imgRegex = /<img.*?src="(.*?)".*?>/g;
    // Поиск первого совпадения
    const match = imgRegex.exec(xml);
    // Если найдено совпадение, возвращаем URL изображения, иначе возвращаем путь к картинке по умолчанию
    return match ? match[1] : '/defaultimage.png';
};