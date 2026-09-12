(function () {
  "use strict";

  const imageFiles = {
    pg017_im001: "images/pg017_im001.jpg",
    pg017_im002: "images/pg017_im002.jpg",
    pg017_im003: "images/pg017_im003.jpg",
    pg018_im001: "images/pg018_im001.jpg",
    pg019_im001: "images/pg019_im001.jpg",
    pg020_im001: "images/pg020_im001.jpg",
    pg020_im002: "images/pg020_im002.jpg",
    pg021_im002: "images/pg021_im002.jpg",
    pg021_im003: "images/pg021_im003.jpg",
    pg022_im001: "images/pg022_im001.jpg",
    pg023_im001: "images/pg023_im001.png",
    pg033_im001: "images/pg033_im001.png",
    pg033_im002: "images/pg033_im002.jpg",
    pg034_im001: "images/pg034_im001.png",
    pg034_im002: "images/pg034_im002.png",
    pg036_im001: "images/pg036_im001.jpg",
    pg036_im002: "images/pg036_im002.jpg",
    pg037_im001: "images/pg037_im001.jpg",
    pg038_im001: "images/pg038_im001.jpg",
    pg038_im002: "images/pg038_im002.jpg",
    pg039_im001: "images/pg039_im001.jpg",
    pg040_im001: "images/pg040_im001.jpg",
    pg040_im002: "images/pg040_im002.jpg",
    pg040_im003: "images/pg040_im003.png",
    pg040_im004: "images/pg040_im004.jpg",
    pg040_im005: "images/pg040_im005.jpg",
    pg040_im006: "images/pg040_im006.jpg",
    pg041_im001: "images/pg041_im001.png",
    pg042_im001: "images/pg042_im001.jpg",
    pg043_im001: "images/pg043_im001.png",
    pg045_im001: "images/pg045_im001.jpg",
    pg045_im002: "images/pg045_im002.jpg",
    pg046_im001: "images/pg046_im001.jpg",
    pg047_im001: "images/pg047_im001.png",
    pg053_im001: "images/pg053_im001.jpg",
    pg054_im001: "images/pg054_im001.jpg",
    pg055_im001: "images/pg055_im001.jpg",
    pg056_im001: "images/pg056_im001.jpg",
    pg057_im001: "images/pg057_im001.jpg",
    pg057_im002: "images/pg057_im002.jpg",
    pg059_im002: "images/pg059_im002.jpg",
    pg060_im001: "images/pg060_im001.jpg",
    pg061_im001: "images/pg061_im001.png",
    pg061_im002: "images/pg061_im002.png",
    pg061_im003: "images/pg061_im003.png",
    pg061_im004: "images/pg061_im004.jpg",
    pg062_im001: "images/pg062_im001.jpg",
    pg068_im001: "images/pg068_im001.jpg",
    pg068_im002: "images/pg068_im002.jpg",
    pg070_im001: "images/pg070_im001.jpg",
    pg072_im001: "images/pg072_im001.png",
    pg072_im002: "images/pg072_im002.png",
    pg072_im003: "images/pg072_im003.png",
    pg072_im004: "images/pg072_im004.jpg",
    pg073_im001: "images/pg073_im001.png",
    pg073_im002: "images/pg073_im002.jpg",
    pg074_im002: "images/pg074_im002.png",
    pg075_im001: "images/pg075_im001.jpg",
    pg075_im002: "images/pg075_im002.jpg",
    pg079_im001: "images/pg079_im001.png",
    pg080_im001: "images/pg080_im001.png",
    pg081_im001: "images/pg081_im001.png",
    pg082_im001: "images/pg082_im001.jpg",
    pg082_im002: "images/pg082_im002.jpg",
    pg082_im003: "images/pg082_im003.jpg",
    pg082_im004: "images/pg082_im004.jpg",
    pg082_im005: "images/pg082_im005.jpg",
    pg083_im001: "images/pg083_im001.jpg",
    pg083_im002: "images/pg083_im002.jpg",
    pg083_im003: "images/pg083_im003.jpg",
    pg084_im001: "images/pg084_im001.jpg",
    pg085_im001: "images/pg085_im001.jpg",
    pg085_im002: "images/pg085_im002.jpg",
    pg085_im003: "images/pg085_im003.png",
    pg085_im004: "images/pg085_im004.jpg",
    pg091_im001: "images/pg091_im001.jpg",
    pg092_im001: "images/pg092_im001.png",
    pg092_im002: "images/pg092_im002.png",
    pg092_im003: "images/pg092_im003.png",
    pg092_im004: "images/pg092_im004.png",
    pg093_im001: "images/pg093_im001.jpg",
    pg095_im001: "images/pg095_im001.jpg",
    pg102_im001: "images/pg102_im001.jpg",
    pg102_im002: "images/pg102_im002.jpg",
    pg102_im003: "images/pg102_im003.jpg",
    pg102_im004: "images/pg102_im004.jpg",
    pg103_im002: "images/pg103_im002.jpg",
    pg106_im001: "images/pg106_im001.jpg",
    pg106_im002: "images/pg106_im002.jpg",
    pg106_im003: "images/pg106_im003.png",
    pg106_im004: "images/pg106_im004.png",
    pg106_im005: "images/pg106_im005.png",
    pg106_im006: "images/pg106_im006.png",
    pg106_im007: "images/pg106_im007.jpg",
    pg108_im001: "images/pg108_im001.png",
    pg108_im002: "images/pg108_im002.png",
    pg108_im003: "images/pg108_im003.png",
    pg108_im004: "images/pg108_im004.jpg",
    pg108_im005: "images/pg108_im005.png",
    pg108_im006: "images/pg108_im006.jpg",
    pg108_im007: "images/pg108_im007.jpg",
    pg108_im008: "images/pg108_im008.png",
    pg109_im001: "images/pg109_im001.png",
    pg109_im002: "images/pg109_im002.png",
    pg109_im003: "images/pg109_im003.png",
    pg109_im004: "images/pg109_im004.jpg",
    pg111_im002: "images/pg111_im002.png",
    pg111_im003: "images/pg111_im003.jpg",
    pg111_im004: "images/pg111_im004.jpg",
    pg111_im005: "images/pg111_im005.png",
    pg111_im006: "images/pg111_im006.jpg",
    pg112_im001: "images/pg112_im001.png",
    pg112_im002: "images/pg112_im002.png",
    pg112_im003: "images/pg112_im003.jpg",
    pg112_im004: "images/pg112_im004.png",
    pg118_im001: "images/pg118_im001.png",
    pg120_im001: "images/pg120_im001.jpg",
    pg120_im002: "images/pg120_im002.jpg",
    pg121_im001: "images/pg121_im001.jpg",
    pg121_im002: "images/pg121_im002.jpg",
    pg122_im001: "images/pg122_im001.png",
    pg126_im001: "images/pg126_im001.png",
    pg128_im001: "images/pg128_im001.png",
    pg128_im016: "images/pg128_im016.png",
    pg129_im001: "images/pg129_im001.jpg",
    pg129_im002: "images/pg129_im002.jpg",
    pg131_im001: "images/pg131_im001.png",
    pg131_im002: "images/pg131_im002.jpg",
    pg131_im003: "images/pg131_im003.jpg",
    pg135_im001: "images/pg135_im001.jpg",
    pg137_im001: "images/pg137_im001.jpg",
    pg144_im001: "images/pg144_im001.png",
    pg145_im001: "images/pg145_im001.jpg",
    pg145_im002: "images/pg145_im002.jpg",
    pg151_im001: "images/pg151_im001.jpg"
  };

  const groupedImages = {
    16: [["pg017_im001", "pg017_im002", "pg017_im003"]],
    20: [["pg021_im002", "pg021_im003"]],
    39: [["pg040_im002", "pg040_im003", "pg040_im001", "pg040_im004", "pg040_im005"]],
    60: [["pg061_im001", "pg061_im002", "pg061_im003"]],
    71: [["pg072_im003", "pg072_im001", "pg072_im004", "pg072_im002"]],
    72: [["pg073_im001", "pg073_im002"]],
    74: [["pg075_im002", "pg075_im001"]],
    81: [["pg082_im001", "pg082_im002", "pg082_im003", "pg082_im004"]],
    82: [["pg083_im001", "pg083_im002"]],
    84: [["pg085_im001", "pg085_im002", "pg085_im003", "pg085_im004"]],
    91: [["pg092_im001", "pg092_im004", "pg092_im003", "pg092_im002"]],
    101: [["pg102_im001", "pg102_im002", "pg102_im003", "pg102_im004"]],
    105: [["pg106_im001", "pg106_im003", "pg106_im002", "pg106_im004", "pg106_im005", "pg106_im006", "pg106_im007"]],
    107: [["pg108_im001", "pg108_im002", "pg108_im003", "pg108_im004"], ["pg108_im005", "pg108_im006", "pg108_im007", "pg108_im008"]],
    108: [["pg109_im001", "pg109_im002", "pg109_im003"]],
    110: [["pg111_im002", "pg111_im003", "pg111_im004", "pg111_im005", "pg111_im006"]],
    111: [["pg112_im001", "pg112_im002", "pg112_im003", "pg112_im004"]],
    128: [["pg129_im001", "pg129_im002"]],
    130: [["pg131_im001", "pg131_im002"]]
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
    27: ["pg028_n0002", "pg028_n0003", "pg028_n0006", "pg028_n0007", "pg028_n0009", "pg028_n0010", "pg028_n0012", "pg028_n0013", "pg028_n0015", "pg028_n0016", "pg028_n0018", "pg028_n0019", "pg028_n0021", "pg028_n0022", "pg028_n0024", "pg028_n0025", "pg028_n0039", "pg028_im002_ai1", "pg028_n0040", "pg028_n0027", "pg028_n0028", "pg028_n0029", "pg028_n0030", "pg028_n0031", "pg028_n0032", "pg028_n0033"],
    40: ["pg041_n0006", "pg041_n0003", "pg041_n0004", "pg041_n0008", "pg041_n0010", "pg041_n0011", "pg041_n0012", "pg041_im001", "pg041_n0014", "pg041_n0016"],
    48: ["pg049_n0006", "pg049_n0003", "pg049_n0004", "pg049_n0008", "pg049_n0009", "pg049_n0010", "pg049_n0013", "pg049_n0014", "pg049_n0016", "pg049_n0017", "pg049_n0019", "pg049_n0020", "pg049_n0022", "pg049_n0023", "pg049_n0025", "pg049_n0026", "pg049_n0028", "pg049_n0029", "pg049_n0031", "pg049_n0032", "pg049_n0034", "pg049_n0035"],
    51: ["pg052_n0002", "pg052_n0003", "pg052_n0005", "pg052_n0007", "pg052_n0008", "pg052_n0009", "pg052_n0010", "pg052_n0012", "pg052_n0013", "pg052_n0015", "pg052_n0025", "pg052_n0026", "pg052_n0017", "pg052_n0018", "pg052_n0019"],
    53: ["pg054_n0002", "pg054_n0003", "pg054_n0033", "pg054_n0034", "pg054_n0005", "pg054_n0006", "pg054_n0007", "pg054_n0010", "pg054_n0011", "pg054_n0012", "pg054_im001", "pg054_n0014", "pg054_n0017", "pg054_n0018", "pg054_n0020", "pg054_n0021", "pg054_n0023", "pg054_n0024", "pg054_n0026", "pg054_n0027"],
    55: ["pg056_n0006", "pg056_n0008", "pg056_n0002", "pg056_n0003", "pg056_im002", "pg056_n0010", "pg056_n0011", "pg056_n0014", "pg056_n0015", "pg056_n0017", "pg056_n0018", "pg056_n0020", "pg056_n0021", "pg056_n0023", "pg056_n0024", "pg056_n0026", "pg056_n0027", "pg056_im001", "pg056_n0029"],
    57: ["pg058_n0001", "pg058_n0004", "pg058_n0005", "pg058_im002", "pg058_n0007", "pg058_n0009", "pg058_n0010", "pg058_n0013", "pg058_n0014", "pg058_im003", "pg058_n0016", "pg058_n0017", "pg058_n0018", "pg058_n0019", "pg058_n0022", "pg058_n0023", "pg058_n0025", "pg058_n0026", "pg058_n0028", "pg058_n0029", "pg058_n0031", "pg058_n0032", "pg058_n0034", "pg058_n0035"],
    61: ["pg062_n0003", "pg062_n0004", "pg062_n0006", "pg062_n0007", "pg062_n0008", "pg062_im001", "pg062_n0010", "pg062_n0020", "pg062_n0021", "pg062_n0012", "pg062_n0013", "pg062_n0014"],
    62: ["pg063_n0002", "pg063_n0003", "pg063_n0004", "pg063_n0005", "pg063_n0007", "pg063_n0009", "pg063_n0010", "pg063_n0040", "pg063_n0041", "pg063_im001", "pg063_n0012", "pg063_n0015", "pg063_n0016", "pg063_n0018", "pg063_n0019", "pg063_n0021", "pg063_n0022", "pg063_n0024", "pg063_n0025", "pg063_n0027", "pg063_n0028", "pg063_n0030", "pg063_n0031", "pg063_n0033", "pg063_n0034"],
    73: ["pg074_n0002", "pg074_n0003", "pg074_n0004", "pg074_n0005", "pg074_n0006", "pg074_n0008", "pg074_n0010", "pg074_n0019", "pg074_n0020", "pg074_n0012", "pg074_n0014", "pg074_im002"],
    75: ["pg076_n0002", "pg076_n0003", "pg076_n0004", "pg076_n0013", "pg076_n0014", "pg076_im001", "pg076_n0006", "pg076_n0007", "pg076_n0009", "pg076_n0010", "pg076_n0016", "pg076_n0017", "pg076_n0018", "pg076_n0022", "pg076_n0024", "pg076_n0026", "pg076_n0028", "pg076_n0031", "pg076_n0033", "pg076_n0036", "pg076_n0039", "pg076_n0041", "pg076_n0044", "pg076_n0047", "pg076_n0049", "pg076_n0052", "pg076_n0055", "pg076_n0057", "pg076_n0060"],
    77: ["pg078_n0002", "pg078_n0003", "pg078_n0005", "pg078_n0007", "pg078_n0008", "pg078_n0009", "pg078_n0010", "pg078_n0012", "pg078_n0013", "pg078_n0015", "pg078_n0016", "pg078_n0023", "pg078_n0024", "pg078_n0018"],
    81: ["pg082_im001", "pg082_im002", "pg082_im003", "pg082_im004", "pg082_n0009", "pg082_n0022", "pg082_n0023", "pg082_n0024", "pg082_n0011", "pg082_n0013", "pg082_n0014", "pg082_im005", "pg082_n0016"],
    87: ["pg088_n0003", "pg088_n0004", "pg088_n0005", "pg088_n0006", "pg088_n0008", "pg088_n0009", "pg088_n0010", "pg088_n0012", "pg088_n0013", "pg088_n0014", "pg088_n0016", "pg088_n0017", "pg088_n0018", "pg088_n0037", "pg088_im002", "pg088_n0038", "pg088_n0020", "pg088_n0022", "pg088_n0023", "pg088_n0024", "pg088_n0025", "pg088_n0026", "pg088_n0027", "pg088_n0029", "pg088_n0030", "pg088_n0031"],
    88: ["pg089_n0002", "pg089_n0003", "pg089_n0004", "pg089_n0005", "pg089_n0006", "pg089_n0007", "pg089_n0008", "pg089_n0010", "pg089_n0011", "pg089_n0012", "pg089_n0013", "pg089_n0014", "pg089_n0015", "pg089_n0024", "pg089_n0027", "pg089_n0028", "pg089_n0030", "pg089_n0031", "pg089_n0017", "pg089_n0018"],
    89: ["pg090_n0002", "pg090_n0003", "pg090_n0004", "pg090_n0028", "pg090_n0029", "pg090_n0006", "pg090_n0007", "pg090_n0010", "pg090_n0012", "pg090_n0014", "pg090_n0016", "pg090_n0017", "pg090_n0019", "pg090_n0021", "pg090_n0022"],
    91: ["pg092_n0002", "pg092_im001", "pg092_im004", "pg092_im003", "pg092_im002", "pg092_n0005", "pg092_n0007", "pg092_n0008", "pg092_n0009", "pg092_n0010", "pg092_n0012", "pg092_n0013", "pg092_n0023", "pg092_n0024", "pg092_n0015", "pg092_n0016", "pg092_n0017", "pg092_n0018"],
    93: ["pg094_n0003", "pg094_n0005", "pg094_n0007", "pg094_n0009", "pg094_n0010", "pg094_n0011", "pg094_n0026", "pg094_im001", "pg094_n0027", "pg094_n0013", "pg094_n0014", "pg094_n0029", "pg094_n0032", "pg094_n0034", "pg094_n0016", "pg094_n0018", "pg094_n0019", "pg094_n0020"],
    99: ["pg100_n0002", "pg100_n0003", "pg100_n0023", "pg100_im001", "pg100_n0024", "pg100_n0005", "pg100_n0006", "pg100_n0007", "pg100_n0008", "pg100_n0009", "pg100_n0011", "pg100_n0013", "pg100_n0014", "pg100_n0015", "pg100_n0016", "pg100_n0017", "pg100_n0027", "pg100_im002", "pg100_n0028"],
    102: ["pg103_n0003", "pg103_n0005", "pg103_n0007", "pg103_n0008", "pg103_n0010", "pg103_n0012", "pg103_n0013", "pg103_n0014", "pg103_n0015", "pg103_n0016", "pg103_im002", "pg103_n0018"],
    103: ["pg104_n0002", "pg104_n0004", "pg104_n0005", "pg104_n0006", "pg104_n0007", "pg104_n0009", "pg104_n0011", "pg104_n0012", "pg104_n0013", "pg104_n0014", "pg104_n0015", "pg104_n0032", "pg104_n0033", "pg104_n0017", "pg104_n0018", "pg104_n0019", "pg104_n0022", "pg104_n0024", "pg104_n0026"],
    115: ["pg116_n0002", "pg116_n0004", "pg116_n0005", "pg116_n0007", "pg116_n0008", "pg116_n0011", "pg116_n0012", "pg116_n0014", "pg116_n0015", "pg116_n0017", "pg116_n0018", "pg116_n0020", "pg116_n0022", "pg116_n0023", "pg116_n0026", "pg116_n0027", "pg116_n0029", "pg116_n0030", "pg116_n0032", "pg116_n0033", "pg116_n0035", "pg116_n0036", "pg116_n0038", "pg116_n0039"],
    116: ["pg117_n0002", "pg117_n0003", "pg117_n0005", "pg117_n0007", "pg117_n0008", "pg117_n0035", "pg117_n0036", "pg117_n0010", "pg117_n0013", "pg117_n0014", "pg117_n0016", "pg117_n0017", "pg117_n0018", "pg117_n0020", "pg117_n0021", "pg117_n0022", "pg117_n0024", "pg117_n0025", "pg117_n0026", "pg117_n0028", "pg117_n0029"],
    123: ["pg124_n0002", "pg124_n0004", "pg124_n0007", "pg124_n0008", "pg124_n0009", "pg124_n0010", "pg124_n0011", "pg124_n0012", "pg124_n0013", "pg124_n0014", "pg124_n0015", "pg124_n0016", "pg124_n0017", "pg124_n0018", "pg124_n0021", "pg124_n0025", "pg124_n0027", "pg124_n0030", "pg124_n0032"],
    124: ["pg125_im001", "pg125_n0002", "pg125_n0003", "pg125_im002", "pg125_n0005", "pg125_n0007", "pg125_n0008", "pg125_n0009", "pg125_n0010", "pg125_im003", "pg125_n0012", "pg125_n0013", "pg125_n0015", "pg125_n0028", "pg125_n0029", "pg125_n0017", "pg125_n0018", "pg125_n0019", "pg125_n0021", "pg125_n0022"],
    126: ["pg127_n0002", "pg127_n0003", "pg127_n0004", "pg127_n0005", "pg127_n0006", "pg127_n0008", "pg127_n0009", "pg127_n0010", "pg127_n0011", "pg127_n0012", "pg127_n0013", "pg127_n0014", "pg127_n0023", "pg127_n0024", "pg127_n0027", "pg127_n0029", "pg127_n0031", "pg127_n0033", "pg127_n0016", "pg127_n0017", "pg127_n0018"],
    129: ["pg130_n0002", "pg130_n0022", "pg130_n0023", "pg130_n0004", "pg130_n0005", "pg130_n0006", "pg130_n0008", "pg130_n0009", "pg130_n0010", "pg130_n0012", "pg130_n0014", "pg130_n0015", "pg130_n0016", "pg130_n0017"],
    137: ["pg138_n0002", "pg138_n0003", "pg138_n0004", "pg138_n0005", "pg138_n0006", "pg138_n0007", "pg138_n0022", "pg138_n0023", "pg138_n0009", "pg138_n0010", "pg138_n0011", "pg138_n0012", "pg138_n0013", "pg138_n0014", "pg138_n0015", "pg138_n0016"],
    138: ["pg139_n0003", "pg139_n0006", "pg139_n0007", "pg139_n0009", "pg139_n0010", "pg139_n0012", "pg139_n0013", "pg139_n0015", "pg139_n0016", "pg139_n0018", "pg139_n0019", "pg139_n0021", "pg139_n0022", "pg139_n0024", "pg139_n0025", "pg139_n0027", "pg139_n0029", "pg139_n0030"],
    141: ["pg142_n0002", "pg142_n0003", "pg142_n0024", "pg142_n0025", "pg142_n0005", "pg142_n0007", "pg142_n0008", "pg142_n0009", "pg142_n0028", "pg142_n0029", "pg142_n0011", "pg142_n0012", "pg142_n0013", "pg142_n0014", "pg142_n0016", "pg142_n0017"],
    142: ["pg143_n0002", "pg143_n0003", "pg143_n0005", "pg143_n0006", "pg143_n0007", "pg143_n0008", "pg143_n0010", "pg143_n0012", "pg143_n0013", "pg143_n0014", "pg143_n0015", "pg143_n0026", "pg143_n0027", "pg143_n0017", "pg143_n0018", "pg143_n0020"],
    148: ["pg149_n0002", "pg149_n0004", "pg149_n0005", "pg149_n0006", "pg149_n0007", "pg149_n0008", "pg149_n0009", "pg149_n0031", "pg149_n0011", "pg149_n0013", "pg149_n0014", "pg149_n0015", "pg149_n0016", "pg149_n0017", "pg149_n0018", "pg149_n0019", "pg149_n0021", "pg149_n0023", "pg149_n0024"],
    151: ["pg152_n0003", "pg152_n0004", "pg152_n0006", "pg152_n0007", "pg152_n0033", "pg152_n0034", "pg152_n0009", "pg152_n0011", "pg152_n0012", "pg152_n0037", "pg152_n0038", "pg152_n0014", "pg152_n0017", "pg152_n0018", "pg152_n0019", "pg152_n0020", "pg152_n0022", "pg152_n0023", "pg152_n0025", "pg152_n0026"],
    152: ["pg153_n0002", "pg153_n0005", "pg153_n0006", "pg153_n0008", "pg153_n0009", "pg153_n0011", "pg153_n0012", "pg153_n0040", "pg153_n0042", "pg153_n0043", "pg153_n0045", "pg153_n0046", "pg153_n0048", "pg153_n0049", "pg153_n0051", "pg153_n0052", "pg153_n0054", "pg153_n0055", "pg153_n0057", "pg153_n0058", "pg153_n0014", "pg153_n0018", "pg153_n0020", "pg153_n0023", "pg153_n0025", "pg153_n0028", "pg153_n0030", "pg153_n0033", "pg153_n0035"]
  };

  const imageLabels = {
    39: { pg040_im002: "Mdalasini", pg040_im003: "Iliki", pg040_im001: "Karafuu", pg040_im004: "Pilipili manga", pg040_im005: "Binzari nyembamba" },
    73: { pg074_im002: "A." },
    74: { pg075_im002: "B.", pg075_im001: "C." },
    81: { pg082_im001: "Viazi vya kuning’inia", pg082_im002: "Magimbi", pg082_im003: "Viazi vitamu", pg082_im004: "Viazi vikuu" },
    82: { pg083_im001: "Nyavu ya kuvua samaki", pg083_im002: "Ndoano za kutega samaki" },
    101: { pg102_im001: "A.", pg102_im002: "B.", pg102_im003: "C.", pg102_im004: "D." },
    105: { pg106_im001: "Mavazi ya kike ya Wadatoga", pg106_im003: "Mavazi ya kike ya Waha", pg106_im002: "Mavazi ya kike ya Wamasai", pg106_im004: "Vazi la kike la Wagogo", pg106_im005: "Vazi la kiume la Wamasai", pg106_im006: "Vazi la kiume la Wasukuma", pg106_im007: "Mavazi ya kiume ya Wangoni" },
    107: { pg108_im005: "Ngoma", pg108_im006: "Marimba ya mbao na vigongeo", pg108_im007: "Filimbi", pg108_im008: "Manyanga" },
    108: { pg109_im001: "A.", pg109_im002: "B.", pg109_im003: "C." },
    110: { pg111_im002: "A. Ugali wa mtama", pg111_im003: "B. Ndizi za kuchoma", pg111_im004: "C. Ndizi zilizokorogwa", pg111_im005: "D. Kande", pg111_im006: "E. Viazi vitamu vilivyochemshwa" },
    111: { pg112_im001: "A. Kuruka kamba", pg112_im002: "B. Kucheza bao", pg112_im003: "C. Mdako", pg112_im004: "D. Rede" },
    130: { pg131_im001: "A.", pg131_im002: "B." }
  };

  const captionOverrides = {
    pg102_n0004: "Kielelezo namba 1: Matendo ya kusalimiana",
    pg109_n0027: "Kielelezo namba 7: Ala ya mziki ijulikanayo kama zeze",
    pg129_n0022: "Kielelezo namba 5: Matendo ya uhusiano katika familia",
    pg131_n0018: "Kielelezo namba 7: Wanafunzi wakipeana zawadi"
  };
  const visibleTextOverrides = {
    pg023_n0007: "Kushiriki katika misiba ni mojawapo ya vitendo vya kimaadili kwa sababu huonesha hali ya kujali na kufariji watu wengine.",
    pg023_n0008: "Tunaposhiriki misiba, tunatakiwa kusaidia kazi kwa hali na mali.",
    pg039_n0007: "Vilevile, Kaole kuna urithi wa bidhaa kama sahani na shanga zilizoletwa na wafanyabiashara kutoka Mashariki ya Mbali na Kati.",
    pg039_n0009: "Makumbusho mbalimbali nchini zina bidhaa kama vile vigae, vyombo na shanga zilizoletwa na wafanyabiashara kutoka Mashariki ya Mbali na Kati.",
    pg040_n0013: "Mitindo ya mavazi iliyoletwa na Waarabu",
    pg041_n0003: "Kazi ya kufanya namba 3",
    pg049_n0013: "(a)",
    pg049_n0016: "(b)",
    pg049_n0019: "(c)",
    pg049_n0022: "(d)"
  };
  const captionContinuationIds = new Set(["pg102_n0005", "pg109_n0028", "pg129_n0023", "pg131_n0019"]);
  const page75TableIds = new Set(["pg076_n0024", "pg076_n0026", "pg076_n0028", "pg076_n0031", "pg076_n0033", "pg076_n0036", "pg076_n0039", "pg076_n0041", "pg076_n0044", "pg076_n0047", "pg076_n0049", "pg076_n0052", "pg076_n0055", "pg076_n0057", "pg076_n0060"]);
  const page126TreeIds = new Set(["pg127_n0009", "pg127_n0010", "pg127_n0011", "pg127_n0012", "pg127_n0013", "pg127_n0014"]);
  const page127DiagramLabelIds = new Set(["pg128_n0010", "pg128_n0011", "pg128_n0012", "pg128_n0013", "pg128_n0014", "pg128_n0015", "pg128_n0016", "pg128_n0017", "pg128_n0018", "pg128_n0019", "pg128_n0020", "pg128_n0021", "pg128_n0022", "pg128_n0023"]);
  const page140TableIds = new Set(["pg141_n0014", "pg141_n0016", "pg141_n0019", "pg141_n0021", "pg141_n0023", "pg141_n0026"]);
  const page146ChartIds = new Set(["pg147_n0015", "pg147_n0016", "pg147_n0017", "pg147_n0018", "pg147_n0019", "pg147_n0020", "pg147_n0021", "pg147_n0022"]);
  const exerciseBreakBefore = {
    74: new Set(["pg075_n0013"]),
    78: new Set(["pg079_n0010"]),
    88: new Set(["pg089_n0017"]),
    95: new Set(["pg096_n0019"]),
    118: new Set(["pg119_n0012"]),
    130: new Set(["pg131_n0012"])
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
    const figure = makeFigure(["pg053_im001"], {
      pg053_im001: "Watoto wa shule wanatembea pamoja, na mmoja yuko kwenye kiti cha magurudumu. Wameinua mabango yanayoonesha wajibu wa mtoto."
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
    const connectors = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    connectors.setAttribute("class", "flow-tree-connectors");
    connectors.setAttribute("viewBox", "0 0 100 100");
    connectors.setAttribute("preserveAspectRatio", "none");
    connectors.setAttribute("aria-hidden", "true");
    connectors.innerHTML = `
      <defs>
        <marker id="family-tree-arrow" markerWidth="8" markerHeight="8" refX="6.5" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#252525"></path>
        </marker>
      </defs>
      <path d="M50 0 V33" marker-end="url(#family-tree-arrow)"></path>
      <path d="M22 33 H78"></path>
      <path d="M50 33 V62" marker-end="url(#family-tree-arrow)"></path>
      <path d="M14 62 H86"></path>
      <path d="M14 62 V100" marker-end="url(#family-tree-arrow)"></path>
      <path d="M50 62 V100" marker-end="url(#family-tree-arrow)"></path>
      <path d="M86 62 V100" marker-end="url(#family-tree-arrow)"></path>`;
    figure.appendChild(connectors);
    const parents = element("div", "flow-tree-level flow-tree-parents");
    parents.appendChild(element("span", "", "Baba"));
    parents.appendChild(element("span", "", "Mama"));
    figure.appendChild(parents);
    const children = element("div", "flow-tree-level flow-tree-children");
    children.appendChild(element("span", "", "Kaka"));
    children.appendChild(element("span", "", "Mimi"));
    children.appendChild(element("span", "", "dada"));
    figure.appendChild(children);
    const caption = element("figcaption", "", "");
    caption.appendChild(element("strong", "", "Kielelezo namba 2:"));
    caption.appendChild(document.createTextNode(" Mti wa familia"));
    figure.appendChild(caption);
    return figure;
  }

  function buildExtendedFamilyTree(descriptions) {
    const figure = element("figure", "flow-figure flow-page127-family-diagram");
    const diagram = element("div", "flow-family-relations");
    diagram.setAttribute("role", "img");
    diagram.setAttribute("aria-label", descriptions.pg128_im016 || "Mti wa ndugu wa karibu na familia");
    const connectors = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    connectors.setAttribute("class", "flow-extended-tree-connectors");
    connectors.setAttribute("viewBox", "0 0 100 100");
    connectors.setAttribute("preserveAspectRatio", "none");
    connectors.setAttribute("aria-hidden", "true");
    connectors.innerHTML = `
      <defs>
        <marker id="extended-family-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#2f69ad"></path>
        </marker>
      </defs>
      <path d="M25 19 V29 H8.3 M25 29 H41.7"></path>
      <path d="M8.3 29 V34 M25 29 V34 M41.7 29 V34" marker-end="url(#extended-family-arrow)"></path>
      <path d="M75 19 V29 H58.3 M75 29 H91.7"></path>
      <path d="M58.3 29 V34 M75 29 V34 M91.7 29 V34" marker-end="url(#extended-family-arrow)"></path>
      <path d="M8.3 58 V69 M25 58 V69 M41.7 58 V69 M58.3 58 V69 M75 58 V69 M91.7 58 V69" marker-end="url(#extended-family-arrow)"></path>`;
    diagram.appendChild(connectors);
    [
      "pg128_n0010", "pg128_n0011", "pg128_n0012", "pg128_n0013", "pg128_n0014", "pg128_n0015", "pg128_n0016", "pg128_n0017",
      "pg128_n0018", "pg128_n0019", "pg128_n0020", "pg128_n0021", "pg128_n0022", "pg128_n0023"
    ].forEach((id, index) => diagram.appendChild(element("span", `flow-relation-label flow-relation-label-${index + 1}`, descriptions[id])));
    figure.appendChild(diagram);
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

    // The cover is now page 1, while these layout rules still target the
    // original source-content sequence (formerly pages 1–152).
    const page = Number(inner.dataset.pageNumber) - 1;
    const spans = Array.from(hook.querySelectorAll(":scope > span[data-id]"));
    if (sourceOrder[page]) {
      const rank = new Map(sourceOrder[page].map((id, index) => [id, index]));
      spans.sort((a, b) => (rank.get(a.dataset.id) ?? 9999) - (rank.get(b.dataset.id) ?? 9999));
      spans.forEach((span) => hook.appendChild(span));
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
      if (page === 63 && id === "pg064_n0022") {
        (exercise || inner).appendChild(buildRightsTable());
        return;
      }
      if (page === 63 && ["pg064_n0024", "pg064_ac001", "pg064_ac002", "pg064_n0031", "pg064_n0033", "pg064_n0036", "pg064_n0039", "pg064_n0041", "pg064_n0043", "pg064_n0047", "pg064_n0049", "pg064_n0026", "pg064_n0028", "pg064_n0054", "pg064_n0056", "pg064_n0061", "pg064_n0063", "pg064_n0068", "pg064_n0070", "pg064_n0075", "pg064_n0077", "pg064_n0082", "pg064_n0084", "pg064_n0089", "pg064_n0091", "pg064_n0096", "pg064_n0098", "pg064_ac003", "pg064_ac004"].includes(id)) return;
      if (page === 69 && id === "pg070_n0010") closeCollections();
      if (page === 75 && id === "pg076_n0002") {
        inner.appendChild(element("p", "flow-paragraph", `${text} ${descriptions.pg076_n0003}`));
        return;
      }
      if (page === 75 && id === "pg076_n0003") return;
      if (page === 75 && id === "pg076_n0022") {
        (exercise || inner).appendChild(buildMatchingTable());
        return;
      }
      if (page === 75 && page75TableIds.has(id)) return;
      if (page === 76 && id === "pg077_n0039") {
        const glossary = element("dl", "flow-glossary");
        [
          ["pg077_n0039", "pg077_n0041"],
          ["pg077_n0044", "pg077_n0046"],
          ["pg077_n0049", "pg077_n0051"]
        ].forEach(([termId, definitionId]) => {
          glossary.appendChild(element("dt", "", descriptions[termId]));
          glossary.appendChild(element("dd", "", descriptions[definitionId]));
        });
        inner.appendChild(glossary);
        return;
      }
      if (page === 76 && ["pg077_n0041", "pg077_n0044", "pg077_n0046", "pg077_n0049", "pg077_n0051"].includes(id)) return;
      if (page === 78 && id === "pg079_n0010") {
        inner.appendChild(element("p", "flow-paragraph", ["pg079_n0010", "pg079_n0011", "pg079_n0012"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 78 && ["pg079_n0011", "pg079_n0012"].includes(id)) return;
      if (page === 78 && id === "pg079_n0014") {
        inner.appendChild(element("p", "flow-paragraph", ["pg079_n0014", "pg079_n0015", "pg079_n0016", "pg079_n0017", "pg079_n0018"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 78 && ["pg079_n0015", "pg079_n0016", "pg079_n0017", "pg079_n0018"].includes(id)) return;
      if (page === 87 && id === "pg088_n0003") {
        const principles = element("ol", "flow-list flow-letter-list");
        [
          ["(c)", ["pg088_n0004", "pg088_n0005", "pg088_n0006"]],
          ["(d)", ["pg088_n0009", "pg088_n0010"]],
          ["(e)", ["pg088_n0013", "pg088_n0014"]],
          ["(f)", ["pg088_n0017", "pg088_n0018"]]
        ].forEach(([marker, textIds]) => {
          const item = element("li", "flow-list-item");
          item.dataset.marker = marker;
          item.appendChild(element("span", "", textIds.map((textId) => descriptions[textId]).join(" ")));
          principles.appendChild(item);
        });
        inner.appendChild(principles);
        return;
      }
      if (page === 87 && ["pg088_n0004", "pg088_n0005", "pg088_n0006", "pg088_n0008", "pg088_n0009", "pg088_n0010", "pg088_n0012", "pg088_n0013", "pg088_n0014", "pg088_n0016", "pg088_n0017", "pg088_n0018"].includes(id)) return;
      if (page === 88 && id === "pg089_n0002") {
        inner.appendChild(element("p", "flow-paragraph", ["pg089_n0002", "pg089_n0003", "pg089_n0004", "pg089_n0005", "pg089_n0006", "pg089_n0007", "pg089_n0008"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 88 && ["pg089_n0003", "pg089_n0004", "pg089_n0005", "pg089_n0006", "pg089_n0007", "pg089_n0008"].includes(id)) return;
      if (page === 88 && id === "pg089_n0010") {
        inner.appendChild(element("p", "flow-paragraph", ["pg089_n0010", "pg089_n0011", "pg089_n0012", "pg089_n0013"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 88 && ["pg089_n0011", "pg089_n0012", "pg089_n0013"].includes(id)) return;
      if (page === 88 && id === "pg089_n0014") {
        inner.appendChild(element("p", "flow-paragraph", ["pg089_n0014", "pg089_n0015"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 88 && id === "pg089_n0015") return;
      if (page === 88 && id === "pg089_n0017") {
        inner.appendChild(element("p", "flow-paragraph", ["pg089_n0017", "pg089_n0018"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 88 && id === "pg089_n0018") return;
      if (page === 89 && id === "pg090_n0002") {
        inner.appendChild(element("p", "flow-paragraph", ["pg090_n0002", "pg090_n0003", "pg090_n0004"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 89 && ["pg090_n0003", "pg090_n0004"].includes(id)) return;
      if (page === 89 && id === "pg090_n0006") {
        inner.appendChild(element("p", "flow-paragraph", ["pg090_n0006", "pg090_n0007"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 89 && id === "pg090_n0007") return;
      if (page === 89 && id === "pg090_n0010") {
        const benefits = element("ol", "flow-list flow-letter-list");
        ["pg090_n0010", "pg090_n0012", "pg090_n0014"].forEach((textId) => {
          const itemText = descriptions[textId];
          const marker = itemText.match(/^\([a-c]\)/i)?.[0] || "";
          const item = element("li", "flow-list-item");
          item.dataset.marker = marker;
          item.appendChild(element("span", "", itemText.replace(/^\([a-c]\)\s*/i, "")));
          benefits.appendChild(item);
        });
        inner.appendChild(benefits);
        return;
      }
      if (page === 89 && ["pg090_n0012", "pg090_n0014"].includes(id)) return;
      if (page === 89 && id === "pg090_n0016") {
        inner.appendChild(element("p", "flow-paragraph", ["pg090_n0016", "pg090_n0017"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 89 && id === "pg090_n0017") return;
      if (page === 89 && id === "pg090_n0021") {
        inner.appendChild(element("p", "flow-paragraph", ["pg090_n0021", "pg090_n0022"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 89 && id === "pg090_n0022") return;
      if (page === 91 && id === "pg092_n0007") {
        inner.appendChild(element("p", "flow-paragraph", ["pg092_n0007", "pg092_n0008", "pg092_n0009", "pg092_n0010"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 91 && ["pg092_n0008", "pg092_n0009", "pg092_n0010"].includes(id)) return;
      if (page === 91 && id === "pg092_n0012") {
        inner.appendChild(element("p", "flow-paragraph", ["pg092_n0012", "pg092_n0013"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 91 && id === "pg092_n0013") return;
      if (page === 91 && id === "pg092_n0015") {
        inner.appendChild(element("p", "flow-paragraph", ["pg092_n0015", "pg092_n0016", "pg092_n0017", "pg092_n0018"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 91 && ["pg092_n0016", "pg092_n0017", "pg092_n0018"].includes(id)) return;
      if (page === 93 && id === "pg094_n0003") {
        const instructions = element("ol", "flow-list flow-letter-list");
        ["pg094_n0003", "pg094_n0005", "pg094_n0007"].forEach((textId) => {
          const itemText = descriptions[textId];
          const marker = itemText.match(/^\([b-d]\)/i)?.[0] || "";
          const item = element("li", "flow-list-item");
          item.dataset.marker = marker;
          item.appendChild(element("span", "", itemText.replace(/^\([b-d]\)\s*/i, "")));
          instructions.appendChild(item);
        });
        inner.appendChild(instructions);
        return;
      }
      if (page === 93 && ["pg094_n0005", "pg094_n0007"].includes(id)) return;
      if (page === 93 && id === "pg094_n0009") {
        inner.appendChild(element("p", "flow-paragraph", ["pg094_n0009", "pg094_n0010", "pg094_n0011"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 93 && ["pg094_n0010", "pg094_n0011"].includes(id)) return;
      if (page === 93 && id === "pg094_n0013") {
        inner.appendChild(element("p", "flow-paragraph", ["pg094_n0013", "pg094_n0014"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 93 && id === "pg094_n0014") return;
      if (page === 93 && id === "pg094_n0018") {
        inner.appendChild(element("p", "flow-paragraph", ["pg094_n0018", "pg094_n0019", "pg094_n0020"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 93 && ["pg094_n0019", "pg094_n0020"].includes(id)) return;
      if (page === 99 && id === "pg100_n0002") {
        inner.appendChild(element("p", "flow-paragraph", ["pg100_n0002", "pg100_n0003"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 99 && id === "pg100_n0003") return;
      if (page === 99 && id === "pg100_n0005") {
        inner.appendChild(element("p", "flow-paragraph", ["pg100_n0005", "pg100_n0006", "pg100_n0007", "pg100_n0008", "pg100_n0009"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 99 && ["pg100_n0006", "pg100_n0007", "pg100_n0008", "pg100_n0009"].includes(id)) return;
      if (page === 99 && id === "pg100_n0013") {
        inner.appendChild(element("p", "flow-paragraph", ["pg100_n0013", "pg100_n0014", "pg100_n0015", "pg100_n0016", "pg100_n0017"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 99 && ["pg100_n0014", "pg100_n0015", "pg100_n0016", "pg100_n0017"].includes(id)) return;
      if (page === 103 && id === "pg104_n0004") {
        inner.appendChild(element("p", "flow-paragraph", ["pg104_n0004", "pg104_n0005", "pg104_n0006", "pg104_n0007"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 103 && ["pg104_n0005", "pg104_n0006", "pg104_n0007"].includes(id)) return;
      if (page === 103 && id === "pg104_n0011") {
        inner.appendChild(element("p", "flow-paragraph", ["pg104_n0011", "pg104_n0012", "pg104_n0013", "pg104_n0014", "pg104_n0015"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 103 && ["pg104_n0012", "pg104_n0013", "pg104_n0014", "pg104_n0015"].includes(id)) return;
      if (page === 103 && id === "pg104_n0017") {
        inner.appendChild(element("p", "flow-paragraph", ["pg104_n0017", "pg104_n0018", "pg104_n0019"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 103 && ["pg104_n0018", "pg104_n0019"].includes(id)) return;
      if (page === 103 && id === "pg104_n0022") {
        const aims = element("ol", "flow-list flow-letter-list");
        ["pg104_n0022", "pg104_n0024", "pg104_n0026"].forEach((textId) => {
          const itemText = descriptions[textId];
          const marker = itemText.match(/^\([a-c]\)/i)?.[0] || "";
          const item = element("li", "flow-list-item");
          item.dataset.marker = marker;
          item.appendChild(element("span", "", itemText.replace(/^\([a-c]\)\s*/i, "")));
          aims.appendChild(item);
        });
        inner.appendChild(aims);
        return;
      }
      if (page === 103 && ["pg104_n0024", "pg104_n0026"].includes(id)) return;
      if (page === 115 && id === "pg116_n0004") {
        inner.appendChild(element("p", "flow-paragraph", ["pg116_n0004", "pg116_n0005"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 115 && id === "pg116_n0005") return;
      if (page === 115 && id === "pg116_n0007") {
        inner.appendChild(element("p", "flow-paragraph", ["pg116_n0007", "pg116_n0008"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 115 && id === "pg116_n0008") return;
      if (page === 115 && id === "pg116_n0022") {
        inner.appendChild(element("p", "flow-paragraph", ["pg116_n0022", "pg116_n0023"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 115 && id === "pg116_n0023") return;
      if (page === 115 && id === "pg116_n0011") {
        const economicBenefits = element("ol", "flow-list flow-letter-list");
        [["pg116_n0011", "pg116_n0012"], ["pg116_n0014", "pg116_n0015"], ["pg116_n0017", "pg116_n0018"]].forEach(([markerId, textId]) => {
          const item = element("li", "flow-list-item");
          item.dataset.marker = descriptions[markerId];
          item.appendChild(element("span", "", descriptions[textId]));
          economicBenefits.appendChild(item);
        });
        inner.appendChild(economicBenefits);
        return;
      }
      if (page === 115 && ["pg116_n0012", "pg116_n0014", "pg116_n0015", "pg116_n0017", "pg116_n0018"].includes(id)) return;
      if (page === 115 && id === "pg116_n0026") {
        const socialBenefits = element("ol", "flow-list flow-letter-list");
        [["pg116_n0026", "pg116_n0027"], ["pg116_n0029", "pg116_n0030"], ["pg116_n0032", "pg116_n0033"], ["pg116_n0035", "pg116_n0036"], ["pg116_n0038", "pg116_n0039"]].forEach(([markerId, textId]) => {
          const item = element("li", "flow-list-item");
          item.dataset.marker = descriptions[markerId];
          item.appendChild(element("span", "", descriptions[textId]));
          socialBenefits.appendChild(item);
        });
        inner.appendChild(socialBenefits);
        return;
      }
      if (page === 115 && ["pg116_n0027", "pg116_n0029", "pg116_n0030", "pg116_n0032", "pg116_n0033", "pg116_n0035", "pg116_n0036", "pg116_n0038", "pg116_n0039"].includes(id)) return;
      if (page === 116 && id === "pg117_n0002") {
        const continuation = element("ol", "flow-list flow-letter-list");
        const item = element("li", "flow-list-item");
        item.dataset.marker = "(f)";
        item.appendChild(element("span", "", text.replace(/^\(f\)\s*/i, "")));
        continuation.appendChild(item);
        inner.appendChild(continuation);
        return;
      }
      if (page === 116 && id === "pg117_n0007") {
        inner.appendChild(element("p", "flow-paragraph", ["pg117_n0007", "pg117_n0008"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 116 && id === "pg117_n0008") return;
      if (page === 116 && id === "pg117_n0013") {
        const methods = element("ol", "flow-list flow-letter-list");
        [
          ["pg117_n0013", ["pg117_n0014"]],
          ["pg117_n0016", ["pg117_n0017", "pg117_n0018"]],
          ["pg117_n0020", ["pg117_n0021", "pg117_n0022"]],
          ["pg117_n0024", ["pg117_n0025", "pg117_n0026"]],
          ["pg117_n0028", ["pg117_n0029"]]
        ].forEach(([markerId, textIds]) => {
          const item = element("li", "flow-list-item");
          item.dataset.marker = descriptions[markerId];
          item.appendChild(element("span", "", textIds.map((textId) => descriptions[textId]).join(" ")));
          methods.appendChild(item);
        });
        inner.appendChild(methods);
        return;
      }
      if (page === 116 && ["pg117_n0014", "pg117_n0016", "pg117_n0017", "pg117_n0018", "pg117_n0020", "pg117_n0021", "pg117_n0022", "pg117_n0024", "pg117_n0025", "pg117_n0026", "pg117_n0028", "pg117_n0029"].includes(id)) return;
      if (page === 123 && id === "pg124_n0002") {
        const continuation = element("ol", "flow-list flow-letter-list");
        const item = element("li", "flow-list-item");
        item.dataset.marker = "(h)";
        item.appendChild(element("span", "", text.replace(/^\(h\)\s*/i, "")));
        continuation.appendChild(item);
        inner.appendChild(continuation);
        return;
      }
      if (page === 123 && id === "pg124_n0004") {
        inner.appendChild(element("p", "flow-paragraph", text));
        return;
      }
      if (page === 123 && id === "pg124_n0025") {
        closeCollections();
        const glossary = element("dl", "flow-glossary");
        [["pg124_n0025", "pg124_n0027"], ["pg124_n0030", "pg124_n0032"]].forEach(([termId, definitionId]) => {
          glossary.appendChild(element("dt", "", descriptions[termId]));
          glossary.appendChild(element("dd", "", descriptions[definitionId]));
        });
        inner.appendChild(glossary);
        return;
      }
      if (page === 123 && ["pg124_n0027", "pg124_n0030", "pg124_n0032"].includes(id)) return;
      if (page === 124 && id === "pg125_n0007") {
        inner.appendChild(element("p", "flow-paragraph", ["pg125_n0007", "pg125_n0008", "pg125_n0009", "pg125_n0010"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 124 && ["pg125_n0008", "pg125_n0009", "pg125_n0010"].includes(id)) return;
      if (page === 124 && id === "pg125_n0017") {
        inner.appendChild(element("p", "flow-paragraph", ["pg125_n0017", "pg125_n0018", "pg125_n0019"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 124 && ["pg125_n0018", "pg125_n0019"].includes(id)) return;
      if (page === 124 && id === "pg125_n0021") {
        inner.appendChild(element("p", "flow-paragraph", ["pg125_n0021", "pg125_n0022"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 124 && id === "pg125_n0022") return;
      if (page === 126 && id === "pg127_n0002") {
        inner.appendChild(element("p", "flow-paragraph", ["pg127_n0002", "pg127_n0003", "pg127_n0004", "pg127_n0005"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 126 && ["pg127_n0003", "pg127_n0004", "pg127_n0005"].includes(id)) return;
      if (page === 126 && id === "pg127_n0006") {
        inner.appendChild(element("p", "flow-paragraph flow-figure-instruction", text));
        return;
      }
      if (page === 126 && id === "pg127_n0016") {
        closeCollections();
        inner.appendChild(element("p", "flow-paragraph", ["pg127_n0016", "pg127_n0017", "pg127_n0018"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 126 && ["pg127_n0017", "pg127_n0018"].includes(id)) return;
      if (page === 126 && id === "pg127_n0008") {
        closeCollections();
        inner.appendChild(buildFamilyTree());
        return;
      }
      if (page === 126 && page126TreeIds.has(id)) return;
      if (page === 127 && id === "pg128_n0003") {
        inner.appendChild(element("p", "flow-paragraph", ["pg128_n0003", "pg128_n0004"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 127 && id === "pg128_n0004") return;
      if (page === 127 && id === "pg128_n0008") {
        inner.appendChild(element("p", "flow-paragraph flow-figure-instruction", text));
        return;
      }
      if (page === 127 && id === "pg128_im016") {
        closeCollections();
        lastFigure = buildExtendedFamilyTree(descriptions);
        inner.appendChild(lastFigure);
        return;
      }
      if (page === 127 && page127DiagramLabelIds.has(id)) return;
      if (page === 129 && id === "pg130_n0004") {
        inner.appendChild(element("p", "flow-paragraph", ["pg130_n0004", "pg130_n0005", "pg130_n0006"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 129 && ["pg130_n0005", "pg130_n0006"].includes(id)) return;
      if (page === 129 && id === "pg130_n0008") {
        inner.appendChild(element("p", "flow-paragraph", ["pg130_n0008", "pg130_n0009", "pg130_n0010"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 129 && ["pg130_n0009", "pg130_n0010"].includes(id)) return;
      if (page === 129 && id === "pg130_n0014") {
        inner.appendChild(element("p", "flow-paragraph", ["pg130_n0014", "pg130_n0015", "pg130_n0016"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 129 && ["pg130_n0015", "pg130_n0016"].includes(id)) return;
      if (page === 129 && id === "pg130_n0017") {
        inner.appendChild(element("p", "flow-paragraph flow-figure-instruction", text));
        return;
      }
      if (page === 137 && id === "pg138_n0002") {
        inner.appendChild(element("p", "flow-paragraph", ["pg138_n0002", "pg138_n0003", "pg138_n0004", "pg138_n0005", "pg138_n0006", "pg138_n0007"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 137 && ["pg138_n0003", "pg138_n0004", "pg138_n0005", "pg138_n0006", "pg138_n0007"].includes(id)) return;
      if (page === 137 && id === "pg138_n0009") {
        inner.appendChild(element("p", "flow-paragraph", ["pg138_n0009", "pg138_n0010", "pg138_n0011", "pg138_n0012", "pg138_n0013", "pg138_n0014", "pg138_n0015", "pg138_n0016"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 137 && ["pg138_n0010", "pg138_n0011", "pg138_n0012", "pg138_n0013", "pg138_n0014", "pg138_n0015", "pg138_n0016"].includes(id)) return;
      if (page === 138 && id === "pg139_n0029") {
        closeCollections();
        const glossary = element("dl", "flow-glossary flow-page138-glossary");
        glossary.appendChild(element("dt", "", text));
        glossary.appendChild(element("dd", "", descriptions.pg139_n0030));
        inner.appendChild(glossary);
        return;
      }
      if (page === 138 && id === "pg139_n0030") return;
      if (page === 151 && id === "pg152_n0006") {
        inner.appendChild(element("p", "flow-paragraph", ["pg152_n0006", "pg152_n0007"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 151 && id === "pg152_n0007") return;
      if (page === 151 && id === "pg152_n0011") {
        inner.appendChild(element("p", "flow-paragraph", ["pg152_n0011", "pg152_n0012"].map((textId) => descriptions[textId]).join(" ")));
        return;
      }
      if (page === 151 && id === "pg152_n0012") return;
      if (page === 151 && id === "pg152_im001") return;
      if (page === 151 && id === "pg152_n0017") {
        const duties = element("ol", "flow-list flow-letter-list");
        [
          ["(a)", ["pg152_n0018", "pg152_n0019", "pg152_n0020"]],
          ["(b)", ["pg152_n0023"]],
          ["(c)", ["pg152_n0026"]]
        ].forEach(([marker, textIds]) => {
          const item = element("li", "flow-list-item");
          item.dataset.marker = marker;
          item.appendChild(element("span", "", textIds.map((textId) => descriptions[textId]).join(" ")));
          duties.appendChild(item);
        });
        inner.appendChild(duties);
        return;
      }
      if (page === 151 && ["pg152_n0018", "pg152_n0019", "pg152_n0020", "pg152_n0022", "pg152_n0023", "pg152_n0025", "pg152_n0026"].includes(id)) return;
      if (page === 140 && id === "pg141_n0012") {
        (exercise || inner).appendChild(buildClassificationTable());
        return;
      }
      if (page === 140 && page140TableIds.has(id)) return;
      if (page === 146 && id === "pg147_n0014") {
        closeCollections();
        inner.appendChild(buildSchoolLeadership());
        return;
      }
      if (page === 146 && page146ChartIds.has(id)) return;

      if (page === 142 && id === "pg143_n0020") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", "Kazi ya kufanya namba 6"));
        callout.appendChild(element("p", "flow-paragraph", "Fikiri na andika mambo matano (5) ya kimaadili uliyofundishwa na ndugu wa karibu katika ukoo."));
        inner.appendChild(callout);
      }

      if (page === 148 && id === "pg149_n0031") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", text));
        callout.appendChild(element("p", "flow-paragraph", "Andika majukumu ya mwalimu wa darasa na mwalimu wa nidhamu katika kukuza na kutunza maadili shuleni."));
        inner.appendChild(callout);
        return;
      }

      if (page === 64 && id === "pg065_n0002" && !exercise) {
        exercise = element("section", "flow-exercise flow-continuation-exercise");
        inner.appendChild(exercise);
      }

      if (page === 31 && id === "pg032_n0011") {
        closeCollections();
        const callout = element("aside", "flow-activity");
        callout.appendChild(element("h2", "", "Kazi ya kufanya namba 2"));
        callout.appendChild(element("p", "flow-paragraph", "Tembelea maeneo yenye urithi kama vile magofu ya miji, misikiti, makanisa, masalia ya binadamu, zana za mawe, mbuga za wanyama, milima, mito ya asili na misitu katika maeneo unayoishi, kisha orodhesha urithi uliopo."));
        inner.appendChild(callout);
      }

      if (page === 43 && id === "pg044_im001") {
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

      if (page === 58 && id === "pg059_im002") {
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

      if (["pg049_n0008", "pg052_n0017", "pg076_n0006", "pg078_n0018"].includes(id)) closeCollections();

      if (isBookHeading(text) && !["pg048_n0006", "pg049_n0008", "pg049_n0010"].includes(id)) {
        closeCollections();
        inner.appendChild(element("h2", text === "Msamiati" ? "flow-vocabulary-title" : "flow-heading", text));
        return;
      }

      if (page === 147 && /^pg148_n00(?:1[1-9]|20)$/.test(id)) {
        const answerItem = element("p", "flow-paragraph flow-answer-prompt");
        answerItem.appendChild(document.createTextNode(text.replace(/\s*\[\[blank:item-\d+\]\]\s*/i, " ").trim()));
        const answerLine = element("span", "flow-inline-answer");
        answerLine.setAttribute("aria-label", "Nafasi ya jibu");
        answerItem.appendChild(answerLine);
        (exercise || inner).appendChild(answerItem);
        return;
      }

      if (page === 48 && id === "pg049_n0026") {
        const questions = element("ol", "flow-list");
        const item = element("li", "flow-list-item");
        item.dataset.marker = "1.";
        item.appendChild(element("span", "", text));
        questions.appendChild(item);
        (exercise || inner).appendChild(questions);
        return;
      }

      if (page === 130 && id === "pg131_n0009") {
        const questions = element("ol", "flow-list");
        [text, descriptions.pg131_n0010].forEach((question, index) => {
          const item = element("li", "flow-list-item");
          item.dataset.marker = `${index + 1}.`;
          item.appendChild(element("span", "", question));
          questions.appendChild(item);
        });
        (exercise || inner).appendChild(questions);
        return;
      }

      if (page === 130 && id === "pg131_n0010") return;

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

    if (page === 76) {
      const vocabularyTitle = inner.querySelector(".flow-vocabulary-title");
      if (vocabularyTitle) {
        const exerciseBox = element("section", "flow-page76-exercise");
        while (inner.firstChild && inner.firstChild !== vocabularyTitle) {
          exerciseBox.appendChild(inner.firstChild);
        }
        inner.insertBefore(exerciseBox, vocabularyTitle);
      }
    }

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
