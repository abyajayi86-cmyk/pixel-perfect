/**
 * Draft editorial content for Phase One inner pages.
 *
 * Draft copy written in warm, parent-friendly, Nigerian nursery and primary-school
 * voice. Every page that makes or implies factual claims about the school — staff
 * numbers, facilities, fees, term dates, age bands, curriculum affiliations, etc. —
 * keeps `awaitingConfirmation: true` so an amber draft notice is shown at the top.
 *
 * Landing pages whose copy is pure marketing (no facts that require school sign-off)
 * may use `awaitingConfirmation: false`. The default for anything else is true.
 *
 * Phase Two moves this registry into the `pages` / `page_sections` database tables
 * so the school edits it from /admin. Keep reads through `pageContent` so the swap
 * is a single-point change.
 */

import { schoolLocation } from "@/lib/site-config";

export type PageSection = {
  heading: string;
  body: string[];
  /** Optional simple list rendered under the body. */
  list?: string[];
};

export type PageContent = {
  title: string;
  eyebrow?: string;
  intro: string;
  sections: PageSection[];
  /** Shown as an amber notice: content awaiting school confirmation. */
  awaitingConfirmation?: boolean;
};

const CONFIRM =
  "Information on this page will be updated following confirmation from Honeytots School.";

export const pageContent: Record<string, PageContent> = {
  "/our-school": {
    title: "Our School",
    eyebrow: "Our School",
    intro:
      "Honeytots is a Nursery and Primary school where children are known as individuals, known by name, and supported to grow in confidence, kindness and curiosity.",
    sections: [
      {
        heading: "A caring school community",
        body: [
          "Our school brings together children, families and staff in a warm, orderly environment. Everything we do is designed around the wellbeing and progress of each child — small routines that help children feel secure, staff who listen, and classrooms where every child is encouraged to join in.",
          "Use the pages in this section to learn about our people, our values, our facilities and the way we keep children safe. The best way to know Honeytots, of course, is to come and see us.",
        ],
      },
      {
        heading: "Growing together",
        body: [
          "We believe children thrive when home and school work alongside each other. Parents and carers are welcome partners in school life, and we communicate regularly about what your child is learning, how they are getting on, and how you can support them at home.",
          "Whether your child is joining us in Creche or starting Primary 1, we want them to look forward to coming to school each day, and to leave us ready for the next stage of their journey.",
        ],
      },
    ],
  },
  "/our-school/welcome": {
    title: "Welcome",
    eyebrow: "Our School",
    intro: "A warm welcome from the Honeytots leadership team.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Welcome to Honeytots",
        body: [
          "Thank you for taking the time to learn about our school. Choosing where your child begins their education is one of the most important decisions a family makes, and we are glad you are considering Honeytots.",
          "We believe children learn best when they feel safe, valued and genuinely encouraged. Our staff know every child and work closely with families so that each child settles well, understands what is expected, and makes steady, happy progress.",
          "Our motto — Nurturing excellent leaders — describes what we hope for every child. We want them to leave Honeytots as confident young people who can learn, who can lead, and who treat others with kindness.",
          "We hope you will come and visit us. A school tour, a chance to meet staff and to see the children at work and play, will tell you more about Honeytots than any website can.",
          CONFIRM,
        ],
      },
      {
        heading: "What parents can expect",
        body: [
          "A school that responds to your messages and returns your calls promptly.",
          "Clear information about what your child is learning each term.",
          "Honest, respectful feedback about progress and next steps.",
          "A listening ear when you have a concern, and a clear route when you need to follow up.",
        ],
      },
    ],
  },
  "/our-school/about": {
    title: "About Honeytots",
    eyebrow: "Our School",
    intro: "Who we are and how our Nursery and Primary school works, day to day.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our school at a glance",
        body: [
          "Honeytots provides Creche, Playgroup, Nursery and Primary education in Nigeria, supporting children from their earliest years through to the end of Primary 6.",
          "Our classes are organised so that children learn alongside others at a similar stage, with staffing and routines suited to each age group. From the very first day in Creche through to graduation in Primary 6, our approach is consistent: high expectations, warm relationships, and calm, well-ordered classrooms.",
          CONFIRM,
        ],
        list: [
          "Creche, Playgroup and Nursery classes",
          "Primary 1 to Primary 6",
          "Staffing ratios and class sizes — awaiting school confirmation",
          "Session structure and daily routines — awaiting school confirmation",
        ],
      },
      {
        heading: "A day in the life",
        body: [
          "In our youngest classes, the day balances play, stories, songs, movement and rest, with gentle routines that help children feel secure. Snack time, mealtimes and outdoor play are all part of how we care for the whole child.",
          "As children move into Primary, lessons become more structured — still active, still varied, but with clear literacy and numeracy sessions each day alongside science, the arts, social studies and physical education. Break times are valued, and every child has someone they can talk to if something is troubling them.",
        ],
      },
    ],
  },
  "/our-school/vision-values": {
    title: "Vision, Mission & Values",
    eyebrow: "Our School",
    intro: "The principles that shape teaching, care and school life at Honeytots.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "What we stand for",
        body: [
          "Our values describe the kind of school community we try to be every day, and the character we hope our children grow into. The school's final vision and mission statements will be published here once confirmed by the leadership team.",
          CONFIRM,
        ],
      },
      {
        heading: "Our draft values",
        body: [
          "These values are the compass for how we teach, how we speak to one another, and how we make decisions. They are lived in classrooms and corridors, in assemblies, on the playground, and in the way staff, parents and children interact.",
        ],
        list: [
          "Kindness — we treat one another with respect and care",
          "Curiosity — we ask questions, explore and discover",
          "Confidence — we try things, and we try again when they are hard",
          "Diligence — we complete our work carefully and on time",
          "Community — we learn alongside our families, and we look out for one another",
          "Integrity — we do the right thing even when no one is watching",
        ],
      },
      {
        heading: "Our motto",
        body: [
          "Nurturing excellent leaders. It is a short sentence, but it carries a big ambition. We believe leadership is not only for prefects or head children. Every child can develop the qualities of a good leader: listening, taking responsibility, doing their best, and helping others to do their best too.",
        ],
      },
    ],
  },
  "/our-school/staff": {
    title: "Leadership & Staff",
    eyebrow: "Our School",
    intro: "The team who teach, care for and support our children.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our team",
        body: [
          "Staff profiles — photograph, name, role and a short biography — will be published here once supplied by the school.",
          "From Phase One onwards this page is designed to be managed from the school's admin area, so profiles, photographs and team members can be added, reordered and updated without a developer.",
        ],
      },
    ],
  },
  "/our-school/facilities": {
    title: "Our Facilities",
    eyebrow: "Our School",
    intro: "The spaces where our children learn, play and grow.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Learning spaces",
        body: [
          "The classrooms, play areas and specialist spaces at Honeytots are designed with young children in mind: bright, orderly, and set up so children can move between activities safely and with growing independence.",
          "Full descriptions, floor arrangements and photographs of each area will be published here once the school has confirmed the permanent site and any planned upgrades are complete.",
          CONFIRM,
        ],
      },
      {
        heading: "What families often ask us about",
        body: [
          "Because children spend a significant part of their week at school, parents naturally want to know about the space their child is in. The list below gives an idea of the types of facilities a school of Honeytots' size typically provides. The school will confirm which are available at the permanent site.",
        ],
        list: [
          "Bright, well-ventilated classrooms suited to each age group",
          "Safe, shaded outdoor play areas",
          "Age-appropriate equipment for Early Years and Primary",
          "Quiet spaces for reading and group work",
          "Areas for creative and practical work",
          "Washrooms and changing areas appropriate for younger children",
        ],
      },
      {
        heading: "Health and safety in our facilities",
        body: [
          "All areas used by children are kept clean, well maintained and checked regularly. Any works or changes that affect access or safety are communicated to parents in advance.",
        ],
      },
    ],
  },
  "/our-school/safeguarding": {
    title: "Safeguarding & Child Protection",
    eyebrow: "Our School",
    intro: "The safety and wellbeing of every child is our first responsibility.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our commitment",
        body: [
          "Honeytots is committed to providing a safe environment in which every child is protected from harm and treated with dignity. Safeguarding is the responsibility of every adult in the school community — leadership, teachers, support staff, volunteers and contractors.",
          "All staff receive safeguarding training, and safer-recruitment checks are completed for every adult who works regularly with children.",
        ],
      },
      {
        heading: "What we teach children about staying safe",
        body: [
          "From an early age, children learn about personal safety, appropriate touch, safe relationships and how to recognise when they need to tell a trusted adult something. Teaching is age-appropriate, calm and never frightening.",
          "As children grow older, we also teach them about staying safe online, about peer relationships, and about how to seek help from staff or from external agencies if they need it.",
        ],
      },
      {
        heading: "Raising a concern",
        body: [
          "If you have a concern about a child's safety or wellbeing — whether your own child or another — please contact the school office using the details on our contact page. We ask parents not to try to investigate a concern themselves; our designated safeguarding lead is trained to handle these situations properly and to involve families and the right agencies.",
          "All concerns are taken seriously, handled confidentially and followed up. You will be told what is happening at each stage, unless sharing information would itself place a child at greater risk.",
        ],
      },
      {
        heading: "Safeguarding information still to confirm",
        body: [
          "The school's designated safeguarding lead (and deputy), reporting routes, whistleblowing procedures and the full child protection policy will be published here once signed off in writing by Honeytots leadership.",
          "Until then, the Safeguarding & Child Protection policy card in the policies section is clearly marked as requiring final school approval.",
        ],
      },
    ],
  },
  "/our-school/policies": {
    title: "School Policies",
    eyebrow: "Our School",
    intro:
      "Policies that describe how the school is run, the standards we keep, and what families can expect from us.",
    sections: [
      {
        heading: "How policies are managed",
        body: [
          "School policies are reviewed, updated and approved on a regular cycle. Any policy that affects families is shared clearly, and any changes made during the academic year are communicated to parents before they take effect.",
          "The policy cards below list the nine core policies Honeytots will publish during Phase 1 preview. Each card clearly shows its current status and whether its wording has been signed off in writing by the school leadership.",
          "Full policy documents (PDFs) are uploaded to the policies folder once approved. Until a document is available, the cards show the description only.",
        ],
      },
    ],
  },

  "/learning": {
    title: "Learning at Honeytots",
    eyebrow: "Learning",
    intro:
      "Learning at Honeytots is designed to build strong foundations in literacy, numeracy and good character — while encouraging curiosity, creativity and confidence along the way.",
    sections: [
      {
        heading: "Learning that fits the child",
        body: [
          "Our youngest children in Early Years learn largely through play, conversation and hands-on discovery. Stories, songs, outdoor time and small-group activities help them develop language, early number skills, confidence and good social habits — all the building blocks they need for the years ahead.",
          "As children move into Primary, learning becomes more structured without losing its warmth. Lessons are planned so that children who need more support receive it early, and children ready for greater challenge are stretched appropriately. No child is rushed, and no child is left behind.",
        ],
      },
      {
        heading: "Good learning habits",
        body: [
          "The habits children form in their early school years shape the rest of their education. We place equal value on what they are learning and on how they are learning: listening carefully, asking questions, completing work neatly, checking for mistakes, trying again when something is hard, and helping classmates when they can.",
          "These are not slogans on a wall. They are the everyday expectations teachers model and reinforce in classrooms, corridors, assemblies and playgrounds.",
        ],
      },
    ],
  },
  "/learning/early-years": {
    title: "Early Years & Nursery",
    eyebrow: "Learning",
    intro: "Playful, purposeful early learning for our youngest children.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "How our youngest children learn",
        body: [
          "Early Years learning at Honeytots is built around play, talk, stories, songs and exploration, held together by gentle routines that help children feel secure. Teachers and assistants observe children closely and build on what each child already knows and can do.",
          "Our aim is for children to leave Early Years ready for Primary: confident, curious, able to work and play alongside others, and with strong early literacy and numeracy foundations in place.",
        ],
        list: [
          "Communication and language",
          "Early literacy and early numeracy",
          "Physical development — indoor and outdoor",
          "Social and emotional development",
          "Creativity, music and expression",
          "Health habits and independence skills",
          "Cultural awareness and Nigerian heritage",
          "School readiness",
        ],
      },
      {
        heading: "Creche, Playgroup and Nursery",
        body: [
          "Our Early Years classes are Creche, Playgroup and Nursery. The exact age bands and transitions between classes are confirmed by the school and will be published alongside the entry guide for prospective parents.",
          "Regardless of class, the approach is consistent: warm key-worker relationships with children, regular and clear communication with parents, and routines that feel predictable and reassuring for very young children.",
        ],
      },
      {
        heading: "Settling in",
        body: [
          "Starting school or moving up a class is a significant moment. We work with families individually to make transitions smooth: short visits at first, longer stays as the child is ready, and honest conversations about what each child needs. Some children settle quickly; others need more time. We do not rush this.",
        ],
      },
    ],
  },
  "/learning/primary": {
    title: "Primary School",
    eyebrow: "Learning",
    intro: "Primary 1 to Primary 6: building knowledge, skills and independence.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Primary 1 to Primary 6",
        body: [
          "In Primary, children build secure literacy and numeracy alongside science, technology, the arts, and social and citizenship learning. Every year group builds carefully on what came before so that learning makes sense and children can see their own progress.",
          "Teachers encourage children to work independently and collaboratively, to manage their time and equipment well, and to take growing responsibility for their own learning. Good organisation is taught, not assumed.",
        ],
        list: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
      },
      {
        heading: "English, Mathematics and Nigerian Languages",
        body: [
          "English and Mathematics receive dedicated time every day, because fluency in reading, writing and number opens every other subject. These are taught carefully, with frequent small checks so that gaps are identified early and addressed before they widen.",
          "Nigerian language teaching helps children connect with the heritage of their community and country, and builds pride and fluency alongside English.",
        ],
      },
      {
        heading: "End of Primary 6",
        body: [
          "The Primary 6 year supports children's transition into the next phase of their education, whatever that looks like for each family. Where children are preparing for common entrance or external examinations, planning begins well in advance and parents are kept closely informed.",
          CONFIRM,
        ],
      },
    ],
  },
  "/learning/curriculum": {
    title: "Curriculum",
    eyebrow: "Learning",
    intro: "How learning is organised across the school.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our curriculum framework",
        body: [
          "Honeytots follows a balanced curriculum that covers the subjects and areas of learning appropriate for a modern Nigerian Nursery and Primary school. Literacy, numeracy and good learning habits sit at the centre, with equal attention to the arts, sciences, languages, physical education and social learning.",
          "The specific curriculum model Honeytots adopts, any external affiliations, and the full term-by-term long-term plans are for the school leadership to confirm and publish. We do not describe a curriculum model the school has not yet signed off.",
          "The website is structured so that the school can add curriculum overviews, subject pages and termly plans without redevelopment work.",
        ],
      },
      {
        heading: "How a curriculum day is structured",
        body: [
          "Across both Early Years and Primary, the day is organised so that children can learn well: start calmly, take breaks when they need them, alternate between seated and more active learning, and end with a clear routine that helps them leave school ready to go home.",
          "The specific timings, weekly structure and subject allocations are confirmed with families by the school each term.",
          CONFIRM,
        ],
      },
    ],
  },
  "/learning/subjects": {
    title: "Subjects We Teach",
    eyebrow: "Learning",
    intro: "Subject areas across Nursery and Primary.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Subject areas",
        body: [
          "The list below shows subject areas commonly taught in Nigerian Nursery and Primary schools. Honeytots will confirm which of these are offered at each phase, and may add additional areas specific to the school's character and community.",
          CONFIRM,
        ],
        list: [
          "English Studies",
          "Mathematics",
          "Nigerian Language",
          "Basic Science & Technology",
          "Physical & Health Education",
          "Nigerian History",
          "Social & Citizenship Studies",
          "Cultural & Creative Arts",
          "Basic Digital Literacy",
          "Music",
          "Religious and National Values",
          "Agriculture / Home Economics",
        ],
      },
    ],
  },
  "/learning/assessment": {
    title: "Assessment",
    eyebrow: "Learning",
    intro: "How we follow and share each child's progress.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Following progress, not just measuring it",
        body: [
          "Teachers observe and assess children every day. These ongoing, low-stakes checks help them plan lessons that match what each child needs, and quickly notice when a child is struggling or ready for more challenge.",
          "In addition, each term, children's progress is shared with parents in writing and through a meeting. Reports describe what a child can do, what they have enjoyed, what has been hard, and the next steps we are planning with them.",
          "Details of continuous assessment schedule, any formal examinations, and reporting to parents are confirmed by the school each academic session.",
          CONFIRM,
        ],
      },
      {
        heading: "Assessment is for the child",
        body: [
          "We do not assess simply in order to rank or compare. Assessment exists to help each child learn, and to help parents understand how to support learning at home. Praise is for effort and improvement as well as for high attainment.",
        ],
      },
    ],
  },
  "/learning/digital-learning": {
    title: "ICT & Digital Learning",
    eyebrow: "Learning",
    intro: "Digital skills for today's Nigerian child.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Learning with technology",
        body: [
          "Children benefit from early, guided experience of digital tools. When used well, technology supports learning; it never replaces the teacher, the book, or the hand-written page.",
          "Alongside practical skills, we teach children about safe, responsible and kind use of digital spaces. Online safety is age-appropriate and revisited regularly, not taught once and forgotten.",
          "The school's ICT facilities and programme details are confirmed by the school before they are published in full.",
          CONFIRM,
        ],
      },
    ],
  },
  "/learning/enrichment": {
    title: "Enrichment & Activities",
    eyebrow: "Learning",
    intro: "Learning that continues beyond the classroom.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Clubs and activities",
        body: [
          "Clubs, activities and enrichment opportunities give children the chance to discover new interests, make friends across year groups, and develop talents beyond the classroom timetable.",
          "The specific clubs and activities, which year groups may join, and the days and timings are published each term once the school has confirmed staffing and arrangements.",
          CONFIRM,
        ],
      },
      {
        heading: "Visits, events and assemblies",
        body: [
          "Learning does not only happen at a desk. Planned visits, visitors to school, celebrations of Nigerian culture and heritage, and regular themed assemblies are part of how we broaden children's experience and make learning memorable.",
        ],
      },
    ],
  },
  "/learning/culture-values": {
    title: "Nigerian Culture & Values",
    eyebrow: "Learning",
    intro: "Heritage, language, citizenship and community.",
    sections: [
      {
        heading: "Rooted in Nigeria, ready for the world",
        body: [
          "Children learn about Nigerian history, languages, arts and community life, and about their responsibilities as citizens of their local community, their state and their country.",
          "We celebrate contemporary Nigeria as well as our heritage, and encourage respect for the many cultures, languages and traditions represented in our school community. No child is made to feel that their family background is less important than another's.",
        ],
      },
      {
        heading: "Living our values",
        body: [
          "Values are not only taught in assemblies and lessons. They are practiced through classroom jobs, caring for the school environment, listening to other people's points of view, resolving disagreements respectfully, and contributing to a school where everyone can belong.",
        ],
      },
    ],
  },

  "/admissions": {
    title: "Admissions",
    eyebrow: "Admissions",
    intro:
      "Choosing the right school is an important decision. This section brings together the information families need to learn about Honeytots, arrange a visit and understand the next steps.",
    sections: [
      {
        heading: "Your admissions journey",
        body: [
          "Every family's journey to Honeytots is slightly different, but the steps below are a good outline of what to expect from first contact through to your child starting with us.",
          "Nothing replaces a school visit. We strongly encourage you to come and see the school in session before making a final decision.",
        ],
        list: [
          "1. Explore Honeytots — read about our school, learning and life here",
          "2. Book a visit — meet the team, see the children, ask all your questions",
          "3. Check entry requirements — confirm the right class and documents needed",
          "4. Contact admissions — the team will guide you through the next steps",
        ],
      },
      {
        heading: "We are here to help",
        body: [
          "Applying for a school place can feel complicated. Our admissions team is there to answer your questions, to explain any part of the process that is unclear, and to make sure you have the information you need to make the right decision for your child.",
          "You do not need to have everything prepared before you get in touch. A conversation first is often the most helpful starting point.",
        ],
      },
    ],
  },
  "/admissions/how-to-apply": {
    title: "How to Apply",
    eyebrow: "Admissions",
    intro: "The steps to joining Honeytots, explained simply.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Applying to Honeytots",
        body: [
          "During Phase 1 preview, applications begin with an enquiry or a school visit. Our admissions team will then guide you through the school's process, tell you exactly what documents are required, and support you at each step.",
          "A full online application system will be added to this website in a later phase so families can complete the process online if they prefer.",
          CONFIRM,
        ],
      },
      {
        heading: "A simple, transparent process",
        body: [
          "We do our best to keep the process clear and honest. Families tell us what they value most: clear timelines, open communication, and no last-minute surprises. That is what we aim to deliver.",
          "If you are unsure about any of the steps on this page, send a message or call the school office — we would rather answer a question ten times than have a family hold back from applying.",
        ],
      },
      {
        heading: "After your application",
        body: [
          "Once an application is complete, the school will confirm next steps and expected timescales to you in writing. Where a child has been offered a place, you will receive information to help you prepare for their first day — uniform, school day timings, settling-in arrangements, and anything else you need to know.",
        ],
      },
    ],
  },
  "/admissions/entry-guide": {
    title: "Entry Classes & Age Guide",
    eyebrow: "Admissions",
    intro: "Finding the right class for your child.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Entry classes",
        body: [
          "Honeytots accepts children into Creche, Playgroup, Nursery and the Primary classes as places are available. The school determines the exact age bands for each class, and the dates by which children must be of a given age to enter in a particular academic session.",
          "Because readiness for school varies, we do not make placement decisions on age alone. If we think a child would benefit from an alternative placement, we discuss this with the family and agree what is in the child's best interests.",
          "Until the school publishes the final entry-age bands and session dates, please contact the admissions team for up-to-date guidance.",
          CONFIRM,
        ],
        list: [
          "Creche — details awaiting school confirmation",
          "Playgroup — details awaiting school confirmation",
          "Nursery — details awaiting school confirmation",
          "Primary 1 to Primary 6 — details awaiting school confirmation",
        ],
      },
    ],
  },
  "/admissions/requirements": {
    title: "Admission Requirements",
    eyebrow: "Admissions",
    intro: "What we will need from families.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Supporting documents and requirements",
        body: [
          "Admissions requirements vary slightly by class. The list below is typical of Nigerian Nursery and Primary schools and is a useful guide while Honeytots prepares its final, published schedule. Your application checklist will be confirmed to you in writing once you begin the process.",
          CONFIRM,
        ],
        list: [
          "Completed and signed admission form",
          "Recent passport photographs of the child",
          "Birth certificate or official age declaration",
          "Immunisation / health records",
          "Previous school reports (if applying from another school)",
          "Reference from previous head teacher (if required for Primary entry)",
          "Parent or guardian identification",
          "Proof of address (as required by the school)",
          "Any specific learning or medical needs information — shared confidentially and used to plan support",
        ],
      },
      {
        heading: "A note on sharing information with us",
        body: [
          "The more we know about your child before they start — their interests, friendships, any medical needs, things they find hard, things they love — the better we can care for them and plan for them. Families often worry about disclosing difficulties. Please tell us. We have heard many stories and we are here to help, not to judge.",
        ],
      },
    ],
  },
  "/admissions/fees": {
    title: "School Fees",
    eyebrow: "Admissions",
    intro: "Fee information for prospective and current families.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Current fees",
        body: [
          "Honeytots does not publish fee amounts on this website until they are confirmed in writing by the school leadership. This avoids families seeing figures that later change, and ensures every enquirer receives consistent, up-to-date information.",
          "For the most current fee schedule — including tuition, any deposits, and additional charges such as meals, transport, uniforms or learning materials — please contact the admissions team directly. They will confirm what is included, what is paid separately, and any payment plans or instalment options available to families.",
          "The website is built so that in future, if the school chooses, the fees page can present a full fee schedule, selected summaries, or continue to direct families to speak with admissions — whichever works best for the school community.",
        ],
      },
      {
        heading: "Financial questions you may have",
        body: [
          "Parents considering a school often want to know what is included, how billing works, and what happens if a child leaves mid-term. These details are part of the fee schedule the admissions team shares, and any questions are answered before a family accepts a place.",
        ],
      },
    ],
  },
  "/admissions/faqs": {
    title: "Frequently Asked Questions",
    eyebrow: "Admissions",
    intro: "Common questions parents and carers ask about applying to Honeytots.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Admissions questions",
        body: [
          "Below are answers to questions families often ask when considering Honeytots. They are written as general guidance for the Phase 1 preview and do not replace the final, signed-off process. When something depends on school confirmation, we say so clearly.",
          "If your question is not answered here, send a message or call the admissions team. We are glad to help.",
          CONFIRM,
        ],
      },
      {
        heading: "Is there a deadline for applications?",
        body: [
          "Applications are welcomed throughout the year, subject to available places. Starting early — well before you want your child to begin — usually gives families the most flexibility and the greatest chance of a place in the preferred class and term. The school will publish any specific deadlines for popular entry points once confirmed.",
        ],
      },
      {
        heading: "Do you accept mid-year transfers into Primary?",
        body: [
          "Yes, when there is a place available and when we believe the move is in the child's best interests. Transferring schools mid-year can be unsettling, so we take time to speak with families, review previous reports where available, and plan a thoughtful settling-in period.",
        ],
      },
      {
        heading: "What does a school visit include?",
        body: [
          "A visit typically includes a tour of the school at work, a chance to see classrooms and play areas, time with a member of the admissions or leadership team, and the opportunity to ask any questions you have. We try not to rush visits; please allow enough time for a proper conversation.",
        ],
      },
      {
        heading: "Do children have to wear uniform?",
        body: [
          "Yes, Honeytots has a school uniform. Details of items, sports kit, suppliers and what is mandatory versus optional will be published on the Uniform page once confirmed by the school. Many parents tell us that a simple, affordable uniform is one of the things they value most about a school.",
        ],
      },
      {
        heading: "Meals, snacks and allergies — how are these handled?",
        body: [
          "Information about meal and snack arrangements, and how the school supports children with allergies, dietary restrictions or other health needs, is published on the School Meals and Health & Wellbeing pages once the school has confirmed them in full.",
        ],
      },
      {
        heading: "What support is there for children who need extra help?",
        body: [
          "We work with families to understand each child's needs from the start. Where a child needs support — with learning, behaviour, English as an additional language, or a medical condition — we plan carefully and communicate clearly with parents. Where appropriate, we also work with external specialists recommended by the family or by the school.",
        ],
      },
      {
        heading: "How and when are parents told about progress?",
        body: [
          "Parents can expect regular communication: formal reports and scheduled meetings each term, plus informal contact whenever something is important. We prefer to raise concerns early and calmly, rather than waiting for a problem to grow.",
        ],
      },
      {
        heading: "What if we are not offered a place straight away?",
        body: [
          "When a class is full, children are placed on a waiting list and families are kept informed. Places sometimes become available later in the year, and we contact parents in the order the school confirms.",
        ],
      },
      {
        heading: "Do you operate a sibling priority policy?",
        body: [
          "Sibling policies and other priorities for entry will be confirmed by the school before any formal admissions cycle begins. Please ask the admissions team for the current position when you enquire.",
        ],
      },
      {
        heading: "We still have more questions — what should we do?",
        body: [
          "Send a message, pick up the phone, or book a visit. There is no such thing as a silly question when you are choosing a school for your child.",
        ],
      },
    ],
  },

  "/parents": {
    title: "Parent Information",
    eyebrow: "Parents",
    intro:
      "Practical, everyday information for Honeytots families — what you need, when you need it.",
    sections: [
      {
        heading: "Everything for the school day",
        body: [
          "This section brings together the information parents need most often: school times, term dates, uniform, meals, attendance, homework and wellbeing. If there is something you use regularly and you cannot find it here, please tell the school office so we can improve these pages.",
        ],
      },
      {
        heading: "A true partnership",
        body: [
          "Parents do not stop educating their child at the school gate. Neither do we pick it up only when they walk through the door. The most successful schools are the ones where home and school work alongside each other, communicate well, and are on the same side when things get difficult.",
          "We commit to honest, timely communication. In return, we ask parents to read the information we send, to keep contact details up to date, and to come to us early when a concern first arises rather than letting it grow.",
        ],
      },
    ],
  },
  "/parents/school-day": {
    title: "School Day",
    eyebrow: "Parents",
    intro: "Times, routines and everyday school information.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "A typical day",
        body: [
          "Families need clear, reliable information about when the school day starts and ends, when children should arrive, when they are collected, and what happens if someone else is picking them up. These details are important and we do not guess at them on the website.",
          "Arrival times, assembly, lesson blocks, break, lunch, closing times, and the arrangements for Early Years versus Primary will all be published here once confirmed by the school. Families joining before publication receive this information directly from the office.",
          CONFIRM,
        ],
      },
      {
        heading: "Arrivals and dismissals",
        body: [
          "Calm starts and calm finishes make a real difference to children's days. Our arrival and dismissal routines are designed so that children transition safely, with staff visible and able to answer questions from parents.",
          "For safeguarding reasons, we always confirm who is authorised to collect a child. Parents tell us any changes to collection arrangements in advance, and we follow them strictly.",
        ],
      },
      {
        heading: "Assemblies, breaks and after-school arrangements",
        body: [
          "Full details of assembly themes and schedules, break and lunch arrangements, and any after-school activities or wrap-around care options, will be confirmed by the school each term.",
        ],
      },
    ],
  },
  "/parents/term-dates": {
    title: "Term Dates",
    eyebrow: "Parents",
    intro: "Session dates, holidays and mid-term breaks for the academic year.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Academic session",
        body: [
          "Term dates for the current and following academic session will be published here once confirmed by the school leadership. Upcoming school events, exam periods and special days also appear on the school calendar.",
          "In the meantime, families can enquire with the school office directly for the most up-to-date dates before planning travel or making other commitments around the session.",
          CONFIRM,
        ],
      },
      {
        heading: "INSET days and closures",
        body: [
          "Staff training days and any planned closures are communicated to parents well in advance, so families can plan childcare if needed. These are also added to the calendar as soon as they are final.",
        ],
      },
    ],
  },
  "/parents/uniform": {
    title: "Uniform",
    eyebrow: "Parents",
    intro: "What children wear to school.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Uniform guidance",
        body: [
          "A simple, clearly defined uniform helps children focus on learning, removes many of the small comparisons that can cause friction, and gives families a predictable morning routine. Honeytots uniform items, sports and PE kit, and where uniform can be purchased will be published here once confirmed by the school.",
          "Where possible, the school aims to keep uniform affordable and to allow families reasonable flexibility on how and where items are sourced, within the clear guidelines issued.",
          CONFIRM,
        ],
      },
      {
        heading: "Hair, jewellery and personal appearance",
        body: [
          "Every school takes a view on hair styles, jewellery, nail products and personal items. Honeytots' guidelines will be written with simplicity, common sense and respect for cultural and religious needs, and will apply consistently across the school community.",
        ],
      },
      {
        heading: "Lost property",
        body: [
          "Please name every item of uniform and kit that comes into school with your child. Named items almost always find their way back. Unnamed items accumulate quickly and become difficult to return — particularly identical jumpers, water bottles and pairs of shoes.",
        ],
      },
    ],
  },
  "/parents/meals": {
    title: "School Meals",
    eyebrow: "Parents",
    intro: "Food, snacks and arrangements during the school day.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Meals and snacks",
        body: [
          "Nutritious meals and snacks help children learn well and keep their energy steady through the day. Honeytots will confirm its full meal and snack arrangements — including the offer for Early Years, Primary, and any packed-lunch guidance — before the next session begins.",
          CONFIRM,
        ],
      },
      {
        heading: "Dietary needs, allergies and faith requirements",
        body: [
          "All dietary needs — allergies, intolerances, medical diets, and religious or cultural food requirements — are taken seriously. Parents share these during admission and update the school office whenever there is a change. Staff are briefed, and plans are in place so that a child can eat safely every day.",
          "If your child has a specific need you are worried about, please raise it with the school before your child starts rather than assuming it will be covered.",
        ],
      },
      {
        heading: "Water and hydration",
        body: [
          "Children are encouraged to drink water throughout the day and have regular access to drinking water. Most families find a named, durable water bottle is the simplest way to make this work.",
        ],
      },
    ],
  },
  "/parents/attendance": {
    title: "Attendance & Punctuality",
    eyebrow: "Parents",
    intro: "Being in school, on time, every day — when a child is well enough to attend.",
    sections: [
      {
        heading: "Why attendance matters",
        body: [
          "Regular attendance helps children settle, build friendships and make steady progress. What looks like a small number of missed days each term adds up over the years to significant lost learning time. Children who attend well usually feel more confident in class.",
          "Arriving on time matters too. Children who walk in late miss the start-of-day routine, the first instructions of lessons and the settling-in time that makes the rest of the day calmer.",
        ],
      },
      {
        heading: "If your child cannot attend",
        body: [
          "Please tell the school office as early as possible on the first morning of absence, and explain briefly why your child is away. If we have not heard from you by mid-morning we will usually call to check — this is a safeguarding routine, not a criticism.",
          "When absence is prolonged or recurring, the school will work with you to find the best way to support your child and their learning.",
        ],
      },
      {
        heading: "Medical appointments and leave during term time",
        body: [
          "Wherever possible, routine medical appointments should be arranged outside the school day or during holidays. When this is not possible, please let the school know in advance so that staff can plan the day properly for your child.",
          "Requests for leave during term time are handled in line with the school's attendance policy. Please apply in writing rather than assuming leave will be granted.",
        ],
      },
    ],
  },
  "/parents/homework-reading": {
    title: "Homework & Reading",
    eyebrow: "Parents",
    intro: "Supporting learning at home without overwhelming family life.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Learning at home",
        body: [
          "Reading together at home is one of the most valuable things a family can do for a child. Even a few pages a day, shared regularly, builds vocabulary, imagination and the confidence that underpins every other subject.",
          "Homework expectations for each class — type, frequency and typical duration — will be confirmed by the school and communicated clearly to parents at the start of each year. Our approach is guided by a simple principle: homework should be purposeful, not simply done for its own sake, and it should not take over family evenings or weekends.",
          CONFIRM,
        ],
      },
      {
        heading: "How parents can help",
        body: [
          "Small, consistent support is more effective than occasional intense sessions. Reading together, showing interest in what your child learned that day, having a predictable place and time for homework, and praising effort as well as results all make a genuine difference.",
          "If homework repeatedly causes arguments, takes far too long, or you notice your child really struggling with it, please tell the class teacher. They may need to adjust what is being set, or may be able to suggest a different way to help at home.",
        ],
      },
    ],
  },
  "/parents/health-wellbeing": {
    title: "Health & Wellbeing",
    eyebrow: "Parents",
    intro: "Care for the whole child — physically, emotionally and socially.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Health in school",
        body: [
          "Arrangements for first aid, medication administration in school, handling illness during the day, isolation spaces and pastoral support for children having a difficult time will all be published here once confirmed by the school leadership.",
          "All staff have a responsibility for the wellbeing of every child, and any child who is unwell, hurt or upset is attended to promptly and parents contacted as appropriate.",
          CONFIRM,
        ],
      },
      {
        heading: "When a child is unhappy or anxious",
        body: [
          "Children sometimes have days, or weeks, when school is hard. New classes, new friendships, family changes at home, a small misunderstanding with a peer, or any number of other things can unsettle a child in ways that are hard to put into words.",
          "Please come and talk to us early. Most things are straightforward to address when they are caught soon, and they become harder when left. Staff will always take what you tell them seriously and respond with care.",
        ],
      },
      {
        heading: "Medicines in school",
        body: [
          "Families sometimes need us to give a child medication during the school day. A clear written policy covers this, and parents complete a consent form each time a medicine needs to be administered. Please do not send medicines into school with a child in their bag; hand them, with clear instructions, to the office.",
        ],
      },
    ],
  },

  "/contact": {
    title: "Contact Us",
    eyebrow: "Contact",
    intro:
      "Speak with the school office, send an enquiry, book a visit or find your way to Honeytots School.",
    sections: [
      {
        heading: "We are glad to hear from you",
        body: [
          "The school office is the right first point of contact for most questions. If someone else is better placed to help, we will pass your message on and confirm who is dealing with it and when you can expect a reply.",
          "For admission questions you are also welcome to email the admissions inbox directly — both routes are monitored and responded to during office hours.",
        ],
      },
      {
        heading: "What kind of enquiry do you have?",
        body: [
          "Being as specific as possible helps us route your message to the right person quickly. For example, if your message is about a uniform question, or a fee query, or a concern about a child's wellbeing, telling us that at the start helps us respond the first time.",
        ],
      },
    ],
  },
  "/contact/enquiry": {
    title: "Send an Enquiry",
    eyebrow: "Contact",
    intro: "Send a message to the Honeytots school office. We will respond during office hours.",
    sections: [
      {
        heading: "The enquiry form",
        body: [
          "Please complete the form below with as much detail as you are able to give. We read every message and respond to each one.",
          "If you would prefer to speak on the phone instead, you are welcome to call the school office during opening hours.",
        ],
      },
    ],
  },
  "/contact/find-us": {
    title: "Find Us",
    eyebrow: "Contact",
    intro: "Directions to Honeytots School.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Getting here",
        body: [
          "For website preview purposes we are working with the temporary address below. Honeytots School has not yet confirmed this as its permanent location, and the final site may differ. Please confirm any travel arrangements directly with the school office before attending a visit.",
          "Current working address (provisional): " + schoolLocation.address + ".",
          "The Contact Us page includes an embedded map preview and a Get Directions link using the provisional address. Once the permanent site is confirmed, the map and directions will be updated.",
          CONFIRM,
        ],
      },
      {
        heading: "Before you travel to a visit",
        body: [
          "If you are attending a booked visit, the school office will confirm the exact arrival instructions, where to park if driving, which entrance to use, and anything else you need to know in advance.",
          "Please do not arrive without an appointment if you wish to speak at length or tour the school. Unscheduled visits are difficult for us to accommodate properly, especially during the teaching day.",
        ],
      },
    ],
  },

  "/news": {
    title: "News & Events",
    eyebrow: "Parents",
    intro: "Updates and stories from across the school.",
    sections: [
      {
        heading: "No news articles yet",
        body: [
          "School news will appear here once published. News articles are database-driven and will be managed from the school's admin area by staff members who are trained and approved to publish.",
          "Photographs that include children are only published with the written consent of families, and children's full names are never used in gallery or news captions.",
        ],
      },
    ],
  },
  "/calendar": {
    title: "Calendar & Events",
    eyebrow: "Parents",
    intro: "Upcoming events and important dates for the school community.",
    sections: [
      {
        heading: "No events listed yet",
        body: [
          "Upcoming events will appear here once published by the school. Events are database-driven and will be managed from the school's admin area. Parents are also notified of key dates through direct communication before an event.",
        ],
      },
    ],
  },
  "/gallery": {
    title: "Gallery",
    eyebrow: "Our School",
    intro: "Life at Honeytots in pictures.",
    sections: [
      {
        heading: "No albums yet",
        body: [
          "Photo albums will appear here once the school's own photographs are uploaded. All images of children require written media consent from parents or guardians before publication.",
          "Children's full names are never published in gallery captions. Descriptions are limited to the activity, the year group or class where appropriate, and a short factual note of the event.",
        ],
      },
    ],
  },
  "/policies": {
    title: "Policies & Downloads",
    eyebrow: "Parents",
    intro:
      "School documents families may need to read, download or refer back to during the academic year.",
    sections: [
      {
        heading: "Core school policies",
        body: [
          "The cards below list Honeytots' nine core policies for Phase 1 preview. Each card shows the policy name, a short description, its current status, and whether the wording has been signed off in writing by the school leadership.",
          "Once a policy document is finalised, a PDF is uploaded to the policies folder and the Download policy button replaces the Document pending label.",
          "Safeguarding and Privacy are visibly marked throughout as requiring final school approval. The remaining policies also carry awaiting-confirmation status but do not require the additional amber school-approval banner.",
        ],
      },
      {
        heading: "Requesting a document in another format",
        body: [
          "If you need a school policy in an alternative format — larger type, accessible PDF, plain text or another arrangement — please contact the school office. We will do our best to accommodate reasonable requests.",
        ],
      },
    ],
  },

  "/privacy-policy": {
    title: "Privacy Policy",
    intro: "How Honeytots School handles personal information.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our approach",
        body: [
          "We collect only the information we need in order to run the school, respond to enquiries, arrange school visits and keep children safe. Information is stored securely, shared only with people who need it for the purpose they are doing their job, and kept no longer than is necessary.",
          "This website is built with the Nigeria Data Protection Act and good international practice in mind. The school's full privacy notice — detailing legal bases, retention periods, categories of data, families' rights of access, correction and deletion, and the contact details of any Data Protection Officer — will be published here once confirmed and signed off in writing by Honeytots leadership.",
          "Until the full notice is available, if you have a privacy concern please write to the school office and it will be forwarded to the correct person.",
        ],
      },
      {
        heading: "Information we collect through this website",
        body: [
          "Contact and visit request forms collect a parent or guardian's name, contact details and any message provided. We do not request or knowingly collect sensitive information about children through public-facing forms on this website.",
          "If analytics cookies are ever enabled, visitors are clearly asked for consent before data is collected, and the analytics service is configured to protect privacy where possible.",
        ],
      },
      {
        heading: "Information held by the school",
        body: [
          "The school holds additional personal information about enrolled children and their families as part of its normal operation — admissions records, health plans, attendance, reports and so on. The full privacy notice, once published, describes these categories, who within the school has access to them, and the families' rights in relation to them.",
        ],
      },
    ],
  },
  "/cookie-policy": {
    title: "Cookie Policy",
    intro: "How this website uses cookies and similar small items of stored data.",
    sections: [
      {
        heading: "Necessary and optional cookies",
        body: [
          "Necessary cookies keep the website working properly — for example, remembering that a visitor has closed a message or submitted a form response without duplication. Necessary cookies are always active and do not require consent.",
          "Optional analytics cookies collect anonymous aggregate information about which pages visitors find helpful, so we can improve the site over time. Analytics is disabled by default during Phase 1 preview, and when enabled will only begin collecting data after a visitor explicitly accepts it.",
          "At no point does this website use cookies or local storage for advertising purposes, or share visitor information with third-party advertising networks.",
        ],
      },
    ],
  },
  "/accessibility": {
    title: "Accessibility",
    intro: "Our commitment to a website everyone can use.",
    sections: [
      {
        heading: "How we build for accessibility",
        body: [
          "This website is built to WCAG 2.2 AA standards: keyboard-accessible navigation, visible focus styles on every interactive element, clear heading structure, programmatically labelled forms, the 24 colour-contrast pairs tested by the automated check suite, generous touch targets for fingers and styluses, and built-in support for reduced-motion operating-system settings.",
          "Colour-contrast verification is part of the standard project test suite and runs every time a change is proposed. If a new component or a new colour combination fails the AA thresholds, it is not merged.",
          "If you have difficulty using any part of this website, please contact the school office so we can assist you directly and improve the site for other users at the same time. We take accessibility feedback seriously and follow up on every report.",
        ],
      },
    ],
  },
  "/sitemap": {
    title: "Sitemap",
    intro: "Every page on the Honeytots School website.",
    sections: [],
  },
};
