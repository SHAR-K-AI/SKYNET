'use client';

import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);import AppImage from "@/components/Image";
import {useRouter, useSearchParams} from "next/navigation";

interface Question {
    question: string;
    image: string;
    options: { text: string; roles: string[]; hint: string }[];
}

const questions: Question[] = [
    // 1. Досвід та базові знання GCP
    {
        question: 'Який ваш рівень досвіду з хмарними технологіями?',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        options: [
            {
                text: 'Новачок, хочу зрозуміти бази',
                roles: ['Cloud Digital Leader', 'Citizen Developer'],
                hint: 'Початковий рівень для тих, хто знайомиться з хмарою.'
            },
            {
                text: 'Маю досвід у програмуванні або IT',
                roles: ['Cloud Engineer', 'Cloud Developer'],
                hint: 'Технічний бекграунд для роботи з сервісами.'
            },
            {
                text: 'Маю досвід з даними та аналітикою',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'Фокус на даних та аналітиці.'
            },
            {
                text: 'Працював з ML / AI',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Досвід у машинному навчанні та AI.'
            },
        ],
    },

    // 2. Девелопмент / API
    {
        question: 'Ви розробляєте API для клієнтських застосунків. Яке рішення GCP оберете?',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        options: [
            {
                text: 'Cloud Functions / Cloud Run',
                roles: ['Cloud Developer', 'API Developer'],
                hint: 'Serverless рішення для швидкого запуску.'
            },
            {
                text: 'Compute Engine + кастомний сервер',
                roles: ['Cloud Engineer'],
                hint: 'Більше контролю над інфраструктурою.'
            },
            {text: 'App Engine', roles: ['Cloud Developer'], hint: 'Менше налаштувань, швидкий деплой.'},
            {
                text: 'Інтеграція через API Gateway',
                roles: ['Cloud Architect', 'API Developer'],
                hint: 'Архітектурне рішення для керованих API.'
            },
        ],
    },

    // 3. Архітектура та інфраструктура
    {
        question: 'Ваше завдання — масштабувати веб-сервіс, який росте від 100 до 100 000 користувачів.',
        image: 'https://images.unsplash.com/photo-1526378722443-4a1121188589',
        options: [
            {text: 'Compute Engine з autoscaler', roles: ['Cloud Engineer'], hint: 'Гнучке масштабування VM.'},
            {
                text: 'GKE (Kubernetes Engine)',
                roles: ['Cloud Engineer', 'Cloud Architect'],
                hint: 'Повний контроль над контейнерами.'
            },
            {text: 'App Engine', roles: ['Cloud Developer'], hint: 'Менше налаштувань, автоматичне масштабування.'},
            {text: 'Cloud Run', roles: ['Cloud Developer'], hint: 'Serverless масштабування.'},
        ],
    },

    // 4. Дані та аналітика
    {
        question: 'Ви аналізуєте великі обсяги даних за допомогою SQL. Який сервіс виберете?',
        image: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a0e',
        options: [
            {text: 'BigQuery', roles: ['Data Analyst', 'Data Engineer'], hint: 'Serverless DWH для великих даних.'},
            {text: 'Cloud SQL', roles: ['Database Engineer'], hint: 'Реляційна база для середніх обсягів.'},
            {text: 'Firestore', roles: ['Cloud Developer'], hint: 'NoSQL база для застосунків.'},
            {
                text: 'Spanner',
                roles: ['Database Engineer', 'Cloud Architect'],
                hint: 'Глобально масштабована реляційна база.'
            },
        ],
    },

    // 5. ML / AI
    {
        question: 'Хочете створити модель класифікації зображень без глибоких знань ML. Що використаєте?',
        image: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2',
        options: [
            {
                text: 'Vertex AI AutoML',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Автоматичне навчання моделей.'
            },
            {
                text: 'TensorFlow з нуля',
                roles: ['Machine Learning Engineer'],
                hint: 'Повний контроль, але високий поріг входу.'
            },
            {
                text: 'Kubeflow Pipelines',
                roles: ['Machine Learning Engineer', 'DevOps Engineer'],
                hint: 'Пайплайни для ML Ops.'
            },
            {text: 'BigQuery ML', roles: ['Data Analyst', 'Data Engineer'], hint: 'SQL-моделі прямо в BigQuery.'},
        ],
    },

    // 6. Безпека та мережі
    {
        question: 'Як би ви захистили секретні ключі та доступ до сервісів?',
        image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5',
        options: [
            {text: 'IAM Roles та політики', roles: ['Security Engineer'], hint: 'Керування доступом на рівні ролей.'},
            {text: 'Secret Manager', roles: ['Security Engineer', 'Cloud Engineer'], hint: 'Безпечне сховище ключів.'},
            {text: 'Cloud Armor', roles: ['Security Engineer', 'Network Engineer'], hint: 'Захист від DDoS атак.'},
            {text: 'KMS для шифрування', roles: ['Security Engineer'], hint: 'Керування ключами для шифрування.'},
        ],
    },

    // 7. Стартапи / швидкий розвиток
    {
        question: 'Ви запускаєте стартап і хочете швидко протестувати ідею в хмарі.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        options: [
            {
                text: 'Cloud Run або App Engine',
                roles: ['Startup Cloud Engineer', 'Cloud Developer'],
                hint: 'Швидкий serverless старт.'
            },
            {text: 'Compute Engine', roles: ['Cloud Engineer'], hint: 'Більше контролю, довше налаштування.'},
            {text: 'Kubernetes Engine', roles: ['Cloud Engineer'], hint: 'Контейнери для масштабованості.'},
        ],
    },

    // 8. Адміністрування
    {
        question: 'Ви адмініструєте робочі простори та користувачів.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        options: [
            {
                text: 'Google Workspace Admin',
                roles: ['Google Workspace Administrator'],
                hint: 'Керування корпоративними сервісами.'
            },
            {text: 'IAM та Security', roles: ['Security Engineer'], hint: 'Фокус на безпеці.'},
            {text: 'Cloud Identity та доступи', roles: ['Cloud Engineer'], hint: 'Технічна інтеграція користувачів.'},
        ],
    },

    // 9. Лідерство / стратегія
    {
        question: 'Вам потрібно переконати керівництво перейти на хмару. Що зробите?',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        options: [
            {
                text: 'Підготуєте TCO/ROI аналіз',
                roles: ['Cloud Digital Leader', 'Generative AI Leader'],
                hint: 'Аргументи для бізнес-рішень.'
            },
            {
                text: 'Запустите пілотний проект',
                roles: ['Cloud Engineer', 'Startup Cloud Engineer'],
                hint: 'Доказ цінності на практиці.'
            },
            {
                text: 'Проведете воркшоп для технічних команд',
                roles: ['Cloud Architect'],
                hint: 'Технічне навчання команди.'
            },
        ],
    },

    // 10. Крос-функціональне
    {
        question: 'Ви працюєте у проекті, що включає AI, аналіз даних та розробку веб-додатків. Що ваш основний фокус?',
        image: 'https://images.unsplash.com/photo-1537432376769-00a0cbdcd18a',
        options: [
            {
                text: 'AI/ML моделі',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Фокус на машинному навчанні.'
            },
            {
                text: 'Аналітика та візуалізація даних',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'Фокус на даних.'
            },
            {
                text: 'Розробка та деплой веб-застосунків',
                roles: ['Cloud Developer', 'API Developer'],
                hint: 'Фокус на розробці.'
            },
            {
                text: 'Архітектура та масштабованість',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Фокус на інфраструктурі.'
            },
        ],
    },
    // 11. Девелопмент / API
    {
        question: 'Ви хочете автоматизувати обробку даних через API. Який сервіс GCP оберете?',
        image: 'https://images.unsplash.com/photo-1591696331110-5f1f920e6c05',
        options: [
            {
                text: 'Cloud Functions + Pub/Sub',
                roles: ['Cloud Developer', 'API Developer'],
                hint: 'Serverless автоматизація.'
            },
            {
                text: 'Cloud Run + API Gateway',
                roles: ['Cloud Developer', 'API Developer', 'Cloud Architect'],
                hint: 'Архітектурне рішення для масштабованих API.'
            },
            {text: 'Compute Engine', roles: ['Cloud Engineer'], hint: 'Більше контролю, довше налаштування.'},
        ],
    },

// 12. Дані та аналітика
    {
        question: 'Потрібно інтегрувати дані з різних джерел для аналітики.',
        image: 'https://images.unsplash.com/photo-1581093588401-ec5b0c70f2de',
        options: [
            {text: 'Cloud Dataflow', roles: ['Data Engineer'], hint: 'Потокова та пакетна обробка даних.'},
            {
                text: 'BigQuery',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'SQL-аналітика на великих обсягах даних.'
            },
            {text: 'Firestore', roles: ['Cloud Developer'], hint: 'NoSQL база для застосунків.'},
            {text: 'Cloud Storage', roles: ['Cloud Engineer'], hint: 'Сховище для необроблених даних.'},
        ],
    },

// 13. Архітектура та інфраструктура
    {
        question: 'Ви проектуєте хмарну архітектуру для глобального застосунку.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        options: [
            {
                text: 'Hybrid Multi-Cloud Architecture',
                roles: ['Hybrid and Multi-Cloud Architect', 'Cloud Architect'],
                hint: 'Комбіноване рішення для кількох хмар.'
            },
            {
                text: 'GKE + Global Load Balancer',
                roles: ['Cloud Engineer', 'Cloud Architect'],
                hint: 'Масштабованість через контейнери.'
            },
            {text: 'App Engine Standard', roles: ['Cloud Developer'], hint: 'Швидкий деплой, але обмежена гнучкість.'},
        ],
    },

// 14. Безпека
    {
        question: 'Ваш проект має високі вимоги до безпеки і відповідності GDPR.',
        image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5',
        options: [
            {
                text: 'IAM + VPC Service Controls',
                roles: ['Security Engineer'],
                hint: 'Контроль доступу та захист даних.'
            },
            {
                text: 'Cloud KMS для шифрування',
                roles: ['Security Engineer', 'Cloud Engineer'],
                hint: 'Захист ключів і даних.'
            },
            {
                text: 'Cloud Armor для захисту від атак',
                roles: ['Security Engineer', 'Network Engineer'],
                hint: 'Веб-захист і DDoS.'
            },
        ],
    },

// 15. ML / AI
    {
        question: 'Вам потрібно створити генеративний AI для тексту або зображень.',
        image: 'https://images.unsplash.com/photo-1581091012184-8a6dbd20b38b',
        options: [
            {
                text: 'Vertex AI + Fine-tuning моделей',
                roles: ['Generative AI Leader', 'Machine Learning Engineer'],
                hint: 'Генеративні моделі та навчання на власних даних.'
            },
            {text: 'BigQuery ML', roles: ['Data Analyst', 'Data Engineer'], hint: 'Прості моделі прямо в базі даних.'},
            {text: 'Cloud Functions + AI API', roles: ['Cloud Developer'], hint: 'Інтеграція AI без навчання моделей.'},
        ],
    },

// 16. Стартапи / швидкий розвиток
    {
        question: 'Ваш стартап хоче протестувати нову ідею продукту без великих витрат.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216',
        options: [
            {
                text: 'Serverless (Cloud Run / App Engine)',
                roles: ['Startup Cloud Engineer', 'Cloud Developer'],
                hint: 'Мінімальні витрати на інфраструктуру.'
            },
            {text: 'Compute Engine з VM', roles: ['Cloud Engineer'], hint: 'Більше контролю, але дорожче і довше.'},
            {text: 'Kubernetes Engine', roles: ['Cloud Engineer'], hint: 'Масштабованість для росту.'},
        ],
    },

// 17. Адміністрування
    {
        question: 'Ви керуєте доступом користувачів та сервісами у компанії.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        options: [
            {
                text: 'Google Workspace Admin',
                roles: ['Google Workspace Administrator'],
                hint: 'Керування робочими просторами та користувачами.'
            },
            {text: 'IAM та Security Policies', roles: ['Security Engineer'], hint: 'Безпека і контроль доступу.'},
            {
                text: 'Cloud Identity + Access Management',
                roles: ['Cloud Engineer'],
                hint: 'Технічна інтеграція користувачів.'
            },
        ],
    },

// 18. Лідерство / стратегія
    {
        question: 'Вам потрібно визначити стратегічний напрямок для переходу компанії на хмару.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        options: [
            {
                text: 'Cloud Digital Leader',
                roles: ['Cloud Digital Leader'],
                hint: 'Стратегічне планування і лідерство.'
            },
            {text: 'Generative AI Leader', roles: ['Generative AI Leader'], hint: 'Ініціативи у сфері AI.'},
            {text: 'Cloud Architect', roles: ['Cloud Architect'], hint: 'Архітектура і технічні рішення.'},
        ],
    },

// 19. Дані / аналітика
    {
        question: 'Вам потрібно підготувати звіт для керівництва на основі великих даних.',
        image: 'https://images.unsplash.com/photo-1581092330903-d7f9d5d8c9d5',
        options: [
            {text: 'BigQuery + Data Studio', roles: ['Data Analyst'], hint: 'SQL та візуалізація для бізнесу.'},
            {text: 'Dataflow + BigQuery', roles: ['Data Engineer'], hint: 'Обробка і підготовка даних.'},
            {text: 'Firestore / NoSQL', roles: ['Cloud Developer'], hint: 'Гнучка база для застосунків.'},
        ],
    },

// 20. Крос-функціональне
    {
        question: 'Ваш проект включає веб-додаток, аналітику і AI. Що ваш основний фокус?',
        image: 'https://images.unsplash.com/photo-1537432376769-00a0cbdcd18a',
        options: [
            {
                text: 'AI / ML моделі',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Фокус на машинному навчанні.'
            },
            {text: 'Аналітика даних', roles: ['Data Analyst', 'Data Engineer'], hint: 'Фокус на даних.'},
            {text: 'Розробка веб-додатків', roles: ['Cloud Developer', 'API Developer'], hint: 'Фокус на розробці.'},
            {
                text: 'Архітектура та масштабованість',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Фокус на інфраструктурі.'
            },
        ],
    },
// 21. Девелопмент / API
    {
        question: 'Ви розробляєте мобільний додаток і хочете підключити хмарні сервіси.',
        image: 'https://images.unsplash.com/photo-1581092330793-7b6f874b7f5b',
        options: [
            {
                text: 'Firebase + Firestore',
                roles: ['Cloud Developer', 'Citizen Developer'],
                hint: 'Швидка інтеграція для мобільних застосунків.'
            },
            {
                text: 'Cloud Functions + API Gateway',
                roles: ['Cloud Developer', 'API Developer'],
                hint: 'Створення серверлес API для додатка.'
            },
            {text: 'Compute Engine', roles: ['Cloud Engineer'], hint: 'Повний контроль над сервером.'},
        ],
    },

// 22. Дані та аналітика
    {
        question: 'Ви готуєте аналітику в реальному часі для онлайн-платформи.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981f',
        options: [
            {text: 'Cloud Dataflow', roles: ['Data Engineer'], hint: 'Потокова обробка даних у реальному часі.'},
            {
                text: 'BigQuery Streaming',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'Стримінговий SQL-аналітичний підхід.'
            },
            {text: 'Firestore', roles: ['Cloud Developer'], hint: 'Зберігання даних для застосунку, не аналітика.'},
        ],
    },

// 23. Архітектура та інфраструктура
    {
        question: 'Ви проектуєте багатозонну архітектуру для високої доступності.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        options: [
            {
                text: 'Global Load Balancer + GKE',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Масштабованість і доступність.'
            },
            {
                text: 'Compute Engine VM з резервними копіями',
                roles: ['Cloud Engineer'],
                hint: 'Базова висока доступність.'
            },
            {text: 'App Engine', roles: ['Cloud Developer'], hint: 'Автоматичне масштабування, але менше контролю.'},
        ],
    },

// 24. Безпека
    {
        question: 'Ви хочете обмежити доступ до хмарних сервісів по IP та ролях.',
        image: 'https://images.unsplash.com/photo-1591696331110-5f1f920e6c05',
        options: [
            {
                text: 'VPC Service Controls + IAM',
                roles: ['Security Engineer'],
                hint: 'Контроль доступу та захист мережі.'
            },
            {
                text: 'Cloud Armor',
                roles: ['Security Engineer', 'Network Engineer'],
                hint: 'Захист від атак і фільтрація трафіку.'
            },
            {text: 'KMS + Secret Manager', roles: ['Security Engineer'], hint: 'Шифрування і безпечне сховище ключів.'},
        ],
    },

// 25. ML / AI
    {
        question: 'Вам потрібно автоматично класифікувати великі обсяги текстових документів.',
        image: 'https://images.unsplash.com/photo-1581091012184-8a6dbd20b38b',
        options: [
            {
                text: 'Vertex AI + NLP модель',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Автоматична класифікація документів.'
            },
            {text: 'BigQuery ML', roles: ['Data Analyst', 'Data Engineer'], hint: 'SQL-аналітика з базовим ML.'},
            {text: 'Cloud Functions + AI API', roles: ['Cloud Developer'], hint: 'Інтеграція готових AI сервісів.'},
        ],
    },

// 26. Стартапи / швидкий розвиток
    {
        question: 'Ви хочете швидко протестувати MVP продукту для клієнтів.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216',
        options: [
            {
                text: 'Cloud Run або App Engine',
                roles: ['Startup Cloud Engineer', 'Cloud Developer'],
                hint: 'Швидке впровадження MVP.'
            },
            {text: 'Compute Engine', roles: ['Cloud Engineer'], hint: 'Більше контролю, дорожче і довше.'},
            {
                text: 'Firebase + Firestore',
                roles: ['Cloud Developer', 'Citizen Developer'],
                hint: 'Швидка мобільна інтеграція.'
            },
        ],
    },

// 27. Адміністрування
    {
        question: 'Компанія використовує Google Workspace, потрібно керувати доступом та політиками.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        options: [
            {
                text: 'Google Workspace Admin',
                roles: ['Google Workspace Administrator'],
                hint: 'Керування користувачами та доступами.'
            },
            {
                text: 'IAM та Cloud Identity',
                roles: ['Cloud Engineer', 'Security Engineer'],
                hint: 'Технічне керування доступом.'
            },
            {text: 'Cloud Armor', roles: ['Security Engineer', 'Network Engineer'], hint: 'Захист від атак.'},
        ],
    },

// 28. Лідерство / стратегія
    {
        question: 'Вам потрібно переконати керівництво у вигодах впровадження AI в компанії.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        options: [
            {text: 'Generative AI Leader', roles: ['Generative AI Leader'], hint: 'Стратегія і лідерство у сфері AI.'},
            {
                text: 'Cloud Digital Leader',
                roles: ['Cloud Digital Leader'],
                hint: 'Стратегія впровадження цифрових технологій.'
            },
            {
                text: 'Machine Learning Engineer',
                roles: ['Machine Learning Engineer'],
                hint: 'Технічна реалізація ML моделей.'
            },
        ],
    },

// 29. Дані / аналітика
    {
        question: 'Ви хочете оптимізувати запити SQL для великих таблиць у хмарі.',
        image: 'https://images.unsplash.com/photo-1581092330903-d7f9d5d8c9d5',
        options: [
            {
                text: 'BigQuery + оптимізація SQL',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'SQL-аналітика і оптимізація.'
            },
            {text: 'Dataflow для ETL', roles: ['Data Engineer'], hint: 'Обробка потокових даних.'},
            {text: 'Firestore / NoSQL', roles: ['Cloud Developer'], hint: 'Для гнучких застосунків, не аналітики.'},
        ],
    },

// 30. Крос-функціональне
    {
        question: 'Ви працюєте над проєктом, де одночасно потрібні AI, аналітика та інфраструктура.',
        image: 'https://images.unsplash.com/photo-1537432376769-00a0cbdcd18a',
        options: [
            {
                text: 'AI / ML моделі',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Фокус на ML та AI.'
            },
            {text: 'Аналітика і візуалізація даних', roles: ['Data Analyst', 'Data Engineer'], hint: 'Фокус на даних.'},
            {
                text: 'Інфраструктура та архітектура',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Фокус на масштабованості та надійності.'
            },
            {
                text: 'Розробка веб-додатків',
                roles: ['Cloud Developer', 'API Developer'],
                hint: 'Фокус на коді і сервісах.'
            },
        ],
    },
// 31. Девелопмент / API
    {
        question: 'Ви інтегруєте сторонні сервіси через API для веб-додатку.',
        image: 'https://images.unsplash.com/photo-1581092330793-7b6f874b7f5b',
        options: [
            {
                text: 'API Gateway + Cloud Functions',
                roles: ['API Developer', 'Cloud Developer'],
                hint: 'Керовані серверлес API.'
            },
            {
                text: 'Compute Engine VM',
                roles: ['Cloud Engineer'],
                hint: 'Повний контроль над сервером, довше налаштування.'
            },
            {text: 'App Engine', roles: ['Cloud Developer'], hint: 'Швидкий деплой без управління інфраструктурою.'},
        ],
    },

// 32. Дані / аналітика
    {
        question: 'Потрібно об’єднати дані з CRM та логів застосунків для аналітики.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981f',
        options: [
            {
                text: 'Cloud Dataflow + BigQuery',
                roles: ['Data Engineer'],
                hint: 'ETL та SQL-аналітика для великих даних.'
            },
            {
                text: 'Firestore + Data Studio',
                roles: ['Cloud Developer', 'Data Analyst'],
                hint: 'Малі обсяги даних, візуалізація.'
            },
            {text: 'Cloud Storage', roles: ['Cloud Engineer'], hint: 'Сховище для необроблених даних.'},
        ],
    },

// 33. Архітектура / інфраструктура
    {
        question: 'Ви проектуєте багаторегіональну архітектуру для глобального додатку.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        options: [
            {
                text: 'GKE + Global Load Balancer',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Масштабованість і висока доступність.'
            },
            {
                text: 'Compute Engine + резервні копії',
                roles: ['Cloud Engineer'],
                hint: 'Базова доступність, обмежена автоматизація.'
            },
            {
                text: 'App Engine Standard',
                roles: ['Cloud Developer'],
                hint: 'Автоматичне масштабування, менше контролю.'
            },
        ],
    },

// 34. Безпека
    {
        question: 'Ви хочете контролювати доступ користувачів та сервісів на рівні проектів.',
        image: 'https://images.unsplash.com/photo-1591696331110-5f1f920e6c05',
        options: [
            {
                text: 'IAM + VPC Service Controls',
                roles: ['Security Engineer'],
                hint: 'Розмежування доступу та безпека мережі.'
            },
            {
                text: 'Cloud KMS + Secret Manager',
                roles: ['Security Engineer', 'Cloud Engineer'],
                hint: 'Шифрування ключів та секретів.'
            },
            {
                text: 'Cloud Armor',
                roles: ['Security Engineer', 'Network Engineer'],
                hint: 'Захист від атак на рівні веб-застосунків.'
            },
        ],
    },

// 35. ML / AI
    {
        question: 'Ви хочете створити персоналізовані рекомендації для користувачів.',
        image: 'https://images.unsplash.com/photo-1581091012184-8a6dbd20b38b',
        options: [
            {
                text: 'Vertex AI + Recommendation AI',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Генеративні та рекомендаційні моделі.'
            },
            {text: 'BigQuery ML', roles: ['Data Analyst', 'Data Engineer'], hint: 'SQL-аналітика з базовим ML.'},
            {text: 'Cloud Functions + AI API', roles: ['Cloud Developer'], hint: 'Інтеграція готових ML сервісів.'},
        ],
    },

// 36. Стартапи / швидкий розвиток
    {
        question: 'Ви хочете швидко протестувати MVP з обмеженим бюджетом.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216',
        options: [
            {
                text: 'Cloud Run / App Engine',
                roles: ['Startup Cloud Engineer', 'Cloud Developer'],
                hint: 'Serverless та швидке впровадження.'
            },
            {text: 'Compute Engine', roles: ['Cloud Engineer'], hint: 'Більше контролю, дорожче і довше.'},
            {
                text: 'Firebase + Firestore',
                roles: ['Cloud Developer', 'Citizen Developer'],
                hint: 'Швидка мобільна інтеграція.'
            },
        ],
    },

// 37. Адміністрування
    {
        question: 'Ви адмініструєте користувачів у Google Workspace і налаштовуєте політики безпеки.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        options: [
            {
                text: 'Google Workspace Admin',
                roles: ['Google Workspace Administrator'],
                hint: 'Керування користувачами та політиками.'
            },
            {
                text: 'IAM + Cloud Identity',
                roles: ['Cloud Engineer', 'Security Engineer'],
                hint: 'Технічне управління доступом.'
            },
            {text: 'Cloud Armor', roles: ['Security Engineer', 'Network Engineer'], hint: 'Захист від атак.'},
        ],
    },

// 38. Лідерство / стратегія
    {
        question: 'Ви керуєте впровадженням хмари для великої організації.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        options: [
            {
                text: 'Cloud Digital Leader',
                roles: ['Cloud Digital Leader'],
                hint: 'Стратегія і управління цифровою трансформацією.'
            },
            {text: 'Cloud Architect', roles: ['Cloud Architect'], hint: 'Архітектура і технічна стратегія.'},
            {text: 'Generative AI Leader', roles: ['Generative AI Leader'], hint: 'Ініціативи у сфері AI.'},
        ],
    },

// 39. Дані / аналітика
    {
        question: 'Вам потрібно підготувати дашборд для керівництва.',
        image: 'https://images.unsplash.com/photo-1581092330903-d7f9d5d8c9d5',
        options: [
            {text: 'Data Studio + BigQuery', roles: ['Data Analyst'], hint: 'Візуалізація та аналіз даних.'},
            {text: 'Cloud Dataflow + BigQuery', roles: ['Data Engineer'], hint: 'Підготовка та обробка великих даних.'},
            {text: 'Firestore', roles: ['Cloud Developer'], hint: 'Зберігання даних для застосунків.'},
        ],
    },

// 40. Крос-функціональне
    {
        question: 'Проєкт включає AI, аналітику та веб-розробку. Що ваш фокус?',
        image: 'https://images.unsplash.com/photo-1537432376769-00a0cbdcd18a',
        options: [
            {
                text: 'AI / ML моделі',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Фокус на ML та AI.'
            },
            {text: 'Аналітика і візуалізація даних', roles: ['Data Analyst', 'Data Engineer'], hint: 'Фокус на даних.'},
            {text: 'Розробка веб-додатків', roles: ['Cloud Developer', 'API Developer'], hint: 'Фокус на коді.'},
            {
                text: 'Архітектура та масштабованість',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Фокус на інфраструктурі.'
            },
        ],
    },

// 41. Девелопмент / API
    {
        question: 'Ви хочете забезпечити високодоступний API для мобільного додатку.',
        image: 'https://images.unsplash.com/photo-1581092330793-7b6f874b7f5b',
        options: [
            {
                text: 'Cloud Run + API Gateway',
                roles: ['Cloud Developer', 'API Developer', 'Cloud Architect'],
                hint: 'Масштабований серверлес API.'
            },
            {
                text: 'Compute Engine + NGINX',
                roles: ['Cloud Engineer'],
                hint: 'Повний контроль, але більше налаштувань.'
            },
            {text: 'App Engine', roles: ['Cloud Developer'], hint: 'Швидкий деплой, автоматичне масштабування.'},
        ],
    },

// 42. Дані / аналітика
    {
        question: 'Потрібно обробити потоки даних від IoT пристроїв.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981f',
        options: [
            {text: 'Cloud Dataflow', roles: ['Data Engineer'], hint: 'Потокова обробка даних в реальному часі.'},
            {
                text: 'BigQuery Streaming',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'Стримінг-аналітика для швидких рішень.'
            },
            {text: 'Firestore', roles: ['Cloud Developer'], hint: 'База для додатків, не аналітики.'},
        ],
    },

// 43. Архітектура / інфраструктура
    {
        question: 'Ви плануєте архітектуру для глобальної e-commerce платформи.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        options: [
            {
                text: 'GKE + Load Balancer + CDN',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Глобальна масштабованість і доставка контенту.'
            },
            {text: 'Compute Engine + VM', roles: ['Cloud Engineer'], hint: 'Базова архітектура, довше розгортання.'},
            {text: 'App Engine', roles: ['Cloud Developer'], hint: 'Швидкий деплой без контролю інфраструктури.'},
        ],
    },

// 44. Безпека
    {
        question: 'Вам потрібно забезпечити відповідність ISO та GDPR.',
        image: 'https://images.unsplash.com/photo-1591696331110-5f1f920e6c05',
        options: [
            {
                text: 'IAM + VPC Service Controls + Audit Logs',
                roles: ['Security Engineer'],
                hint: 'Контроль доступу та аудит.'
            },
            {
                text: 'Cloud KMS + Secret Manager',
                roles: ['Security Engineer', 'Cloud Engineer'],
                hint: 'Шифрування та зберігання секретів.'
            },
            {
                text: 'Cloud Armor',
                roles: ['Security Engineer', 'Network Engineer'],
                hint: 'Захист від атак і фільтрація трафіку.'
            },
        ],
    },

// 45. ML / AI
    {
        question: 'Ви хочете створити AI чатбота для клієнтської підтримки.',
        image: 'https://images.unsplash.com/photo-1581091012184-8a6dbd20b38b',
        options: [
            {
                text: 'Dialogflow + Vertex AI',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Створення інтелектуальних чатботів.'
            },
            {text: 'Cloud Functions + AI API', roles: ['Cloud Developer'], hint: 'Інтеграція готових AI сервісів.'},
            {
                text: 'BigQuery ML',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'Прості аналітичні моделі, не чатбот.'
            },
        ],
    },

// 46. Стартапи / швидкий розвиток
    {
        question: 'Ваш стартап хоче швидко масштабувати MVP.',
        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216',
        options: [
            {
                text: 'Cloud Run + Managed Databases',
                roles: ['Startup Cloud Engineer', 'Cloud Developer'],
                hint: 'Швидка масштабованість без управління інфраструктурою.'
            },
            {
                text: 'Compute Engine + Kubernetes',
                roles: ['Cloud Engineer'],
                hint: 'Більше контролю, довше впровадження.'
            },
            {
                text: 'Firebase + Firestore',
                roles: ['Cloud Developer', 'Citizen Developer'],
                hint: 'Швидка інтеграція для MVP.'
            },
        ],
    },

// 47. Адміністрування
    {
        question: 'Ви адмініструєте корпоративні користувачі та політики безпеки.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        options: [
            {
                text: 'Google Workspace Admin',
                roles: ['Google Workspace Administrator'],
                hint: 'Управління корпоративними користувачами та доступами.'
            },
            {
                text: 'IAM + Cloud Identity',
                roles: ['Cloud Engineer', 'Security Engineer'],
                hint: 'Технічне управління доступом і безпекою.'
            },
            {text: 'Cloud Armor', roles: ['Security Engineer', 'Network Engineer'], hint: 'Захист від атак.'},
        ],
    },

// 48. Лідерство / стратегія
    {
        question: 'Ви визначаєте дорожню карту впровадження хмарних технологій у компанії.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        options: [
            {
                text: 'Cloud Digital Leader',
                roles: ['Cloud Digital Leader'],
                hint: 'Стратегія і управління цифровою трансформацією.'
            },
            {text: 'Cloud Architect', roles: ['Cloud Architect'], hint: 'Технічна архітектура і планування.'},
            {text: 'Generative AI Leader', roles: ['Generative AI Leader'], hint: 'Стратегія у сфері AI.'},
        ],
    },

// 49. Дані / аналітика
    {
        question: 'Ви хочете виявити закономірності в історичних даних користувачів.',
        image: 'https://images.unsplash.com/photo-1581092330903-d7f9d5d8c9d5',
        options: [
            {text: 'BigQuery + Data Studio', roles: ['Data Analyst'], hint: 'Візуалізація та аналітика.'},
            {text: 'Dataflow + BigQuery', roles: ['Data Engineer'], hint: 'Обробка потоків та підготовка даних.'},
            {text: 'Firestore / NoSQL', roles: ['Cloud Developer'], hint: 'Для гнучких додатків, не аналітики.'},
        ],
    },

// 50. Крос-функціональне
    {
        question: 'Проєкт включає AI, аналітику та розробку. Ваш основний фокус?',
        image: 'https://images.unsplash.com/photo-1537432376769-00a0cbdcd18a',
        options: [
            {
                text: 'AI / ML моделі',
                roles: ['Machine Learning Engineer', 'Generative AI Leader'],
                hint: 'Фокус на ML і AI.'
            },
            {
                text: 'Аналітика та візуалізація даних',
                roles: ['Data Analyst', 'Data Engineer'],
                hint: 'Фокус на даних.'
            },
            {text: 'Розробка веб-додатків', roles: ['Cloud Developer', 'API Developer'], hint: 'Фокус на коді.'},
            {
                text: 'Архітектура та масштабованість',
                roles: ['Cloud Architect', 'Cloud Engineer'],
                hint: 'Фокус на інфраструктурі.'
            },
        ],
    },

];

// const allRoles: string[] = [
//     'API Developer',
//     'Citizen Developer',
//     'Cloud Digital Leader',
//     'Cloud Engineer',
//     'Cloud Architect',
//     'Cloud Developer',
//     'Contact Center Engineer',
//     'Data Analyst',
//     'Data Engineer',
//     'Database Engineer',
//     'DevOps Engineer',
//     'Google Workspace Administrator',
//     'Hybrid and Multi-Cloud Architect',
//     'Machine Learning Engineer',
//     'Network Engineer',
//     'Security Engineer',
//     'Startup Cloud Engineer',
//     'Generative AI Leader',
// ];

export default function GcpRoleQuiz() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<Record<string, number> | null>(null);

    // При завантаженні сторінки перевіряємо URL
    useEffect(() => {
        const encodedResult = searchParams.get('result');
        if (encodedResult) {
            try {
                const decoded: Record<string, number> = JSON.parse(atob(encodedResult));
                setResult(decoded);
            } catch (e) {
                console.error('Помилка декодування результату', e);
            }
        }
    }, [searchParams]);

    const handleAnswer = (roles: string[]) => {
        const updatedAnswers = [...answers, ...roles];
        setAnswers(updatedAnswers);

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            calculateResult(updatedAnswers);
        }
    };

    const calculateResult = (roles: string[]) => {
        const counts: Record<string, number> = {};
        roles.forEach((r) => {
            counts[r] = (counts[r] || 0) + 1;
        });
        setResult(counts);

        // Зберігаємо результат у URL
        const encoded = btoa(JSON.stringify(counts));
        router.replace(`?result=${encoded}`);
    };

    if (result) {
        const labels = Object.keys(result);
        const data = Object.values(result);

        const chartData = {
            labels,
            datasets: [
                {
                    label: 'Ваші бали по ролях',
                    data,
                    backgroundColor: 'rgba(99, 102, 241, 0.7)',
                },
            ],
        };

        return (
            <div className="max-w-2xl mx-auto p-6">
                <motion.h1 className="text-2xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    🎉 Вітаємо з завершенням тесту!
                </motion.h1>
                <p className="mb-6 text-gray-700">
                    Нижче показано, до яких GCP ролей ви найбільше підходите. Використовуйте це для орієнтації у кар’єрі.
                </p>
                <Bar data={chartData} />
            </div>
        );
    }

    const q = questions[current];
    const progress = Math.round(((current + 1) / questions.length) * 100);

    return (
        <div className="max-w-xl mx-auto p-6">
            <motion.h1 className="text-3xl font-bold mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                GCP Career Quiz
            </motion.h1>

            {/* Прогресбар */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div className="bg-blue-500 h-4 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-sm text-gray-600 mb-4">
                Питання {current + 1} з {questions.length}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 border rounded-2xl shadow-lg bg-white"
                >
                    <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
                    <div className="mb-4 overflow-hidden rounded-lg">
                        <AppImage src={q.image} alt="quiz" width={400} height={200} className="w-full object-cover" />
                    </div>
                    <div className="space-y-3">
                        {q.options.map((opt, i) => (
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                key={i}
                                onClick={() => handleAnswer(opt.roles)}
                                className="w-full text-left p-4 rounded-lg border shadow-sm hover:bg-gray-50"
                            >
                                <div className="font-medium">{opt.text}</div>
                                <div className="text-sm text-gray-500">{opt.hint}</div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}