// testSpeaking.js
const phraseList = [
  { eng: "Just what doctor ordered", kor: "정확히 원하는 대로야" },
  { eng: "Off and on", kor: "가끔요" },
  { eng: "No dice", kor: "안 돼" },
  { eng: "Do on the fly", kor: "즉흥적으로 하자, 상황봐서" },
  { eng: "To what do i owe the pleasure?", kor: "무슨 일로 오셨어요?" },
  { eng: "Rise and shine", kor: "일어나세요" },
  { eng: "And vice versa", kor: "그 반대도 마찬가지야" },
  { eng: "Suck it up", kor: "참아내 봐, 견뎌 봐" },
  { eng: "replete with things to see", kor: "볼거리로 가득한" },
  { eng: "It's under the radar", kor: "눈에 띄지 않아" },
  {
    eng: "If you really upset the apple cart",
    kor: "정말로 계획을 망치고 싶다면",
  },
  { eng: "It is arid", kor: "무미건조해" },
  { eng: "How droll", kor: "우스꽝스러워요" },
  { eng: "Into uncharted waters", kor: "미지의 영역으로" },
  { eng: "I'm bewildered", kor: "나 혼란스러워" },
  { eng: "I'm tickled pink", kor: "완전 신나" },
  { eng: "Don't flatter yourself", kor: "너무 자만하지마" },
  { eng: "It's whimsical", kor: "기발하다" },
  { eng: "You can't fathom", kor: "넌 이해할 수 없을거야" },
  { eng: "Take it with grain of salt", kor: "적당히 걸러서 들어" },
  { eng: "What a quaint town", kor: "참 고풍스러운 마을이네" },
  { eng: "You tossed and turned all night", kor: "밤새 뒤척였어" },
  {
    eng: "How are you being so nonchalant about this?",
    kor: "어떻게 이 일에 대해 그렇게 무관심할 수가 있어?",
  },
  { eng: "I turned a blind eye", kor: "난 못 본체 했어" },
  { eng: "You're fastidious", kor: "까다롭다" },
  { eng: "Maybe touch base around 8:15?", kor: "8시15분쯤에 다시 연락할까?" },
  {
    eng: "in the burgeoning video market",
    kor: "급속히 성장하는 비디오 시장에서",
  },
  {
    eng: "It was touch and go",
    kor: "불확실한 상황이야, 위태로워, 아슬아슬했어",
  },
  { eng: "Might tip the scales", kor: "균형을 깨뜨릴 수 있어" },
  { eng: "Im humiliated", kor: "수치스러워" },
  { eng: "I consider noteworthy", kor: "주목할 만하다고 생각해" },
  {
    eng: "I feel that they were just trying to be tongue in cheek",
    kor: "그들은 그저 농담조로 말하려고 했던 것 같아",
  },
  { eng: "For a while", kor: "잠깐" },
  {
    eng: "I dont know if it's cause I'm getting older",
    kor: "나이가 들어서 그런지 모르겠는디",
  },
  { eng: "Im on board", kor: "나도 동의해" },
  { eng: "Dont emboril me", kor: "날 휘말리게 하지 마" },
  { eng: "Im going to throw the book at you", kor: "너에게 엄벌을 내릴거야" },
  { eng: "Too esoteric", kor: "너무 난해한" },
  { eng: "To each his own", kor: "각자의 취향대로" },
  { eng: "It's ineffable", kor: "말로 표현할 수 없어" },
  { eng: "Tip of the iceberg", kor: "빙산의 일각이야" },
  { eng: "Point taken", kor: "네 말이 맞아" },
  { eng: "There was ample parking", kor: "주차 공간은 충분했어" },
  {
    eng: "We're just doing a little belt-tightening",
    kor: "우리는 그저 약간 절약을 하고 있는거야",
  },
  { eng: "Judicious", kor: "신중한" },
  { eng: "Debilitating", kor: "쇠약하게 만드는" },
  { eng: "Until the flames abated", kor: "불길이 약해질 때까지" },
  { eng: "You've actually tided the knot", kor: "너 진짜로 결혼했구나" },
  { eng: "Great work", kor: "수고했어" },
  { eng: "Hit me up", kor: "연락해요" },
  { eng: "They have great rapport", kor: "그들은 친밀한 관계를 맺고 있어" },
  { eng: "You tickle my fancy", kor: "내 흥미를 자극하네" },
  { eng: "We might have hooked up", kor: "우리 사귄 적이 있을지도 모르지" },
  { eng: "Versatile", kor: "다재다능해" },
  { eng: "Furtive", kor: "은밀한" },
  { eng: "They're throwing in the towel", kor: "그들은 패배를 인정하고 있어" },
  { eng: "What a bummer", kor: "실망이야" },
  { eng: "He's very gregarious", kor: "그는 매우 사교적이야" },
  { eng: "Throw caution to the wind", kor: "과감하게 행동해" },
  { eng: "Through thick and thin", kor: "좋을 때나 안 좋을 때나" },
  { eng: "Sanguine", kor: "낙관적인, 명랑한" },
  { eng: "He's three sheets to the wind", kor: "저 사람 완전 고주망태네" },
  { eng: "It is what it is", kor: "어쩔 수 없지, 다 그런거지" },
  { eng: "Be wary headed in", kor: "들어갈 때 조심해" },
  { eng: "just being wary", kor: "그냥 조심하는거야" },
  { eng: "This too shall pass", kor: "이 또한 지나가리" },
  { eng: "Having an office crush", kor: "회사에서 짝사랑" },
  { eng: "He was obnoxious", kor: "그는 정말 불쾌했어" },
  { eng: "Thread lightly", kor: "조심스럽게 행둥해" },
  { eng: "You get myopic", kor: "넌 근시안적이야" },
  { eng: "You're just so prosaic", kor: "넌 그냥 너무 진부해" },
  { eng: "Myriad of duties", kor: "수많은 의무들" },
  { eng: "It's pervasive and insidious", kor: "그것은 만연하고 은밀하다" },
  { eng: "Brevity is the soul of wit", kor: "간결성은 지혜의 본질이야" },
  { eng: "I'm in a hurry", kor: "난 지금 바빠" },
  { eng: "Help yourself", kor: "맘껏 드세요" },
  { eng: "Sort of a prodigy", kor: "일종의 천재지" },
  { eng: "There's your pep talk", kor: "너에게 주는 격려지" },
  { eng: "Thick as thieves, these two", kor: "이 둘은 진짜 친해" },
  { eng: "Get the picture", kor: "이해했어?" },
  { eng: "The whole nine yards", kor: "모든 것들, 완전한 것" },
  { eng: "The sky is the limit", kor: "하지 못할 것은 없어" },
  { eng: "The more, the merrier", kor: "더 많을수록 좋지" },
  { eng: "The icing on the cake", kor: "금상첨화" },
  { eng: "Im mortified", kor: "당황스럽다" },
  { eng: "Im gutted", kor: "처참했다" },
  { eng: "The handwriting's on the wall", kor: "불길한 징조가 뚜렷하다" },
  { eng: "I turned the table", kor: "상황을 역전시켰어" },
  { eng: "I dont know, wistfully", kor: "몰라 아쉽게도, 아련한" },
  { eng: "Elucidate that for me", kor: "그것을 명확히 설명해줘" },
  { eng: "The buck stops with me", kor: "모든 책임은 제가 집니다" },
  { eng: "The best of both worlds", kor: "두 마리 토끼를 다 잡는거지" },
  { eng: "Knock it off", kor: "그만해" },
  { eng: "Banal", kor: "진부한" },
  { eng: "The ball is in your court", kor: "결정권은 너한테 있어." },
  { eng: "That's a steal", kor: "횡재다, 완전 거저다" },
  { eng: "Incessant self regard", kor: "끊임없는 자기 존중" },
  { eng: "This will vindicate me", kor: "이것이 나의 무죄를 입증할거야" },
  { eng: "That's a very tall order", kor: "어려운 요구야" },
  { eng: "Epitome", kor: "완벽한 본보기" },
  { eng: "Let's talk turkey here", kor: "솔직하게 얘기해보죠" },
  { eng: "Talk of the town", kor: "장안의 화제" },
  { eng: "Acumen", kor: "판단력" },
  { eng: "Toe the line", kor: "규칙, 지시를 따르세요" },
  { eng: "Just take the plunge", kor: "그냥 과감히 실행해" },
  { eng: "Buzz off", kor: "꺼져" },
  { eng: "Always take the high road", kor: "항상 도덕적으로 올바른 길을 가라" },
  { eng: "This takes the cake", kor: "이번 건 정말 최고야" },
  { eng: "No backsies", kor: "무르기 없기" },
  { eng: "Rancor", kor: "원한" },
  { eng: "You're a natural", kor: "너 타고났다" },
  {
    eng: "I'm taking the bull by horns",
    kor: "난 과감하게 문제에 맞서고 있어",
  },
  { eng: "Bite me", kor: "꺼져" },
  { eng: "Succinct", kor: "간단명료한" },
  { eng: "You can take to the bank", kor: "그건 믿어도 돼" },
  { eng: "I had a really big crush on you", kor: "전 당신에게 정말 빠졌어요" },
  { eng: "Lucid", kor: "또렷한" },
  { eng: "Let me take a stab at it", kor: "내가 한번 시도해볼게" },
  { eng: "I'm keeping it casual tonight", kor: "오늘 밤은 편하게 지내려고" },
  { eng: "keep it casual", kor: "자연스럽게 행동해" },
  { eng: "You can just be yourself", kor: "나 다워야지" },
  { eng: "I rescind it", kor: "난 그것을 취소해" },
  { eng: "Can I take the rain check", kor: "다음으로 미뤄도 되나?" },
  { eng: "Speaking of which", kor: "말이 나와서 하는건데" },
  { eng: "Adroit", kor: "능숙한" },
  {
    eng: "They're taking the nation by storm",
    kor: "그들은 전국을 강타하고 있어",
  },
  { eng: "I have not given credence to", kor: "그것을 신뢰하지 않았어." },
  { eng: "Try taking the road less traveled", kor: "덜 선택된 길을 가봐" },
  { eng: "Inept", kor: "솜씨 없는" },
  { eng: "Swing for the fences", kor: "한방을 노리는거" },
  { eng: "Goes in one ear and the other", kor: "한 귀로 듣고 한 귀로 흘리지" },
  { eng: "Don't be vulgar", kor: "저속허게 굴지마" },
  {
    eng: "I dont have much of a sweet tooth",
    kor: "난 단 것을 별로 안 좋아해",
  },
  { eng: "No bigge", kor: "별 거 아니에요, 걱정할 거 없어." },
  { eng: "I can only surmise", kor: "난 그냥 추측할 뿐이야" },
  { eng: "Throughout the years", kor: "세월이 흐르면서" },
  { eng: "flashy", kor: "화려한" },
  { eng: "gaudy", kor: "(색깔)야한.천박한" },
  { eng: "flamboyant", kor: "대담한" },
  { eng: "I dont capitulate", kor: "나는 굴복하지 않아." },
  {
    eng: "We don't sweep anything under the rug",
    kor: "우리는 아무것도 숨기지 않아요",
  },
  { eng: "Called in sick", kor: "병가를 냈다" },
  { eng: "I'm sweating bullets every day", kor: "전 매일 땀을 비 오듯 흘려요" },
  { eng: "Level with me", kor: "솔직하게 말해" },
  { eng: "Swallow your pride", kor: "자존심을 버려" },
  { eng: "Particularly", kor: "특히" },
  { eng: "Survival of the fittest", kor: "적자생존" },
  { eng: "Let's hit the hay", kor: "자러 가자" },
  { eng: "Also produces euphoria", kor: "또한 행복감을 만들어내요" },
  { eng: "Im gonna shoot from the hip", kor: "즉흥적으로 말할게요" },
  {
    eng: "You could have asked for my number",
    kor: "제 번호를 물어볼 수도 있었겠죠",
  },
  { eng: "Conundrum averted", kor: "난제를 회피했네" },
  { eng: "Suck it up", kor: "버텨 봐" },
  { eng: "And might be dubious", kor: "의심스러울 수도 있다" },
  { eng: "And became the stuff of legend", kor: "전설적인 이야기가 되었지" },
  { eng: "I'm swamped", kor: "나 겁나 바빠" },
  {
    eng: "Have you kept in touch over the years?",
    kor: "수년간 연락을 주고 받았나요?",
  },
  { eng: "Human life is ephemeral", kor: "인간의 삶은 순간이다" },
  { eng: "I'm stuck in a rut", kor: "난 틀에 박힌 삶이야" },
  {
    "eng": "If you're trying to be ingratiating",
    "kor": "만악 당신이 환심을 사려고 한다면"
  },
  {
    "eng": "My mother is as strong as an ox",
    "kor": "황소처럼 강하다"
  },
  {
    "eng": "She's impetuous",
    "kor": "충동적이야"
  },
  {
    "eng": "Strike while the iron is hot",
    "kor": "쇠뿔도 단김에 빼라"
  },
  {
    "eng": "But do they pertain to me?",
    "kor": "하지만 그것들이 저와 관련이 있나요?"
  },
  {
    "eng": "Has clearly struck a chord",
    "kor": "분명히 공감을 불러일으켰습니다"
  },
  {
    "eng": "I better get going",
    "kor": "가봐야겠어"
  },
  {
    "eng": "He's streetwise",
    "kor": "그는 세상물정에 밝다"
  },
  {
    "eng": "I won't perjure myself",
    "kor": "난 위증을 하지 않을거야"
  },
  {
    "eng": "You got to stop and smell the roses",
    "kor": "넌 잠시 여유를 가져야 해"
  },
  {
    "eng": "I'm perplexed",
    "kor": "매우 당혹스러워"
  },
  {
    "eng": "We all want to sow wild oats, Go sow your oats",
    "kor": "방탕한 생활을 해"
  },
  {
    "eng": "After you",
    "kor": "먼저 가세요"
  },
  {
    "eng": "You were extorting me",
    "kor": "네가 날 갈취했잖아"
  },
  {
    "eng": "You got to stick to your guns",
    "kor": "네 마음을 굳게 지켜야 해"
  },
  {
    "eng": "I'll go on my way home",
    "kor": "집에 가는 길에 갈거야"
  },
  {
    "eng": "I don't care to steal the show",
    "kor": "나는 주목받는 것에 관심 없어"
  },
  {
    "eng": "nefarious and sleazy innuendoes",
    "kor": "사악하고 추잡한 풍자"
  },
  {
    "eng": "Anyone else here would sell you down the river in a second",
    "kor": "여기 있는 다른 사람들은 너를 한순간에 배신할거야"
  },
  {
    "eng": "What's done is done",
    "kor": "끝난 일은 끝난 일이야"
  },
  {
    "eng": "That's far too perfunctory",
    "kor": "그건 너무 형식적이야"
  },
  {
    "eng": "I stacked the deck a little",
    "kor": "난 사전준비를 좀 했어"
  },
  {
    "eng": "Saved you a seat",
    "kor": "자리 맡아 놨어"
  },
  {
    "eng": "It was serendipity",
    "kor": "뜻밖의 행운이었죠"
  },
  {
    "eng": "Stab me in the back",
    "kor": "뒤통수를 치다니..."
  },
  {
    "eng": "In layman's terms, please",
    "kor": "쉬운 말로 해주세요"
  },
  {
    "eng": "The pernicious hour is at last upon us",
    "kor": "치명적인 시간이 드디어 우리에게 다가왔다"
  },
  {
    "eng": "We spring into action",
    "kor": "우리는 즉시 행동에 나서지"
  },
  {
    "eng": "mendacious drivel",
    "kor": "거짓말하는 헛소리"
  },
  {
    "eng": "The rumors spread like wildfire",
    "kor": "소문이 삽시간에 퍼져나가고 있어"
  },
  {
    "eng": "Are you mocking me?",
    "kor": "지금 놀리는거야?"
  },
  {
    "eng": "What an eccentric performance",
    "kor": "참 별난 행동이네"
  },
  {
    "eng": "Spit it out",
    "kor": "털어놔 봐"
  },
  {
    "eng": "I was just goofing around",
    "kor": "그냥 빈둥거리고 있었어"
  },
  {
    "eng": "To be perfectly candid",
    "kor": "솔직히 말해서"
  },
  {
    "eng": "Spill the beans",
    "kor": "비밀을 말해봐"
  },
  {
    "eng": "standing my ground",
    "kor": "내 입장을 고수할게"
  },
  {
    "eng": "Apathy is a solution",
    "kor": "무관심이 답이야"
  },
  {
    "eng": "Singing a different tune",
    "kor": "태도를 바꾸고 있네요"
  },
  {
    "eng": "She was very belligerent and disagreeable",
    "kor": "그녀는 매우 호전적이고 불쾌했어"
  },
  {
    "eng": "Son of a gun",
    "kor": "헐...(맙소사)"
  },
  {
    "eng": "So far, so good",
    "kor": "지금까지는 괜찮아"
  },
  {
    "eng": "Shape up or ship out",
    "kor": "제대로 하거나 아니면 때려쳐"
  },
  {
    "eng": "I prefer something more tangible",
    "kor": "난 좀 더 실질적인 걸 선호해"
  },
  {
    "eng": "Snake in the grass",
    "kor": "교활한 사람"
  },
  {
    "eng": "Still mulling it over",
    "kor": "아직 곰곰이 생각 중이야"
  },
  {
    "eng": "How fortuitous",
    "kor": "운이 좋네"
  },
  {
    "eng": "It's smooth sailing from here",
    "kor": "이제부터는 일이 순조로울 거야"
  },
  {
    "eng": "You are smart as a whip",
    "kor": "넌 아주 영리해"
  },
  {
    "eng": "Don't sass me",
    "kor": "말대꾸하지 마"
  },
  {
    "eng": "You'll recognize your dearth",
    "kor": "네 부족함을 인식하게 될 거야"
  },
  {
    "eng": "Straight from the horse's mouth",
    "kor": "믿을만한 출처야"
  },
  {
    "eng": "Assiduously stayed away from",
    "kor": "부지런히 멀리했어"
  },
  {
    "eng": "Spur of the moment",
    "kor": "즉흥적이었어"
  },
  {
    "eng": "At your service",
    "kor": "언제든 말씀만 하세요"
  },
  {
    "eng": "What skeletons are buried in his closet?",
    "kor": "그의 감춰진 비밀들을 뭘까"
  },
  {
    "eng": "You got any amusing anecdotes?",
    "kor": "재밌는 일화가 있어?"
  },
  {
    "eng": "We were shooting the breeze",
    "kor": "그냥 잡담한 거야"
  },
  {
    "eng": "You are a sitting duck",
    "kor": "넌 무방비 상태야"
  },
  {
    "eng": "And until then, I will take this censure",
    "kor": "그때까지는 제가 이 비난을 받아들이죠"
  },
  {
    "eng": "It's sink or swim",
    "kor": "죽거나 살거나지"
  },
  {
    "eng": "I have a rapport with them",
    "kor": "그들과 친밀한 관계를 가지고 있어"
  },
  {
    "eng": "What kind of side hustle?",
    "kor": "무슨 종류의 부업인데?"
  },
  {
    "eng": "What's the occasion?",
    "kor": "무슨 일이야?"
  },
  {
    "eng": "Sick as a dog",
    "kor": "너무 아파"
  },
  {
    "eng": "You showed your true colors",
    "kor": "본색을 드러냈군"
  },
  {
    "eng": "Total shot in the dark",
    "kor": "억측이죠"
  },
  {
    "eng": "just a shot in the dark",
    "kor": "그냥 대충 찍어본 거야",
  },
  {
    "eng": "shot in the dark but",
    "kor": "어림짐작이긴 한데"
  },
  {
    "eng": "We'll save face",
    "kor": "체면을 지킬거야"
  },
  {
    "eng": "Sharp as a tack",
    "kor": "아주 예리해, 똑똑해"
  },
  {
    "eng": "Just to help you settle a score",
    "kor": "너가 보복할 수 있게 도와주려는 거야"
  },
  {
    "eng": "Nothing's set in stone",
    "kor": "아무것도 확정된 건 없어"
  },
  {
    "eng": "Selling like hotcakes",
    "kor": "불티나게 팔리고 있어"
  },
  {
    "eng": "Swan song",
    "kor": "마지막 노래"
  },
  {
    "eng": "You'll never see eye to eye",
    "kor": "너희는 의견이 일치하지 않을거야"
  },
  {
    "eng": "They need to step up to the plate",
    "kor": "책임을 다해야 해요"
  },
  {
    "eng": "We screwed the pooch",
    "kor": "일을 망쳤어"
  },
  {
    "eng": "We were already scraping the bottom of the barrel",
    "kor": "이미 마지막까지 싹싹 긁어 썼어"
  },
  {
    "eng": "Swimming against the current",
    "kor": "시류에 역행하는거야"
  },
  {
    "eng": "Saved by the bell",
    "kor": "간신히 살았네요"
  },
  {
    "eng": "Salt of the earth",
    "kor": "인격이 훌륭한 사람들"
  },
  {
    "eng": "Shake a leg",
    "kor": "빨리 움직여"
  },
  {
    "eng": "Safe bet",
    "kor": "안전한 선택"
  },
  {
    "eng": "It runs the gamut",
    "kor": "다양해요"
  },
  {
    "eng": "Run out of steam",
    "kor": "기진맥진하다"
  },
  {
    "eng": "Run of the mill",
    "kor": "흔해빠진, 평범한"
  },
  {
    "eng": "I can circles around them",
    "kor": "난 걔네보다 더 뛰어날 수 있어"
  },
  {
    "eng": "General rule of thumb",
    "kor": "일반적인 경험에 따르면"
  },
  {
    "eng": "I don't wanna rub salt in the wound",
    "kor": "상처에 소금을 뿌리고 싶지 않다."
  },
  {
    "eng": "Round the clock",
    "kor": "24시간 내내"
  },
  {
    "eng": "Act your age",
    "kor": "나잇값 좀 해"
  },
  {
    "eng": "You have to roll with the punches",
    "kor": "넌 잘 대처해야 돼"
  },
  {
    "eng": "Second to none",
    "kor": "최고"
  },
  {
    "eng": "Why rock the boat?",
    "kor": "왜 소란을 피우는데?"
  },
  {
    "eng": "Don't mention it",
    "kor": "별 말씀을요"
  },
  {
    "eng": "Rack your brain",
    "kor": "머리를 쥐어짜"
  },
  {
    "eng": "It's a rite of passage",
    "kor": "통과의례지"
  },
  {
    "eng": "Ring a bell?",
    "kor": "기억나?"
  },
  {
    "eng": "Right under your nose?",
    "kor": "바로 네 앞에서?"
  },
  {
    "eng": "It was strange right off the bat",
    "kor": "처음부터 이상했어"
  },
  {
    "eng": "Right as rain",
    "kor": "아주 건강해~ 완전 정상이야"
  },
  {
    "eng": "Rich as Croesus",
    "kor": "큰 부자"
  },
  {
    "eng": "Fat chance of the happening anytime soon",
    "kor": "그런 일이 당장 발생할 가능성은 희박하지"
  },
  {
    "eng": "There's no rhyme or reason",
    "kor": "그럴싸한 이유가 없어"
  },
  {
    "eng": "She's just very coy",
    "kor": "그녀는 부끄러워해요"
  },
  {
    "eng": "Reel her in",
    "kor": "그녀를 끌어올려"
  },
  {
    "eng": "Product comes along",
    "kor": "상품이 나타난다"
  },
  {
    "eng": "Red tape",
    "kor": "쓸데없는 요식행위"
  },
  {
    "eng": "I'm an open book",
    "kor": "난 숨기는거 없어"
  },
  {
    "eng": "I'm having a red-letter day",
    "kor": "난 특별한 날을 보내고 있어"
  },
  {
    "eng": "That would be a red herring",
    "kor": "그것은 미끼일 거예요"
  },
  {
    "eng": "Read between the lines",
    "kor": "속뜻을 읽어"
  },
  {
    "eng": "Raise the roof",
    "kor": "분위기를 끌어올리자"
  },
  {
    "eng": "Raise the bar",
    "kor": "기준을 올리자"
  },
  {
    "eng": "I've thought it through",
    "kor": "내가 생각많이 했거든"
  },
  {
    "eng": "Rags to riches",
    "kor": "가난뱅이에서 부자가 된"
  },
  {
    "eng": "He's raking in the money",
    "kor": "돈을 긁어모으고 있어"
  },
  {
    "eng": "Quench your thirst",
    "kor": "목마름을 해소해"
  },
  {
    "eng": "Quaking in your boots",
    "kor": "(겁에 질려) 떨다"
  },
  {
    "eng": "Get over that",
    "kor": "극복하세요"
  },
  {
    "eng": "You're so mean",
    "kor": "너 진짜 못됐다"
  },
  {
    "eng": "quick on the uptake",
    "kor": "이해력이 빠른"
  },
  {
    "eng": "Quid pro quo",
    "kor": "보상, 대가, 답례"
  },
  {
    "eng": "Out for a quick buck",
    "kor": "빨리 돈을 벌기"
  },
  {
    "eng": "Quick on the draw",
    "kor": "이해가 빠르네"
  },
  {
    "eng": "Seize the day",
    "kor": "오늘을 즐겨"
  },
  {
    "eng": "Just quick and dirty",
    "kor": "그냥 빠르고 편하게"
  },
  {
    "eng": "I've been slacking off",
    "kor": "요령을 폈어요"
  },
  {
    "eng": "Putting on airs",
    "kor": "잘난 척하다"
  },
  {
    "eng": "Beats me",
    "kor": "전혀 모르겠어, 금시초문이야"
  },
  {
    "eng": "Pass muster",
    "kor": "검열을 통과하다"
  },
  {
    "eng": "I hope it hasn't put a damper on the party",
    "kor": "파티 분위기가 망가지지 않았으면 좋겠어요"
  },
  {
    "eng": "Put a sock in it",
    "kor": "입다물어"
  },
  {
    "eng": "Kid's punching above his weight",
    "kor": "얘들이 자기 능력 이상으로 잘하고 있어"
  },
  {
    "eng": "Kudos to you",
    "kor": "정말 잘했어!"
  },
  {
    "eng": "You're pulling my leg",
    "kor": "나를 놀리고 있구만"
  },
  {
    "eng": "Needless to say",
    "kor": "말할 것도 없이"
  },
  {
    "eng": "You pulled out all the stops",
    "kor": "넌 최선을 다했어"
  },
  {
    "eng": "Don't sweat it",
    "kor": "걱정하지마"
  },
  {
    "eng": "If you've pulled a fast one",
    "kor": "너가 사기를 쳤다면"
  },
  {
    "eng": "Catch a later",
    "kor": "나중에 봐"
  },
  {
    "eng": "That is the pot calling kettle black",
    "kor": "똥 묻은 개가 겨묻은 개 나무란다"
  },
  {
    "eng": "Who cares?",
    "kor": "알빠노"
  },
  {
    "eng": "She is about to pop the question",
    "kor": "그녀가 청혼할 예정이야"
  },
  {
    "eng": "He plays for keeps",
    "kor": "그는 진지하게 노력하다"
  },
  {
    "eng": "Come again?",
    "kor": "뭐라고? 다시"
  },
  {
    "eng": "I'm stuck playing second fiddle",
    "kor": "난 보조역할에만 머물러 있어"
  },
  {
    "eng": "Play it safe",
    "kor": "신중하게 해"
  },
  {
    "eng": "Play it cool",
    "kor": "침착하게 행동해"
  },
  {
    "eng": "Off you go",
    "kor": "나가봐"
  },
  {
    "eng": "He's just playing hardball",
    "kor": "그는 그냥 강경할 뿐이야"
  },
  {
    "eng": "This is just shitty pipe dreams",
    "kor": "그저 허황된 꿈일 뿐이야"
  },
  {
    "eng": "Pinching pennies",
    "kor": "돈을 아끼는거지"
  },
  {
    "eng": "We pushed an envelope",
    "kor": "한계를 초월했다고"
  },
  {
    "eng": "I pulled some strings",
    "kor": "인맥 좀 썼지"
  },
  {
    "eng": "Penny for your thoughts",
    "kor": "무슨 생각을 하고 있니?"
  },
  {
    "eng": "They'll pay through the nose",
    "kor": "큰 값을 치르게 될거야"
  },
  {
    "eng": "You have to pay the piper",
    "kor": "넌 대가를 치뤄야 해"
  },
  {
    "eng": "put up or shut up",
    "kor": "하던가 아님 말던가"
  },
  {
    "eng": "Don't pass the buck",
    "kor": "책임을 전가하지마"
  },
  {
    "eng": "Party pooper",
    "kor": "흥을 깨는 사람"
  },
  {
    "eng": "Just play possum",
    "kor": "죽은 척 해, 시미치 떼"
  },
  {
    "eng": "Let's press the flesh",
    "kor": "악수하자"
  },
  {
    "eng": "Let's go paint the town red",
    "kor": "흥청망청 놀아보자"
  },
  {
    "eng": "She's a big pain in the neck",
    "kor": "그녀는 큰 골칫덩어리야"
  },
  {
    "eng": "He was over the moon",
    "kor": "그는 정말 행복했어"
  },
  {
    "eng": "I'm so out of the loop",
    "kor": "나는 전혀 소식을 못 듣고 있어"
  },
  {
    "eng": "Over my dead body",
    "kor": "절대 안돼"
  },
  {
    "eng": "We're over the barrel",
    "kor": "우리는 궁지에 몰렸어"
  },
  {
    "eng": "I'm out of sorts",
    "kor": "기분이 좀 그래"
  },
  {
    "eng": "Old flame",
    "kor": "옛 애인"
  },
  {
    "eng": "He's out of the woods",
    "kor": "위기에서 벗어났어"
  },
  {
    "eng": "That's out of the blue",
    "kor": "그건 좀 갑자기인데"
  },
  {
    "eng": "Out of order",
    "kor": "고장났어"
  },
  {
    "eng": "That was out of the left field",
    "kor": "예상 밖이었어"
  },
  {
    "eng": "I'm on the mend",
    "kor": "회복중입니다"
  },
  {
    "eng": "Once in a blue moon",
    "kor": "어쩌다가 한 번"
  },
  {
    "eng": "You're still on thin ice",
    "kor": "넌 아직 위험한 상태야"
  },
  {
    "eng": "Off the record?",
    "kor": "비공식적으로"
  },
  {
    "eng": "I'm off the hook",
    "kor": "나는 문제에서 벗어났어"
  },
  {
    "eng": "On the nose?",
    "kor": "정확해?"
  },
  {
    "eng": "We're on the brink of war",
    "kor": "전쟁 직전이야"
  },
  {
    "eng": "You're way off base",
    "kor": "완전 잘못 짚었어"
  },
  {
    "eng": "I was on pins and needles",
    "kor": "불안한 상태였어"
  },
  {
    "eng": "We're on cloud nine",
    "kor": "우리는 너무 행복해요"
  },
  {
    "eng": "I'm on the roll",
    "kor": "난 잘 풀리고 있어"
  },
  {
    "eng": "Why are your getting so bent out of shape",
    "kor": "너 왜 그렇게 화 내는거야?"
  },
  {
    "eng": "Off the top of my head",
    "kor": "그냥 생각나는대로"
  },
  {
    "eng": "It's off the beaten path",
    "kor": "외진 곳이야"
  },
  {
    "eng": "Now or never",
    "kor": "지금 아니면 못해"
  },
  {
    "eng": "No harm, no foul",
    "kor": "별거아니니 문제없어"
  },
  {
    "eng": "She's not playing with a full deck",
    "kor": "그녀는 제정신이 아니야"
  },
  {
    "eng": "Nervous nelly",
    "kor": "겁쟁이"
  },
  {
    "eng": "Leave no stone unturned",
    "kor": "온갖 방법을 동원하고 있습니다"
  },
  {
    "eng": "That's the last nail in the coffin",
    "kor": "최후의 한방이야"
  },
  {
    "eng": "Nobody's fool",
    "kor": "똑똑하지"
  },
  {
    "eng": "It's not all it's cracked up to be",
    "kor": "생각했던 것 만큼 좋지는 않네"
  },
  {
    "eng": "I got a bee on my bonnet",
    "kor": "나 어떤 생각에 꽂혀있는데"
  },
  {
    "eng": "You don't have a snowball's chance in hell",
    "kor": "넌 거의 가능성이 없어"
  },
  {
    "eng": "What's bugging you?",
    "kor": "무슨 걱정이라도 있어?"
  },
  {
    "eng": "Why don't give me a ballpark figure?",
    "kor": "대략적으로라도 알려주지 그래?"
  },
  {
    "eng": "He's high maintenance",
    "kor": "그는 손이 많이 가"
  },
  {
    "eng": "I want to nose around a bit",
    "kor": "알아보고 싶어서"
  },
  {
    "eng": "What's eating you?",
    "kor": "무슨 일 있어?"
  },
  {
    "eng": "No sweat",
    "kor": "별 거 아니야"
  },
  {
    "eng": "You catch on quick",
    "kor": "넌 눈치가 빨라"
  },
  {
    "eng": "I ran into my friend",
    "kor": "우연히 친구를 만났어"
  },
  {
    "eng": "I can relate",
    "kor": "공감해"
  },
  {
    "eng": "I'm not cut out for this",
    "kor": "난 이게 적성에 안 맞아"
  },
  {
    "eng": "Let's get into nitty-gritty",
    "kor": "본질로 들어가죠"
  },
  {
    "eng": "Don't let your parents down",
    "kor": "부모님을 실망시키지 마"
  },
  {
    "eng": "Nip it in the bud",
    "kor": "미연에 방지하자"
  },
  {
    "eng": "It's doable",
    "kor": "할만해"
  },
  {
    "eng": "It's my nest egg",
    "kor": "이건 내 비상금이야"
  },
  {
    "eng": "She's barking up the wrong tree",
    "kor": "그녀는 헛다리 짚고 있는거야"
  },
  {
    "eng": "I mean it",
    "kor": "진심이야"
  },
  {
    "eng": "At the drop of a hat?",
    "kor": "바로?"
  },
  {
    "eng": "I'm at a loss",
    "kor": "어쩔 줄 모르겠다"
  },
  {
    "eng": "Easy as pie",
    "kor": "식은죽먹기지"
  },
  {
    "eng": "Duly noted",
    "kor": "잘 알겠습니다"
  },
  {
    "eng": "What brings you to our neck of the woods?",
    "kor": "우리 구역에는 어쩐 일로?"
  },
  {
    "eng": "Without further ado",
    "kor": "거두절미하고"
  },
  {
    "eng": "It was neck and neck",
    "kor": "막상막하였어"
  },
  {
    "eng": "Consider it done",
    "kor": "바로 처리하겠습니다"
  },
  {
    "eng": "Don't be a stranger",
    "kor": "연락하고 지내자"
  },
  {
    "eng": "It's nothing to sneeze at",
    "kor": "만만치 않은 금액이지"
  },
  {
    "eng": "Do me a favor",
    "kor": "부탁 좀 들어줘"
  },
  {
    "eng": "You have my word",
    "kor": "약속할게"
  },
  {
    "eng": "I don't believe in any of that evil-spirit mumbo-jumbo",
    "kor": "전 귀신이야기 같은 허튼소리는 믿지 않아요"
  },
  {
    "eng": "Speak for yourself",
    "kor": "그건 네 생각이지"
  },
  {
    "eng": "We moved heaven and earth",
    "kor": "우린 백방으로 노력했거든"
  },
  {
    "eng": "There's more than one way to skin a cat",
    "kor": "방법이 하나만 있는 것은 아니죠"
  },
  {
    "eng": "No monkey business",
    "kor": "장난은 이제 그만"
  },
  {
    "eng": "Money talks",
    "kor": "돈이 좌우하지"
  },
  {
    "eng": "That's ludicrous",
    "kor": "터무니없어"
  },
  {
    "eng": "Mind over matter",
    "kor": "마음 먹기 달렸어"
  },
  {
    "eng": "It went south",
    "kor": "상황이 악화됐어"
  },
  {
    "eng": "Mum's the word",
    "kor": "아무에게도 말하지 마"
  },
  {
    "eng": "You have the floor",
    "kor": "발언권이 있습니다"
  },
  {
    "eng": "He's a man of few words",
    "kor": "그는 말수가 적은 사람이야"
  },
  {
    "eng": "She is a keeper",
    "kor": "그녀는 괜찮은 사람이야"
  },
  {
    "eng": "Make hay while the sun shines",
    "kor": "기회가 오면 즉시 행동해야지"
  },
  {
    "eng": "I can make ends meet",
    "kor": "먹고 살 순 있겠군"
  },
  {
    "eng": "Done and dusted",
    "kor": "완전 끝났어"
  },
  {
    "eng": "You're making mountains out of molehills?",
    "kor": "사소한 일을 크게 만드는 건가?"
  },
  {
    "eng": "We totally hit it off",
    "kor": "우리는 죽이 잘 맞아요"
  },
  {
    "eng": "To make a long story short",
    "kor": "간단히 말하면"
  },
  {
    "eng": "I thought as much",
    "kor": "그럴 줄 알았어"
  },
  {
    "eng": "It's a lost cause",
    "kor": "가망이 없어"
  },
  {
    "eng": "She's not a loose cannon",
    "kor": "그녀는 통제불능이야"
  },
  {
    "eng": "I'm baffled",
    "kor": "당황스러워"
  },
  {
    "eng": "He's a bit long in the tooth",
    "kor": "그는 좀 늙었어"
  },
  {
    "eng": "It's complementary",
    "kor": "서비스입니다"
  },
  {
    "eng": "We just bought rock, stock and barrel",
    "kor": "모조리 사버렸어"
  },
  {
    "eng": "Live and let live",
    "kor": "각자의 길을 가는 거예요"
  },
  {
    "eng": "I ain't gonna leave you in the lurch",
    "kor": "난 너를 곤경에 빠뜨리는게 아니야"
  },
  {
    "eng": "You're living high on the hog",
    "kor": "넌 사치스럽게 살고있어"
  },
  {
    "eng": "I feel for you",
    "kor": "이해해"
  },
  {
    "eng": "Live and learn",
    "kor": "경험하면서 배우는거지~"
  },
  {
    "eng": "Have it your way",
    "kor": "네 맘대로 해봐"
  },
  {
    "eng": "You made the lion's share",
    "kor": "너가 제일 큰 몫을 만들었어"
  },
  {
    "eng": "Everything is in order",
    "kor": "모든 게 순조로워요"
  },
  {
    "eng": "Let's leave it at that",
    "kor": "그쯤하자"
  },
  {
    "eng": "I'm a laughing stock",
    "kor": "난 웃음거리야"
  },
  {
    "eng": "I'm wiped out",
    "kor": "난 녹초가 됐어"
  },
  {
    "eng": "I'm like a kid in a candy store",
    "kor": "정말 신나는데"
  },
  {
    "eng": "Get it off your chest",
    "kor": "속 시원하게 털어놔"
  },
  {
    "eng": "She took to church like a duck to water",
    "kor": "교회에 정말 잘 적응하더라"
  },
  {
    "eng": "Two peas in a pod",
    "kor": "매우 닮았지"
  },
  {
    "eng": "Bull in a china shop",
    "kor": "막무가내로 날뛰는 사람이지"
  },
  {
    "eng": "We're going like a bat out of hell",
    "kor": "쏜살같이 가고 있어"
  },
  {
    "eng": "It's on the tip of my tongue",
    "kor": "생각 날 듯 말 듯한데"
  },
  {
    "eng": "We'd say we lost an arm and a leg",
    "kor": "거액의 돈을 잃었다고 말할 수 있지"
  },
  {
    "eng": "I'm rambling",
    "kor": "횡설수설하고 있어"
  },
  {
    "eng": "We level the playing field",
    "kor": "우린 공평한 장을 만드는거야"
  },
  {
    "eng": "She let the cat out of the bag",
    "kor": "그녀가 누설했지"
  },
  {
    "eng": "I'm all thumbs",
    "kor": "서툴러요"
  },
  {
    "eng": "You should let sleeping dogs lie",
    "kor": "긁어 부스럼 만들지 말아야 해"
  },
  {
    "eng": "Let your hair down",
    "kor": "긴장풀어"
  },
  {
    "eng": "Make yourself at home",
    "kor": "편하게 있어"
  },
  {
    "eng": "She's cranky",
    "kor": "그녀는 까칠해"
  },
  {
    "eng": "That's the last straw",
    "kor": "참을만큼 참았어"
  },
  {
    "eng": "Wing it",
    "kor": "대충 해"
  },
  {
    "eng": "I know the ropes",
    "kor": "요령을 알지"
  },
  {
    "eng": "I'm photogenic?",
    "kor": "사진발 잘 받냐?"
  },
  {
    "eng": "You're so corny",
    "kor": "유치하다"
  },
  {
    "eng": "Knock on wood",
    "kor": "행운을 빌어"
  },
  {
    "eng": "I'll stop by later",
    "kor": "좀 있다 들릴게"
  },
  {
    "eng": "They're gonna knock it out of the park",
    "kor": "멋지게 해낼거야"
  },
  {
    "eng": "Better than nothing",
    "kor": "없는 것보다 낫지"
  },
  {
    "eng": "It's on me",
    "kor": "내가 살게"
  },
  {
    "eng": "Kicked the bucket then retrieved the bucket",
    "kor": "죽고 다시 살아나는거지"
  },
  {
    "eng": "I'm famished",
    "kor": "배고파 죽겠다"
  },
  {
    "eng": "I'm a little bit peckish",
    "kor": "좀 출출하다"
  },
  {
    "eng": "I have a hunch",
    "kor": "감이 오네"
  },
  {
    "eng": "They'll kick you in the teeth",
    "kor": "그들이 혼내줄거야"
  },
  {
    "eng": "That's a kick in the teeth",
    "kor": "야단났네(좀 실망인데)"
  },
  {
    "eng": "Knee-jerk reaction",
    "kor": "자동반사야"
  },
  {
    "eng": "We're working against the clock",
    "kor": "시간에 쫓긴다"
  },
  {
    "eng": "Keep your wits about you",
    "kor": "정신을 바짝 차려"
  },
  {
    "eng": "Food coma",
    "kor": "식곤증"
  },
  {
    "eng": "Give each other a kiss and make up",
    "kor": "서로 화해해"
  },
  {
    "eng": "I'm a people person",
    "kor": "난 사교적인 사람이야"
  },
  {
    "eng": "You must keep your nose to the grindstone",
    "kor": "악착같이 버텨야 해"
  },
  {
    "eng": "My hands are tied",
    "kor": "나도 어쩔 수 없어"
  },
  {
    "eng": "Keep your fingers crossed",
    "kor": "행운을 빌어"
  },
  {
    "eng": "Keep your eyes peeled",
    "kor": "눈 뜨고 잘 봐"
  },
  {
    "eng": "Keep your chin up",
    "kor": "힘내"
  },
  {
    "eng": "I'm not following",
    "kor": "이해가 안 가는데"
  },
  {
    "eng": "I just got off the boat",
    "kor": "갓 이주해왔어요"
  },
  {
    "eng": "You have a big mouth",
    "kor": "입이 가벼워"
  },
  {
    "eng": "He jumped down my throat",
    "kor": "그는 나에게 불같이 화를 냈어"
  },
  {
    "eng": "Jury's still out",
    "kor": "아직 결과가 나오지 않았어요"
  },
  {
    "eng": "Just in case",
    "kor": "혹시 모르잖아"
  },
  {
    "eng": "It's a no-brainer",
    "kor": "이건 쉬운 문제야"
  },
  {
    "eng": "Be my guest",
    "kor": "그렇게하세요"
  },
  {
    "eng": "He's between jobs",
    "kor": "그는 구직 중이야"
  },
  {
    "eng": "I'll juice you up",
    "kor": "내가 널 재밌게 해줄게"
  },
  {
    "eng": "Actions speak louder than words",
    "kor": "말보다 행동이 중요하지"
  },
  {
    "eng": "I'd look like Johnny-come-lately",
    "kor": "신병같이 보일거야"
  },
  {
    "eng": "This might jazz it up",
    "kor": "아마 이게 활기를 불어넣을거야"
  },
  {
    "eng": "A jam-packed schedule",
    "kor": "빽빽한 일정이야"
  },
  {
    "eng": "They jacked up the price",
    "kor": "그들이 가격을 인상했어"
  },
  {
    "eng": "Jack of all trades",
    "kor": "척척박사"
  },
  {
    "eng": "You're in a daze",
    "kor": "너무 멍해있어"
  },
  {
    "eng": "It's raining cats and dogs",
    "kor": "비가 억수로 온다"
  },
  {
    "eng": "Fire away",
    "kor": "나한테 물어봐"
  },
  {
    "eng": "It's all Greek to me",
    "kor": "뭔 말인지 모르겠네"
  },
  {
    "eng": "We offhandedly",
    "kor": "우린 별 생각없이"
  },
  {
    "eng": "Dream on",
    "kor": "꿈 깨"
  },
  {
    "eng": "Don't make a scene",
    "kor": "넌 소란을 피우고 있어"
  },
  {
    "eng": "It's a wrap",
    "kor": "작업 끝"
  },
  {
    "eng": "Easy-peasy",
    "kor": "너무 쉽지"
  },
  {
    "eng": "It takes two to tango",
    "kor": "손바닥도 마주쳐야 소리가나지"
  },
  {
    "eng": "I'm sober now",
    "kor": "나 지금 멀쩡해"
  },
  {
    "eng": "No side effect",
    "kor": "부작용은 없어"
  },
  {
    "eng": "It ain't over till the lady sings",
    "kor": "끝날 때까지 끝난 게 아니다"
  },
  {
    "eng": "That's a typo",
    "kor": "그건 오타예요"
  },
  {
    "eng": "I have a lot of irons in the fire",
    "kor": "난 많은 일을 맡고 있어"
  },
  {
    "eng": "Let's iron out the details",
    "kor": "세부적인 문제를 해결해보자"
  },
  {
    "eng": "I dozed off",
    "kor": "잠깐 졸았네"
  },
  {
    "eng": "And in the wake of that",
    "kor": "그리고 그 결과로"
  },
  {
    "eng": "In the light of this information",
    "kor": "이 정보로 비추어보아"
  },
  {
    "eng": "I'm in a jam",
    "kor": "난 어려운 상황이야"
  },
  {
    "eng": "Just browsing",
    "kor": "그냥 둘러보는거예요"
  },
  {
    "eng": "Looks like just in the nick of time",
    "kor": "보아하니 때마침 온 거 같은데"
  },
  {
    "eng": "And to add insult to serious injury",
    "kor": "설상가상으로"
  },
  {
    "eng": "Top-notch restaurant",
    "kor": "최고의 레스토랑"
  },
  {
    "eng": "It's good for them in the long run",
    "kor": "장기적으로 보면 그들에게 좋은 거야"
  },
  {
    "eng": "I'm really in a bind",
    "kor": "곤경에 처한 상태야"
  },
  {
    "eng": "Good riddance",
    "kor": "속 시원하군"
  },
  {
    "eng": "You got the munchies?",
    "kor": "입이 심심해?"
  },
  {
    "eng": "You were already in the doghouse",
    "kor": "넌 미움을 받고 있어"
  },
  {
    "eng": "This is epic",
    "kor": "대박이다"
  },
  {
    "eng": "You don't sleep in the buff?",
    "kor": "넌 알몸으로 안 자?"
  },
  {
    "eng": "I'm insecure",
    "kor": "자신감이 없어"
  },
  {
    "eng": "This is a sticky wicket",
    "kor": "이거 정말 어려운 상황이야"
  },
  {
    "eng": "We're in the black",
    "kor": "우린 이제 흑자야"
  },
  {
    "eng": "We're a dime a dozen",
    "kor": "우린 흔해빠졌잖아"
  },
  {
    "eng": "Not on my watch",
    "kor": "내 앞에서는 안 돼"
  },
  {
    "eng": "This one is in the bag",
    "kor": "이건 확실하지"
  },
  {
    "eng": "Dine and dash",
    "kor": "먹튀"
  },
  {
    "eng": "He'll be ill at ease",
    "kor": "그는 불편할거야"
  },
  {
    "eng": "We'll be gone in no time",
    "kor": "우리는 금방 갈거야"
  },
  {
    "eng": "Ring me up",
    "kor": "계산해주세요"
  },
  {
    "eng": "Above the board",
    "kor": "정당하다"
  },
  {
    "eng": "They'll do in a pinch",
    "kor": "그들은 여차하면 할거야"
  },
  {
    "eng": "In a nutshell",
    "kor": "간단하게 말하면"
  },
  {
    "eng": "I'll be back in a jiffy",
    "kor": "곧 돌아올게"
  },
  {
    "eng": "We abide by its rules",
    "kor": "우린 규칙을 따를 겁니다"
  },
  {
    "eng": "Everything is hunky dory",
    "kor": "모든 게 더할 나위없이 좋아"
  },
  {
    "eng": "Home is where the heart is",
    "kor": "집이 최고야"
  },
  {
    "eng": "Hit the road",
    "kor": "출발하자"
  },
  {
    "eng": "That's hit the spot",
    "kor": "오 이거 딱이다"
  }

];
const questionNumber = document.getElementById("question-number");
const question = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");

const startEngQuizBtn = document.getElementById("engQuiz");
const startKorQuizBtn = document.getElementById("korQuiz");
const endQuizBtn = document.getElementById("endQuiz");

const quizContainer = document.getElementById("quiz-container");

const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const wrongPhraseBtn = document.getElementById("wrongPhrase-btn");

const searchPhraseBtn = document.getElementById("searchPhrase-btn");
const searchPhraseInput = document.getElementById("searchPhrase-input");
const searchPhraseResult = document.getElementById("searchPhrase-result");

let currentQuestionIndex = 0;
let score = 0;
let questionLanguage;
let wrongPhrases = [];
let attemptedQuestions = 0;

// 문구 찾기 기능
searchPhraseBtn.addEventListener("click", function () {
  const inputPhrase = searchPhraseInput.value.toLowerCase();
  const foundPhrases = phraseList.filter(
    (phrase) =>
      phrase.eng.toLowerCase().includes(inputPhrase) ||
      phrase.kor.includes(inputPhrase)
  );

  if (foundPhrases.length > 0) {
    searchPhraseResult.innerHTML = `
        <div class="search-results">
          ${foundPhrases
            .map(
              (phrase) => `
              <div class="search-item">
                <div class="search-item-eng">${phrase.eng}</div>
                <div class="search-item-kor">${phrase.kor}</div>
              </div>
            `
            )
            .join("")}
        </div>
      `;
  } else {
    searchPhraseResult.innerHTML = `
        <div class="search-results">
          <div class="search-item">목록에 없는 문구입니다.</div>
        </div>
      `;
  }
});

// 영어 회화 시험 시작
startEngQuizBtn.addEventListener("click", () => {
  questionLanguage = "eng";
  quizContainer.style.display = "block";
  initQuiz();
});

// 한글 회화 시험 시작
startKorQuizBtn.addEventListener("click", () => {
  questionLanguage = "kor";
  quizContainer.style.display = "block";
  initQuiz();
});

// 종료 버튼
endQuizBtn.addEventListener("click", () => {
  endQuizBtn.style.display = "none";
  showResult();
});

// 배열 섞기
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 퀴즈 초기화
function initQuiz() {
  shuffleArray(phraseList);
  currentQuestionIndex = 0;
  score = 0;
  attemptedQuestions = 0;
  wrongPhrases = [];
  displayQuestion();
}

// 문제 표시
function displayQuestion() {
  buttonMaker();
  questionNumber.innerText = `# ${currentQuestionIndex + 1}`;
  if (questionLanguage === "eng") {
    question.innerText = `${phraseList[currentQuestionIndex].eng}\n다음 중 올바른 뜻을 선택하세요.`;
  } else {
    question.innerText = `${phraseList[currentQuestionIndex].kor}\n다음 중 올바른 표현을 선택하세요.`;
  }
  optionsContainer.style.display = "block";
}

// 버튼 생성
function buttonMaker() {
  const shuffledAnswers = shuffleOptions(
    phraseList[currentQuestionIndex][
      questionLanguage === "eng" ? "kor" : "eng"
    ],
    phraseList
  );

  optionsContainer.innerHTML = shuffledAnswers
    .map(
      (answer, index) => `
        <button type="button" onclick="checkAnswer('${answer.replace(
          /'/g,
          "\\'"
        )}')">${index + 1}. ${answer}</button>
      `
    )
    .join("");
}

// 옵션 셔플
function shuffleOptions(correctAnswer, allAnswers) {
  let incorrectAnswers = allAnswers
    .map((phrase) => (questionLanguage === "eng" ? phrase.kor : phrase.eng))
    .filter((phrase) => phrase !== correctAnswer);

  let sortedOptions = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    sortedOptions.push(incorrectAnswers[randomIndex]);
    incorrectAnswers.splice(randomIndex, 1);
  }
  sortedOptions.push(correctAnswer);
  shuffleArray(sortedOptions);
  return sortedOptions;
}

// 다음 문제
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < phraseList.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// 결과 표시
function showResult() {
  optionsContainer.style.display = "none";
  question.style.display = "none";

  let resultPercentage = (score / attemptedQuestions) * 100;
  resultText.innerText = `${attemptedQuestions}문제 중에 ${score}개를 맞혔습니다.\n점수는 ${resultPercentage.toFixed(2)}점 입니다.`;

  resultContainer.style.display = "block";
}

// 다시 시작
restartBtn.addEventListener("click", () => {
  score = 0;
  wrongPhrases = [];
  resultContainer.style.display = "none";
  question.style.display = "";
  endQuizBtn.style.display = "";
  initQuiz();
});

// 틀린 문구 보기
wrongPhraseBtn.addEventListener("click", showWrongPhrases);

// 정답 체크
function checkAnswer(answer) {
  attemptedQuestions++;
  const correctAnswer =
    phraseList[currentQuestionIndex][
      questionLanguage === "eng" ? "kor" : "eng"
    ];

  if (answer === correctAnswer) {
    score++;
    nextQuestion();
  } else {
    wrongPhrases.push(phraseList[currentQuestionIndex]);

    let answerDisplay = document.createElement("div");
    answerDisplay.setAttribute("id", "answer-display");
    answerDisplay.className = "wrong-answer-feedback";
    answerDisplay.innerText = `오답! 정답은: ${correctAnswer}`;

    optionsContainer.style.display = "none";
    question.appendChild(answerDisplay);

    let nextButton = document.createElement("button");
    nextButton.innerText = "다음 문제";
    nextButton.addEventListener("click", () => {
      nextQuestion();
    });

    question.appendChild(nextButton);
  }
}

// 틀린 문구 보기 함수
function showWrongPhrases() {
  let wrongPhrasesList = wrongPhrases.map(
    (phrase) => `${phrase.eng} : ${phrase.kor}`
  ).join("<br>");
  
  if (wrongPhrasesList.length === 0) {
    resultText.innerHTML = `틀린 문구가 없습니다!`;
  } else {
    resultText.innerHTML = `<br>${wrongPhrasesList}`;
  }
  resultContainer.style.display = "block";
}