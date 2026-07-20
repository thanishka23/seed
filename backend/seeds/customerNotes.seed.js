import CustomerNote from "../models/CustomerNote.js";

const notes = [
  { customerEmail: "arjun.mehta@gmail.com", authorRole: "Sales Representative", type: "Call", content: "Customer requested a product demonstration next Tuesday." },
  { customerEmail: "priya.nair@gmail.com", authorRole: "Manager", type: "Meeting", content: "Met with customer regarding enterprise pricing plans." },
  { customerEmail: "rahul.verma@gmail.com", authorRole: "Sales Representative", type: "Email", content: "Quotation sent via email. Awaiting confirmation." },
  { customerEmail: "sneha.reddy@gmail.com", authorRole: "Sales Representative", type: "Call", content: "Discussed product customization requirements." },
  { customerEmail: "karan.shah@gmail.com", authorRole: "Manager", type: "Meeting", content: "Customer is interested in annual maintenance contract." },
  { customerEmail: "anjali.gupta@gmail.com", authorRole: "Sales Representative", type: "Email", content: "Follow-up email sent after demo session." },
  { customerEmail: "vivek.rao@gmail.com", authorRole: "Sales Representative", type: "Note", content: "Customer prefers communication through email." },
  { customerEmail: "pooja.sharma@gmail.com", authorRole: "Manager", type: "Meeting", content: "Negotiation completed. Waiting for purchase approval." },
  { customerEmail: "nikhil.patel@gmail.com", authorRole: "Sales Representative", type: "Call", content: "Customer asked about implementation timeline." },
  { customerEmail: "meera.joshi@gmail.com", authorRole: "Sales Representative", type: "Note", content: "Potential upselling opportunity identified." },
];

export default async function seedCustomerNotes(customers, users) {
  console.log("\n🌱 Seeding Customer Notes...");
  const insertedNotes = [];

  for (const note of notes) {
    const customer = customers.find((c) => c.email === note.customerEmail);
    const author = users[note.authorRole];
    if (!customer) continue;

    const existing = await CustomerNote.findOne({ customer: customer._id, content: note.content });
    if (existing) {
      console.log(`⏩ Note already exists for ${customer.name}`);
      insertedNotes.push(existing);
      continue;
    }

    const created = await CustomerNote.create({
      customer: customer._id,
      author: author?._id,
      content: note.content,
      type: note.type,
    });

    console.log(`✅ Note added for ${customer.name}`);
    insertedNotes.push(created);
  }

  console.log(`🎉 ${insertedNotes.length} customer notes ready.\n`);
  return insertedNotes;
}
