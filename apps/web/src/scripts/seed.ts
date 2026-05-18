/**
 * Seed garden-smile-uk with demo categories + 8 products from the client's
 * eBay listings. Idempotent — re-running skips anything already present
 * (matched by slug).
 *
 * Invoked from /api/_seed (guarded by SEED_SECRET) so we get to reuse the
 * running Next.js + Payload runtime instead of spawning a fresh CLI process.
 */
import type { Payload } from 'payload'

interface SeedCategory {
  name: string
  slug: string
  description?: string
}

interface SeedProduct {
  ebayId: string
  name: string
  slug: string
  price: number
  /** Category slug — must match a SeedCategory. */
  categorySlug: string
  imageUrl: string
  description: string
  /** cm. */
  height?: number
}

const categories: SeedCategory[] = [
  {
    name: 'Wiatraki',
    slug: 'wiatraki',
    description:
      'Drewniane wiatraki ogrodowe z oświetleniem LED, w rozmiarach od 85 cm do ponad 2 m. Ręcznie wykonane.',
  },
  {
    name: 'Studnie',
    slug: 'studnie',
    description:
      'Dekoracyjne drewniane studnie ogrodowe — pełnią funkcję donic i są mocnym punktem każdego ogrodu.',
  },
  {
    name: 'Spinnery',
    slug: 'spinnery',
    description: 'Trójwymiarowe drewniane spinnery wiatrowe, kręcące się przy najmniejszym powiewie.',
  },
  {
    name: 'Donice',
    slug: 'donice',
    description: 'Drewniane donice ogrodowe i taczki w stylu wiejskim.',
  },
]

// Polish prices reflect realistic local market (Drew-Handel level), not GBP × FX.
const products: SeedProduct[] = [
  {
    ebayId: '286525948573',
    name: 'Spinner wiatrowy Twister 50 cm — drewniany 3D',
    slug: 'spinner-wiatrowy-50cm',
    price: 149,
    categorySlug: 'spinnery',
    imageUrl: 'https://i.ebayimg.com/images/g/jNMAAOSwgvNoDqef/s-l1600.jpg',
    description:
      'Drewniany spinner wiatrowy 50 cm, wykonany ręcznie. Kręci się przy najmniejszym powiewie i dodaje ruchu na patio lub w rabatce.',
    height: 50,
  },
  {
    ebayId: '287314114324',
    name: 'Taczka-donica 127 cm — drewniana, naturalne wykończenie',
    slug: 'taczka-donica-127cm',
    price: 189,
    categorySlug: 'donice',
    imageUrl: 'https://i.ebayimg.com/images/g/3c4AAeSw1Clp-lVi/s-l1600.jpg',
    description:
      'Drewniana taczka ogrodowa o długości 127 cm. Naturalne wykończenie, ozdobna, a jednocześnie w pełni funkcjonalna jako głęboka donica na sezonowe kwiaty.',
    height: 127,
  },
  {
    ebayId: '287317151252',
    name: 'Wiatrak ogrodowy 85 cm — drewniany z LED',
    slug: 'wiatrak-85cm',
    price: 269,
    categorySlug: 'wiatraki',
    imageUrl: 'https://i.ebayimg.com/images/g/GDUAAOSwaPZnskRm/s-l1600.jpg',
    description:
      'Kompaktowy wiatrak ogrodowy 85 cm, wykonany ręcznie z drewna zabezpieczonego przed warunkami atmosferycznymi, z wbudowanym oświetleniem LED. Idealny na małe patio lub jako akcent w rabacie.',
    height: 85,
  },
  {
    ebayId: '286672352514',
    name: 'Wiatrak ogrodowy 100 cm — drewniany z LED',
    slug: 'wiatrak-100cm',
    price: 299,
    categorySlug: 'wiatraki',
    imageUrl: 'https://i.ebayimg.com/images/g/4~YAAeSwBKJp-jFi/s-l1600.jpg',
    description:
      'Wiatrak ogrodowy 1 m z LED i ręcznie malowanymi łopatami. Złoty środek — solidny rozmiar, który nie przytłacza mniejszych ogrodów.',
    height: 100,
  },
  {
    ebayId: '286432556188',
    name: 'Studnia ogrodowa 135 cm — drewniana, ręcznie wykonana',
    slug: 'studnia-135cm',
    price: 549,
    categorySlug: 'studnie',
    imageUrl: 'https://i.ebayimg.com/images/g/beIAAOSwfS1n4Jo7/s-l1600.jpg',
    description:
      'Duża studnia-donica 135 cm na patio lub trawnik. Solidna konstrukcja drewniana z dachem o stromym spadku. Funkcjonuje też jako pojemna donica na rośliny zwisające.',
    height: 135,
  },
  {
    ebayId: '286706637512',
    name: 'Wiatrak ogrodowy 135 cm — drewniany z LED',
    slug: 'wiatrak-135cm',
    price: 449,
    categorySlug: 'wiatraki',
    imageUrl: 'https://i.ebayimg.com/images/g/6OEAAOSwInBnsj2d/s-l1600.jpg',
    description:
      'Wiatrak 135 cm wykonany ręcznie, z wbudowanym oświetleniem LED. Bridge między akcentem dekoracyjnym a centralną ozdobą ogrodu.',
    height: 135,
  },
  {
    ebayId: '286523432422',
    name: 'Wiatrak ogrodowy 170 cm — drewniany z LED',
    slug: 'wiatrak-170cm',
    price: 549,
    categorySlug: 'wiatraki',
    imageUrl: 'https://i.ebayimg.com/images/g/tYgAAOSwCkZoDVjS/s-l1600.jpg',
    description:
      'Duży wiatrak 170 cm — wykonany ręcznie z drewna impregnowanego, z LED. Pomyślany jako centralny punkt trawnika lub rabaty.',
    height: 170,
  },
  {
    ebayId: '286581486714',
    name: 'Wiatrak ogrodowy 223 cm — drewniany z LED',
    slug: 'wiatrak-223cm',
    price: 749,
    categorySlug: 'wiatraki',
    imageUrl: 'https://i.ebayimg.com/images/g/ad8AAeSwpHBp-jbd/s-l1600.jpg',
    description:
      'Spektakularny wiatrak ogrodowy 2,23 m — największy w naszej ofercie. Ręcznie wykonany, z LED, dla przestronnych ogrodów i rezydencji.',
    height: 223,
  },
]

const richTextFromString = (text: string) => ({
  root: {
    type: 'root' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        textStyle: '',
        children: [
          {
            mode: 'normal' as const,
            text,
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
      },
    ],
  },
})

async function downloadImage(url: string): Promise<{ buffer: Buffer; mimetype: string }> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const mimetype = res.headers.get('content-type') ?? 'image/jpeg'
  return { buffer, mimetype }
}

export interface SeedResult {
  categoriesCreated: string[]
  categoriesSkipped: string[]
  productsCreated: string[]
  productsSkipped: string[]
  homePage: 'created' | 'skipped' | 'error'
  blogPostsCreated: string[]
  blogPostsSkipped: string[]
  reviewsCreated: number
  reviewsSkipped: number
  errors: Array<{ slug: string; message: string }>
}

const sampleReviews = [
  {
    productSlug: 'windmill-170cm',
    rating: 5,
    title: 'Mocna konstrukcja, świetny wygląd',
    comment:
      'Wiatrak 170cm postawiony w ogrodzie już od miesiąca — solidnie wykonany, łapie nawet słaby wiatr, sąsiedzi pytają skąd. Pakowanie i wysyłka na piątkę.',
    guestName: 'Mariusz K.',
    source: 'allegro',
    featured: true,
  },
  {
    productSlug: 'wishing-well-135cm',
    rating: 5,
    title: 'Piękny element w naszym ogrodzie',
    comment:
      'Studnia przyjechała wcześniej niż obiecano, idealnie wykończona. Drewno pachnie cedrem, wykonanie bardzo dokładne. Polecam każdemu.',
    guestName: 'Joanna W.',
    source: 'allegro',
    featured: true,
  },
  {
    productSlug: 'wheel-barrow-planter-127cm',
    rating: 5,
    title: 'Świetna donica, świetny sprzedawca',
    comment:
      'Już posadziłam pelargonie — wygląda fantastycznie. Solidna taczka, żadnych słabych elementów. Sprawna komunikacja i szybka wysyłka.',
    guestName: 'Anna P.',
    source: 'allegro',
    featured: true,
  },
  {
    productSlug: 'wind-spinner-twister-50cm',
    rating: 4,
    title: 'Hipnotyzujący w wietrze',
    comment:
      'Kręci się przy najmniejszym powiewie, kolory ładnie łapią światło. Montaż zajął chwilę, instrukcja mogłaby być jaśniejsza, ale efekt świetny.',
    guestName: 'Tomasz S.',
    source: 'allegro',
    featured: true,
  },
  {
    productSlug: 'windmill-100cm',
    rating: 5,
    title: 'Druga sztuka u nas',
    comment:
      'Pierwszy wiatrak od Garden Smile wytrzymał już trzy zimy, więc dokupuję dla mamy. Solidne wykonanie i obsługa na poziomie — to się ceni.',
    guestName: 'Krzysztof M.',
    source: 'allegro',
    featured: true,
  },
  {
    productSlug: 'windmill-223cm',
    rating: 5,
    title: 'Centralny punkt ogrodu',
    comment:
      'Wiatrak 223cm robi naprawdę imponujące wrażenie — kawałek wiejskiego klimatu w naszym ogrodzie. Montaż prosty, drewno przepiękne.',
    guestName: 'Halina B.',
    source: 'allegro',
    featured: true,
  },
] as const

async function ensureSampleReviews(
  payload: Payload,
  productIds: Map<string, string | number>,
): Promise<{ created: number; skipped: number }> {
  let created = 0
  let skipped = 0
  for (const r of sampleReviews) {
    const productId = productIds.get(r.productSlug)
    if (!productId) {
      skipped += 1
      continue
    }
    const existing = await payload.find({
      collection: 'reviews' as never,
      where: {
        and: [
          { product: { equals: productId } },
          { title: { equals: r.title } },
        ],
      } as never,
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      skipped += 1
      continue
    }
    await payload.create({
      collection: 'reviews' as never,
      data: {
        product: productId,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        guestName: r.guestName,
        status: 'approved',
        verifiedPurchase: true,
        source: r.source,
        featured: r.featured,
      } as never,
    })
    created += 1
  }
  return { created, skipped }
}

interface BlogSeedCategory {
  name: string
  slug: string
  description: string
  order: number
}

interface BlogSeedPost {
  slug: string
  title: string
  excerpt: string
  paragraphs: string[]
  categorySlug: string
  publishedDaysAgo: number
}

const BLOG_AUTHOR = {
  name: 'Zespół Garden Smile',
  slug: 'zespol-garden-smile',
  bio: 'Ręcznie buduje, testuje na pogodzie i pisze o każdym wiatraku, donicy i studni, która opuszcza warsztat.',
}

const BLOG_CATEGORIES: BlogSeedCategory[] = [
  {
    name: 'Pomysły do ogrodu',
    slug: 'pomysly',
    description: 'Inspiracje i porady stylistyczne dla przestrzeni zewnętrznych.',
    order: 1,
  },
  {
    name: 'Poradniki',
    slug: 'poradniki',
    description: 'Praktyczne porady jak wybrać i dbać o dekoracje ogrodowe.',
    order: 2,
  },
]

const BLOG_POSTS: BlogSeedPost[] = [
  {
    slug: '5-sposobow-wiatrak-odmieni-ogrod',
    title: '5 sposobów jak drewniany wiatrak odmieni twój ogród latem',
    excerpt:
      'Wiatrak robi więcej niż się kręci. Oto jak 1,5 m drewniany wiatrak zmienia płaski trawnik w miejsce, w którym chce się spędzać czas.',
    paragraphs: [
      'Ogród bez pionowego akcentu wygląda jak zdanie bez kropki: długie, płaskie, łatwe do zignorowania. Wiatrak rozwiązuje to w chwili gdy go postawisz. Oko go znajduje, śledzi obroty łopat, potem skanuje resztę przestrzeni. Nagle rabaty wyglądają jak zaplanowane.',
      'Ruch to drugi trik. Na statycznym zdjęciu ogród jest nieruchomy; w rzeczywistości lekki wiatr utrzymuje wszystko w subtelnym ruchu. Wiatrak to wzmacnia. Nawet w spokojne popołudnie najlżejszy podmuch wystarczy żeby łopaty się zakręciły, a cały ogród się ożywia.',
      'O zmierzchu nasze modele z LED zarabiają na siebie. Ukryte ciepło-białe diody w obudowie rzucają miękkie plamy światła na sąsiadującą rabatę, zamieniając wiatrak w cichy element oświetlenia krajobrazu. Przestajesz zaciągać zasłony zaraz po zmroku.',
      'Plus dźwięk. Dobrze zbudowany wiatrak ledwo tyka — wystarczająco żeby zarejestrować ruch świata wokół ciebie. To rodzaj dźwięku tła, który obniża ciśnienie zamiast je podnosić.',
      'Wreszcie skala. Modele 85 cm traktuje się jak akcenty, a 2 m jak centralne elementy, ale prawda jest taka że cokolwiek wyższego niż do pasa reorganizuje to jak ogród się odbiera. Spróbuj postawić wiatrak przy ogrodzeniu, które chciałbyś żeby zniknęło. Przestaniesz widzieć ogrodzenie.',
    ],
    categorySlug: 'pomysly',
    publishedDaysAgo: 4,
  },
  {
    slug: 'jak-wybrac-rozmiar-wiatraka',
    title: 'Jak wybrać odpowiedni rozmiar wiatraka ogrodowego: kompletny poradnik',
    excerpt:
      'Za mały wygląda jak zabawka. Za wysoki przytłacza rabatę. Uczciwy poradnik jak dobrać rozmiar.',
    paragraphs: [
      'Pytanie o rozmiar pada najczęściej, a odpowiedź prawie zawsze brzmi: większy niż myślisz na początku. Reguła kciuka w warsztacie: wiatrak powinien mieć co najmniej jedną trzecią wysokości tego, przy czym stoi. Dwumetrowy płot prosi się o min. 80 cm; trzymetrowa altana — coś powyżej metra.',
      'Rozmiar 85 cm to nasz punkt wejścia i sprawdza się świetnie na patio, balkonie i jako akcent w wąskiej rabacie. Klienci często wybierają ten jako pierwszy, a po pół roku wracają po wyższy. Nie bez powodu.',
      'Rozmiary 1 m i 1,35 m to złoty środek dla średniej wielkości polskiego ogrodu. Mają obecność bez przytłaczania trawnika i to one zazwyczaj pełnią rolę światła krajobrazowego o zmierzchu dzięki wbudowanym LED-om.',
      'Powyżej 1,7 m wchodzimy w terytorium centralnych elementów. Wiatrak 2,23 m to zamówienie tych, którzy mają długi trawnik i chcą "destynacji" na jego końcu — punkt, na którym oko spoczywa gdy patrzysz przez okno kuchenne. Spodziewaj się, że goście podejdą obejrzeć.',
      'Jeszcze jedno: pomyśl o transporcie. Wiatrak 2,2 m nie przyjeżdża jako jedna sztuka. Upewnij się że karton z elementami przejdzie przez twoją bramę przed zamówieniem. Pomagaliśmy nieraz przenosić wiatrak naokoło domu.',
    ],
    categorySlug: 'poradniki',
    publishedDaysAgo: 12,
  },
  {
    slug: 'pielegnacja-drewnianych-dekoracji',
    title: 'Pielęgnacja drewnianych dekoracji ogrodowych: kalendarz na cały rok',
    excerpt:
      'Pięć minut na sezon to wszystko czego trzeba. Wiosna, lato, jesień, zima — prosty schemat utrzymujący drewno jak nowe.',
    paragraphs: [
      'Każdy element opuszczający warsztat jest impregnowany ciśnieniowo i wykończony bezbarwnym lakierem pogodoodpornym, ale drewno to drewno. Trochę uwagi dwa razy w roku podwaja użyteczne życie tego, co stoi na zewnątrz w polskim klimacie.',
      'Wiosną przejedź miękką szczotką i ciepłą wodą z mydłem. Sprawdź łączenia — tam zazwyczaj zbiera się wilgoć. Jeśli widzisz szarzenie, jedna warstwa bezbarwnego oleju do drewna zewnętrznego przywraca zarówno kolor jak i warstwę odpychającą wodę.',
      'Lato to łatwy sezon. Zwracaj uwagę na to, co podpełzło — pnącza uwielbiają opleciać się wokół nóg wiatraka i dachów studni. Przytnij je; uwięziona zieleń trzyma wilgoć przy drewnie i przyspiesza starzenie.',
      'Jesień to dobry moment na ponowne olejowanie. Drewno ma za sobą sześć miesięcy słońca i wypija cienką warstwę oleju chętnie. Wybierz suche popołudnie; pędzlem na, zostaw na godzinę, zetrzyj nadmiar. Gotowe.',
      'Zimą najczęściej się przesadza. Drewniane elementy przetrwają mróz; czego nie lubią to siedzenia na stale mokrej ziemi. Jeśli donica lub studnia stoi w mokrym miejscu, podnieś ją na dwóch-trzech cegłach. Powietrze pod spodem daje więcej niż jakiekolwiek preparaty.',
    ],
    categorySlug: 'poradniki',
    publishedDaysAgo: 21,
  },
  {
    slug: 'drewno-czy-metal',
    title: 'Drewno czy metal w ogrodzie: co wytrzyma dłużej?',
    excerpt:
      'Uczciwe porównanie z warsztatu, który używa obu. Spoiler: trwałość rzadko jest decydującym kryterium.',
    paragraphs: [
      'Używamy obu materiałów i każdy ma swoje miejsce. Skrót: metal trzyma dłużej bez obróbki, drewno starzeje się ładniej. Sztuka polega na dopasowaniu materiału do wyglądu, jaki chcesz, a nie ścigania się ze specyfikacją.',
      'Stal proszkowo lakierowana utrzyma kolor przez dekadę bez konserwacji. Minus: kiedy w końcu zaczyna się odpryskiwać — a zacznie — naprawy są widoczne. Rozwiązanie to pełna renowacja, nie poprawka.',
      'Drewno za to dojrzewa. Pierwszy rok wiatrak najmocniej się zmienia: z ciepłego miodu do głębszego bursztynu. Po drugim roku się stabilizuje. Z lekkim corocznym olejowaniem najstarsze elementy klientów są teraz osiem lat w użyciu. Bez oleju szarzeją do srebra — niektórzy świadomie tego chcą dla nadmorskiego stylu.',
      'Decyzja zazwyczaj zależy od sąsiedztwa, nie metalurgii. W nowoczesnym minimalistycznym ogrodzie stal proszkowa znika dyskretnie; w ogrodzie wiejskim drewno wygląda jakby zawsze tam stało.',
      'Mix też działa. Nasze najczęstsze zdjęcie od klientów to drewniany wiatrak postawiony przed czarno malowanym stalowym łukiem. Kontrast robi więcej niż każdy element osobno.',
    ],
    categorySlug: 'poradniki',
    publishedDaysAgo: 30,
  },
  {
    slug: 'karmniki-ktore-dzialaja',
    title: 'Karmniki dla ptaków które naprawdę działają: 4 sprawdzone wzory',
    excerpt:
      'Większość karmników zawodzi przez geometrię, nie przez ziarno. Na co zwracać uwagę i jak je ustawić.',
    paragraphs: [
      'Karmnik żyje lub umiera na trzech rzeczach: osłonie od wiatru, odległości od punktu startowego ptaka i dachu, który naprawdę chroni ziarno przed deszczem. Pomiń którekolwiek z nich, a najdroższe ziarno świata pozostanie nietknięte.',
      'Wiatr po pierwsze. Ptaki nie zatrzymają się przy chwiejącym karmniku. Wiszące potrzebują albo stałego haka, albo lepiej — stojaka. Większość naszych karmników budujemy z wbudowanym stojakiem właśnie z tego powodu: ptak podchodzi do stabilnego celu.',
      'Odległość po drugie. Krogulce atakują z osłony, więc karmnik mniej niż metr od żywopłotu wygląda jak pułapka. Ptak, który przeżyje zimę, to ten który nauczy się żerować dwa metry od czegokolwiek, w czym jastrząb może się ukryć.',
      'Dach najważniejszy w polskim klimacie. Namokniętey ziarno rosną pleśń szybko, a ptaki szybko uczą się je omijać. Im głębszy nadwies, tym dłużej ziarno zostaje jadalne. Nasze dachy wystają mocno poza tackę z ziarnem.',
      'Wreszcie czyszczenie. Nudna prawda: każdy karmnik wymaga mycia gorącą wodą co dwa tygodnie zimą. Inteligentny projekt to ten, który rozkłada się w 30 sekund bez narzędzi.',
    ],
    categorySlug: 'pomysly',
    publishedDaysAgo: 42,
  },
  {
    slug: 'handmade-czy-masowka',
    title: 'Dlaczego handmade bije masówkę w dekoracji ogrodu',
    excerpt:
      'Nie sentymentalizm. Trzeźwe spojrzenie na to, gdzie idzie różnica 200 zł w cenie.',
    paragraphs: [
      'Jesteśmy stronniczy: prowadzimy warsztat. Ale argument za handmade nie jest sentymentalny. Chodzi głównie o to, jak każdy element jest zaprojektowany pod klimat, w którym ma stać.',
      'Masowo produkowany wiatrak jest projektowany dla najprostszego wspólnego mianownika. Ten sam model trafia do suchej Hiszpanii i wilgotnej Polski, a grubość drewna ustawiona jest gdzieś pośrodku. Nasz model 100 cm używa konstrukcyjnego drewna 28 mm w nogach, bo przetestowaliśmy 18 mm i 22 mm i widzieliśmy jak się skręcają przez dwie zimy.',
      'Plus mocowania. Masówka używa ocynkowanych wkrętów, bo są tanie; my używamy nierdzewki na całości, bo zmęczyło nas wymienianie zardzewiałych łbów. Różnica liczona w groszach na element i latach służby.',
      'Wykończenie to drugi niewidoczny koszt. Fabrycznie barwiony wiatrak dostaje jedną warstwę pigmentowego barwnika. Nasze są olejowane, szlifowane, olejowane ponownie. To krok który sprawia, że element starzeje się do barwy miodu, a nie szarości.',
      'Wszystko to uzasadnia różnicę ceny — około 200 zł na metrowym wiatraku, w porównaniu do masowego importu. Możesz te pieniądze zaoszczędzić. My uważamy że matematyka cię dogania w trzecim roku.',
    ],
    categorySlug: 'pomysly',
    publishedDaysAgo: 55,
  },
]

async function ensureBlogContent(
  payload: Parameters<typeof runSeed>[0],
  productMediaIds: Array<string | number>,
): Promise<{ created: string[]; skipped: string[] }> {
  const created: string[] = []
  const skipped: string[] = []

  const existingAuthor = await payload.find({
    collection: 'blog-authors' as never,
    where: { slug: { equals: BLOG_AUTHOR.slug } } as never,
    limit: 1,
    depth: 0,
  })
  let authorId: string | number
  if (existingAuthor.totalDocs > 0) {
    authorId = (existingAuthor.docs[0] as { id: string | number }).id
  } else {
    const a = (await payload.create({
      collection: 'blog-authors' as never,
      locale: 'pl' as never,
      data: {
        name: BLOG_AUTHOR.name,
        slug: BLOG_AUTHOR.slug,
        bio: {
          root: {
            type: 'root' as const, format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
            children: [{
              type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
              textFormat: 0, textStyle: '',
              children: [{ mode: 'normal' as const, text: BLOG_AUTHOR.bio, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            }],
          },
        },
      } as never,
    })) as { id: string | number }
    authorId = a.id
  }

  const categoryIds = new Map<string, string | number>()
  for (const cat of BLOG_CATEGORIES) {
    const existing = await payload.find({
      collection: 'blog-categories' as never,
      where: { slug: { equals: cat.slug } } as never,
      limit: 1,
      depth: 0,
    })
    if (existing.totalDocs > 0) {
      categoryIds.set(cat.slug, (existing.docs[0] as { id: string | number }).id)
      continue
    }
    const c = (await payload.create({
      collection: 'blog-categories' as never,
      locale: 'pl' as never,
      data: {
        name: cat.name,
        slug: cat.slug,
        description: {
          root: {
            type: 'root' as const, format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
            children: [{
              type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
              textFormat: 0, textStyle: '',
              children: [{ mode: 'normal' as const, text: cat.description, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            }],
          },
        },
        order: cat.order,
      } as never,
    })) as { id: string | number }
    categoryIds.set(cat.slug, c.id)
  }

  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const post = BLOG_POSTS[i]
    if (!post) continue
    const existing = await payload.find({
      collection: 'blog-posts' as never,
      where: { slug: { equals: post.slug } } as never,
      limit: 1,
      depth: 0,
    })
    if (existing.totalDocs > 0) {
      skipped.push(post.slug)
      continue
    }
    const categoryId = categoryIds.get(post.categorySlug)
    if (!categoryId) continue
    const publishedAt = new Date(Date.now() - post.publishedDaysAgo * 24 * 60 * 60 * 1000).toISOString()
    const coverImageId = productMediaIds[i % Math.max(1, productMediaIds.length)]

    await payload.create({
      collection: 'blog-posts' as never,
      locale: 'pl' as never,
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: {
          root: {
            type: 'root' as const, format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
            children: post.paragraphs.map((text) => ({
              type: 'paragraph', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
              textFormat: 0, textStyle: '',
              children: [{ mode: 'normal' as const, text, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
            })),
          },
        },
        author: authorId,
        category: categoryId,
        status: 'published',
        publishedAt,
        ...(coverImageId && { coverImage: coverImageId }),
      } as never,
    })
    created.push(post.slug)
  }

  return { created, skipped }
}

const FEATURED_SLUGS = ['wiatrak-100cm', 'studnia-135cm', 'taczka-donica-127cm', 'spinner-wiatrowy-50cm']
const TILE_CATEGORY_SLUGS = ['wiatraki', 'studnie', 'donice', 'spinnery']

async function ensureHomePage(
  payload: Parameters<typeof runSeed>[0],
  productIds: Map<string, string | number>,
  categoryIds: Map<string, string | number>,
): Promise<'created' | 'skipped' | 'error'> {
  try {
    const current = (await payload.findGlobal({
      slug: 'home-page' as never,
      depth: 0,
    })) as { blocks?: unknown[] } | null
    if (current?.blocks && current.blocks.length > 0) return 'skipped'

    const featured = FEATURED_SLUGS.map((s) => productIds.get(s)).filter(Boolean) as Array<string | number>
    const tiles = TILE_CATEGORY_SLUGS.map((s) => categoryIds.get(s)).filter(Boolean) as Array<
      string | number
    >

    await payload.updateGlobal({
      slug: 'home-page' as never,
      data: {
        blocks: [
          {
            blockType: 'hero',
            eyebrow: 'Ręczna robota z Polski',
            heading: 'Ogród, który robi wrażenie —',
            headingAccent: 'bez całego weekendu pracy',
            subheading:
              'Karmniki dla ptaków, donice, wiatraki, studnie. Solidne wyroby z drewna i metalu z wbudowanym oświetleniem LED. Wykonane z myślą o każdej porze roku.',
            primaryCta: { label: 'Zobacz wiatraki', href: '/shop?category=wiatraki' },
            secondaryCta: { label: 'Cały sklep', href: '/shop' },
          },
          {
            blockType: 'trust-bar',
            items: [
              { icon: '🔨', label: 'Ręcznie wykonane w Polsce' },
              { icon: '🚚', label: 'Wysyłka w 48h' },
              { icon: '↩', label: '14 dni na zwrot' },
              { icon: '🔒', label: 'Bezpieczne płatności' },
            ],
          },
          ...(featured.length > 0
            ? [
                {
                  blockType: 'featured-products',
                  eyebrow: 'Najczęściej wybierane',
                  heading: 'Ulubione naszych klientów',
                  products: featured,
                  viewAllHref: '/shop',
                },
              ]
            : []),
          ...(tiles.length > 0
            ? [
                {
                  blockType: 'category-tiles',
                  eyebrow: 'Wybierz kategorię',
                  heading: 'Wybierz styl',
                  categories: tiles,
                  columns: '4',
                },
              ]
            : []),
        ],
      } as never,
      overrideAccess: true,
    })
    return 'created'
  } catch {
    return 'error'
  }
}

export async function runSeed(payload: Payload): Promise<SeedResult> {
  const result: SeedResult = {
    categoriesCreated: [],
    categoriesSkipped: [],
    productsCreated: [],
    productsSkipped: [],
    homePage: 'skipped',
    blogPostsCreated: [],
    blogPostsSkipped: [],
    reviewsCreated: 0,
    reviewsSkipped: 0,
    errors: [],
  }
  const productMediaIds: Array<string | number> = []

  const categoryIds = new Map<string, string | number>()
  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories' as never,
      where: { slug: { equals: cat.slug } } as never,
      limit: 1,
      locale: 'en' as never,
    })
    if (existing.totalDocs > 0) {
      categoryIds.set(cat.slug, (existing.docs[0] as { id: string | number }).id)
      result.categoriesSkipped.push(cat.slug)
      continue
    }
    const created = (await payload.create({
      collection: 'categories' as never,
      locale: 'en' as never,
      data: {
        name: cat.name,
        slug: cat.slug,
        ...(cat.description && { description: richTextFromString(cat.description) }),
      } as never,
    })) as { id: string | number }
    categoryIds.set(cat.slug, created.id)
    result.categoriesCreated.push(cat.slug)
  }

  const productIds = new Map<string, string | number>()
  for (const p of products) {
    try {
      const existing = await payload.find({
        collection: 'products' as never,
        where: { slug: { equals: p.slug } } as never,
        limit: 1,
        locale: 'en' as never,
      })
      if (existing.totalDocs > 0) {
        productIds.set(p.slug, (existing.docs[0] as { id: string | number }).id)
        result.productsSkipped.push(p.slug)
        continue
      }

      const { buffer, mimetype } = await downloadImage(p.imageUrl)
      const ext = mimetype.includes('webp') ? 'webp' : mimetype.includes('png') ? 'png' : 'jpg'

      const media = (await payload.create({
        collection: 'media' as never,
        data: { alt: p.name } as never,
        file: {
          data: buffer,
          mimetype,
          name: `${p.slug}.${ext}`,
          size: buffer.length,
        },
      })) as { id: string | number }
      productMediaIds.push(media.id)

      const categoryId = categoryIds.get(p.categorySlug)
      if (!categoryId) throw new Error(`Unknown category: ${p.categorySlug}`)

      const created = (await payload.create({
        collection: 'products' as never,
        locale: 'en' as never,
        data: {
          name: p.name,
          slug: p.slug,
          description: richTextFromString(p.description),
          price: p.price,
          category: categoryId,
          images: [{ image: media.id }],
          status: 'available',
          stock: 5,
          ...(p.height && { dimensions: { height: p.height } }),
        } as never,
      })) as { id: string | number }
      productIds.set(p.slug, created.id)
      result.productsCreated.push(p.slug)
    } catch (err) {
      result.errors.push({ slug: p.slug, message: err instanceof Error ? err.message : String(err) })
    }
  }

  if (productMediaIds.length === 0 && productIds.size > 0) {
    const existing = await payload.find({
      collection: 'products' as never,
      where: { id: { in: Array.from(productIds.values()) } } as never,
      limit: 50,
      depth: 1,
    })
    for (const p of existing.docs as Array<{ images?: Array<{ image?: unknown } | null> }>) {
      const img = p.images?.[0]?.image
      if (img && typeof img === 'object' && 'id' in img) {
        productMediaIds.push((img as { id: string | number }).id)
      } else if (typeof img === 'string' || typeof img === 'number') {
        productMediaIds.push(img)
      }
    }
  }

  result.homePage = await ensureHomePage(payload, productIds, categoryIds)

  try {
    const blog = await ensureBlogContent(payload, productMediaIds)
    result.blogPostsCreated = blog.created
    result.blogPostsSkipped = blog.skipped
  } catch (err) {
    result.errors.push({
      slug: 'blog',
      message: err instanceof Error ? err.message : String(err),
    })
  }

  try {
    const reviews = await ensureSampleReviews(payload, productIds)
    result.reviewsCreated = reviews.created
    result.reviewsSkipped = reviews.skipped
  } catch (err) {
    result.errors.push({
      slug: 'reviews',
      message: err instanceof Error ? err.message : String(err),
    })
  }

  return result
}
