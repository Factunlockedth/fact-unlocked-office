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
    mission: "ตรวจคำกล่าวอ้าง ความถูกต้องของข้อมูล วันที่ ตัวเลข บริบท และความเสี่ยงก่อนนำเสนอ",
    skills: ["แยก claim ทีละข้อ", "ประเมินหลักฐานและความน่าเชื่อถือของแหล่ง", "ตรวจวันที่และบริบท", "ทำเครื่องหมายข้อมูลที่ขัดแย้งหรือยังยืนยันไม่ได้"],
    deliverable: "Fact-check Matrix: claim, หลักฐานที่มี, สิ่งที่ยังขาด, สถานะ (ยืนยันได้/บางส่วน/ยังยืนยันไม่ได้/ไม่ถูกต้อง) และคำแนะนำ"
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
    "3. หากผู้ใช้ทักทายหรือขอให้แนะนำตัว ให้แนะนำตัวเองทันที โดยบอกชื่อ ตำแหน่ง หน้าที่หลัก 3–4 ข้อ และสิ่งที่ผู้ใช้สามารถมอบหมายได้ ห้ามตอบกลับด้วยคำถามว่า ต้องการคำแนะนำเรื่องอะไร ในกรณีนี้",
    "4. เมื่อได้รับงาน ให้ทวนเป้าหมายสั้น ๆ แล้วเสนอขั้นตอนและผลลัพธ์ที่ส่งมอบให้ตรงกับแผนกของคุณ",
    "5. ถ้าข้อมูลไม่พอ ให้ถามเฉพาะคำถามที่จำเป็นที่สุดครั้งละหนึ่งข้อ",
    "6. ห้ามแต่งข้อเท็จจริง แหล่งอ้างอิง URL ตัวเลข หรืออ้างว่าค้นเว็บ/เปิดเอกสาร/ตรวจสอบแหล่งข้อมูลแล้ว หากไม่ได้ทำจริง",
    "7. Research AI สามารถเสนอแหล่งที่ควรตรวจและแผนค้นคว้าได้ แต่ห้ามอ้างว่าได้ค้นเว็บจริง เพราะ Worker รุ่นนี้ยังไม่มีเครื่องมือ web search",
    "8. Fact Check AI ต้องแยกสิ่งที่ยืนยันได้กับสิ่งที่ยังยืนยันไม่ได้ อย่ารับรอง claim ที่ไม่มีหลักฐาน",
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
    max_completion_tokens: 900,
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
        const reply = await askAI(env, [
          { role: "system", content: buildSystemPrompt(department) },
          { role: "user", content: "ช่วยแนะนำตัวเอง บอกหน้าที่หลัก และยกตัวอย่างงานที่คุณช่วยเจ้าของบริษัทได้" }
        ]);
        return json({ ok: true, test: "passed", department, model: MODEL, reply }, 200, responseOrigin);
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

      const reply = await askAI(env, [
        { role: "system", content: buildSystemPrompt(department) },
        ...history,
        { role: "user", content: message }
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
