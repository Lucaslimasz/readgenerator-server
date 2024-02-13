import { IQuestion } from '../interfaces/question';

export const TemplateOne = (data: IQuestion[]): string | NodeJS.ArrayBufferView => {
    const properties: Record<string, string> = {
        'title': '',
        'sub-title': '',
        'project-description': '',
        'project-image': '',
        'link-figma': '',
        'technologies': '',
        'link-github': '',
        'start-project': '',
        'user': ''
    };

    data.forEach(item => {
        if (item.id in properties)
            properties[item.id] = item.answer;
    });

    const images = properties['project-image'].split(',').map(img => (
        `<img alt="${properties['title']}" title="${properties['title']}" src="${img.trim()}" width="100%" />`
    )).join('\n');
    const technologies = properties['technologies'].split(',').map(tec => `- ${tec.trim()}`).join('\n');
    const manager = properties['start-project'].startsWith('npm') ? 'npm install' : 'yarn';

    return generateMD(properties, images, technologies, manager);
}

const generateMD = (properties: Record<string, string>, images: string, technologies: string, manager: string) => {
    let sections = [];

    if (properties['project-image'])
        sections.push(`<p align="center">\n${images}\n</p>\n\n<br/>`);

    if (properties['title'])
        sections.push(`# ${properties['title']}`);

    if (properties['title'] && properties['sub-title'])
        sections.push(`> ${properties['title']} | ${properties['sub-title']}`);

    if (properties['project-description'])
        sections.push(`## 💻 Projeto \n\n${properties['project-description']}`);

    if (properties['link-figma'])
        sections.push(`## 🔖 Layout\n\nVocê pode visualizar o layout do projeto através [desse link](${properties['link-figma']}). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.\n\n---`);

    if (properties['technologies'])
        sections.push(`### 📄 O que foi usado:\n\n${technologies}`);

    if (properties['link-github'])
        sections.push(`### 🛠 Mão na massa:\n\n> Você pode realizar o clone deste repositório!\n\nClone o repositório:\n\n\`git clone ${properties['link-github']}\n\``);

    if (properties['start-project'] && manager)
        sections.push(`### 💻 Executando o projeto 🚀\n\n#### Na raiz do projeto, execute os comandos:\n\n# Para instalar as dependências\n${manager}`);

    if (properties['start-project'])
        sections.push(`# Para startar o projeto utilize\n${properties['start-project']}`);

    return sections.join('\n\n').replace(/\n\s*\n/g, '\n\n');
}