# -*- coding: utf-8 -*-
from pathlib import Path

root = Path(r"E:/Courses/1 - Front End/2 - My Job/2 - Java Script/4 - wafra-admin-cms")
src = (root / "src" / "p51.html").read_text(encoding="utf-8")
start_marker = "  /* —— الإعدادات التشغيلية —— */"
end_marker = "  /* —— صلاحيات الحقول: زر إضافة حقل —— */"

s = src.index(start_marker)
e = src.index(end_marker, s)
new_block = src[s:e]

assert "OPS_KEY" in new_block
assert "S.settings=()=>{" in new_block
assert "set-edit-table" in new_block
print("Source block length:", len(new_block))
print("Source block lines:", new_block.count("\n") + 1)

for name in ["index.html", "wafra-admin-cms.html"]:
    path = root / name
    text = path.read_text(encoding="utf-8")
    s = text.index(start_marker)
    e = text.index(end_marker, s)
    old_len = e - s
    updated = text[:s] + new_block + text[e:]
    path.write_text(updated, encoding="utf-8")
    v = path.read_text(encoding="utf-8")
    vs = v.index(start_marker)
    ve = v.index(end_marker, vs)
    block = v[vs:ve]
    print(
        f"{name}: replaced {old_len} -> {len(new_block)}; "
        f"OPS_KEY={('OPS_KEY' in block)}; "
        f"set-edit-table={('set-edit-table' in block)}; "
        f"S.settings={('S.settings=()=>{' in block)}; "
        f"field-perms-after={v[ve:ve+40]!r}"
    )
