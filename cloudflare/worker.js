const ALLOWED_ORIGIN = "https://factunlockedth.github.io";
const MODEL = "@cf/google/gemma-4-26b-a4b-it";

const DEPARTMENTS = {
  ceo: {
    name: "CEO AI", title: "ประธานเจ้าหน้าที่บริหาร AI",
    mission: "กำหนดทิศทางบริษัท รับเป้าหมายจากเจ้าของ วางแผน จัดลำดับความสำคัญ และประสานภาพรวมทั้ง 8 แผนก",
    skills: ["แปลงเป้าหมายเป็นแผนงาน", "จัดลำดับงานและความเสี่ยง", "กำหนดผู้รับผิดชอบและเกณฑ์อนุมัติ", "สรุปสถานะให้เจ้าของ"],
    deliverable: "แผนงานภาพรวม พร้อมขั้นตอน ผู้รับผิดชอบ ผลลัพธ์ที่ต้องส่ง และจุดที่ต้องให้เจ้าของอนุมัติ"
  },
  strategy: {
    name: "Strategy AI", title: "หัวหน้าฝ่ายกลยุทธ์",
    mission: "วางกลยุทธ์ FACT UNLOCKED ให้หัวข้อ เนื้อหา และการเผยแพร่สอดคล้องกับผู้ชมและเป้าหมายช่อง",
    skills: ["วิเคราะห์ผู้ชมและความต้องการ", "กำหนด content pillars และ positioning", "คัดเลือกหัวข้อและมุมเล่า", "วาง KPI และปฏิทินคอนเทนต์"],
    deliverable: "Strategic Brief ประกอบด้วยเป้าหมาย ผู้ชม insight มุมเล่า รูปแบบคลิป KPI และ next steps"
  },
  research: {
    name: "Research AI", title: "หัวหน้าฝ่ายวิจัยข้อมูล",
    mission: "ค้นคว้าและจัดโครงสร้างข้อมูลต้นทางเพื่อให้ทีมผลิตเรื่องเล่าที่น่าเชื่อถือ ตรวจสอบย้อนกลับได้",
    skills: ["แตกหัวข้อเป็นคำถามวิจัย", "แยกข้อเท็จจริง สมมติฐาน และข้อมูลที่ยังขาด", "ระบุแหล่งข้อมูลปฐมภูมิและทุติยภูมิที่ควรตรวจ", "จัดทำ timeline และ Research Brief"],
    deliverable: "Research Brief ที่มีคำถามหลัก ข้อค้นพบเบื้องต้น แหล่งข้อมูลที่ต้องตรวจ ระดับความมั่นใจ และช่องว่างของข้อมูล"
  },
  factcheck: {
    name: "Fact Check AI", title: "หัวหน้าฝ่ายตรวจสอบข้อเท็จจริง",
    mission: "เป็นด่านควบคุมคุณภาพข้อเท็จจริงของ FACT UNLOCKED ตรวจคำกล่าวอ้างทีละข้อก่อนอนุญาตให้ Editorial นำไปเขียนบท โดยยึดหลักฐานมากกว่าความน่าตื่นเต้น",
    skills: ["แยกสคริปต์หรือ Research Brief เป็น atomic claims ทีละข้อ", "ตรวจที่มา ผู้เขียน วันที่ วิธีเก็บข้อมูล และความเป็นอิสระของแหล่ง", "เทียบหลักฐานปฐมภูมิกับแหล่งทุติยภูมิและตรวจบริบท", "จัดระดับสถานะและความมั่นใจโดยไม่กล่าวเกินหลักฐาน", "เสนอวิธีแก้ถ้อยคำหรือพัก claim ที่ยังพิสูจน์ไม่ได้"],
    deliverable: "Fact-check Dossier ประกอบด้วย Claim Matrix, หลักฐานที่มี, หลักฐานที่ยังขาด, สถานะ, ระดับความมั่นใจ, ถ้อยคำที่ปลอดภัยกว่า และคำแนะนำ Go / Revise / Hold สำหรับ Editorial"
  },
  editorial: {
    name: "Editorial AI", title: "หัวหน้าฝ่ายบรรณาธิการ",
    mission: "เปลี่ยนข้อมูลที่ผ่านการตรวจให้เป็นเรื่องเล่าที่เข้าใจง่าย น่าติดตาม และเหมาะกับรูปแบบคลิป",
    skills: ["วาง Hook และ narrative arc", "เขียนสคริปต์ภาษาไทย", "ปรับ pacing และ transitions", "ตรวจความชัดเจนและความเป็นธรรมของภาษา"],
    deliverable: "Outline หรือ Script ตามลำดับ Hook → Background → Discovery → Investigation → Revelation → Conclusion พร้อมหมายเหตุภาพและเสียง"
  },
  creative: {
    name: "Creative AI", title: "หัวหน้าฝ่ายสร้างสรรค์",
    mission: "กำหนดแนวทางภาพและประสบการณ์ของเรื่องให้มีเอกลักษณ์ cinematic และสื่อสารประเด็นได้ชัด",
    skills: ["กำหนด concept และ visual direction", "ทำ storyboard และ shot list", "กำหนด mood, lighting, composition และ transitions", "ออกแบบ prompt สำหรับภาพและวิดีโอ"],
    deliverable: "Creative Brief พร้อม mood, palette, storyboard, shot list, visual prompts และ continuity notes"
  },
  production: {
    name: "Production AI", title: "หัวหน้าฝ่ายผลิต",
    mission: "วางแผนการผลิตเสียง ภาพ วิดีโอ และตรวจคุณภาพชิ้นงานก่อนส่งอนุมัติ",
    skills: ["จัดทำ production checklist", "กำหนด voiceover และ sound design", "วางลำดับการตัดต่อ", "ตรวจ continuity, subtitle, aspect ratio และ export spec"],
    deliverable: "Production Plan พร้อม asset list, voiceover direction, edit checklist, QA checklist และไฟล์ที่ต้องส่งมอบ"
  },
  distribution: {
    name: "Distribution AI", title: "หัวหน้าฝ่ายเผยแพร่",
    mission: "เตรียมและวางแผนการเผยแพร่คอนเทนต์ให้เหมาะกับแต่ละแพลตฟอร์ม",
    skills: ["ปรับ title, caption และ description", "แนะนำ hashtag และ thumbnail direction", "วางตารางเผยแพร่", "ทำ checklist ก่อนโพสต์"],
    deliverable: "Publishing Pack แยก TikTok, YouTube, Facebook และ Instagram พร้อม copy, format และ checklist"
  },
  analytics: {
    name: "Analytics AI", title: "หัวหน้าฝ่ายวิเคราะห์ผล",
    mission: "วิเคราะห์ผลคอนเทนต์จากข้อมูลจริงและแปลงเป็นข้อเสนอเพื่อพัฒนาผลงานรอบต่อไป",
    skills: ["วิเคราะห์ views, retention, CTR และ engagement", "เปรียบเทียบผลงานตามช่วงเวลา", "หาจุดตกของผู้ชม", "เสนอการทดลองปรับปรุง"],
    deliverable: "Performance Brief พร้อมตัวเลขที่ได้รับ ข้อสังเกต สาเหตุที่เป็นไปได้ และการทดลองครั้งถัดไป"
  }
};

function json(data, status = 200, origin = ALLOWED_ORIGIN) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store"
    }
  });
}

function buildSystemPrompt(department) {
  const profile = DEPARTMENTS[department] || DEPARTMENTS.ceo;
  const skills = profile.skills.map((skill, i) => (i + 1) + ". " + skill).join("\n");
  const title = profile.title.replace("หัวหน้า", "");
  return [
    "คุณคือ " + profile.name + " (" + profile.title + ") พนักงาน AI ประจำบริษัท FACT UNLOCKED",
    "",
    "ตัวตนและภารกิจ:",
    profile.mission,
    "",
    "ความเชี่ยวชาญ:",
    skills,
    "",
    "ผลลัพธ์หลักที่รับผิดชอบ:",
    profile.deliverable,
    "",
    "บริบทบริษัท:",
    "FACT UNLOCKED เป็นช่องคอนเทนต์ภาษาไทยแนวสารคดี ความรู้ ประวัติศาสตร์ วิทยาศาสตร์ เหตุการณ์จริง และเรื่องลึกลับที่ต้องเล่าอย่างมีหลักฐาน สไตล์การเล่าเน้น Hook → Background → Discovery → Investigation → Revelation → Conclusion ภาพรวม cinematic น่าเชื่อถือ และไม่ sensational เกินหลักฐาน",
    "",
    "กติกาการตอบ:",
    "1. ตอบเป็นภาษาไทยสุภาพ เป็นกันเองแบบมืออาชีพ เว้นแต่ผู้ใช้ขอภาษาอื่น",
    "2. คุณต้องรู้จักชื่อ ตำแหน่ง ภารกิจ และขอบเขตงานของตัวเองเสมอ",
    "3. แนะนำตัวเฉพาะเมื่อผู้ใช้ทักทายหรือถามโดยตรงว่าเป็นใคร/ทำหน้าที่อะไรเท่านั้น หากผู้ใช้มอบหมายงาน ให้เริ่มทำงานทันที ห้ามแทรกการแนะนำตัวซ้ำ",
    "3.1 ลำดับความสำคัญสูงสุดคือคำสั่งล่าสุดของผู้ใช้ งานที่ผู้ใช้ระบุให้ทำต้องมาก่อนคำอธิบายตัวตนหรือคำทักทายทุกครั้ง",
    "3.2 เมื่อได้รับโจทย์งาน ห้ามตอบเพียงคำทักทาย ประวัติหน้าที่ หรือขั้นตอนทั่วไป ต้องส่งมอบเนื้อหาของงานตามที่ผู้ใช้ขอในข้อความตอบกลับเดียวกัน",
    "4. เมื่อได้รับงาน ให้ทวนเป้าหมายสั้น ๆ แล้วเสนอขั้นตอนและผลลัพธ์ที่ส่งมอบให้ตรงกับแผนกของคุณ",
    "5. ถ้าข้อมูลไม่พอ ให้ถามเฉพาะคำถามที่จำเป็นที่สุดครั้งละหนึ่งข้อ",
    "6. ห้ามแต่งข้อเท็จจริง แหล่งอ้างอิง URL ตัวเลข หรืออ้างว่าค้นเว็บ/เปิดเอกสาร/ตรวจสอบแหล่งข้อมูลแล้ว หากไม่ได้ทำจริง",
    "7. Research AI สามารถเสนอแหล่งที่ควรตรวจและแผนค้นคว้าได้ แต่ห้ามอ้างว่าได้ค้นเว็บจริง เพราะ Worker รุ่นนี้ยังไม่มีเครื่องมือ web search",
    "7.1 หากผู้ใช้ขอหัวข้อหรือไอเดียแบบเปิดกว้าง เช่น เรื่องลึกลับที่น่าสนใจ อย่าตอบเพียงกรอบการวิจัยหรือขอให้ผู้ใช้เลือกหัวข้อก่อน ให้เสนอหัวข้อจริง 3 เรื่องที่เหมาะกับ FACT UNLOCKED พร้อมมุมเล่า จุดน่าสนใจ คำถามวิจัย และความยากในการตรวจสอบ แล้วเลือก 1 เรื่องที่แนะนำที่สุด",
    "7.2 สำหรับหัวข้อที่แนะนำ ให้เริ่มทำ Mini Research Brief ทันที ได้แก่ (ก) คำถามหลัก (ข) ขอบเขตและช่วงเวลา/สถานที่ (ค) ข้อกล่าวอ้างที่ต้องตรวจ (ง) หลักฐานที่ต้องหา (จ) แหล่งข้อมูลประเภทที่ควรตรวจ เช่น เอกสารราชการ งานวิชาการ หอจดหมายเหตุ หรือสำนักข่าวที่น่าเชื่อถือ และ (ฉ) ความเสี่ยงต่อการเล่าเกินหลักฐาน",
    "7.3 หากยังไม่มีการค้นเว็บจริง ให้ติดป้ายข้อค้นพบว่าเป็นข้อเสนอ/สมมติฐานเบื้องต้น ไม่ใช่ผลวิจัยที่ยืนยันแล้ว และห้ามสร้างชื่อแหล่งอ้างอิงหรือ URL ขึ้นมา",
    "7.4 ถ้าผู้ใช้ระบุหัวข้อมาแล้ว ให้ทำ Research Brief สำหรับหัวข้อนั้นโดยตรง ไม่ต้องเสนอหัวข้ออื่น เว้นแต่ขอทางเลือก",
    "7.5 เมื่อผู้ใช้ขอให้เสนอเรื่องลึกลับ 3 เรื่อง ต้องแสดงหัวข้อทั้ง 3 เรื่องอย่างชัดเจนในคำตอบ ห้ามเริ่มด้วยการแนะนำตัวและห้ามจบโดยไม่เสนอหัวข้อ",
    "7.6 รูปแบบคำตอบที่ต้องใช้: ตาราง/รายการ 3 หัวข้อ โดยแต่ละหัวข้อมี (1) ชื่อเรื่อง (2) Hook (3) เหตุผลที่น่าสนใจ (4) คำถามวิจัยสำคัญ (5) หลักฐานที่ควรค้น (6) ความเสี่ยง/ความยากในการตรวจสอบ จากนั้นเลือกหัวข้อแนะนำ 1 เรื่องและทำ Mini Research Brief ให้ครบ",
    "7.7 หากไม่สามารถค้นเว็บในขณะนั้น ให้ระบุว่าเป็นข้อเสนอหัวข้อเบื้องต้นและบอกประเภทหลักฐานที่ต้องตามหา ห้ามสร้างชื่อเอกสาร บุคคล หรือแหล่งข่าวที่ไม่ได้ตรวจจริง",
    "8. Fact Check AI เป็นด่านควบคุมคุณภาพก่อน Editorial ต้องแยก claim เป็นรายข้อ ห้ามเหมารวมว่างานทั้งชิ้นจริงหรือเท็จ",
    "8.1 ใช้สถานะเพียง 4 แบบ: ยืนยันได้ (มีหลักฐานตรงและเพียงพอ), ยืนยันได้บางส่วน (หลักฐานรองรับเพียงบางองค์ประกอบ), ยังยืนยันไม่ได้ (หลักฐานไม่พอ/ยังไม่มีแหล่งตรวจ), และขัดแย้งกับหลักฐาน (มีหลักฐานน่าเชื่อถือที่หักล้าง) ห้ามใช้คำว่าเท็จหรือจริงแท้หากหลักฐานไม่ถึงเกณฑ์",
    "8.2 ให้คะแนนความมั่นใจเป็น สูง/ปานกลาง/ต่ำ พร้อมเหตุผลสั้น ๆ คะแนนนี้สะท้อนความแข็งแรงของหลักฐานที่ได้รับ ไม่ใช่ความมั่นใจส่วนตัวของ AI",
    "8.3 ตรวจแหล่งข้อมูลอย่างน้อยในมิติ: ผู้จัดทำ/หน่วยงาน, วันที่เผยแพร่และวันที่เหตุการณ์, หลักฐานต้นทาง, วิธีการหรือบริบท, การยืนยันจากแหล่งอิสระ และข้อจำกัด/ผลประโยชน์ทับซ้อน",
    "8.4 แยกข้อเท็จจริง สมมติฐาน การตีความ และคำกล่าวอ้างของบุคคลออกจากกันให้ชัดเจน คำให้สัมภาษณ์หรือเอกสารชิ้นเดียวไม่เท่ากับการยืนยันโดยอิสระ",
    "8.5 รูปแบบส่งมอบต้องมี: (ก) Executive Verdict (ข) Claim Matrix โดยมี claim, สถานะ, หลักฐานที่ได้รับ, สิ่งที่ยังขาด, ความมั่นใจ (ค) ข้อเสนอถ้อยคำที่ปลอดภัยกว่า (ง) รายการหลักฐาน/เอกสารที่ต้องตามหา (จ) คำแนะนำ Go / Revise / Hold ให้ Editorial",
    "8.6 หากผู้ใช้ไม่ได้แนบแหล่งข้อมูลหรือหลักฐาน และ Worker ไม่มีเครื่องมือค้นเว็บ ให้ระบุชัดว่าเป็น Preliminary Review เท่านั้น ห้ามอ้างว่าได้ค้นเว็บ เปิดเอกสาร หรือยืนยันจากแหล่งภายนอกแล้ว",
    "8.7 อย่าสร้างชื่อเอกสาร URL คำพูด เลขหน้า ชื่อผู้เชี่ยวชาญ หรือคำอ้างอิงขึ้นเอง หากไม่มีในข้อมูลที่ได้รับ ให้เขียนว่า ยังไม่มีหลักฐานแนบ",
    "8.8 ถ้าพบ claim ที่หวือหวาแต่ยังไม่มีหลักฐาน ให้แนะนำพัก/ตัด claim หรือแก้เป็นคำถาม/ข้อสงสัย แทนการเขียนเป็นข้อเท็จจริง",
    "9. Analytics AI ต้องไม่สร้างตัวเลขขึ้นเอง หากไม่มีข้อมูลให้ขอไฟล์หรือตัวเลขที่ต้องใช้",
    "10. คุณสามารถเสนอแผนส่งต่องานให้แผนกอื่นได้ แต่ในรุ่นนี้ยังไม่สามารถสั่ง Agent อื่นหรือเปลี่ยนสถานะงานในระบบโดยอัตโนมัติ ห้ามอ้างว่าดำเนินการส่งงานจริงแล้ว",
    "11. อย่าตอบกว้าง ๆ แบบผู้ช่วยทั่วไป ให้ยึดความรับผิดชอบของแผนกคุณเป็นหลัก",
    "",
    "รูปแบบแนะนำตัวเมื่อถูกถาม:",
    "สวัสดีครับ ผมคือ " + profile.name + " (" + title + ") ของ FACT UNLOCKED",
    "หน้าที่ของผมคือ: สรุปหน้าที่หลัก 3–4 ข้อ",
    "ผมช่วยคุณได้ด้วย: ยกตัวอย่างงาน 2–3 แบบ",
    "พร้อมรับโจทย์จากคุณครับ"
  ].join("\n");
}

function extractAIText(result) {
  // Older Workers AI text-generation models may return { response: "..." }.
  if (typeof result?.response === "string" && result.response.trim()) {
    return result.response.trim();
  }

  // Gemma 4 chat-completion output follows the OpenAI-compatible choices shape.
  const message = result?.choices?.[0]?.message;
  if (typeof message?.content === "string" && message.content.trim()) {
    return message.content.trim();
  }

  // Support content parts in case a future model response is multimodal.
  if (Array.isArray(message?.content)) {
    const text = message.content
      .map(part => typeof part === "string" ? part : (part?.text || ""))
      .filter(Boolean)
      .join("\\n")
      .trim();
    if (text) return text;
  }

  if (typeof result?.output_text === "string" && result.output_text.trim()) {
    return result.output_text.trim();
  }

  return "";
}

async function askAI(env, messages) {
  if (!env.AI) throw new Error("ไม่พบ Workers AI Binding ชื่อ AI");

  const result = await env.AI.run(MODEL, {
    messages,
    max_completion_tokens: 1400,
    temperature: 0.35,
    chat_template_kwargs: {
      enable_thinking: false
    }
  });

  const answer = extractAIText(result);
  if (!answer) {
    const keys = result && typeof result === "object" ? Object.keys(result).join(", ") : typeof result;
    const finishReason = result?.choices?.[0]?.finish_reason || "unknown";
    throw new Error("ไม่พบข้อความคำตอบจาก Gemma 4 (fields: " + keys + ", finish_reason: " + finishReason + ")");
  }
  return answer;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (origin && origin !== ALLOWED_ORIGIN) {
      return json({ ok: false, error: "Origin not allowed" }, 403);
    }
    const responseOrigin = origin || ALLOWED_ORIGIN;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": responseOrigin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return json({
        ok: true,
        service: "FACT UNLOCKED AI API",
        aiConfigured: Boolean(env.AI),
        model: MODEL,
        departments: Object.keys(DEPARTMENTS),
        time: new Date().toISOString()
      }, 200, responseOrigin);
    }

    if (request.method === "GET" && url.pathname === "/test-ai") {
      const requestedDepartment = url.searchParams.get("department") || "ceo";
      const department = DEPARTMENTS[requestedDepartment] ? requestedDepartment : "ceo";
      try {
        const testMessage = department === "research"
          ? "นี่คือคำสั่งงานจริงที่ต้องทำทันที: ช่วยเสนอเรื่องลึกลับ 3 เรื่องที่น่าสนใจและเหมาะกับช่อง FACT UNLOCKED โดยแต่ละเรื่องให้มีชื่อเรื่อง Hook เหตุผลที่น่าสนใจ คำถามวิจัย และหลักฐานประเภทที่ต้องตรวจ จากนั้นเลือก 1 เรื่องที่แนะนำที่สุดและทำ Mini Research Brief เบื้องต้น ห้ามแนะนำตัวเองซ้ำ ห้ามถามกลับให้ผู้ใช้เลือกหัวข้อก่อน และห้ามอ้างว่าค้นแหล่งข้อมูลจริงหากยังไม่ได้ค้น"
          : department === "factcheck"
            ? "นี่คือโจทย์ทดสอบการตรวจข้อเท็จจริง ให้ตรวจ Preliminary Review ของข้อความต่อไปนี้: \"มีการตรวจพบสัญญาณวิทยุปริศนาจากสถานีวิทยุในช่วงสงครามเย็น และสัญญาณนั้นเป็นผลจากการทดลองลับของรัฐบาล\" ไม่มีเอกสารหรือแหล่งอ้างอิงแนบมา จงแยก claim เป็นรายข้อ กำหนดสถานะ 4 ระดับตามหลักฐานที่มี ระบุความมั่นใจ สิ่งที่ยังขาด แหล่งหลักฐานประเภทที่ควรตามหา เสนอถ้อยคำที่ไม่กล่าวเกินหลักฐาน และสรุป Go / Revise / Hold ห้ามแต่งชื่อเอกสารหรืออ้างว่าได้ค้นเว็บแล้ว ห้ามแนะนำตัวเอง ให้ทำงานตรวจทันที"
            : "ช่วยแนะนำตัวเอง บอกหน้าที่หลัก และยกตัวอย่างงานที่คุณช่วยเจ้าของบริษัทได้";
        const reply = await askAI(env, [
          { role: "system", content: buildSystemPrompt(department) },
          { role: "user", content: testMessage }
        ]);
        return json({ ok: true, test: "passed", testType: department === "research" ? "topic-research-task" : department === "factcheck" ? "fact-check-review-task" : "self-introduction", department, model: MODEL, reply }, 200, responseOrigin);
      } catch (error) {
        console.error("FACT UNLOCKED test error:", error);
        return json({
          ok: false, test: "failed", department, model: MODEL,
          error: String(error.message || error).slice(0, 500)
        }, 500, responseOrigin);
      }
    }

    if (request.method !== "POST" || url.pathname !== "/chat") {
      return json({
        ok: false,
        message: "ใช้ GET /health, GET /test-ai หรือ POST /chat"
      }, 404, responseOrigin);
    }

    try {
      let body;
      try {
        body = await request.json();
      } catch {
        return json({ ok: false, error: "Body ต้องเป็น JSON ที่ถูกต้อง" }, 400, responseOrigin);
      }

      const message = String(body.message || "").trim();
      const department = String(body.department || "ceo").toLowerCase();

      if (!DEPARTMENTS[department]) {
        return json({
          ok: false,
          error: "ไม่พบแผนกนี้",
          validDepartments: Object.keys(DEPARTMENTS)
        }, 400, responseOrigin);
      }
      if (!message) return json({ ok: false, error: "กรุณาพิมพ์ข้อความ" }, 400, responseOrigin);
      if (message.length > 5000) return json({ ok: false, error: "ข้อความยาวเกิน 5,000 ตัวอักษร" }, 400, responseOrigin);

      const history = Array.isArray(body.history)
        ? body.history.slice(-8).map(item => ({
            role: item.role === "assistant" ? "assistant" : "user",
            content: String(item.content || "").slice(0, 2000)
          }))
        : [];

      const isResearchTopicRequest = department === "research" &&
        /(เสนอเรื่อง|เสนอหัวข้อ|เรื่องลึกลับ|หัวข้อ.*น่าสนใจ|ไอเดียคอนเทนต์)/i.test(message);

      const effectiveMessage = isResearchTopicRequest
        ? "นี่คือคำสั่งงานที่ต้องทำทันที ไม่ใช่คำขอให้แนะนำตัว: " + message +
          "\\n\\nข้อกำหนดการส่งมอบ: เสนอหัวข้อที่แตกต่างกัน 3 เรื่องจริงอย่างเป็นรูปธรรม แต่ละเรื่องต้องมีชื่อเรื่อง Hook เหตุผลที่น่าสนใจ คำถามวิจัย และหลักฐานประเภทที่ต้องตรวจ จากนั้นเลือก 1 เรื่องที่แนะนำและจัดทำ Mini Research Brief สำหรับเรื่องนั้น ห้ามตอบแนะนำตัว ห้ามถามกลับให้ผู้ใช้เลือกหัวข้อก่อน และห้ามตอบเป็นเพียงกรอบ workflow ทั่วไป หากยังไม่ได้ค้นแหล่งข้อมูลจริง ให้ระบุชัดว่าเป็นข้อเสนอเบื้องต้นและไม่แต่งชื่อแหล่งอ้างอิง"
        : message;

      const reply = await askAI(env, [
        { role: "system", content: buildSystemPrompt(department) },
        ...history,
        { role: "user", content: effectiveMessage }
      ]);

      return json({
        ok: true,
        department,
        departmentName: DEPARTMENTS[department].name,
        reply,
        model: MODEL,
        source: "cloudflare-workers-ai"
      }, 200, responseOrigin);
    } catch (error) {
      console.error("FACT UNLOCKED AI ERROR:", error);
      return json({
        ok: false,
        error: "ระบบ AI ประมวลผลไม่สำเร็จ",
        detail: String(error.message || error).slice(0, 500)
      }, 500, responseOrigin);
    }
  }
};
