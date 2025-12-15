async function tanya(){
  const soalan = document.getElementById("soalan").value;
  document.getElementById("jawapan").innerText = "Memproses...";

  const res = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method:"POST",
      headers:{
        "Authorization":"Bearer HF_API_KEY",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        inputs:`Jawab berdasarkan Al-Quran dan terjemahan Bahasa Melayu. Soalan: ${soalan}`
      })
    }
  );

  const data = await res.json();
  document.getElementById("jawapan").innerText =
    data[0]?.generated_text || "Tiada jawapan";
}
import { loadQuran } from "./quran-loader.js";

let quran;

loadQuran().then(data=>{
  quran = data;
  console.log("Quran loaded:", data.arab.length, "surah");
});

function cari(){
  const kata = document.getElementById("soalan").value.toLowerCase();
  const out = document.getElementById("jawapan");
  out.innerHTML = "Mencari...";

  let hasil = [];

  quran.bm.forEach((surah,s)=>{
    surah.forEach((ayat,a)=>{
      if(ayat.toLowerCase().includes(kata)){
        hasil.push({
          ref:`${s+1}:${a+1}`,
          arab:quran.arab[s][a],
          bm:ayat
        });
      }
    });
  });

  if(!hasil.length){
    out.innerText = "❌ Tiada ayat berkaitan ditemui.";
    return;
  }

  out.innerHTML = hasil.slice(0,5).map(h=>`
📖 <b>${h.ref}</b>
${h.arab}
${h.bm}
<hr>
`).join("");
}
