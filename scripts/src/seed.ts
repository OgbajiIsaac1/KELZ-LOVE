import { db, blogPostsTable, siteContentTable } from "@workspace/db";

async function seed() {
  console.log("Seeding database...");

  // Blog posts
  const existingPosts = await db.select().from(blogPostsTable).limit(1);
  if (existingPosts.length === 0) {
    const now = new Date();
    await db.insert(blogPostsTable).values([
      {
        title: "Why Nigerian Students Struggle to Read — And What We Can Do About It",
        excerpt: "Reading is not a natural skill. It is taught. And when the teaching system fails, the child fails too. Here's what I have learned from six years in the classroom.",
        content: `Reading is not a natural skill. It is taught. And when the teaching system fails, the child fails too.

## The Root of the Problem

In over six years working directly with students across Nigeria — from primary schools to university preparatory programs — I have seen the same pattern repeat itself with heartbreaking consistency: children who are bright, curious, and capable, but who cannot read well enough to unlock their own intelligence.

The question we must ask is not "Why can't this child read?" but "What has this child been taught — and how?"

## What the Research Tells Us

Phonemic awareness, phonics, fluency, vocabulary, and comprehension — these are the five pillars of reading instruction identified by the National Reading Panel. Most Nigerian classrooms focus on the last pillar alone, skipping the foundational work entirely.

When a child is asked to "read" without being taught to decode sounds, they memorize shapes of words. This works for the first 200 or so high-frequency words. Then the system collapses.

## What Actually Works

- Explicit phonics instruction, particularly for students who are not native English speakers
- Daily read-aloud sessions where teachers model fluent reading
- Structured independent reading time with books matched to the student's actual level
- Vocabulary instruction that is contextual, not just list-memorization

## What Schools Can Do Tomorrow

The shift does not require a budget. It requires a decision. Every school can begin with 30 minutes of structured reading instruction per day. Every teacher can be coached to ask better comprehension questions. Every classroom can have a reading corner.

The children are ready. The question is whether the adults around them are.`,
        category: "Literacy",
        tag: "Featured",
        readTime: "6 min read",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        published: true,
        publishedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        title: "The Teacher Who Doesn't Have a Niche is Invisible",
        excerpt: "In a world overflowing with content and credentials, generalists disappear. Here's how to find your professional identity as an educator and build authority that actually opens doors.",
        content: `In a world overflowing with content and credentials, generalists disappear.

## Why Specialization Matters More Than Ever

Every year, thousands of qualified, hardworking teachers enter the Nigerian education market. They have degrees, they have passion, and many of them are excellent in the classroom. But when it comes to building a career that grows — securing consulting contracts, speaking engagements, curriculum development roles, or online income — most of them struggle.

The reason is almost always the same: they have not defined what they are the best at.

## What a Teaching Niche Actually Is

A niche is not a limitation. It is a claim. It says: "I am the person you call when you need X."

For me, it is literacy development, reading instruction, and academic mentoring for students who are falling behind or preparing to leap ahead. That clarity has opened doors that ten years of generalist experience never would.

## How to Find Yours

### Step 1: Map Your Strengths
Ask yourself honestly: which part of teaching gives you energy rather than draining it?

### Step 2: Identify the Gap
Where do students or schools around you consistently struggle? Your niche lives at the intersection of your strength and a real need.

### Step 3: Test Before You Commit
Offer your specialized service to three people — for free if necessary. See what happens. See how it feels. Refine from there.

### Step 4: Name It Clearly
"I help secondary school students in Nigeria improve their reading speed and comprehension before WAEC." That is a niche. "I am a teacher who loves education" is not.

## The Result

When you have a niche, people send you referrals. They remember you. They recommend you. They come back.

That is the difference between a career that survives and one that thrives.`,
        category: "Teaching",
        tag: "Popular",
        readTime: "7 min read",
        imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
        published: true,
        publishedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Building a School Reading Culture: A Principal's Guide",
        excerpt: "Culture is not built through assemblies or notices. It is built through daily habits, visible systems, and adults who model what they preach. Here is how to build a reading culture that lasts.",
        content: `Culture is not built through assemblies or notices. It is built through daily habits, visible systems, and adults who model what they preach.

## What a Reading Culture Is (and What It Isn't)

A reading culture is not a library. It is not a "Book Week." It is not a reading challenge that runs for one month and is then forgotten.

A reading culture is a school environment where reading is visible, valued, and happening — every day, in every classroom, without anyone having to be reminded.

## The Three Pillars

### 1. Access
Students cannot read books they do not have access to. The first step is ensuring there are books — at every reading level, in every classroom, not locked in a cabinet.

### 2. Time
Protected reading time must be non-negotiable. Twenty minutes every morning before instruction begins. It sounds small. Over a school year, it amounts to over 60 hours of reading per student.

### 3. Modeling
When students see their teachers reading — genuinely reading, not supervising — something shifts. Adults who read raise readers.

## Implementation Steps

- Audit your current library and classroom resources
- Establish a daily silent reading routine (start with 10 minutes if 20 feels ambitious)
- Create a system for tracking and celebrating student reading milestones
- Train teachers in reading-aloud techniques that build comprehension and love of story
- Invite parents into the culture through literacy evenings and home reading programs

## Measuring Success

After one term: survey students about their relationship with reading. After one year: compare reading assessment scores. After three years: look at your exam results, your student confidence, your school reputation.

Culture takes time. Start today anyway.`,
        category: "Schools",
        tag: "Leadership",
        readTime: "8 min read",
        imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
        published: true,
        publishedAt: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Dear Student: You Are Not Bad at School. The System Just Hasn't Met You Yet.",
        excerpt: "A letter to the student who has been told — directly or indirectly — that they are not smart enough, not fast enough, not capable enough. This is for you.",
        content: `Dear Student,

I want you to read this carefully, because what I am about to say is not a motivational slogan. It is something I have watched become true, again and again, in real classrooms with real students who were told — directly or indirectly — that they were not enough.

## You Are Not the Problem

When a student struggles in school, the first assumption is almost always that the student is at fault. Slow learner. Lazy. Unfocused. Distracted. Not intelligent.

These labels follow children through their academic lives. They internalize them. They stop trying. And the adults around them call that confirmation.

But what I have seen — in six years of working with hundreds of students — is something different.

Most students who struggle academically have simply not been taught in a way that makes sense to them. The system failed to find them. That is not the same as being unfindable.

## What I Have Witnessed

I have watched a 16-year-old who "hated reading" become a confident reader within three months — because someone finally explained phonics in a way that clicked.

I have watched a student who failed English three times pass with a B2 — because someone took the time to understand how she thought, not just what she answered.

I have watched confidence transform academic performance, not the other way around.

## What You Should Know

- Intelligence is not fixed. It grows with the right input.
- Reading difficulty is almost never about ability. It is almost always about instruction.
- The right teacher, at the right time, with the right approach, changes everything.
- You are not a lost cause. You are an unlocked potential.

## What You Can Do

Find one thing you are genuinely curious about. Read about that thing — even if it is just three pages. Talk to someone who believes in your capacity, not just your performance.

And if you need support — reach out. That is not weakness. That is intelligence.

With genuine belief in you,
Melvina Igboanugo`,
        category: "Students",
        tag: "Story",
        readTime: "5 min read",
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
        published: true,
        publishedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: "What No One Tells You About Educational Leadership in Nigeria",
        excerpt: "Leadership in education is not about authority. It is about standing in the gap — between what is and what should be — and refusing to move until the gap closes.",
        content: `Leadership in education is not about authority. It is about standing in the gap — between what is and what should be — and refusing to move until the gap closes.

## The Gap Nobody Talks About

There is a version of educational leadership that looks good on paper — the titles, the frameworks, the conferences, the reports. And then there is the version that actually changes outcomes for children.

In Nigeria, the gap between these two versions is enormous. And most of it comes down to what happens at the school and classroom level, far from the policy papers.

## What Real Educational Leadership Requires

### Vision Without Resources
You will often be asked to do transformational work with insufficient funds, infrastructure, and personnel. The question is not "How do I wait for better conditions?" The question is "What can I do with exactly what I have?"

### Relationship Before Program
The schools I have seen achieve genuine literacy improvement did not start with a new program. They started with trust. With teachers who felt seen and supported. With students who felt safe enough to try and fail and try again.

### Patience as a Leadership Skill
Results in education do not come in quarters. They come in years. The ability to maintain momentum and morale when outcomes are not yet visible is one of the most underrated leadership skills in our sector.

## What I Have Learned

After years of working inside schools — not just consulting from outside them — I have come to believe that the most important thing an education leader can do is model the mindset they want to see.

Read in front of your staff. Learn publicly. Admit mistakes. Celebrate progress, however small.

Leadership is not about having the answers. It is about making the pursuit of answers feel safe and worthwhile.`,
        category: "Leadership",
        tag: "Resources",
        readTime: "9 min read",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
        published: true,
        publishedAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log("✅ Blog posts seeded");
  } else {
    console.log("⏭️  Blog posts already exist, skipping");
  }

  // Site content
  const existingContent = await db.select().from(siteContentTable).limit(1);
  if (existingContent.length === 0) {
    await db.insert(siteContentTable).values([
      { key: "hero_headline", value: "Raising Readers. Building Thinkers. Transforming Education." },
      { key: "hero_subtext", value: "I help students discover the power of reading, educators find their professional identity, and schools build cultures of learning that last. This is not just teaching. This is transformation." },
      { key: "about_headline", value: "More Than Teaching. Building Systems That Shape Lives." },
      { key: "about_bio", value: "I am Melvina Igboanugo — an education enthusiast, literacy specialist, and academic mentor based in Nigeria. Over the past six years, I have worked directly with students, teachers, and school systems to improve how reading and learning happen at every level. My work lives at the intersection of compassion and rigour: I believe every student can learn, and I build the environments and systems that make that belief real." },
      { key: "about_vision", value: "A Nigeria where every student has access to quality literacy education and the confidence to use it — regardless of their background, learning style, or starting point." },
      { key: "about_mission", value: "To equip students with reading skills that unlock academic potential, train educators to teach with clarity and purpose, and help schools build reading cultures that change outcomes at scale." },
      { key: "contact_headline", value: "Let's Work Together" },
      { key: "contact_subtext", value: "Whether you are a student ready to level up, a teacher building your professional identity, or a school leader who wants sustainable change — I am here to help. Let's talk." },
    ]);
    console.log("✅ Site content seeded");
  } else {
    console.log("⏭️  Site content already exists, skipping");
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
