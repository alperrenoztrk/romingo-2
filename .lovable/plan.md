

## Plan: Maskotlari 3D gorsellerle degistir

### Mevcut Durum
- `MascotFace.tsx` SVG cizimler kullaniyor (flamingo, cat, toucan, panda)
- 3 yerde kullaniliyor: HomePage, LessonPage, LessonComplete
- `src/assets/` klasorunde eski maskot PNG dosyalari zaten var

### Uygulama Adimlari

1. **Yeni 3D maskot gorsellerini kaydet** - Yuklenen 4 gorseli `src/assets/` klasorune kopyala (mevcut dosyalarin uzerine yaz):
   - `mascot-flamingo.png` (pembe flamingo)
   - `mascot-cat.png` (turuncu kedi)
   - `mascot-toucan.png` (tukan)
   - `mascot-panda.png` (panda)

2. **Gorsellerin arkaplanini kaldir** - AI gorsel duzenleme ile arkaplan transparan hale getirilecek

3. **`MascotFace.tsx` bilesenini guncelle** - SVG cizimleri kaldir, yerine PNG import'lari koy:
   - Her mascotId icin ilgili PNG dosyasini import et
   - `<img>` etiketi ile render et, `object-contain` ve `drop-shadow-2xl` ile 3D gorunum

4. **Boyutlari koru** - Mevcut `className` prop'u aynen calismaya devam edecek (`w-36 h-36`, `w-56 h-56` vb.)

### Etkilenen Dosyalar
- `src/assets/mascot-*.png` (4 dosya uzerine yazilacak)
- `src/components/MascotFace.tsx` (SVG → PNG gecisi)

