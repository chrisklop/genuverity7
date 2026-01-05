/**
 * Jan and Dean: The California Sound Data
 *
 * A comprehensive historiography of the duo who helped architect
 * the sound of California in the 1960s.
 *
 * "Two guys for every tune" - An immersive experience
 *
 * @version 1.0
 */

const JAN_AND_DEAN_DATA = {
    meta: {
        title: "The Architecture of the California Sound",
        subtitle: "A Comprehensive Historiography of Jan and Dean",
        tagline: "Two Guys for Every Tune",
        slug: "jan-and-dean-california-sound",
        author: "A Special Report",
        publishDate: "2026-01-04",
        readTime: "10 min experience",
        totalEvents: 25,
        version: "1.0",
        dedication: "For the fans who never stopped surfing the sound waves"
    },

    // Visual theme configuration - California golden hour vibes
    theme: {
        primary: "#f59e0b",      // Amber/Gold - California sun
        secondary: "#06b6d4",    // Cyan - Pacific Ocean
        accent1: "#ef4444",      // Red - Hot rod
        accent2: "#3b82f6",      // Blue - Sky
        success: "#10b981",      // Green
        background: "#0a0a14",
        card: "#1a1a2e",
        text: "#f0f0f0",
        muted: "#94a3b8",
        sunset: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #3b82f6 100%)"
    },

    // Key figures with Easter eggs
    keyFigures: [
        {
            id: "jan-berry",
            name: "William Jan Berry",
            nickname: "Jan",
            born: "April 3, 1941",
            died: "March 26, 2004",
            role: "Bass Vocals, Producer, Visionary",
            quote: "He was a one-man band in his head",
            funFact: "His father was one of the few people to fly on the Spruce Goose",
            image: "jan-berry.jpg"
        },
        {
            id: "dean-torrence",
            name: "Dean Ormsby Torrence",
            nickname: "Dean",
            born: "March 10, 1940",
            role: "Falsetto, Design, Entrepreneur",
            quote: "The visual voice of the California Dream",
            funFact: "Won a Grammy for album cover design, not music",
            image: "dean-torrence.jpg"
        },
        {
            id: "brian-wilson",
            name: "Brian Wilson",
            role: "Collaborator, Beach Boy, Genius",
            connection: "Co-wrote 'Surf City' - the first surf song to hit #1",
            quote: "Jan improved my tracks by five to fifteen percent"
        }
    ],

    // Discography highlights with chart positions
    chartHits: [
        { year: 1958, song: "Jennie Lee", peak: 8, label: "Arwin", note: "As Jan & Arnie" },
        { year: 1959, song: "Baby Talk", peak: 10, label: "Dore", note: "First as Jan & Dean" },
        { year: 1961, song: "Heart and Soul", peak: 25, label: "Challenge" },
        { year: 1963, song: "Linda", peak: 28, label: "Liberty" },
        { year: 1963, song: "Surf City", peak: 1, label: "Liberty", note: "First surf #1 ever" },
        { year: 1963, song: "Honolulu Lulu", peak: 11, label: "Liberty" },
        { year: 1963, song: "Drag City", peak: 10, label: "Liberty" },
        { year: 1964, song: "Dead Man's Curve", peak: 8, label: "Liberty", note: "Grammy Hall of Fame 2008" },
        { year: 1964, song: "The New Girl in School", peak: 37, label: "Liberty" },
        { year: 1964, song: "The Little Old Lady (from Pasadena)", peak: 3, label: "Liberty" },
        { year: 1964, song: "Ride the Wild Surf", peak: 16, label: "Liberty" },
        { year: 1964, song: "Sidewalk Surfin'", peak: 25, label: "Liberty" },
        { year: 1965, song: "You Really Know How to Hurt a Guy", peak: 27, label: "Liberty" },
        { year: 1965, song: "I Found a Girl", peak: 30, label: "Liberty" },
        { year: 1966, song: "Popsicle", peak: 21, label: "Liberty", note: "Last hit before the crash" }
    ],

    // Era definitions with punny names
    eras: [
        {
            id: "baby-talk",
            name: "Baby Talk",
            shortName: "Origins",
            years: "1957–1958",
            yearStart: 1957,
            yearEnd: 1958,
            color: "#f59e0b",
            colorAlpha: "rgba(245, 158, 11, 0.2)",
            mood: "golden-afternoon",
            visualStyle: "Sepia tones, high school yearbook, garage band",
            summary: "In the showers of Uni High and the garage at 1111 Linda Flora Drive, two football players discovered they could harmonize better than they could tackle.",
            tagline: "From locker room harmonies to the Billboard charts",
            easterEgg: "They were literally singing in the showers before it was a cliché",
            keyFigures: ["Jan Berry", "Dean Torrence", "Arnie Ginsburg", "Bruce Johnston"],
            stats: [
                { value: "1957", label: "Year Met" },
                { value: "2", label: "Ampex Recorders" },
                { value: "6", label: "Original Barons" }
            ],
            events: [
                {
                    id: "first-meeting",
                    year: 1957,
                    title: "Two Warriors Meet",
                    summary: "Jan Berry and Dean Torrence meet at Emerson Junior High in Westwood. Both are on the football team. Little do they know they're about to change music history.",
                    location: "Emerson Junior High, Westwood",
                    impact: "The partnership begins",
                    visualHint: "football-field"
                },
                {
                    id: "barons-formed",
                    year: 1957,
                    title: "The Barons Take Shape",
                    summary: "After harmonizing in locker room showers at University High School, the group forms 'The Barons' - named after their school's Hi-Y club. Future luminaries Bruce Johnston and Sandy Nelson round out the lineup.",
                    location: "University High School, West LA",
                    impact: "Six future stars in one garage",
                    connections: ["bel-air-lab"],
                    visualHint: "school-hallway"
                },
                {
                    id: "bel-air-lab",
                    year: 1958,
                    title: "The Bel Air Laboratory",
                    summary: "The Berry family garage at 1111 Linda Flora Drive becomes a recording laboratory. Jan's aeronautical engineer father provides two Ampex reel-to-reel tape recorders, and Jan begins experimenting with overdubbing techniques years ahead of his time.",
                    location: "1111 Linda Flora Drive, Bel Air",
                    impact: "Pioneer home studio",
                    highlight: true,
                    visualHint: "garage-studio"
                }
            ]
        },
        {
            id: "jan-and-arnie",
            name: "The Jan and Arnie Interlude",
            shortName: "Jan & Arnie",
            years: "1958",
            yearStart: 1958,
            yearEnd: 1958,
            color: "#ef4444",
            colorAlpha: "rgba(239, 68, 68, 0.2)",
            mood: "rock-and-roll-red",
            visualStyle: "1950s jukebox, red vinyl, spinning 45s",
            summary: "When Dean shipped out to Fort Ord, Jan didn't wait. With Arnie Ginsburg, he recorded a song about a burlesque dancer that would change everything.",
            tagline: "You snooze (at Fort Ord), you lose (the first hit)",
            easterEgg: "Dean was literally doing push-ups while his hit was climbing the charts",
            keyFigures: ["Jan Berry", "Arnie Ginsburg", "Joe Lubin"],
            stats: [
                { value: "#8", label: "Billboard Peak" },
                { value: "#3", label: "Cash Box Peak" },
                { value: "1", label: "Burlesque Star Immortalized" }
            ],
            events: [
                {
                    id: "dean-ships-out",
                    year: 1958,
                    title: "Dean Ships Out",
                    summary: "In March 1958, Dean Torrence begins active duty with the U.S. Army Reserve at Fort Ord, California. The timing couldn't be worse - the group is perfecting a potential hit called 'Jennie Lee.'",
                    location: "Fort Ord, California",
                    impact: "Partnership temporarily splits",
                    visualHint: "army-base"
                },
                {
                    id: "jennie-lee-recorded",
                    year: 1958,
                    title: "Jennie Lee: The Bazoom Breakthrough",
                    summary: "Jan and Arnie record 'Jennie Lee' in the garage, a tribute to the famous burlesque performer known as 'The Bazoom Girl.' A&R man Joe Lubin discovers the tape and signs them to Arwin Records.",
                    location: "1111 Linda Flora Drive, Bel Air",
                    impact: "First chart success",
                    highlight: true,
                    visualHint: "recording-session"
                },
                {
                    id: "jennie-lee-charts",
                    year: 1958,
                    title: "National Phenomenon",
                    summary: "'Jennie Lee' rockets to #8 on Billboard and #3 on Cash Box. Jan and Arnie appear on The Dick Clark Saturday Night Show and The Jack Benny Program. Dean reads about it in the Army newspaper.",
                    impact: "National television debut",
                    connections: ["dean-returns"],
                    visualHint: "tv-studio"
                }
            ]
        },
        {
            id: "surf-city",
            name: "Two Girls for Every Boy",
            shortName: "Surf City",
            years: "1962–1965",
            yearStart: 1962,
            yearEnd: 1965,
            color: "#06b6d4",
            colorAlpha: "rgba(6, 182, 212, 0.2)",
            mood: "pacific-blue",
            visualStyle: "Beach scenes, surfboards, hot rods, California sun",
            summary: "The peak years. Brian Wilson hands over an unfinished song. Jan and Dean turn it into the first surf anthem to top the charts. Then they do it again. And again.",
            tagline: "The California Dream made real",
            easterEgg: "Brian Wilson originally wanted 'Surf City' for the Beach Boys, but they chose 'Surfin' USA' instead",
            keyFigures: ["Jan Berry", "Dean Torrence", "Brian Wilson", "Hal Blaine", "The Wrecking Crew"],
            stats: [
                { value: "#1", label: "Surf City Peak" },
                { value: "26", label: "Chart Hits" },
                { value: "2", label: "T.A.M.I. Show Hosts" }
            ],
            events: [
                {
                    id: "dean-returns",
                    year: 1958,
                    title: "Dean Returns",
                    summary: "Dean Torrence completes his Army Reserve duty and returns to civilian life. Arnie Ginsburg gracefully exits to pursue architecture. Jan and Dean officially become... Jan and Dean.",
                    impact: "The duo is complete",
                    visualHint: "reunion"
                },
                {
                    id: "baby-talk-hit",
                    year: 1959,
                    title: "Baby Talk Breakout",
                    summary: "Their first major hit together, 'Baby Talk,' reaches #10 on Billboard. Produced by Herb Alpert and Lou Adler, it establishes Jan and Dean as a viable commercial entity. Funny enough, early pressings were accidentally labeled 'Jan and Arnie.'",
                    impact: "First hit as Jan and Dean",
                    visualHint: "record-label"
                },
                {
                    id: "beach-boys-meet",
                    year: 1962,
                    title: "Collision at Hermosa Beach",
                    summary: "At a concert at Hermosa Beach High School, Jan and Dean meet a young group called the Beach Boys, just breaking out with 'Surfin' Safari.' Jan Berry and Brian Wilson immediately recognize kindred spirits.",
                    location: "Hermosa Beach High School",
                    impact: "Historic partnership begins",
                    highlight: true,
                    visualHint: "beach-concert"
                },
                {
                    id: "surf-city-written",
                    year: 1963,
                    title: "The Gift of Surf City",
                    summary: "Brian Wilson offers Jan an unfinished song fragment. Jan completes the lyrics, produces the session over March and April 1963, and creates 'Surf City' - featuring Brian on backing vocals. The song coins the immortal phrase: 'Two girls for every boy.'",
                    impact: "First surf #1 in history",
                    highlight: true,
                    visualHint: "studio-session"
                },
                {
                    id: "surf-city-number-one",
                    year: 1963,
                    title: "Making History",
                    summary: "'Surf City' becomes the first surf-themed song to reach #1 on both Billboard and Cash Box charts. Jan and Dean beat the Beach Boys to the top spot with a song co-written by Brian Wilson. It's complicated, but it's beautiful.",
                    impact: "Cultural milestone",
                    visualHint: "chart-topper"
                },
                {
                    id: "wrecking-crew",
                    year: 1963,
                    title: "The Wrecking Crew Connection",
                    summary: "Jan Berry pioneers the use of two drummers - Hal Blaine and Earl Palmer - playing in tandem. His meticulous production work impresses the legendary session musicians. Jan introduces Brian Wilson to this elite group, influencing 'Pet Sounds.'",
                    impact: "Production innovation",
                    visualHint: "recording-studio"
                },
                {
                    id: "dead-mans-curve-release",
                    year: 1964,
                    title: "Dead Man's Curve",
                    summary: "A 'mini soap opera' about a fatal drag race on Sunset Boulevard reaches #8 on Billboard. Co-written by Jan, Brian Wilson, Roger Christian, and Artie Kornfeld. No one knows how prophetic it will become.",
                    impact: "Grammy Hall of Fame 2008",
                    highlight: true,
                    visualHint: "sunset-boulevard",
                    foreshadowing: true
                },
                {
                    id: "little-old-lady",
                    year: 1964,
                    title: "Go Granny Go",
                    summary: "'The Little Old Lady (from Pasadena)' hits #3. The complex vocal stacking creates a 'virtual choir' sound that's nearly impossible to replicate live. Jan's production genius is at its peak.",
                    impact: "Production masterpiece",
                    visualHint: "hot-rod"
                },
                {
                    id: "tami-show",
                    year: 1964,
                    title: "T.A.M.I. Show Hosts",
                    summary: "Jan and Dean are selected to host the T.A.M.I. Show, a groundbreaking concert film featuring James Brown, the Rolling Stones, Marvin Gaye, and more. They represent the California Sound to a global audience.",
                    location: "Santa Monica Civic Auditorium",
                    impact: "International visibility",
                    visualHint: "concert-stage"
                }
            ]
        },
        {
            id: "dead-mans-curve",
            name: "Dead Man's Curve",
            shortName: "The Crash",
            years: "1966",
            yearStart: 1966,
            yearEnd: 1966,
            color: "#ef4444",
            colorAlpha: "rgba(239, 68, 68, 0.25)",
            mood: "tragic-red",
            visualStyle: "Newspaper headlines, hospital corridors, fragments",
            summary: "April 12, 1966. Whittier Boulevard. 90 mph. A Corvette Sting Ray. A parked truck. The song became reality.",
            tagline: "The song that foretold the tragedy",
            easterEgg: "The crash occurred just blocks from the actual Dead Man's Curve location",
            keyFigures: ["Jan Berry", "Dean Torrence", "William L. Berry"],
            stats: [
                { value: "90", label: "MPH at Impact" },
                { value: "2", label: "Weeks in Coma" },
                { value: "∞", label: "Courage to Continue" }
            ],
            events: [
                {
                    id: "filet-of-soul",
                    year: 1966,
                    title: "Filet of Soul",
                    summary: "In early April 1966, Jan and Dean release 'Filet of Soul,' a collection showcasing their evolving sound. It will be the last album before everything changes.",
                    impact: "Final pre-accident release",
                    visualHint: "album-cover"
                },
                {
                    id: "the-crash",
                    year: 1966,
                    title: "The Crash",
                    summary: "On April 12, 1966, Jan Berry crashes his 1966 Corvette Sting Ray into a parked one-ton truck on Whittier Boulevard at an estimated 90 mph. The accident occurs just blocks from the actual 'Dead Man's Curve' in Beverly Hills. When paramedics arrive, they believe he is dead.",
                    date: "April 12, 1966",
                    location: "Whittier Boulevard, Los Angeles",
                    impact: "Life-altering brain injury",
                    highlight: true,
                    tragedy: true,
                    visualHint: "crash-scene"
                },
                {
                    id: "coma",
                    year: 1966,
                    title: "Two Weeks of Darkness",
                    summary: "Jan remains in a total coma at UCLA Medical Center for two weeks. The traumatic brain injury has caused severe damage - aphasia, partial paralysis, the inability to speak or comprehend language. The prognosis is grim.",
                    location: "UCLA Medical Center",
                    impact: "Uncertain survival",
                    visualHint: "hospital"
                },
                {
                    id: "conservatorship",
                    year: 1966,
                    title: "Under Conservatorship",
                    summary: "Jan's father, William L. Berry - the aerospace engineer who once flew on the Spruce Goose - becomes his son's conservator. The man who helped build flying machines must now help rebuild his son's shattered brain.",
                    impact: "Family becomes caretaker",
                    visualHint: "legal-document"
                }
            ]
        },
        {
            id: "one-last-ride",
            name: "One Last Ride",
            shortName: "Legacy",
            years: "1967–2004",
            yearStart: 1967,
            yearEnd: 2004,
            color: "#10b981",
            colorAlpha: "rgba(16, 185, 129, 0.2)",
            mood: "hopeful-green",
            visualStyle: "Rehabilitation, resilience, reunion, golden sunset",
            summary: "The doctors said he'd never walk, never talk, never make music again. They underestimated Jan Berry. They underestimated the power of the California Dream.",
            tagline: "You can't keep a good surfer down",
            easterEgg: "Jan's last concert was exactly 38 years after 'Surf City' hit #1",
            keyFigures: ["Jan Berry", "Dean Torrence", "Lou Adler"],
            stats: [
                { value: "38", label: "Years Fighting" },
                { value: "1", label: "Year to Walk Again" },
                { value: "200+", label: "Dean's Album Covers" }
            ],
            events: [
                {
                    id: "first-year-recovery",
                    year: 1967,
                    title: "The Long Road Back",
                    summary: "Exactly one year after the accident, Jan Berry returns to the recording studio. His speech is halting. He cannot yet sing. But his mind - his producer's mind - is fighting to reassemble itself. He begins work on 'Carnival of Sound.'",
                    date: "April 1967",
                    impact: "Defying medical predictions",
                    visualHint: "studio-return"
                },
                {
                    id: "carnival-of-sound",
                    year: 1968,
                    title: "Carnival of Sound",
                    summary: "Unable to provide lead vocals, Jan employs singers like Glen Campbell and Jill Gibson to execute his complex arrangements. The album - featuring strings, avant-garde pop, and psychedelic elements - remains unreleased for decades. Critics later call it 'forward-thinking genius.'",
                    impact: "Lost masterpiece",
                    visualHint: "psychedelic"
                },
                {
                    id: "save-for-rainy-day",
                    year: 1967,
                    title: "Save for a Rainy Day",
                    summary: "Dean attempts to release a solo album under the Jan and Dean name to maintain visibility. Jan - still recovering - smashes a pressing of the record when Dean shows it to him. The project is cancelled. It becomes a cult collector's item.",
                    impact: "Partnership tension",
                    visualHint: "broken-record"
                },
                {
                    id: "deadmans-curve-movie",
                    year: 1978,
                    title: "Deadman's Curve (The Movie)",
                    summary: "CBS airs a television movie about Jan and Dean's story, focusing on the accident and recovery. The film is a ratings success and reignites public interest in the duo. Jan and Dean reunite for live performances.",
                    impact: "Career revival",
                    highlight: true,
                    visualHint: "tv-movie"
                },
                {
                    id: "touring-resumes",
                    year: 1980,
                    title: "Back on the Road",
                    summary: "Throughout the 1980s and 1990s, Jan and Dean tour the oldies circuit. Jan's speech remains slow, and he requires constant medical management for seizures. But he insists on performing. The California Dream never really died.",
                    impact: "Decades of touring",
                    visualHint: "concert-stage"
                },
                {
                    id: "deans-design-career",
                    year: 1972,
                    title: "Dean's Second Act",
                    summary: "Dean Torrence wins a Grammy - not for music, but for Best Album Cover. His firm, Kittyhawk Graphics, designs over 200 album packages. The visual voice of the California Sound finds a new canvas.",
                    impact: "Grammy-winning designer",
                    visualHint: "album-designs"
                },
                {
                    id: "second-wave",
                    year: 1997,
                    title: "Second Wave",
                    summary: "Jan releases a solo album featuring new compositions and re-recordings of classic hits, produced with Lou Adler. It's proof that the creative fire never went out - just smoldered for thirty years.",
                    impact: "Creative renaissance",
                    visualHint: "album-release"
                },
                {
                    id: "final-concert",
                    year: 2004,
                    title: "The Final Ride",
                    summary: "On March 6, 2004, Jan and Dean perform their final concert together in El Cajon, California. Twenty days later, on March 26, Jan Berry passes away at UCLA Medical Center. Heart disease, accelerated by 38 years of fighting the effects of that April day in 1966.",
                    date: "March 26, 2004",
                    location: "UCLA Medical Center",
                    impact: "End of an era",
                    highlight: true,
                    visualHint: "sunset-farewell"
                },
                {
                    id: "legacy-continues",
                    year: 2008,
                    title: "Legacy Immortalized",
                    summary: "'Dead Man's Curve' is inducted into the Grammy Hall of Fame. Dean Torrence continues to tour with the Surf City Allstars, keeping the sound alive. The California Dream lives on in every guitar reverb, every four-part harmony, every sunny afternoon.",
                    impact: "Eternal influence",
                    visualHint: "sunset-highway"
                }
            ]
        }
    ],

    // Song puns and Easter eggs throughout the experience
    punnyQuotes: [
        { context: "loading", text: "Surfing to your destination...", song: "Surf City" },
        { context: "transition", text: "Two screens for every viewer", song: "Surf City" },
        { context: "chart-section", text: "Little charts, you're really lookin' fine", song: "The Little Old Lady" },
        { context: "accident", text: "The last thing I remember, Doc...", song: "Dead Man's Curve" },
        { context: "recovery", text: "Still got that same old dream", song: "Sidewalk Surfin'" },
        { context: "footer", text: "Surf's up - forever", song: "Ride the Wild Surf" }
    ],

    // Production credits
    productionCredits: {
        wreckingCrew: [
            { name: "Hal Blaine", role: "Drums", note: "Dual-drum kit pioneer" },
            { name: "Earl Palmer", role: "Drums", note: "Rhythm foundation" },
            { name: "Carol Kaye", role: "Bass", note: "Intricate bass lines" },
            { name: "Don Peake", role: "Guitar", note: "Session collaborator" }
        ],
        backingVocalists: ["The Matadors", "The Blossoms", "Brian Wilson"],
        engineers: ["Bones Howe", "Chuck Britz"],
        producers: ["Jan Berry", "Lou Adler", "Herb Alpert"]
    },

    // Academic sources (from the historiography)
    sources: [
        { id: 1, title: "Jan and Dean - Wikipedia", url: "https://en.wikipedia.org/wiki/Jan_and_Dean" },
        { id: 2, title: "Jan Berry Official Site", url: "https://jananddean-janberry.com/" },
        { id: 3, title: "Jan Berry and Brian Wilson", url: "https://jananddean-janberry.com/jan-berry-at-a-glance/jan-berry-and-brian-wilson/" },
        { id: 4, title: "History 1990-2004", url: "https://jananddean-janberry.com/history/history-1990-2004/" },
        { id: 5, title: "SFGATE: Jan Berry Obituary", url: "https://www.sfgate.com/bayarea/article/jan-berry-half-of-60s-pop-duo-2802620.php" },
        { id: 6, title: "The Truth About Jan and Dean", url: "https://soulrideblog.com/2019/06/12/the-truth-about-jan-and-dean/" },
        { id: 7, title: "Rock Music Wiki", url: "https://rock.fandom.com/wiki/Jan_and_Dean" },
        { id: 8, title: "The Guardian: Jan Berry", url: "https://www.theguardian.com/news/2004/apr/02/guardianobituaries.artsobituaries" },
        { id: 16, title: "TeachRock: Dead Man's Curve", url: "https://teachrock.org/article/jan-and-dean-you-dont-come-back-from-dead-mans-curve/" }
    ]
};
