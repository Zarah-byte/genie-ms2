import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const DEMO_DEFAULTS = {
  email: "demo@genie.local",
  password: "DemoFamily2026!",
  familyPin: "FAMILY-DEMO-2026",
  displayName: "Demo Family"
};

const DEMO_PEOPLE = [
  {
    full_name: "Mariam Noor",
    given_name: "Mariam",
    family_name: "Noor",
    birth_date: "1934-02-18",
    death_date: "2014-11-09",
    birth_place: "Natore, Rajshahi",
    notes:
      "Held family stories in handwritten notebooks and insisted every child learn at least one ancestral recipe."
  },
  {
    full_name: "Hakim Noor",
    given_name: "Hakim",
    family_name: "Noor",
    birth_date: "1931-09-03",
    death_date: "2008-05-22",
    birth_place: "Khulna",
    notes:
      "Kept migration papers wrapped in muslin cloth and retold the journey to each new grandchild."
  },
  {
    full_name: "Farida Noor",
    given_name: "Farida",
    family_name: "Noor",
    birth_date: "1958-04-14",
    birth_place: "Dhaka",
    notes:
      "A teacher who turned ordinary dinners into oral history nights, making sure names were pronounced correctly."
  },
  {
    full_name: "Rafiq Noor",
    given_name: "Rafiq",
    family_name: "Noor",
    birth_date: "1955-01-29",
    birth_place: "Jessore",
    notes:
      "Documented addresses and train routes after every move, leaving detailed maps in the family trunk."
  },
  {
    full_name: "Nadia Noor",
    given_name: "Nadia",
    family_name: "Noor",
    birth_date: "1961-07-07",
    birth_place: "Dhaka",
    notes:
      "Remembered wedding songs and the stories behind each verse, especially who started the harmonies."
  },
  {
    full_name: "Imran Chowdhury",
    given_name: "Imran",
    family_name: "Chowdhury",
    birth_date: "1960-03-25",
    birth_place: "Sylhet",
    notes:
      "Known for labeling photo envelopes by season and weather when exact dates were unknown."
  },
  {
    full_name: "Layla Chowdhury",
    given_name: "Layla",
    family_name: "Chowdhury",
    birth_date: "1986-10-03",
    birth_place: "Queens, New York",
    notes:
      "Started digitizing cassette tapes from elders and added captions for phrases younger cousins had never heard."
  },
  {
    full_name: "Arman Chowdhury",
    given_name: "Arman",
    family_name: "Chowdhury",
    birth_date: "1989-05-14",
    birth_place: "Brooklyn, New York",
    notes:
      "Recorded neighborhood details from memory walks so younger family members could trace former homes."
  },
  {
    full_name: "Saira Noor",
    given_name: "Saira",
    family_name: "Noor",
    birth_date: "1992-12-21",
    birth_place: "London",
    notes:
      "Collected recipe variations from different branches and preserved the small disagreements as part of the record."
  },
  {
    full_name: "Mina Chowdhury",
    given_name: "Mina",
    family_name: "Chowdhury",
    birth_date: "2014-06-12",
    birth_place: "Jersey City",
    notes:
      "Youngest storyteller in the archive, known for asking who every person is in old group photographs."
  }
];

const DEMO_RELATIONSHIPS = [
  { one: "Mariam Noor", two: "Hakim Noor", relationship_type: "partner" },
  { one: "Mariam Noor", two: "Farida Noor", relationship_type: "parent" },
  { one: "Hakim Noor", two: "Farida Noor", relationship_type: "parent" },
  { one: "Mariam Noor", two: "Nadia Noor", relationship_type: "parent" },
  { one: "Hakim Noor", two: "Nadia Noor", relationship_type: "parent" },
  { one: "Farida Noor", two: "Layla Chowdhury", relationship_type: "parent" },
  { one: "Rafiq Noor", two: "Layla Chowdhury", relationship_type: "parent" },
  { one: "Nadia Noor", two: "Arman Chowdhury", relationship_type: "parent" },
  { one: "Imran Chowdhury", two: "Arman Chowdhury", relationship_type: "parent" },
  { one: "Farida Noor", two: "Saira Noor", relationship_type: "parent" },
  { one: "Rafiq Noor", two: "Saira Noor", relationship_type: "parent" },
  { one: "Layla Chowdhury", two: "Mina Chowdhury", relationship_type: "parent" },
  { one: "Arman Chowdhury", two: "Mina Chowdhury", relationship_type: "parent" },
  { one: "Farida Noor", two: "Rafiq Noor", relationship_type: "partner" },
  { one: "Nadia Noor", two: "Imran Chowdhury", relationship_type: "partner" },
  { one: "Layla Chowdhury", two: "Arman Chowdhury", relationship_type: "partner" }
];

const DEMO_STORIES = [
  {
    title: "The brass trunk crossing two borders",
    excerpt:
      "Hakim carried one brass trunk through two border crossings, and the inventory list is still folded inside.",
    body:
      "The family remembers the trunk by its dented corner and the smell of camphor each time it was opened. Hakim tracked every stop in pencil, while Mariam tucked cloth packets of spice between legal documents so nothing felt purely bureaucratic. The trunk became a portable home record long before anyone called it an archive.",
    date_text: "1963 migration period",
    location: "Khulna -> Kolkata -> London",
    people: ["Hakim Noor", "Mariam Noor", "Farida Noor"],
    media_key: "migration-map"
  },
  {
    title: "Cardamom tea on exam nights",
    excerpt:
      "Mariam brewed cardamom tea for every exam season and wrote encouraging notes on the kettle lid.",
    body:
      "Farida says the tea was always slightly sweeter when someone was anxious. Mariam would place a tiny paper note on the kettle: 'Read carefully, breathe slowly.' Decades later, cousins still repeat those words before interviews, visa appointments, and hard phone calls.",
    date_text: "Late 1970s onward",
    location: "Dhaka and later Queens",
    people: ["Mariam Noor", "Farida Noor", "Saira Noor"]
  },
  {
    title: "The mango pickle argument that became a tradition",
    excerpt:
      "Three branches disagree on mustard oil quantity, and all three versions are now saved in the archive.",
    body:
      "At one summer gathering, Nadia and Farida argued over whether young mangoes needed less mustard oil. Instead of choosing one version, the family wrote down all variants with tasting notes. Mina now reads the annotations aloud and treats the disagreements as part of the recipe's history.",
    date_text: "Summer 1994",
    location: "Jackson Heights, New York",
    people: ["Nadia Noor", "Farida Noor", "Mina Chowdhury"],
    media_key: "recipe-card"
  },
  {
    title: "Porch photo with two unnamed cousins",
    excerpt:
      "A faded porch photo still has two unidentified children, and the uncertainty is kept visible on purpose.",
    body:
      "Arman scanned the porch photograph at high resolution and zoomed in on the school badge, hoping it would reveal a year. It narrowed the timeline but not the names. The archive keeps the question open so future relatives can add context instead of forcing certainty too early.",
    date_text: "Possibly 1978",
    location: "Brooklyn",
    people: ["Arman Chowdhury", "Layla Chowdhury", "Nadia Noor"],
    media_key: "porch-photo"
  },
  {
    title: "Wedding song passed by voice note",
    excerpt:
      "Nadia recorded the opening wedding verse in a voice note so cousins could relearn the melody.",
    body:
      "The family had written fragments of the lyrics but kept forgetting the tune. Nadia sent a voice note with pauses for pronunciation, and younger cousins layered in harmonies from different cities. The clip is now replayed before each wedding in the extended family.",
    date_text: "2019",
    location: "Queens / London call",
    people: ["Nadia Noor", "Saira Noor", "Layla Chowdhury"]
  },
  {
    title: "Letter from the port office",
    excerpt:
      "A short port-office letter confirmed safe arrival and became the first written trace of the move.",
    body:
      "The letter is brief: weather, cargo delay, and one line asking family to keep faith. Hakim folded it into his passport for years, then stored it in a recipe tin when the household papers grew too large. It remains one of the earliest dated items in the family record.",
    date_text: "March 1964",
    location: "Port of London",
    people: ["Hakim Noor", "Farida Noor"],
    media_key: "migration-map"
  },
  {
    title: "The apartment with a jasmine balcony",
    excerpt:
      "Layla remembers an apartment by the jasmine balcony and the bakery turn, but not the street number.",
    body:
      "Family memory preserved smell, color, and routine better than addresses. During a memory walk, Arman and Layla mapped landmarks from old bus routes and identified the likely block. The archive stores both certainty and uncertainty so future updates can stay honest.",
    date_text: "Early 1990s",
    location: "Woodside, Queens",
    people: ["Layla Chowdhury", "Arman Chowdhury", "Mina Chowdhury"]
  }
];

const DEMO_MEDIA = [
  {
    key: "migration-map",
    storage_path_suffix: "demo/migration-map-placeholder.jpg",
    alt_text: "Handwritten migration route map",
    caption: "A recreated route map based on Hakim's notes.",
    mime_type: "image/jpeg",
    people: ["Hakim Noor", "Farida Noor"]
  },
  {
    key: "recipe-card",
    storage_path_suffix: "demo/recipe-card-placeholder.jpg",
    alt_text: "Stained mango pickle recipe card",
    caption: "Recipe card with margin notes from three family branches.",
    mime_type: "image/jpeg",
    people: ["Mariam Noor", "Nadia Noor", "Mina Chowdhury"]
  },
  {
    key: "porch-photo",
    storage_path_suffix: "demo/porch-photo-placeholder.jpg",
    alt_text: "Faded porch photograph",
    caption: "Porch photo with two unidentified cousins.",
    mime_type: "image/jpeg",
    people: ["Layla Chowdhury", "Arman Chowdhury"]
  }
];

function requiredEnv(name, value) {
  if (value) return value;
  throw new Error(`Missing required environment variable: ${name}`);
}

function hashInviteCode(code, pepper) {
  return createHash("sha256")
    .update(`${code.trim().toUpperCase()}:${pepper ?? ""}`)
    .digest("hex");
}

function failIfError(error, context) {
  if (error) throw new Error(`${context}: ${error.message}`);
}

async function findUserByEmail(adminClient, email) {
  let page = 1;
  const perPage = 200;

  while (page <= 10) {
    const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage });
    failIfError(error, "Could not list auth users");
    const users = data?.users ?? [];
    if (!users.length) break;
    const match = users.find((user) => user.email?.toLowerCase() === email.toLowerCase());
    if (match) return match;
    page += 1;
  }

  return null;
}

async function upsertDemoPerson(client, archiveId, profileId, person) {
  const { data: existing, error: existingError } = await client
    .from("people")
    .select("id")
    .eq("archive_id", archiveId)
    .eq("full_name", person.full_name)
    .limit(1)
    .maybeSingle();
  failIfError(existingError, `Could not check person ${person.full_name}`);

  const payload = {
    archive_id: archiveId,
    created_by: profileId,
    full_name: person.full_name,
    given_name: person.given_name,
    family_name: person.family_name,
    birth_date: person.birth_date,
    death_date: person.death_date ?? null,
    birth_place: person.birth_place,
    notes: person.notes,
    image_url: null
  };

  if (existing?.id) {
    const { error: updateError } = await client.from("people").update(payload).eq("id", existing.id);
    failIfError(updateError, `Could not update person ${person.full_name}`);
    return existing.id;
  }

  const { data: inserted, error: insertError } = await client
    .from("people")
    .insert(payload)
    .select("id")
    .single();
  failIfError(insertError, `Could not insert person ${person.full_name}`);
  return inserted.id;
}

async function relationshipExists(client, archiveId, relationshipType, oneId, twoId) {
  if (relationshipType === "partner") {
    const { data, error } = await client
      .from("relationships")
      .select("id")
      .eq("archive_id", archiveId)
      .eq("relationship_type", relationshipType)
      .or(
        `and(person_one_id.eq.${oneId},person_two_id.eq.${twoId}),and(person_one_id.eq.${twoId},person_two_id.eq.${oneId})`
      )
      .limit(1);
    failIfError(error, "Could not query partner relationship");
    return Boolean(data?.length);
  }

  const { data, error } = await client
    .from("relationships")
    .select("id")
    .eq("archive_id", archiveId)
    .eq("relationship_type", relationshipType)
    .eq("person_one_id", oneId)
    .eq("person_two_id", twoId)
    .limit(1);
  failIfError(error, "Could not query relationship");
  return Boolean(data?.length);
}

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const invitePepper = process.env.INVITE_CODE_PEPPER ?? "";

  requiredEnv("SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL", supabaseUrl);
  requiredEnv("SUPABASE_SERVICE_ROLE_KEY", serviceRoleKey);

  const demoEmail = process.env.DEMO_ARCHIVE_EMAIL ?? DEMO_DEFAULTS.email;
  const demoPassword = process.env.DEMO_ARCHIVE_PASSWORD ?? DEMO_DEFAULTS.password;
  const demoPin = process.env.DEMO_ARCHIVE_PIN ?? DEMO_DEFAULTS.familyPin;
  const demoDisplayName = process.env.DEMO_ARCHIVE_DISPLAY_NAME ?? DEMO_DEFAULTS.displayName;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  console.log("Seeding demo archive data...");

  const existingUser = await findUserByEmail(supabase, demoEmail);
  let userId = existingUser?.id;

  if (existingUser) {
    const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: demoPassword,
      email_confirm: true,
      user_metadata: { full_name: demoDisplayName }
    });
    failIfError(error, "Could not update demo auth user");
    console.log(`Reused existing auth user: ${demoEmail}`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: { full_name: demoDisplayName }
    });
    failIfError(error, "Could not create demo auth user");
    userId = data.user?.id;
    console.log(`Created auth user: ${demoEmail}`);
  }

  if (!userId) throw new Error("Could not resolve demo auth user id");

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    full_name: demoDisplayName,
    updated_at: new Date().toISOString()
  });
  failIfError(profileError, "Could not upsert demo profile");

  const archiveDescription = "Demo archive for presentations and critiques. Family PIN: FAMILY-DEMO-2026";
  const { data: existingArchive, error: archiveLookupError } = await supabase
    .from("family_archives")
    .select("id")
    .eq("owner_id", userId)
    .limit(1)
    .maybeSingle();
  failIfError(archiveLookupError, "Could not check family archive");

  let archiveId = existingArchive?.id;
  if (archiveId) {
    const { error: archiveUpdateError } = await supabase
      .from("family_archives")
      .update({
        name: "Genie Demo Archive",
        description: archiveDescription,
        updated_at: new Date().toISOString()
      })
      .eq("id", archiveId);
    failIfError(archiveUpdateError, "Could not update family archive");
  } else {
    const { data: insertedArchive, error: archiveInsertError } = await supabase
      .from("family_archives")
      .insert({
        name: "Genie Demo Archive",
        owner_id: userId,
        description: archiveDescription
      })
      .select("id")
      .single();
    failIfError(archiveInsertError, "Could not create family archive");
    archiveId = insertedArchive.id;
  }

  if (!archiveId) throw new Error("Could not resolve demo archive id");

  const { error: memberError } = await supabase.from("archive_members").upsert(
    {
      archive_id: archiveId,
      profile_id: userId,
      role: "owner"
    },
    { onConflict: "archive_id,profile_id" }
  );
  failIfError(memberError, "Could not upsert archive owner membership");

  const pinHash = hashInviteCode(demoPin, invitePepper);
  const { data: existingPin, error: existingPinError } = await supabase
    .from("archive_invite_codes")
    .select("id,archive_id")
    .eq("code_hash", pinHash)
    .limit(1)
    .maybeSingle();
  failIfError(existingPinError, "Could not check invite PIN");

  let activePinId = existingPin?.id;
  if (existingPin && existingPin.archive_id !== archiveId) {
    throw new Error("The demo PIN already exists for a different archive. Set a unique DEMO_ARCHIVE_PIN.");
  }

  if (!activePinId) {
    const { data: insertedPin, error: pinInsertError } = await supabase
      .from("archive_invite_codes")
      .insert({
        archive_id: archiveId,
        created_by: userId,
        code_hash: pinHash,
        code_preview: demoPin.slice(-4).toUpperCase(),
        revoked_at: null
      })
      .select("id")
      .single();
    failIfError(pinInsertError, "Could not create invite PIN");
    activePinId = insertedPin.id;
  } else {
    const { error: pinUpdateError } = await supabase
      .from("archive_invite_codes")
      .update({
        created_by: userId,
        code_preview: demoPin.slice(-4).toUpperCase(),
        revoked_at: null,
        updated_at: new Date().toISOString()
      })
      .eq("id", activePinId);
    failIfError(pinUpdateError, "Could not refresh invite PIN");
  }

  const { error: revokeError } = await supabase
    .from("archive_invite_codes")
    .update({ revoked_at: new Date().toISOString() })
    .eq("archive_id", archiveId)
    .neq("id", activePinId)
    .is("revoked_at", null);
  failIfError(revokeError, "Could not revoke previous invite PINs");

  const personIdsByName = new Map();
  for (const person of DEMO_PEOPLE) {
    const personId = await upsertDemoPerson(supabase, archiveId, userId, person);
    personIdsByName.set(person.full_name, personId);
  }

  for (const relationship of DEMO_RELATIONSHIPS) {
    const oneId = personIdsByName.get(relationship.one);
    const twoId = personIdsByName.get(relationship.two);
    if (!oneId || !twoId) {
      throw new Error(`Missing people for relationship: ${relationship.one} -> ${relationship.two}`);
    }

    const exists = await relationshipExists(
      supabase,
      archiveId,
      relationship.relationship_type,
      oneId,
      twoId
    );

    if (!exists) {
      const { error } = await supabase.from("relationships").insert({
        archive_id: archiveId,
        created_by: userId,
        person_one_id: oneId,
        person_two_id: twoId,
        relationship_type: relationship.relationship_type
      });
      failIfError(
        error,
        `Could not create relationship ${relationship.relationship_type}: ${relationship.one} -> ${relationship.two}`
      );
    }
  }

  const mediaIdsByKey = new Map();
  for (const media of DEMO_MEDIA) {
    const { data, error } = await supabase
      .from("media_assets")
      .upsert(
        {
          archive_id: archiveId,
          uploaded_by: userId,
          storage_path: `${archiveId}/${media.storage_path_suffix}`,
          alt_text: media.alt_text,
          caption: media.caption,
          mime_type: media.mime_type
        },
        { onConflict: "storage_path" }
      )
      .select("id")
      .single();
    failIfError(error, `Could not upsert media asset ${media.key}`);
    mediaIdsByKey.set(media.key, data.id);

    for (const personName of media.people) {
      const personId = personIdsByName.get(personName);
      if (!personId) continue;
      const { error: personMediaError } = await supabase.from("person_media").upsert(
        {
          archive_id: archiveId,
          person_id: personId,
          media_asset_id: data.id
        },
        { onConflict: "person_id,media_asset_id" }
      );
      failIfError(personMediaError, `Could not attach media ${media.key} to person ${personName}`);
    }
  }

  for (const story of DEMO_STORIES) {
    const { data: existingStory, error: existingStoryError } = await supabase
      .from("stories")
      .select("id")
      .eq("archive_id", archiveId)
      .eq("title", story.title)
      .limit(1)
      .maybeSingle();
    failIfError(existingStoryError, `Could not check story ${story.title}`);

    const payload = {
      archive_id: archiveId,
      created_by: userId,
      title: story.title,
      excerpt: story.excerpt,
      body: story.body,
      date_text: story.date_text,
      location: story.location,
      image_url: null
    };

    let storyId = existingStory?.id;
    if (storyId) {
      const { error: updateError } = await supabase.from("stories").update(payload).eq("id", storyId);
      failIfError(updateError, `Could not update story ${story.title}`);
    } else {
      const { data: insertedStory, error: insertError } = await supabase
        .from("stories")
        .insert(payload)
        .select("id")
        .single();
      failIfError(insertError, `Could not insert story ${story.title}`);
      storyId = insertedStory.id;
    }

    for (const personName of story.people) {
      const personId = personIdsByName.get(personName);
      if (!personId) continue;
      const { error: storyPeopleError } = await supabase.from("story_people").upsert(
        {
          archive_id: archiveId,
          story_id: storyId,
          person_id: personId
        },
        { onConflict: "story_id,person_id" }
      );
      failIfError(storyPeopleError, `Could not attach story ${story.title} to ${personName}`);
    }

    if (story.media_key) {
      const mediaId = mediaIdsByKey.get(story.media_key);
      if (mediaId) {
        const { error: storyMediaError } = await supabase.from("story_media").upsert(
          {
            archive_id: archiveId,
            story_id: storyId,
            media_asset_id: mediaId
          },
          { onConflict: "story_id,media_asset_id" }
        );
        failIfError(storyMediaError, `Could not attach media ${story.media_key} to story ${story.title}`);
      }
    }
  }

  console.log("Demo seed complete.");
  console.log(`- Login email: ${demoEmail}`);
  console.log(`- Login password: ${demoPassword}`);
  console.log(`- Family PIN: ${demoPin}`);
  console.log(`- Archive id: ${archiveId}`);
  console.log(`- People: ${DEMO_PEOPLE.length}`);
  console.log(`- Relationships: ${DEMO_RELATIONSHIPS.length}`);
  console.log(`- Stories: ${DEMO_STORIES.length}`);
  console.log(`- Media placeholders: ${DEMO_MEDIA.length}`);
}

main().catch((error) => {
  console.error("Demo seed failed.");
  console.error(error.message);
  process.exit(1);
});
