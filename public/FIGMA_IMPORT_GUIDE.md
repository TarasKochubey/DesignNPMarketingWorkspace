# 📐 Інструкція з імпорту UI Kit в Figma

## 🎯 Мета
Ця інструкція допоможе вам швидко створити дизайн-систему NovaPay у Figma на основі готового UI Kit.

---

## 📦 Файли для завантаження

В директорії `/public/` ви знайдете:

1. **`novapay-ui-kit-template.html`** — готовий HTML шаблон з усіма компонентами (відкрийте в браузері)
2. **`novapay-ui-kit-colors.csv`** — CSV файл з кольорами для імпорту в Figma
3. Цей файл — **`FIGMA_IMPORT_GUIDE.md`** (інструкція)

---

## 🚀 Покроковий процес

### Крок 1: Імпорт кольорів у Figma

#### Варіант A: Використання плагіна (рекомендовано)

1. Завантажте файл `novapay-ui-kit-colors.csv` на свій комп'ютер
2. У Figma відкрийте **Plugins → Find more plugins**
3. Встановіть плагін **"Variables Importer"** або **"CSV to Figma Variables"**
4. Запустіть плагін та імпортуйте CSV файл
5. Перевірте, що створилася колекція "NovaPay Colors" зі всіма змінними

#### Варіант B: Створення вручну

1. У Figma натисніть правою кнопкою на канвасі → **Variables**
2. Створіть нову колекцію **"NovaPay Colors"**
3. Додайте змінні згідно з таблицею:

```
Collection: NovaPay Colors
Mode: Default

Purple:
- purple/50:  #faf5ff
- purple/100: #f3e8ff
- purple/200: #e9d5ff
- purple/600: #9333ea (Primary)
- purple/700: #7e22ce (Hover)
- purple/800: #6b21a8 (Pressed)

Green (Власні кошти):
- green/50:  #f0fdf4
- green/100: #dcfce7
- green/500: #22c55e
- green/600: #16a34a
- green/700: #15803d
- green/800: #166534

Orange (Кредитні кошти):
- orange/50:  #fff7ed
- orange/100: #ffedd5
- orange/500: #f97316
- orange/600: #ea580c
- orange/700: #c2410c
- orange/800: #9a3412

Gray (Нейтральні):
- gray/50:  #f9fafb (Фон сторінки)
- gray/100: #f3f4f6 (Hover)
- gray/200: #e5e7eb (Бордер)
- gray/300: #d1d5db (Бордер середній)
- gray/600: #4b5563 (Текст вторинний)
- gray/700: #374151 (Текст основний)
- gray/900: #111827 (Заголовки)

Semantic:
- blue/50:   #eff6ff
- blue/500:  #3b82f6
- red/50:    #fef2f2
- red/500:   #ef4444
- yellow/50: #fefce8
- yellow/500: #eab308
```

---

### Крок 2: Створення Text Styles

1. У Figma створіть текстовий об'єкт (натисніть `T`)
2. У правій панелі натисніть на іконку "Type settings" (4 крапки) → **Create style**
3. Створіть наступні стилі:

#### Заголовки
- **Heading/H1**: 36px, Bold (700), Gray-900 (#111827)
- **Heading/H2**: 30px, Bold (700), Gray-900
- **Heading/H3**: 24px, Bold (700), Gray-900
- **Heading/H4**: 20px, Semibold (600), Gray-900

#### Текст
- **Body/Regular**: 16px, Regular (400), Gray-700 (#374151)
- **Body/Medium**: 16px, Medium (500), Gray-900
- **Small/Regular**: 14px, Regular (400), Gray-600 (#4b5563)
- **Small/Medium**: 14px, Medium (500), Gray-700
- **Extra Small**: 12px, Regular (400), Gray-500 (#6b7280)

---

### Крок 3: Відкрийте HTML шаблон

1. Знайдіть файл **`novapay-ui-kit-template.html`** у директорії `/public/`
2. Відкрийте його у браузері (подвійний клік або правий клік → Open with → Chrome/Firefox)
3. Ви побачите повноцінний UI Kit з усіма компонентами

**Опції використання:**
- 📸 **Зробіть скріншоти** окремих секцій для референсів
- 🖨️ **Роздрукуйте у PDF** (кнопка внизу справа або Ctrl+P)
- 👁️ **Використовуйте як візуальний референс** при створенні компонентів

---

### Крок 4: Створення компонентів у Figma

#### 4.1 Кнопки (Buttons)

1. Створіть прямокутник з **Auto Layout** (Shift+A)
2. Параметри:
   - **Padding**: 10px вертикально, 24px горизонтально
   - **Border Radius**: 8px
   - **Height**: 40px (auto при padding)
   - **Font**: 16px Medium

3. Створіть варіанти:
   - **Primary**: bg → purple/600 (#9333ea), text → white
   - **Secondary**: bg → white, border → 1px gray/300, text → gray/700
   - **Success**: bg → green/600, text → white
   - **Danger**: bg → red/600, text → white

4. Додайте стани (використовуйте **Variants**):
   - **Default** (базовий стан)
   - **Hover** (змініть bg на purple/700 для Primary)
   - **Disabled** (opacity 50%, cursor not-allowed)

5. Збережіть як компонент: **Ctrl/Cmd + Alt + K** → назвіть "Button"

#### 4.2 Input Fields

1. Створіть прямокутник з **Auto Layout**
2. Параметри:
   - **Padding**: 10px вертикально, 16px горизонтально
   - **Border**: 1px solid gray/300 (#d1d5db)
   - **Border Radius**: 8px
   - **Font**: 16px Regular, Gray-700

3. Створіть варіанти:
   - **Default**: border gray/300
   - **Focus**: border purple/600, shadow 0 0 0 3px rgba(147, 51, 234, 0.1)
   - **Error**: border red/500, bg red/50
   - **Disabled**: bg gray/100, cursor not-allowed

4. Додайте label:
   - **Font**: 14px Medium, Gray-700
   - **Spacing**: 8px між label і input

#### 4.3 Cards

1. Створіть прямокутник з **Auto Layout**
2. Параметри:
   - **Padding**: 24px
   - **Border**: 1px solid gray/200
   - **Border Radius**: 12px
   - **Background**: white
   - **Shadow**: опціонально (0 1px 3px rgba(0,0,0,0.1))

3. Варіанти:
   - **Default**: білий фон
   - **Colored**: bg purple/50, border purple/200
   - **Hover**: додайте shadow-lg

#### 4.4 Badges

1. Створіть текст з **Auto Layout**
2. Параметри:
   - **Padding**: 6px вертикально, 12px горизонтально
   - **Border Radius**: 9999px (rounded-full)
   - **Font**: 14px Medium

3. Варіанти статусів:
   - **Draft**: bg gray/100, text gray/700
   - **Scheduled**: bg blue/100, text blue/700
   - **Active**: bg green/100, text green/700
   - **Paused**: bg yellow/100, text yellow/700
   - **Ended**: bg red/100, text red/700

---

### Крок 5: Організація структури

Створіть наступну структуру фреймів:

```
📁 NovaPay Design System
  ├── 🎨 01 — Colors
  │   ├── Primary (Purple)
  │   ├── Success (Green)
  │   ├── Warning (Orange)
  │   └── Neutral (Gray)
  │
  ├── 📝 02 — Typography
  │   ├── Headings
  │   └── Body Text
  │
  ├── 🔘 03 — Buttons
  │   ├── Primary
  │   ├── Secondary
  │   └── Success/Danger
  │
  ├── 📋 04 — Form Elements
  │   ├── Inputs
  │   ├── Textarea
  │   ├── Select
  │   └── Checkbox/Radio
  │
  ├── 🃏 05 — Cards
  │
  ├── 🏷️ 06 — Badges & Tags
  │
  └── 🧩 07 — Components Library
      └── (ваші готові компоненти)
```

---

## 💡 Додаткові поради

### Використання Dev Mode у Figma

Після створення компонентів:
1. Увімкніть **Dev Mode** (справа вгорі)
2. Додайте посилання на інтерактивний UI Kit: `/dev-ui-kit`
3. Розробники зможуть копіювати Tailwind класи безпосередньо з додатку

### Плагіни Figma, які можуть допомогти

- **Variables Importer** — імпорт CSV з кольорами
- **Tailwind CSS** — генерація Tailwind класів
- **Figma to Code** — експорт компонентів у React
- **Auto Layout** — автоматичне додавання Auto Layout

### Експорт з Figma

Коли створите компоненти:
1. Виберіть фрейм
2. **File → Export → SVG** (для векторів)
3. **File → Export → PNG 2x** (для растрових зображень)
4. Або використовуйте **Dev Mode → Inspect** для копіювання CSS

---

## 🔗 Корисні посилання

- **Інтерактивний UI Kit**: [http://localhost:5173/dev-ui-kit](http://localhost:5173/dev-ui-kit)
- **HTML шаблон**: `/public/novapay-ui-kit-template.html`
- **CSV з кольорами**: `/public/novapay-ui-kit-colors.csv`
- **Tailwind CSS документація**: https://tailwindcss.com/docs
- **Figma Variables**: https://help.figma.com/hc/en-us/articles/15339657135383

---

## ❓ FAQ

**Q: Чи можна імпортувати HTML безпосередньо в Figma?**  
A: На жаль, Figma не підтримує прямий імпорт HTML. Використовуйте HTML як візуальний референс або робіть скріншоти окремих секцій.

**Q: Чи потрібно створювати всі компоненти вручну?**  
A: Так, але це забезпечить максимальну гнучкість і повний контроль над дизайном. Використовуйте HTML шаблон як точний референс.

**Q: Де взяти іконки?**  
A: Використовуйте плагін **Lucide Icons** у Figma або завантажте SVG з https://lucide.dev/icons/

**Q: Як синхронізувати зміни між Figma і кодом?**  
A: Використовуйте **Figma Dev Mode** для передачі специфікацій розробникам. Всі класи Tailwind доступні в інтерактивному UI Kit (`/dev-ui-kit`).

---

## ✅ Чеклист готовності

- [ ] Імпортовано всі кольори як Variables
- [ ] Створено всі Text Styles
- [ ] Створено компоненти кнопок з Variants
- [ ] Створено компоненти Input Fields
- [ ] Створено компоненти Cards
- [ ] Створено Badges для статусів
- [ ] Організовано структуру фреймів
- [ ] Додано посилання на інтерактивний UI Kit
- [ ] Протестовано експорт компонентів

---

**🎉 Готово! Тепер у вас є повноцінна дизайн-система NovaPay у Figma!**

Якщо виникнуть питання — звертайтеся до інтерактивного UI Kit у додатку: `/dev-ui-kit`
