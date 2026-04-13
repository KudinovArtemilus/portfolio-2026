import recorderDescription from '../assets/description.md?raw';
import monitoringDescription from '../assets/monitoring.md?raw';

export const projectsData = {
    'monitoring': {
        id: 'monitoring',
        title: 'Промышленный мониторинг',
        description: monitoringDescription,
        image: '/images/project_1.png'
    },
    'recorder': {
        id: 'recorder',
        title: 'Java Screen Recorder',
        description: recorderDescription,
        image: '/images/project_recorder.png',
        downloadUrl: 'https://drive.google.com/uc?export=download&id=1wNTMgpYXYgl18m_NzbOY3LzzlBWD7dhC'
    },
    'diagnostic': {
        id: 'diagnostic',
        title: 'Диагностические утилиты',
        description: '# Диагностические утилиты\n\nПодробное описание в разработке...',
        image: '/images/project_2.png'
    },
    'digital-twin': {
        id: 'digital-twin',
        title: 'Цифровой отпечаток',
        description: '# Цифровой отпечаток\n\nПодробное описание в разработке...',
        image: '/images/project_3.png'
    }
};
