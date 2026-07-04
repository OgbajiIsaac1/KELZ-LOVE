import { db, siteContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const defaults: Record<string, string> = {
  hero_badge: "The Education Enthusiast",
  hero_headline_1: "Raising Readers. Building Thinkers.",
  hero_headline_2: "Transforming Education.",
  hero_subtitle:
    "I help students, educators, and schools build strong literacy, clear expression, and systems that produce real learning outcomes.",
  hero_cta_book: "Book a Session",
  hero_cta_community: "Join Learning Community",
  stat_students: "500+",
  stat_students_label: "Students Mentored",
  stat_schools: "30+",
  stat_schools_label: "Schools Supported",
  stat_years: "6+",
  stat_years_label: "Years Experience",
  section_whatido_badge: "What I Do",
  section_whatido_title: "Empowering Every Corner of Education",
  section_whatido_desc:
    "Empowering the entire educational ecosystem through targeted interventions and strategic support.",
  card_student_title: "Student Development",
  card_student_desc:
    "Helping learners become confident readers, writers, and thinkers.",
  card_educator_title: "Educator Growth",
  card_educator_desc:
    "Supporting teachers to build strong niches and impactful careers.",
  card_school_title: "School Support",
  card_school_desc:
    "Partnering with schools to improve curriculum delivery and outcomes.",

  about_hero_badge: "Meet Melvina",
  about_hero_headline_1: "More Than Teaching.",
  about_hero_headline_2: "Building Systems That Shape Lives.",
  about_bio:
    '<p>An accomplished educator, communication coach, learning strategist, and school leader dedicated to transforming education through literacy, effective communication, and student-centered learning. With over nine years of experience in teaching, curriculum development, educational leadership, and youth development, I have built a reputation for helping students achieve academic excellence while equipping educators with practical strategies for professional growth.</p><p>Currently serving as the Director of Studies at Roseville Secondary School, Enugu, I lead academic initiatives focused on raising learning outcomes, strengthening instructional quality, and fostering a culture of excellence among both students and teachers. My work combines strong literacy foundations, structured thinking, and innovative teaching methodologies that prepare learners for success in an increasingly dynamic world.</p><p>I gained national recognition as the Enugu State Champion of the Maltina Teacher of the Year Award 2023 and emerged among Nigeria\'s Top 10 teachers nationwide — an achievement that reflects my commitment to impactful teaching. I am also a Global School Advocate, TRCN-certified educator, writer, and curriculum developer with additional professional training from Harvard Business School Online and Lagos Business School.</p><p>A passionate advocate for communication and leadership development, I have trained students, educators, and young professionals in public speaking, leadership, career growth, confidence building, and effective communication. Whether mentoring students, coaching educators, judging communication competitions, or consulting for schools, my mission remains clear: to help people find their voice, unlock their potential, and achieve excellence through education.</p>',
  about_badges:
    "Maltina Teacher of the Year 2023, Nigeria Top 10 Teacher, Director of Studies, TRCN Certified, Harvard Business School Online, Global School Advocate",
  about_vision_badge: "Vision",
  about_vision_title: "Our Vision",
  about_vision_text:
    "To cultivate a generation of confident readers, articulate thinkers, and empowered educators who transform their communities and shape the future of global education.",
  about_vision_quote:
    '"Every student can excel when given the right structure, and every educator can thrive when given the right support."',
  about_mission_badge: "Mission",
  about_mission_title: "Our Mission",
  about_mission_text:
    "To provide targeted interventions, strategic mentorship, and systemic support that equip learners, teachers, and institutions with the tools they need to achieve academic and professional excellence.",
  about_values_badge: "Our Core Values",
  about_values_title: "Principles That Guide Us",
  about_values_desc:
    "The principles that guide every session, every workshop, and every partnership.",
};

export async function seedSiteContent() {
  console.log("Seeding site content...");

  let created = 0;
  let skipped = 0;

  for (const [key, value] of Object.entries(defaults)) {
    const existing = await db
      .select()
      .from(siteContentTable)
      .where(eq(siteContentTable.key, key));

    if (existing.length === 0) {
      await db.insert(siteContentTable).values({ key, value });
      created++;
    } else {
      skipped++;
    }
  }

  console.log(`Done. Created ${created}, skipped ${skipped} existing entries.`);
}
