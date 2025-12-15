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
