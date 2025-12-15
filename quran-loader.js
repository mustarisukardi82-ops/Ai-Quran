export async function loadQuran(){
  const arab = await fetch(
    "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_uthmani.json"
  ).then(r=>r.json());

  const bm = await fetch(
    "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/translation/ms_hilali.json"
  ).then(r=>r.json());

  return { arab, bm };
}
