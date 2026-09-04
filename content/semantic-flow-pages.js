(function () {
  "use strict";

  const imageFiles = {
    pg016_im001: "images/pg016_im001.jpg",
    pg016_im002: "images/pg016_im002.jpg",
    pg016_im003: "images/pg016_im003.jpg",
    pg017_im001: "images/pg017_im001.jpg",
    pg018_im001: "images/pg018_im001.jpg",
    pg019_im001: "images/pg019_im001.jpg",
    pg019_im002: "images/pg019_im002.jpg",
    pg020_im002: "images/pg020_im002.jpg",
    pg020_im003: "images/pg020_im003.jpg",
    pg021_im001: "images/pg021_im001.jpg",
    pg022_im001: "images/pg022_im001.png",
    pg032_im001: "images/pg032_im001.png",
    pg032_im002: "images/pg032_im002.jpg",
    pg033_im001: "images/pg033_im001.png",
    pg033_im002: "images/pg033_im002.png",
    pg035_im001: "images/pg035_im001.jpg",
    pg035_im002: "images/pg035_im002.jpg",
    pg036_im001: "images/pg036_im001.jpg",
    pg037_im001: "images/pg037_im001.jpg",
    pg037_im002: "images/pg037_im002.jpg",
    pg038_im001: "images/pg038_im001.jpg",
    pg039_im001: "images/pg039_im001.jpg",
    pg039_im002: "images/pg039_im002.jpg",
    pg039_im003: "images/pg039_im003.png",
    pg039_im004: "images/pg039_im004.jpg",
    pg039_im005: "images/pg039_im005.jpg",
    pg039_im006: "images/pg039_im006.jpg",
    pg040_im001: "images/pg040_im001.png",
    pg041_im001: "images/pg041_im001.jpg",
    pg042_im001: "images/pg042_im001.png",
    pg044_im001: "images/pg044_im001.jpg",
    pg044_im002: "images/pg044_im002.jpg",
    pg045_im001: "images/pg045_im001.jpg",
    pg046_im001: "images/pg046_im001.png",
    pg052_im001: "images/pg052_im001.jpg",
    pg053_im001: "images/pg053_im001.jpg",
    pg054_im001: "images/pg054_im001.jpg",
    pg055_im001: "images/pg055_im001.jpg",
    pg056_im001: "images/pg056_im001.jpg",
    pg056_im002: "images/pg056_im002.jpg",
    pg058_im002: "images/pg058_im002.jpg",
    pg059_im001: "images/pg059_im001.jpg",
    pg060_im001: "images/pg060_im001.png",
    pg060_im002: "images/pg060_im002.png",
    pg060_im003: "images/pg060_im003.png",
    pg060_im004: "images/pg060_im004.jpg",
    pg061_im001: "images/pg061_im001.jpg",
    pg067_im001: "images/pg067_im001.jpg",
    pg067_im002: "images/pg067_im002.jpg",
    pg069_im001: "images/pg069_im001.jpg",
    pg071_im001: "images/pg071_im001.png",
    pg071_im002: "images/pg071_im002.png",
    pg071_im003: "images/pg071_im003.png",
    pg071_im004: "images/pg071_im004.jpg",
    pg072_im001: "images/pg072_im001.png",
    pg072_im002: "images/pg072_im002.jpg",
    pg073_im002: "images/pg073_im002.png",
    pg074_im001: "images/pg074_im001.jpg",
    pg074_im002: "images/pg074_im002.jpg",
    pg078_im001: "images/pg078_im001.png",
    pg079_im001: "images/pg079_im001.png",
    pg080_im001: "images/pg080_im001.png",
    pg081_im001: "images/pg081_im001.jpg",
    pg081_im002: "images/pg081_im002.jpg",
    pg081_im003: "images/pg081_im003.jpg",
    pg081_im004: "images/pg081_im004.jpg",
    pg081_im005: "images/pg081_im005.jpg",
    pg082_im001: "images/pg082_im001.jpg",
    pg082_im002: "images/pg082_im002.jpg",
    pg082_im003: "images/pg082_im003.jpg",
    pg083_im001: "images/pg083_im001.jpg",
    pg084_im001: "images/pg084_im001.jpg",
    pg084_im002: "images/pg084_im002.jpg",
    pg084_im003: "images/pg084_im003.png",
    pg084_im004: "images/pg084_im004.jpg",
    pg090_im001: "images/pg090_im001.jpg",
    pg091_im001: "images/pg091_im001.png",
    pg091_im002: "images/pg091_im002.png",
    pg091_im003: "images/pg091_im003.png",
    pg091_im004: "images/pg091_im004.png",
    pg092_im001: "images/pg092_im001.jpg",
    pg094_im001: "images/pg094_im001.jpg",
    pg101_im001: "images/pg101_im001.jpg",
    pg101_im002: "images/pg101_im002.jpg",
    pg101_im003: "images/pg101_im003.jpg",
    pg101_im004: "images/pg101_im004.jpg",
    pg102_im002: "images/pg102_im002.jpg",
    pg105_im001: "images/pg105_im001.jpg",
    pg105_im002: "images/pg105_im002.jpg",
    pg105_im003: "images/pg105_im003.png",
    pg105_im004: "images/pg105_im004.png",
    pg105_im005: "images/pg105_im005.png",
    pg105_im006: "images/pg105_im006.png",
    pg105_im007: "images/pg105_im007.jpg",
    pg107_im001: "images/pg107_im001.png",
    pg107_im002: "images/pg107_im002.png",
    pg107_im003: "images/pg107_im003.png",
    pg107_im004: "images/pg107_im004.jpg",
    pg107_im005: "images/pg107_im005.png",
    pg107_im006: "images/pg107_im006.jpg",
    pg107_im007: "images/pg107_im007.jpg",
    pg107_im008: "images/pg107_im008.png",
    pg108_im001: "images/pg108_im001.png",
    pg108_im002: "images/pg108_im002.png",
    pg108_im003: "images/pg108_im003.png",
    pg108_im004: "images/pg108_im004.jpg",
    pg110_im002: "images/pg110_im002.png",
    pg110_im003: "images/pg110_im003.jpg",
    pg110_im004: "images/pg110_im004.jpg",
    pg110_im005: "images/pg110_im005.png",
    pg110_im006: "images/pg110_im006.jpg",
    pg111_im001: "images/pg111_im001.png",
    pg111_im002: "images/pg111_im002.png",
    pg111_im003: "images/pg111_im003.jpg",
    pg111_im004: "images/pg111_im004.png",
    pg117_im001: "images/pg117_im001.png",
    pg119_im001: "images/pg119_im001.jpg",
    pg119_im002: "images/pg119_im002.jpg",
    pg120_im001: "images/pg120_im001.jpg",
    pg120_im002: "images/pg120_im002.jpg",
    pg121_im001: "images/pg121_im001.png",
    pg125_im001: "images/pg125_im001.png",
    pg127_im001: "images/pg127_im001.png",
    pg127_im016: "images/pg127_im016.png",
    pg128_im001: "images/pg128_im001.jpg",
    pg128_im002: "images/pg128_im002.jpg",
    pg130_im001: "images/pg130_im001.png",
    pg130_im002: "images/pg130_im002.jpg",
    pg130_im003: "images/pg130_im003.jpg",
    pg134_im001: "images/pg134_im001.jpg",
    pg136_im001: "images/pg136_im001.jpg",
    pg143_im001: "images/pg143_im001.png",
    pg144_im001: "images/pg144_im001.jpg",
    pg144_im002: "images/pg144_im002.jpg",
    pg150_im001: "images/pg150_im001.jpg"
  };

  const groupedImages = {
    16: [["pg016_im001", "pg016_im002", "pg016_im003"]],
    20: [["pg020_im002", "pg020_im003"]],
    39: [["pg039_im002", "pg039_im003", "pg039_im001", "pg039_im004", "pg039_im005"]],
    60: [["pg060_im001", "pg060_im002", "pg060_im003"]],
    71: [["pg071_im003", "pg071_im001", "pg071_im004", "pg071_im002"]],
    72: [["pg072_im001", "pg072_im002"]],
    74: [["pg074_im002", "pg074_im001"]],
    81: [["pg081_im001", "pg081_im002", "pg081_im003", "pg081_im004"]],
    82: [["pg082_im001", "pg082_im002"]],
    84: [["pg084_im001", "pg084_im002", "pg084_im003", "pg084_im004"]],
    91: [["pg091_im001", "pg091_im004", "pg091_im003", "pg091_im002"]],
    101: [["pg101_im001", "pg101_im002", "pg101_im003", "pg101_im004"]],
    105: [["pg105_im001", "pg105_im003", "pg105_im002", "pg105_im004", "pg105_im005", "pg105_im006", "pg105_im007"]],
    107: [["pg107_im001", "pg107_im002", "pg107_im003", "pg107_im004"], ["pg107_im005", "pg107_im006", "pg107_im007", "pg107_im008"]],
    108: [["pg108_im001", "pg108_im002", "pg108_im003"]],
    110: [["pg110_im002", "pg110_im003", "pg110_im004", "pg110_im005", "pg110_im006"]],
    111: [["pg111_im001", "pg111_im002", "pg111_im003", "pg111_im004"]],
    128: [["pg128_im001", "pg128_im002"]],
    130: [["pg130_im001", "pg130_im002"]]
  };

  const chapterTitles = {
    30: ["Sura ya Pili", "Urithi wa Tanzania"],
    51: ["Sura ya Tatu", "Wajibu na haki za mtoto"],
    65: ["Sura ya Nne", "Matendo ya kuthamini maadili"],
    77: ["Sura ya Tano", "Maarifa na ujuzi wa asili wa jamii"],
    98: ["Sura ya Sita", "Asili za jamii za Watanzania"],
    114: ["Sura ya Saba", "Urithi na asili za jamii kwa maendeleo ya sasa"],
    124: ["Sura ya Nane", "Uhusiano na ushirikiano na jamii"],
    139: ["Sura ya Tisa", "Kukuza na kutunza maadili ya jamii"]
  };

  const headingPattern = /^(Vitendo vya maadili|Matendo ya maadili|Kuhusiana na watu wengine|Kushirikiana$|Kukataa vitendo vya rushwa|Umuhimu wa vitendo vya kimaadili|Maana ya Urithi|Maeneo yenye urithi|Urithi unaohusu|Urithi wa kihistoria|Urithi wa Kihistoria|Urithi uliopo|Urithi wa asili|Urithi usioshikika|Umuhimu wa urithi|Wajibu wa jamii|Wajibu wa mtoto(?: shuleni| nyumbani)?$|Umuhimu wa kutimiza wajibu$|Haki za mtoto$|Wajibu katika kusimamia|Kuheshimu watu wengine$|Kutii sheria$|Kuthamini utii wa sheria (?:shuleni|nyumbani|barabarani)$|Kujithamini$|Kuwajali watu wengine$|Msamiati$)/i;
  const additionalHeadings = new Set([
    "kushirikiana na watu wengine", "dhana ya maarifa na ujuzi wa asili wa jamii",
    "maarifa na ujuzi wa asili katika uchumi", "maarifa na ujuzi wa asili katika kilimo",
    "maarifa na ujuzi wa asili katika uvuvi", "maarifa na ujuzi wa asili katika ufugaji",
    "maarifa na ujuzi wa asili katika uwindaji", "historia ya maarifa na ujuzi wa asili katika jamii",
    "maadili katika maarifa na ujuzi wa jamii katika uchumi",
    "maarifa na ujuzi wa asili katika utunzaji wa mazingira", "maarifa na ujuzi wa asili katika dawa",
    "maadili katika maarifa na ujuzi wa asili katika dawa", "maarifa na ujuzi wa jamii katika dini",
    "maadili katika dini", "asili za jamii", "utamaduni", "kuheshimiana", "kushirikiana",
    "kupenda na kuthamini kazi", "tabia njema", "mavazi", "ngoma za asili", "nyimbo", "vyakula", "michezo",
    "umuhimu wa maarifa na ujuzi wa asili na urithi wa kihistoria", "kiuchumi", "kijamii",
    "mbinu za kutumia maarifa na ujuzi wa asili",
    "kusimulia maarifa na ujuzi wa asili, asili za jamii na urithi katika jamii",
    "thamani ya asili na urithi wa kihistoria katika jamii", "uhusiano", "uhusiano wa kifamilia",
    "matendo ya kuhusiana katika familia", "uhusiano wa kirafiki", "umuhimu wa uhusiano wa familia na marafiki",
    "matendo ya kijamii ya kujenga ushirikiano na uhusiano na jamii",
    "matendo ya kiuchumi ya kujenga ushirikiano na uhusiano na jamii",
    "dhana ya kukuza na kutunza maadili", "mfumo wa uongozi katika ukuzaji na utunzaji wa maadili",
    "mfumo wa ukuzaji na utunzaji wa maadili katika familia",
    "mfumo wa uongozi wa ukoo katika ukuzaji na utunzaji wa maadili",
    "mbinu za kukuza na kutunza maadili", "mfumo wa uongozi wa shule katika ukuzaji na utunzaji wa maadili",
    "mwalimu mkuu", "walimu", "viongozi wa wanafunzi", "kamati ya shule",
    "misingi ya ukuzaji na utunzaji wa maadili ya jamii", "uadilifu", "haki na usawa", "uwazi", "umoja",
    "wajibu wa jamii katika kukuza na kutunza maadili"
  ]);
  const activityPattern = /^(Kazi ya kufanya|Kazi za kufanya)/i;
  const exercisePattern = /^Zoezi (la|la jumla)/i;
  const captionPattern = /^Kielelezo(?: namba)?\s*\d+/i;
  const metadataPattern = /(FOR ONLINE (?:READING|USE) ONLY|\.indd\b|^\d{2}\/\d{2}\/\d{4}\s+\d{1,2}:\d{2}$)/i;

  const sourceOrder = {
    27: ["pg027_n0002", "pg027_n0003", "pg027_n0006", "pg027_n0007", "pg027_n0009", "pg027_n0010", "pg027_n0012", "pg027_n0013", "pg027_n0015", "pg027_n0016", "pg027_n0018", "pg027_n0019", "pg027_n0021", "pg027_n0022", "pg027_n0024", "pg027_n0025", "pg027_n0039", "pg027_im002_ai1", "pg027_n0040", "pg027_n0027", "pg027_n0028", "pg027_n0029", "pg027_n0030", "pg027_n0031", "pg027_n0032", "pg027_n0033"],
    40: ["pg040_n0006", "pg040_n0003", "pg040_n0004", "pg040_n0008", "pg040_n0010", "pg040_n0011", "pg040_n0012", "pg040_im001", "pg040_n0014", "pg040_n0016"],
    48: ["pg048_n0006", "pg048_n0008", "pg048_n0009", "pg048_n0010", "pg048_n0013", "pg048_n0014", "pg048_n0016", "pg048_n0017", "pg048_n0019", "pg048_n0020", "pg048_n0022", "pg048_n0023", "pg048_n0003", "pg048_n0004", "pg048_n0025", "pg048_n0026", "pg048_n0028", "pg048_n0029", "pg048_n0031", "pg048_n0032", "pg048_n0034", "pg048_n0035"],
    53: ["pg053_n0002", "pg053_n0003", "pg053_n0033", "pg053_n0034", "pg053_n0005", "pg053_n0006", "pg053_n0007", "pg053_n0010", "pg053_n0011", "pg053_n0012", "pg053_im001", "pg053_n0014", "pg053_n0017", "pg053_n0018", "pg053_n0020", "pg053_n0021", "pg053_n0023", "pg053_n0024", "pg053_n0026", "pg053_n0027"],
    55: ["pg055_n0006", "pg055_n0008", "pg055_n0002", "pg055_n0003", "pg055_im002", "pg055_n0010", "pg055_n0011", "pg055_n0014", "pg055_n0015", "pg055_n0017", "pg055_n0018", "pg055_n0020", "pg055_n0021", "pg055_n0023", "pg055_n0024", "pg055_n0026", "pg055_n0027", "pg055_im001", "pg055_n0029"],
    57: ["pg057_n0001", "pg057_n0004", "pg057_n0005", "pg057_im002", "pg057_n0007", "pg057_n0009", "pg057_n0010", "pg057_n0013", "pg057_n0014", "pg057_im003", "pg057_n0016", "pg057_n0017", "pg057_n0018", "pg057_n0019", "pg057_n0022", "pg057_n0023", "pg057_n0025", "pg057_n0026", "pg057_n0028", "pg057_n0029", "pg057_n0031", "pg057_n0032", "pg057_n0034", "pg057_n0035"],
    61: ["pg061_n0003", "pg061_n0004", "pg061_n0006", "pg061_n0007", "pg061_n0008", "pg061_im001", "pg061_n0010", "pg061_n0020", "pg061_n0021", "pg061_n0012", "pg061_n0013", "pg061_n0014"],
    62: ["pg062_n0002", "pg062_n0003", "pg062_n0004", "pg062_n0005", "pg062_n0007", "pg062_n0009", "pg062_n0010", "pg062_n0040", "pg062_n0041", "pg062_im001", "pg062_n0012", "pg062_n0015", "pg062_n0016", "pg062_n0018", "pg062_n0019", "pg062_n0021", "pg062_n0022", "pg062_n0024", "pg062_n0025", "pg062_n0027", "pg062_n0028", "pg062_n0030", "pg062_n0031", "pg062_n0033", "pg062_n0034"],
    73: ["pg073_n0002", "pg073_n0003", "pg073_n0004", "pg073_n0005", "pg073_n0006", "pg073_n0008", "pg073_n0010", "pg073_n0019", "pg073_n0020", "pg073_n0012", "pg073_n0014", "pg073_im002"],
    81: ["pg081_im001", "pg081_im002", "pg081_im003", "pg081_im004", "pg081_n0009", "pg081_n0011", "pg081_n0013", "pg081_n0014", "pg081_im005", "pg081_n0016", "pg081_n0022", "pg081_n0023", "pg081_n0024"],
    102: ["pg102_n0003", "pg102_n0005", "pg102_n0007", "pg102_n0008", "pg102_n0010", "pg102_n0012", "pg102_n0013", "pg102_n0014", "pg102_n0015", "pg102_n0016", "pg102_im002", "pg102_n0018"],
    141: ["pg141_n0002", "pg141_n0003", "pg141_n0024", "pg141_n0025", "pg141_n0005", "pg141_n0007", "pg141_n0008", "pg141_n0009", "pg141_n0028", "pg141_n0029", "pg141_n0011", "pg141_n0012", "pg141_n0013", "pg141_n0014", "pg141_n0016", "pg141_n0017"],
    142: ["pg142_n0002", "pg142_n0003", "pg142_n0005", "pg142_n0006", "pg142_n0007", "pg142_n0008", "pg142_n0010", "pg142_n0012", "pg142_n0013", "pg142_n0014", "pg142_n0015", "pg142_n0026", "pg142_n0027", "pg142_n0017", "pg142_n0018", "pg142_n0020"],
    148: ["pg148_n0002", "pg148_n0004", "pg148_n0005", "pg148_n0006", "pg148_n0007", "pg148_n0008", "pg148_n0009", "pg148_n0031", "pg148_n0011", "pg148_n0013", "pg148_n0014", "pg148_n0015", "pg148_n0016", "pg148_n0017", "pg148_n0018", "pg148_n0019", "pg148_n0021", "pg148_n0023", "pg148_n0024"],
    152: ["pg152_n0002", "pg152_n0005", "pg152_n0006", "pg152_n0008", "pg152_n0009", "pg152_n0011", "pg152_n0012", "pg152_n0040", "pg152_n0042", "pg152_n0043", "pg152_n0045", "pg152_n0046", "pg152_n0048", "pg152_n0049", "pg152_n0051", "pg152_n0052", "pg152_n0054", "pg152_n0055", "pg152_n0057", "pg152_n0058", "pg152_n0014", "pg152_n0018", "pg152_n0020", "pg152_n0023", "pg152_n0025", "pg152_n0028", "pg152_n0030", "pg152_n0033", "pg152_n0035"]
  };

  const imageLabels = {
    39: { pg039_im002: "Mdalasini", pg039_im003: "Iliki", pg039_im001: "Karafuu", pg039_im004: "Pilipili manga", pg039_im005: "Binzari nyembamba" },
    73: { pg073_im002: "A." },
    74: { pg074_im002: "B.", pg074_im001: "C." },
    81: { pg081_im001: "Viazi vya kuning’inia", pg081_im002: "Magimbi", pg081_im003: "Viazi vitamu", pg081_im004: "Viazi vikuu" },
    82: { pg082_im001: "Nyavu ya kuvua samaki", pg082_im002: "Ndoano za kutega samaki" },
    101: { pg101_im001: "A.", pg101_im002: "B.", pg101_im003: "C.", pg101_im004: "D." },
    105: { pg105_im001: "Mavazi ya kike ya Wadatoga", pg105_im003: "Mavazi ya kike ya Waha", pg105_im002: "Mavazi ya kike ya Wamasai", pg105_im004: "Vazi la kike la Wagogo", pg105_im005: "Vazi la kiume la Wamasai", pg105_im006: "Vazi la kiume la Wasukuma", pg105_im007: "Mavazi ya kiume ya Wangoni" },
    107: { pg107_im005: "Ngoma", pg107_im006: "Marimba ya mbao na vigongeo", pg107_im007: "Filimbi", pg107_im008: "Manyanga" },
    108: { pg108_im001: "A.", pg108_im002: "B.", pg108_im003: "C." },
    110: { pg110_im002: "A. Ugali wa mtama", pg110_im003: "B. Ndizi za kuchoma", pg110_im004: "C. Ndizi zilizokorogwa", pg110_im005: "D. Kande", pg110_im006: "E. Viazi vitamu vilivyochemshwa" },
    111: { pg111_im001: "A. Kuruka kamba", pg111_im002: "B. Kucheza bao", pg111_im003: "C. Mdako", pg111_im004: "D. Rede" },
    130: { pg130_im001: "A.", pg130_im002: "B." }
  };

  const captionOverrides = {
    pg101_n0004: "Kielelezo namba 1: Matendo ya kusalimiana",
    pg108_n0027: "Kielelezo namba 7: Ala ya mziki ijulikanayo kama zeze",
    pg128_n0022: "Kielelezo namba 5: Matendo ya uhusiano katika familia",
    pg130_n0018: "Kielelezo namba 7: Wanafunzi wakipeana zawadi"
  };
  const visibleTextOverrides = {
    pg022_n0007: "Kushiriki katika misiba ni mojawapo ya vitendo vya kimaadili kwa sababu huonesha hali ya kujali na kufariji watu wengine.",
    pg022_n0008: "Tunaposhiriki misiba, tunatakiwa kusaidia kazi kwa hali na mali.",
    pg038_n0007: "Vilevile, Kaole kuna urithi wa bidhaa kama sahani na shanga zilizoletwa na wafanyabiashara kutoka Mashariki ya Mbali na Kati.",
    pg038_n0009: "Makumbusho mbalimbali nchini zina bidhaa kama vile vigae, vyombo na shanga zilizoletwa na wafanyabiashara kutoka Mashariki ya Mbali na Kati.",
    pg039_n0013: "Mitindo ya mavazi iliyoletwa na Waarabu",
    pg040_n0003: "Kazi ya kufanya namba 3"
  };
  const captionContinuationIds = new Set(["pg101_n0005", "pg108_n0028", "pg128_n0023", "pg130_n0019"]);
  const page75TableIds = new Set(["pg075_n0024", "pg075_n0026", "pg075_n0028", "pg075_n0031", "pg075_n0033", "pg075_n0036", "pg075_n0039", "pg075_n0041", "pg075_n0044", "pg075_n0047", "pg075_n0049", "pg075_n0052", "pg075_n0055", "pg075_n0057", "pg075_n0060"]);
  const page126TreeIds = new Set(["pg126_n0009", "pg126_n0010", "pg126_n0011", "pg126_n0012", "pg126_n0013", "pg126_n0014"]);
  const page127DiagramLabelIds = new Set(["pg127_n0010", "pg127_n0011", "pg127_n0012", "pg127_n0013", "pg127_n0014", "pg127_n0015", "pg127_n0016", "pg127_n0017", "pg127_n0018", "pg127_n0019", "pg127_n0020", "pg127_n0021", "pg127_n0022", "pg127_n0023"]);
  const page140TableIds = new Set(["pg140_n0014", "pg140_n0016", "pg140_n0019", "pg140_n0021", "pg140_n0023", "pg140_n0026"]);
  const page146ChartIds = new Set(["pg146_n0015", "pg146_n0016", "pg146_n0017", "pg146_n0018", "pg146_n0019", "pg146_n0020", "pg146_n0021", "pg146_n0022"]);
  const exerciseBreakBefore = {
    74: new Set(["pg074_n0013"]),
    78: new Set(["pg078_n0010"]),
    95: new Set(["pg095_n0019"]),
    118: new Set(["pg118_n0012"]),
    130: new Set(["pg130_n0012"])
  };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function makeFigure(ids, descriptions, page) {
    const figure = element("figure", `flow-figure image-count-${ids.length}`);
    const pictures = element("div", "flow-figure-images");
    ids.forEach((id, index) => {
      const img = document.createElement("img");
      img.src = imageFiles[id];
      img.alt = descriptions[id] || "";
      img.loading = "eager";
      const label = imageLabels[page]?.[id] || (page === 71 ? `${String.fromCharCode(65 + index)}.` : "");
      if (label) {
        const markerLabel = /^[A-E]\.$/.test(label);
        const cell = element("div", `flow-image-cell ${markerLabel ? "flow-marker-cell" : "flow-caption-cell"}`);
        const labelNode = element("strong", "flow-image-label", label);
        if (markerLabel) cell.appendChild(labelNode);
        cell.appendChild(img);
        if (!markerLabel) cell.appendChild(labelNode);
        pictures.appendChild(cell);
      } else {
        pictures.appendChild(img);
      }
    });
    figure.appendChild(pictures);
    return figure;
  }

  function isStandaloneMarker(text) {
    return /^(?:\(?[a-z]\)?|\(?[ivx]+\)?|\d+\.)$/i.test(text);
  }

  function isBookHeading(text) {
    return headingPattern.test(text) || additionalHeadings.has(text.toLowerCase());
  }

  function buildChapterHeader(inner, page) {
    const chapter = chapterTitles[page];
    if (!chapter) return;
    const banner = element("header", "flow-chapter-banner");
    banner.appendChild(element("div", "flow-chapter-number", chapter[0]));
    banner.appendChild(element("h1", "flow-chapter-title", chapter[1]));
    inner.appendChild(banner);
  }

  function buildRightsTable() {
    const rows = [
      ["i.", "Kuwasalimia watoto wengine na watu waliokuzidi umri", "", "✓"],
      ["ii.", "Kupata mahitaji ya shule, chakula na malazi", "✓", ""],
      ["iii.", "Kushirikishwa kufanya maamuzi", "", ""],
      ["iv.", "Kuwathamini watu wenye mahitaji maalumu", "", ""],
      ["v.", "Kupata nafasi ya kucheza", "", ""],
      ["vi.", "Kupata malezi bora", "", ""],
      ["vii.", "Kuheshimiwa na watu wengine", "", ""],
      ["viii.", "Kulindwa", "", ""],
      ["ix.", "Kufanya kazi zinazolingana na uwezo wa mtoto", "", ""],
      ["x.", "Kupata elimu bora", "", ""]
    ];
    const table = element("table", "flow-data-table");
    table.setAttribute("aria-label", "Matendo ya haki na wajibu wa mtoto");
    const head = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Na", "Matendo", "Haki", "Wajibu"].forEach((text) => headRow.appendChild(element("th", "", text)));
    head.appendChild(headRow);
    table.appendChild(head);
    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((text, index) => tr.appendChild(element(index === 0 ? "th" : "td", "", text)));
      body.appendChild(tr);
    });
    table.appendChild(body);
    return table;
  }

  function renderPage52(inner) {
    inner.appendChild(element(
      "p",
      "flow-source-instruction",
      "Soma matendo mchanganyiko katika sehemu A, kisha fanya zoezi linalofuata."
    ));

    const table = element("table", "flow-data-table flow-responsibility-table");
    table.setAttribute("aria-label", "Matendo mchanganyiko ya kuainisha kuwa wajibu au siyo wajibu");
    table.innerHTML = "<thead><tr><th>Sehemu A<br><strong>Matendo mchanganyiko</strong></th><th>Sehemu B</th><th>Sehemu C</th></tr></thead>";
    const body = document.createElement("tbody");
    const row = document.createElement("tr");
    row.appendChild(element(
      "td",
      "",
      "Kufanya usafi darasani, kuwaheshimu wakubwa na wadogo, kununua chakula, kuwasalimia wazazi, kuwahi kurudi nyumbani, kununua kalamu, kuwasaidia wazee, kufanya usafi wa mwili, kutii sheria za shule, kununua mavazi, kuwatii wazazi, kuosha vyombo unavyolia chakula, kufua nguo zako, kuwatii walimu, kuhudhuria vipindi darasani, kumaliza kazi za shule na darasani"
    ));
    row.appendChild(element("td", "flow-answer-space", ""));
    row.appendChild(element("td", "flow-answer-space", ""));
    body.appendChild(row);
    table.appendChild(body);
    inner.appendChild(table);

    const firstExercise = element("section", "flow-exercise");
    firstExercise.appendChild(element("h2", "", "Zoezi la 1"));
    const firstQuestion = element("ol", "flow-review-questions");
    firstQuestion.appendChild(element(
      "li",
      "",
      "Andika matendo yanayoonesha wajibu katika sehemu B na matendo ambayo siyo wajibu katika sehemu C."
    ));
    firstExercise.appendChild(firstQuestion);
    inner.appendChild(firstExercise);

    inner.appendChild(element(
      "p",
      "flow-paragraph",
      "Kielelezo namba 1 kinaonesha baadhi ya wajibu wa mtoto."
    ));
    const figure = makeFigure(["pg052_im001"], {
      pg052_im001: "Watoto wa shule wanatembea pamoja, na mmoja yuko kwenye kiti cha magurudumu. Wameinua mabango yanayoonesha wajibu wa mtoto."
    }, 52);
    figure.appendChild(element("figcaption", "", "Kielelezo namba 1: Wajibu wa mtoto"));
    inner.appendChild(figure);

    const questions = element("ol", "flow-review-questions");
    questions.start = 2;
    [
      "Eleza kwa nini matendo uliyoorodhesha katika sehemu B ni wajibu wa mtoto.",
      "Eleza kwa nini matendo uliyoorodhesha katika sehemu C siyo wajibu wa mtoto."
    ].forEach((text) => questions.appendChild(element("li", "", text)));
    inner.appendChild(questions);
  }

  function buildMatchingTable() {
    const table = element("table", "flow-data-table flow-matching-table");
    table.setAttribute("aria-label", "Zoezi la kuoanisha matendo na maana zake");
    table.innerHTML = "<thead><tr><th>Na</th><th>Sehemu A</th><th>Jibu</th><th>Sehemu B</th></tr></thead>";
    const rows = [
      ["i.", "Kutii sheria", "", "A. kuwapenda, kuwaheshimu na kuwasaidia watu wengine"],
      ["ii.", "Kujali", "", "B. kuwahi shuleni"],
      ["iii.", "Kujithamini", "", "C. kufanya matendo ya pamoja"],
      ["iv.", "Kushirikiana", "", "D. kujijali na kujali watu wengine"]
    ];
    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((value, index) => tr.appendChild(element(index === 0 ? "th" : "td", "", value)));
      body.appendChild(tr);
    });
    table.appendChild(body);
    return table;
  }

  function buildHeritageTable(rows, includeHeader) {
    const table = element("table", "flow-data-table flow-heritage-table");
    table.setAttribute("aria-label", "Zoezi la kuoanisha maeneo na urithi wa Tanzania");
    if (includeHeader) {
      table.innerHTML = "<thead><tr><th>Sehemu A</th><th>Jibu</th><th>Sehemu B</th></tr></thead>";
    }
    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((value) => tr.appendChild(element("td", "", value)));
      body.appendChild(tr);
    });
    table.appendChild(body);
    return table;
  }

  function renderPage49(inner) {
    const continuation = element("ol", "flow-review-statements");
    continuation.start = 4;
    continuation.type = "i";
    [
      "Magofu ya mji wa Kunduchi yalijengwa wakati wa biashara kati ya jamii zetu na nchi za Mashariki ya Mbali na Kati.",
      "Maadili ya jamii za mwambao wa Bahari ya Hindi yamechangiwa na wafanyabiashara kutoka Mashariki ya Mbali na Kati."
    ].forEach((text) => continuation.appendChild(element("li", "", text)));
    inner.appendChild(continuation);

    const prompt = element("section", "flow-review-question");
    prompt.appendChild(element("h2", "", "2."));
    prompt.appendChild(element("p", "flow-paragraph", "Oanisha kipengele kutoka sehemu A na maeneo yaliyopo sehemu B kwa kuandika herufi ya jibu sahihi katika sehemu uliyopewa."));
    inner.appendChild(prompt);
    inner.appendChild(buildHeritageTable([
      ["(i) Jumba la wafanyabiashara ya utumwa", "", "A. Kilwa Kisiwani, Kaole"],
      ["(ii) Makumbusho ya Vita vya Majimaji", "", "B. Husuni Kubwa"],
      ["(iii) Maeneo yenye historia ya watumwa", "", "C. Oldupai"],
      ["(iv) Maarufu kwa michoro ya mapangoni", "", "D. Bagamoyo na Zanzibar"],
      ["(v) Makanisa yanayotumika ambayo ni urithi wa Tanzania", "", "E. Kilwa, Tongoni, Pangani na Kunduchi"],
      ["(vi) Eneo lenye magofu na masalia yenye miji iliyotumiwa na wafanyabiashara kutoka Mashariki ya Mbali na Kati", "", "F. Laetoli"]
    ], true));
  }

  function renderPage50(inner) {
    inner.appendChild(buildHeritageTable([
      ["(vii) Gofu la ikulu ya sultani wa Kilwa", "", "G. Tanga"],
      ["(viii) Urithi wa misikiti ya kale", "", "H. Kondoa Irangi"],
      ["(ix) Kuligundulika binadamu wa kale zaidi", "", "I. Anglikani Mkunazini, Zanzibar, Azania Front"],
      ["(x) Kuna nyayo za binadamu wa kale", "", "J. Caravan Serai"],
      ["", "", "K. Songea"]
    ], false));

    const questions = element("ol", "flow-review-questions");
    questions.start = 3;
    [
      "Andika umuhimu wa urithi wa Tanzania.",
      "Andika mambo uliyojifunza kuhusu urithi uliopo nchini.",
      "Andika urithi wa kimaadili na kitamaduni tuliorithi kutoka kwa wageni waliokuja nchini."
    ].forEach((text) => questions.appendChild(element("li", "", text)));
    inner.appendChild(questions);

    inner.appendChild(element("h2", "flow-vocabulary-title", "Msamiati"));
    const glossary = element("dl", "flow-glossary");
    [
      ["Husuni", "jumba lililotumiwa na wafalme au sultani kama makazi"],
      ["Kale", "huhusisha zamani au miaka mingi iliyopita"],
      ["Maadili", "tabia, mienendo, kanuni, nidhamu za jamii husika"],
      ["Magofu", "mabaki ya majengo ya kale yanayoonekana"],
      ["Makumbusho", "maeneo yenye kuhifadhi vitu vyenye urithi wa kiasili na kiutamaduni"],
      ["Oldupai", "eneo hili hujulikana pia kama bonde la olduvai"],
      ["Sultani", "ni mfalme au mtawala wa nchi, jina lilitumiwa na watawala wa Kiarabu"],
      ["Utumwa", "mfumo ambao binadamu alitumikishwa bila malipo na kumilikiwa na mtu mwingine. Mtumwa hana uhuru wa mali, hata watoto walikuwa ni mali ya aliyemmiliki."]
    ].forEach(([term, definition]) => {
      glossary.appendChild(element("dt", "", term));
      glossary.appendChild(element("dd", "", definition));
    });
    inner.appendChild(glossary);
  }

  function buildClassificationTable() {
    const table = element("table", "flow-data-table flow-classification-table");
    table.setAttribute("aria-label", "Kuainisha matendo ya kimaadili na yasiyo ya kimaadili");
    table.innerHTML = "<thead><tr><th>Matendo</th><th>Matendo ya kimaadili</th><th>Matendo yasiyo ya kimaadili</th></tr></thead>";
    const tr = document.createElement("tr");
    tr.appendChild(element("td", "", "Kuwaheshimu watu waliotuzidi umri; kupigana na watu wengine; kuvaa nguo fupi na zinazobana; kuiba; kushirikiana na watu wengine; kutowajali watu wengine; kusema uongo; kuwathamini watu wengine; kusalimiana na wenzako."));
    tr.appendChild(element("td", "flow-answer-space", ""));
    tr.appendChild(element("td", "flow-answer-space", ""));
    const body = document.createElement("tbody");
    body.appendChild(tr);
    table.appendChild(body);
    return table;
  }

  function buildFamilyTree() {
    const figure = element("figure", "flow-diagram flow-family-tree");
    figure.setAttribute("aria-label", "Mti wa familia");
    figure.appendChild(element("h3", "", "Familia"));
    const parents = element("div", "flow-tree-level flow-tree-parents");
    parents.appendChild(element("span", "", "Baba"));
    parents.appendChild(element("span", "", "Mama"));
    figure.appendChild(parents);
    const children = element("div", "flow-tree-level flow-tree-children");
    children.appendChild(element("span", "", "Kaka"));
    children.appendChild(element("span", "", "Mimi"));
    children.appendChild(element("span", "", "Dada"));
    figure.appendChild(children);
    figure.appendChild(element("figcaption", "", "Kielelezo namba 2: Mti wa familia"));
    return figure;
  }

  function buildSchoolLeadership() {
    const figure = element("figure", "flow-diagram flow-leadership-chart");
    figure.setAttribute("aria-label", "Mfumo wa uongozi katika ngazi ya shule");
    ["Kamati ya Shule", "Mwalimu Mkuu", "Mwalimu Mkuu Msaidizi", "Mwalimu wa Taaluma", "Mwalimu wa nidhamu", "Walimu", "Viranja", "Wanafunzi"].forEach((label) => figure.appendChild(element("div", "flow-leadership-node", label)));
    figure.appendChild(element("figcaption", "", "Kielelezo namba 4: Mfumo wa uongozi katika ngazi ya shule"));
    return figure;
  }

  function renderPage() {
    const section = document.querySelector("section.semantic-flow-page");
    if (!section) return;
    const inner = section.querySelector(".source-page-inner");
    const hook = section.querySelector(".page-narration-hook");
    if (!inner || !hook) return;

    const page = Number(inner.dataset.pageNumber);
    const spans = Array.from(hook.querySelectorAll(":scope > span[data-id]"));
    if (sourceOrder[page]) {
      const rank = new Map(sourceOrder[page].map((id, index) => [id, index]));
      spans.sort((a, b) => (rank.get(a.dataset.id) ?? 9999) - (rank.get(b.dataset.id) ?? 9999));
    }
    const descriptions = {};
    spans.forEach((span) => { descriptions[span.dataset.id] = span.textContent.trim(); });

    if (page === 49 || page === 50 || page === 52) {
      if (page === 49) renderPage49(inner);
      else if (page === 50) renderPage50(inner);
      else renderPage52(inner);
      section.classList.add(`flow-page-${page}`, "flow-dense-page");
      return;
    }

    buildChapterHeader(inner, page);

    const groups = groupedImages[page] || [];
    const groupByFirst = new Map(groups.map((ids) => [ids[0], ids]));
    const groupedIds = new Set(groups.flat());
    let lastFigure = null;
    let list = null;
    let pendingListItem = null;
    let exercise = null;

    function closeCollections() {
      list = null;
      pendingListItem = null;
      exercise = null;
    }

    spans.forEach((span) => {
      const id = span.dataset.id;
      const text = visibleTextOverrides[id] || span.textContent.replace(/\s+/g, " ").trim();
      if (!text || metadataPattern.test(text) || /_ans_/.test(id)) return;
      if (exerciseBreakBefore[page]?.has(id)) closeCollections();
      const chapter = chapterTitles[page];
      if (chapter && (text === chapter[0] || text === chapter[1] || /^pg\d+_im/i.test(id) && /Sura ya/i.test(text))) return;
      if (page === 71 && /^[A-D]\.$/.test(text)) return;
      if (Object.values(imageLabels[page] || {}).includes(text)) return;
      if (captionContinuationIds.has(id)) return;
      if (page === 63 && id === "pg063_n0022") {
        (exercise || inner).appendChild(buildRightsTable());
        return;
      }
      if (page === 63 && ["pg063_n0024", "pg063_ac001", "pg063_ac002", "pg063_n0031", "pg063_n0033", "pg063_n0036", "pg063_n0039", "pg063_n0041", "pg063_n0043", "pg063_n0047", "pg063_n0049", "pg063_n0026", "pg063_n0028", "pg063_n0054", "pg063_n0056", "pg063_n0061", "pg063_n0063", "pg063_n0068", "pg063_n0070", "pg063_n0075", "pg063_n0077", "pg063_n0082", "pg063_n0084", "pg063_n0089", "pg063_n0091", "pg063_n0096", "pg063_n0098", "pg063_ac003", "pg063_ac004"].includes(id)) return;
      if (page === 69 && id === "pg069_n0010") closeCollections();
      if (page === 75 && id === "pg075_n0022") {
        (exercise || inner).appendChild(buildMatchingTable());
        return;
      }
      if (page === 75 && page75TableIds.has(id)) return;
      if (page === 126 && id === "pg126_n0008") {
        closeCollections();
        inner.appendChild(buildFamilyTree());
        return;
      }
      if (page === 126 && page126TreeIds.has(id)) return;
      if (page === 127 && page127DiagramLabelIds.has(id)) return;
      if (page === 140 && id === "pg140_n0012") {
        (exercise || inner).appendChild(buildClassificationTable());
        return;
      }
      if (page === 140 && page140TableIds.has(id)) return;
      if (page === 146 && id === "pg146_n0014") {
        closeCollections();
        inner.appendChild(buildSchoolLeadership());
        return;
      }
      if (page === 146 && page146ChartIds.has(id)) return;

      if (page === 142 && id === "pg142_n0020") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", "Kazi ya kufanya namba 6"));
        callout.appendChild(element("p", "flow-paragraph", "Fikiri na andika mambo matano (5) ya kimaadili uliyofundishwa na ndugu wa karibu katika ukoo."));
        inner.appendChild(callout);
      }

      if (page === 148 && id === "pg148_n0031") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", text));
        callout.appendChild(element("p", "flow-paragraph", "Andika majukumu ya mwalimu wa darasa na mwalimu wa nidhamu katika kukuza na kutunza maadili shuleni."));
        inner.appendChild(callout);
        return;
      }

      if (page === 64 && id === "pg064_n0002" && !exercise) {
        exercise = element("section", "flow-exercise flow-continuation-exercise");
        inner.appendChild(exercise);
      }

      if (page === 31 && id === "pg031_n0011") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", "Kazi ya kufanya namba 2"));
        callout.appendChild(element("p", "flow-paragraph", "Tembelea maeneo yenye urithi kama vile magofu ya miji, misikiti, makanisa, masalia ya binadamu, zana za mawe, mbuga za wanyama, milima, mito ya asili na misitu katika maeneo unayoishi, kisha orodhesha urithi uliopo."));
        inner.appendChild(callout);
      }

      if (page === 43 && id === "pg043_im001") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", "Kazi ya kufanya namba 4"));
        inner.appendChild(callout);
        exercise = callout;
        return;
      }

      if (groupByFirst.has(id)) {
        closeCollections();
        lastFigure = makeFigure(groupByFirst.get(id), descriptions, page);
        inner.appendChild(lastFigure);
        return;
      }
      if (groupedIds.has(id)) return;

      if (page === 58 && id === "pg058_im002") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", "Kazi ya kufanya namba 7"));
        callout.appendChild(element("p", "flow-paragraph", "Tafuta mambo yanayohusu haki za mtoto kutoka katika vyanzo mbalimbali ikiwemo vitabu, tovuti, na maktaba mtandao."));
        inner.appendChild(callout);
      }

      if (imageFiles[id]) {
        closeCollections();
        lastFigure = makeFigure([id], descriptions, page);
        inner.appendChild(lastFigure);
        return;
      }
      if (/^pg\d+_im/i.test(id)) return;

      if ((captionPattern.test(text) || captionOverrides[id]) && lastFigure) {
        lastFigure.appendChild(element("figcaption", "", captionOverrides[id] || text));
        lastFigure = null;
        return;
      }

      if (exercisePattern.test(text)) {
        closeCollections();
        exercise = element("section", "flow-exercise");
        exercise.appendChild(element("h2", "", text));
        inner.appendChild(exercise);
        return;
      }

      if (activityPattern.test(text)) {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", text));
        inner.appendChild(callout);
        exercise = callout;
        return;
      }

      if (text === "Utangulizi" || text === "Fikiri") {
        closeCollections();
        const box = element("section", `flow-${text.toLowerCase()}`);
        box.appendChild(element("h2", "", text));
        inner.appendChild(box);
        exercise = box;
        return;
      }

      if (isBookHeading(text)) {
        closeCollections();
        inner.appendChild(element("h2", text === "Msamiati" ? "flow-vocabulary-title" : "flow-heading", text));
        return;
      }

      if (page === 147 && /^pg147_n00(?:1[1-9]|20)$/.test(id)) {
        const answerItem = element("p", "flow-paragraph flow-answer-prompt");
        answerItem.appendChild(document.createTextNode(text.replace(/\s*\[\[blank:item-\d+\]\]\s*/i, " ").trim()));
        const answerLine = element("span", "flow-inline-answer");
        answerLine.setAttribute("aria-label", "Nafasi ya jibu");
        answerItem.appendChild(answerLine);
        (exercise || inner).appendChild(answerItem);
        return;
      }

      if (page === 48 && id === "pg048_n0026") {
        const questions = element("ol", "flow-list");
        const item = element("li", "flow-list-item");
        item.dataset.marker = "1.";
        item.appendChild(element("span", "", text));
        questions.appendChild(item);
        (exercise || inner).appendChild(questions);
        return;
      }

      if (page === 130 && id === "pg130_n0009") {
        const questions = element("ol", "flow-list");
        [text, descriptions.pg130_n0010].forEach((question, index) => {
          const item = element("li", "flow-list-item");
          item.dataset.marker = `${index + 1}.`;
          item.appendChild(element("span", "", question));
          questions.appendChild(item);
        });
        (exercise || inner).appendChild(questions);
        return;
      }

      if (page === 130 && id === "pg130_n0010") return;

      const target = exercise || inner;
      if (isStandaloneMarker(text)) {
        if (!list || list.parentElement !== target) {
          list = element("ol", "flow-list");
          target.appendChild(list);
        }
        const item = element("li", "flow-list-item");
        item.dataset.marker = text;
        list.appendChild(item);
        pendingListItem = item;
        return;
      }

      if (pendingListItem && pendingListItem.parentElement === list && list.parentElement === target) {
        pendingListItem.appendChild(element("span", "", text));
        pendingListItem = null;
        return;
      }

      list = null;
      target.appendChild(element("p", "flow-paragraph", text));
      if (target.classList.contains("flow-activity") || target.classList.contains("flow-fikiri")) exercise = null;
    });

    if (page === 26) {
      inner.appendChild(element("p", "flow-paragraph", "Vitendo vya kimaadili ni muhimu katika maisha yetu. Vitendo hivi hujenga umoja katika jamii bila ya kujali tofauti za kijinsi,"));
    }

    if (page === 52) section.classList.add("flow-table-page");
    section.classList.add(`flow-page-${page}`);
    if (page >= 73) section.classList.add("flow-late-page");
    if ([24, 26, 27, 28, 29, 47, 48, 49, 50, 53, 54, 55, 57, 59, 62, 63, 64, 66, 68, 69, 70, 71, 72].includes(page) || page >= 73) section.classList.add("flow-dense-page");
    if ([30, 51, 65, 77, 98, 114, 124, 139].includes(page)) section.classList.add("flow-chapter-page");
  }

  renderPage();
})();
