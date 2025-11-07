import os, json

script_dir = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(script_dir, "images")

manifest = {}

for dest in os.listdir(root):
    dest_path = os.path.join(root, dest)
    if os.path.isdir(dest_path):
        files = [os.path.splitext(f)[0] for f in os.listdir(dest_path) if f.endswith(".png")]
        manifest[dest] = files

os.makedirs(os.path.join(script_dir, "data"), exist_ok=True)
with open(os.path.join(script_dir, "data", "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)

print("done")


# localhost: npx http-server