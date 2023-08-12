import { Question } from '../types/question';

export const TemplateOne = (data: Question[]): string | NodeJS.ArrayBufferView => {
    let title = '';
    let subTitle = '';
    let description = '';
    let images = '';
    let linkProject = '';
    let tecnologies = '';
    let linkRepo = '';
    let tutorial = '';
    let user = '';

    data.map(item => {
        if (item.id === 'title')
            title = item.answer;
        if (item.id === 'sub-title')
            subTitle = item.answer;
        if (item.id === 'project-description')
            description = item.answer;
        if (item.id === 'project-image')
            images = item.answer.split(',').map(image => image).join('\n');
        if (item.id === 'link-project')
            linkProject = item.answer;
        if (item.id === 'tecnologies')
            tecnologies = item.answer.split(',').map(tech => `- ${tech.trim()}`).join('\n');
        if (item.id === 'link-github')
            linkRepo = item.answer;
        if (item.id === 'tutorial')
            tutorial = item.answer;
        if (item.id === 'user')
            user = item.answer;
    })

    return `<p align="center">
    <img alt="${title}" title="${title}" src="${images}" width="100%">
</p>

<br/>

# ${title}

> ${title} | ${subTitle}

## 💻 Projeto

${description}

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](${linkProject}). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

---

### 📄 O que foi usado:

${tecnologies}

### 🛠 Mão na massa:

> Você pode realizar o clone deste repositório!

Clone o repositório:

\`\`\`
git clone ${linkRepo}
\`\`\`
 
### 💻 Executando o projeto 🚀

${tutorial}
`;
}