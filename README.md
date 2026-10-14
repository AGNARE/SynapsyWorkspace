# Synapse Workspace - UX-UI

Макеты интерфейса и описания к ним: экраны, модальные окна, состояния и сводные листы.
Все макеты — в Figma.

**Figma:** [Synapse Workspace](https://www.figma.com/design/eBMHOPmJtHXVp1gBuSu2NP/Synapse-Workspace?node-id=2-2&p=f&t=hhLlpBMo5HTur3SR-0)

## Раскладка

```
docs/ux-ui/
├── pages/         19 экранов: вход, выбор пространства и 17 разделов
├── modals/        13 модальных окон
├── brand/         знак, брендборд, пример знака в сайдбаре
├── TASKS.md       что сделано и что осталось
└── README.md      что внутри, с чего начать и журнал работы

synapse-figma-modals/    те же 13 окон одним набором — перетаскивать в Figma
synapse-figma-states/    12 состояний: пустые, загрузка, ошибки, роли, модули
synapse-figma-sheets/    два сводных листа: дизайн-система и карта потоков
synapse-figma-plugin/    плагин: собирает компоненты в Figma за один запуск
```

Каждый экран и каждое окно — отдельная папка: внутри описание, сам макет
и изображение для быстрого просмотра.

## С чего начать

1. [docs/ux-ui/README.md](docs/ux-ui/README.md) — что внутри, с чего начать и журнал работы.
2. [pages/01-overview/01-overview.md](docs/ux-ui/pages/01-overview/01-overview.md) — пример описания экрана.
3. [modals/m05-archive-workspace/m05-archive-workspace.md](docs/ux-ui/modals/m05-archive-workspace/m05-archive-workspace.md) — пример описания окна.
4. [synapse-figma-plugin](synapse-figma-plugin/README.md) — как собрать компоненты в Figma.

## Архивы

Для загрузки одним файлом, без скачивания по одному:

| Архив | Что внутри |
|---|---|
| `synapse-figma-modals.zip` | 13 модальных окон с превью |
| `synapse-figma-states.zip` | 12 состояний с превью |
| `synapse-figma-sheets.zip` | 2 сводных листа с превью |
| `synapse-figma-plugin.zip` | плагин сборки компонентов |

Экраны размещены в `docs/ux-ui/pages` — по одному на папку.
