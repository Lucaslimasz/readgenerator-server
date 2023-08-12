import { IQuestion } from '../interfaces/question';

export const TemplateOne = (data: IQuestion[]): string | NodeJS.ArrayBufferView => {
    const properties: Record<string, string> = {
        'title': '',
        'sub-title': '',
        'project-description': '',
        'project-image': '',
        'link-project': '',
        'tecnologies': '',
        'link-github': '',
        'start-project': '',
        'user': ''
    };

    data.forEach(item => {
        if (item.id in properties) {
            properties[item.id] = item.answer;
        }
    });

    const images = properties['project-image'].split(',').map(img => (
        `<img alt="${properties['title']}" title="${properties['title']} src="${img}" width="100%">`
    )).join('\n');
    const tecnologies = properties['tecnologies'].split(',').map(tec => `- ${tec.trim()}`).join('\n');
    const manager = properties['start-project'].startsWith('npm') ? 'npm install' : 'yarn';

    return generateMD(properties, images, tecnologies, manager);
}

const generateMD = (properties: Record<string, string>, images: string, tecnologies: string, manager: string) => {
    return `<p align="center">
    ${images}
</p>

<br/>

# ${properties['title']}

> ${properties['title']} | ${properties['sub-title']}

## 💻 Projeto

${properties['project-description']}

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](${properties['link-project']}). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

---

### 📄 O que foi usado:

${tecnologies}

### 🛠 Mão na massa:

> Você pode realizar o clone deste repositório!

Clone o repositório:

\`\`\`
git clone ${properties['link-github']}
\`\`\`
 
### 💻 Executando o projeto 🚀

#### Na raiz do projeto, execute os comandos:

# Para instalar as dependências

\`\`\`
${manager}
\`\`\`

# Para startar o projeto utilize

\`\`\`
${properties['start-project']}
\`\`\`
`;
}