import express from 'express'; // Import express using ES6
import fetch from 'node-fetch'; // Import node-fetch using ES6
const app = express();
const PORT = process.env.PORT || 3000;

const hadiths = {
    "hadiths": [
        {
            "number": 1,
            "text": "Performing Hajj and Umrah one after another removes poverty and sins just as the furnace removes impurities from iron, gold, and silver.",
            "text2": "فالحج والعمرة ينفيان الفقر والذنوب كما ينفي الكير خبث الحديد والذهب والفضة",
            "source": "Tirmidhi"
        },
        {
            "number": 2,
            "text": "The Messenger of Allah (PBUH) said: 'Umrah in Ramadan is equivalent to Hajj with me.'",
            "text2": "قال رسول الله صلى الله عليه وسلم: عمرة في رمضان تعدل حجة معي",
            "text3": "رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: رمضان میں عمرہ میرے ساتھ حج کے برابر ہے۔",
            "source": "Sahih Bukhari"
        },
        {
            "number": 3,
            "text": "Whoever leaves his house with the intention of Hajj or Umrah and dies, nothing will be presented to him except Paradise.",
            "text2": "ومن خرج من بيته حاجا أو معتمرا فمات لم يعرض له إلا الجنة.",
            "text3": "جو شخص اپنے گھر سے حج یا عمرہ کی نیت سے نکلے اور فوت ہو جائے تو اسے جنت کے سوا کچھ پیش نہیں کیا جائے گا۔",
            "source": "Tirmidhi"
        },
        {
            "number": 4,
            "text": "The Prophet (PBUH) said: 'Alternate between Hajj and Umrah, because both rid one of poverty and sins.'",
            "text2": "وقال صلى الله عليه وسلم: بديلوا بين الحج والعمرة فإنهما ينفيان الفقر والذنوب",
            "text3": "رسول اللہ صلی اللہ علیہ وسلم نے فرمایا: حج اور عمرہ کے درمیان متبادل، کیونکہ دونوں مفلسی اور گناہوں کو دور کرتے ہیں۔",
            "source": "Ibn Majah"
        },
        {
            "number": 5,
            "text": "Umrah is an expiation for sins committed between it and the previous one.",
            "text2": "العمرة تكفير الذنوب بينها وبين التي قبلها.",
            "text3": "عمرہ اس کے اور پچھلے گناہوں کا کفارہ ہے۔",
            "source": "Sahih Bukhari"
        },
        {
            "number": 6,
            "text": "Jabir narrated that the Prophet (PBUH) performed Umrah three times in his life.",
            "text2": "وعن جابر أن النبي صلى الله عليه وسلم اعتمر في حياته ثلاثا",
            "text3": "جابر رضی اللہ عنہ سے روایت ہے کہ رسول اللہ صلی اللہ علیہ وسلم نے اپنی زندگی میں تین مرتبہ عمرہ کیا۔",
            "source": "Sahih Muslim"
        },
        {
            "number": 7,
            "text": "Follow up the Hajj and Umrah, because they remove poverty and sin as the bellows removes impurity from iron.",
            "text2": "تابع الحج والعمرة فإنهما ينفيان الفقر والذنب كما ينفي الكير خبث الحديد",
            "text3": "حج اور عمرہ کی پیروی کرو کیونکہ یہ غربت اور گناہ کو اس طرح دور کر دیتے ہیں جس طرح جھنکار لوہے کی نجاست کو دور کرتی ہے۔",
            "source": "Tirmidhi"
        },
        {
            "number": 8,
            "text": "Umrah after Umrah is an expiation for the sins committed between them.",
            "text2": "العمرة بعد العمرة كفارة لما بينهما",
            "text3": "عمرہ کے بعد عمرہ ان کے درمیان سرزد ہونے والے گناہوں کا کفارہ ہے۔",
            "source": "Sahih Bukhari"
        },
        {
            "number": 9,
            "text": "When a Muslim or believer washes his face in wudu, every sin he contemplated with his eyes is washed away...",
            "text2": "إذا غسل المسلم أو المؤمن وجهه في الوضوء غسلت عنه كل خطيئة رأتها عيناه",
            "text3": "جب کوئی مسلمان یا مومن وضو میں منہ دھوتا ہے تو ہر وہ گناہ دھل جاتا ہے جس کا اس نے آنکھوں سے خیال کیا تھا۔",
            "source": "Sahih Muslim"
        },
        {
            "number": 10,
            "text": "Perform Umrah immediately after Hajj to complete the spiritual purification cycle.",
            "text2": "أداء العمرة مباشرة بعد الحج لإكمال دورة التطهير الروحي",
            "text3": "روحانی تزکیہ کے چکر کو مکمل کرنے کے لیے حج کے فوراً بعد عمرہ کریں۔",
            "source": "Abu Dawood"
        },
        {
            "number": 11,
            "text": "Perform Umrah in Ramadan, for it is as if you performed Hajj with me.",
            "text2": "اعتمر في رمضان كأنك حججت معي",
            "text3": "رمضان المبارک میں عمرہ کیا کرو، گویا تم نے میرے ساتھ حج کیا۔",
            "source": "Sahih Bukhari"
        },
        {
            "number": 12,
            "text": "The Prophet (PBUH) advised young Muslims to help elderly Muslims perform Umrah.",
            "text2": "وقد أوصى النبي صلى الله عليه وسلم شباب المسلمين بمساعدة كبار السن في أداء العمرة.",
            "text3": "نبی اکرم صلی اللہ علیہ وسلم نے نوجوان مسلمانوں کو عمرہ کرنے میں مدد کرنے کا مشورہ دیا۔",
            "source": "Tirmidhi"
        },
        {
            "number": 13,
            "text": "For women, Umrah is their Jihad.",
            "text2": "والعمرة بالنسبة للنساء هي جهادهن",
            "text3": "عورتوں کے لیے عمرہ ان کا جہاد ہے۔",
            "source": "Sahih Bukhari"
        },
        {
            "number": 14,
            "text": "Performing Umrah brings blessings and cleanses one's soul, helping to remove spiritual impurities.",
            "text2": "العمرة تجلب البركة وتطهر النفس، وتساعد على إزالة الشوائب الروحية",
            "text3": "عمرہ کرنے سے برکت آتی ہے اور روح کی صفائی ہوتی ہے، روحانی نجاستوں کو دور کرنے میں مدد ملتی ہے۔",
            "source": "Sahih Muslim"
        },
        {
            "number": 15,
            "text": "Performing Umrah for the sake of Allah is a source of eternal reward.",
            "text2": "العمرة في سبيل الله سبب للأجر الدائم",
            "text3": "اللہ کی رضا کے لیے عمرہ ادا کرنا ثواب کا باعث ہے۔",
            "source": "Ibn Majah"
        },
        {
            "number": 16,
            "text": "The Prophet (PBUH) allowed performing Umrah on behalf of a deceased relative.",
            "text2": "وقد رخص النبي صلى الله عليه وسلم في العمرة عن الميت",
            "text3": "رسول اللہ صلی اللہ علیہ وسلم نے میت کے رشتہ دار کی طرف سے عمرہ کرنے کی اجازت دی۔  ",
            "source": "Abu Dawood"
        },
        {
            "number": 17,
            "text": "The Prophet (PBUH) encouraged preparation before performing Umrah.",
            "text2": "وقد حث النبي صلى الله عليه وسلم على الاستعداد قبل أداء العمرة.",
            "text3": "رسول اللہ صلی اللہ علیہ وسلم نے عمرہ کرنے سے پہلے تیاری کی ترغیب دی۔",
            "source": "Sahih Muslim"
        },
        {
            "number": 18,
            "text": "Those who perform Umrah are honored guests in Allah's house.",
            "text2": "المعتمرون ضيوف شرف في بيت الله.",
            "text3": "عمرہ کرنے والے اللہ کے گھر کے معزز مہمان ہیں۔",
            "source": "Ibn Majah"
        },
        {
            "number": 19,
            "text": "By sincerely performing Umrah, believers purify themselves of sins like iron cleansed in fire.",
            "text2": "العمرة خالصة للمؤمن ينقي نفسه من الذنوب كما ينقى الحديد في النار",
            "text3": "خلوص نیت سے عمرہ کرنے سے مومن اپنے آپ کو گناہوں سے ایسے پاک کرتے ہیں جیسے لوہا آگ میں صاف کیا جاتا ہے",
            "source": "Tirmidhi"
        },
        {
            "number": 20,
            "text": "The Prophet (PBUH) encouraged Muslims to perform Umrah as soon as they could.",
            "text2": "وقد حث النبي صلى الله عليه وسلم المسلمين على أداء العمرة في أسرع وقت ممكن",
            "text3": "رسول اللہ صلی اللہ علیہ وسلم نے مسلمانوں کو جلد از جلد عمرہ کرنے کی ترغیب دی۔",
            "source": "Sahih Muslim"
        }
    ]
}

const dua =
{
    "duas": [
        {
            "name": "Intention for Umrah",
            "text": "O Allah, I intend to perform Umrah, so make it easy for me and accept it from me.",
            "text2": "اللهم إني أريد العمرة فيسرها لي وتقبلها مني",
            "text3": "اے اللہ! میں عمرہ کرنے کی نیت کرتا ہوں، اسے میرے لیے آسان فرما اور اسے قبول فرما۔",
            "source": "Sahih Bukhari"
        },
        {
            "name": "Talbiyah",
            "text": "Here I am at Your service, O Allah, here I am. Here I am at Your service, You have no partner. Here I am. Verily, all praise, grace, and sovereignty belong to You. You have no partner.",
            "text2": "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الحَمْدَ وَالنِّعْمَةَ لَكَ وَالمُلْكَ، لَا شَرِيكَ لَكَ",
            "text3": "لبیک اللھم لبیک لبیک لا شریک لک لبیک، ان الحمد و النعمة لک و الملک، لا شریک لک",
            "source": "Sahih Muslim"
        },
        {
            "name": "Dua at the Black Stone",
            "text": "In the name of Allah, Allah is the Greatest.",
            "text2": "بِسْمِ اللهِ وَاللهُ أَكْبَرُ",
            "text3": "بسم اللہ اللہ اکبر",
            "source": "Sunan al-Tirmidhi"
        },
        {
            "name": "Dua between the Yemeni Corner and the Black Stone",
            "text": "Our Lord, give us in this world good and in the Hereafter good, and save us from the punishment of the Fire.",
            "text2": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
            "text3": "اے ہمارے رب! ہمیں دنیا میں بھی بھلائی دے اور آخرت میں بھی بھلائی عطا فرما، اور ہمیں جہنم کے عذاب سے بچا۔",
            "source": "Sahih Bukhari"
        },
        {
            "name": "Dua at Maqam Ibrahim",
            "text": "O Allah, make this a place of safety and provide for its people fruits.",
            "text2": "اللَّهُمَّ اجْعَلْ هَذَا بَلَدًا آمِنًا وَارْزُقْ أَهْلَهُ مِنَ الثَّمَرَاتِ",
            "text3": "اے اللہ! اس جگہ کو امن کا شہر بنا دے اور اس کے رہنے والوں کو پھل عطا فرما۔",
            "source": "Surah Al-Baqarah 2:126"
        },
        {
            "name": "Dua during Sa’i",
            "text": "Indeed, Safa and Marwah are among the symbols of Allah.",
            "text2": "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
            "text3": "بیشک صفا اور مروہ اللہ کی نشانیوں میں سے ہیں۔",
            "source": "Surah Al-Baqarah 2:158"
        },
        {
            "name": "Dua on Safa and Marwah",
            "text": "There is no deity except Allah alone, who has no partner. His is the dominion, and His is the praise, and He is capable of all things.",
            "text2": "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
            "text3": "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، بادشاہی اسی کی ہے اور تعریف بھی اسی کی ہے اور وہ ہر چیز پر قادر ہے۔",
            "source": "Sahih Muslim"
        },
        {
            "name": "Dua after Tawaf",
            "text": "O Allah, forgive me, have mercy on me, guide me, provide for me, and give me good health.",
            "text2": "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَارْزُقْنِي وَعَافِنِي",
            "text3": "اے اللہ! مجھے معاف فرما، مجھ پر رحم فرما، مجھے ہدایت دے، مجھے رزق عطا فرما اور مجھے صحت دے۔",
            "source": "Sahih Muslim"
        },
        {
            "name": "Dua for entering Masjid Al-Haram",
            "text": "O Allah, open the gates of Your mercy for me.",
            "text2": "اللهم افتح لي أبواب رحمتك",
            "text3": "اے اللہ! میرے لئے اپنی رحمت کے دروازے کھول دے۔",
            "source": "Sunan Ibn Majah"
        },
        {
            "name": "Dua before beginning Tawaf",
            "text": "In the name of Allah, Allah is the Greatest. O Allah, with faith in You and belief in Your Book, I perform Tawaf.",
            "text2": "بِسْمِ اللهِ وَاللهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ أَطُوفُ",
            "text3": "بسم اللہ اللہ اکبر، اے اللہ! تجھ پر ایمان اور تیری کتاب کی تصدیق کے ساتھ طواف کرتا ہوں۔",
            "source": "Sahih Bukhari"
        },
        {
            "name": "Dua after completing Tawaf",
            "text": "O Allah, grant me knowledge, good deeds, and sustenance, and make my heart pure.",
            "text2": "اللهم ارزقني علما نافعًا وعملاً صالحًا ورزقا واسعًا وقلبًا نقيًا",
            "text3": "اے اللہ! مجھے نفع بخش علم، صالح اعمال، وسیع رزق اور پاک دل عطا فرما۔",
            "source": "Sunan al-Tirmidhi"
        },
        {
            "name": "Dua for Safa and Marwah",
            "text": "There is no god but Allah alone, He has no partner. To Him belongs the dominion and the praise. He gives life and causes death, and He has power over all things.",
            "text2": "لا إله إلا الله وحده لا شريك له له الملك وله الحمد يحيي ويميت وهو على كل شيء قدير",
            "text3": "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، بادشاہی اور حمد اسی کے لیے ہے، وہ زندگی دیتا ہے اور موت دیتا ہے اور وہ ہر چیز پر قادر ہے۔",
            "source": "Sahih Muslim"
        },
        {
            "name": "Dua at Zamzam Well",
            "text": "O Allah, I ask You for beneficial knowledge, abundant provision, and healing from all illnesses.",
            "text2": "اللهم إني أسألك علما نافعا ورزقا واسعا وشفاء من كل داء",
            "text3": "اے اللہ! میں تجھ سے نفع بخش علم، وسیع رزق اور تمام بیماریوں سے شفا مانگتا ہوں۔",
            "source": "Sunan Ibn Majah"
        },
        {
            "name": "Dua at Mount Arafat",
            "text": "O Allah, You are forgiving and love forgiveness, so forgive me.",
            "text2": "اللهم إنك عفو تحب العفو فاعف عني",
            "text3": "اے اللہ! تو معاف کرنے والا ہے اور معافی کو پسند کرتا ہے، تو مجھے معاف فرما۔",
            "source": "Sunan al-Tirmidhi"
        },
        {
            "name": "Dua for ending Umrah",
            "text": "O Allah, I ask You for all good, sooner or later, and seek Your refuge from all evil, sooner or later.",
            "text2": "اللهم إني أسألك الخير كله عاجله وآجله وأعوذ بك من الشر كله عاجله وآجله",
            "text3": "اے اللہ! میں تجھ سے تمام بھلائی کا سوال کرتا ہوں، جو جلد یا دیر سے ہو اور میں تیرے پناہ مانگتا ہوں ہر برائی سے"
        }
    ]
}


app.get('/hadiths', async (req, res) => {
    try {

        res.json(hadiths); // Send the data as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
app.get('/duas', async (req, res) => {
    try {

        res.json(dua); // Send the data as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
