#!/usr/bin/env python3
"""Generate bilingual interactive prep topic JSON (L1 theory / L2 fill / L3 match|drag)."""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets/data/interactive_prep/topics"


def L(theory_ua, theory_en, l2_ua, l2_en, l3_type, l3_ua, l3_en):
    """Build 3 levels with bilingual fields."""
    return [
        {
            "id": "L1",
            "type": "theory",
            "title": {"ua": "Рівень 1 · Карта", "en": "Level 1 · Map"},
            "instruction": {
                "ua": "Прочитай схему, потім натисни «Прочитала».",
                "en": "Read the map, then tap Done reading.",
            },
            "diagram": {"ua": theory_ua, "en": theory_en},
            "bullets": [],
        },
        {
            "id": "L2",
            "type": "fill_blanks",
            "title": {"ua": "Рівень 2 · Пропуски", "en": "Level 2 · Blanks"},
            "instruction": {
                "ua": "Обери слово для кожної пропуску.",
                "en": "Pick a word for each blank.",
            },
            **l2_ua,
            **{f"{k}_en": v for k, v in l2_en.items() if k.startswith("_")},
        },
        {
            "id": "L3",
            "type": l3_type,
            "title": {"ua": "Рівень 3 · Практика", "en": "Level 3 · Practice"},
            "instruction": {
                "ua": "Зістав пари або впорядкуй елементи.",
                "en": "Match pairs or order items.",
            },
            **l3_ua,
            **{f"{k}_en": v for k, v in l3_en.items() if k.startswith("_")},
        },
    ]


def fix_l2(level, l2_ua, l2_en):
    level["template"] = {"ua": l2_ua["template"], "en": l2_en["template"]}
    level["answers"] = l2_ua["answers"]
    level["wordBank"] = l2_ua["wordBank"]
    level["hints"] = [{"ua": h, "en": e} for h, e in zip(l2_ua["hints"], l2_en["hints"])]
    return level


def fix_l3_match(level, pairs_ua, pairs_en):
    level["pairs"] = [
        {"left": {"ua": a, "en": ae}, "right": {"ua": b, "en": be}}
        for (a, b), (ae, be) in zip(pairs_ua, pairs_en)
    ]
    return level


def fix_l3_drag(level, items):
    level["items"] = items
    return level


def topic(tid, title_ua, title_en, sub_ua, sub_en, levels_builder):
    raw = levels_builder()
    # normalize L2/L3 bilingual
    l2u = {k: raw[1][k] for k in ("template", "answers", "wordBank", "hints") if k in raw[1]}
    l2e = raw[1].get("_l2_en", {})
    fix_l2(raw[1], l2u, l2e)
    if raw[2]["type"] == "match_pairs":
        fix_l3_match(raw[2], raw[2].pop("_pairs_ua"), raw[2].pop("_pairs_en"))
    elif raw[2]["type"] == "drag_order":
        fix_l3_drag(raw[2], raw[2].pop("_items"))
    return {
        "id": tid,
        "title": {"ua": title_ua, "en": title_en},
        "subtitle": {"ua": sub_ua, "en": sub_en},
        "levels": raw,
    }


TOPICS = []

def add(*args, **kwargs):
    TOPICS.append(topic(*args, **kwargs))


# --- Foundation TZNK ---
add(
    "tznk-traps",
    "Як вчитися, щоб не плутатись",
    "How to study without mixing things up",
    "ЄВІ · ТЗНК",
    "EVI · general competence",
    lambda: [
        {"id": "L1", "type": "theory", "title": {"ua": "Рівень 1 · Карта", "en": "Level 1 · Map"},
         "instruction": {"ua": "Категоризація, не зубріння.", "en": "Categorize, don't memorize blindly."},
         "diagram": {"ua": "Науковий сенс → межі поняття\nПастка → «не є» / «найточніше»\nДріл → ключове слово + чому так",
                     "en": "Meaning → concept boundaries\nTrap → 'is not' / 'most accurate'\nDrill → keyword + why"},
         "bullets": [{"ua": "27 завдань, до 33 балів", "en": "27 tasks, up to 33 points"}]},
        {"id": "L2", "type": "fill_blanks", "title": {"ua": "Рівень 2 · Пастки", "en": "Level 2 · Traps"},
         "instruction": {"ua": "Обери слово.", "en": "Pick a word."},
         "template": "У «is not» шукай варіант, який звучить ____ але не підходить за ____.",
         "answers": ["знайомо", "категорією"],
         "wordBank": ["знайомо", "категорією", "довго", "формулою", "рідко"],
         "hints": ["Перше знайоме слово — пастка.", "Потрібна межа поняття."],
         "_l2_en": {"template": "In «is not» find the option that sounds ____ but fails by ____.",
                    "answers": ["familiar", "category"],
                    "wordBank": ["familiar", "category", "long", "formula", "rarely"],
                    "hints": ["First familiar word is a trap.", "Need concept boundary."]}},
        {"id": "L3", "type": "match_pairs", "title": {"ua": "Рівень 3", "en": "Level 3"},
         "instruction": {"ua": "Пари.", "en": "Pairs."},
         "_pairs_ua": [("«Найточніше»", "відсікай широкі"), ("«НЕ є»", "шукай зайве"), ("Після помилки", "ключове слово + чому")],
         "_pairs_en": [("«Most accurate»", "reject too broad"), ("«Is NOT»", "find the odd one"), ("After mistake", "keyword + why")]}
    ],
)

add("tznk-logic", "Логіка та імплікація", "Logic and implication", "ТЗНК · блок 10", "TZNK · block 10",
    lambda: [
        {"id": "L1", "type": "theory", "title": {"ua": "Рівень 1", "en": "Level 1"},
         "diagram": {"ua": "P → Q хибне лише коли P істинне, Q хибне\nmust be true → доведено\ncould be true → не заборонено",
                     "en": "P → Q false only when P true, Q false\nmust be true → proven\ncould be true → not forbidden"}},
        {"id": "L2", "type": "fill_blanks", "template": "Якщо P → Q, то єдиний суперечливий випадок: P ____ і Q ____.",
         "answers": ["істинне", "хибне"], "wordBank": ["істинне", "хибне", "невизначене", "завжди"],
         "hints": ["Імплікація ламається лише в одному рядку таблиці.", "Q має бути false."],
         "_l2_en": {"template": "If P → Q, the only contradiction is: P ____ and Q ____.",
                    "answers": ["true", "false"], "wordBank": ["true", "false", "undefined", "always"],
                    "hints": ["Implication breaks in one row only.", "Q must be false."]}},
        {"id": "L3", "type": "match_pairs", "_pairs_ua": [("must be true", "доведено умовою"), ("could be true", "не суперечить"), ("cannot be true", "суперечить умові")],
         "_pairs_en": [("must be true", "proven by condition"), ("could be true", "not forbidden"), ("cannot be true", "contradicts")]}
    ])

add("tznk-combinatorics", "Комбінаторика", "Combinatorics", "ТЗНК · перестановки", "TZNK · counting",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "АБО → додавання\nІ → множення\nролі / обмеження → дерево",
                     "en": "OR → add\nAND → multiply\nroles / constraints → tree"}},
        {"id": "L2", "type": "fill_blanks", "template": "Незалежні кроки «і» → рахуй через ____. Варіанти «або» → через ____.",
         "answers": ["множення", "додавання"], "wordBank": ["множення", "додавання", "віднімання", "ділення"],
         "hints": ["І = перемножити.", "АБО = додати."],
         "_l2_en": {"template": "Independent AND steps → ____. OR alternatives → ____.",
                    "answers": ["multiply", "add"], "wordBank": ["multiply", "add", "subtract", "divide"],
                    "hints": ["AND = multiply.", "OR = add."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("рівно один", "exactly one"), ("принаймні один", "at least one"), ("не разом", "mutual exclusion")],
         "_pairs_en": [("exactly one", "only one slot filled"), ("at least one", "one or more"), ("not together", "forbidden pair")]}
    ])

# --- English ---
add("english-reading", "Reading · доказ у тексті", "Reading · evidence in text", "English · блок 11", "English · block 11",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "question → keyword → sentence evidence → eliminate traps",
                     "en": "question → keyword → sentence evidence → eliminate traps"}},
        {"id": "L2", "type": "fill_blanks", "template": "Правильна відповідь у reading має ____ у тексті, не лише звучати ____.",
         "answers": ["доказ", "логічно"], "wordBank": ["доказ", "логічно", "довго", "переклад"],
         "hints": ["Шукай речення-доказ.", "Логіка без тексту — ризик."],
         "_l2_en": {"template": "A correct reading answer needs ____ in the passage, not just sounding ____.",
                    "answers": ["evidence", "logical"], "wordBank": ["evidence", "logical", "long", "translation"],
                    "hints": ["Find proof sentence.", "Logic alone is risky."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("main idea", "не дрібниця"), ("inference", "висновок з тексту"), ("too broad", "пастка")],
         "_pairs_en": [("main idea", "not a tiny detail"), ("inference", "conclusion from text"), ("too broad", "trap")]}
    ])

add("english-grammar", "Grammar patterns", "Grammar patterns", "English · блок 11B", "English · block 11B",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "tense ← markers (yesterday, since, already)\ncollocation ← fixed pairs\nlinkers ← however, therefore",
                     "en": "tense ← markers (yesterday, since, already)\ncollocation ← fixed pairs\nlinkers ← however, therefore"}},
        {"id": "L2", "type": "fill_blanks", "template": "depend ____ | evidence is uncountable | unless без зайвого ____.",
         "answers": ["on", "not"], "wordBank": ["on", "from", "not", "no"],
         "hints": ["depend on — колокація.", "unless вже містить заперечення."],
         "_l2_en": {"template": "depend ____ | evidence uncountable | unless needs no extra ____.",
                    "answers": ["on", "not"], "wordBank": ["on", "from", "not", "no"],
                    "hints": ["depend on — collocation.", "unless already negative."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("yesterday", "Past Simple"), ("since 2020", "Present Perfect"), ("would have + V3", "unreal past")],
         "_pairs_en": [("yesterday", "Past Simple"), ("since 2020", "Present Perfect"), ("would have + V3", "unreal past")]}
    ])

add("english-tenses", "Tenses & conditionals", "Tenses & conditionals", "English · часи", "English · tenses",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "1st conditional → real future\n2nd → unreal now\n3rd → unreal past",
                     "en": "1st conditional → real future\n2nd → unreal now\n3rd → unreal past"}},
        {"id": "L2", "type": "fill_blanks", "template": "If it rains tomorrow, I ____ stay home. (real)",
         "answers": ["will"], "wordBank": ["will", "would", "stayed", "have"],
         "hints": ["Real future → will."], "_l2_en": {"template": "If it rains tomorrow, I ____ stay home. (real)",
                    "answers": ["will"], "wordBank": ["will", "would", "stayed", "have"], "hints": ["Real future → will."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("Past Simple", "finished past"), ("Past Perfect", "earlier past"), ("2nd conditional", "unreal")],
         "_pairs_en": [("Past Simple", "finished past"), ("Past Perfect", "earlier past"), ("2nd conditional", "unreal")]}
    ])

# --- IT blocks helper ---
def it_block(num, title_ua, title_en, diagram_ua, diagram_en, l2, l3_type, l3):
    tid = f"it-block-{num}"
    add(tid, title_ua, title_en, f"ЄФВВ IT · блок {num}", f"EVE IT · block {num}",
        lambda dua=diagram_ua, den=diagram_en, l2d=l2, l3t=l3_type, l3d=l3: [
            {"id": "L1", "type": "theory", "title": {"ua": "Рівень 1", "en": "Level 1"},
             "diagram": {"ua": dua, "en": den}},
            {"id": "L2", "type": "fill_blanks", **l2d, "_l2_en": l2d.get("_en", {})},
            {"id": "L3", "type": l3t, **l3d}
        ])

it_block("00", "Як вчитися (IT)", "How to study (IT)",
         "категорія → не перше знайоме слово\nhash ≠ encrypt\nWHERE ≠ HAVING",
         "category → not first familiar word\nhash ≠ encrypt\nWHERE ≠ HAVING",
         {"template": "На іспиті шукай ____ поняття, а не ____ слово.",
          "answers": ["точне", "знайоме"], "wordBank": ["точне", "знайоме", "довге", "рідке"],
          "hints": ["«Найточніше» відсікає ширше.", "Знайоме ≠ правильне."],
          "_en": {"template": "On the exam seek the ____ concept, not the ____ word.",
                  "answers": ["precise", "familiar"], "wordBank": ["precise", "familiar", "long", "rare"],
                  "hints": ["Most accurate rejects broader.", "Familiar ≠ correct."]}},
         "match_pairs", {"_pairs_ua": [("hash", "integrity"), ("encryption", "confidentiality"), ("GRANT", "authorization")],
                         "_pairs_en": [("hash", "integrity"), ("encryption", "confidentiality"), ("GRANT", "authorization")]})

it_block("01", "Бінарний рахунок", "Binary representation",
         "8 bit → 2^8 = 256\nunsigned 0..255\nsigned -128..127",
         "8 bit → 2^8 = 256\nunsigned 0..255\nsigned -128..127",
         {"template": "2^8 = ____. Unsigned max = ____.",
          "answers": ["256", "255"], "wordBank": ["256", "255", "127", "-128"],
          "hints": ["256 комбінацій.", "255 — верх unsigned."],
          "_en": {"template": "2^8 = ____. Unsigned max = ____.",
                  "answers": ["256", "255"], "wordBank": ["256", "255", "127", "-128"],
                  "hints": ["256 combinations.", "255 top unsigned."]}},
         "match_pairs", {"_pairs_ua": [("unsigned", "0..255"), ("signed 8-bit", "-128..127"), ("11111111", "залежить від типу")],
                         "_pairs_en": [("unsigned", "0..255"), ("signed 8-bit", "-128..127"), ("11111111", "depends on type")]})

it_block("02", "Процедурне програмування", "Procedural programming",
         "змінна → присвоєння → умова → цикл\nstack frame → локальні змінні",
         "variable → assignment → branch → loop\nstack frame → locals",
         {"template": "Цикл for перевіряє умову ____ кожної ітерації. break — ____ цикл.",
          "answers": ["перед", "перериває"], "wordBank": ["перед", "після", "перериває", "дублює"],
          "hints": ["for — check before body.", "break exits loop."],
          "_en": {"template": "for checks condition ____ each iteration. break ____ the loop.",
                  "answers": ["before", "exits"], "wordBank": ["before", "after", "exits", "duplicates"],
                  "hints": ["for checks first.", "break exits."]}},
         "drag_order", {"_items": ["declare", "assign", "condition", "body", "increment"]})

it_block("03", "ООП базово", "OOP basics",
         "class → object\nencapsulation → private\ninheritance → is-a",
         "class → object\nencapsulation → private\ninheritance → is-a",
         {"template": "Public, protected, ____ — модифікатори доступу в ООП.",
          "answers": ["private"], "wordBank": ["private", "public", "projected", "primate"],
          "hints": ["Три класичні модифікатори.", "Читай без пасток (Bublic)."],
          "_en": {"template": "Public, protected, ____ — access modifiers in OOP.",
                  "answers": ["private"], "wordBank": ["private", "public", "projected", "primate"],
                  "hints": ["Three classic modifiers.", "Watch typos."]}},
         "match_pairs", {"_pairs_ua": [("клас", "шаблон"), ("об'єкт", "екземпляр"), ("поліморфізм", "різна реалізація")],
                         "_pairs_en": [("class", "blueprint"), ("object", "instance"), ("polymorphism", "many forms")]})

it_block("04", "Алгоритми і структури", "Algorithms & structures",
         "stack → LIFO\nqueue → FIFO\nO(n) vs O(log n)",
         "stack → LIFO\nqueue → FIFO\nO(n) vs O(log n)",
         {"template": "Undo в редакторі — структура ____. Черга друку — ____.",
          "answers": ["стек", "черга"], "wordBank": ["стек", "черга", "граф", "дерево"],
          "hints": ["Останній вийшов — стек.", "Перший прийшов — черга."],
          "_en": {"template": "Editor undo — ____. Print queue — ____.",
                  "answers": ["stack", "queue"], "wordBank": ["stack", "queue", "graph", "tree"],
                  "hints": ["LIFO = stack.", "FIFO = queue."]}},
         "match_pairs", {"_pairs_ua": [("LIFO", "стек"), ("FIFO", "черга"), ("binary search", "O(log n)")],
                         "_pairs_en": [("LIFO", "stack"), ("FIFO", "queue"), ("binary search", "O(log n)")]})

it_block("04b", "Архітектура CPU/RAM", "Computer architecture",
         "CPU → fetch-decode-execute\nRAM → volatile\n cache → швидкий шар",
         "CPU → fetch-decode-execute\nRAM → volatile\ncache → fast layer",
         {"template": "Ядро ОС постійно в ____. Кеш — між CPU і ____.",
          "answers": ["RAM", "RAM"], "wordBank": ["RAM", "диск", "ROM", "GPU"],
          "hints": ["Kernel in RAM.", "Cache near CPU/RAM."],
          "_en": {"template": "OS kernel stays in ____. Cache sits between CPU and ____.",
                  "answers": ["RAM", "RAM"], "wordBank": ["RAM", "disk", "ROM", "GPU"],
                  "hints": ["Kernel in RAM.", "Cache hierarchy."]}},
         "match_pairs", {"_pairs_ua": [("RAM", "оперативна"), ("SSD", "постійна"), ("I/O", "пристрої")],
                         "_pairs_en": [("RAM", "volatile"), ("SSD", "persistent"), ("I/O", "devices")]})

it_block("05", "Бази даних і SQL", "Databases & SQL",
         "SELECT → WHERE → GROUP BY → HAVING → ORDER BY\nPK / FK / GRANT",
         "SELECT → WHERE → GROUP BY → HAVING → ORDER BY\nPK / FK / GRANT",
         {"template": "Фільтр рядків — ____. Фільтр груп після COUNT — ____.",
          "answers": ["WHERE", "HAVING"], "wordBank": ["WHERE", "HAVING", "GRANT", "ALLOW"],
          "hints": ["WHERE до GROUP BY.", "HAVING після агрегації."],
          "_en": {"template": "Row filter — ____. Group filter after COUNT — ____.",
                  "answers": ["WHERE", "HAVING"], "wordBank": ["WHERE", "HAVING", "GRANT", "ALLOW"],
                  "hints": ["WHERE before GROUP BY.", "HAVING after aggregate."]}},
         "drag_order", {"_items": ["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"]})

it_block("06", "OLTP / OLAP / Warehouse", "OLTP / OLAP / Warehouse",
         "OLTP → транзакції зараз\nOLAP → аналітика\nwarehouse → історія",
         "OLTP → live transactions\nOLAP → analytics\nwarehouse → history",
         {"template": "Каса магазину — ____. Звіт за роки — ____.",
          "answers": ["OLTP", "OLAP"], "wordBank": ["OLTP", "OLAP", "DNS", "HTTP"],
          "hints": ["Операційні транзакції.", "Аналітичні зрізи."],
          "_en": {"template": "Store checkout — ____. Multi-year report — ____.",
                  "answers": ["OLTP", "OLAP"], "wordBank": ["OLTP", "OLAP", "DNS", "HTTP"],
                  "hints": ["Operational.", "Analytical."]}},
         "match_pairs", {"_pairs_ua": [("dimension", "за чим дивимось"), ("measure", "що рахуємо"), ("data mart", "підмножина")],
                         "_pairs_en": [("dimension", "what we slice by"), ("measure", "what we count"), ("data mart", "subset")]})

it_block("06b", "Математика в IT", "Math for IT",
         "linear → line\n2^x → exponential\nlog → повільний ріст",
         "linear → line\n2^x → exponential\nlog → slow growth",
         {"template": "log₂(1024) = ____. Binary search ~ ____ кроків на 1024 елементах.",
          "answers": ["10", "10"], "wordBank": ["10", "1024", "2", "8"],
          "hints": ["2^10=1024.", "~log₂ n steps."],
          "_en": {"template": "log₂(1024) = ____. Binary search ~ ____ steps on 1024 items.",
                  "answers": ["10", "10"], "wordBank": ["10", "1024", "2", "8"],
                  "hints": ["2^10=1024.", "~log₂ n."]}},
         "match_pairs", {"_pairs_ua": [("парабола", "квадратична"), ("експонента", "швидкий ріст"), ("1/x", "гіпербола")],
                         "_pairs_en": [("parabola", "quadratic"), ("exponential", "fast growth"), ("1/x", "hyperbola")]})

it_block("07", "Кібербезпека", "Cybersecurity",
         "CIA\nSIEM → auth джерел\nTLS → encrypt+auth+integrity\nRisk = P × loss",
         "CIA\nSIEM → source auth\nTLS → encrypt+auth+integrity\nRisk = P × loss",
         {"template": "SIEM ключово: ____ джерел. Risk exposure = ____ × втрати.",
          "answers": ["автентифікація", "ймовірність"], "wordBank": ["автентифікація", "ймовірність", "шифрування", "DNS"],
          "hints": ["SIEM → authentication.", "P × loss."],
          "_en": {"template": "SIEM key: ____ of sources. Risk exposure = ____ × loss.",
                  "answers": ["authentication", "probability"], "wordBank": ["authentication", "probability", "encryption", "DNS"],
                  "hints": ["SIEM → auth.", "P × loss."]}},
         "match_pairs", {"_pairs_ua": [("Купина", "hash"), ("AES", "шифр"), ("страхування", "передача ризику")],
                         "_pairs_en": [("Kupyna", "hash"), ("AES", "cipher"), ("insurance", "risk transfer")]})

it_block("08", "Мережі й ОС", "Networks & OS",
         "DNS → ім'я→IP\nTCP надійний / UDP швидкий\nprocess ≠ thread",
         "DNS → name→IP\nTCP reliable / UDP fast\nprocess ≠ thread",
         {"template": "Ім'я сайту → IP: ____. process ≠ ____.",
          "answers": ["DNS", "thread"], "wordBank": ["DNS", "DHCP", "thread", "driver"],
          "hints": ["DNS resolves names.", "Process vs thread."],
          "_en": {"template": "Site name → IP: ____. process ≠ ____.",
                  "answers": ["DNS", "thread"], "wordBank": ["DNS", "DHCP", "thread", "driver"],
                  "hints": ["DNS resolves.", "Process vs thread."]}},
         "match_pairs", {"_pairs_ua": [("TCP", "надійність"), ("UDP", "низька затримка"), ("driver", "ОС↔пристрій")],
                         "_pairs_en": [("TCP", "reliability"), ("UDP", "low latency"), ("driver", "OS↔device")]})

it_block("08b", "Мережі поглиблено", "Networks deep dive",
         "frame/MAC/switch\npacket/IP/router\nport/TCP",
         "frame/MAC/switch\npacket/IP/router\nport/TCP",
         {"template": "MAC → ____ / frame. IP → ____ / packet.",
          "answers": ["switch", "router"], "wordBank": ["switch", "router", "hub", "DNS"],
          "hints": ["L2 switch.", "L3 router."],
          "_en": {"template": "MAC → ____ / frame. IP → ____ / packet.",
                  "answers": ["switch", "router"], "wordBank": ["switch", "router", "hub", "DNS"],
                  "hints": ["L2 switch.", "L3 router."]}},
         "match_pairs", {"_pairs_ua": [("port", "сервіс на хості"), ("HTTP", "application"), ("SSH", "remote shell")],
                         "_pairs_en": [("port", "service on host"), ("HTTP", "application"), ("SSH", "remote shell")]})

it_block("09", "Data Science / ML", "Data Science / ML",
         "classification → class\nregression → number\noverfitting → train high, test low",
         "classification → class\nregression → number\noverfitting → train high, test low",
         {"template": "spam / not spam — ____. Ціна квартири — ____.",
          "answers": ["classification", "regression"], "wordBank": ["classification", "regression", "clustering", "PCA"],
          "hints": ["Класи.", "Число."],
          "_en": {"template": "spam / not spam — ____. Apartment price — ____.",
                  "answers": ["classification", "regression"], "wordBank": ["classification", "regression", "clustering", "PCA"],
                  "hints": ["Classes.", "Number."]}},
         "match_pairs", {"_pairs_ua": [("PCA", "менше вимірів"), ("SVM", "margin"), ("train high + test low", "overfitting")],
                         "_pairs_en": [("PCA", "fewer dimensions"), ("SVM", "margin"), ("train high + test low", "overfitting")]})

add("testing-blackbox", "Тестування ПЗ", "Software testing", "IT · блок 03B", "IT · block 03B",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "black → UI only\nwhite → code paths\ngrey → partial",
                     "en": "black → UI only\nwhite → code paths\ngrey → partial"}},
        {"id": "L2", "type": "fill_blanks", "template": "Без коду — ____ box. Перевірка гілок — ____ box.",
         "answers": ["black", "white"], "wordBank": ["black", "white", "grey", "green"],
         "hints": ["UI only.", "Code visible."],
         "_l2_en": {"template": "No code — ____ box. Branch testing — ____ box.",
                    "answers": ["black", "white"], "wordBank": ["black", "white", "grey", "green"],
                    "hints": ["UI only.", "Code visible."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("Unit", "функції"), ("Integration", "модулі"), ("Acceptance", "бізнес-вимоги")],
         "_pairs_en": [("Unit", "functions"), ("Integration", "modules"), ("Acceptance", "business rules")]}
    ])

add("security-trio", "Hash / encrypt / signature", "Hash / encrypt / signature", "IT · блок 07", "IT · block 07",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "hash → відбиток\nencrypt → ключ\nsignature → автор+цілісність",
                     "en": "hash → fingerprint\nencrypt → key\nsignature → auth+integrity"}},
        {"id": "L2", "type": "fill_blanks", "template": "Пароль порівнюють через ____. Повідомлення в сейфі — ____.",
         "answers": ["hash", "encryption"], "wordBank": ["hash", "encryption", "DNS", "Base64"],
         "hints": ["Hash не decrypt.", "Encrypt має ключ."],
         "_l2_en": {"template": "Passwords compared via ____. Message in safe — ____.",
                    "answers": ["hash", "encryption"], "wordBank": ["hash", "encryption", "DNS", "Base64"],
                    "hints": ["No decrypt.", "Needs key."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("authentication", "хто ти"), ("authorization", "що можна"), ("HTTPS", "HTTP+TLS")],
         "_pairs_en": [("authentication", "who you are"), ("authorization", "what allowed"), ("HTTPS", "HTTP+TLS")]}
    ])

# --- DE combo ---
add("de-sql-warehouse", "SQL + warehouse (DE)", "SQL + warehouse (DE)", "Data Engineering", "Data Engineering",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "OLTP source → ETL → warehouse\nGRANT least privilege",
                     "en": "OLTP source → ETL → warehouse\nGRANT least privilege"}},
        {"id": "L2", "type": "fill_blanks", "template": "Права в SQL — ____. Least privilege у prod — ____.",
         "answers": ["GRANT", "мінімум"], "wordBank": ["GRANT", "мінімум", "ALLOW", "максимум"],
         "hints": ["GRANT not ALLOW.", "Minimum rights."],
         "_l2_en": {"template": "SQL rights — ____. Least privilege in prod — ____.",
                    "answers": ["GRANT", "minimum"], "wordBank": ["GRANT", "minimum", "ALLOW", "maximum"],
                    "hints": ["GRANT not ALLOW.", "Minimum rights."]}},
        {"id": "L3", "type": "drag_order", "_items": ["extract", "transform", "load", "validate", "serve"]}
    ])

add("de-etl-pipeline", "ETL / якість даних", "ETL / data quality", "Data Engineering", "Data Engineering",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "freshness\ncompleteness\nschema drift",
                     "en": "freshness\ncompleteness\nschema drift"}},
        {"id": "L2", "type": "fill_blanks", "template": "Відсутні ключі — проблема ____. Застарілі дані — ____.",
         "answers": ["повноти", "актуальності"], "wordBank": ["повноти", "актуальності", "швидкості", "кольору"],
         "hints": ["Completeness.", "Freshness."],
         "_l2_en": {"template": "Missing keys — ____ issue. Stale data — ____.",
                    "answers": ["completeness", "freshness"], "wordBank": ["completeness", "freshness", "speed", "color"],
                    "hints": ["Completeness.", "Freshness."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("ETL", "batch pipeline"), ("ELT", "load then transform"), ("data quality", "trust in metrics")],
         "_pairs_en": [("ETL", "batch pipeline"), ("ELT", "load then transform"), ("data quality", "trust in metrics")]}
    ])

add("de-access-grants", "Права доступу (DE)", "Access control (DE)", "Data Engineering", "Data Engineering",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "role-based\nrow-level security\naudit log",
                     "en": "role-based\nrow-level security\naudit log"}},
        {"id": "L2", "type": "fill_blanks", "template": "Аналітик лише SELECT — ____. PII маскується — ____.",
         "answers": ["GRANT", "RLS"], "wordBank": ["GRANT", "RLS", "DROP", "HTTP"],
         "hints": ["GRANT SELECT.", "Row-level security."],
         "_l2_en": {"template": "Analyst SELECT only — ____. PII masked — ____.",
                    "answers": ["GRANT", "RLS"], "wordBank": ["GRANT", "RLS", "DROP", "HTTP"],
                    "hints": ["GRANT SELECT.", "Row-level security."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("least privilege", "мінімум прав"), ("audit", "журнал"), ("PII", "персональні дані")],
         "_pairs_en": [("least privilege", "minimum rights"), ("audit", "log"), ("PII", "personal data")]}
    ])

# --- SET Science ---
for tid, tua, ten, dua, den, l2, pua, pen in [
    ("set-s-biology", "Біологія", "Biology", "клітина → органела → DNA\ngene → protein",
     "cell → organelle → DNA\ngene → protein",
     {"template": "Енергія в клітині — ____. Спадковість — ____.",
      "answers": ["мітохондрія", "DNA"], "wordBank": ["мітохондрія", "DNA", "рибосома", "вода"],
      "hints": ["ATP factory.", "Genetic code."],
      "_en": {"template": "Cell energy — ____. Heredity — ____.",
              "answers": ["mitochondria", "DNA"], "wordBank": ["mitochondria", "DNA", "ribosome", "water"],
              "hints": ["ATP.", "Genes."]}},
     [("мітохондрія", "ATP"), ("рибосома", "білок"), ("DNA", "генетика")],
     [("mitochondria", "ATP"), ("ribosome", "protein"), ("DNA", "genetics")]),
    ("set-s-chemistry", "Хімія", "Chemistry", "pH 7 neutral\ncovalent share electrons",
     "pH 7 neutral\ncovalent share electrons",
     {"template": "Нейтральний pH = ____. Спільна пара електронів — ____ зв'язок.",
      "answers": ["7", "ковалентний"], "wordBank": ["7", "ковалентний", "14", "іонний"],
      "hints": ["Water ~7.", "Shared electrons."],
      "_en": {"template": "Neutral pH = ____. Shared electron pair — ____ bond.",
              "answers": ["7", "covalent"], "wordBank": ["7", "covalent", "14", "ionic"],
              "hints": ["Water ~7.", "Shared pair."]}},
     [("кислота", "pH<7"), ("база", "pH>7"), ("каталізатор", "прискорює")],
     [("acid", "pH<7"), ("base", "pH>7"), ("catalyst", "speeds up")]),
    ("set-s-physics", "Фізика", "Physics", "F=ma\nV=IR\nkinetic energy motion",
     "F=ma\nV=IR\nkinetic energy motion",
     {"template": "Закон Ньютона: F = ____. Ом: V = ____.",
      "answers": ["ma", "IR"], "wordBank": ["ma", "IR", "mc²", "PV"],
      "hints": ["F=ma.", "V=IR."],
      "_en": {"template": "Newton: F = ____. Ohm: V = ____.",
              "answers": ["ma", "IR"], "wordBank": ["ma", "IR", "mc²", "PV"],
              "hints": ["F=ma.", "V=IR."]}},
     [("кінетична", "рух"), ("потенційна", "положення"), ("Ом", "V=IR")],
     [("kinetic", "motion"), ("potential", "position"), ("Ohm", "V=IR")]),
]:
    add(tid, tua, ten, "SET Science", "SET Science",
        lambda dua=dua, den=den, l2=l2, pua=pua, pen=pen: [
            {"id": "L1", "type": "theory", "diagram": {"ua": dua, "en": den}},
            {"id": "L2", "type": "fill_blanks", **l2, "_l2_en": l2.get("_en", {})},
            {"id": "L3", "type": "match_pairs", "_pairs_ua": pua, "_pairs_en": pen}
        ])

# --- SET Entrepreneurship ---
for spec in [
    ("set-e-management", "Менеджмент", "Management", "plan → organize → lead → control", "plan → organize → lead → control"),
    ("set-e-marketing", "Маркетинг 4P", "Marketing 4P", "Product Price Place Promotion", "Product Price Place Promotion"),
    ("set-e-finance", "Фінанси", "Finance", "revenue - cost = profit\nROI cash flow", "revenue - cost = profit\nROI cash flow"),
]:
    tid, tua, ten, dua, den = spec
    add(tid, tua, ten, "SET Entrepreneurship", "SET Entrepreneurship",
        lambda dua=dua, den=den: [
            {"id": "L1", "type": "theory", "diagram": {"ua": dua, "en": den}},
            {"id": "L2", "type": "fill_blanks",
             "template": "4P: Product, Price, Place, ____.",
             "answers": ["Promotion"], "wordBank": ["Promotion", "Profit", "Process", "People"],
             "hints": ["Classic 4P."], "_l2_en": {"template": "4P: Product, Price, Place, ____.",
             "answers": ["Promotion"], "wordBank": ["Promotion", "Profit", "Process", "People"], "hints": ["Classic 4P."]}},
            {"id": "L3", "type": "match_pairs",
             "_pairs_ua": [("стратегія", "довгострокова"), ("тактика", "короткострокова"), ("KPI", "метрика")],
             "_pairs_en": [("strategy", "long-term"), ("tactics", "short-term"), ("KPI", "metric")]}
        ])

# --- SET Technology ---
for spec in [
    ("set-t-programming", "Програмування", "Programming", "syntax → logic → debug", "syntax → logic → debug"),
    ("set-t-algorithms", "Алгоритми", "Algorithms", "sort search graph complexity", "sort search graph complexity"),
    ("set-t-databases", "Бази даних", "Databases", "relational NoSQL ACID", "relational NoSQL ACID"),
    ("set-t-cybersecurity", "Кібербезпека", "Cybersecurity", "CIA TLS firewall IDS", "CIA TLS firewall IDS"),
]:
    tid, tua, ten, dua, den = spec
    add(tid, tua, ten, "SET Technology", "SET Technology",
        lambda dua=dua, den=den: [
            {"id": "L1", "type": "theory", "diagram": {"ua": dua, "en": den}},
            {"id": "L2", "type": "fill_blanks",
             "template": "API контракт — ____. Вразливість — ____.",
             "answers": ["інтерфейс", "слабкість"], "wordBank": ["інтерфейс", "слабкість", "диск", "колір"],
             "hints": ["Contract between services.", "Weakness exploited."],
             "_l2_en": {"template": "API contract — ____. Vulnerability — ____.",
             "answers": ["interface", "weakness"], "wordBank": ["interface", "weakness", "disk", "color"],
             "hints": ["Service contract.", "Exploitable flaw."]}},
            {"id": "L3", "type": "match_pairs",
             "_pairs_ua": [("O(n)", "лінійна"), ("O(log n)", "логарифмічна"), ("ACID", "транзакції")],
             "_pairs_en": [("O(n)", "linear"), ("O(log n)", "logarithmic"), ("ACID", "transactions")]}
        ])

# --- Combos ---
add("combo-st-bioinfo", "Science + Tech", "Science + Technology", "Біоінформатика", "Bioinformatics",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "sequencing → alignment → variant calling",
                     "en": "sequencing → alignment → variant calling"}},
        {"id": "L2", "type": "fill_blanks", "template": "FASTQ — сирі ____. BAM — вирівняні ____.",
         "answers": ["reads", "reads"], "wordBank": ["reads", "reads", "images", "tables"],
         "hints": ["Raw reads.", "Aligned reads."],
         "_l2_en": {"template": "FASTQ — raw ____. BAM — aligned ____.",
                    "answers": ["reads", "reads"], "wordBank": ["reads", "reads", "images", "tables"],
                    "hints": ["Raw.", "Aligned."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("genome", "повний ДНК"), ("transcriptome", "РНК"), ("proteome", "білки")],
         "_pairs_en": [("genome", "full DNA"), ("transcriptome", "RNA"), ("proteome", "proteins")]}
    ])

add("combo-et-digital", "Entrepreneurship + Tech", "Entrepreneurship + Technology", "Digital / ERP", "Digital / ERP",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "CRM → customers\nERP → resources\nanalytics → decisions",
                     "en": "CRM → customers\nERP → resources\nanalytics → decisions"}},
        {"id": "L2", "type": "fill_blanks", "template": "ERP об'єднує ____. Digital marketing — канал ____.",
         "answers": ["ресурси", "онлайн"], "wordBank": ["ресурси", "онлайн", "папір", "шум"],
         "hints": ["Enterprise resources.", "Online channel."],
         "_l2_en": {"template": "ERP unifies ____. Digital marketing — ____ channel.",
                    "answers": ["resources", "online"], "wordBank": ["resources", "online", "paper", "noise"],
                    "hints": ["Enterprise resources.", "Online."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("CRM", "клієнти"), ("ERP", "операції"), ("BI", "звіти")],
         "_pairs_en": [("CRM", "customers"), ("ERP", "operations"), ("BI", "reports")]}
    ])

add("combo-se-health", "Science + Entrepreneurship", "Science + Entrepreneurship", "Health / pharma", "Health / pharma",
    lambda: [
        {"id": "L1", "type": "theory", "diagram": {"ua": "clinical trial phases\nregulatory approval\nhealth economics",
                     "en": "clinical trial phases\nregulatory approval\nhealth economics"}},
        {"id": "L2", "type": "fill_blanks", "template": "Фаза III — ____. Регуляторна безпека — ____.",
         "answers": ["ефективність", "комплаєнс"], "wordBank": ["ефективність", "комплаєнс", "реклама", "дизайн"],
         "hints": ["Large efficacy trial.", "Compliance."],
         "_l2_en": {"template": "Phase III — ____. Regulatory safety — ____.",
                    "answers": ["efficacy", "compliance"], "wordBank": ["efficacy", "compliance", "ads", "design"],
                    "hints": ["Efficacy trial.", "Compliance."]}},
        {"id": "L3", "type": "match_pairs",
         "_pairs_ua": [("фарма", "ліки"), ("health economics", "вартість/користь"), ("GMP", "якість виробництва")],
         "_pairs_en": [("pharma", "drugs"), ("health economics", "cost/benefit"), ("GMP", "manufacturing quality")]}
    ])


def normalize_topic(t):
    """Ensure L2 hints are objects and levels have titles."""
    for lv in t["levels"]:
        if "title" not in lv:
            lv["title"] = {"ua": "Рівень", "en": "Level"}
        if lv["type"] == "fill_blanks" and lv.get("hints") and isinstance(lv["hints"][0], str):
            en_hints = lv.get("_l2_en", {}).get("hints", lv["hints"])
            lv["hints"] = [{"ua": h, "en": e} for h, e in zip(lv["hints"], en_hints)]
    return t


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ids = set()
    titles = {}
    for t in TOPICS:
        t = normalize_topic(t)
        ids.add(t["id"])
        titles[t["id"]] = t["title"]
        path = OUT / f"{t['id']}.json"
        path.write_text(json.dumps(t, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("wrote", path.name)
    titles_path = OUT.parent / "_titles.json"
    titles_path.write_text(json.dumps(titles, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote _titles.json")
    for p in OUT.glob("*.json"):
        if p.stem not in ids:
            p.unlink()
            print("removed", p.name)
    print(f"total: {len(ids)} topics")


if __name__ == "__main__":
    main()
