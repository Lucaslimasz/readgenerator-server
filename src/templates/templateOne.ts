import { Question } from '../types/question';

export const TemplateOne = (data: Question[]): string | NodeJS.ArrayBufferView => {
    const properties: Record<string, string> = {
        'title': '',
        'sub-title': '',
        'project-description': '',
        'project-image': '',
        'link-project': '',
        'tecnologies': '',
        'link-github': '',
        'tutorial': '',
        'user': ''
    };

    data.forEach(item => {
        if (item.id in properties) {
            properties[item.id] = item.answer;
        }
    });

    const images = properties['project-image'].split(',').map(image => image.trim()).join('\n');
    const tecnologies = properties['tecnologies'].split(',').map(tech => `- ${tech.trim()}`).join('\n');

    return generateMD(properties, images, tecnologies);
}

const generateMD = (properties: Record<string, string>, images: string, tecnologies: string) => {
    const { title, subTitle, description, linkProject, linkRepo, tutorial } = properties;

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