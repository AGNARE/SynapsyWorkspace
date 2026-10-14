# Карта работ UX/UI

Источник статусов — GitHub Issues репозитория `Software-Engineering-KSTU/synapse`.
Таблица обновляется вместе с артефактами: закрыл задачу — обновил строку.

## 1. Задачи UX/UI

| Issue | Задача | Исполнитель | Артефакт в репозитории | Статус |
|---|---|---|---|---|
| [#1](https://github.com/Software-Engineering-KSTU/synapse/issues/1) | Проектирование и дизайн-прототипирование интерфейсов | AGNARE | `pages/01-overview` … `pages/17-archive` | закрыт 05.10 |
| [#5](https://github.com/Software-Engineering-KSTU/synapse/issues/5) | Брендборд продукта, реализация логотипа | AGNARE | [BRAND.md](BRAND.md), `logo-mark.svg`, `synapse-brandboard.svg` | закрыт 09.10 |
| [#7](https://github.com/Software-Engineering-KSTU/synapse/issues/7) | Онбординг тиммейта в UX/UI | AGNARE | [README.md](README.md), [RULES.md](RULES.md) | закрыт 09.10 |
| [#2](https://github.com/Software-Engineering-KSTU/synapse/issues/2) | Поиск референсов и эксперимент с дизайном | AGNARE | [AUDIT.md](AUDIT.md), раздел 2 | в работе |
| [#8](https://github.com/Software-Engineering-KSTU/synapse/issues/8) | Обновление логотипа на Synapse Workspace | icpcos86-oss | [BRAND.md](BRAND.md), раздел 2 | в работе |
| [#3](https://github.com/Software-Engineering-KSTU/synapse/issues/3) | Прототип UX/UI модуля AI-ассистента | icpcos86-oss | Figma (внешний файл) | в работе |

## 2. Смежные задачи (не UX/UI, для контекста)

| Issue | Задача | Исполнитель | Статус |
|---|---|---|---|
| [#4](https://github.com/Software-Engineering-KSTU/synapse/issues/4) | UML: диаграмма вариантов использования | bakai4eg | в работе — `docs/human_docs/use_case.md` |
| [#9](https://github.com/Software-Engineering-KSTU/synapse/issues/9) | Activity Diagram | gugvuv | в работе — картинка только в issue |
| [#6](https://github.com/Software-Engineering-KSTU/synapse/issues/6) | Docker Compose + PostgreSQL/pgvector + SQLAlchemy | bakai4eg | в работе — ветка `feat/docker-postgres-pgvector` |

## 3. Команда

| Участник | Зона ответственности | Артефакты в репозитории |
|---|---|---|
| AGNARE (Арген Багылов) | UX/UI: аудит, дизайн-система, экраны, брендборд | `docs/ux-ui/**` |
| icpcos86-oss (Нурсултан) | UX/UI: модуль AI-ассистента, логотип | внешний Figma-файл, [BRAND.md](BRAND.md) |
| Atif-back | Бэкенд: каркас, workspaces/users API, ребрендинг | `backend/**` |
| bakai4eg | Бэкенд: БД и pgvector; UML-диаграммы | `backend/**`, `docs/human_docs/**` |
| Elli | Фронтенд: Vite + React, каркас, роутинг | `frontend/**` |
| bbbbaktygul | Фронтенд: README, состав команды | `frontend/README.md` |
| gugvuv | Диаграммы: Activity Diagram | issue #9 |

## 4. Правила ведения

- Один артефакт — одна строка таблицы со ссылкой на issue.
- Ветка называется по задаче: `feat/ux-ui-*`, `docs/ux-ui-*`.
- Коммит содержит `Refs #N` или `Closes #N`.
- Pull request не мержится без ревью второго участника UX/UI.
