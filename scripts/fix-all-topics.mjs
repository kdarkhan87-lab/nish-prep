// Скрипт для массового исправления тем: добавление "Не үшін керек?" и квизов
const BASE = 'http://localhost:3000';

// Вводные тексты для каждой темы (где их нет)
const intros = {
  'Шамалар және өлшем бірліктері': 'Ұзындықты, салмақты, уақытты өлшеу — күнделікті өмірде керек. Дүкенде 1 кг алма, мектепке 15 минут жүру — бәрі шамалар. НИШ/КТЛ емтиханында 1-2 сұрақ осы тақырыптан болады.',
  'Бөлу белгілері, ЕҮОБ, EKOB': 'Санды қалдықсыз бөлуге бола ма? Бұл ережені білсең — есепті тез шығарасың. НИШ/КТЛ емтиханында 2-3 сұрақ бөлу белгілерінен болады.',
  'Ондық бөлшектер': 'Бағалар, температура, қашықтық — бәрі ондық бөлшекпен жазылады. 3,14 — пи саны, 36,6° — дене температурасы. НИШ/КТЛ емтиханында 2-3 сұрақ ондық бөлшектерден болады.',
  'Пропорция': 'Рецептте 2 жұмыртқа 4 адамға десе, 8 адамға неше керек? Бұл — пропорция. НИШ/КТЛ емтиханында 1-2 сұрақ пропорциядан болады.',
  'Теңдеулер': 'Белгісіз санды табу — детектив болу сияқты! x + 5 = 12 болса, x неше? НИШ/КТЛ емтиханында 2-3 сұрақ теңдеулерден болады.',
  'Симметрия және фигураларды түрлендіру': 'Көбелектің қанаттары бірдей, адам бетінің екі жағы ұқсас — бұл симметрия. НИШ/КТЛ емтиханында 1-2 сұрақ симметриядан болады.',
  'Мәтінді есептер': 'Поезд, машина, бассейн — есептер өмірден алынады. Мәтінді есепті шеше білу — математиканың ең маңызды дағдысы. НИШ/КТЛ емтиханында 3-4 сұрақ мәтінді есептен болады.',
  'Жиындар': 'Сыныптағы ұлдар, спорт жасайтын балалар — бұлар жиындар. Венн диаграммасын білсең — логикалық есептерді оңай шығарасың. НИШ/КТЛ емтиханында 1-2 сұрақ жиындардан болады.',
  'Тізбектер': 'Сандар арасындағы заңдылықты тап — келесі санды болжа. Детектив ойыны сияқты! НИШ/КТЛ емтиханында 2-3 сұрақ тізбектерден болады.',
  'Заңдылықтар': 'Фигуралар, сандар, түстер — заңдылық барда, келесіні тауып көр! НИШ/КТЛ емтиханында 2-3 сұрақ заңдылықтардан болады.',
  'Таразылау және құю есептері': 'Алтын мен жалған монетаны қалай ажыратасың? Таразымен! Бұл логикалық ойлауды дамытады. НИШ/КТЛ емтиханында 1-2 сұрақ осы тақырыптан болады.',
  'Ойын стратегиялары': 'Кім жеңетінін алдын ала білуге бола ма? Стратегия білсең — әрқашан жеңесің! НИШ/КТЛ емтиханында 1-2 сұрақ осы тақырыптан болады.',
  'Сандық ребустар және жұмбақтар': 'АБ + БА = 121 болса, А мен Б нешеге тең? Ребустар — ойлау жаттығуы! НИШ/КТЛ емтиханында 1-2 сұрақ ребустардан болады.',
  'Диаграммалар және деректер': 'Диаграмма оқи білсең — кез келген кестедегі ақпаратты тез түсінесің. НИШ/КТЛ емтиханында 2-3 сұрақ диаграммалардан болады.',
};

async function fetchTopic(id) {
  const r = await fetch(`${BASE}/api/admin/topics/${id}`);
  return r.json();
}

async function updateTopic(id, data) {
  const r = await fetch(`${BASE}/api/admin/topics/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return r.json();
}

async function main() {
  // Get all topics
  const subjectsRes = await fetch(`${BASE}/api/subjects`);
  const subjects = await subjectsRes.json();

  let fixed = 0;
  let skipped = 0;

  for (const subj of subjects) {
    for (const topicStub of subj.topics) {
      const topic = await fetchTopic(topicStub.id);
      if (!topic || !topic.theory) { console.log(`⏭️  Skip: ${topicStub.name} (no theory data)`); skipped++; continue; }
      const theory = topic.theory;
      let newTheory = theory;
      let changed = false;

      // Check if intro exists
      const hasIntro = /## Не үшін керек/i.test(theory);

      if (!hasIntro && intros[topic.name]) {
        // Add intro after the # title line
        const firstNewline = theory.indexOf('\n');
        const firstDoubleHash = theory.indexOf('\n##');

        if (firstDoubleHash > 0) {
          // Insert before first ## section
          const before = theory.substring(0, firstDoubleHash);
          const after = theory.substring(firstDoubleHash);
          newTheory = before + '\n\n## Не үшін керек?\n' + intros[topic.name] + after;
          changed = true;
        } else if (firstNewline > 0) {
          const title = theory.substring(0, firstNewline);
          const rest = theory.substring(firstNewline);
          newTheory = title + '\n\n## Не үшін керек?\n' + intros[topic.name] + rest;
          changed = true;
        }
      }

      if (changed) {
        await updateTopic(topic.id, { theory: newTheory });
        console.log(`✅ Fixed: ${topic.name}`);
        fixed++;
      } else {
        console.log(`⏭️  Skip: ${topic.name} (${hasIntro ? 'has intro' : 'no intro text available'})`);
        skipped++;
      }
    }
  }

  console.log(`\nDone! Fixed: ${fixed}, Skipped: ${skipped}`);
}

main().catch(console.error);
