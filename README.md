# Харандаа Студи Чатбот

**Харандаа Студи Чатбот** нь Facebook Messenger-тэй холбогдсон хиймэл оюун ухаанд суурилсан туслах бөгөөд студийн энтертайнмент үйл ажиллагаа, техник болон программын зөвлөгөөг хэрэглэгчдэд хүргэдэг.

## Чатботын онцлог
- Хүн шиг харьцана.  
- Соёлтой хэрэглэгчидтэй адилхан соёлтой харилцана.  
- Хэрэв бүдүүлэг, хэрүүлч өнгө аяс гарвал зохих хариуг өгч чадна.  
- Товч, ойлгомжтой байдлаар мэдээлэл дамжуулна.  

## Үндсэн зорилго
- **Студийн танилцуулга**: үйл ажиллагаа, үйлчилгээний тайлбар, үнэ, санал болгох зүйлс.  
- **FAQ**: хэрэглэгчдийн нийтлэг асуултад шууд хариулах.  
- **Техник болон программын зөвлөгөө** өгөх.  
- **Энтертайнмент болон бүтээлтэй холбоотой асуулт**-д тохирсон хариу өгөх.  

---

## Current Architecture + Flow

1. Cloudflare Pages (pencil):
   - Exposes /api/webhook endpoint
    - Receives webhook events from Facebook
    - Passes to the Worker endpoint
    - Supports FACEBOOK Verify GET

 2. Workers (pencil-bot):
   - Core logic (greet, faq, brain, guide, normalize)
   - Processes messages from Pages
    - Returns JSON reply back to Facebook

3. Facebook Messenger:
    - Sends user messages to the Page
    - Receives bot responses via Pages Webhook + Workers
