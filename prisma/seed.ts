import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.testResult.deleteMany();
  await prisma.question.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();

  const math = await prisma.subject.create({
    data: { name: "Математика", slug: "math", icon: "📐" },
  });

  const logic = await prisma.subject.create({
    data: { name: "Логика", slug: "logic", icon: "🧩" },
  });

  // === МАТЕМАТИКА ===

  const fractions = await prisma.topic.create({
    data: {
      name: "Дроби", order: 1, subjectId: math.id,
      theory: `# Дроби\n\n## Что такое дробь?\nДробь — это часть целого числа. Записывается как **a/b**, где:\n- **a** — числитель (сколько частей взяли)\n- **b** — знаменатель (на сколько частей разделили)\n\n## Сложение дробей\nЕсли знаменатели одинаковые: **a/c + b/c = (a+b)/c**\n\nЕсли разные — приводим к общему знаменателю:\n**1/2 + 1/3 = 3/6 + 2/6 = 5/6**\n\n## Умножение дробей\n**a/b × c/d = (a×c)/(b×d)**\n\nПример: **2/3 × 3/4 = 6/12 = 1/2**\n\n## Деление дробей\nДелим = умножаем на перевёрнутую дробь:\n**a/b ÷ c/d = a/b × d/c**`,
    },
  });

  await prisma.question.createMany({
    data: [
      { text: "Чему равно 1/2 + 1/3?", options: JSON.stringify(["2/5", "5/6", "1/5", "3/6"]), answer: 1, topicId: fractions.id },
      { text: "Чему равно 3/4 - 1/4?", options: JSON.stringify(["2/4", "1/2", "2/8", "3/4"]), answer: 1, topicId: fractions.id },
      { text: "Чему равно 2/5 × 5/6?", options: JSON.stringify(["10/30", "1/3", "7/11", "2/6"]), answer: 1, topicId: fractions.id },
      { text: "Какая дробь больше: 3/4 или 2/3?", options: JSON.stringify(["3/4", "2/3", "Равны", "Нельзя сравнить"]), answer: 0, topicId: fractions.id },
      { text: "Приведите дробь 6/8 к несократимому виду:", options: JSON.stringify(["3/4", "2/3", "6/8", "1/2"]), answer: 0, topicId: fractions.id },
      { text: "Чему равно 1/4 + 2/4 + 1/4?", options: JSON.stringify(["4/4", "1", "3/4", "4/12"]), answer: 2, topicId: fractions.id },
      { text: "Чему равно 5/6 ÷ 1/3?", options: JSON.stringify(["5/18", "5/2", "15/6", "2/5"]), answer: 1, topicId: fractions.id },
    ],
  });

  const equations = await prisma.topic.create({
    data: {
      name: "Уравнения", order: 2, subjectId: math.id,
      theory: `# Уравнения\n\n## Что такое уравнение?\nУравнение — это равенство с неизвестным числом (обычно **x**).\n\n## Как решать?\n1. Перенести x в одну сторону, числа — в другую\n2. При переносе через «=» знак меняется на противоположный\n3. Найти x\n\n## Примеры\n**x + 5 = 12** → x = 12 - 5 → **x = 7**\n\n**3x = 15** → x = 15 ÷ 3 → **x = 5**\n\n**2x + 3 = 11** → 2x = 11 - 3 → 2x = 8 → **x = 4**\n\n## Проверка\nПодставь найденный x обратно в уравнение. Если обе части равны — ответ верный!`,
    },
  });

  await prisma.question.createMany({
    data: [
      { text: "Решите: x + 7 = 15", options: JSON.stringify(["7", "8", "22", "9"]), answer: 1, topicId: equations.id },
      { text: "Решите: 3x = 24", options: JSON.stringify(["6", "7", "8", "21"]), answer: 2, topicId: equations.id },
      { text: "Решите: 2x + 5 = 17", options: JSON.stringify(["5", "6", "7", "11"]), answer: 1, topicId: equations.id },
      { text: "Решите: x - 9 = 4", options: JSON.stringify(["5", "13", "14", "-5"]), answer: 1, topicId: equations.id },
      { text: "Решите: 5x - 10 = 20", options: JSON.stringify(["2", "4", "6", "10"]), answer: 2, topicId: equations.id },
      { text: "Решите: x/4 = 8", options: JSON.stringify(["2", "12", "32", "4"]), answer: 2, topicId: equations.id },
      { text: "Решите: 7 + 2x = 21", options: JSON.stringify(["14", "7", "28", "5"]), answer: 1, topicId: equations.id },
    ],
  });

  const geometry = await prisma.topic.create({
    data: {
      name: "Геометрия", order: 3, subjectId: math.id,
      theory: `# Геометрия\n\n## Периметр\nПериметр — сумма длин всех сторон фигуры.\n\n- **Квадрат:** P = 4a\n- **Прямоугольник:** P = 2(a + b)\n- **Треугольник:** P = a + b + c\n\n## Площадь\n- **Квадрат:** S = a²\n- **Прямоугольник:** S = a × b\n- **Треугольник:** S = (a × h) / 2\n\n## Углы\n- **Острый угол:** меньше 90°\n- **Прямой угол:** ровно 90°\n- **Тупой угол:** больше 90° и меньше 180°\n- Сумма углов треугольника = **180°**`,
    },
  });

  await prisma.question.createMany({
    data: [
      { text: "Периметр квадрата со стороной 5 см равен:", options: JSON.stringify(["15 см", "20 см", "25 см", "10 см"]), answer: 1, topicId: geometry.id },
      { text: "Площадь прямоугольника 6×4 см равна:", options: JSON.stringify(["10 см²", "20 см²", "24 см²", "48 см²"]), answer: 2, topicId: geometry.id },
      { text: "Сумма углов треугольника равна:", options: JSON.stringify(["90°", "180°", "270°", "360°"]), answer: 1, topicId: geometry.id },
      { text: "Если два угла треугольника 60° и 80°, третий угол:", options: JSON.stringify(["20°", "40°", "60°", "100°"]), answer: 1, topicId: geometry.id },
      { text: "Площадь квадрата со стороной 7 см:", options: JSON.stringify(["14 см²", "28 см²", "49 см²", "21 см²"]), answer: 2, topicId: geometry.id },
      { text: "Периметр прямоугольника 8×3 см:", options: JSON.stringify(["11 см", "22 см", "24 см", "16 см"]), answer: 1, topicId: geometry.id },
    ],
  });

  // === ЛОГИКА ===

  const sequences = await prisma.topic.create({
    data: {
      name: "Последовательности", order: 1, subjectId: logic.id,
      theory: `# Последовательности\n\n## Что такое последовательность?\nПоследовательность — это ряд чисел, расположенных по определённому правилу.\n\n## Арифметическая последовательность\nКаждый следующий элемент получается прибавлением одного и того же числа.\n\n**Пример:** 2, 5, 8, 11, 14, ... (прибавляем 3)\n\n## Геометрическая последовательность\nКаждый следующий элемент получается умножением на одно и то же число.\n\n**Пример:** 3, 6, 12, 24, 48, ... (умножаем на 2)\n\n## Как найти закономерность?\n1. Посмотри на разницу между соседними числами\n2. Если разница одинаковая — это арифметическая\n3. Если отношение одинаковое — это геометрическая\n4. Бывают и более сложные правила!`,
    },
  });

  await prisma.question.createMany({
    data: [
      { text: "Продолжите: 2, 4, 6, 8, ...", options: JSON.stringify(["9", "10", "12", "11"]), answer: 1, topicId: sequences.id },
      { text: "Продолжите: 1, 3, 9, 27, ...", options: JSON.stringify(["36", "54", "81", "63"]), answer: 2, topicId: sequences.id },
      { text: "Продолжите: 5, 10, 15, 20, ...", options: JSON.stringify(["22", "24", "25", "30"]), answer: 2, topicId: sequences.id },
      { text: "Продолжите: 1, 1, 2, 3, 5, 8, ...", options: JSON.stringify(["10", "11", "12", "13"]), answer: 3, topicId: sequences.id },
      { text: "Продолжите: 100, 90, 80, 70, ...", options: JSON.stringify(["65", "50", "60", "55"]), answer: 2, topicId: sequences.id },
      { text: "Какое число пропущено: 3, 6, __, 12, 15?", options: JSON.stringify(["7", "8", "9", "10"]), answer: 2, topicId: sequences.id },
      { text: "Продолжите: 2, 6, 18, 54, ...", options: JSON.stringify(["72", "108", "162", "216"]), answer: 2, topicId: sequences.id },
    ],
  });

  const patterns = await prisma.topic.create({
    data: {
      name: "Закономерности", order: 2, subjectId: logic.id,
      theory: `# Закономерности\n\n## Что такое закономерность?\nЗакономерность — это правило, по которому изменяются объекты или числа.\n\n## Типы закономерностей\n1. **Числовые** — находим правило для чисел\n2. **Фигурные** — находим правило для фигур и рисунков\n3. **Буквенные** — находим правило для букв\n\n## Как решать задачи на закономерности?\n1. Внимательно посмотри на все элементы\n2. Найди, что меняется между ними\n3. Определи правило изменения\n4. Примени правило, чтобы найти ответ\n\n## Примеры\n- В ряду 1, 4, 9, 16, 25 — это квадраты чисел: 1², 2², 3², 4², 5²\n- В ряду A, C, E, G — буквы через одну`,
    },
  });

  await prisma.question.createMany({
    data: [
      { text: "Найдите закономерность: 1, 4, 9, 16, ... Какое следующее число?", options: JSON.stringify(["20", "25", "24", "36"]), answer: 1, topicId: patterns.id },
      { text: "Найдите лишнее число: 2, 5, 8, 12, 14", options: JSON.stringify(["2", "12", "14", "5"]), answer: 1, topicId: patterns.id },
      { text: "Если А=1, Б=2, В=3, чему равно слово «БАГ»?", options: JSON.stringify(["5", "6", "7", "4"]), answer: 1, topicId: patterns.id },
      { text: "Какое число заменяет ?: 2→4, 3→9, 4→16, 5→?", options: JSON.stringify(["20", "25", "30", "10"]), answer: 1, topicId: patterns.id },
      { text: "В каждой строке сумма = 15. Найдите ?: 8, ?, 3", options: JSON.stringify(["2", "3", "4", "5"]), answer: 2, topicId: patterns.id },
      { text: "Продолжите: 1×1=1, 11×11=121, 111×111=?", options: JSON.stringify(["1221", "12321", "1331", "11211"]), answer: 1, topicId: patterns.id },
    ],
  });

  const combinatorics = await prisma.topic.create({
    data: {
      name: "Комбинаторика", order: 3, subjectId: logic.id,
      theory: `# Комбинаторика\n\n## Что такое комбинаторика?\nКомбинаторика — раздел математики о подсчёте количества вариантов.\n\n## Правило умножения\nЕсли можно сделать первый выбор **m** способами, а второй — **n** способами, то общее число вариантов = **m × n**\n\n**Пример:** Есть 3 рубашки и 2 пары брюк. Сколько нарядов можно составить?\n3 × 2 = **6 нарядов**\n\n## Правило сложения\nЕсли варианты не пересекаются, складываем.\n\n**Пример:** В команду берут 1 человека. Мальчиков — 5, девочек — 3. Всего кандидатов: 5 + 3 = **8**\n\n## Перестановки\nСколькими способами можно расставить n предметов в ряд?\nn! = n × (n-1) × (n-2) × ... × 1\n\n**Пример:** 3 книги на полке: 3! = 3 × 2 × 1 = **6 способов**`,
    },
  });

  await prisma.question.createMany({
    data: [
      { text: "Есть 4 шапки и 3 шарфа. Сколько комбинаций можно составить?", options: JSON.stringify(["7", "12", "10", "24"]), answer: 1, topicId: combinatorics.id },
      { text: "Сколькими способами 4 ученика могут встать в ряд?", options: JSON.stringify(["12", "16", "24", "8"]), answer: 2, topicId: combinatorics.id },
      { text: "Из букв А, Б, В сколько двухбуквенных слов можно составить (буквы не повторяются)?", options: JSON.stringify(["3", "6", "9", "12"]), answer: 1, topicId: combinatorics.id },
      { text: "В меню 3 первых и 4 вторых блюда. Сколько вариантов обеда?", options: JSON.stringify(["7", "12", "10", "24"]), answer: 1, topicId: combinatorics.id },
      { text: "Сколько двузначных чисел можно составить из цифр 1, 2, 3 (цифры могут повторяться)?", options: JSON.stringify(["6", "9", "3", "12"]), answer: 1, topicId: combinatorics.id },
      { text: "В классе 10 учеников. Сколькими способами можно выбрать старосту и его заместителя?", options: JSON.stringify(["20", "45", "90", "100"]), answer: 2, topicId: combinatorics.id },
    ],
  });

  console.log("Seed completed!");
  console.log(`Создано: 2 предмета, 6 тем, ${await prisma.question.count()} вопросов`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
