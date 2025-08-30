# AI chatbot dataset & embedding model development plan
 
## Purpose
- Chatbot-oo dataset intent and model development steps are tracked and visible in version control. 

## Stage I. Dataset preparation
- [x] Identify chatbot intents (GREETING, CLIP_SERVICE, FAQ_CONTACT, FAQ_INFO, GUIDE, FALLBACK)
- [x] Generate example utterances for each intent
- [x] Create a labeled json dataset (examples.jsonl)
- [x] Generate pair dataset (positive/negative sentence pairs)
- [x] Split train/test set for validation

2# Stage II.Small embedding model
- [x] Pick a small multilingual base embedding model (e.g. all-MiniLM-L6-v2)
- [x] Fine-tune the model on custom dataset
- [x] Export to ONNX
- [x] Quantize (to reduce size)
- [x] Upload to Cloudflare Worker (KV Storage or Durable Objects)

## Stage II. Test
- [x] Compare embedding vectors with reference dataset
- [x] Validate intent classification accuracy
- [x] Messure latency and memory usage on: Cloudflare Worker
